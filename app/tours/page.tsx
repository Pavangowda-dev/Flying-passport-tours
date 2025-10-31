'use client';

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Users, ChevronDown, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import WhatsAppButton from "@/components/whatsapp-button"
import PopupForm from "@/components/popup-form"

// Updated tours array with modified China tour, new Egypt tour, and updated Japan/South Korea/North Korea tour
const tours = [
  {
    id: "10",
    title: "12-Day China Discovery",
    destination: "china",
    region: "asia",
    image: "/images/tours/China/china-1.png",
    duration: 12,
    price: 285000,
    description:
      "Explore China's rich history and modern marvels, from the Great Wall to vibrant Shanghai, on this immersive group tour.",
    highlights: ["Beijing", "Great Wall", "Xi'an", "Shanghai"],
    status: "closed",
    departureDate: "October 27, 2025",
  },
  {
    id: "11",
    title: "10-Day Japan, South Korea & North Korea",
    destination: "japan-south-korea-north-korea",
    region: "asia",
    image: "/images/tours/Japan S&N/japan-s-n-01.png",
    duration: 10,
    price: 337000,
    description:
      "Embark on a unique journey through Japan, South Korea, and North Korea, exploring vibrant cultures, historic landmarks, and modern cities.",
    highlights: ["Tokyo", "Seoul", "Pyongyang", "Kyoto"],
    status: "upcoming",
    departureDate: "November 7, 2025",
    availability: "limited",
  },
  {
    id: "12",
    title: "8-Day Ancient Egypt Adventure",
    destination: "egypt",
    region: "africa",
    image: "/images/tours/Egypt/egypt-1.png",
    duration: 8,
    price: 197000,
    description:
      "Discover the wonders of Ancient Egypt on this 8-day group tour. Pricing: Double Occupancy ₹1,97,000, Children ₹1,39,000.",
    highlights: ["Cairo", "Giza Pyramids", "Alexandria", "Aswan", "Luxor"],
    status: "upcoming",
    departureDate: "February 11, 2026",
  },
  {
    id: "6",
    title: "12-Day European Highlights",
    destination: "europe",
    region: "europe",
    image: "/images/tours/Europe/Europe-1.png",
    duration: 12,
    price: 327000,
    description:
      "Discover the charm of Europe's iconic cities on this 12-day, 11-night group tour. Pricing: Single Occupancy ₹3,92,000, Double Occupancy ₹3,27,000, Children ₹2,50,000.",
    highlights: [
      "Paris",
      "Brussels",
      "Amsterdam",
      "Luxembourg",
      "Black Forest",
      "Rhine Falls",
      "Mt Titlis",
      "Lucerne",
      "Vaduz",
      "Innsbruck",
      "Venice",
      "Pisa",
      "Rome"
    ],
    status: "upcoming",
    departureDate: "April 16, 2026",
  },
  {
    id: "4",
    title: "6-Day Kenyan Safari",
    destination: "kenya",
    region: "africa",
    image: "/images/tours/kenya/kenya-1.webp",
    duration: 6,
    price: 0,
    description:
      "Embark on an unforgettable journey through Kenya's breathtaking landscapes, witnessing iconic wildlife in their natural habitat with expert guides.",
    highlights: ["Masai Mara", "Nairobi", "Lake Nakuru", "Amboseli"],
    status: "expired",
    departureDate: "Dates will be announced soon",
  },
  {
    id: "1",
    title: "10-Day Japan Adventure",
    destination: "japan",
    region: "asia",
    image: "/images/tours/japan.webp",
    duration: 10,
    price: 0,
    description:
      "Immerse yourself in Japan's unique blend of tradition and modernity, from serene temples to bustling cityscapes.",
    highlights: ["Tokyo", "Kyoto", "Mount Fuji", "Hiroshima"],
    status: "expired",
    departureDate: "Dates will be announced soon",
  },
  {
    id: "2",
    title: "12-Day Italian Discovery",
    destination: "italy",
    region: "europe",
    image: "/images/tours/italy.webp",
    duration: 12,
    price: 0,
    description:
      "Experience Italy's rich history, art, and cuisine, from ancient Rome to the romantic canals of Venice.",
    highlights: ["Rome", "Florence", "Venice", "Amalfi Coast"],
    status: "expired",
    departureDate: "Dates will be announced soon",
  },
  {
    id: "3",
    title: "8-Day Turkish Delight",
    destination: "turkey",
    region: "europe",
    image: "/images/tours/turkey.webp",
    duration: 8,
    price: 0,
    description:
      "Explore Turkey's vibrant culture, from Istanbul's historic sites to Cappadocia's surreal landscapes.",
    highlights: ["Istanbul", "Cappadocia", "Pamukkale", "Ephesus"],
    status: "expired",
    departureDate: "Dates will be announced soon",
  },
  {
    id: "5",
    title: "9-Day Thailand Explorer",
    destination: "thailand",
    region: "asia",
    image: "/images/tours/thailand.webp",
    duration: 9,
    price: 0,
    description:
      "Discover Thailand's vibrant cities, stunning beaches, and rich cultural heritage on this exciting group tour.",
    highlights: ["Bangkok", "Chiang Mai", "Phuket", "Phi Phi Islands"],
    status: "expired",
    departureDate: "Dates will be announced soon",
  },
  {
    id: "7",
    title: "10-Day Vietnam Journey",
    destination: "vietnam",
    region: "asia",
    image: "/images/tours/vietnam.webp",
    duration: 10,
    price: 0,
    description:
      "Experience Vietnam's rich history, stunning landscapes, and vibrant culture on this immersive group tour.",
    highlights: ["Hanoi", "Ha Long Bay", "Hoi An", "Ho Chi Minh City"],
    status: "expired",
    departureDate: "Dates will be announced soon",
  },
  {
    id: "8",
    title: "11-Day Greek Island Hopping",
    destination: "greece",
    region: "europe",
    image: "/images/tours/greek.webp",
    duration: 11,
    price: 0,
    description:
      "Sail through Greece's stunning islands, from the whitewashed cliffs of Santorini to the historic ruins of Athens.",
    highlights: ["Athens", "Mykonos", "Santorini", "Crete"],
    status: "expired",
    departureDate: "Dates will be announced soon",
  },
  {
    id: "9",
    title: "9-Day Amazon Forest Adventure",
    destination: "brazil-amazon",
    region: "south-america",
    image: "/images/tours/Amazon-forest.png",
    duration: 9,
    price: 0,
    description:
      "Embark on an unforgettable journey into the heart of the Amazon rainforest, experiencing incredible biodiversity, indigenous cultures, and thrilling wildlife encounters.",
    highlights: ["Amazon Rainforest", "Manaus", "Piraha Tribe", "Pink River Dolphins", "Canopy Walkways"],
    status: "expired",
    departureDate: "Dates will be announced soon",
  },
]

const continents = [
  { value: "asia", label: "Asia", icon: "🌏" },
  { value: "africa", label: "Africa", icon: "🌍" },
  { value: "north-america", label: "North America", icon: "🌎" },
  { value: "south-america", label: "South America", icon: "🌎" },
  { value: "antarctica", label: "Antarctica", icon: "❄️" },
  { value: "europe", label: "Europe", icon: "🌍" },
  { value: "australia", label: "Australia", icon: "🌏" },
]

export default function ToursPage() {
  const [priceRange, setPriceRange] = useState([0, 350000])
  const [durationFilter, setDurationFilter] = useState<string[]>([])
  const [continentFilter, setContinentFilter] = useState<string[]>([])
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false)
  const [isContinentDropdownOpen, setIsContinentDropdownOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedTourTitle, setSelectedTourTitle] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)

  // Ensure page loads from the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredTours = tours.filter((tour) => {
    // Filter by price - include tours with price 0 (coming soon tours)
    if (tour.price > 0 && (tour.price < priceRange[0] || tour.price > priceRange[1])) return false

    // Filter by duration
    if (durationFilter.length > 0) {
      if (durationFilter.includes("short") && tour.duration > 7) return false
      if (durationFilter.includes("medium") && (tour.duration <= 7 || tour.duration > 12)) return false
      if (durationFilter.includes("long") && tour.duration <= 12) return false
    }

    // Filter by continent
    if (continentFilter.length > 0) {
      if (!continentFilter.includes(tour.region)) return false
    }

    return true
  })

  // Separate upcoming and coming back soon tours
  const upcomingTours = filteredTours.filter((tour) => tour.status === "upcoming" || tour.status === "closed")
  // Sort upcoming tours in the specified order
  const sortedUpcomingTours = [
    upcomingTours.find(tour => tour.id === "10"), // China
    upcomingTours.find(tour => tour.id === "11"), // Japan/South Korea/North Korea
    upcomingTours.find(tour => tour.id === "12"), // Egypt
    upcomingTours.find(tour => tour.id === "6"),  // Europe
  ].filter(Boolean) as typeof upcomingTours
  const comingBackSoonTours = filteredTours.filter((tour) => tour.status === "expired")

  // Auto-scroll for mobile Coming Back Soon section
  useEffect(() => {
    if (window.innerWidth >= 768 || comingBackSoonTours.length <= 1) return

    let autoScrollInterval: NodeJS.Timeout

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (scrollContainerRef.current && !isAutoScrolling) {
          setIsAutoScrolling(true)
          const containerWidth = scrollContainerRef.current.offsetWidth
          const gap = 12
          const cardWidth = containerWidth - 24 // Account for padding
          const maxSlide = comingBackSoonTours.length - 1
          const currentScrollLeft = scrollContainerRef.current.scrollLeft
          const currentSlide = Math.round(currentScrollLeft / (cardWidth + gap))
          
          const nextSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1
          
          scrollContainerRef.current.scrollTo({
            left: nextSlide * (cardWidth + gap),
            behavior: 'smooth'
          })
          
          setTimeout(() => setIsAutoScrolling(false), 800)
        }
      }, 4000) // Auto-scroll every 4 seconds
    }

    // Start auto-scroll after a delay to allow user to read first card
    const delayStart = setTimeout(() => {
      startAutoScroll()
    }, 3000)

    return () => {
      clearTimeout(delayStart)
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
      }
    }
  }, [comingBackSoonTours.length, isAutoScrolling])

  const handlePrevSlide = () => {
    if (scrollContainerRef.current && comingBackSoonTours.length > 1) {
      const containerWidth = scrollContainerRef.current.offsetWidth
      const gap = 12
      const cardWidth = containerWidth - 24
      const maxSlide = comingBackSoonTours.length - 1
      const currentScrollLeft = scrollContainerRef.current.scrollLeft
      const currentSlide = Math.round(currentScrollLeft / (cardWidth + gap))
      
      const prevSlide = currentSlide === 0 ? maxSlide : currentSlide - 1
      
      scrollContainerRef.current.scrollTo({
        left: prevSlide * (cardWidth + gap),
        behavior: 'smooth'
      })
    }
  }

  const handleNextSlide = () => {
    if (scrollContainerRef.current && comingBackSoonTours.length > 1) {
      const containerWidth = scrollContainerRef.current.offsetWidth
      const gap = 12
      const cardWidth = containerWidth - 24
      const maxSlide = comingBackSoonTours.length - 1
      const currentScrollLeft = scrollContainerRef.current.scrollLeft
      const currentSlide = Math.round(currentScrollLeft / (cardWidth + gap))
      
      const nextSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1
      
      scrollContainerRef.current.scrollTo({
        left: nextSlide * (cardWidth + gap),
        behavior: 'smooth'
      })
    }
  }

  const handleEarlyAccessClick = (tourTitle: string) => {
    setSelectedTourTitle(tourTitle)
    setIsPopupOpen(true)
  }

  return (
    <div className="pt-24 sm:pt-20 md:pt-24 pb-6 sm:pb-8 md:pb-16 min-h-screen">
      {/* WhatsApp Button */}
      <WhatsAppButton alwaysVisible={true} />

      {/* Popup Form */}
      <PopupForm isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} tourTitle={selectedTourTitle} />

      {/* JSON-LD Schema for Tours */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": sortedUpcomingTours.map((tour, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": tour.title,
              "description": tour.description,
              "url": `https://flyingpassports.com/tours/${tour.id}`,
              "image": `https://flyingpassports.com${tour.image}`,
              "offers": {
                "@type": "Offer",
                "price": tour.price.toString(),
                "priceCurrency": "INR",
                "availability": tour.status === "closed" ? "http://schema.org/OutOfStock" : "http://schema.org/InStock",
                "validFrom": tour.departureDate,
              },
            },
          })),
        })}
      </script>

      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="mb-2 sm:mb-3">
          <h1 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center">
            Explore Our Group Tours
          </h1>
        </div>

        {/* Mobile: Filters stacked layout */}
        <div className="md:hidden mb-4 md:mb-6 px-2">
          {/* Price Range - Full width on mobile */}
          <div className="w-full mb-3">
            <DropdownMenu open={isPriceDropdownOpen} onOpenChange={setIsPriceDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center text-sm bg-transparent min-h-[44px]"
                >
                  <span className="truncate">
                    Price Range: ₹{(priceRange[0] / 100000).toFixed(1)}L - ₹{(priceRange[1] / 100000).toFixed(1)}L
                  </span>
                  <ChevronDown size={16} className="ml-2 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full p-4">
                <h3 className="font-serif font-bold text-base mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 350000]}
                    min={0}
                    max={350000}
                    step={10000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{(priceRange[0] / 100000).toFixed(1)}L</span>
                    <span>₹{(priceRange[1] / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Continents and Duration - Side by side on mobile */}
          <div className="flex gap-3">
            {/* Continent Filter Dropdown */}
            <div className="flex-1">
              <DropdownMenu open={isContinentDropdownOpen} onOpenChange={setIsContinentDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center text-sm bg-transparent min-h-[44px]"
                  >
                    <span className="truncate">
                      {continentFilter.length === 0 ? "All Continents" : 
                       continentFilter.map(c => continents.find(cont => cont.value === c)?.label || c).join(", ")}
                    </span>
                    <ChevronDown size={16} className="ml-2 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full p-4 max-h-64 overflow-y-auto">
                  <h3 className="font-serif font-bold text-base mb-4">Continents</h3>
                  <div className="space-y-2">
                    {continents.map((continent) => (
                      <div key={continent.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={continent.value}
                          checked={continentFilter.includes(continent.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setContinentFilter([...continentFilter, continent.value])
                            } else {
                              setContinentFilter(continentFilter.filter((c) => c !== continent.value))
                            }
                          }}
                          className="max-sm:h-3 max-sm:w-3 h-4 w-4"
                        />
                        <Label htmlFor={continent.value} className="text-sm cursor-pointer flex items-center">
                          <span className="mr-2 text-xs">{continent.icon}</span>
                          {continent.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Duration Filter Dropdown */}
            <div className="flex-1">
              <DropdownMenu open={isDurationDropdownOpen} onOpenChange={setIsDurationDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center text-sm bg-transparent min-h-[44px]"
                  >
                    <span className="truncate">
                      Duration:{' '}
                      {durationFilter.length === 0
                        ? "All"
                        : durationFilter.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")}
                    </span>
                    <ChevronDown size={16} className="ml-2 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full p-4">
                  <h3 className="font-serif font-bold text-base mb-4">Duration</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="short"
                        checked={durationFilter.includes("short")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDurationFilter([...durationFilter, "short"])
                          } else {
                            setDurationFilter(durationFilter.filter((d) => d !== "short"))
                          }
                        }}
                        className="max-sm:h-3 max-sm:w-3 h-4 w-4"
                      />
                      <Label htmlFor="short" className="text-sm">
                        Short (1-7 days)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="medium"
                        checked={durationFilter.includes("medium")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDurationFilter([...durationFilter, "medium"])
                          } else {
                            setDurationFilter(durationFilter.filter((d) => d !== "medium"))
                          }
                        }}
                        className="max-sm:h-3 max-sm:w-3 h-4 w-4"
                      />
                      <Label htmlFor="medium" className="text-sm">
                        Medium (8-12 days)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="long"
                        checked={durationFilter.includes("long")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDurationFilter([...durationFilter, "long"])
                          } else {
                            setDurationFilter(durationFilter.filter((d) => d !== "long"))
                          }
                        }}
                        className="max-sm:h-3 max-sm:w-3 h-4 w-4"
                      />
                      <Label htmlFor="long" className="text-sm">
                        Long (13+ days)
                      </Label>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Desktop: Filters horizontal layout */}
        <div className="hidden md:flex justify-center gap-3 md:gap-4 mb-4 md:mb-6 px-2">
          {/* Continent Filter Dropdown */}
          <DropdownMenu open={isContinentDropdownOpen} onOpenChange={setIsContinentDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-auto flex justify-between items-center text-sm bg-transparent min-h-[44px]"
              >
                <span className="truncate">
                  {continentFilter.length === 0 ? "All Continents" : 
                   continentFilter.map(c => continents.find(cont => cont.value === c)?.label || c).join(", ")}
                </span>
                <ChevronDown size={16} className="ml-2 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-4 max-h-64 overflow-y-auto">
              <h3 className="font-serif font-bold text-base md:text-lg mb-4">Continents</h3>
              <div className="space-y-2">
                {continents.map((continent) => (
                  <div key={continent.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={continent.value}
                      checked={continentFilter.includes(continent.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setContinentFilter([...continentFilter, continent.value])
                        } else {
                          setContinentFilter(continentFilter.filter((c) => c !== continent.value))
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <Label htmlFor={continent.value} className="text-sm cursor-pointer flex items-center">
                      <span className="mr-2 text-xs">{continent.icon}</span>
                      {continent.label}
                    </Label>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Range Filter Dropdown */}
          <DropdownMenu open={isPriceDropdownOpen} onOpenChange={setIsPriceDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-auto flex justify-between items-center text-sm bg-transparent min-h-[44px]"
              >
                <span className="truncate">
                  Price Range: ₹{(priceRange[0] / 100000).toFixed(1)}L - ₹{(priceRange[1] / 100000).toFixed(1)}L
                </span>
                <ChevronDown size={16} className="ml-2 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 md:w-80 p-4">
              <h3 className="font-serif font-bold text-base md:text-lg mb-4">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 350000]}
                  min={0}
                  max={350000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex justify-between text-sm">
                  <span>₹{(priceRange[0] / 100000).toFixed(1)}L</span>
                  <span>₹{(priceRange[1] / 100000).toFixed(1)}L</span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Duration Filter Dropdown */}
          <DropdownMenu open={isDurationDropdownOpen} onOpenChange={setIsDurationDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-auto flex justify-between items-center text-sm bg-transparent min-h-[44px]"
              >
                <span className="truncate">
                  Duration:{' '}
                  {durationFilter.length === 0
                    ? "All"
                    : durationFilter.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")}
                </span>
                <ChevronDown size={16} className="ml-2 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 md:w-56 p-4">
              <h3 className="font-serif font-bold text-base md:text-lg mb-4">Duration</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="short"
                    checked={durationFilter.includes("short")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDurationFilter([...durationFilter, "short"])
                      } else {
                        setDurationFilter(durationFilter.filter((d) => d !== "short"))
                      }
                    }}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="short" className="text-sm">
                    Short (1-7 days)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="medium"
                    checked={durationFilter.includes("medium")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDurationFilter([...durationFilter, "medium"])
                      } else {
                        setDurationFilter(durationFilter.filter((d) => d !== "medium"))
                      }
                    }}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="medium" className="text-sm">
                    Medium (8-12 days)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="long"
                    checked={durationFilter.includes("long")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDurationFilter([...durationFilter, "long"])
                      } else {
                        setDurationFilter(durationFilter.filter((d) => d !== "long"))
                      }
                    }}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="long" className="text-sm">
                    Long (13+ days)
                  </Label>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Upcoming Tours Section */}
        {sortedUpcomingTours.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="font-serif font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-center">
              Upcoming Tours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedUpcomingTours.map((tour) => (
                <Link href={`/tours/${tour.id}`} key={tour.id} className="group">
                  <Card className="overflow-hidden hover-lift h-full">
                    <div className="relative h-48 sm:h-52 md:h-56">
                      <Image
                        src={tour.image || "/placeholder.svg"}
                        alt={`${tour.title} group tour from Bangalore with Flying Passport`}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        loading="lazy"
                      />
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-secondary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {tour.departureDate}
                      </div>
                      {/* Status Badge */}
                      {tour.status === "closed" && (
                        <div className="absolute inset-0 bg-black/40 z-10 rounded-lg flex items-center justify-center">
                          <div className="bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                            Fully Booked
                          </div>
                        </div>
                      )}
                      {/* Continent Badge */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-primary/20 text-primary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        <MapPin size={12} className="inline mr-1" />
                        {continents.find(c => c.value === tour.region)?.label}
                      </div>
                    </div>
                    <CardContent className="p-3 sm:p-4 md:p-5">
                      <h3 className="font-serif font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                        {tour.title}
                      </h3>
                      <div className="flex items-center text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4">
                        <Clock size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
                        <span>{tour.duration} Days</span>
                        <span className="mx-2 sm:mx-3">•</span>
                        <Users size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
                        <span>40 People</span>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                        {tour.description}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                        {tour.highlights.slice(0, 3).map((highlight, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                        {tour.highlights.length > 3 && (
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            +{tour.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          {tour.availability === "limited" && (
                            <p className="text-red-600 text-xs sm:text-sm font-medium mb-2">
                              Few Seats Left! Hurry Up!
                            </p>
                          )}
                          <span className="font-bold text-sm sm:text-base md:text-lg">
                            {tour.price > 0 ? `From ₹${tour.price.toLocaleString("en-IN")}` : "Price on Request"}
                          </span>
                          <span className="text-xs text-muted-foreground"> / person</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-secondary hover:bg-accent hover:text-primary transition-colors text-xs sm:text-sm px-3 sm:px-4 py-2 min-h-[36px]"
                          disabled={tour.status === "closed"}
                        >
                          {tour.status === "closed" ? "Fully Booked" : "View Details"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Coming Back Soon Tours Section */}
        {comingBackSoonTours.length > 0 && (
          <div>
            <h2 className="font-serif font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-center">
              Coming Back Soon
            </h2>
            {/* Mobile: Horizontal scrolling with simple arrow navigation */}
            <div className="md:hidden">
              <div className="relative">
                {/* Cards Container */}
                <div 
                  ref={scrollContainerRef}
                  className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide touch-pan-x"
                  style={{
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {comingBackSoonTours.map((tour) => (
                    <Link
                      href={`/tours/${tour.id}`}
                      key={tour.id}
                      className="flex-shrink-0 snap-start w-[calc(100vw-48px)] sm:w-[calc(100vw-56px)]"
                      onClick={() => handleEarlyAccessClick(tour.title)}
                    >
                      <Card className="overflow-hidden hover-lift h-full">
                        <div className="relative h-48 sm:h-52">
                          <Image
                            src={tour.image || "/placeholder.svg"}
                            alt={`${tour.title} group tour from Karnataka with Flying Passport`}
                            fill
                            className="object-cover object-center transition-transform duration-500 hover:scale-105"
                            sizes="100vw"
                            quality={75}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 z-10 rounded-lg flex items-center justify-center">
                            <div className="bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-medium">
                              Coming Back Soon
                            </div>
                          </div>
                          {/* Continent Badge for mobile */}
                          <div className="absolute top-2 right-2 bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs">
                            {continents.find(c => c.value === tour.region)?.label}
                          </div>
                        </div>
                        <CardContent className="p-3 sm:p-4">
                          <h3 className="font-serif font-bold text-base sm:text-lg mb-2 sm:mb-3 hover:text-secondary transition-colors line-clamp-2">
                            {tour.title}
                          </h3>
                          <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                            <Clock size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
                            <span>{tour.duration} Days</span>
                            <span className="mx-2 sm:mx-3">•</span>
                            <Users size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
                            <span>40 People</span>
                          </div>
                          <p className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                            {tour.description}
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                            {tour.highlights.slice(0, 3).map((highlight, index) => (
                              <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                                {highlight}
                              </span>
                            ))}
                            {tour.highlights.length > 3 && (
                              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                +{tour.highlights.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-sm sm:text-base">Price on Request</span>
                              <span className="text-xs text-muted-foreground"> / person</span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-secondary hover:bg-accent hover:text-primary transition-colors text-xs sm:text-sm px-3 sm:px-4 py-2 min-h-[36px]"
                            >
                              Get Early Access
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Simple Arrow Navigation - Below the cards with reduced spacing */}
                <div className="flex justify-center items-center space-x-4 mt-2 pb-4">
                  <button
                    onClick={handlePrevSlide}
                    className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all duration-200 disabled:opacity-50"
                    disabled={comingBackSoonTours.length <= 1}
                    aria-label="Previous tour"
                  >
                    <ChevronLeft size={18} className="text-primary" />
                  </button>
                  
                  <span className="text-xs text-muted-foreground">
                    {comingBackSoonTours.length} tours available
                  </span>
                  
                  <button
                    onClick={handleNextSlide}
                    className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all duration-200 disabled:opacity-50"
                    disabled={comingBackSoonTours.length <= 1}
                    aria-label="Next tour"
                  >
                    <ChevronRight size={18} className="text-primary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: Regular grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {comingBackSoonTours.map((tour) => (
                <Link
                  href={`/tours/${tour.id}`}
                  key={tour.id}
                  className="group"
                  onClick={() => handleEarlyAccessClick(tour.title)}
                >
                  <Card className="overflow-hidden hover-lift h-full">
                    <div className="relative h-48">
                      <Image
                        src={tour.image || "/placeholder.svg"}
                        alt={`${tour.title} group tour from Karnataka with Flying Passport`}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 z-10 rounded-lg flex items-center justify-center">
                        <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
                          Coming Back Soon
                        </div>
                      </div>
                      {/* Continent Badge for desktop */}
                      <div className="absolute top-3 right-3 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        <MapPin size={14} className="inline mr-1" />
                        {continents.find(c => c.value === tour.region)?.label}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                        {tour.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Clock size={14} className="mr-1" />
                        <span>{tour.duration} Days</span>
                        <span className="mx-2">•</span>
                        <Users size={14} className="mr-1" />
                        <span>40 People</span>
                      </div>
                      <p className="text-sm mb-4 line-clamp-2">{tour.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tour.highlights.slice(0, 3).map((highlight, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                        {tour.highlights.length > 3 && (
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            +{tour.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-lg">Price on Request</span>
                          <span className="text-xs text-muted-foreground"> / person</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-secondary hover:bg-accent hover:text-primary transition-colors text-sm"
                        >
                          Get Early Access
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No tours message */}
        {filteredTours.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              No tours match your current filters. Try adjusting the continent, price, or duration.
            </p>
            <Button
              onClick={() => {
                setPriceRange([0, 350000])
                setDurationFilter([])
                setContinentFilter([])
              }}
              className="bg-secondary hover:bg-accent hover:text-primary transition-colors min-h-[44px]"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}