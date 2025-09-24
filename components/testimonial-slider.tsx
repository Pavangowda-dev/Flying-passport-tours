"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  avatar: string
  quote: string
  rating: number
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  autoRotate?: boolean
  rotationInterval?: number
}

export default function TestimonialSlider({
  testimonials,
  autoRotate = true,
  rotationInterval = 5000,
}: TestimonialSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (autoRotate && !isPaused) {
      const interval = setInterval(nextTestimonial, rotationInterval)
      return () => clearInterval(interval)
    }
  }, [autoRotate, isPaused, rotationInterval])

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4 md:px-12">
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-8">
                {/* Better character avatar that fills the grid completely */}
                <div className="w-20 h-20 mb-4 rounded-full bg-white/10 flex items-center justify-center text-5xl border-2 border-white/20">
                  {testimonial.avatar}
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={cn("text-secondary", i >= testimonial.rating && "text-secondary/30")}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl font-serif italic mb-4">"{testimonial.quote}"</blockquote>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevTestimonial}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden md:block"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden md:block"
        aria-label="Next testimonial"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center mt-4 space-x-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "max-sm:w-0.75 max-sm:h-0.75 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full transition-colors testimonial-dot",
              index === activeIndex ? "bg-secondary" : "bg-white/30",
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}