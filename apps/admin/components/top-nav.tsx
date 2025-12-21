"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings, Bell, Menu } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export function TopNav({
  currentPage,
  hideTitle,
  onMenuClick,
}: {
  currentPage: string;
  hideTitle?: boolean;
  onMenuClick?: () => void;
}) {
  const router = useRouter();
  const supabase = createSupabaseBrowser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
      <div className="h-16 px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left side - Mobile Menu + Page Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden hover:bg-[#1f2d28]/10 transition-colors"
            >
              <Menu size={20} className="text-[#1f2d28]" />
              <span className="sr-only">Open menu</span>
            </Button>
          )}

          {/* Page Title */}
          {!hideTitle && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-[#1f2d28] rounded-full" />
              <h2 className="text-lg md:text-xl font-bold text-[#1f2d28] truncate capitalize">
                {currentPage.replace(/-/g, " ")}
              </h2>
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full h-10 w-10 p-0 hover:bg-[#1f2d28]/10 transition-all duration-200 hover:scale-105"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1f2d28] to-[#2a3d35] flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 bg-white border-gray-200 shadow-xl">
              <DropdownMenuLabel className="font-normal py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f2d28] to-[#2a3d35] flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">
                      Flying Passport Dashboard
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-gray-200" />

              <div className="py-1">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition-colors py-2.5"
                >
                  <Settings className="mr-3 h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition-colors py-2.5"
                >
                  <Bell className="mr-3 h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Notifications</span>
                  <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                    3
                  </span>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="bg-gray-200" />

              <div className="py-1">
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="cursor-pointer hover:bg-red-50 focus:bg-red-50 transition-colors py-2.5 text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="text-sm font-medium">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}