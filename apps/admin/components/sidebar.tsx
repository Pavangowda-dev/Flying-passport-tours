"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Clock,
  MapPin,
  Home,
  Package,
  BarChart3,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Tooltip from "@radix-ui/react-tooltip";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Contact Form",
    href: "/dashboard/contact",
    icon: Mail,
  },
  {
    label: "Early Access Form",
    href: "/dashboard/early-access",
    icon: Clock,
  },
  {
    label: "Tour Booking Form",
    href: "/dashboard/tour-bookings",
    icon: MapPin,
  },
  {
    label: "Homepage Enquiry Form",
    href: "/dashboard/homepage-enquiries",
    icon: Home,
  },
  {
    label: "Family Package Notify",
    href: "/dashboard/family-package-notify",
    icon: Package,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

export function Sidebar({
  isOpen,
  collapsed,
  onClose,
  onToggleCollapse,
}: {
  isOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-40 flex flex-col bg-gradient-to-b from-[#1f2d28] to-[#2a3d35] text-white shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${collapsed ? "lg:w-20" : "lg:w-72"} ${isOpen ? "w-80" : "w-72"} h-screen overflow-hidden`}
      >
        {/* Header */}
        <div
          className={`relative p-6 border-b border-white/10 flex items-center transition-all duration-300 ${
            collapsed ? "lg:justify-center lg:px-4" : "justify-between"
          }`}
        >
          {!collapsed ? (
            <div className="transition-opacity duration-300">
              <h1 className="text-2xl font-bold tracking-tight">Flying Passport</h1>
              <p className="text-xs text-white/60 mt-1 font-medium">Admin Dashboard</p>
            </div>
          ) : (
            <div className="hidden lg:flex items-center justify-center w-full">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <h1 className="text-xl font-bold">FP</h1>
              </div>
            </div>
          )}

          {/* Mobile close button */}
          <button 
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors" 
            onClick={onClose}
          >
            <X size={20} />
          </button>

          {/* Desktop collapse toggle */}
          {onToggleCollapse && (
            <button
              className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 z-50"
              onClick={onToggleCollapse}
            >
              {collapsed ? (
                <ChevronRight size={16} className="text-[#1f2d28] mx-auto" />
              ) : (
                <ChevronLeft size={16} className="text-[#1f2d28] mx-auto" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <Tooltip.Provider delayDuration={100}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));

              return (
                <Tooltip.Root key={item.href}>
                  <Tooltip.Trigger asChild>
                    <Link 
                      href={item.href} 
                      onClick={onClose}
                      className="block"
                    >
                      <div
                        className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out ${collapsed ? "lg:justify-center lg:px-3" : "justify-start"} ${isActive ? "bg-white text-[#1f2d28] shadow-lg scale-[1.02]" : "text-white/80 hover:bg-white/10 hover:text-white hover:scale-[1.02]"}`}
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animation: 'slideInLeft 0.3s ease-out both'
                        }}
                      >
                        {/* Icon */}
                        <div className={`flex-shrink-0 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`}>
                          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        </div>

                        {/* Label */}
                        {!collapsed && (
                          <span className={`text-sm font-medium transition-all duration-300 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                            {item.label}
                          </span>
                        )}

                        {/* Active indicator */}
                        {isActive && !collapsed && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1f2d28] animate-pulse" />
                        )}
                      </div>
                    </Link>
                  </Tooltip.Trigger>

                  {collapsed && (
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="right"
                        sideOffset={10}
                        className="bg-[#1f2d28] text-white text-sm px-3 py-2 rounded-lg shadow-xl border border-white/10 z-50"
                      >
                        {item.label}
                        <Tooltip.Arrow className="fill-[#1f2d28]" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  )}
                </Tooltip.Root>
              );
            })}
          </Tooltip.Provider>
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-white/10 transition-all duration-300 ${collapsed ? "lg:px-2" : ""}`}>
          {!collapsed ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>All systems operational</span>
              </div>
              <p className="text-xs text-white/40 font-medium">
                © 2025 Flying Passport Tours
              </p>
            </div>
          ) : (
            <div className="hidden lg:flex justify-center">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          )}
        </div>
      </aside>

      <style jsx global>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
}