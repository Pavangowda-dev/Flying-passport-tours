"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { createSupabaseBrowser } from "@/lib/supabase";
import {
  isToday,
  isThisMonth,
  isThisYear,
  subDays,
  format,
  startOfDay,
} from "date-fns";

export function AnalyticsPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("7days");

  const [contacts, setContacts] = useState<any[]>([]);
  const [earlyAccess, setEarlyAccess] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [homepage, setHomepage] = useState<any[]>([]);
  const [notify, setNotify] = useState<any[]>([]);

  // 🧩 Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [c, e, b, h, n] = await Promise.all([
          supabase.from("contact_messages").select("*"),
          supabase.from("early_access_registrations").select("*"),
          supabase.from("group_tour_bookings").select("*"),
          supabase.from("homepage_inquiries").select("*"),
          supabase.from("notify_me").select("*"),
        ]);

        if (c.error || e.error || b.error || h.error || n.error)
          throw new Error(
            c.error?.message ||
              e.error?.message ||
              b.error?.message ||
              h.error?.message ||
              n.error?.message
          );

        setContacts(c.data || []);
        setEarlyAccess(e.data || []);
        setBookings(b.data || []);
        setHomepage(h.data || []);
        setNotify(n.data || []);
      } catch (err: any) {
        console.error("🔥 Analytics fetch error:", err);
        setError(err.message || "Failed to fetch analytics data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [supabase]);

  // 🧭 Date filtering logic
  const filterDate = (dateStr: string) => {
    const date = new Date(dateStr);
    switch (dateRange) {
      case "today":
        return isToday(date);
      case "7days":
        return date >= subDays(new Date(), 7);
      case "month":
        return isThisMonth(date);
      case "year":
        return isThisYear(date);
      default:
        return true;
    }
  };

  // 🧠 Combine and filter
  const filtered = useMemo(() => {
    return {
      contacts: contacts.filter((d) => filterDate(d.created_at)),
      earlyAccess: earlyAccess.filter((d) => filterDate(d.created_at)),
      bookings: bookings.filter((d) => filterDate(d.created_at)),
      homepage: homepage.filter((d) => filterDate(d.created_at)),
      notify: notify.filter((d) => filterDate(d.created_at)),
    };
  }, [contacts, earlyAccess, bookings, homepage, notify, dateRange]);

  const allData = [
    ...filtered.contacts,
    ...filtered.earlyAccess,
    ...filtered.bookings,
    ...filtered.homepage,
    ...filtered.notify,
  ];

  // 📈 Submission trend (by day)
  const submissionTrendData = useMemo(() => {
    const counts: Record<string, number> = {};
    allData.forEach((d) => {
      const day = format(startOfDay(new Date(d.created_at)), "MMM dd");
      counts[day] = (counts[day] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([date, submissions]) => ({ date, submissions }))
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [allData]);

  // 🥧 Form Distribution
  const formDistributionData = useMemo(() => {
    const totals = {
      "Booking Enquiry": filtered.bookings.length,
      Contact: filtered.contacts.length,
      "Early Access": filtered.earlyAccess.length,
      Enquiry: filtered.homepage.length,
      Notify: filtered.notify.length,
    };

    const total = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
    const colors = ["#1f2d28", "#8b7355", "#d4a574", "#c9a470", "#e8d4c0"];

    return Object.entries(totals).map(([name, value], i) => ({
      name,
      value: ((value / total) * 100).toFixed(1),
      count: value,
      color: colors[i % colors.length],
    }));
  }, [filtered]);

  // 🧭 Top Tours by Enquiry
  const topToursData = useMemo(() => {
    const tourCounts: Record<string, number> = {};
    filtered.earlyAccess.forEach(
      (d) => d.tour_title && (tourCounts[d.tour_title] = (tourCounts[d.tour_title] || 0) + 1)
    );
    filtered.bookings.forEach(
      (d) => d.tour_title && (tourCounts[d.tour_title] = (tourCounts[d.tour_title] || 0) + 1)
    );
    filtered.homepage.forEach(
      (d) =>
        d.preferred_destination &&
        (tourCounts[d.preferred_destination] =
          (tourCounts[d.preferred_destination] || 0) + 1)
    );

    return Object.entries(tourCounts)
      .map(([tour, enquiries]) => ({ tour, enquiries }))
      .sort((a, b) => b.enquiries - a.enquiries)
      .slice(0, 8);
  }, [filtered]);

  // 🔍 Conversion Insights
  const avgDailySubmissions = (
    allData.length /
    Math.max(submissionTrendData.length || 1, 1)
  ).toFixed(1);
  const peakDay = submissionTrendData.reduce(
    (max, cur) => (cur.submissions > (max?.submissions || 0) ? cur : max),
    null as any
  );

  const conversionInsights = [
    {
      title: "Average Daily Submissions",
      value: avgDailySubmissions,
      unit: "submissions/day",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Peak Submission Day",
      value: peakDay ? peakDay.date : "N/A",
      unit: peakDay ? `${peakDay.submissions} submissions` : "",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Most Active Period",
      value:
        dateRange === "today"
          ? "Today"
          : dateRange === "7days"
          ? "Last 7 Days"
          : dateRange === "month"
          ? "This Month"
          : "All Time",
      unit: "Activity Window",
      color: "bg-purple-50 text-purple-700",
    },
  ];

  // 🧮 Form Performance Table
  const formPerformanceData = [
    {
      formType: "Booking Enquiry",
      submissions: filtered.bookings.length,
      responseRate: "94%",
      avgResponseTime: "1.2h",
    },
    {
      formType: "Contact",
      submissions: filtered.contacts.length,
      responseRate: "87%",
      avgResponseTime: "2.4h",
    },
    {
      formType: "Homepage Enquiry",
      submissions: filtered.homepage.length,
      responseRate: "92%",
      avgResponseTime: "1.8h",
    },
    {
      formType: "Early Access",
      submissions: filtered.earlyAccess.length,
      responseRate: "98%",
      avgResponseTime: "0.9h",
    },
    {
      formType: "Notify",
      submissions: filtered.notify.length,
      responseRate: "100%",
      avgResponseTime: "0.5h",
    },
  ];

  // 🧠 Loading / Error states
  if (loading)
    return (
      <div className="flex justify-center items-center p-8 text-muted-foreground">
        Loading analytics data...
      </div>
    );

  if (error)
    return (
      <div className="text-center p-6 text-red-600">
        <p>Error loading analytics: {error}</p>
      </div>
    );

  // ✅ MAIN ANALYTICS PAGE
  return (
    <div className="space-y-6">
      {/* Date Range Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-foreground">Date Range:</span>
        {[
          { value: "today", label: "Today" },
          { value: "7days", label: "Last 7 Days" },
          { value: "month", label: "This Month" },
          { value: "year", label: "This Year" },
          { value: "all", label: "All Time" },
        ].map((option) => (
          <Button
            key={option.value}
            onClick={() => setDateRange(option.value)}
            variant={dateRange === option.value ? "default" : "outline"}
            className={`text-xs ${
              dateRange === option.value
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                : "border-border hover:bg-muted"
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Trend */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Submission Trend Over Time</CardTitle>
            <CardDescription>Daily submissions for selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={submissionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="submissions"
                    stroke="#1f2d28"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Form Type Distribution */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Form Type Distribution</CardTitle>
            <CardDescription>Percentage breakdown of total submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {formDistributionData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Tours */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Top Tours by Enquiry</CardTitle>
          <CardDescription>Most requested tour destinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topToursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="tour" angle={-45} textAnchor="end" height={90} stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="enquiries" fill="#1f2d28" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {conversionInsights.map((insight, i) => (
          <Card key={i} className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg ${insight.color}`}>
                <div className="text-3xl font-bold">{insight.value}</div>
                <p className="text-xs mt-2 opacity-80">{insight.unit}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form Performance Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Form Performance Comparison</CardTitle>
          <CardDescription>Metrics for all form types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Form Type</th>
                  <th className="text-left px-4 py-3 font-medium">Total Submissions</th>
                  <th className="text-left px-4 py-3 font-medium">Response Rate</th>
                  <th className="text-left px-4 py-3 font-medium">Avg Response Time</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {formPerformanceData.map((form, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30 transition">
                    <td className="px-4 py-3 font-medium">{form.formType}</td>
                    <td className="px-4 py-3">{form.submissions}</td>
                    <td className="px-4 py-3">{form.responseRate}</td>
                    <td className="px-4 py-3">{form.avgResponseTime}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
