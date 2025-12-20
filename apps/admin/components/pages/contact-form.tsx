// apps/admin/components/pages/contact-form.tsx (updated: session debug, test query, auto-retry)
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  Trash2,
  Search,
  Filter,
  Loader2,
  CheckCircle2,
  Phone,
  Mail,
  AlertCircle,
  User,
} from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

import { ContactMessage } from "@/lib/supabase.types";
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";

export function ContactFormPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState<"all" | "today" | "yesterday" | "week" | "month">("all");
  const [data, setData] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContactMessage | null>(null);

  const itemsPerPage = 10;
  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowser();
    } catch (err: any) {
      console.error("Supabase init failed:", err);
      setError(err.message || "Supabase client initialization failed");
      return null;
    }
  }, []);

  // Fetch data with session check & test query
  const fetchContacts = async () => {
    if (!supabase) return;

    try {
      setLoading(true);
      setError(null);

      // Debug: Log current session/user
      const { data: { session } } = await supabase.auth.getSession();
      console.log("🔐 Current session:", session ? { user: session.user.email, id: session.user.id } : "No session - check login");
      if (!session) {
        throw new Error("No active session. Please log in again.");
      }

      console.log("🔍 Fetching from table: contact_messages");

      const { data: contacts, error, status } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("Fetched data length:", contacts?.length || 0, "Error:", error, "Status:", status); // Debug log

      if (error) {
        console.error("Supabase error details:", error);
        // Test query: Simple count to check RLS/table access
        const { count, error: countError } = await supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true });
        console.log("Test count query:", { count, countError });
        if (countError) {
          throw new Error(`RLS/Table Access Failed: ${countError.message} (Code: ${countError.code}). Run RLS policy SQL.`);
        }
        throw new Error(`Fetch failed: ${error.message} (Code: ${error.code}). Total rows in table: ${count || 0}`);
      }

      if (!contacts || contacts.length === 0) {
        console.log("No data returned - table is empty or RLS filters all rows");
      }

      setData(contacts || []);
    } catch (err: any) {
      console.error("🔥 Full fetch error:", err);
      setError(err?.message || "Failed to load contacts. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [supabase]);

  // Refetch on retry
  const handleRetry = () => {
    setError(null);
    fetchContacts();
  };

  // Filtering logic (with debug)
  const filteredData = useMemo(() => {
    console.log("Applying filters - raw data length:", data.length); // Debug log
    const result = data.filter((item) => {
      const search = searchTerm.toLowerCase();
      const date = new Date(item.created_at || "");

      const matchesSearch =
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        (item.phone && item.phone.toLowerCase().includes(search)) ||
        item.message.toLowerCase().includes(search) ||
        item.contact_method?.toLowerCase().includes(search);

      let matchesDate = true;
      if (date.toString() !== "Invalid Date") {
        switch (filterDate) {
          case "today":
            matchesDate = isToday(date);
            break;
          case "yesterday":
            matchesDate = isYesterday(date);
            break;
          case "week":
            matchesDate = isThisWeek(date);
            break;
          case "month":
            matchesDate = isThisMonth(date);
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesSearch && matchesDate;
    });
    console.log("Filtered data length:", result.length); // Debug log
    return result;
  }, [data, searchTerm, filterDate]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return format(new Date(dateStr), "MMM dd, yyyy 'at' HH:mm");
  };

  // Handle verify toggle
  const handleVerifyToggle = async (id: string, currentStatus: boolean) => {
    if (!supabase) return;
    const newStatus = !currentStatus;

    console.log("Toggling verified status for ID:", id, "to:", newStatus); // Debug log

    const { data: updated, error } = await supabase
      .from("contact_messages")
      .update({ confirmed: newStatus })
      .eq("id", id)
      .select()
      .single(); // Fetch single updated row

    if (error) {
      console.error("Update error:", error);
      alert("Failed to update status: " + error.message + " (Code: " + error.code + ")");
    } else if (updated) {
      console.log("Status updated:", updated.confirmed); // Debug log
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? updated : item
        )
      );
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("Are you sure you want to delete this message? This action cannot be undone.")) return;

    console.log("Deleting ID:", id); // Debug log

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert("Delete failed: " + error.message + " (Code: " + error.code + ")");
    } else {
      console.log("Delete successful"); // Debug log
      setData((prev) => prev.filter((d) => d.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
      // Reset page if current page becomes empty
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Set selected item for modal
  const openModal = (item: ContactMessage) => {
    setSelectedItem(item);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin mr-2 h-6 w-6" />
        <span className="text-lg">Loading contacts...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <CardTitle className="text-destructive">Error Loading Data</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-destructive-foreground">{error}</p>
          <div className="text-xs text-destructive-foreground/70 space-y-1 p-3 bg-destructive/10 rounded-md">
            <p><strong>Debug Steps:</strong></p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Open browser console (F12 Console) and reload—check for "Fetched data length" log.</li>
              <li>If "No session": Re-login at /admin/login.</li>
              <li>If RLS error (code 42501): Run the SQL policy from previous message.</li>
              <li>Test count: Should show total rows (e.g., "Total rows in table: 3").</li>
              <li>Add test row in Supabase dashboard if table empty.</li>
            </ol>
          </div>
          <Button onClick={handleRetry} variant="outline" className="w-full sm:w-auto">
            Retry Fetch
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Main UI (unchanged from previous - full responsive table with confirmed toggle)
  return (
    <div className="space-y-6 p-1">
      <Card className="border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-lg">Contact Form Submissions</CardTitle>
              <CardDescription className="text-sm">
                Manage all contact form inquiries ({filteredData.length} / {data.length} total)
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, phone, message..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 h-9"
                />
              </div>
              <Select value={filterDate} onValueChange={(value) => {
                setFilterDate(value as typeof filterDate);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[600px]">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="text-left px-3 py-3 font-medium hidden sm:table-cell w-[12%]">Name</th>
                  <th className="text-left px-3 py-3 font-medium hidden md:table-cell w-[12%]">Phone</th>
                  <th className="text-left px-3 py-3 font-medium w-[18%]">Email</th>
                  <th className="text-left px-3 py-3 font-medium hidden lg:table-cell w-[20%]">Message Preview</th>
                  <th className="text-left px-3 py-3 font-medium w-[12%]">Method</th>
                  <th className="text-left px-3 py-3 font-medium w-[12%]">Date</th>
                  <th className="text-left px-3 py-3 font-medium w-[8%]">Status</th>
                  <th className="text-left px-3 py-3 font-medium w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No contacts found matching your criteria.</p>
                      <p className="text-xs mt-1">Try adjusting search or filters above.</p>
                      {data.length === 0 && (
                        <p className="text-xs mt-2 text-destructive-foreground">No data in table - add records via Supabase dashboard.</p>
                      )}
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-3 py-3 font-medium hidden sm:table-cell">{item.name}</td>
                      <td className="px-3 py-3 hidden md:table-cell">
                        {item.phone ? (
                          <Badge variant="outline" className="text-xs">
                            <Phone className="h-3 w-3 mr-1" />
                            {item.phone}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-muted-foreground break-all">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                          <span className="break-all max-w-[150px] truncate sm:max-w-none">{item.email}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 hidden lg:table-cell whitespace-pre-wrap break-words max-w-[200px] truncate lg:truncate-none">
                        {item.message?.substring(0, 100)}...
                      </td>
                      <td className="px-3 py-3">
                        <Badge 
                          variant={item.contact_method === "email" ? "default" : "secondary"} 
                          className="text-xs capitalize"
                        >
                          {item.contact_method || "—"}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        <span className="text-xs">{formatDate(item.created_at)}</span>
                      </td>
                      <td className="px-3 py-3">
                        <Badge
                          variant="secondary"
                          className={
                            item.confirmed
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {item.confirmed ? "Confirmed" : "Unconfirmed"}
                        </Badge>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1">
                          <Dialog open={selectedItem?.id === item.id} onOpenChange={() => selectedItem?.id === item.id && setSelectedItem(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openModal(item)}
                                title="View full details"
                              >
                                <Eye size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Message Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 text-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <strong>Name:</strong> <span className="block text-muted-foreground">{item.name}</span>
                                  </div>
                                  <div>
                                    <strong>Email:</strong> <span className="block text-muted-foreground">{item.email}</span>
                                  </div>
                                  {item.phone && (
                                    <div className="md:col-span-2">
                                      <strong>Phone:</strong> <span className="block text-muted-foreground">{item.phone}</span>
                                    </div>
                                  )}
                                  <div>
                                    <strong>Contact Method:</strong> <span className="block text-muted-foreground capitalize">{item.contact_method || "N/A"}</span>
                                  </div>
                                  <div className="md:col-span-2">
                                    <strong>Date:</strong> <span className="block text-muted-foreground">{formatDate(item.created_at)}</span>
                                  </div>
                                </div>
                                <div>
                                  <strong>Full Message:</strong>
                                  <p className="mt-2 p-3 bg-muted/50 rounded-md whitespace-pre-wrap font-sans">{item.message}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 transition-colors ${
                              item.confirmed
                                ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                                : "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                            }`}
                            title={
                              item.confirmed
                                ? "Mark as unconfirmed"
                                : "Mark as confirmed"
                            }
                            onClick={() => handleVerifyToggle(item.id, item.confirmed)}
                          >
                            <CheckCircle2 size={16} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                            title="Delete this message"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                {filteredData.length} results
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-3 py-1 text-sm text-muted-foreground bg-muted/50 rounded-md">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}