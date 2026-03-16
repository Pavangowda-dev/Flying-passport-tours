// app/dashboard/contact-messages/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactMessagesPage() {
  const supabase = createServerSupabaseClient();

  // CHANGE THIS LINE: Use getSession() instead of getUser()
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-4">Access Denied</h1>
        <p className="text-red-600">You must be logged in to view this page.</p>
      </div>
    );
  }

  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-4">Contact Messages</h1>
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-primary mb-4">Contact Messages</h1>

      {messages?.length ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Method</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Message</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Confirmed</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map((msg: any, i: number) => (
                <tr key={msg.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{i + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.phone || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.contact_method}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 max-w-xs truncate">{msg.message}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{msg.confirmed ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {format(new Date(msg.created_at), 'MM/dd/yyyy, hh:mm a')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No messages found.</p>
      )}
    </div>
  );
}