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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { createSupabaseBrowser } from "@/lib/supabase";
import { format, isThisWeek, isThisMonth, isThisYear, isToday, subDays } from "date-fns";

export function DashboardPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("all");

  const [contacts, setContacts] = useState<any[]>([]);
  const [earlyAccess, setEarlyAccess] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [homepage, setHomepage] = useState<any[]>([]);
  const [notify, setNotify] = useState<any[]>([]);

  // 🎯 Fetch all data from Supabase
  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        setError(null);

        const [
          contactRes,
          earlyRes,
          bookingRes,
          homeRes,
          notifyRes,
        ] = await Promise.all([
          supabase.from("contact_messages").select("*"),
          supabase.from("early_access_registrations").select("*"),
          supabase.from("group_tour_bookings").select("*"),
          supabase.from("homepage_inquiries").select("*"),
          supabase.from("notify_me").select("*"),
        ]);

        if (
          contactRes.error ||
          earlyRes.error ||
          bookingRes.error ||
          homeRes.error ||
          notifyRes.error
        ) {
          throw new Error(
            contactRes.error?.message ||
              earlyRes.error?.message ||
              bookingRes.error?.message ||
              homeRes.error?.message ||
              notifyRes.error?.message
          );
        }

        setContacts(contactRes.data || []);
        setEarlyAccess(earlyRes.data || []);
        setBookings(bookingRes.data || []);
        setHomepage(homeRes.data || []);
        setNotify(notifyRes.data || []);
      } catch (err: any) {
        console.error("🔥 Dashboard fetch error:", err);
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [supabase]);

  // 🧭 Date filter logic
  const dateFilterFn = (dateStr: string) => {
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

  // 🧩 Filtered data
  const filtered = useMemo(() => {
    return {
      contacts: contacts.filter((d) => dateFilterFn(d.created_at)),
      earlyAccess: earlyAccess.filter((d) => dateFilterFn(d.created_at)),
      bookings: bookings.filter((d) => dateFilterFn(d.created_at)),
      homepage: homepage.filter((d) => dateFilterFn(d.created_at)),
      notify: notify.filter((d) => dateFilterFn(d.created_at)),
    };
  }, [contacts, earlyAccess, bookings, homepage, notify, dateRange]);

  // 📊 Stats
  const stats = {
    totalContacts: filtered.contacts.length,
    totalBookings: filtered.bookings.length,
    earlyAccessRequests: filtered.earlyAccess.length,
    homepageEnquiries: filtered.homepage.length,
    familyPackageNotifications: filtered.notify.length,
    totalLeads:
      filtered.contacts.length +
      filtered.bookings.length +
      filtered.earlyAccess.length +
      filtered.homepage.length +
      filtered.notify.length,
  };

  // 🎯 Top Tours by Enquiry (From multiple tables)
  const tourPopularity = useMemo(() => {
    const allTours: string[] = [];

    filtered.earlyAccess.forEach((d) => d.tour_title && allTours.push(d.tour_title));
    filtered.bookings.forEach((d) => d.tour_title && allTours.push(d.tour_title));
    filtered.homepage.forEach(
      (d) => d.preferred_destination && allTours.push(d.preferred_destination)
    );

    const counts: Record<string, number> = {};
    allTours.forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [filtered]);

  // 🥧 Form Distribution Chart
  const formDistribution = useMemo(() => {
    const total = stats.totalLeads || 1;
    return [
      {
        name: "Tour Bookings",
        value: stats.totalBookings,
        percentage: ((stats.totalBookings / total) * 100).toFixed(1),
      },
      {
        name: "Contact Messages",
        value: stats.totalContacts,
        percentage: ((stats.totalContacts / total) * 100).toFixed(1),
      },
      {
        name: "Early Access",
        value: stats.earlyAccessRequests,
        percentage: ((stats.earlyAccessRequests / total) * 100).toFixed(1),
      },
      {
        name: "Homepage Enquiries",
        value: stats.homepageEnquiries,
        percentage: ((stats.homepageEnquiries / total) * 100).toFixed(1),
      },
      {
        name: "Family Package Notify",
        value: stats.familyPackageNotifications,
        percentage: ((stats.familyPackageNotifications / total) * 100).toFixed(1),
      },
    ].filter((i) => i.value > 0);
  }, [stats]);

  // 🥧 Most Requested Tour (from Early Access)
  const mostRequestedTour = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.earlyAccess.forEach((d) => {
      if (d.tour_title) counts[d.tour_title] = (counts[d.tour_title] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [filtered.earlyAccess]);

  const COLORS = ["#1f2d28", "#d4a574", "#8b7355", "#f5efe5", "#6b5a47"];

  // 🧠 Loading / Error
  if (loading)
    return (
      <div className="flex items-center justify-center p-10 text-muted-foreground">
        <span className="animate-pulse">Loading dashboard data...</span>
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-600 text-center">
        <p className="font-medium">Error loading dashboard:</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );

  // ✅ Main Dashboard
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-foreground">Filter by Date:</span>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "today", label: "Today" },
            { value: "7days", label: "Last 7 Days" },
            { value: "month", label: "This Month" },
            { value: "year", label: "This Year" },
            { value: "all", label: "All Time" },
          ].map((filter) => (
            <Button
              key={filter.value}
              onClick={() => setDateRange(filter.value)}
              variant={dateRange === filter.value ? "default" : "outline"}
              size="sm"
              className={`${
                dateRange === filter.value
                  ? "bg-secondary text-white border-secondary"
                  : "border-border hover:bg-muted"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            label: "Total Booking Enquiries",
            value: stats.totalBookings,
            sub: "Tour booking submissions",
          },
          {
            label: "Total Contact Messages",
            value: stats.totalContacts,
            sub: "General contact form submissions",
          },
          {
            label: "Early Access Requests",
            value: stats.earlyAccessRequests,
            sub: "Early access signups",
          },
          {
            label: "Homepage Enquiries",
            value: stats.homepageEnquiries,
            sub: "Homepage form submissions",
          },
          {
            label: "Family Package Notifications",
            value: stats.familyPackageNotifications,
            sub: "Family package interested users",
          },
          {
            label: "Total Leads",
            value: stats.totalLeads,
            sub: "All form submissions combined",
          },
        ].map((s, i) => (
          <Card key={i} className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{s.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tours */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Top Tours by Enquiry</CardTitle>
            <CardDescription>Most requested destinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tourPopularity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#1f2d28" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Form Distribution */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Form Distribution</CardTitle>
            <CardDescription>Percentage of submissions per form</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {formDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} submissions`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Requested Tour */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Most Requested Tour</CardTitle>
          <CardDescription>Tour distribution from early access data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mostRequestedTour}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mostRequestedTour.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} requests`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
