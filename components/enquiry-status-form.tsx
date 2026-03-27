"use client";

import { useState } from "react";

const statusOptions = [
  { value: "contacted",     label: "Contacted" },
  { value: "no_response",   label: "No Response" },
  { value: "interested",    label: "Interested" },
  { value: "not_interested",label: "Not Interested" },
  { value: "follow_up",     label: "Follow-up Required" },
  { value: "converted",     label: "Converted ⭐" },
  { value: "spam",          label: "Spam" },
];

const statusMeta: Record<string, { color: string; bg: string; dot: string; label: string }> = {
  contacted:      { color: "text-sky-400",     bg: "bg-sky-400/10",     dot: "bg-sky-400",     label: "Contacted" },
  no_response:    { color: "text-orange-400",  bg: "bg-orange-400/10",  dot: "bg-orange-400",  label: "No Response" },
  interested:     { color: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400", label: "Interested" },
  not_interested: { color: "text-red-400",     bg: "bg-red-400/10",     dot: "bg-red-400",     label: "Not Interested" },
  follow_up:      { color: "text-amber-400",   bg: "bg-amber-400/10",   dot: "bg-amber-400",   label: "Follow-up" },
  converted:      { color: "text-amber-300",   bg: "bg-amber-300/10",   dot: "bg-amber-300",   label: "Converted ⭐" },
  spam:           { color: "text-rose-500",    bg: "bg-rose-500/10",    dot: "bg-rose-500",    label: "Spam" },
  new:            { color: "text-violet-400",  bg: "bg-violet-400/10",  dot: "bg-violet-400",  label: "New" },
};

export function EnquiryStatusBadge({ status }: { status: string }) {
  const s = statusMeta[status] ?? statusMeta["new"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${s.bg} ${s.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export function EnquiryStatusForm({
  enquiryId,
  currentStatus,
}: {
  enquiryId: string;
  currentStatus: string;
}) {
  const [selected, setSelected] = useState(currentStatus || "new");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    const formData = new FormData(e.currentTarget);
    try {
      await fetch(`/admin/homepage/${enquiryId}`, { method: "POST", body: formData });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative">
        <select
          name="status"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-[12px] font-medium bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:border-amber-400/40 focus:border-amber-400/60 focus:outline-none transition-colors cursor-pointer"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0e1628] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg viewBox="0 0 10 6" fill="none" className="w-2.5 h-2.5 text-slate-500">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold tracking-wide transition-all duration-200 min-w-[64px] text-center ${
          saved
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 active:scale-95"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
            </svg>
          </span>
        ) : saved ? "✓ Saved" : "Update"}
      </button>
    </form>
  );
}