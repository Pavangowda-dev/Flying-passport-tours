"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const menu = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 shrink-0">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 shrink-0">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Homepage Enquiry",
    href: "/admin/homepage",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 shrink-0">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" strokeLinecap="round" />
        <line x1="8" y1="11" x2="14" y2="11" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Notify Me",
    href: "/admin/notify",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 shrink-0">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    name: "Contact Messages",
    href: "/admin/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 shrink-0">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" strokeLinecap="round" />
        <line x1="9" y1="14" x2="13" y2="14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 shrink-0">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-[18px] h-[18px]">
    <path d="M22 16.5l-10 5-10-5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 11.5l-10 5-10-5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = mobileOpen ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ╔══════════════════════════════════════════╗
          ║         MOBILE TOPBAR                    ║
          ╚══════════════════════════════════════════╝ */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-[#060c1a]/96 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_2px_14px_rgba(251,191,36,0.45)]">
            <PlaneIcon />
          </div>
          <div>
            <p className="text-white text-sm font-semibold tracking-tight leading-none">Flying Passports</p>
            <p className="text-amber-400/60 text-[9px] tracking-[0.18em] uppercase font-medium mt-[3px]">Admin</p>
          </div>
        </div>

        {/* Animated hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.06] active:bg-white/10 transition-colors"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] bg-white/75 rounded-full transition-all duration-250 origin-center ${
                mobileOpen ? "w-[18px] rotate-45 translate-y-[6.5px]" : "w-[18px]"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-white/75 rounded-full transition-all duration-200 ${
                mobileOpen ? "w-0 opacity-0" : "w-[12px]"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-white/75 rounded-full transition-all duration-250 origin-center ${
                mobileOpen ? "w-[18px] -rotate-45 -translate-y-[6.5px]" : "w-[18px]"
              }`}
            />
          </div>
        </button>
      </header>

      {/* ╔══════════════════════════════════════════╗
          ║         MOBILE BACKDROP                  ║
          ╚══════════════════════════════════════════╝ */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "56px" }}
      />

      {/* ╔══════════════════════════════════════════╗
          ║         MOBILE DRAWER                    ║
          ╚══════════════════════════════════════════╝ */}
      <aside
        className={`
          lg:hidden fixed left-0 bottom-0 z-50
          w-[280px] bg-[#060c1a]
          border-r border-white/[0.07]
          flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ top: "56px" }}
      >
        {/* Top glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/[0.07] rounded-full blur-3xl pointer-events-none -translate-y-10 translate-x-10" />

        <div className="flex-1 overflow-y-auto px-3.5 py-4">
          <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-slate-600 px-2.5 mb-3">
            Navigation
          </p>

          <nav className="flex flex-col gap-1">
            {menu.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative flex items-center gap-3.5 rounded-xl px-3.5 py-[11px]
                    transition-all duration-150 group
                    ${
                      active
                        ? "bg-amber-400/[0.11] text-amber-300 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.18)]"
                        : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-amber-300 to-amber-500 rounded-r-full" />
                  )}
                  <span
                    className={`transition-colors duration-150 ${
                      active ? "text-amber-400" : "text-slate-600 group-hover:text-amber-400/60"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[13px] font-medium tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer footer */}
        <div className="px-4 py-3.5 border-t border-white/[0.06] text-center">
          <p className="text-slate-700 text-[9px] tracking-widest uppercase">Asha & Kiran · Karnataka 🇮🇳</p>
        </div>
      </aside>

      {/* ╔══════════════════════════════════════════╗
          ║   DESKTOP SIDEBAR — icon rail → expands  ║
          ╚══════════════════════════════════════════╝ */}
      <aside
        className="
          hidden lg:flex flex-col shrink-0 relative z-30
          w-[66px] hover:w-[240px]
          min-h-screen
          bg-[#060c1a]
          border-r border-white/[0.06]
          overflow-hidden
          transition-[width] duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          group
        "
      >
        {/* Ambient top glow */}
        <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent pointer-events-none" />

        {/* ── Brand ── */}
        <div className="flex items-center gap-3 px-[13px] h-16 border-b border-white/[0.06] shrink-0 overflow-hidden">
          <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_22px_rgba(251,191,36,0.3)] shrink-0">
            <PlaneIcon />
          </div>
          <div className="overflow-hidden whitespace-nowrap min-w-0">
            <p
              className="
                text-white font-bold text-[13px] leading-tight
                opacity-0 group-hover:opacity-100
                -translate-x-2 group-hover:translate-x-0
                transition-all duration-300 delay-[60ms]
              "
            >
              Flying Passports
            </p>
            <p
              className="
                text-amber-400/55 text-[9px] tracking-[0.18em] uppercase font-medium mt-[3px]
                opacity-0 group-hover:opacity-100
                -translate-x-2 group-hover:translate-x-0
                transition-all duration-300 delay-[90ms]
              "
            >
              Admin Panel
            </p>
          </div>
        </div>

        {/* ── Nav ── */}
        <div className="flex-1 overflow-hidden px-2 py-3.5">
          {/* Section label */}
          <p
            className="
              text-[9px] font-semibold tracking-[0.22em] uppercase text-slate-700
              px-2.5 mb-2.5 whitespace-nowrap
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300 delay-50
            "
          >
            Navigation
          </p>

          <nav className="flex flex-col gap-0.5">
            {menu.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.name}
                  className={`
                    relative flex items-center gap-3.5 rounded-xl px-2.5 py-[10px]
                    overflow-hidden transition-all duration-150 group/link
                    ${
                      active
                        ? "bg-amber-400/[0.11] text-amber-300 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.17)]"
                        : "text-slate-500 hover:bg-white/[0.05] hover:text-white"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-amber-300 to-amber-500 rounded-r-full" />
                  )}

                  {/* Icon */}
                  <span
                    className={`shrink-0 transition-colors duration-150 ${
                      active ? "text-amber-400" : "group-hover/link:text-amber-400/60"
                    }`}
                  >
                    {item.icon}
                  </span>

                  {/* Label — fades and slides in when sidebar expands */}
                  <span
                    className="
                      text-[13px] font-medium tracking-wide whitespace-nowrap
                      opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
                      transition-all duration-300 delay-[80ms]
                    "
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ── Footer ── */}
        <div className="px-2.5 py-3.5 border-t border-white/[0.06] shrink-0 overflow-hidden">
          {/* Collapsed: subtle dot */}
          <div className="flex justify-center group-hover:hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
          </div>
          {/* Expanded: founder credit */}
          <p
            className="
              hidden group-hover:block text-center
              text-slate-700 text-[9px] tracking-widest uppercase whitespace-nowrap
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300 delay-100
            "
          >
            Asha & Kiran · Karnataka 🇮🇳
          </p>
        </div>
      </aside>
    </>
  );
}