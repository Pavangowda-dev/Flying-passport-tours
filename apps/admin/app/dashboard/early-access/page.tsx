// apps/admin/app/dashboard/early-access/page.tsx
import { createSupabaseServer } from '@/lib/supabase-server'
import { EarlyAccessFormPage } from '@/components/pages/early-access-form'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = await createSupabaseServer()  // Await the async server client

  // Check authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch all early access registrations server-side
  const { data: registrations, error } = await supabase
    .from('early_access_registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Server fetch error:', error)
    throw new Error('Failed to load early access registrations: ' + error.message)
  }

  return <EarlyAccessFormPage initialData={registrations || []} />
}