// apps/admin/app/dashboard/page.tsx
import { createSupabaseServer } from '@/lib/supabase-server'
import { DashboardPage } from '@/components/pages/dashboard'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const supabase = await createSupabaseServer()

  // Authentication check
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch all data server-side in parallel
  const [
    { data: contacts },
    { data: earlyAccess },
    { data: bookings },
    { data: homepage },
    { data: notify },
  ] = await Promise.all([
    supabase.from('contact_messages').select('id, created_at'),
    supabase.from('early_access_registrations').select('id, created_at, tour_title'),
    supabase.from('group_tour_bookings').select('id, created_at, tour_title, name'),
    supabase.from('homepage_inquiries').select('id, created_at, preferred_destination, name'),
    supabase.from('notify_me').select('id, created_at, mobile_number'),
  ])

  const initialData = {
    contacts: contacts || [],
    earlyAccess: earlyAccess || [],
    bookings: bookings || [],
    homepage: homepage || [],
    notify: notify || [],
  }

  return <DashboardPage initialData={initialData} />
}