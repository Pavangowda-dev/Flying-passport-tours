import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const formData = await req.formData();
  const status = formData.get("status")?.toString();

  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("homepage_inquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Homepage enquiry update error:", error);
  }

  return NextResponse.redirect(new URL("/admin/homepage", req.url));
}