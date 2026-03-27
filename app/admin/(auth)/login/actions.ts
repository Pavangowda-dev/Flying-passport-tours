"use server";

import { validateAdmin, setAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function adminLogin(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, message: "All fields required" };
  }

  const isValid = validateAdmin(email, password);

  if (!isValid) {
    return { success: false, message: "Invalid credentials" };
  }

  await setAdminSession(); // ✅ FIX

  redirect("/admin/dashboard");
}