// apps/admin/lib/supabase.types.ts
export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string | null
  contact_method: string | null
  message: string
  created_at: string
  confirmed: boolean
}