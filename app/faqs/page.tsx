"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FAQAccordion from "@/components/faq-accordion"
import WhatsAppButton from "@/components/whatsapp-button"

// Sample data
const faqs = [
  {
    question: "What's included in the tour price?",
    answer:
      "Our tour packages are designed to be all-inclusive. They typically cover economy class flights, 4-star hotel accommodations, daily meals, local transportation, sightseeing entry tickets, visas, and the services of a professional tour guide. Standard exclusions include personal expenses, travel insurance (unless mentioned), and guide tips (USD $5 per day). For exact inclusions, please refer to the tour itinerary.",
  },
  {
    question: "How many people are in a typical group tour?",
    answer:
      "Our group tours generally consist of 30 to 40 travelers, ensuring a friendly and social atmosphere. While there's no minimum requirement, the maximum group size is currently 40. For some tours, this number may vary—please check the specific itinerary for details.",
  },
  {
    question: "Do I need a visa for the destinations?",
    answer:
      "Yes, visas are required for most international destinations, and Flying Passport provides complete visa assistance for all our tours. The visa fee is included in the total tour price, so you won’t have to worry about additional costs.",
  },
  {
    question: "How far in advance should I book a tour?",
    answer:
      "While there’s no official deadline, we recommend booking at least 20 days before departure, as seats are limited and may fill up fast. Booking early also ensures a smoother visa and documentation process.",
  },
  {
  question: "What is your cancellation policy?",
  answer:
    "Our cancellation policy is as follows:\n\n90+ days before departure: 25% of the total trip cost\n60–89 days before departure: 50% of the total trip cost (excluding the non-refundable ₹25,000)\n45–59 days before departure: 75% of the total trip cost (excluding the non-refundable ₹25,000)\nLess than 45 days before departure: 100% of the total trip cost (no refund).\n\nWe recommend reviewing the full terms before booking and considering travel insurance for added protection.",
},
  {
    question: "Do you cater to dietary restrictions?",
    answer:
      "Yes, we do our best to accommodate dietary needs. Indian meals will be arranged where available, and we consider specific food preferences based on the destination. If you have any dietary restrictions, please inform us during booking so we can make necessary arrangements.",
  },
  {
    question: "What is the typical age range of your travelers?",
    answer:
      "Our tours are open to all age groups. We welcome young adults, children, families, and senior citizens. The experience is curated to be enjoyable for everyone, regardless of age.",
  },
  {
    question: "Is it safe to travel as a solo female traveler?",
    answer:
      "Absolutely. Flying Passport ensures a safe and supportive environment for solo travelers. Room sharing or private room options are available based on your selected package. A dedicated tour guide will accompany the group throughout the journey, and we follow all safety protocols to make your trip comfortable and secure.",
  },
  {
    question: "What type of accommodation do you use?",
    answer:
      "We primarily provide 4-star hotel accommodations in all destinations. Travelers can choose between shared or private rooms based on their preferences. For room upgrades or special requests, feel free to contact our Flying Passport team.",
  },
  {
    question: "How physically demanding are your tours?",
    answer:
      "Our group tours are designed to be comfortable and relaxed, with minimal physical effort required. While walking may be involved at some sightseeing spots, we offer alternative services for travelers with mobility concerns. No specific fitness level is required to join our tours.",
  },
]

export default function FAQsPage() {
  // Ensure page loads from the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-28 md:pt-32 pb-8 md:pb-16">
      <WhatsAppButton alwaysVisible={true} />

      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Find answers to common questions about our tours and services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion faqs={faqs} />

          <div className="mt-12 text-center">
            <p className="text-lg mb-4">Still have questions?</p>
            <Button asChild className="bg-secondary hover:bg-accent hover:text-primary transition-colors">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
