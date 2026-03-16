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
    const destination = formData.get("destination")?.toString()?.trim() || null;
    const tourTitle = formData.get("tourTitle")?.toString()?.trim() || null;
    const tourId = formData.get("tourId")?.toString()?.trim() || null;

    // ===== VALIDATION =====
    if (!name || !contactType || !rawContactValue) {
      return {
        success: false,
        message: "All required fields must be filled.",
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
        message: "Invalid contact type.",
      };
    }

    // Normalize WhatsApp number
    const contactValue =
      contactType === "whatsapp"
        ? rawContactValue.replace(/\s|-/g, "")
        : rawContactValue;

    if (
      contactType === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)
    ) {
      return {
        success: false,
        message: "Invalid email address.",
      };
    }

    if (
      contactType === "whatsapp" &&
      !/^\+?[1-9]\d{7,14}$/.test(contactValue)
    ) {
      return {
        success: false,
        message: "Invalid WhatsApp number (e.g., +919876543210).",
      };
    }

    // ===== INSERT =====
    const insertData = {
      name,
      contact_type: contactType,
      contact_value: contactValue,
      destination: tourTitle ? null : destination,
      tour_title: tourTitle,
      tour_id: tourId,
    };

    const { error } = await supabase
      .from("group_tour_bookings")
      .insert([insertData]);

    if (error) {
      console.error("Supabase booking insert error:", error);

      if (error.code === "42501") {
        return {
          success: false,
          message: "Permission denied. Please contact support.",
        };
      }

      if (error.code === "23514") {
        return {
          success: false,
          message: "Invalid booking data submitted.",
        };
      }

      return {
        success: false,
        message: "Failed to submit booking. Please try again.",
      };
    }

    return {
      success: true,
      message: `Thanks for booking! We'll contact you soon regarding ${tourTitle || destination}.`,
    };
  } catch (err) {
    console.error("Unexpected booking error:", err);

    return {
      success: false,
      message: "Failed to submit booking. Please try again.",
    };
  }
}