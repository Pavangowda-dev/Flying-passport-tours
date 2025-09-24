import { createServerSupabaseClient } from '@/lib/supabase/server';
import { format } from 'date-fns';

export default async function EarlyAccessPage() {
  const supabase = createServerSupabaseClient();

  // Fetch early access registration entries from the "early_access_registrations" table
  const { data: entries, error } = await supabase
    .from('early_access_registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-4">Early Access Registrations</h1>
        <p className="text-red-600">Failed to load registrations: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-primary mb-4">Early Access Registrations</h1>

      {entries && entries.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact Value</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tour Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.map((entry, index) => (
                <tr key={entry.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{entry.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{entry.contact_type}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{entry.contact_value}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{entry.tour_title}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {entry.created_at
                      ? format(new Date(entry.created_at), 'MM/dd/yyyy, hh:mm a')
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No early access registrations found.</p>
      )}
    </div>
  );
}
