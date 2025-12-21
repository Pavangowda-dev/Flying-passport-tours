// apps/admin/app/dashboard/tour-bookings/page.tsx
import { createSupabaseServer } from '@/lib/supabase-server'
import { TourBookingFormPage } from '@/components/pages/tour-booking-form'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = await createSupabaseServer()

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch all tour bookings server-side
  const { data: bookings, error } = await supabase
    .from('group_tour_bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Server fetch error:', error)
    throw new Error('Failed to load tour bookings: ' + error.message)
  }

  return <TourBookingFormPage initialData={bookings || []} />
}