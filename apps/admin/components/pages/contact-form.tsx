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
  Eye,
  Trash2,
  Search,
  Filter,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase";
import { ContactMessage } from "@/lib/supabase.types";
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";

export function ContactFormPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState<"all" | "today" | "yesterday" | "week" | "month">("all");
  const [data, setData] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch data
  useEffect(() => {
    if (!supabase) return;

    async function fetchContacts() {
      try {
        setLoading(true);
        setError(null);

        console.log("🔍 Fetching from table: contact_messages");

        const { data: contacts, error } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setData(contacts || []);
      } catch (err: any) {
        console.error("🔥 Full fetch error:", err);
        setError(err?.message || "Failed to load contacts");
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, [supabase]);

  // Filtering logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const search = searchTerm.toLowerCase();
      const date = new Date(item.created_at);

      const matchesSearch =
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.message.toLowerCase().includes(search);

      let matchesDate = true;
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

      return matchesSearch && matchesDate;
    });
  }, [data, searchTerm, filterDate]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateStr: string) => format(new Date(dateStr), "MMM dd, yyyy");

  // Handle verify toggle
  const handleVerifyToggle = async (id: string, currentStatus: boolean) => {
    if (!supabase) return;
    const newStatus = !currentStatus;

    const { error } = await supabase
      .from("contact_messages")
      .update({ confirmed: newStatus })
      .eq("id", id);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, confirmed: newStatus } : item
        )
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin" size={24} />
        <span className="ml-2">Loading contacts...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-2">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Main UI
  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
          <CardDescription>Manage all contact form inquiries</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search
                className="absolute left-3 top-3 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

            {/* Filter Button Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                className="gap-2 bg-transparent"
                onClick={() => {
                  const options = ["all", "today", "yesterday", "week", "month"] as const;
                  const choice = prompt(
                    `Choose filter: \n${options
                      .map((o) => `• ${o}`)
                      .join("\n")}\n(Type one of them)`
                  );
                  if (choice && options.includes(choice as any)) {
                    setFilterDate(choice as any);
                    setCurrentPage(1);
                  }
                }}
              >
                <Filter size={18} />
                {filterDate === "all"
                  ? "All Dates"
                  : filterDate === "today"
                  ? "Today"
                  : filterDate === "yesterday"
                  ? "Yesterday"
                  : filterDate === "week"
                  ? "This Week"
                  : "This Month"}
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium w-[15%]">Name</th>
                  <th className="text-left px-4 py-3 font-medium w-[20%]">Email</th>
                  <th className="text-left px-4 py-3 font-medium w-[35%]">Message</th>
                  <th className="text-left px-4 py-3 font-medium w-[10%]">Date</th>
                  <th className="text-left px-4 py-3 font-medium w-[10%]">Status</th>
                  <th className="text-left px-4 py-3 font-medium w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No contacts found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3 text-muted-foreground break-words">
                        {item.email}
                      </td>
                      <td className="px-4 py-3 whitespace-pre-wrap break-words">
                        {item.message}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="secondary"
                          className={
                            item.confirmed
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {item.confirmed ? "Verified" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            title="View"
                          >
                            <Eye size={16} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 ${
                              item.confirmed
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                            title={
                              item.confirmed
                                ? "Unverify this message"
                                : "Mark as verified"
                            }
                            onClick={() =>
                              handleVerifyToggle(item.id, item.confirmed)
                            }
                          >
                            <CheckCircle2 size={16} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete"
                            onClick={async () => {
                              if (confirm("Delete this message?")) {
                                const { error } = await supabase
                                  .from("contact_messages")
                                  .delete()
                                  .eq("id", item.id);

                                if (error) {
                                  alert("Delete failed: " + error.message);
                                } else {
                                  setData((prev) =>
                                    prev.filter((d) => d.id !== item.id)
                                  );
                                }
                              }
                            }}
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
          {filteredData.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                {filteredData.length} results
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage(Math.max(1, currentPage - 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage(
                      Math.min(totalPages, currentPage + 1)
                    )
                  }
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
