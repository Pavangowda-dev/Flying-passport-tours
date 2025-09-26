"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  console.log("Starting contact form submission", {
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Missing",
    },
  });

  try {
    // For debugging, use service_role to bypass RLS (comment out in production)
    // const supabase = createServerSupabaseClient({ supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY });
    const supabase = createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    console.log("User role:", user ? `authenticated (user_id: ${user.id})` : "anon");

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString()?.trim() || null;
    const contactMethod = formData.get("contactMethod")?.toString();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !contactMethod || !message) {
      console.log("Validation failed: missing required fields", { name, email, contactMethod, message });
      return { success: false, message: "Please fill in all required fields." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Validation failed: invalid email", { email });
      return { success: false, message: "Invalid email address." };
    }

    if (!["email", "phone", "whatsapp"].includes(contactMethod)) {
      console.log("Validation failed: invalid contact method", { contactMethod });
      return { success: false, message: "Invalid contact method." };
    }

    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      console.log("Validation failed: invalid phone number", { phone });
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

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([insertData])
      .select();

    if (error) {
      console.error("Supabase insert error for contact_messages:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      if (error.code === "42501") {
        return { success: false, message: "Permission denied: Check RLS policies or user authentication." };
      }
      if (error.code === "23514") {
        return { success: false, message: "Invalid data: Check field values (e.g., contact method)." };
      }
      return { success: false, message: `Message failed to send: ${error.message}` };
    }

    console.log("Supabase insert successful for contact_messages:", data);
    return {
      success: true,
      message: "Thank you for getting in touch! We’ve received your message and will respond within 14 hours.",
    };
  } catch (error: any) {
    console.error("Unexpected error in contact form submission:", {
      message: error.message,
      stack: error.stack,
    });
    return { success: false, message: "An unexpected error occurred." };
  }
}