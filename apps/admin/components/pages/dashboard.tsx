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
import { Badge } from "@/components/ui/badge"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  MessageCircle,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  Activity,
  Clock,
  BarChart3,
  PieChartIcon,
} from "lucide-react"
import {
  isToday,
  isThisMonth,
  isThisYear,
  subDays,
  format,
} from "date-fns"

interface DashboardData {
  contacts: any[]
  earlyAccess: any[]
  bookings: any[]
  homepage: any[]
  notify: any[]
}

interface DashboardPageProps {
  initialData: DashboardData
}

export function DashboardPage({ initialData }: DashboardPageProps) {
  const [dateRange, setDateRange] = useState<"today" | "7days" | "month" | "year" | "all">("all")

  const { contacts, earlyAccess, bookings, homepage, notify } = initialData

  const filterByRange = (item: any) => {
    if (!item.created_at) return false
    const date = new Date(item.created_at)
    switch (dateRange) {
      case "today": return isToday(date)
      case "7days": return date >= subDays(new Date(), 7)
      case "month": return isThisMonth(date)
      case "year": return isThisYear(date)
      case "all":
      default: return true
    }
  }

  const filtered = useMemo(() => ({
    contacts: contacts.filter(filterByRange),
    earlyAccess: earlyAccess.filter(filterByRange),
    bookings: bookings.filter(filterByRange),
    homepage: homepage.filter(filterByRange),
    notify: notify.filter(filterByRange),
  }), [contacts, earlyAccess, bookings, homepage, notify, dateRange])

  const totalLeads = Object.values(filtered).reduce((sum, arr) => sum + arr.length, 0)

  const stats = useMemo(() => [
    { 
      label: "Contact Messages", 
      value: filtered.contacts.length, 
      icon: <MessageCircle className="h-6 w-6" />, 
      color: "bg-blue-600",
      textColor: "text-blue-600"
    },
    { 
      label: "Tour Bookings", 
      value: filtered.bookings.length, 
      icon: <DollarSign className="h-6 w-6" />, 
      color: "bg-green-600",
      textColor: "text-green-600"
    },
    { 
      label: "Early Access", 
      value: filtered.earlyAccess.length, 
      icon: <AlertCircle className="h-6 w-6" />, 
      color: "bg-orange-600",
      textColor: "text-orange-600"
    },
    { 
      label: "Homepage Enquiries", 
      value: filtered.homepage.length, 
      icon: <Users className="h-6 w-6" />, 
      color: "bg-purple-600",
      textColor: "text-purple-600"
    },
    { 
      label: "Family Package", 
      value: filtered.notify.length, 
      icon: <Calendar className="h-6 w-6" />, 
      color: "bg-pink-600",
      textColor: "text-pink-600"
    },
  ], [filtered])

  const topTours = useMemo(() => {
    const map = new Map<string, number>()

    filtered.earlyAccess.forEach(item => item.tour_title && map.set(item.tour_title, (map.get(item.tour_title) || 0) + 1))
    filtered.bookings.forEach(item => item.tour_title && map.set(item.tour_title, (map.get(item.tour_title) || 0) + 1))
    filtered.homepage.forEach(item => item.preferred_destination && map.set(item.preferred_destination, (map.get(item.preferred_destination) || 0) + 1))

    return Array.from(map)
      .map(([name, count]) => ({ name, value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }, [filtered])

  const sourceDistribution = useMemo(() => {
    const data = [
      { name: "Tour Bookings", value: filtered.bookings.length },
      { name: "Contact Form", value: filtered.contacts.length },
      { name: "Early Access", value: filtered.earlyAccess.length },
      { name: "Homepage Enquiry", value: filtered.homepage.length },
      { name: "Family Notify", value: filtered.notify.length },
    ].filter(item => item.value > 0)

    const COLORS = ["#16a34a", "#2563eb", "#ea580c", "#9333ea", "#ec4899"]
    return data.map((entry, i) => ({ ...entry, color: COLORS[i % COLORS.length] }))
  }, [filtered])

  const recentActivity = useMemo(() => {
    return [
      ...filtered.contacts.map((i: any) => ({ ...i, type: "Contact", displayName: i.name || "Anonymous", color: "bg-blue-100 text-blue-700" })),
      ...filtered.bookings.map((i: any) => ({ ...i, type: "Booking", displayName: i.name || "Anonymous", color: "bg-green-100 text-green-700" })),
      ...filtered.earlyAccess.map((i: any) => ({ ...i, type: "Early Access", displayName: i.name || i.email || "Anonymous", color: "bg-orange-100 text-orange-700" })),
      ...filtered.homepage.map((i: any) => ({ ...i, type: "Homepage", displayName: i.name || "Anonymous", color: "bg-purple-100 text-purple-700" })),
      ...filtered.notify.map((i: any) => ({ ...i, type: "Notify", displayName: i.mobile_number || "Anonymous", color: "bg-pink-100 text-pink-700" })),
    ]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
  }, [filtered])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-gray-200">
          <p className="font-semibold text-[#1f2d28]">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600">
            Requests: <span className="font-bold text-[#1f2d28]">{payload[0].value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-[#1f2d28] to-[#2a3d35] p-6 rounded-xl shadow-lg">
        <div className="text-white">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="h-8 w-8" />
            Dashboard Overview
          </h1>
          <p className="text-white/80 mt-1">Real-time insights from all form submissions</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { value: "today", label: "Today" },
            { value: "7days", label: "Last 7 Days" },
            { value: "month", label: "This Month" },
            { value: "year", label: "This Year" },
            { value: "all", label: "All Time" },
          ].map((opt) => (
            <Button
              key={opt.value}
              variant={dateRange === opt.value ? "secondary" : "outline"}
              size="sm"
              onClick={() => setDateRange(opt.value as any)}
              className={dateRange === opt.value 
                ? "bg-white text-[#1f2d28] hover:bg-white/90 font-semibold" 
                : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              }
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.label} 
            className="border-gray-200 hover:shadow-lg transition-all duration-300 bg-white"
            style={{ animation: `slideIn 0.3s ease-out ${index * 0.1}s both` }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 ${stat.color} rounded-lg`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-1">
                {dateRange === "all" ? "All time" : dateRange === "today" ? "Today" : "In period"}
              </p>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border-2 border-[#1f2d28] bg-gradient-to-br from-[#1f2d28] to-[#2a3d35] hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-white/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{totalLeads}</div>
            <p className="text-sm font-medium text-white">Total Leads</p>
            <p className="text-xs text-white/70 mt-1">Across all sources</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tours */}
        <Card className="border-[#1f2d28]/20 shadow-lg bg-white">
          <CardHeader className="border-b bg-gradient-to-r from-[#1f2d28]/5 to-white">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#1f2d28]" />
              <CardTitle className="text-[#1f2d28]">Top Requested Tours</CardTitle>
            </div>
            <CardDescription className="text-gray-600">Most popular destinations</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            {topTours.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    stroke="#6b7280"
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="#1f2d28" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No tour data available</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card className="border-[#1f2d28]/20 shadow-lg bg-white">
          <CardHeader className="border-b bg-gradient-to-r from-[#1f2d28]/5 to-white">
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-[#1f2d28]" />
              <CardTitle className="text-[#1f2d28]">Lead Sources</CardTitle>
            </div>
            <CardDescription className="text-gray-600">Distribution by form type</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            {sourceDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: '#6b7280', strokeWidth: 1 }}
                    style={{ fontSize: '11px', fontWeight: 500 }}
                  >
                    {sourceDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `${value} submissions`}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '8px 12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <PieChartIcon className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No data available</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-[#1f2d28]/20 shadow-lg bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-[#1f2d28]/5 to-white">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#1f2d28]" />
            <CardTitle className="text-[#1f2d28]">Recent Activity</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Latest submissions across all forms</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 bg-white">
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 font-medium">No recent activity</p>
                <p className="text-sm text-gray-400 mt-1">New submissions will appear here</p>
              </div>
            ) : (
              recentActivity.map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  style={{ animation: `slideIn 0.3s ease-out ${i * 0.05}s both` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Badge className={`${item.color} font-semibold px-3 py-1`}>
                        {item.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.displayName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">New submission received</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <p className="text-sm text-gray-600 font-medium">
                      {format(new Date(item.created_at), "MMM dd, HH:mm")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
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