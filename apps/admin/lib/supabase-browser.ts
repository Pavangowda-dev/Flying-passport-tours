// apps/admin/lib/supabase-browser.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './supabase.types'

export function createSupabaseBrowser() {
  if (typeof window === 'undefined') {
    throw new Error('Supabase browser client called on server')
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}