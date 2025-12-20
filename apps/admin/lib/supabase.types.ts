// apps/admin/lib/supabase.types.ts (unchanged, but add if needed for auth - not required for login)
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          contact_method: string | null
          message: string
          created_at: string
          confirmed: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          contact_method?: string | null
          message: string
          created_at?: string
          confirmed?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          contact_method?: string | null
          message?: string
          created_at?: string
          confirmed?: boolean
        }
        Relationships: []
      }
      // Add other tables as needed, e.g., early_access_registrations, group_tour_bookings
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// For auth.users, Supabase handles it internally; no need to define here unless custom claims