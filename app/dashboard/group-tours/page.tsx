import { createServerSupabaseClient } from '@/lib/supabase/server';
import { format } from 'date-fns';

export default async function GroupToursPage() {
  const supabase = createServerSupabaseClient();

  // Fetch group tour bookings from the "group_tour_bookings" table
  const { data: bookings, error } = await supabase
    .from('group_tour_bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-4">Group Tour Bookings</h1>
        <p className="text-red-600">Failed to load bookings: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-primary mb-4">Group Tour Bookings</h1>

      {bookings && bookings.length > 0 ? (
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
              {bookings.map((booking, index) => (
                <tr key={booking.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{booking.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{booking.contact_type}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{booking.contact_value}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{booking.tour_title}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {booking.created_at
                      ? format(new Date(booking.created_at), 'MM/dd/yyyy, hh:mm a')
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No group tour bookings found.</p>
      )}
    </div>
  );
}
