"use client";

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
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "contact-form", label: "Contact Form", icon: Mail },
  { id: "early-access", label: "Early Access Form", icon: Clock },
  { id: "tour-booking", label: "Tour Booking Form", icon: MapPin },
  { id: "homepage-enquiry", label: "Homepage Enquiry Form", icon: Home },
  { id: "family-package", label: "Family Package Notify Form", icon: Package },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar({
  currentPage,
  onPageChange,
  isOpen,
  collapsed,
  onCollapseToggle,
}: {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  collapsed: boolean;
  onCollapseToggle: () => void;
}) {
  return (
    <aside
      className={`fixed lg:relative inset-y-0 left-0 z-40 flex flex-col transform transition-all duration-300 ease-in-out bg-[#1f2d28] text-white shadow-lg lg:shadow-none
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
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Flying Passport</h1>
            <p className="text-xs text-white/70 mt-1">Admin Dashboard</p>
          </div>
        ) : (
          <h1 className="text-lg font-bold text-white text-center">FP</h1>
        )}

        {/* Mobile close button (top-right) */}
        <button
          className="lg:hidden text-white hover:text-gray-300"
          onClick={() => onPageChange(currentPage)} // optional close
        >
          <X size={20} onClick={() => window.dispatchEvent(new Event("closeSidebar"))} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <Tooltip.Provider>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Tooltip.Root key={item.id}>
                <Tooltip.Trigger asChild>
                  <Button
                    onClick={() => onPageChange(item.id)}
                    variant="ghost"
                    className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-white text-[#1f2d28] font-semibold"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <Icon size={18} />
                    {!collapsed && <span className="text-sm">{item.label}</span>}
                  </Button>
                </Tooltip.Trigger>
                {collapsed && (
                  <Tooltip.Content
                    side="right"
                    className="bg-black text-white text-xs p-1.5 rounded-md"
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
          <p>© 2025 Flying Passport Tours</p>
        </div>
      )}
    </aside>
  );
}
