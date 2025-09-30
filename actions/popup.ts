"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface EarlyAccessFormState {
  success: boolean;
  message: string;
}

export async function submitEarlyAccess(
  prevState: EarlyAccessFormState,
  formData: FormData
): Promise<EarlyAccessFormState> {
  console.log("Starting early access form submission");

  try {
    const supabase = createServerSupabaseClient();

    const name = formData.get("name")?.toString().trim();
    const contactType = formData.get("contactType")?.toString();
    const contactValue = formData.get("contactValue")?.toString().trim();
    const tourTitle = formData.get("tourTitle")?.toString()?.trim() || null;

    // Validation
    if (!name || !contactType || !contactValue) {
      return { success: false, message: "All required fields must be filled." };
    }

    if (!["email", "phone", "whatsapp"].includes(contactType)) {
      return { success: false, message: "Invalid contact type." };
    }

    if (contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
      return { success: false, message: "Invalid email address." };
    }

    if (
      (contactType === "phone" || contactType === "whatsapp") &&
      !/^\+?[1-9]\d{1,14}$/.test(contactValue)
    ) {
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

    const { error } = await supabase.from("early_access_registrations").insert([insertData]);

    if (error) {
      console.error("Supabase insert error for early_access_registrations:", error);

      if (error.code === "42501") {
        return { success: false, message: "Permission denied: Check RLS policies." };
      }
      if (error.code === "23514") {
        return { success: false, message: "Invalid data: Check field values (e.g., contact type)." };
      }

      return { success: false, message: `Failed to submit early access: ${error.message}` };
    }

    console.log("Supabase insert successful for early_access_registrations");

    return {
      success: true,
      message:
        "Thank you for registering for early access! We’re excited to help plan your next adventure and will notify you as soon as your tour is ready.",
    };
  } catch (err: any) {
    console.error("Unexpected error in early access form submission:", err);
    return { success: false, message: "Failed to register early access. Please try again." };
  }
}
