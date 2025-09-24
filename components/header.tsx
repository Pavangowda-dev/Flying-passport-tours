"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

// Update the navLinks array to the correct order
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Group Tours", href: "/tours" },
  { name: "Family Package", href: "/family-package" },
  { name: "Travelers Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isHomePage ? (isScrolled ? "bg-primary shadow-md py-2" : "bg-transparent py-3") : "bg-primary shadow-md py-2",
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between max-w-7xl">
        <Link href="/" className="relative z-10 flex-shrink-0">
          <div className="flex items-center">
            <Image
              src="/images/logo-updated.png"
              alt="Flying Passport Logo"
              width={isHomePage ? (isScrolled ? 60 : 70) : 60}
              height={isHomePage ? (isScrolled ? 60 : 70) : 60}
              className="transition-all duration-300"
              priority
              quality={95}
            />
            <span
              className={cn(
                "ml-3 sm:ml-4 text-white font-serif font-bold transition-all duration-300",
                "text-base sm:text-lg lg:text-xl xl:text-2xl",
              )}
            >
              Flying Passport Tours
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-white hover:text-secondary transition-colors duration-200 text-sm lg:text-base font-medium whitespace-nowrap group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white z-10 p-2 flex-shrink-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 z-50 lg:hidden transition-all duration-300",
            isOpen ? "bg-black/50" : "bg-transparent pointer-events-none",
          )}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={cn(
              "absolute top-0 right-0 w-64 max-w-[80vw] bg-background flex flex-col h-full overflow-y-auto shadow-lg transition-transform duration-300",
              isOpen ? "translate-x-0" : "translate-x-full",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 mb-4">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <div className="flex items-center">
                  <Image
                    src="/images/logo-updated.png"
                    alt="Flying Passport Logo"
                    width={60}
                    height={60}
                    quality={95}
                  />
                  <span className="ml-4 text-primary font-serif font-bold text-xl">Flying Passport</span>
                </div>
              </Link>
              <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2">
                <X size={24} className="text-primary" />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 px-4 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-primary hover:text-secondary transition-colors duration-200 text-lg font-medium py-2 border-b border-muted last:border-b-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}