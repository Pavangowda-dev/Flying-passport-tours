"use client";

import { useState } from "react";
import { adminLogin } from "./actions";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await adminLogin(formData);

    if (res && !res.success) {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a15] relative overflow-hidden px-4">

      {/* ── Ambient background blobs ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-sky-500/[0.05] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-amber-400/[0.03] blur-[80px]" />
      </div>

      {/* ── Subtle grid pattern overlay ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Card ────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[400px]">

        {/* Glow ring behind card */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-amber-400/20 via-transparent to-sky-500/10 blur-[1px]" />

        <div className="relative rounded-3xl bg-[#080e1e]/90 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)]">

          {/* Top accent bar */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

          <div className="p-8 sm:p-10">

            {/* ── Brand ─────────────────────────────────────────── */}
            <div className="flex flex-col items-center mb-8">
              {/* Logo mark */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)] mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-7 h-7">
                  <path d="M22 16.5l-10 5-10-5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 11.5l-10 5-10-5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h1 className="text-white text-xl font-bold tracking-tight leading-none">
                Flying Passports Tours
              </h1>
              <p className="text-amber-400/60 text-[10px] tracking-[0.22em] uppercase font-semibold mt-1.5">
                Admin Portal
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3 w-full mt-6">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-slate-600 text-[10px] tracking-widest uppercase">Sign in</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
            </div>

            {/* ── Form ─────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-500">
                  Email
                </label>
                <div className="relative group">
                  {/* Icon */}
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 group-focus-within:text-amber-400 transition-colors">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
                      <path d="M2.5 5.833A1.667 1.667 0 0 1 4.167 4.167h11.666A1.667 1.667 0 0 1 17.5 5.833v8.334A1.667 1.667 0 0 1 15.833 15.833H4.167A1.667 1.667 0 0 1 2.5 14.167V5.833z" />
                      <path d="M2.5 5.833l7.5 5 7.5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="admin@flyingpassports.com"
                    className="
                      w-full pl-10 pr-4 py-3 rounded-xl
                      bg-white/[0.04] border border-white/[0.08]
                      text-white text-sm placeholder-slate-600
                      focus:outline-none focus:border-amber-400/50 focus:bg-white/[0.06]
                      hover:border-white/[0.14]
                      transition-all duration-200
                    "
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-500">
                  Password
                </label>
                <div className="relative group">
                  {/* Lock icon */}
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 group-focus-within:text-amber-400 transition-colors">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
                      <rect x="3.333" y="9.167" width="13.334" height="9.166" rx="1.667" />
                      <path d="M6.667 9.167V6.667a3.333 3.333 0 0 1 6.666 0v2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••"
                    className="
                      w-full pl-10 pr-12 py-3 rounded-xl
                      bg-white/[0.04] border border-white/[0.08]
                      text-white text-sm placeholder-slate-600
                      focus:outline-none focus:border-amber-400/50 focus:bg-white/[0.06]
                      hover:border-white/[0.14]
                      transition-all duration-200
                    "
                  />
                  {/* Toggle visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
                        <path d="M2.5 10s2.5-5 7.5-5 7.5 5 7.5 5-2.5 5-7.5 5-7.5-5-7.5-5z" />
                        <circle cx="10" cy="10" r="2" />
                        <line x1="3" y1="3" x2="17" y2="17" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
                        <path d="M2.5 10s2.5-5 7.5-5 7.5 5 7.5 5-2.5 5-7.5 5-7.5-5-7.5-5z" />
                        <circle cx="10" cy="10" r="2" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-red-400 shrink-0">
                    <circle cx="10" cy="10" r="8" />
                    <line x1="10" y1="6.5" x2="10" y2="10.5" strokeLinecap="round" />
                    <line x1="10" y1="13.5" x2="10.01" y2="13.5" strokeLinecap="round" />
                  </svg>
                  <p className="text-red-400 text-[12px] font-medium">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  relative w-full py-3 mt-2 rounded-xl overflow-hidden
                  font-semibold text-sm tracking-wide
                  transition-all duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed
                  active:scale-[0.98]
                  group
                "
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 group-hover:from-amber-400 group-hover:to-amber-300 transition-all duration-200" />
                {/* Glow */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm bg-gradient-to-r from-amber-500/40 to-amber-400/40" />

                <span className="relative flex items-center justify-center gap-2 text-black">
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* ── Footer ────────────────────────────────────────── */}
            <p className="text-slate-700 text-[10px] text-center tracking-widest uppercase mt-8">
              Founded by Asha & Kiran · Karnataka 🇮🇳
            </p>
          </div>

          {/* Bottom accent bar */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        </div>
      </div>
    </div>
  );
}