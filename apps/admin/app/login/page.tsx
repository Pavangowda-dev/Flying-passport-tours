// apps/admin/app/login/page.tsx
import LoginClient from "@/components/login-client";

/**
 * ✅ SERVER FILE
 * Owns routing config
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function LoginPage() {
  return <LoginClient />;
}