// apps/admin/app/dashboard/contact/page.tsx
import { createSupabaseServer } from '@/lib/supabase-server'
import { ContactFormPage } from '@/components/pages/contact-form'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = await createSupabaseServer()  // ← MUST AWAIT HERE

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/admin/login')
  }

  const { data: contacts, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Server fetch error:', error)
    throw new Error('Failed to load contacts: ' + error.message)
  }

  return <ContactFormPage initialData={contacts || []} />
}