"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function submitEarlyAccess(prevState: any, formData: FormData) {
  const supabase = createServerSupabaseClient();

  try {
    const name = formData.get("name")?.toString().trim();
    const contactType = formData.get("contactType")?.toString();
    const contactValue = formData.get("contactValue")?.toString().trim();
    const tourTitle = formData.get("tourTitle")?.toString() || null;

    if (!name || !contactType || !contactValue) {
      return { success: false, message: "All required fields must be filled" };
    }

    if (!["email", "whatsapp"].includes(contactType)) {
      return { success: false, message: "Invalid contact method" };
    }

    if (contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
      return { success: false, message: "Invalid email address" };
    }

    if (contactType === "whatsapp" && !/^\+?[1-9]\d{1,14}$/.test(contactValue)) {
      return { success: false, message: "Invalid WhatsApp number (e.g., +919876543210)" };
    }

    console.log("Submitting early access to Supabase:", { name, contact_type: contactType, contact_value: contactValue, tour_title: tourTitle });

    const { data, error } = await supabase
      .from("early_access_registrations")
      .insert([{ name, contact_type: contactType, contact_value: contactValue, tour_title: tourTitle }])
      .select();

    if (error) {
      console.error("Supabase error:", error.message, error.details, error.hint, error.code);
      return { success: false, message: `Failed to submit early access: ${error.message}` };
    }

    console.log("Supabase insert successful:", data);
    return { success: true, message: "Early access registered successfully! We'll notify you soon." };
  } catch (err: any) {
    console.error("Submission error:", err.message, err);
    return { success: false, message: "Failed to register early access. Please try again." };
  }
}