'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, Users, MapPin, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BookingForm from "@/components/booking-form";
import WhatsAppButton from "@/components/whatsapp-button";
import EarlyAccessPopup from "@/components/early-access-popup";

interface Tour {
  id: string;
  title: string;
  destination: string;
  image: string;
  gallery: string[];
  duration: number;
  groupSize: string;
  price: number;
  status: string;
  departureDate: string;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  singleOccupancy: number;
  childPrice: number;
}

export default function TourDetailClient({ tour }: { tour: Tour }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isExpired = tour.status === "expired";
  const allImages = isExpired ? [tour.image] : [tour.image, ...tour.gallery];

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const packageInclusions = [
    { icon: "/images/icons/sightseeing.png", text: "Sightseeing" },
    { icon: "/images/icons/flights-visa.png", text: "Flights & Visa" },
    { icon: "/images/icons/meals.png", text: "3 Times Meal" },
    { icon: "/images/icons/5-star.png", text: "5 Star Accommodation" },
    { icon: "/images/icons/.png", text: "Travel Insurance" },
    { icon: "/images/icons/Transportation.png", text: "Transportation" },
  ];

  return (
    <div className="pt-16 sm:pt-16 md:pt-20">
      <WhatsAppButton alwaysVisible={true} />
      <EarlyAccessPopup tourTitle={tour.title} isExpired={isExpired} />

      {/* ====== IMAGE + BOOKING SECTION ====== */}
      <section className="pt-4 pb-8 md:pt-6 md:pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* ==== LEFT: IMAGE GALLERY ==== */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[822/411] rounded-lg overflow-hidden mb-4">
                <Image
                  src={allImages[activeImageIndex] || "/placeholder.svg"}
                  alt={`${tour.title} group tour with Flying Passport`}
                  fill
                  className="object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 822px"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+/ahAQAIrwH4bI6eZQAAAABJRU5ErkJggg=="
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {activeImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>

              {/* ==== DESKTOP All Inclusive Package ==== */}
              {!isMobile && allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 ${
                        activeImageIndex === index ? "ring-2 ring-secondary" : ""
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${tour.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        quality={60}
                        sizes="80px"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+/ahAQAIrwH4bI6eZQAAAABJRU5ErkJggg=="
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* ==== DESKTOP - All Inclusive Package ==== */}
              {!isMobile && (
                <div className="mt-4">
                  <h3 className="font-serif font-bold text-xl mb-2">All Inclusive Package</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {packageInclusions.map(({ icon, text }, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <Image src={icon} alt={text} width={32} height={32} className="mb-1" />
                        <span className="text-xs font-medium">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ==== RIGHT: BOOKING FORM ==== */}
            <div className="lg:sticky lg:top-20">
              <Card>
                <CardContent className="p-6">
                  <h1 className="font-serif font-bold text-3xl mb-2">{tour.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{tour.destination.charAt(0).toUpperCase() + tour.destination.slice(1)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{tour.duration} Days</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <span>{tour.groupSize} People</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-serif font-bold text-xl mb-1">Pricing Starts From</h3>
                    <div className="text-3xl font-bold text-secondary">
                      ₹{tour.price.toLocaleString("en-IN")} / per person
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Talk to our travel expert for full pricing</p>
                  </div>
                  <BookingForm tourId={tour.id} tourTitle={tour.title} departureDate={tour.departureDate} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* ==== MOBILE - All Inclusive Package BELOW BOOKING FORM ==== */}
        {isMobile && (
          <div className="container mx-auto px-4 max-w-7xl mt-6">
            <h3 className="font-serif font-bold text-xl mb-2">All Inclusive Package</h3>
            <div className="grid grid-cols-3 gap-4">
              {packageInclusions.map(({ icon, text }, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <Image src={icon} alt={text} width={32} height={32} className="mb-1" />
                  <span className="text-xs font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ====== TABS SECTION ====== */}
      <section className="py-8 md:py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-7xl">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start mb-8 overflow-auto">
              <TabsTrigger value="overview" className="min-w-max">Overview</TabsTrigger>
              <TabsTrigger value="itinerary" className="min-w-max">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions" className="min-w-max">Inclusions & Exclusions</TabsTrigger>
            </TabsList>

            {/* ==== OVERVIEW TAB ==== */}
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <h2 className="font-serif font-bold text-2xl mb-4">Tour Overview</h2>
                  <p className="mb-6">{tour.description}</p>
                  <h3 className="font-serif font-bold text-xl mb-4">Tour Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={18} className="text-secondary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-serif font-bold text-xl mb-4">Tour Details</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium text-muted-foreground">Departure Date:</span>
                          <span className="font-bold">{tour.departureDate}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium text-muted-foreground">Duration:</span>
                          <span className="font-bold">{tour.duration} Days</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium text-muted-foreground">Group Size:</span>
                          <span className="font-bold">{tour.groupSize} People</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium text-muted-foreground">Destination:</span>
                          <span className="font-bold">
                            {tour.destination.charAt(0).toUpperCase() + tour.destination.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-muted-foreground">Status:</span>
                          <span
                            className={`font-bold ${
                              tour.status === "upcoming" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* ==== ITINERARY TAB ==== */}
            <TabsContent value="itinerary" className="mt-0">
              <h2 className="font-serif font-bold text-2xl mb-6">Tour Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((day) => (
                  <Accordion key={day.day} type="single" collapsible>
                    <AccordionItem value={`day-${day.day}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <div className="bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4">
                            {day.day}
                          </div>
                          <h3 className="font-serif font-bold text-lg">{day.title}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-14">
                        <p className="whitespace-pre-line">{day.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </TabsContent>

            {/* ==== INCLUSIONS TAB ==== */}
            <TabsContent value="inclusions" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-serif font-bold text-2xl mb-4">What's Included</h2>
                  <ul className="space-y-2">
                    {tour.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={18} className="text-secondary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-serif font-bold text-2xl mb-4">What's Not Included</h2>
                  <ul className="space-y-2">
                    {tour.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <X size={18} className="text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
