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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  isToday,
  isThisMonth,
  isThisYear,
  subDays,
  format,
} from "date-fns"
import {
  TrendingUp,
  BarChart3,
  PieChartIcon,
  Activity,
  Calendar,
  Target,
  CheckCircle2,
} from "lucide-react"

interface AnalyticsData {
  contacts: any[]
  earlyAccess: any[]
  bookings: any[]
  homepage: any[]
  notify: any[]
}

interface AnalyticsPageProps {
  initialData: AnalyticsData
}

export function AnalyticsPage({ initialData }: AnalyticsPageProps) {
  const [dateRange, setDateRange] = useState<"today" | "7days" | "month" | "year" | "all">("7days")

  const { contacts, earlyAccess, bookings, homepage, notify } = initialData

  const filterByRange = (item: any) => {
    const date = new Date(item.created_at)
    switch (dateRange) {
      case "today":
        return isToday(date)
      case "7days":
        return date >= subDays(new Date(), 7)
      case "month":
        return isThisMonth(date)
      case "year":
        return isThisYear(date)
      case "all":
      default:
        return true
    }
  }

  const filtered = useMemo(() => ({
    contacts: contacts.filter(filterByRange),
    earlyAccess: earlyAccess.filter(filterByRange),
    bookings: bookings.filter(filterByRange),
    homepage: homepage.filter(filterByRange),
    notify: notify.filter(filterByRange),
  }), [contacts, earlyAccess, bookings, homepage, notify, dateRange])

  const allSubmissions = [
    ...filtered.contacts,
    ...filtered.earlyAccess,
    ...filtered.bookings,
    ...filtered.homepage,
    ...filtered.notify,
  ]

  const dailyTrend = useMemo(() => {
    const map = new Map<string, number>()
    allSubmissions.forEach(item => {
      const day = format(new Date(item.created_at), "MMM dd")
      map.set(day, (map.get(day) || 0) + 1)
    })
    return Array.from(map)
      .map(([date, count]) => ({ date, submissions: count }))
      .sort((a, b) => {
        const dateA = new Date(a.date + ", 2024")
        const dateB = new Date(b.date + ", 2024")
        return dateA.getTime() - dateB.getTime()
      })
      .slice(-30)
  }, [allSubmissions])

  const formDistribution = useMemo(() => {
    const counts = {
      "Contact Form": filtered.contacts.length,
      "Early Access": filtered.earlyAccess.length,
      "Tour Booking": filtered.bookings.length,
      "Homepage Enquiry": filtered.homepage.length,
      "Family Package": filtered.notify.length,
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1
    const colors = ["#1f2d28", "#16a34a", "#2563eb", "#9333ea", "#ea580c"]

    return Object.entries(counts).map(([name, count], i) => ({
      name,
      value: count,
      percentage: ((count / total) * 100).toFixed(1),
      color: colors[i],
    }))
  }, [filtered])

  const topTours = useMemo(() => {
    const tourMap = new Map<string, number>()

    filtered.earlyAccess.forEach(item => {
      if (item.tour_title) {
        tourMap.set(item.tour_title, (tourMap.get(item.tour_title) || 0) + 1)
      }
    })
    filtered.bookings.forEach(item => {
      if (item.tour_title) {
        tourMap.set(item.tour_title, (tourMap.get(item.tour_title) || 0) + 1)
      }
    })
    filtered.homepage.forEach(item => {
      if (item.preferred_destination) {
        tourMap.set(item.preferred_destination, (tourMap.get(item.preferred_destination) || 0) + 1)
      }
    })

    return Array.from(tourMap)
      .map(([tour, count]) => ({ tour, enquiries: count }))
      .sort((a, b) => b.enquiries - a.enquiries)
      .slice(0, 10)
  }, [filtered])

  const totalSubmissions = allSubmissions.length
  const avgDaily = totalSubmissions / Math.max(dailyTrend.length || 1, 1)
  const peakDay = dailyTrend.reduce((max, day) => day.submissions > (max?.submissions || 0) ? day : max, dailyTrend[0])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-gray-200">
          <p className="font-semibold text-[#1f2d28]">{label}</p>
          <p className="text-sm text-gray-600">
            Submissions: <span className="font-bold text-[#1f2d28]">{payload[0].value}</span>
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
            <BarChart3 className="h-8 w-8" />
            Analytics Dashboard
          </h1>
          <p className="text-white/80 mt-1">Track form submissions and user engagement</p>
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

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#1f2d28]/20 hover:shadow-lg transition-all duration-300 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-3xl font-bold text-[#1f2d28] mt-1">{totalSubmissions}</p>
                <p className="text-xs text-gray-500 mt-1">In selected period</p>
              </div>
              <div className="p-3 bg-[#1f2d28] rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 hover:shadow-lg transition-all duration-300 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Daily</p>
                <p className="text-3xl font-bold text-blue-700 mt-1">{avgDaily.toFixed(1)}</p>
                <p className="text-xs text-gray-500 mt-1">Submissions per day</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-lg transition-all duration-300 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Day</p>
                <p className="text-xl font-bold text-purple-700 mt-1">{peakDay?.date || "—"}</p>
                <p className="text-xs text-gray-500 mt-1">{peakDay?.submissions || 0} submissions</p>
              </div>
              <div className="p-3 bg-purple-600 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-all duration-300 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Forms</p>
                <p className="text-3xl font-bold text-green-700 mt-1">5</p>
                <p className="text-xs text-gray-500 mt-1">All operational</p>
              </div>
              <div className="p-3 bg-green-600 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trend Line Chart */}
        <Card className="border-[#1f2d28]/20 shadow-lg bg-white">
          <CardHeader className="border-b bg-gradient-to-r from-[#1f2d28]/5 to-white">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#1f2d28]" />
              <CardTitle className="text-[#1f2d28]">Daily Submission Trend</CardTitle>
            </div>
            <CardDescription className="text-gray-600">Total submissions per day over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            {dailyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="submissions" 
                    stroke="#1f2d28" 
                    strokeWidth={3} 
                    dot={{ fill: "#1f2d28", r: 5 }}
                    activeDot={{ r: 7, fill: "#2a3d35" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No data available for selected period</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Distribution Pie Chart */}
        <Card className="border-[#1f2d28]/20 shadow-lg bg-white">
          <CardHeader className="border-b bg-gradient-to-r from-[#1f2d28]/5 to-white">
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-[#1f2d28]" />
              <CardTitle className="text-[#1f2d28]">Form Distribution</CardTitle>
            </div>
            <CardDescription className="text-gray-600">Breakdown by form type</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            {totalSubmissions > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={formDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    labelLine={{ stroke: '#6b7280', strokeWidth: 1 }}
                    style={{ fontSize: '11px', fontWeight: 500 }}
                  >
                    {formDistribution.map((entry, i) => (
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

      {/* Top Tours Bar Chart */}
      {topTours.length > 0 && (
        <Card className="border-[#1f2d28]/20 shadow-lg bg-white">
          <CardHeader className="border-b bg-gradient-to-r from-[#1f2d28]/5 to-white">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#1f2d28]" />
              <CardTitle className="text-[#1f2d28]">Top Requested Tours & Destinations</CardTitle>
            </div>
            <CardDescription className="text-gray-600">Most popular from all form submissions</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            <ResponsiveContainer width="100%" height={Math.max(350, topTours.length * 40)}>
              <BarChart data={topTours} layout="horizontal" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  dataKey="tour" 
                  type="category" 
                  width={180}
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value} enquiries`, 'Total']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                />
                <Bar 
                  dataKey="enquiries" 
                  fill="#1f2d28" 
                  radius={[0, 8, 8, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Form Performance Table */}
      <Card className="border-[#1f2d28]/20 shadow-lg bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-[#1f2d28]/5 to-white">
          <CardTitle className="text-[#1f2d28]">Form Performance Overview</CardTitle>
          <CardDescription className="text-gray-600">Detailed breakdown of each form</CardDescription>
        </CardHeader>
        <CardContent className="p-0 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1f2d28] text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold">Form Name</th>
                  <th className="text-left px-6 py-4 font-semibold">Submissions</th>
                  <th className="text-left px-6 py-4 font-semibold">Percentage</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {formDistribution.map((form, index) => (
                  <tr 
                    key={form.name} 
                    className="hover:bg-gray-50 transition-colors"
                    style={{ animation: `slideIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: form.color }}
                        />
                        <span className="font-semibold text-gray-900">{form.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium">{form.value}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${form.percentage}%`,
                              backgroundColor: form.color
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{form.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-600 text-white hover:bg-green-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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