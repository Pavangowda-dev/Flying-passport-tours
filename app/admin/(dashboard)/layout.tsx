import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#070d1c]">
      {/* Sidebar — renders both mobile topbar/drawer & desktop rail */}
      <AdminSidebar />

      {/* Main content */}
      <div
        className="
          flex-1 min-w-0
          pt-14 lg:pt-0
          bg-gradient-to-br from-[#070d1c] to-[#0b1225]
        "
      >
        <div className="h-full p-5 lg:p-7">
          {children}
        </div>
      </div>
    </div>
  );
}