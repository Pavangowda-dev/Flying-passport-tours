"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const supabase = createServerSupabaseClient();

  try {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString()?.trim() || null;
    const contactMethod = formData.get("contactMethod")?.toString();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !contactMethod || !message) {
      return { success: false, message: "Please fill in all required fields." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: "Invalid email address." };
    }

    if (!["email", "phone"].includes(contactMethod)) {
      return { success: false, message: "Invalid contact method." };
    }

    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      return { success: false, message: "Invalid phone number (e.g., +919876543210)." };
    }

    console.log("Submitting contact message to Supabase:", { name, email, phone, contact_method: contactMethod, message });

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, phone, contact_method: contactMethod, message }])
      .select();

    if (error) {
      console.error("Supabase error:", error.message, error.details, error.hint, error.code);
      return { success: false, message: `Message failed to send: ${error.message}` };
    }

    console.log("Supabase insert successful:", data);
    return { success: true, message: "Thank you for your message! We'll get back to you soon." };
  } catch (error: any) {
    console.error("Unexpected error during contact form submission:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}