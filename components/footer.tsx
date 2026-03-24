'use client';

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import { getAssetUrl } from "@/lib/image-url"

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo and About */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src={getAssetUrl("logo/flying-passport-logo.png")}
                alt="Flying Passport Logo"
                width={60}
                height={60}
                loading="lazy"
                quality={95}
              />
              <span className="ml-3 font-serif font-bold text-lg sm:text-xl">Flying Passport Tours</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Join our unforgettable group tours from India to Japan, Europe, Turkey, Kenya, and beyond.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.youtube.com/@FlyingPassport" target="_blank" aria-label="YouTube">
                <Youtube size={28} className="text-secondary hover:text-accent transition-colors" />
              </Link>
              <Link
                href="https://www.instagram.com/flyingpassport_tours?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                aria-label="Instagram"
              >
                <Instagram size={28} className="text-secondary hover:text-accent transition-colors" />
              </Link>
              <Link href="https://www.facebook.com/share/1SUwhT3Ff2/" target="_blank" aria-label="Facebook">
                <Facebook size={28} className="text-secondary hover:text-accent transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-sm hover:text-secondary transition-colors">
                  Group Tours
                </Link>
              </li>
              <li>
                <Link href="/family-package" className="text-sm hover:text-secondary transition-colors">
                  Family Package
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm hover:text-secondary transition-colors">
                  Travelers Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm hover:text-secondary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-0.5 text-secondary flex-shrink-0" />
                <span className="text-sm break-all">contact@flyingpassporttours.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-0.5 text-secondary flex-shrink-0" />
                <span className="text-sm">+91 77955 38639</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 text-secondary flex-shrink-0" />
                <address className="text-sm not-italic leading-relaxed">
                  Flying Passport, No 89, RK Arcade, Muddinapalya Rd, Yashaswini Layout, Lakshmayya Layout, Vishveshvaraiah Nagar, Ganganagar, Bengaluru, Karnataka 560091
                </address>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/charges-cancellation" className="text-sm hover:text-secondary transition-colors">
                  Charges & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-sm hover:text-secondary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <span>© {new Date().getFullYear()} Flying Passport Tours. All Rights Reserved.</span>
            <span>
              Build by{' '}
              <Link 
                href="https://wa.me/917795331021" 
                target="_blank" 
                aria-label="Contact Pavan via WhatsApp"
                className="inline-flex items-center hover:text-secondary transition-colors"
              >
                Pavan
                <ArrowUpRight size={14} className="ml-1" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}