"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  console.log("Starting contact form submission");

  try {
    const supabase = createServerSupabaseClient();

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString()?.trim() || null;
    const contactMethod = formData.get("contactMethod")?.toString();
    const message = formData.get("message")?.toString().trim();

    // Validation
    if (!name || !email || !contactMethod || !message) {
      return { success: false, message: "Please fill in all required fields." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: "Invalid email address." };
    }

    if (!["email", "phone", "whatsapp"].includes(contactMethod)) {
      return { success: false, message: "Invalid contact method." };
    }

    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      return { success: false, message: "Invalid phone number (e.g., +919876543210)." };
    }

    const insertData = {
      name,
      email,
      phone,
      contact_method: contactMethod,
      message,
      created_at: new Date().toISOString(),
    };

    console.log("Submitting to Supabase contact_messages:", insertData);

    const { error } = await supabase.from("contact_messages").insert([insertData]);

    if (error) {
      console.error("Supabase insert error:", error);

      if (error.code === "42501") {
        return { success: false, message: "Permission denied: Check RLS policies." };
      }

      if (error.code === "23514") {
        return { success: false, message: "Invalid data: Check field values." };
      }

      return { success: false, message: `Message failed to send: ${error.message}` };
    }

    console.log("Insert successful for contact_messages");

    return {
      success: true,
      message:
        "Thank you for getting in touch! We’ve received your message and will respond within 14 hours.",
    };
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
