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
}: {
  isOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed lg:relative inset-y-0 left-0 z-40 flex flex-col
        bg-[#1f2d28] text-white shadow-lg transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "lg:w-20" : "lg:w-64"}
        ${isOpen ? "w-3/4 max-w-xs" : "w-64"}`}
    >
      {/* Header */}
      <div
        className={`p-6 border-b border-white/10 flex items-center justify-between ${
          collapsed ? "lg:justify-center" : ""
        }`}
      >
        {!collapsed ? (
          <div>
            <h1 className="text-xl font-bold">Flying Passport</h1>
            <p className="text-xs text-white/70">Admin Dashboard</p>
          </div>
        ) : (
          <h1 className="text-lg font-bold">FP</h1>
        )}

        {/* Mobile close */}
        <button className="lg:hidden" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <Tooltip.Provider>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Tooltip.Root key={item.href}>
                <Tooltip.Trigger asChild>
                  <Link href={item.href} onClick={onClose}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 px-3 py-2 rounded-md
                        ${collapsed ? "justify-center" : ""}
                        ${
                          isActive
                            ? "bg-white text-[#1f2d28] font-semibold"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                    >
                      <Icon size={18} />
                      {!collapsed && (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </Button>
                  </Link>
                </Tooltip.Trigger>

                {collapsed && (
                  <Tooltip.Content
                    side="right"
                    className="bg-black text-white text-xs px-2 py-1 rounded"
                  >
                    {item.label}
                  </Tooltip.Content>
                )}
              </Tooltip.Root>
            );
          })}
        </Tooltip.Provider>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-white/10 text-xs text-white/60">
          © 2025 Flying Passport Tours
        </div>
      )}
    </aside>
  );
}
