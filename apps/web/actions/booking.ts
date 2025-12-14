"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface BookingFormState {
  success: boolean;
  message: string;
}

export async function submitBooking(
  prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  console.log("Starting booking form submission");

  try {
    const supabase = createServerSupabaseClient();

    const name = formData.get("name")?.toString().trim();
    const contactType = formData.get("contactType")?.toString();
    const contactValue = formData.get("contactValue")?.toString().trim();
    const destination = formData.get("destination")?.toString()?.trim() || null;
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

    if ((contactType === "phone" || contactType === "whatsapp") && !/^\+?[1-9]\d{1,14}$/.test(contactValue)) {
      return { success: false, message: "Invalid phone/WhatsApp number (e.g., +919876543210)." };
    }

    const insertData = {
      name,
      contact_type: contactType,
      contact_value: contactValue,
      destination,
      tour_title: tourTitle,
      created_at: new Date().toISOString(),
    };

    console.log("Submitting to Supabase group_tour_bookings:", insertData);

    const { error } = await supabase.from("group_tour_bookings").insert([insertData]);

    if (error) {
      console.error("Supabase insert error for group_tour_bookings:", error);

      if (error.code === "42501") {
        return { success: false, message: "Permission denied: Check RLS policies." };
      }
      if (error.code === "23514") {
        return { success: false, message: "Invalid data: Check field values (e.g., contact type)." };
      }

      return { success: false, message: `Failed to submit booking: ${error.message}` };
    }

    console.log("Supabase insert successful for group_tour_bookings");

    return {
      success: true,
      message: "Thanks for booking! We'll be in touch soon to confirm your tour.",
    };
  } catch (err: any) {
    console.error("Unexpected error in booking form submission:", err);
    return { success: false, message: "Failed to submit booking. Please try again." };
  }
}
