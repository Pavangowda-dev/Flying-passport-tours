import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ FIX
) {
  const { id } = await context.params; // ✅ IMPORTANT

  const formData = await req.formData();
  const status = formData.get("status")?.toString();

  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("group_tour_bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
  }

  return NextResponse.redirect(new URL("/admin/bookings", req.url));
}