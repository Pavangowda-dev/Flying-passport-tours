"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, Award, Heart, Globe, Shield, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"

export default function AboutPage() {
  // Ensure page loads from the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-16 md:pt-16">
      <WhatsAppButton alwaysVisible={true} />

      {/* Our Story - Updated stats with single row on mobile */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif font-bold text-3xl md:text-4xl mb-4">Our Passion for Travel</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the team behind Flying Passport and discover our story
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Our Story</h2>
              <p className="mb-4">
              I am Asha, a passionate traveler from Karnataka, India. From university days to 
              quitting my IT job, my love for travel led me to Germany to pursue my Master's while exploring the 
              world on a tight budget.
              </p>
              <p className="mb-4">
                Despite working multiple part-time jobs, we prioritized travel over luxury, managing to explore 50+
                destinations as students. Those journeys shaped us and inspired us to share our experiences with a
                growing travel community online.
              </p>
              <p className="mb-6">
                Now, we're building Flying Passport Tours — a travel company curating unique itineraries and organizing
                fun, meaningful group tours for like-minded adventurers across the globe.
              </p>

              {/* Mobile: Single row, Desktop: 4 columns */}
              <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-4 text-center">
                <div>
                  <p className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-secondary">10+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Years of Experience</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-secondary">99+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Countries Explored</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-secondary">1000+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Happy Travelers</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-secondary">30+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Group Tours</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/about/asha-kiran-story.jpg"
                  alt="Asha and Kiran - Flying Passport founders"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us? - Replaced Our Team section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what sets Flying Passport apart from other travel companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Expert Travel Planning */}
            <div className="bg-white rounded-lg p-6 hover-lift text-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Users size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Expert Travel Planning</h3>
              <p className="text-muted-foreground">
                With 10+ years of personal travel experience across 99+ countries, we craft itineraries that blend
                must-see attractions with hidden gems only locals know about.
              </p>
            </div>

            {/* Small Group Experience */}
            <div className="bg-white rounded-lg p-6 hover-lift text-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Heart size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Small Group Experience</h3>
              <p className="text-muted-foreground">
                Our groups are limited to 40 travelers, ensuring personalized attention, meaningful connections, and the
                flexibility to explore destinations at a comfortable pace.
              </p>
            </div>

            {/* Authentic Cultural Immersion */}
            <div className="bg-white rounded-lg p-6 hover-lift text-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Globe size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Authentic Cultural Immersion</h3>
              <p className="text-muted-foreground">
                We go beyond tourist traps to offer genuine cultural experiences, local interactions, and authentic
                cuisine that create lasting memories and deeper understanding.
              </p>
            </div>

            {/* Transparent Pricing */}
            <div className="bg-white rounded-lg p-6 hover-lift text-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4 w-16 h-16 mx-auto flex items-center justify-center">
                <CheckCircle size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                No hidden costs or surprise fees. Our all-inclusive pricing covers accommodations, transportation,
                guided tours, and most meals, so you know exactly what you're paying for.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="bg-white rounded-lg p-6 hover-lift text-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                From the moment you book until you return home, our dedicated team is available around the clock to
                assist with any questions, concerns, or emergencies that may arise.
              </p>
            </div>

            {/* Safety & Security */}
            <div className="bg-white rounded-lg p-6 hover-lift text-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Shield size={32} className="text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Safety & Security</h3>
              <p className="text-muted-foreground">
                Your safety is our priority. We work with trusted local partners, provide comprehensive travel insurance
                guidance, and maintain strict safety protocols throughout all our tours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission - Updated with new team image */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/about/our-mission-new.jpg"
                  alt="Flying Passport team in office"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={75}
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Our Mission</h2>
              <p className="mb-6">
                At Flying Passport, our mission is to create meaningful travel experiences that connect people from
                India to the world. Through well-planned international group tours, we aim to foster real cultural
                connections, support local communities, and create unforgettable memories for every traveler.
              </p>

              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <Users size={24} className="text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl mb-2">Meaningful Connections</h3>
                    <p className="text-muted-foreground">
                      We believe travel is about the people you meet and the memories you make together. Our group tours
                      are designed to help like-minded travelers bond and enjoy the journey as a shared experience.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <Globe size={24} className="text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl mb-2">Responsible Travel</h3>
                    <p className="text-muted-foreground">
                      We are committed to responsible tourism practices that respect local cultures, empower local
                      economies, and reduce environmental impact — ensuring every journey leaves a positive footprint.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <Heart size={24} className="text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl mb-2">Authentic Experiences</h3>
                    <p className="text-muted-foreground">
                      We go beyond the usual tourist spots to deliver immersive and authentic experiences that reflect
                      the heart of each destination.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild className="mt-8 bg-secondary hover:bg-accent hover:text-primary transition-colors">
                <Link href="/tours">Join Our Next Adventure</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">What Our Travelers Say</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-12">
            Don't just take our word for it - hear from travelers who have experienced our tours
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="mb-4">
                <Award size={32} className="text-secondary mx-auto" />
              </div>
              <blockquote className="text-lg font-serif italic mb-4">
                "Our Europe trip with Flying Passport was amazing! Everything from food and accommodation to sightseeing was well arranged, 
                allowing us to enjoy every moment without worries. A big thanks to the dedicated team, 
                especially Asha ma’am and Kiran sir, for making our journey truly memorable."
              </blockquote>
              <p className="font-bold">Sumana S</p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="mb-4">
                <Award size={32} className="text-secondary mx-auto" />
              </div>
              <blockquote className="text-lg font-serif italic mb-4">
                "My second tour with Flying Passport (after Japan) was China, and it was unforgettable! 
                From unique experiences to seamless arrangements, Asha ma’am and Kiran sir made it feel like 
                traveling with close friends. Truly a core memory!"
              </blockquote>
              <p className="font-bold">Sushnitha R</p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="mb-4">
                <Award size={32} className="text-secondary mx-auto" />
              </div>
              <blockquote className="text-lg font-serif italic mb-4">
                "My Turkey trip with Flying Passport was unforgettable! Perfectly planned itinerary, 
                beautiful stays, and seamless travel made the experience stress-free and memorable. Highly recommend their team!"
              </blockquote>
              <p className="font-bold">Jayalakshmi S</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}