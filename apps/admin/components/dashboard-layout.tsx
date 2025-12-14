"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { Menu, X, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardLayout({
  children,
  currentPage,
  onPageChange,
}: {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // ✅ Lock body scroll on mobile when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Mobile hamburger menu (top-left) */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={(page) => {
          onPageChange(page);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        collapsed={collapsed}
        onCollapseToggle={() => setCollapsed(!collapsed)}
      />

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Collapse toggle for desktop */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`hidden lg:flex items-center justify-center absolute top-20 z-40 transition-all duration-300 ${
          collapsed ? "left-16" : "left-64"
        }`}
      >
        <div className="bg-secondary text-secondary-foreground rounded-full p-1.5 shadow hover:bg-secondary/90 transition">
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </div>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <TopNav currentPage={currentPage} hideTitle />
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
