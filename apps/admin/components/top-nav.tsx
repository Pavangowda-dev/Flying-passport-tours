"use client";

import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

export function TopNav({
  currentPage,
  hideTitle,
}: {
  currentPage: string;
  hideTitle?: boolean;
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Handle logout
  const handleLogout = async () => {
    setUserMenuOpen(false);
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-20">
      <div className="h-16 px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left side (page title optional) */}
        {!hideTitle && (
          <h2 className="text-lg md:text-xl font-semibold text-foreground truncate capitalize">
            {currentPage.replace("-", " ")}
          </h2>
        )}

        {/* Right side - User Menu */}
        <div className="relative ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <User size={20} />
          </Button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg z-50 animate-fade-in">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
