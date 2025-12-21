// apps/admin/app/dashboard/analytics/page.tsx
import { createSupabaseServer } from '@/lib/supabase-server'
import { AnalyticsPage } from '@/components/pages/analytics'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = await createSupabaseServer()

  // Check authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch ALL data server-side in parallel
  const [
    { data: contacts },
    { data: earlyAccess },
    { data: bookings },
    { data: homepage },
    { data: notify },
  ] = await Promise.all([
    supabase.from('contact_messages').select('*'),
    supabase.from('early_access_registrations').select('*'),
    supabase.from('group_tour_bookings').select('*'),
    supabase.from('homepage_inquiries').select('*'),
    supabase.from('notify_me').select('*'),
  ])

  return (
    <AnalyticsPage
      initialData={{
        contacts: contacts || [],
        earlyAccess: earlyAccess || [],
        bookings: bookings || [],
        homepage: homepage || [],
        notify: notify || [],
      }}
    />
  )
}