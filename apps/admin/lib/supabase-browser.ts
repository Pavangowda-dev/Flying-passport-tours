// apps/admin/lib/supabase-browser.ts (confirmed - use auth-helpers for session)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './supabase.types'

export function createSupabaseBrowser() {
  if (typeof window === "undefined") {
    throw new Error("❌ Supabase browser client called on server");
  }

  return createClientComponentClient<Database>()
}