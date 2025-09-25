import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase.types';

export function createServerSupabaseClient() {
  console.log("Supabase server client init", {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing",
  });

  try {
    return createServerComponentClient<Database>({ cookies });
  } catch (error: any) {
    console.error("Supabase server client error:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}