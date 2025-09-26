"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface EarlyAccessFormState {
  success: boolean;
  message: string;
}

export async function submitEarlyAccess(prevState: EarlyAccessFormState, formData: FormData): Promise<EarlyAccessFormState> {
  console.log("Starting early access form submission", {
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
    const contactType = formData.get("contactType")?.toString();
    const contactValue = formData.get("contactValue")?.toString().trim();
    const tourTitle = formData.get("tourTitle")?.toString()?.trim() || null;

    if (!name || !contactType || !contactValue) {
      console.log("Validation failed: missing required fields", { name, contactType, contactValue });
      return { success: false, message: "All required fields must be filled." };
    }

    if (!["email", "phone", "whatsapp"].includes(contactType)) {
      console.log("Validation failed: invalid contact type", { contactType });
      return { success: false, message: "Invalid contact type." };
    }

    if (contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
      console.log("Validation failed: invalid email", { contactValue });
      return { success: false, message: "Invalid email address." };
    }

    if ((contactType === "phone" || contactType === "whatsapp") && !/^\+?[1-9]\d{1,14}$/.test(contactValue)) {
      console.log("Validation failed: invalid phone/whatsapp number", { contactValue });
      return { success: false, message: "Invalid phone/WhatsApp number (e.g., +919876543210)." };
    }

    const insertData = {
      name,
      contact_type: contactType,
      contact_value: contactValue,
      tour_title: tourTitle,
      created_at: new Date().toISOString(),
    };

    console.log("Submitting to Supabase early_access_registrations:", insertData);

    const { data, error } = await supabase
      .from("early_access_registrations")
      .insert([insertData])
      .select();

    if (error) {
      console.error("Supabase insert error for early_access_registrations:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      if (error.code === "42501") {
        return { success: false, message: "Permission denied: Check RLS policies or user authentication." };
      }
      if (error.code === "23514") {
        return { success: false, message: "Invalid data: Check field values (e.g., contact type)." };
      }
      return { success: false, message: `Failed to submit early access: ${error.message}` };
    }

    console.log("Supabase insert successful for early_access_registrations:", data);
    return {
      success: true,
      message: "Thank you for registering for early access! We’re excited to help plan your next adventure and will notify you as soon as your tour is ready.",
    };
  } catch (err: any) {
    console.error("Unexpected error in early access form submission:", {
      message: err.message,
      stack: err.stack,
    });
    return { success: false, message: "Failed to register early access. Please try again." };
  }
}