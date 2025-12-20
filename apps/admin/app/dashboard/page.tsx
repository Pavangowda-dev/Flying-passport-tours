// apps/admin/app/dashboard/page.tsx (unchanged - keep server directives here)
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { DashboardPage } from "@/components/pages/dashboard";

export default function Page() {
  return <DashboardPage />;
}