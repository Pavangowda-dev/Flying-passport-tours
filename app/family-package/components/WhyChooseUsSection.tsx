"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, Calendar, Shield } from "lucide-react";

const whyChooseUs = [
  { icon: Users, title: "Family-First Approach", description: "Every itinerary is designed with families in mind" },
  { icon: DollarSign, title: "Flexible Budget Options", description: "Packages tailored to your budget needs" },
  { icon: Calendar, title: "Customizable Itinerary", description: "Adjust schedules to your family's pace" },
  { icon: Shield, title: "Safe & Comfortable", description: "Child-friendly accommodations and transport" },
];

export default function WhyChooseUsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      animationId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="py-16 md:py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
            Why Families Love Traveling With Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We specialize in creating unforgettable international family experiences
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {whyChooseUs.map((item, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-orange-100">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <item.icon size={32} className="text-orange-600" />
                </div>
                <h3 className="font-bold text-lg md:text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Scroll */}
        <div
          ref={scrollContainerRef}
          className="md:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {[...whyChooseUs, ...whyChooseUs].map((item, index) => (
            <Card key={index} className="flex-shrink-0 w-[280px] text-center p-6 border-orange-100 snap-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <item.icon size={32} className="text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}