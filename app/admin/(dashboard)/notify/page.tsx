import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NotifyStatusBadge, NotifyStatusForm } from "@/components/notify-status-form";

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
  };
}

function DetailPill({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 text-[11px]">
      <span className="text-sm leading-none">{icon}</span>
      <span className="capitalize">{label}</span>
    </span>
  );
}

export default async function NotifyPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("notify_me")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6 text-red-400">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Failed to load notify data</p>
            <p className="text-slate-500 text-xs mt-1">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const total          = data?.length ?? 0;
  const newCount       = data?.filter((n) => !n.status || n.status === "new").length ?? 0;
  const convertedCount = data?.filter((n) => n.status === "converted").length ?? 0;
  const interestedCount= data?.filter((n) => n.status === "interested").length ?? 0;

  // Top tour types from existing data
  const tourTypeMap: Record<string, number> = {};
  data?.forEach((n) => {
    if (n.tour_type) {
      const key = n.tour_type.trim();
      tourTypeMap[key] = (tourTypeMap[key] || 0) + 1;
    }
  });
  const topTourTypes = Object.entries(tourTypeMap).sort((a, b) => b[1] - a[1]).slice(0, 4);

  return (
    <div className="space-y-7">

      {/* ── Page header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">
            Notify Me Leads
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            People who signed up to be notified about upcoming tours
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-slate-300 font-medium text-sm">{total} total</span>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",      value: total,           color: "from-slate-500/20 to-slate-600/10",   border: "border-slate-500/20",   text: "text-slate-200" },
          { label: "New",        value: newCount,        color: "from-violet-500/20 to-violet-600/10", border: "border-violet-500/20",  text: "text-violet-300" },
          { label: "Interested", value: interestedCount, color: "from-emerald-500/20 to-emerald-600/10",border: "border-emerald-500/20",text: "text-emerald-300" },
          { label: "Converted",  value: convertedCount,  color: "from-amber-500/20 to-amber-600/10",   border: "border-amber-500/20",   text: "text-amber-300" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} p-4`}>
            <p className="text-slate-500 text-[11px] font-semibold tracking-widest uppercase">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.text}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Tour type interest bar ────────────────────────────── */}
      {topTourTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-slate-600 text-[11px] font-semibold tracking-widest uppercase">Tour Interest:</span>
          {topTourTypes.map(([type, count]) => (
            <span key={type} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-300 text-[11px] font-semibold">
              🧭 {type}
              <span className="text-violet-500/60 font-normal">×{count}</span>
            </span>
          ))}
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────── */}
      {total === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-slate-600">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium text-sm">No notify leads yet</p>
          <p className="text-slate-600 text-xs mt-1">Notify Me sign-ups will appear here</p>
        </div>
      )}

      {total > 0 && (
        <>
          {/* ── Desktop table ─────────────────────────────────── */}
          <div className="hidden md:block rounded-2xl border border-white/[0.07] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/[0.07]">
                    {["#", "Contact", "Tour Details", "Signed Up", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left text-[10px] font-bold tracking-[0.15em] uppercase text-slate-600 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {data?.map((item, idx) => {
                    const { date, time } = formatDate(item.created_at);
                    const initials = item.name
                      ? item.name[0].toUpperCase()
                      : item.mobile_number?.[0] ?? "?";

                    return (
                      <tr key={item.id} className="hover:bg-white/[0.025] transition-colors duration-150">

                        {/* Index */}
                        <td className="px-4 py-4 text-slate-600 text-[11px] font-mono">
                          {String(idx + 1).padStart(2, "0")}
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/20 flex items-center justify-center shrink-0">
                              <span className="text-amber-400 text-xs font-bold">{initials}</span>
                            </div>
                            <div>
                              {item.name && (
                                <p className="text-white font-medium text-[13px] leading-tight">{item.name}</p>
                              )}
                              <p className={`text-slate-400 text-[12px] ${item.name ? "mt-0.5" : ""}`}>
                                📱 {item.mobile_number}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Details */}
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {item.tour_type && <DetailPill icon="🧭" label={item.tour_type} />}
                            {item.preferred_destination && <DetailPill icon="🌍" label={item.preferred_destination} />}
                            {item.preferred_month && <DetailPill icon="📅" label={item.preferred_month} />}
                            {!item.tour_type && !item.preferred_destination && !item.preferred_month && (
                              <span className="text-slate-600 text-[12px]">—</span>
                            )}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-slate-300 text-[12px]">{date}</p>
                          <p className="text-slate-600 text-[11px] mt-0.5">{time}</p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <NotifyStatusBadge status={item.status || "new"} />
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <NotifyStatusForm notifyId={item.id} currentStatus={item.status || "new"} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Mobile cards ──────────────────────────────────── */}
          <div className="md:hidden space-y-3">
            {data?.map((item, idx) => {
              const { date, time } = formatDate(item.created_at);
              const initials = item.name
                ? item.name[0].toUpperCase()
                : item.mobile_number?.[0] ?? "?";

              return (
                <div key={item.id} className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-4 space-y-3">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/20 flex items-center justify-center shrink-0">
                        <span className="text-amber-400 text-sm font-bold">{initials}</span>
                      </div>
                      <div>
                        {item.name && (
                          <p className="text-white font-semibold text-[13px] leading-tight">{item.name}</p>
                        )}
                        <p className={`text-slate-400 text-[12px] ${item.name ? "mt-0.5" : ""}`}>
                          📱 {item.mobile_number}
                        </p>
                        <p className="text-slate-600 text-[10px] mt-0.5">#{String(idx + 1).padStart(3, "0")}</p>
                      </div>
                    </div>
                    <NotifyStatusBadge status={item.status || "new"} />
                  </div>

                  {/* Tour details pills */}
                  {(item.tour_type || item.preferred_destination || item.preferred_month) && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tour_type && <DetailPill icon="🧭" label={item.tour_type} />}
                      {item.preferred_destination && <DetailPill icon="🌍" label={item.preferred_destination} />}
                      {item.preferred_month && <DetailPill icon="📅" label={item.preferred_month} />}
                    </div>
                  )}

                  {/* Date */}
                  <div className="bg-white/[0.03] rounded-xl px-3 py-2">
                    <p className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase mb-1">Signed Up</p>
                    <p className="text-slate-300 text-[12px]">{date} · {time}</p>
                  </div>

                  {/* Action */}
                  <div className="pt-1 border-t border-white/[0.06]">
                    <NotifyStatusForm notifyId={item.id} currentStatus={item.status || "new"} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Footer count */}
      {total > 0 && (
        <p className="text-slate-700 text-xs text-center pb-2">
          Showing {total} lead{total !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}