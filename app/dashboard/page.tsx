'use client';

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-76px)] lg:min-h-screen pt-[76px] lg:pt-6 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-2xl font-bold text-primary mb-4">
          Welcome to the Flying Passports Admin Dashboard
        </h1>
        <p className="text-gray-700 mb-4">
          This is the admin dashboard for managing customer data for Flying Passports. Use the sidebar to navigate through different sections:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Contact Messages:</strong> View and manage customer messages from the contact form.</li>
          <li><strong>Early Access Registration:</strong> See users who signed up for early access.</li>
          <li><strong>Group Tour Bookings:</strong> Manage bookings for group tours.</li>
          <li><strong>Home Page Inquiries:</strong> Review inquiries submitted via the home page.</li>
          <li><strong>Notify Me:</strong> Check requests for notifications about updates or offers.</li>
        </ul>
        <p className="text-gray-700">
          Select a section from the sidebar to view the corresponding data.
        </p>
      </div>
    </div>
  );
}
