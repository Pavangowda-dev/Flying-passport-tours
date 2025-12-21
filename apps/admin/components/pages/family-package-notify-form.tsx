"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Eye,
  Trash2,
  Search,
  CheckCircle2,
  Loader2,
  Calendar,
  Phone,
  Filter,
  AlertCircle,
  Bell,
  BellOff,
  Users,
  BellRing,
} from "lucide-react"
import { createSupabaseBrowser } from "@/lib/supabase-browser"
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns"

interface NotifyMe {
  id: string
  mobile_number: string
  created_at: string
  subscribed?: boolean
}

interface FamilyPackageNotifyFormPageProps {
  initialData: NotifyMe[]
}

export function FamilyPackageNotifyFormPage({ initialData }: FamilyPackageNotifyFormPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState<"all" | "today" | "yesterday" | "week" | "month">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<NotifyMe[]>(initialData)
  const [selectedItem, setSelectedItem] = useState<NotifyMe | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const itemsPerPage = 10
  const supabase = useMemo(() => createSupabaseBrowser(), [])

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const search = searchTerm.toLowerCase()
      const date = new Date(item.created_at)

      const matchesSearch = item.mobile_number.toLowerCase().includes(search)

      let matchesDate = true
      if (date.toString() !== "Invalid Date") {
        switch (filterDate) {
          case "today": matchesDate = isToday(date); break
          case "yesterday": matchesDate = isYesterday(date); break
          case "week": matchesDate = isThisWeek(date); break
          case "month": matchesDate = isThisMonth(date); break
        }
      }

      return matchesSearch && matchesDate
    })
  }, [data, searchTerm, filterDate])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—"
    return format(new Date(dateStr), "MMM dd, yyyy 'at' HH:mm")
  }

  const handleStatusToggle = async (id: string, currentStatus?: boolean) => {
    if (!supabase) return
    setIsUpdating(id)
    const newStatus = !currentStatus

    const { error } = await supabase
      .from("notify_me")
      .update({ subscribed: newStatus })
      .eq("id", id)

    if (error) {
      alert("Failed to update status: " + error.message)
      setIsUpdating(null)
    } else {
      setData(prev =>
        prev.map(item => item.id === id ? { ...item, subscribed: newStatus } : item)
      )
      setIsUpdating(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("Are you sure you want to delete this subscriber? This action cannot be undone.")) return

    setIsDeleting(id)
    const { error } = await supabase
      .from("notify_me")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Delete failed: " + error.message)
      setIsDeleting(null)
    } else {
      setData(prev => prev.filter(d => d.id !== id))
      if (selectedItem?.id === id) setSelectedItem(null)
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
      setIsDeleting(null)
    }
  }

  const openModal = (item: NotifyMe) => {
    setSelectedItem(item)
  }

  const stats = {
    total: data.length,
    subscribed: data.filter(d => d.subscribed).length,
    unsubscribed: data.filter(d => !d.subscribed).length,
    today: data.filter(d => isToday(new Date(d.created_at))).length,
  }

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#1f2d28]/20 hover:shadow-lg transition-shadow duration-300 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-3xl font-bold text-[#1f2d28] mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-[#1f2d28] rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow duration-300 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Subscribed</p>
                <p className="text-3xl font-bold text-green-700 mt-1">{stats.subscribed}</p>
              </div>
              <div className="p-3 bg-green-600 rounded-xl">
                <BellRing className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 hover:shadow-lg transition-shadow duration-300 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unsubscribed</p>
                <p className="text-3xl font-bold text-red-700 mt-1">{stats.unsubscribed}</p>
              </div>
              <div className="p-3 bg-red-600 rounded-xl">
                <BellOff className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 hover:shadow-lg transition-shadow duration-300 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-3xl font-bold text-blue-700 mt-1">{stats.today}</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-[#1f2d28]/20 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-[#1f2d28]/10 to-white border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-[#1f2d28] flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Family Package Notifications
              </CardTitle>
              <CardDescription className="text-sm mt-1 text-gray-600">
                Showing {filteredData.length} of {data.length} total subscribers
              </CardDescription>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by mobile..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10 h-11 border-2 border-gray-300 focus:border-[#1f2d28] transition-colors bg-white"
                />
              </div>
              <Select value={filterDate} onValueChange={(v) => {
                setFilterDate(v as typeof filterDate)
                setCurrentPage(1)
              }}>
                <SelectTrigger className="h-11 w-full sm:w-[180px] border-2 border-gray-300 focus:border-[#1f2d28] bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent className="bg-white">
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

        <CardContent className="p-0 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-[#1f2d28] text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold">Mobile Number</th>
                  <th className="text-left px-6 py-4 font-semibold">Date Subscribed</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-center px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-16 bg-white">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="p-4 bg-gray-100 rounded-full">
                          <AlertCircle className="h-12 w-12 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-700">No subscribers found</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {searchTerm || filterDate !== "all" 
                              ? "Try adjusting your search or filters" 
                              : "No notification subscribers yet"}
                          </p>
                        </div>
                        {(searchTerm || filterDate !== "all") && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSearchTerm("")
                              setFilterDate("all")
                              setCurrentPage(1)
                            }}
                            className="mt-2 border-2 border-gray-300"
                          >
                            Clear Filters
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors duration-200 group bg-white"
                      style={{ animation: `slideIn 0.3s ease-out ${index * 0.05}s both` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-900 font-semibold">{item.mobile_number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">{formatDate(item.created_at)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`font-medium ${
                            item.subscribed
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-red-600 text-white hover:bg-red-700"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {item.subscribed ? (
                              <BellRing className="h-3.5 w-3.5" />
                            ) : (
                              <BellOff className="h-3.5 w-3.5" />
                            )}
                            {item.subscribed ? "Subscribed" : "Unsubscribed"}
                          </div>
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Dialog open={selectedItem?.id === item.id} onOpenChange={() => selectedItem?.id === item.id && setSelectedItem(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0 hover:bg-[#1f2d28] hover:text-white transition-all duration-200"
                                onClick={() => openModal(item)}
                                title="View details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto bg-white">
                              <DialogHeader className="border-b pb-4 bg-white">
                                <DialogTitle className="text-2xl font-bold text-[#1f2d28] flex items-center gap-2">
                                  <Bell className="h-6 w-6" />
                                  Subscriber Details
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6 pt-4 bg-white">
                                <div className="grid grid-cols-1 gap-6">
                                  <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#1f2d28]">Mobile Number</label>
                                    <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-200">
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-gray-500" />
                                        <span className="text-lg text-gray-900 font-semibold">{item.mobile_number}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#1f2d28]">Subscribed On</label>
                                    <p className="text-base text-gray-900 p-3 bg-gray-100 rounded-lg border-2 border-gray-200">{formatDate(item.created_at)}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#1f2d28]">Subscription Type</label>
                                    <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-200">
                                      <p className="text-base text-gray-900 font-medium">Family Package Notifications</p>
                                      <p className="text-sm text-gray-600 mt-1">User will receive updates when new family packages are available</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t bg-white">
                                  <Badge
                                    className={`font-medium text-sm px-4 py-2 ${
                                      item.subscribed
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {item.subscribed ? (
                                        <BellRing className="h-4 w-4" />
                                      ) : (
                                        <BellOff className="h-4 w-4" />
                                      )}
                                      {item.subscribed ? "Active Subscription" : "Unsubscribed"}
                                    </div>
                                  </Badge>
                                  <Button
                                    variant="outline"
                                    onClick={() => setSelectedItem(null)}
                                    className="border-2 border-gray-300 hover:bg-gray-100 bg-white"
                                  >
                                    Close
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-9 w-9 p-0 transition-all duration-200 ${
                              item.subscribed
                                ? "text-green-600 hover:bg-green-600 hover:text-white"
                                : "text-red-600 hover:bg-red-600 hover:text-white"
                            }`}
                            title={item.subscribed ? "Mark as unsubscribed" : "Mark as subscribed"}
                            onClick={() => handleStatusToggle(item.id, item.subscribed)}
                            disabled={isUpdating === item.id}
                          >
                            {isUpdating === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                            title="Delete subscriber"
                            onClick={() => handleDelete(item.id)}
                            disabled={isDeleting === item.id}
                          >
                            {isDeleting === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-700 font-medium">
                Showing <span className="font-bold text-[#1f2d28]">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-bold text-[#1f2d28]">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{" "}
                <span className="font-bold text-[#1f2d28]">{filteredData.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="h-10 px-4 border-2 border-gray-300 hover:bg-[#1f2d28] hover:text-white hover:border-[#1f2d28] transition-colors disabled:opacity-50 bg-white"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-10 w-10 border-2 transition-all ${
                          currentPage === pageNum
                            ? "bg-[#1f2d28] text-white hover:bg-[#2a3d35] border-[#1f2d28]"
                            : "bg-white hover:bg-gray-100 border-gray-300"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="h-10 px-4 border-2 border-gray-300 hover:bg-[#1f2d28] hover:text-white hover:border-[#1f2d28] transition-colors disabled:opacity-50 bg-white"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}