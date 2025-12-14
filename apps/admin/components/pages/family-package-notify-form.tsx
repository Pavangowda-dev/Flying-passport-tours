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
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";

type NotifyMe = {
  id: string;
  mobile_number: string;
  created_at: string;
  subscribed?: boolean;
};

export function FamilyPackageNotifyFormPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState<
    "all" | "today" | "yesterday" | "week" | "month"
  >("all");
  const [data, setData] = useState<NotifyMe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // ✅ Fetch Data
  useEffect(() => {
    if (!supabase) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        console.log("🔍 Fetching from table: notify_me");

        const { data: records, error } = await supabase
          .from("notify_me")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setData(records || []);
      } catch (err: any) {
        console.error("🔥 Fetch error:", err);
        setError(err.message || "Failed to fetch notify data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [supabase]);

  // ✅ Filtering
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const search = searchTerm.toLowerCase();
      const date = new Date(item.created_at);

      const matchesSearch = item.mobile_number
        .toLowerCase()
        .includes(search);

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

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), "MMM dd, yyyy");

  // ✅ Toggle subscription status
  const handleStatusToggle = async (id: string, currentStatus?: boolean) => {
    const newStatus = !currentStatus;

    const { error } = await supabase
      .from("notify_me")
      .update({ subscribed: newStatus })
      .eq("id", id);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, subscribed: newStatus } : item
        )
      );
    }
  };

  // ✅ Delete Record
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;

    const { error } = await supabase.from("notify_me").delete().eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      setData((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // ✅ Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin" size={24} />
        <span className="ml-2">Loading subscribers...</span>
      </div>
    );
  }

  // ✅ Error
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

  // ✅ Main UI
  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Family Package Notify Form Submissions</CardTitle>
          <CardDescription>
            Manage users who subscribed to family package notifications
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search + Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search
                className="absolute left-3 top-3 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search by mobile number..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

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
                  <th className="text-left px-4 py-3 font-medium w-[40%]">
                    Mobile Number
                  </th>
                  <th className="text-left px-4 py-3 font-medium w-[20%]">
                    Date Subscribed
                  </th>
                  <th className="text-left px-4 py-3 font-medium w-[20%]">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium w-[20%]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No subscribers found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">
                        {item.mobile_number}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="secondary"
                          className={
                            item.subscribed
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {item.subscribed ? "Subscribed" : "Unsubscribed"}
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
                              item.subscribed
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                            title={
                              item.subscribed
                                ? "Mark as Unsubscribed"
                                : "Mark as Subscribed"
                            }
                            onClick={() =>
                              handleStatusToggle(item.id, item.subscribed)
                            }
                          >
                            <CheckCircle2 size={16} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete"
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
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
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
