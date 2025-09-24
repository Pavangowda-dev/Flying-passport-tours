import { createServerSupabaseClient } from '@/lib/supabase/server';
import { format } from 'date-fns';

export default async function ContactMessagesPage() {
  const supabase = createServerSupabaseClient();

  // Fetch contact messages from the "contact_messages" table
  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-4">Contact Messages</h1>
        <p className="text-red-600">Failed to load messages: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-primary mb-4">Contact Messages</h1>

      {messages && messages.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact Method</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Message</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map((msg, index) => (
                <tr key={msg.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.phone}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.contact_method}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.message}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {msg.created_at
                      ? format(new Date(msg.created_at), 'MM/dd/yyyy, hh:mm a')
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No contact messages found.</p>
      )}
    </div>
  );
}
