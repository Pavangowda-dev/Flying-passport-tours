import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
  };
}

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  icon,
  href,
  accent,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  href: string;
  accent: { from: string; to: string; border: string; text: string; iconBg: string; iconColor: string };
}) {
  return (
    <Link href={href} className="group block">
      <div className={`relative rounded-2xl bg-gradient-to-br ${accent.from} ${accent.to} border ${accent.border} p-5 overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}>
        {/* Background glow blob */}
        <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-30 ${accent.iconBg}`} />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-slate-500 text-[11px] font-semibold tracking-widest uppercase mb-2">{title}</p>
            <p className={`text-4xl font-bold tabular-nums ${accent.text}`}>{value}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent.iconBg} ${accent.iconColor} shrink-0`}>
            {icon}
          </div>
        </div>

        <div className="relative mt-4 flex items-center gap-1 text-slate-600 text-[11px] group-hover:text-slate-400 transition-colors">
          <span>View all</span>
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 transition-transform group-hover:translate-x-0.5">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// ── Section header ─────────────────────────────────────────────────────────
function SectionHeader({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[15px] font-bold text-white tracking-tight">{title}</h2>
      <Link
        href={href}
        className="text-[11px] font-semibold text-amber-400/70 hover:text-amber-400 transition-colors flex items-center gap-1"
      >
        {linkLabel}
        <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

// ── Status badge (inline mini) ─────────────────────────────────────────────
const statusColors: Record<string, string> = {
  new:            "bg-violet-400/15 text-violet-300",
  contacted:      "bg-sky-400/15 text-sky-300",
  confirmed:      "bg-emerald-400/15 text-emerald-300",
  pending:        "bg-amber-400/15 text-amber-300",
  interested:     "bg-emerald-400/15 text-emerald-300",
  not_interested: "bg-red-400/15 text-red-400",
  converted:      "bg-amber-300/15 text-amber-200",
  cancelled:      "bg-red-400/15 text-red-400",
  follow_up:      "bg-amber-400/15 text-amber-300",
  no_response:    "bg-orange-400/15 text-orange-300",
  spam:           "bg-rose-500/15 text-rose-400",
};

function MiniStatusBadge({ status }: { status: string }) {
  const cls = statusColors[status] ?? statusColors["new"];
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${cls}`}>
      {(status || "new").replace("_", " ")}
    </span>
  );
}

// ── Avatar initial ─────────────────────────────────────────────────────────
function Avatar({ name }: { name?: string }) {
  const letter = name ? name[0].toUpperCase() : "?";
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/20 flex items-center justify-center shrink-0">
      <span className="text-amber-400 text-[11px] font-bold">{letter}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════════
export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

  // ── Fetch counts ──────────────────────────────────────────────────────
  const [bookingsRes, contactRes, homepageRes, notifyRes] = await Promise.all([
    supabase.from("group_tour_bookings").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("homepage_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("notify_me").select("*", { count: "exact", head: true }),
  ]);

  // ── Fetch recent data ─────────────────────────────────────────────────
  const { data: recentBookings } = await supabase
    .from("group_tour_bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentContacts } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // ── Derived: total leads ───────────────────────────────────────────────
  const totalLeads =
    (bookingsRes.count || 0) +
    (contactRes.count || 0) +
    (homepageRes.count || 0) +
    (notifyRes.count || 0);

  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      {/* ── Welcome header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-amber-400/70 text-[11px] font-semibold tracking-widest uppercase mb-1">
            {greeting}, Asha & Kiran 👋
          </p>
          <h1 className="text-[26px] font-bold text-white tracking-tight leading-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Here's what's happening at Flying Passports Tours
          </p>
        </div>

        {/* Total leads pill */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-amber-400">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <div>
            <p className="text-amber-300 font-bold text-lg leading-none tabular-nums">{totalLeads}</p>
            <p className="text-amber-500/60 text-[9px] tracking-widest uppercase font-medium mt-0.5">Total Leads</p>
          </div>
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Bookings"
          value={bookingsRes.count || 0}
          href="/admin/bookings"
          accent={{
            from: "from-sky-500/10", to: "to-sky-600/5",
            border: "border-sky-500/20", text: "text-sky-200",
            iconBg: "bg-sky-500/15", iconColor: "text-sky-400",
          }}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />
        <StatCard
          title="Contact Leads"
          value={contactRes.count || 0}
          href="/admin/contact"
          accent={{
            from: "from-emerald-500/10", to: "to-emerald-600/5",
            border: "border-emerald-500/20", text: "text-emerald-200",
            iconBg: "bg-emerald-500/15", iconColor: "text-emerald-400",
          }}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Homepage Enquiries"
          value={homepageRes.count || 0}
          href="/admin/homepage"
          accent={{
            from: "from-violet-500/10", to: "to-violet-600/5",
            border: "border-violet-500/20", text: "text-violet-200",
            iconBg: "bg-violet-500/15", iconColor: "text-violet-400",
          }}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" strokeLinecap="round" />
              <line x1="8" y1="11" x2="14" y2="11" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          title="Notify Leads"
          value={notifyRes.count || 0}
          href="/admin/notify"
          accent={{
            from: "from-amber-500/10", to: "to-amber-600/5",
            border: "border-amber-500/20", text: "text-amber-200",
            iconBg: "bg-amber-500/15", iconColor: "text-amber-400",
          }}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
        />
      </div>

      {/* ── Recent activity — two columns on lg ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent Bookings */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
          <SectionHeader title="Recent Bookings" href="/admin/bookings" linkLabel="View all" />

          {recentBookings?.length ? (
            <ul className="space-y-2.5">
              {recentBookings.map((item) => {
                const { date } = formatDate(item.created_at);
                return (
                  <li key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors group">
                    <Avatar name={item.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[13px] font-medium truncate leading-tight">
                        {item.name}
                      </p>
                      <p className="text-slate-500 text-[11px] truncate mt-0.5">
                        {item.tour_title || item.destination || "—"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <MiniStatusBadge status={item.status || "new"} />
                      <p className="text-slate-600 text-[10px]">{date}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState label="No bookings yet" />
          )}
        </div>

        {/* Recent Contact Messages */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
          <SectionHeader title="Recent Contact Messages" href="/admin/contact" linkLabel="View all" />

          {recentContacts?.length ? (
            <ul className="space-y-2.5">
              {recentContacts.map((item) => {
                const { date } = formatDate(item.created_at);
                return (
                  <li key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <Avatar name={item.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[13px] font-medium truncate leading-tight">
                        {item.name}
                      </p>
                      <p className="text-slate-500 text-[11px] truncate mt-0.5">
                        {item.message ? item.message.slice(0, 50) + (item.message.length > 50 ? "…" : "") : item.email}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <MiniStatusBadge status={item.status || "new"} />
                      <p className="text-slate-600 text-[10px]">{date}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState label="No messages yet" />
          )}
        </div>
      </div>

      {/* ── Quick nav links ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Homepage Enquiries", href: "/admin/homepage", icon: "🔍", count: homepageRes.count || 0 },
          { label: "Notify Me Leads",    href: "/admin/notify",   icon: "🔔", count: notifyRes.count || 0 },
          { label: "Analytics",          href: "/admin/analytics",icon: "📈", count: null },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-150 group"
          >
            <span className="text-xl leading-none">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-300 text-[13px] font-medium group-hover:text-white transition-colors truncate">
                {link.label}
              </p>
              {link.count !== null && (
                <p className="text-slate-600 text-[11px] mt-0.5">{link.count} record{link.count !== 1 ? "s" : ""}</p>
              )}
            </div>
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-all group-hover:translate-x-0.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <p className="text-slate-800 text-[10px] text-center tracking-widest uppercase pb-1">
        Flying Passports Tours · Karnataka 🇮🇳
      </p>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="py-8 text-center">
      <p className="text-slate-600 text-sm">{label}</p>
    </div>
  );
}