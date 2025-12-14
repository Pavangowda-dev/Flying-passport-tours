"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface NotifyMeFormState {
  success: boolean;
  message: string;
}

export async function submitNotifyMe(
  prevState: NotifyMeFormState,
  formData: FormData
): Promise<NotifyMeFormState> {
  console.log("Starting notify me form submission");

  try {
    const supabase = createServerSupabaseClient();

    const mobileNumber = formData.get("mobileNumber")?.toString().trim();

    // Validation
    if (!mobileNumber) {
      return { success: false, message: "Mobile number is required." };
    }

    if (!/^\+?[1-9]\d{1,14}$/.test(mobileNumber)) {
      return { success: false, message: "Invalid mobile number (e.g., +919876543210)." };
    }

    const insertData = {
      mobile_number: mobileNumber,
      created_at: new Date().toISOString(),
    };

    console.log("Submitting to Supabase notify_me:", insertData);

    const { error } = await supabase.from("notify_me").insert([insertData]);

    if (error) {
      console.error("Supabase insert error for notify_me:", error);

      if (error.code === "42501") {
        return { success: false, message: "Permission denied: Check RLS policies." };
      }
      if (error.code === "23514") {
        return { success: false, message: "Invalid data: Check field values." };
      }

      return { success: false, message: `Failed to submit: ${error.message}` };
    }

    console.log("Supabase insert successful for notify_me");

    return {
      success: true,
      message: "Thank you! We'll notify you when family packages are available.",
    };
  } catch (err: any) {
    console.error("Unexpected error in notify me form submission:", err);
    return { success: false, message: "Failed to submit. Please try again." };
  }
}