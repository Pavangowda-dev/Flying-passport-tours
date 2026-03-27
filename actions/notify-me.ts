"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface NotifyMeFormState {
  success: boolean;
  message: string;
}

export async function submitNotifyMe(
  formData: FormData
): Promise<NotifyMeFormState> {
  try {
    const supabase = createServerSupabaseClient();

    const mobileNumber = formData.get("mobileNumber")?.toString().trim();
    const name = formData.get("name")?.toString().trim();
    const tourType = formData.get("tourType")?.toString().trim();
    const preferredDestination = formData.get("preferredDestination")?.toString().trim();
    const preferredMonth = formData.get("preferredMonth")?.toString().trim();

    // ===== VALIDATION =====
    if (!name) {
      return {
        success: false,
        message: "Please enter your name.",
      };
    }

    if (!mobileNumber) {
      return {
        success: false,
        message: "Mobile number is required.",
      };
    }

    if (!/^\+?[1-9]\d{7,14}$/.test(mobileNumber)) {
      return {
        success: false,
        message: "Enter a valid mobile number (e.g., +919876543210).",
      };
    }

    // ===== INSERT =====
    const { error } = await supabase.from("notify_me").insert([
      {
        mobile_number: mobileNumber,
        name: name || null,
        tour_type: tourType || null,
        preferred_destination: preferredDestination || null,
        preferred_month: preferredMonth || null,
      },
    ]);

    if (error) {
      console.error("Notify Me insert error:", error);

      return {
        success: false,
        message: "Failed to submit. Please try again.",
      };
    }

    return {
      success: true,
      message:
        "You're on the list! We'll notify you when new packages are available.",
    };
  } catch (err) {
    console.error("Unexpected notify me error:", err);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}