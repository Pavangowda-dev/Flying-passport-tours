"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  showScrollIndicator?: boolean
  className?: string
  useVideo?: boolean
  useFlaviotteFont?: boolean
}

export default function HeroSection({
  title,
  subtitle,
  ctaText = "Discover Our Tours",
  ctaLink = "/tours",
  showScrollIndicator = true,
  className,
  useVideo = false,
  useFlaviotteFont = false,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  const handleCTAClick = (e: React.MouseEvent) => {
    if (ctaLink?.startsWith("#")) {
      e.preventDefault()
      const targetId = ctaLink.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center text-white",
        !useVideo && "parallax bg-hero-pattern",
        className,
      )}
    >
      {useVideo && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "blur(3px)" }}
          >
            <source src="/flying passport website final.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary/40"></div>
        </div>
      )}

      <div className="container mx-auto px-4 text-center z-10">
        <h1
          className={cn(
            "font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 opacity-0 transition-opacity duration-1000",
            isVisible && "opacity-100",
            "font-serif",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-6 md:mb-8 opacity-0 transition-opacity duration-1000 delay-300 px-4",
            isVisible && "opacity-100",
          )}
        >
          {subtitle}
        </p>
        {ctaText && (
          <Button
            asChild={!ctaLink?.startsWith("#")}
            size="lg"
            className={cn(
              "bg-secondary hover:bg-accent hover:text-primary hover:scale-105 transition-all duration-300 text-white font-medium px-6 md:px-8 py-4 md:py-6 text-base md:text-lg opacity-0 transition-opacity duration-1000 delay-500",
              isVisible && "opacity-100",
            )}
            onClick={ctaLink?.startsWith("#") ? handleCTAClick : undefined}
          >
            {ctaLink?.startsWith("#") ? <span>{ctaText}</span> : <Link href={ctaLink}>{ctaText}</Link>}
          </Button>
        )}
      </div>

      {showScrollIndicator && (
        <button
          onClick={scrollToNextSection}
          className={cn(
            "absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce opacity-0 transition-opacity duration-1000 delay-700",
            isVisible && "opacity-100",
          )}
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      )}
    </section>
  )
}