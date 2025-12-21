// apps/admin/app/dashboard/family-package-notify/page.tsx
import { createSupabaseServer } from '@/lib/supabase-server'
import { FamilyPackageNotifyFormPage } from '@/components/pages/family-package-notify-form'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = await createSupabaseServer()

  // Check authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch all notify_me records server-side
  const { data: subscribers, error } = await supabase
    .from('notify_me')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Server fetch error:', error)
    throw new Error('Failed to load family package notifications: ' + error.message)
  }

  return <FamilyPackageNotifyFormPage initialData={subscribers || []} />
}