import { createServerSupabaseClient } from "@/lib/supabase/server";
import AnalyticsClient from "@/components/analytics-client";

// ── helpers ──────────────────────────────────────────────────────────────

function countStatus(data: any[] | null, status: string) {
  return data?.filter((item) => item.status === status).length || 0;
}

function shortDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

type Props = {
  searchParams: { range?: string };
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default async function AnalyticsPage({ searchParams }: Props) {
  const supabase = createServerSupabaseClient();

  // ── Filter logic ────────────────────────────────────────────────────────
  const range = searchParams.range || "7";

  const now = new Date();
  const fromDate = new Date();

  if (range === "7")  fromDate.setDate(now.getDate() - 7);
  if (range === "30") fromDate.setDate(now.getDate() - 30);
  if (range === "90") fromDate.setDate(now.getDate() - 90);

  const fromISO = fromDate.toISOString();

  // ── Fetch data ───────────────────────────────────────────────────────────
  const [bookings, contacts, homepage, notify] = await Promise.all([
    supabase.from("group_tour_bookings").select("*").gte("created_at", fromISO),
    supabase.from("contact_messages").select("*").gte("created_at", fromISO),
    supabase.from("homepage_inquiries").select("*").gte("created_at", fromISO),
    supabase.from("notify_me").select("*").gte("created_at", fromISO),
  ]);

  // ── Core counts ──────────────────────────────────────────────────────────
  const totalBookings = bookings.data?.length || 0;
  const totalContacts = contacts.data?.length || 0;
  const totalHomepage = homepage.data?.length || 0;
  const totalNotify   = notify.data?.length   || 0;
  const totalLeads    = totalBookings + totalContacts + totalHomepage + totalNotify;

  const interested =
    countStatus(bookings.data, "interested") +
    countStatus(contacts.data, "interested") +
    countStatus(homepage.data, "interested") +
    countStatus(notify.data,   "interested");

  const noResponse =
    countStatus(bookings.data, "no_response") +
    countStatus(contacts.data, "no_response") +
    countStatus(homepage.data, "no_response") +
    countStatus(notify.data,   "no_response");

  const converted =
    countStatus(contacts.data, "converted") +
    countStatus(homepage.data, "converted") +
    countStatus(notify.data,   "converted") +
    countStatus(bookings.data, "confirmed");

  const conversionRate =
    totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) : 0;

  // ── Top tours ─────────────────────────────────────────────────────────────
  const tourMap: Record<string, number> = {};
  bookings.data?.forEach((b) => {
    const tour = b.tour_title || b.destination || "Unknown";
    tourMap[tour] = (tourMap[tour] || 0) + 1;
  });
  const topTours = Object.entries(tourMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) as [string, number][];

  // ── Top destinations (from all sources) ──────────────────────────────────
  const destMap: Record<string, number> = {};
  const allWithDest = [
    ...(bookings.data || []),
    ...(homepage.data || []),
    ...(notify.data || []),
  ];
  allWithDest.forEach((item) => {
    const dest = (item.destination || item.preferred_destination || "").trim();
    if (dest) destMap[dest] = (destMap[dest] || 0) + 1;
  });
  const topDestinations = Object.entries(destMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6) as [string, number][];

  // ── Status breakdown (all sources merged) ────────────────────────────────
  const statusBreakdown: Record<string, number> = {};
  const allItems = [
    ...(bookings.data || []),
    ...(contacts.data || []),
    ...(homepage.data || []),
    ...(notify.data || []),
  ];
  allItems.forEach((item) => {
    const s = item.status || "new";
    statusBreakdown[s] = (statusBreakdown[s] || 0) + 1;
  });

  // ── Tour type breakdown (notify_me + bookings) ────────────────────────────
  const tourTypeMap: Record<string, number> = {};
  notify.data?.forEach((n) => {
    if (n.tour_type) {
      const t = n.tour_type.trim();
      tourTypeMap[t] = (tourTypeMap[t] || 0) + 1;
    }
  });
  bookings.data?.forEach((b) => {
    if (b.tour_type) {
      const t = b.tour_type.trim();
      tourTypeMap[t] = (tourTypeMap[t] || 0) + 1;
    }
  });
  const tourTypeBreakdown = Object.entries(tourTypeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6) as [string, number][];

  // ── Daily leads (bucket by date) ─────────────────────────────────────────
  // Build date keys for the range
  const days = parseInt(range);
  const dateKeys: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    dateKeys.push(shortDate(d.toISOString()));
  }

  const bucket = (items: any[] | null | undefined, key: string) => {
    const map: Record<string, number> = {};
    items?.forEach((item) => {
      const k = shortDate(item.created_at);
      map[k] = (map[k] || 0) + 1;
    });
    return map;
  };

  const bMap = bucket(bookings.data, "bookings");
  const cMap = bucket(contacts.data, "contacts");
  const hMap = bucket(homepage.data, "homepage");
  const nMap = bucket(notify.data,   "notify");

  const dailyLeads = dateKeys.map((date) => ({
    date,
    bookings: bMap[date] || 0,
    contacts: cMap[date] || 0,
    homepage: hMap[date] || 0,
    notify:   nMap[date] || 0,
    total: (bMap[date] || 0) + (cMap[date] || 0) + (hMap[date] || 0) + (nMap[date] || 0),
  }));

  // ── Monthly conversions (last 6 months baseline, for 90d range) ──────────
  const monthlyConversions: { month: string; converted: number; total: number }[] = [];

  return (
    <AnalyticsClient
      data={{
        range,
        totalLeads,
        totalBookings,
        totalContacts,
        totalHomepage,
        totalNotify,
        interested,
        noResponse,
        converted,
        conversionRate,
        topTours,
        topDestinations,
        statusBreakdown,
        dailyLeads,
        tourTypeBreakdown,
        monthlyConversions,
      }}
    />
  );
}