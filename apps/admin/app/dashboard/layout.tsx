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
