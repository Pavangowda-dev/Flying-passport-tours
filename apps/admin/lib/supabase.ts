// apps/admin/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const createSupabaseBrowser = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("❌ Missing Supabase environment variables");
    throw new Error("Supabase URL or Anon key is missing in .env.local");
  }

  return createClient(url, key);
};
