"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

interface BookingFormState {
  success: boolean;
  message: string;
}

export async function submitBooking(
  formData: FormData
): Promise<BookingFormState> {
  try {
    const supabase = createServerSupabaseClient();

    const name = formData.get("name")?.toString().trim();
    const contactType = formData.get("contactType")?.toString();
    const rawContactValue = formData.get("contactValue")?.toString().trim();

    const destination =
      formData.get("destination")?.toString()?.trim() || null;

    const tourTitle =
      formData.get("tourTitle")?.toString()?.trim() || null;

    const tourId = formData.get("tourId")?.toString()?.trim() || null;

    // ===== VALIDATION =====
    if (!name || !contactType || !rawContactValue) {
      return {
        success: false,
        message: "Please fill all required fields.",
      };
    }

    if (!tourTitle && !destination) {
      return {
        success: false,
        message: "Please select a destination.",
      };
    }

    if (!["email", "whatsapp"].includes(contactType)) {
      return {
        success: false,
        message: "Invalid contact method.",
      };
    }

    // Normalize value
    const contactValue =
      contactType === "whatsapp"
        ? rawContactValue.replace(/\s|-/g, "")
        : rawContactValue;

    // Email validation
    if (
      contactType === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)
    ) {
      return {
        success: false,
        message: "Invalid email address.",
      };
    }

    // Phone validation
    if (
      contactType === "whatsapp" &&
      !/^\+?[1-9]\d{7,14}$/.test(contactValue)
    ) {
      return {
        success: false,
        message: "Invalid WhatsApp number.",
      };
    }

    // ===== INSERT =====
    const { error } = await supabase.from("group_tour_bookings").insert([
      {
        name,
        contact_type: contactType,
        contact_value: contactValue,
        destination: tourTitle ? null : destination,
        tour_title: tourTitle,
        tour_id: tourId,
      },
    ]);

    if (error) {
      console.error("Booking insert error:", error);

      return {
        success: false,
        message: "Failed to submit booking. Please try again.",
      };
    }

    return {
      success: true,
      message: `Booking received! We'll contact you shortly regarding ${
        tourTitle || destination
      }.`,
    };
  } catch (err) {
    console.error("Unexpected booking error:", err);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}