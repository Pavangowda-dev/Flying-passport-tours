// lib/auth.ts

import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

// ✅ Validate credentials
export function validateAdmin(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

// ✅ Set session cookie (persistent)
export async function setAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set("admin_session", "true", {
    httpOnly: true,
    secure: false, // change to true in production (HTTPS)
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // ✅ 7 days (no need to login again)
  });
}

// ✅ Check auth (IMPORTANT FIX)
export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  return session?.value === "true";
}

// ✅ Logout
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}