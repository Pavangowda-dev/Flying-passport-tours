"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { WhatsappLogo } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface WhatsAppButtonProps {
  alwaysVisible?: boolean
}

export default function WhatsAppButton({ alwaysVisible = false }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(alwaysVisible)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (alwaysVisible || !isHomePage) {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      // Show button after scrolling past the hero section (approximately viewport height)
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [alwaysVisible, isHomePage])

  // Fixed WhatsApp link with proper encoding
  const whatsappUrl = `https://wa.me/917795538639?text=${encodeURIComponent("Hi Flying Passport team! I'm interested in your group tours.")}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
      )}
      aria-label="Contact us on WhatsApp"
    >
      <WhatsappLogo size={32} weight="fill" />
    </a>
  )
}
