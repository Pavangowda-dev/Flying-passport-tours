'use client';

import Link from "next/link"
import Image from "next/image"
import { Users, Globe, Shield, Clock, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"
import VideoCard from "@/components/video-card"
import GalleryItem from "@/components/gallery-item"
import TestimonialSlider from "@/components/testimonial-slider"
import WhatsAppButton from "@/components/whatsapp-button"
import PopupForm from "@/components/popup-form"
import { useState, useEffect, useRef } from "react"

// Updated tour data - Removed China, Added 7-Day Vietnam (first), Japan/South Korea/North Korea (Few Seats Left), Egypt, Europe
const upcomingTours = [
  {
    id: "10",
    title: "7-Day Vietnam Explorer: Da Nang, Hoi An & Ha Long Bay",
    destination: "Vietnam",
    image: "/images/tours/vietnam/vietnam (1).png",
    duration: 7,
    price: 98000,
    description: "Discover the best of Central and Northern Vietnam in just 7 days! From the modern charm of Da Nang and the iconic Golden Bridge to the UNESCO town of Hoi An and the breathtaking Ha Long Bay cruise, this tour offers culture, adventure, and relaxation.",
    highlights: ["Da Nang", "Ba Na Hills", "Hoi An", "Ha Long Bay"],
    departureDate: "February 01, 2026",
  },
  {
    id: "11",
    title: "10-Day Japan, South Korea & North Korea",
    destination: "Japan, South Korea, North Korea",
    image: "/images/tours/japan-south-north/japan-south-north (1).png",
    duration: 10,
    price: 337000,
    availability: "limited",
    description: "Explore the unique blend of ancient traditions and modern cities in Japan, South Korea, and North Korea with Flying Passport.",
    highlights: ["Tokyo", "Kyoto", "Seoul", "Pyongyang", "Cultural Experiences"],
    departureDate: "November 7, 2025",
  },
  {
    id: "12",
    title: "8-Day Ancient Egypt Adventure",
    destination: "Egypt",
    image: "/images/tours/Egypt/egypt-1.png",
    duration: 8,
    price: 197000,
    description: "Discover the wonders of Ancient Egypt with guided tours to the Giza Pyramids, Nile River cruise, and more from Bangalore.",
    highlights: ["Giza Pyramids", "Nile River Cruise", "Luxor", "Aswan", "Alexandria"],
    departureDate: "February 11, 2026",
  },
  {
    id: "6",
    title: "12-Day European Highlights",
    destination: "Europe",
    image: "/images/tours/Europe/Europe-1.png",
    duration: 12,
    price: 327000,
    description: "Discover the charm of Europe’s iconic cities with guided tours, Indian meals, and seamless travel arrangements from Bangalore.",
    highlights: ["Paris", "Amsterdam", "Venice", "Rome", "Mt. Titlis"],
    departureDate: "April 16, 2026",
  },
]

// Updated videos with new links, thumbnails, and shortened titles
const videos = [
  {
    thumbnail: "/images/thumbnail/japan.jpg",
    title: "ಜಪಾನ್ ದೇಶದ ಕನ್ನಡಿಗರ ಅನುಭವ | Japan🇯🇵",
    videoId: "Na5cjnvYqCY",
  },
  {
    thumbnail: "/images/thumbnail/swit.jpg",
    title: "ಸ್ವಿಟ್ಜರ್ಲ್ಯಾಂಡ್ ಕುಟುಂಬ ಸಫಾರಿ❤️",
    videoId: "H5hQsygf4Bc",
  },
  {
    thumbnail: "/images/thumbnail/masai.jpg",
    title: "ಮಸಾಯ್ ಕಾಡಿನ ಕನ್ನಡಿಗರ ಸಫಾರಿ | Kenya🦒",
    videoId: "Ecc7mgA0cJo",
  },
  {
    thumbnail: "/images/thumbnail/europe.jpg",
    title: "ಗೋಲ್ಡನ್ ಯೂರೋಪ್ ಟೂರ್🌍 | Solo ಹುಡುಗಿಯರು",
    videoId: "NhmDvf12FsM",
  },
]

// Updated gallery images with keyword-optimized alt text, including 5 additional images
const galleryImages = [
  {
    src: "/images/gallery/gallery-1.png",
    alt: "Best travel agency in Bangalore group tour",
  },
  {
    src: "/images/gallery/gallery-2.png",
    alt: "International group tours from Bangalore",
  },
  {
    src: "/images/gallery/gallery-3.png",
    alt: "Affordable holiday packages from Karnataka",
  },
  {
    src: "/images/gallery/gallery-4.png",
    alt: "Cultural group tours from Bangalore",
  },
  {
    src: "/images/gallery/gallery-5.png",
    alt: "Kannada-guided group tours Karnataka",
  },
  {
    src: "/images/gallery/gallery-6.png",
    alt: "Group adventures with Flying Passport",
  },
  {
    src: "/images/gallery/gallery-7.png",
    alt: "Travel highlights",
  },
  {
    src: "/images/gallery/gallery-8.png",
    alt: "Destination visits",
  },
  {
    src: "/images/gallery/gallery-9.png",
    alt: "Travel moments",
  },
  {
    src: "/images/gallery/gallery-10.png",
    alt: "Group travel",
  },
  {
    src: "/images/gallery/gallery-11.png",
    alt: "Historic monuments",
  },
]

// Updated testimonials with corrected "Flying Passport"
const testimonials = [
  {
    id: 1,
    name: "Prashanth Babu",
    avatar: "👨🏻",
    quote:
      "Had an amazing Europe group tour experience with Flying Passport! Everything was well organized and truly memorable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Arun Kumar",
    avatar: "👨🏽",
    quote:
      "Kenya tour with Flying Passport was just mind-blowing! The safari experience was once in a lifetime — saw lions, elephants, everything up close. Super well-managed trip!",
    rating: 5,
  },
  {
    id: 3,
    name: "Mamatha",
    avatar: "👩🏻",
    quote: "ಟೋಕಿಯೋ ಟೂರ್ ಫ್ಲೈಯಿಂಗ್ ಪಾಸ್ಪೋರ್ಟ್‌ ಜೊತೆ ಶುಭ್ರಮಯವಾಗಿತ್ತು. ತೊಳೆದ ನಗರ, ರುಚಿಯಾದ ಊಟ, ಶಾಂತ ಪರಿಸರ。",
    rating: 5,
  },
  {
    id: 4,
    name: "Yashaswini",
    avatar: "👩🏽",
    quote: "ಇಟಲಿ ಟೂರ್ ಫ್ಲೈಯಿಂಗ್ ಪಾಸ್ಪೋರ್ಟ್‌ ಜೊತೆ ಸ್ಮರಣೀಯವಾಗಿತ್ತು! ಕೊಲೋಸಿಯಂ, ವೆನಿಸ್, ಪಿಜಾ ಟವರ್ ಎಲ್ಲವೂ ಲೈವ್ ನೋಡಿದ ಉಲ್ಲಾಸವೇ ಬೇರೆ. ಯೋಜನೆ ಬಿನ್ನವಾಗಿತ್ತು!",
    rating: 5,
  },
]

export default function Home() {
  // State for animated counters
  const [happyTravelers, setHappyTravelers] = useState(0)
  const [countries, setCountries] = useState(0)
  const missionRef = useRef(null)

  // Animation logic
  useEffect(() => {
    let observer
    let happyInterval
    let countriesInterval
    let hasAnimated = false

    const startAnimation = () => {
      if (hasAnimated) return // Prevent re-animation

      hasAnimated = true

      // Happy Travelers animation (0 to 1000)
      let happyCount = 0
      const happyTarget = 1000
      const duration = 2000 // 2 seconds
      const incrementTime = 20 // Update every 20ms
      const increments = duration / incrementTime
      const happyStep = happyTarget / increments
      const easeOut = (t) => 1 - Math.pow(1 - t, 3) // Ease-out function

      happyInterval = setInterval(() => {
        happyCount += happyStep
        const progress = happyCount / happyTarget
        const easedValue = happyTarget * easeOut(progress)
        setHappyTravelers(Math.min(easedValue, happyTarget))
        if (happyCount >= happyTarget) {
          setHappyTravelers(happyTarget)
          clearInterval(happyInterval)
        }
      }, incrementTime)

      // Countries animation (0 to 99)
      let countriesCount = 0
      const countriesTarget = 99
      const countriesStep = countriesTarget / increments

      countriesInterval = setInterval(() => {
        countriesCount += countriesStep
        const progress = countriesCount / countriesTarget
        const easedValue = countriesTarget * easeOut(progress)
        setCountries(Math.min(easedValue, countriesTarget))
        if (countriesCount >= countriesTarget) {
          setCountries(countriesTarget)
          clearInterval(countriesInterval)
        }
      }, incrementTime)
    }

    // IntersectionObserver to trigger animation when Our Mission is in view
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
        }
      },
      { threshold: 0.5 } // Trigger when 50% of Our Mission section is visible
    )

    if (missionRef.current) {
      observer.observe(missionRef.current)
    }

    // Cleanup
    return () => {
      if (observer && missionRef.current) {
        observer.unobserve(missionRef.current)
      }
      if (happyInterval) clearInterval(happyInterval)
      if (countriesInterval) clearInterval(countriesInterval)
    }
  }, [])

  return (
    <div>
      {/* Hero Section with Video Background */}
      <HeroSection
        title="Explore the World with Flying Passport"
        subtitle="Join our unforgettable group tours from Bangalore to Japan, Europe, Kenya, and beyond with Kannada-guided experiences."
        ctaText="Discover Our Tours"
        ctaLink="#upcoming-tours"
        useVideo={true}
      />

      {/* Popup Form */}
      <PopupForm />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Upcoming Group Tours */}
      <section id="upcoming-tours" className="py-12 md:py-16 mb-8 md:mb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Upcoming Group Tours</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the best travel agency in Bangalore for budget-friendly international group tours from Karnataka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto justify-items-center overflow-x-auto snap-x snap-mandatory md:snap-none md:overflow-x-visible">
            {upcomingTours.map((tour) => (
              <Link href={`/tours/${tour.id}`} key={tour.id} className="group w-full max-w-md mx-auto flex-shrink-0 snap-center">
                <Card className="overflow-hidden hover-lift h-full">
                  <div className="relative h-48">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={`${tour.title} from Bangalore with Flying Passport`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      quality={85}
                    />
                    <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {tour.departureDate}
                    </div>
                    {/* Status Badge for Fully Booked */}
                    {tour.status === "closed" && (
                      <div className="absolute inset-0 bg-black/40 z-10 rounded-lg flex items-center justify-center">
                        <div className="bg-black/80 text-white px-3 py-2 rounded-full text-sm font-medium">
                          Fully Booked
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-secondary transition-colors">
                      {tour.title}
                    </h3>
                    {tour.availability === "limited" && (
                      <p className="text-red-600 text-sm font-medium mb-2">
                        Few Seats Left! Hurry Up!
                      </p>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Clock size={16} className="mr-1" />
                      <span>{tour.duration} Days</span>
                      <span className="mx-2">•</span>
                      <Users size={16} className="mr-1" />
                      <span>Group Tour</span>
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
                        <span className="font-bold text-lg">From ₹{tour.price.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-muted-foreground"> / person</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-secondary hover:bg-accent hover:text-primary transition-colors text-white"
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
          <div className="text-center mt-10">
            <Button asChild className="bg-secondary hover:bg-accent hover:text-primary transition-colors">
              <Link href="/tours">See All Group Tours</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Youtube Vlogs */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Our Group Tour Adventures</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience our tours through our videos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.title} thumbnail={video.thumbnail} title={video.title} videoId={video.videoId} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="bg-secondary hover:bg-accent hover:text-primary transition-colors">
              <Link href="https://youtube.com/@flyingpassport?si=AnL0RuwBIj4TbDuc" target="_blank">
                Watch More on YouTube
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Travelers Gallery */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Travelers Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Memories from our international group tours with Flying Passport.
            </p>
          </div>
          <div className="flex flex-row overflow-x-auto overflow-y-hidden gap-4 snap-x snap-mandatory pb-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-56 aspect-square">
                <GalleryItem src={image.src} alt={image.alt} className="h-full" width={300} height={300} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="bg-secondary hover:bg-accent hover:text-primary transition-colors">
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">What Our Travelers Say</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Hear from travelers who traveled with us for us
            </p>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Our Mission */}
      <section ref={missionRef} className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
              At Flying Passport, our mission is to create meaningful international group tours and affordable holiday packages from Karnataka. We foster cultural connections, support local communities, and create unforgettable memories. Explore family packages or contact us today!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-white/50 transition-colors duration-300">
              <div className="p-3 bg-secondary/10 rounded-full mb-4">
                <Users size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Meaningful Connections</h3>
              <p className="text-sm text-muted-foreground">
                Our group tours from Bangalore help like-minded travelers bond and create shared memories.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-white/50 transition-colors duration-300">
              <div className="p-3 bg-secondary/10 rounded-full mb-4">
                <Globe size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Responsible Travel</h3>
              <p className="text-sm text-muted-foreground">
                We promote responsible tourism, respecting local cultures and empowering communities in Karnataka and beyond.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-white/50 transition-colors duration-300">
              <div className="p-3 bg-secondary/10 rounded-full mb-4">
                <Heart size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Authentic Experiences</h3>
              <p className="text-sm text-muted-foreground">
                Our <strong>Kannada-guided group tours</strong> deliver immersive experiences beyond typical tourist spots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-8 lg:gap-16 justify-center">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <div className="p-2 bg-accent rounded-full mr-0 md:mr-3 mb-2 md:mb-0">
                <Users size={20} className="text-primary md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-lg">{Math.floor(happyTravelers)}+</p>
                <p className="text-xs md:text-sm text-muted-foreground">Happy Travelers</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <div className="p-2 bg-accent rounded-full mr-0 md:mr-3 mb-2 md:mb-0">
                <Globe size={20} className="text-primary md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-lg">{Math.floor(countries)}+</p>
                <p className="text-xs md:text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <div className="p-2 bg-accent rounded-full mr-0 md:mr-3 mb-2 md:mb-0">
                <Star size={20} className="text-primary md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-lg">5-Star</p>
                <p className="text-xs md:text-sm text-muted-foreground">Rated Service</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <div className="p-2 bg-accent rounded-full mr-0 md:mr-3 mb-2 md:mb-0">
                <Shield size={20} className="text-primary md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-lg">100%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Secure Booking</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}