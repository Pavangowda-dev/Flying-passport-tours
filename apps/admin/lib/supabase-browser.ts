import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowser() {
  if (typeof window === "undefined") {
    throw new Error("❌ Supabase browser client called on server");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("❌ Missing Supabase env vars");
  }

  return createBrowserClient(url, key);
}
