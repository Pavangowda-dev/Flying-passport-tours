import { createServerSupabaseClient } from '@/lib/supabase/server';
import { format } from 'date-fns';

// Force server-side rendering (no prerender)
export const dynamic = 'force-dynamic';

export default async function HomeInquiriesPage() {
  const supabase = createServerSupabaseClient();

  // Fetch homepage inquiries from the "homepage_inquiries" table
  const { data: inquiries, error } = await supabase
    .from('homepage_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-4">Home Page Inquiries</h1>
        <p className="text-red-600">Failed to load inquiries: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-primary mb-4">Home Page Inquiries</h1>

      {inquiries && inquiries.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Mobile Number</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Preferred Destination</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries.map((inquiry, index) => (
                <tr key={inquiry.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{inquiry.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{inquiry.mobile_number}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{inquiry.preferred_destination}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {inquiry.created_at
                      ? format(new Date(inquiry.created_at), 'MM/dd/yyyy, hh:mm a')
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No homepage inquiries found.</p>
      )}
    </div>
  );
}
