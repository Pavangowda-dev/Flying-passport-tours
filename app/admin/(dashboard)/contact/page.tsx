import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ContactStatusBadge, ContactStatusForm, MessageExpand } from "@/components/contact-status-form";

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
  };
}

export default async function ContactPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("contact_messages")
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
            <p className="text-white font-semibold text-sm">Failed to load contact messages</p>
            <p className="text-slate-500 text-xs mt-1">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const total = data?.length ?? 0;
  const newCount      = data?.filter((m) => !m.status || m.status === "new").length ?? 0;
  const convertedCount = data?.filter((m) => m.status === "converted").length ?? 0;
  const spamCount     = data?.filter((m) => m.status === "spam").length ?? 0;

  return (
    <div className="space-y-7">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">
            Contact Messages
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Enquiries sent from the website contact form
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07] text-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-slate-300 font-medium">{total} total</span>
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",     value: total,          color: "from-slate-500/20 to-slate-600/10",    border: "border-slate-500/20",   text: "text-slate-200" },
          { label: "New",       value: newCount,       color: "from-violet-500/20 to-violet-600/10",  border: "border-violet-500/20",  text: "text-violet-300" },
          { label: "Converted", value: convertedCount, color: "from-amber-500/20 to-amber-600/10",    border: "border-amber-500/20",   text: "text-amber-300" },
          { label: "Spam",      value: spamCount,      color: "from-rose-500/20 to-rose-600/10",      border: "border-rose-500/20",    text: "text-rose-300" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} p-4`}>
            <p className="text-slate-500 text-[11px] font-semibold tracking-widest uppercase">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.text}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Empty state ─────────────────────────────────────── */}
      {total === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-slate-600">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium text-sm">No messages yet</p>
          <p className="text-slate-600 text-xs mt-1">Contact form submissions will appear here</p>
        </div>
      )}

      {total > 0 && (
        <>
          {/* ── Desktop table ───────────────────────────────── */}
          <div className="hidden md:block rounded-2xl border border-white/[0.07] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/[0.07]">
                    {["#", "Name", "Contact", "Message", "Received", "Status", "Actions"].map((h) => (
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

                        {/* Contact */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-400 text-[12px]">
                              <span>✉️</span>
                              <span className="truncate max-w-[160px]">{item.email}</span>
                            </div>
                            {item.phone && (
                              <div className="flex items-center gap-1.5 text-slate-500 text-[12px]">
                                <span>📱</span>
                                <span>{item.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Message */}
                        <td className="px-4 py-4 max-w-[260px]">
                          <MessageExpand message={item.message} />
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-slate-300 text-[12px]">{date}</p>
                          <p className="text-slate-600 text-[11px] mt-0.5">{time}</p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <ContactStatusBadge status={item.status || "new"} />
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <ContactStatusForm messageId={item.id} currentStatus={item.status || "new"} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Mobile cards ────────────────────────────────── */}
          <div className="md:hidden space-y-3">
            {data?.map((item, idx) => {
              const { date, time } = formatDate(item.created_at);
              return (
                <div key={item.id} className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-4 space-y-3">

                  {/* Card header */}
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
                    <ContactStatusBadge status={item.status || "new"} />
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 gap-2 text-[12px]">
                    <div className="bg-white/[0.03] rounded-xl p-2.5">
                      <p className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase mb-1">Contact</p>
                      <p className="text-slate-300">✉️ {item.email}</p>
                      {item.phone && <p className="text-slate-400 mt-0.5">📱 {item.phone}</p>}
                    </div>

                    <div className="bg-white/[0.03] rounded-xl p-2.5">
                      <p className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase mb-1">Message</p>
                      <MessageExpand message={item.message} />
                    </div>

                    <div className="bg-white/[0.03] rounded-xl p-2.5">
                      <p className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase mb-1">Received</p>
                      <p className="text-slate-300">{date} · {time}</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-1 border-t border-white/[0.06]">
                    <ContactStatusForm messageId={item.id} currentStatus={item.status || "new"} />
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
          Showing {total} message{total !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}