"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  formData: FormData
): Promise<ContactFormState> {
  try {
    const supabase = createServerSupabaseClient();

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString()?.trim() || null;
    const contactMethod = formData.get("contactMethod")?.toString();
    const message = formData.get("message")?.toString().trim();

    // ✅ Validation
    if (!name || !email || !contactMethod || !message) {
      return { success: false, message: "Please fill all required fields." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: "Invalid email address." };
    }

    if (!["email", "phone"].includes(contactMethod!)) {
      return { success: false, message: "Invalid contact method." };
    }

    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      return { success: false, message: "Invalid phone number." };
    }

    // ✅ Insert into DB
    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        contact_method: contactMethod,
        message,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      return {
        success: false,
        message: "Failed to send message. Please try again.",
      };
    }

    return {
      success: true,
      message:
        "Message sent successfully! Our team will contact you within 14 hours.",
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}