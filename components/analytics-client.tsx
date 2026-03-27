"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────
export type AnalyticsData = {
  range: string;
  totalLeads: number;
  totalBookings: number;
  totalContacts: number;
  totalHomepage: number;
  totalNotify: number;
  interested: number;
  noResponse: number;
  converted: number;
  conversionRate: string | number;
  topTours: [string, number][];
  topDestinations: [string, number][];
  statusBreakdown: Record<string, number>;
  dailyLeads: { date: string; bookings: number; contacts: number; homepage: number; notify: number; total: number }[];
  tourTypeBreakdown: [string, number][];
  monthlyConversions: { month: string; converted: number; total: number }[];
};

// ── Palette ────────────────────────────────────────────────────────────────
const COLORS = ["#f59e0b", "#38bdf8", "#a78bfa", "#34d399", "#f87171", "#fb923c", "#e879f9"];

const RANGE_OPTIONS = [
  { label: "7 Days",    value: "7" },
  { label: "30 Days",   value: "30" },
  { label: "3 Months",  value: "90" },
];

// ── Custom tooltip ─────────────────────────────────────────────────────────
const DarkTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0e1628] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl text-xs">
      {label && <p className="text-slate-400 mb-2 font-medium">{label}</p>}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="text-white font-bold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ── Stat card ──────────────────────────────────────────────────────────────
function KpiCard({
  label, value, sub, accent,
}: { label: string; value: string | number; sub?: string; accent: string }) {
  return (
    <div className={`rounded-2xl border p-5 bg-gradient-to-br ${accent} relative overflow-hidden`}>
      <div className="relative">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-500 mb-2">{label}</p>
        <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
        {sub && <p className="text-slate-500 text-[11px] mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <h3 className="text-[13px] font-bold text-white tracking-tight mb-5">{title}</h3>
      {children}
    </div>
  );
}

// ── Bar chart label ────────────────────────────────────────────────────────
const xAxisStyle = { fontSize: 11, fill: "#475569" };
const yAxisStyle = { fontSize: 11, fill: "#475569" };

// ══════════════════════════════════════════════════════════════════════════
// MAIN CLIENT COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function AnalyticsClient({ data }: { data: AnalyticsData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeRange = searchParams.get("range") || "7";

  const handleRange = (val: string) => {
    router.push(`/admin/analytics?range=${val}`);
  };

  // Source breakdown for pie
  const sourceData = [
    { name: "Bookings",  value: data.totalBookings },
    { name: "Contact",   value: data.totalContacts },
    { name: "Homepage",  value: data.totalHomepage },
    { name: "Notify Me", value: data.totalNotify },
  ].filter((d) => d.value > 0);

  // Status breakdown for horizontal bar
  const statusData = Object.entries(data.statusBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([status, count]) => ({ status: status.replace(/_/g, " "), count }));

  // Tour type donut
  const tourTypeData = data.tourTypeBreakdown.map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-7">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Performance overview for Flying Passports Tours</p>
        </div>

        {/* Range filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.07]">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleRange(opt.value)}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold tracking-wide transition-all duration-150 ${
                activeRange === opt.value
                  ? "bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI strip ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiCard label="Total Leads"  value={data.totalLeads}       accent="from-slate-500/15 to-slate-600/5 border-slate-500/20" />
        <KpiCard label="Bookings"     value={data.totalBookings}    accent="from-sky-500/15 to-sky-600/5 border-sky-500/20" />
        <KpiCard label="Interested"   value={data.interested}       accent="from-emerald-500/15 to-emerald-600/5 border-emerald-500/20" />
        <KpiCard label="No Response"  value={data.noResponse}       accent="from-orange-500/15 to-orange-600/5 border-orange-500/20" />
        <KpiCard
          label="Conversion Rate"
          value={`${data.conversionRate}%`}
          sub={`${data.converted} converted`}
          accent="from-amber-500/15 to-amber-600/5 border-amber-500/20"
        />
      </div>

      {/* ── Row 1: Daily trend + Source pie ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Daily leads trend — takes 2/3 */}
        <div className="lg:col-span-2">
          <Section title="Daily Leads Trend">
            {data.dailyLeads.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.dailyLeads} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={xAxisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={yAxisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<DarkTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "#94a3b8", paddingTop: 12 }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Line type="monotone" dataKey="bookings"  stroke="#38bdf8" strokeWidth={2} dot={false} name="Bookings" />
                  <Line type="monotone" dataKey="contacts"  stroke="#a78bfa" strokeWidth={2} dot={false} name="Contact" />
                  <Line type="monotone" dataKey="homepage"  stroke="#34d399" strokeWidth={2} dot={false} name="Homepage" />
                  <Line type="monotone" dataKey="notify"    stroke="#f59e0b" strokeWidth={2} dot={false} name="Notify" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart />
            )}
          </Section>
        </div>

        {/* Source breakdown pie — 1/3 */}
        <Section title="Leads by Source">
          {sourceData.length > 0 ? (
            <div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sourceData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<DarkTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <ul className="space-y-2 mt-2">
                {sourceData.map((d, i) => (
                  <li key={d.name} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-slate-400">{d.name}</span>
                    </div>
                    <span className="text-white font-semibold tabular-nums">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <EmptyChart />
          )}
        </Section>
      </div>

      {/* ── Row 2: Top tours bar + Status breakdown ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Top tours */}
        <Section title="Top Tours / Destinations">
          {data.topTours.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={data.topTours.map(([name, count]) => ({ name: name.length > 22 ? name.slice(0, 22) + "…" : name, count }))}
                layout="vertical"
                margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={xAxisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={xAxisStyle} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={<DarkTooltip />} />
                <Bar dataKey="count" name="Bookings" radius={[0, 6, 6, 0]} fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart label="No booking data in this period" />
          )}
        </Section>

        {/* Status breakdown */}
        <Section title="Lead Status Breakdown">
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={statusData}
                layout="vertical"
                margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={xAxisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="status" tick={xAxisStyle} axisLine={false} tickLine={false} width={100} />
                <Tooltip content={<DarkTooltip />} />
                <Bar dataKey="count" name="Count" radius={[0, 6, 6, 0]}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart label="No status data in this period" />
          )}
        </Section>
      </div>

      {/* ── Row 3: Top destinations + Tour type donut ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Top destinations */}
        <Section title="Top Requested Destinations">
          {data.topDestinations.length > 0 ? (
            <div className="space-y-2.5">
              {data.topDestinations.map(([dest, count], i) => {
                const max = data.topDestinations[0][1];
                const pct = Math.round((count / max) * 100);
                return (
                  <div key={dest}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-slate-300 capitalize flex items-center gap-1.5">
                        <span className="text-base">🌍</span> {dest}
                      </span>
                      <span className="text-white font-semibold tabular-nums">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: COLORS[i % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyChart label="No destination data in this period" />
          )}
        </Section>

        {/* Tour type breakdown */}
        <Section title="Tour Type Interest">
          {tourTypeData.length > 0 ? (
            <div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={tourTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {tourTypeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<DarkTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <ul className="space-y-2 mt-1">
                {tourTypeData.map((d, i) => (
                  <li key={d.name} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-slate-400 capitalize">{d.name}</span>
                    </div>
                    <span className="text-white font-semibold tabular-nums">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <EmptyChart label="No tour type data in this period" />
          )}
        </Section>
      </div>

      {/* ── Row 4: Total leads column chart ─────────────────────── */}
      <Section title="Total Leads Over Time">
        {data.dailyLeads.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.dailyLeads} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={xAxisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={yAxisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<DarkTooltip />} />
              <Bar dataKey="total" name="Total Leads" radius={[4, 4, 0, 0]}>
                {data.dailyLeads.map((_, i) => (
                  <Cell key={i} fill={`rgba(245,158,11,${0.4 + (i / data.dailyLeads.length) * 0.6})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </Section>

      {/* Footer */}
      <p className="text-slate-800 text-[10px] text-center tracking-widest uppercase pb-1">
        Flying Passports Tours · Karnataka 🇮🇳 · Data for last {
          activeRange === "7" ? "7 days" : activeRange === "30" ? "30 days" : "3 months"
        }
      </p>
    </div>
  );
}

function EmptyChart({ label = "No data in this period" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center h-28 text-slate-600 text-[12px]">
      {label}
    </div>
  );
}