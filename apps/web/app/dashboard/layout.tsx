// app/dashboard/layout.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createBrowserClientSupabase } from '@/lib/supabase/client';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createBrowserClientSupabase();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/auth/login?redirectTo=' + pathname);
      }
    };
    checkSession();
  }, [router, pathname]);

  const handleLogout = async () => {
    const supabase = createBrowserClientSupabase();
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/contact-messages', label: 'Contact Messages' },
    { href: '/dashboard/early-access', label: 'Early Access Registration' },
    { href: '/dashboard/group-tours', label: 'Group Tour Bookings' },
    { href: '/dashboard/home-inquiries', label: 'Home Page Inquiries' },
    { href: '/dashboard/notify-me', label: 'Notify Me' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={toggleMenu} />
      )}

      <aside className={`fixed top-[76px] left-0 h-[calc(100vh-76px)] w-64 bg-white shadow-md transform transition-transform duration-300 z-40
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-auto lg:top-0 lg:pt-[76px]`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-primary">Flying Passports Admin</h2>
          <Button variant="ghost" className="lg:hidden" onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-4 overflow-y-auto h-[calc(100%-64px)]">
          <ul className="space-y-2 px-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 rounded-md ${isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-700 hover:bg-primary hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Button onClick={handleLogout} className="w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-20 h-[76px]">
          <h2 className="font-serif text-lg font-bold text-primary">Flying Passports Admin</h2>
          <Button variant="outline" onClick={toggleMenu} className="p-2">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <main className="flex-1 bg-gray-100 pt-[76px] lg:pt-[76px] p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}