// apps/admin/app/dashboard/homepage-enquiries/page.tsx
import { createSupabaseServer } from '@/lib/supabase-server'
import { HomepageEnquiryFormPage } from '@/components/pages/homepage-enquiry-form'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = await createSupabaseServer()

  // Check authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch all homepage enquiries server-side
  const { data: enquiries, error } = await supabase
    .from('homepage_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Server fetch error:', error)
    throw new Error('Failed to load homepage enquiries: ' + error.message)
  }

  return <HomepageEnquiryFormPage initialData={enquiries || []} />
}