import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EnquiryStatusBadge, EnquiryStatusForm } from "@/components/enquiry-status-form";

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
  };
}

// Globe icon for destinations
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5 shrink-0 text-amber-400/60">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default async function HomepageEnquiryPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("homepage_inquiries")
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
            <p className="text-white font-semibold text-sm">Failed to load enquiries</p>
            <p className="text-slate-500 text-xs mt-1">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const total        = data?.length ?? 0;
  const newCount     = data?.filter((e) => !e.status || e.status === "new").length ?? 0;
  const convertedCount = data?.filter((e) => e.status === "converted").length ?? 0;
  const followUpCount  = data?.filter((e) => e.status === "follow_up").length ?? 0;

  // Top destinations
  const destMap: Record<string, number> = {};
  data?.forEach((e) => {
    const dest = (e.preferred_destination || "Unknown").trim();
    destMap[dest] = (destMap[dest] || 0) + 1;
  });
  const topDests = Object.entries(destMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="space-y-7">

      {/* ── Page header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">
            Homepage Enquiries
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Leads submitted via the homepage quick-enquiry form
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-slate-300 font-medium text-sm">{total} total</span>
        </div>
      </div>

      {/* ── Stats + Top Destinations ─────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",     value: total,          color: "from-slate-500/20 to-slate-600/10",   border: "border-slate-500/20",  text: "text-slate-200" },
          { label: "New",       value: newCount,       color: "from-violet-500/20 to-violet-600/10", border: "border-violet-500/20", text: "text-violet-300" },
          { label: "Converted", value: convertedCount, color: "from-amber-500/20 to-amber-600/10",   border: "border-amber-500/20",  text: "text-amber-300" },
          { label: "Follow-up", value: followUpCount,  color: "from-sky-500/20 to-sky-600/10",       border: "border-sky-500/20",    text: "text-sky-300" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} p-4`}>
            <p className="text-slate-500 text-[11px] font-semibold tracking-widest uppercase">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.text}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Top destinations strip ───────────────────────────── */}
      {topDests.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-slate-600 text-[11px] font-semibold tracking-widest uppercase">Top Destinations:</span>
          {topDests.map(([dest, count]) => (
            <span key={dest} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[11px] font-semibold">
              <GlobeIcon />
              {dest}
              <span className="text-amber-500/60 font-normal">×{count}</span>
            </span>
          ))}
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────── */}
      {total === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-slate-600">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" strokeLinecap="round" />
              <line x1="8" y1="11" x2="14" y2="11" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium text-sm">No enquiries yet</p>
          <p className="text-slate-600 text-xs mt-1">Homepage enquiry submissions will appear here</p>
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
                    {["#", "Name", "Phone", "Destination", "Received", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left text-[10px] font-bold tracking-[0.15em] uppercase text-slate-600 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {data?.map((item, idx) => {
                    const { date, time } = formatDate(item.created_at);
                    return (
                      <tr key={item.id} className="hover:bg-white/[0.025] transition-colors duration-150">

                        {/* Index */}
                        <td className="px-4 py-4 text-slate-600 text-[11px] font-mono">
                          {String(idx + 1).padStart(2, "0")}
                        </td>

                        {/* Name */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/20 flex items-center justify-center shrink-0">
                              <span className="text-amber-400 text-xs font-bold">
                                {(item.name ?? "?")[0].toUpperCase()}
                              </span>
                            </div>
                            <span className="text-white font-medium text-[13px]">{item.name}</span>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 text-slate-400 text-[12px]">
                            <span>📱</span>
                            <span>{item.mobile_number}</span>
                          </div>
                        </td>

                        {/* Destination */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <GlobeIcon />
                            <span className="text-slate-300 text-[13px] capitalize">
                              {item.preferred_destination || "—"}
                            </span>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-slate-300 text-[12px]">{date}</p>
                          <p className="text-slate-600 text-[11px] mt-0.5">{time}</p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <EnquiryStatusBadge status={item.status || "new"} />
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <EnquiryStatusForm enquiryId={item.id} currentStatus={item.status || "new"} />
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
              return (
                <div key={item.id} className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-4 space-y-3">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/20 flex items-center justify-center shrink-0">
                        <span className="text-amber-400 text-sm font-bold">
                          {(item.name ?? "?")[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-[13px] leading-tight">{item.name}</p>
                        <p className="text-slate-500 text-[10px] mt-0.5">#{String(idx + 1).padStart(3, "0")}</p>
                      </div>
                    </div>
                    <EnquiryStatusBadge status={item.status || "new"} />
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 text-[12px]">
                    <div className="bg-white/[0.03] rounded-xl p-2.5">
                      <p className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase mb-1">Phone</p>
                      <p className="text-slate-300">📱 {item.mobile_number}</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-xl p-2.5">
                      <p className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase mb-1">Destination</p>
                      <div className="flex items-center gap-1">
                        <GlobeIcon />
                        <p className="text-slate-300 capitalize truncate">{item.preferred_destination || "—"}</p>
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-xl p-2.5 col-span-2">
                      <p className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase mb-1">Received</p>
                      <p className="text-slate-300">{date} · {time}</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-1 border-t border-white/[0.06]">
                    <EnquiryStatusForm enquiryId={item.id} currentStatus={item.status || "new"} />
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
          Showing {total} enquir{total !== 1 ? "ies" : "y"}
        </p>
      )}
    </div>
  );
}