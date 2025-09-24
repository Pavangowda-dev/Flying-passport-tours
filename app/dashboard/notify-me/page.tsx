import { createServerSupabaseClient } from '@/lib/supabase/server';
import { format } from 'date-fns';

export default async function NotifyMePage() {
  const supabase = createServerSupabaseClient();

  // Fetch entries from the "notify_me" table
  const { data: notifications, error } = await supabase
    .from('notify_me')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-4">Notify Me Requests</h1>
        <p className="text-red-600">Failed to load requests: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-primary mb-4">Notify Me Requests</h1>

      {notifications && notifications.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Mobile Number</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notifications.map((notify, index) => (
                <tr key={notify.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{notify.mobile_number}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {notify.created_at
                      ? format(new Date(notify.created_at), 'MM/dd/yyyy, hh:mm a')
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No notify requests found.</p>
      )}
    </div>
  );
}
