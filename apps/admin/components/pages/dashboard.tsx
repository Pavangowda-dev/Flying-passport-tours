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
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import {
  isThisMonth,
  isThisYear,
  isToday,
  subDays,
} from "date-fns";
import { DollarSign, Users, MessageCircle, Calendar, TrendingUp, AlertCircle } from "lucide-react";

interface StatItem {
  key: string;
  label: string;
  value: number;
  icon: React.ReactNode;
  change?: string;
}

export function DashboardPage() {
  // ✅ Create Supabase ONLY in browser
  const supabase = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createSupabaseBrowser();
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("all");

  const [contacts, setContacts] = useState<any[]>([]);
  const [earlyAccess, setEarlyAccess] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [homepage, setHomepage] = useState<any[]>([]);
  const [notify, setNotify] = useState<any[]>([]);

  // 🔐 Fetch data ONLY when supabase exists
  useEffect(() => {
    if (!supabase) return;

    async function fetchAll() {
      try {
        setLoading(true);
        setError(null);

        // Fetch each table individually with error handling
        const fetchTable = async (table: string) => {
          const { data, error } = await supabase.from(table).select("*");
          if (error) {
            console.warn(`⚠️ Failed to fetch ${table}:`, error.message);
            return [];
          }
          return data ?? [];
        };

        const [
          contactRes,
          earlyRes,
          bookingRes,
          homeRes,
          notifyRes,
        ] = await Promise.all([
          fetchTable("contact_messages"),
          fetchTable("early_access_registrations"),
          fetchTable("group_tour_bookings"),
          fetchTable("homepage_inquiries"), // If table doesn't exist, logs warning and uses []
          fetchTable("notify_me"), // If table doesn't exist, logs warning and uses []
        ]);

        setContacts(contactRes);
        setEarlyAccess(earlyRes);
        setBookings(bookingRes);
        setHomepage(homeRes);
        setNotify(notifyRes);
      } catch (err: any) {
        console.error("🔥 Dashboard fetch error:", err);
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [supabase]);

  // 🧭 Date filter
  const dateFilterFn = (dateStr: string) => {
    if (!dateStr) return false;
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

  const filtered = useMemo(() => {
    return {
      contacts: contacts.filter((d) => dateFilterFn(d.created_at)),
      earlyAccess: earlyAccess.filter((d) => dateFilterFn(d.created_at)),
      bookings: bookings.filter((d) => dateFilterFn(d.created_at)),
      homepage: homepage.filter((d) => dateFilterFn(d.created_at)),
      notify: notify.filter((d) => dateFilterFn(d.created_at)),
    };
  }, [contacts, earlyAccess, bookings, homepage, notify, dateRange]);

  const stats: StatItem[] = useMemo(() => [
    {
      key: "totalContacts",
      label: "Contact Messages",
      value: filtered.contacts.length,
      icon: <MessageCircle className="h-4 w-4" />,
      change: "+28% from last month",
    },
    {
      key: "totalBookings",
      label: "Tour Bookings",
      value: filtered.bookings.length,
      icon: <DollarSign className="h-4 w-4" />,
      change: "+19% from last month",
    },
    {
      key: "earlyAccessRequests",
      label: "Early Access Requests",
      value: filtered.earlyAccess.length,
      icon: <AlertCircle className="h-4 w-4" />,
      change: "+201 since last hour",
    },
    {
      key: "homepageEnquiries",
      label: "Homepage Enquiries",
      value: filtered.homepage.length,
      icon: <Users className="h-4 w-4" />,
      change: "+12% this week",
    },
    {
      key: "familyPackageNotifications",
      label: "Family Package Notifications",
      value: filtered.notify.length,
      icon: <Calendar className="h-4 w-4" />,
      change: "+5 today",
    },
  ], [filtered]);

  const totalLeads = stats.reduce((sum, stat) => sum + stat.value, 0);

  const tourPopularity = useMemo(() => {
    const counts: Record<string, number> = {};

    filtered.earlyAccess.forEach(
      (d) => d.tour_title && (counts[d.tour_title] = (counts[d.tour_title] || 0) + 1)
    );
    filtered.bookings.forEach(
      (d) => d.tour_title && (counts[d.tour_title] = (counts[d.tour_title] || 0) + 1)
    );
    filtered.homepage.forEach(
      (d) =>
        d.preferred_destination &&
        (counts[d.preferred_destination] =
          (counts[d.preferred_destination] || 0) + 1)
    );

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [filtered]);

  const formDistribution = useMemo(() => {
    const total = totalLeads || 1;
    return [
      { name: "Tour Bookings", value: stats.find(s => s.key === "totalBookings")?.value || 0 },
      { name: "Contact Messages", value: stats.find(s => s.key === "totalContacts")?.value || 0 },
      { name: "Early Access", value: stats.find(s => s.key === "earlyAccessRequests")?.value || 0 },
      { name: "Homepage Enquiries", value: stats.find(s => s.key === "homepageEnquiries")?.value || 0 },
      { name: "Family Package Notify", value: stats.find(s => s.key === "familyPackageNotifications")?.value || 0 },
    ].filter((i) => i.value > 0);
  }, [stats, totalLeads]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 text-center space-y-2">
        <AlertCircle className="h-8 w-8 mx-auto" />
        <p className="font-medium">Error loading dashboard</p>
        <p className="text-sm">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: "today", label: "Today" },
          { value: "7days", label: "Last 7 Days" },
          { value: "month", label: "This Month" },
          { value: "year", label: "This Year" },
          { value: "all", label: "All Time" },
        ].map((f) => (
          <Button
            key={f.value}
            size="sm"
            variant={dateRange === f.value ? "default" : "outline"}
            onClick={() => setDateRange(f.value)}
            className="flex-shrink-0"
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Key metrics for {dateRange === "all" ? "all time" : dateRange.replace(/([A-Z])/g, " $1").toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat) => (
              <div key={stat.key} className="space-y-1 text-center">
                <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                  {stat.icon}
                  <span className="text-sm">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                {stat.change && <p className="text-xs text-green-600">{stat.change}</p>}
              </div>
            ))}
            <div className="space-y-1 text-center border-l md:border-l-0 lg:border-l border-muted">
              <div className="text-sm text-muted-foreground">Total Leads</div>
              <div className="text-2xl font-bold text-foreground">{totalLeads}</div>
              <div className="flex items-center justify-center space-x-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>+15% overall</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Tours & Destinations</CardTitle>
            <CardDescription>Popularity based on bookings and inquiries</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tourPopularity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0088FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources Distribution</CardTitle>
            <CardDescription>Breakdown of form submissions</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {formDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}`, "Submissions"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Last 5 entries across all forms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...filtered.contacts, ...filtered.bookings, ...filtered.earlyAccess]
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .slice(0, 5)
              .map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <span className="text-sm">{item.name || item.email || "Anonymous"} - {item.message?.substring(0, 50)}...</span>
                  <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              )) || <p className="text-muted-foreground text-sm">No recent activity</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}