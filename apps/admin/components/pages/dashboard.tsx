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

        setContacts(contactRes.data ?? []);
        setEarlyAccess(earlyRes.data ?? []);
        setBookings(bookingRes.data ?? []);
        setHomepage(homeRes.data ?? []);
        setNotify(notifyRes.data ?? []);
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
    const total = stats.totalLeads || 1;
    return [
      { name: "Tour Bookings", value: stats.totalBookings },
      { name: "Contact Messages", value: stats.totalContacts },
      { name: "Early Access", value: stats.earlyAccessRequests },
      { name: "Homepage Enquiries", value: stats.homepageEnquiries },
      { name: "Family Package Notify", value: stats.familyPackageNotifications },
    ].filter((i) => i.value > 0);
  }, [stats]);

  const COLORS = ["#1f2d28", "#d4a574", "#8b7355", "#f5efe5", "#6b5a47"];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10 text-muted-foreground">
        Loading dashboard data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 text-center">
        <p className="font-medium">Error loading dashboard</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
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
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(stats).map(([k, v]) => (
          <Card key={k}>
            <CardHeader>
              <CardTitle className="text-sm">{k}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{v}</CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Tours</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tourPopularity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1f2d28" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={formDistribution} dataKey="value" outerRadius={90}>
                  {formDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
