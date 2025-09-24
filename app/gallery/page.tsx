'use client';

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import GalleryItem from "@/components/gallery-item"
import WhatsAppButton from "@/components/whatsapp-button"
import Link from "next/link"

// Updated gallery images with 20 total images (10 existing + 10 new)
const galleryImages = [
  // Original 10 images
  {
    id: 1,
    src: "/images/gallery/new-gallery-1.jpg",
    alt: "Group travel experience",
  },
  {
    id: 2,
    src: "/images/gallery/new-gallery-2.jpg",
    alt: "Travel memories",
  },
  {
    id: 3,
    src: "/images/gallery/new-gallery-3.jpg",
    alt: "Adventure moments",
  },
  {
    id: 4,
    src: "/images/gallery/new-gallery-4.jpg",
    alt: "Cultural exploration",
  },
  {
    id: 5,
    src: "/images/gallery/new-gallery-5.jpg",
    alt: "Travel experiences",
  },
  {
    id: 6,
    src: "/images/gallery/new-gallery-6.jpg",
    alt: "Group adventures",
  },
  {
    id: 7,
    src: "/images/gallery/new-gallery-7.jpg",
    alt: "Travel highlights",
  },
  {
    id: 8,
    src: "/images/gallery/new-gallery-8.jpg",
    alt: "Destination visits",
  },
  {
    id: 9,
    src: "/images/gallery/new-gallery-9.jpg",
    alt: "Travel moments",
  },
  {
    id: 10,
    src: "/images/gallery/new-gallery-10.jpg",
    alt: "Group travel",
  },
  // Additional 10 images
  {
    id: 11,
    src: "/images/gallery/additional-1.jpg",
    alt: "Historic monuments",
  },
  {
    id: 12,
    src: "/images/gallery/additional-2.jpg",
    alt: "Scenic destinations",
  },
  {
    id: 13,
    src: "/images/gallery/additional-3.jpg",
    alt: "Safari adventures",
  },
  {
    id: 14,
    src: "/images/gallery/additional-4.jpg",
    alt: "Ancient ruins",
  },
  {
    id: 15,
    src: "/images/gallery/additional-5.jpg",
    alt: "Desert landscapes",
  },
  {
    id: 16,
    src: "/images/gallery/additional-6.jpg",
    alt: "Cultural experiences",
  },
  {
    id: 17,
    src: "/images/gallery/additional-7.jpg",
    alt: "Archaeological sites",
  },
  {
    id: 18,
    src: "/images/gallery/additional-8.jpg",
    alt: "Group celebrations",
  },
  {
    id: 19,
    src: "/images/gallery/additional-9.jpg",
    alt: "Mountain adventures",
  },
  {
    id: 20,
    src: "/images/gallery/additional-10.jpg",
    alt: "Coastal experiences",
  },
]

export default function GalleryPage() {
  // Ensure page loads from the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-28 md:pt-32">
      <WhatsAppButton alwaysVisible={true} />

      <div className="container mx-auto px-4 pb-8 md:pb-16">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-4">Travelers Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Memories captured by our travelers during their adventures around the world
          </p>
        </div>

        {/* Gallery Grid - 20 images optimized for square display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-12 md:mb-16">
          {galleryImages.map((image) => (
            <div key={image.id} className="aspect-square">
              <GalleryItem src={image.src} alt={image.alt} className="h-full" />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mb-12 md:mb-16">
          <Button asChild size="lg" className="bg-secondary hover:bg-accent hover:text-primary transition-colors px-6">
            <Link href="https://www.instagram.com/flyingpassport_tours?igsh=Nmk0Ym1yeWR3N3E=" target="_blank" rel="noopener noreferrer">
              View More
            </Link>
          </Button>
        </div>

        {/* Call to Action - Fixed button links */}
        <div className="text-center">
          <h3 className="font-serif font-bold text-xl md:text-2xl mb-4">Ready to Create Your Own Memories?</h3>
          <p className="text-muted-foreground mb-6">Join our next group tour and be part of these amazing adventures</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-secondary hover:bg-accent hover:text-primary transition-colors">
              <Link href="/tours">View Our Tours</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}