"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VideoCard from "@/components/video-card"
import HeroSection from "@/components/hero-section"
import WhatsAppButton from "@/components/whatsapp-button"

// Sample data
const vlogs = [
  {
    id: 1,
    thumbnail: "/images/vlogs/japan-vlog.jpg",
    title: "Cherry Blossom Season in Japan: Our Group Adventure",
    videoId: "dQw4w9WgXcQ",
    destination: "japan",
    views: 15420,
    date: "2023-04-15",
  },
  {
    id: 2,
    thumbnail: "/images/vlogs/turkey-vlog.jpg",
    title: "Hot Air Balloon Ride in Cappadocia, Turkey",
    videoId: "dQw4w9WgXcQ",
    destination: "turkey",
    views: 12350,
    date: "2023-06-22",
  },
  {
    id: 3,
    thumbnail: "/images/vlogs/kenya-vlog.jpg",
    title: "Safari Adventure in Kenya: Wildlife Encounters",
    videoId: "dQw4w9WgXcQ",
    destination: "kenya",
    views: 9870,
    date: "2023-08-10",
  },
  {
    id: 4,
    thumbnail: "/images/vlogs/europe-vlog.jpg",
    title: "European Highlights: Paris, Rome, and Barcelona",
    videoId: "dQw4w9WgXcQ",
    destination: "europe",
    views: 11230,
    date: "2023-09-05",
  },
  {
    id: 5,
    thumbnail: "/images/vlogs/thailand-vlog.jpg",
    title: "Thailand Food Tour: Street Food Delights in Bangkok",
    videoId: "dQw4w9WgXcQ",
    destination: "thailand",
    views: 8760,
    date: "2023-10-18",
  },
  {
    id: 6,
    thumbnail: "/images/vlogs/italy-vlog.jpg",
    title: "Italian Cuisine: Cooking Class in Florence",
    videoId: "dQw4w9WgXcQ",
    destination: "italy",
    views: 7890,
    date: "2023-11-12",
  },
  {
    id: 7,
    thumbnail: "/images/vlogs/vietnam-vlog.jpg",
    title: "Exploring Ha Long Bay: Cruise Adventure in Vietnam",
    videoId: "dQw4w9WgXcQ",
    destination: "vietnam",
    views: 6540,
    date: "2023-12-05",
  },
  {
    id: 8,
    thumbnail: "/images/vlogs/greece-vlog.jpg",
    title: "Greek Island Hopping: Santorini and Mykonos",
    videoId: "dQw4w9WgXcQ",
    destination: "greece",
    views: 9120,
    date: "2024-01-20",
  },
  {
    id: 9,
    thumbnail: "/images/vlogs/morocco-vlog.jpg",
    title: "Moroccan Markets: Shopping in Marrakech",
    videoId: "dQw4w9WgXcQ",
    destination: "morocco",
    views: 5430,
    date: "2024-02-15",
  },
]

const popularVlogs = [...vlogs].sort((a, b) => b.views - a.views).slice(0, 3)

export default function VlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const vlogsPerPage = 6

  // Filter vlogs based on search query
  const filteredVlogs = vlogs.filter(
    (vlog) =>
      vlog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vlog.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination
  const indexOfLastVlog = currentPage * vlogsPerPage
  const indexOfFirstVlog = indexOfLastVlog - vlogsPerPage
  const currentVlogs = filteredVlogs.slice(indexOfFirstVlog, indexOfLastVlog)
  const totalPages = Math.ceil(filteredVlogs.length / vlogsPerPage)

  return (
    <div className="pt-16">
      <HeroSection
        title="YouTube Vlogs"
        subtitle="Watch our travel adventures and get inspired for your next journey"
        backgroundImage="bg-[url('/images/vlogs/vlogs-hero.jpg')]"
      />
      <WhatsAppButton alwaysVisible={true} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-8 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search vlogs by destination or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>

              {/* Vlogs Grid */}
              {currentVlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentVlogs.map((vlog) => (
                    <VideoCard key={vlog.id} thumbnail={vlog.thumbnail} title={vlog.title} videoId={vlog.videoId} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No vlogs match your search criteria.</p>
                  <Button
                    onClick={() => setSearchQuery("")}
                    className="bg-secondary hover:bg-accent hover:text-primary transition-colors"
                  >
                    Clear Search
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {filteredVlogs.length > vlogsPerPage && (
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      className={currentPage === page ? "bg-secondary hover:bg-secondary" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-lg mb-4">Popular Vlogs</h3>
                  <div className="space-y-4">
                    {popularVlogs.map((vlog) => (
                      <div key={vlog.id} className="flex gap-3">
                        <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={vlog.thumbnail || "/placeholder.svg"}
                            alt={vlog.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium line-clamp-2">{vlog.title}</h4>
                          <p className="text-xs text-muted-foreground">{vlog.views.toLocaleString()} views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-lg mb-4">Subscribe to Our Channel</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Never miss a new travel vlog! Subscribe to our YouTube channel for weekly updates.
                  </p>
                  <Button asChild className="w-full bg-secondary hover:bg-accent hover:text-primary transition-colors">
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                      Subscribe Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
