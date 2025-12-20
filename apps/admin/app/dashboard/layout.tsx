// apps/admin/app/dashboard/layout.tsx (fixed: remove server directives from client component)
"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {children}
    </DashboardLayout>
  );
}