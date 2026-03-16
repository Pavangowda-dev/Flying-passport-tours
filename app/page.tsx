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
import { getGalleryUrl, getYoutubeThumbUrl } from "@/lib/image-url"

// Import central tours data
import { tours } from "@/lib/tours"

// Updated videos with new links, thumbnails, and shortened titles (now 8 total)
const videos = [
  {
    thumbnail: getYoutubeThumbUrl("yFqcazoMScY-HD.jpg"),
    title: "ಜಪಾನ್‌ನ ನಾರಾ ಪಾರ್ಕ್ 😍 | ಜಿಂಕಗಳ ನಿಜವಾದ ಲೋಕ 🦌",
    videoId: "yFqcazoMScY",
  },
  {
    thumbnail: getYoutubeThumbUrl("sc8Jl-SAqtc-HD.jpg"),
    title: "24 ಜನರೊಂದಿಗೆ ಜಪಾನ್ ಸಾಹಸ 🇯🇵 | ಕನಸುಗಳ ದೇಶದ ಅದ್ಭುತ ಪ್ರಯಾಣ.!",
    videoId: "sc8Jl-SAqtc",
  },
  {
    thumbnail: getYoutubeThumbUrl("ZbndgFZLBUQ-HD.jpg"),
    title: "ನಮ್ಮ 54 ಕನ್ನಡಿಗರ ಎನರ್ಜಿಗೆ ಚೈನಾಗೂ ಶಾಕ್ ಅಯ್ತು.! | Flying Passport Tours",
    videoId: "ZbndgFZLBUQ",
  },
  {
    thumbnail: getYoutubeThumbUrl("q0B62rCpT3k-HD.jpg"),
    title: "ತಿಂಡಿ ಗೆ ಒಂದು ದೇಶ 🍳ಊಟಕ್ಕೆ ಒಂದು ದೇಶ🥘 ಮಲಗಕ್ಕೆ ಮತ್ತೊಂದು ದೇಶ🛌🏼|Flying Passport Tours",
    videoId: "q0B62rCpT3k",
  },
  {
    thumbnail: getYoutubeThumbUrl("JJWm6RCT-Gg-HD.jpg"),
    title: "ನಮ್ಮ ತಂದೆಯನ್ನು ಹೊರದೇಶಕ್ಕೆ ದೇಶಕ್ಕೆ ಕರೆದುಕೊಂಡು ಹೋದ್ವಿ | China 🇨🇳",
    videoId: "JJWm6RCT-Gg",
  },
  {
    thumbnail: getYoutubeThumbUrl("bjeBF0UXSpI-HD.jpg"),
    title: "ಮಸಾಯಿ ಮಾರದಲ್ಲಿ ಕನ್ನಡಿಗರ ಸಾಹಸದ ಕಥೆ",
    videoId: "bjeBF0UXSpI",
  },
  {
    thumbnail: getYoutubeThumbUrl("Mj53_kM-X8Q-HD.jpg"),
    title: "ಸ್ವಿಟ್ಜರ್ಲ್ಯಾಂಡ್ ಮತ್ತು ಪ್ಯಾರಿಸ್ ಅಲ್ಲಿ ಕನ್ನಡದ ಕಂಪು ಬೀರಿದ ಕನ್ನಡಿಗರು💛❤️",
    videoId: "Mj53_kM-X8Q",
  },
  {
    thumbnail: getYoutubeThumbUrl("m8oc2k8hTPI-HD.jpg"),
    title: "ನಮ್ಮ ತಂದೆ ಮೊದಲ ಬಾರಿ ವಿಮಾನ✈️ ಹತ್ತಿದಾಗ ಏನಾಯಿತು ನೋಡಿ..!😱 | Bangalore to Kenya",
    videoId: "m8oc2k8hTPI",
  },
]

// Updated gallery images with keyword-optimized alt text
const galleryImages = [
  {
    src: getGalleryUrl("travellers%20(3).png"),
    alt: "Best travel agency in Bangalore group tour",
  },
  {
    src: getGalleryUrl("travellers%20(11).png"),
    alt: "International group tours from Bangalore",
  },
  {
    src: getGalleryUrl("travellers%20(18).png"),
    alt: "Affordable holiday packages from Karnataka",
  },
  {
    src: getGalleryUrl("travellers%20(16).png"),
    alt: "Cultural group tours from Bangalore",
  },
  {
    src: getGalleryUrl("travellers%20(6).png"),
    alt: "Kannada-guided group tours Karnataka",
  },
  {
    src: getGalleryUrl("travellers%20(14).png"),
    alt: "Group adventures with Flying Passport",
  },
  {
    src: getGalleryUrl("travellers%20(8).png"),
    alt: "Travel highlights",
  },
  {
    src: getGalleryUrl("travellers%20(1).png"),
    alt: "Destination visits",
  },
  {
    src: getGalleryUrl("travellers%20(17).png"),
    alt: "Travel moments",
  },
  {
    src: getGalleryUrl("travellers%20(7).png"),
    alt: "Group travel",
  },
  {
    src: getGalleryUrl("travellers%20(14).png"),
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
  const [visibleVideos, setVisibleVideos] = useState(4)
  const missionRef = useRef(null)

  // Homepage tours – take from central source, filter only tours with slug
  const homepageTours = [...tours]
    .filter((tour) => tour.slug) // ← safety: only tours with slug
    .filter((tour) => tour.status === "upcoming" || tour.status === "live" || tour.status === "closed")
    .sort((a, b) => {
      if (!a.departureDateISO || !b.departureDateISO) return 0
      return new Date(a.departureDateISO).getTime() - new Date(b.departureDateISO).getTime()
    })
    .slice(0, 6)

  // Animation logic for counters
  useEffect(() => {
    let observer
    let happyInterval
    let countriesInterval
    let hasAnimated = false

    const startAnimation = () => {
      if (hasAnimated) return
      hasAnimated = true

      // Happy Travelers (0 → 1000)
      let happyCount = 0
      const happyTarget = 1000
      const duration = 2000
      const incrementTime = 20
      const increments = duration / incrementTime
      const happyStep = happyTarget / increments
      const easeOut = (t) => 1 - Math.pow(1 - t, 3)

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

      // Countries (0 → 99)
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

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
        }
      },
      { threshold: 0.5 }
    )

    if (missionRef.current) {
      observer.observe(missionRef.current)
    }

    return () => {
      if (observer && missionRef.current) {
        observer.unobserve(missionRef.current)
      }
      if (happyInterval) clearInterval(happyInterval)
      if (countriesInterval) clearInterval(countriesInterval)
    }
  }, [])

  // Responsive video count
  useEffect(() => {
    const handleResize = () => {
      setVisibleVideos(window.innerWidth < 768 ? 4 : 8)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      {/* Enhanced SEO – TravelAgency + limited upcoming offers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Flying Passport",
            description:
              "Best travel agency in Bangalore offering international group tours from Karnataka to Vietnam, Egypt, Japan, China, Europe and more with Kannada-guided experiences.",
            url: "https://flyingpassports.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bangalore",
              addressRegion: "Karnataka",
              addressCountry: "IN",
            },
            areaServed: ["Bangalore", "Karnataka", "India"],
            offers: homepageTours.map((tour) => ({
              "@type": "Offer",
              name: tour.title,
              description: tour.description,
              price: tour.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              validFrom: tour.departureDateISO || undefined,
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <HeroSection
        title="Explore the World with Flying Passport"
        subtitle="Join our unforgettable group tours from Bangalore to Vietnam, Egypt, Japan, China, Europe and beyond with expert-guided experiences."
        ctaText="Discover Our Tours"
        ctaLink="#upcoming-tours"
        useVideo={true}
      />

      <PopupForm />
      <WhatsAppButton />

      {/* Upcoming Group Tours – now dynamic from central data */}
      <section id="upcoming-tours" className="py-12 md:py-16 mb-8 md:mb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Upcoming Group Tours from Bangalore</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the best travel agency in Bangalore for budget-friendly international group tours from Karnataka with Indian meals and seamless travel arrangements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto justify-items-center">
            {homepageTours.map((tour) => {
              if (!tour.slug) return null;

              return (
                <Link href={`/tours/${tour.slug}`} key={tour.slug} className="group w-full max-w-md">
                  <Card className="overflow-hidden hover-lift h-full">
                    <div className="relative h-48">
                      <Image
                        src={tour.image || "/placeholder.svg"}
                        alt={`${tour.destination || tour.region} group tour from Bangalore Karnataka - ${tour.title} with Flying Passport`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        quality={85}
                      />
                      <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {tour.departureDate}
                      </div>
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
                        <span>{tour.groupSize} People</span>
                      </div>
                      <p className="text-sm mb-4 line-clamp-2">{tour.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tour.highlights?.slice(0, 3).map((highlight, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                        {tour.highlights?.length > 3 && (
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            +{tour.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-lg">
                            From ₹{tour.price?.toLocaleString("en-IN") ?? "—"}
                          </span>
                          <span className="text-xs text-muted-foreground"> / person</span>
                        </div>

                        {/* Replaced interactive Button with non-interactive div */}
                        <div
                          className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                            tour.status === "closed"
                              ? "bg-gray-400"
                              : "bg-secondary group-hover:bg-accent group-hover:text-primary transition-colors"
                          }`}
                        >
                          {tour.status === "closed" ? "Fully Booked" : "View Details"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-secondary hover:bg-accent hover:text-primary transition-colors">
              <Link href="/tours">See All Group Tours from Karnataka</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Youtube Vlogs */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Our Group Tour Adventures</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience our international tours from Bangalore through our travelers' videos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.slice(0, visibleVideos).map((video) => (
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

      {/* Gallery */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Travelers Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Memories from our international group tours with Flying Passport from Bangalore, Karnataka.
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
              Hear from Karnataka travelers who explored the world with Flying Passport
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
                Our <strong>expert-guided group tours</strong> deliver immersive experiences beyond typical tourist spots.
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