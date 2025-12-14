import type { Metadata } from "next"
import type React from "react"

// Page-specific metadata for /tours
export const metadata: Metadata = {
  title: "Group Tours from Bangalore | Flying Passport Karnataka",
  description:
    "Explore affordable group tours from Bangalore with Flying Passport, the best travel agency in Karnataka. Join our Kenya safari, European highlights, and more under 1 lakh.",
  keywords:
    "group tours from Karnataka under 1 lakh, Kenya group tours from Bangalore, Europe group tours from Bangalore, best travel agency in Bangalore, affordable international group tours from Karnataka",
  openGraph: {
    title: "Group Tours from Bangalore | Flying Passport",
    description: "Join Flying Passport for budget-friendly group tours from Karnataka to Kenya, Europe, and beyond.",
    type: "website",
    url: "https://flyingpassports.com/tours",
    siteName: "Flying Passport",
    images: [
      {
        url: "https://flyingpassports.com/images/og-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Group tours from Bangalore with Flying Passport",
      },
    ],
  },
  alternates: {
    canonical: "https://flyingpassports.com/tours",
  },
}

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}