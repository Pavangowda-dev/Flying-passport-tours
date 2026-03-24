"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

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
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isHomePage
          ? isScrolled
            ? "bg-primary shadow-md py-3"
            : "bg-transparent py-5"
          : "bg-primary shadow-md py-3"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">

        {/* ✅ LOGO FIXED */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://pub-74c3db65b54e468b90a9796527e32c3d.r2.dev/logo/flying-passport%20tours-logo.png"
            alt="Flying Passport Logo"
            width={160}
            height={60}
            className={cn(
              "object-contain transition-all duration-300",
              isHomePage
                ? isScrolled
                  ? "h-12"   // small when scrolled
                  : "h-16"   // slightly bigger on hero
                : "h-12"
            )}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-white hover:text-secondary transition-colors duration-200 text-base font-medium group"
            >
              {link.name}
              <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 z-50 lg:hidden transition-all duration-300",
            isOpen ? "bg-black/50" : "bg-transparent pointer-events-none"
          )}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={cn(
              "absolute top-0 right-0 w-72 max-w-[85vw] bg-background flex flex-col h-full shadow-lg transition-transform duration-300",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 mb-4">
              <Image
                src="https://pub-74c3db65b54e468b90a9796527e32c3d.r2.dev/logo/flying-passport%20tours-logo.png"
                alt="Logo"
                width={120}
                height={50}
                className="object-contain"
              />
              <button onClick={() => setIsOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 px-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-primary text-lg font-medium border-b pb-2"
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