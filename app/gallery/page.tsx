'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import GalleryItem from "@/components/gallery-item";
import WhatsAppButton from "@/components/whatsapp-button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ---------------------------
// 🖼️ Gallery Images
// ---------------------------
const galleryImages = [
  { id: 1, src: "/images/gallery/new-gallery-1.jpg", alt: "Group travel experience" },
  { id: 2, src: "/images/gallery/new-gallery-2.jpg", alt: "Travel memories" },
  { id: 3, src: "/images/gallery/new-gallery-3.jpg", alt: "Adventure moments" },
  { id: 4, src: "/images/gallery/new-gallery-4.jpg", alt: "Cultural exploration" },
  { id: 5, src: "/images/gallery/new-gallery-5.jpg", alt: "Travel experiences" },
  { id: 6, src: "/images/gallery/new-gallery-6.jpg", alt: "Group adventures" },
  { id: 7, src: "/images/gallery/new-gallery-7.jpg", alt: "Travel highlights" },
  { id: 8, src: "/images/gallery/new-gallery-8.jpg", alt: "Destination visits" },
  { id: 9, src: "/images/gallery/new-gallery-9.jpg", alt: "Travel moments" },
  { id: 10, src: "/images/gallery/new-gallery-10.jpg", alt: "Group travel" },
  { id: 11, src: "/images/gallery/additional-1.jpg", alt: "Historic monuments" },
  { id: 12, src: "/images/gallery/additional-2.jpg", alt: "Scenic destinations" },
  { id: 13, src: "/images/gallery/additional-3.jpg", alt: "Safari adventures" },
  { id: 14, src: "/images/gallery/additional-4.jpg", alt: "Ancient ruins" },
  { id: 15, src: "/images/gallery/additional-5.jpg", alt: "Desert landscapes" },
  { id: 16, src: "/images/gallery/additional-6.jpg", alt: "Cultural experiences" },
  { id: 17, src: "/images/gallery/additional-7.jpg", alt: "Archaeological sites" },
  { id: 18, src: "/images/gallery/additional-8.jpg", alt: "Group celebrations" },
  { id: 19, src: "/images/gallery/additional-9.jpg", alt: "Mountain adventures" },
  { id: 20, src: "/images/gallery/additional-10.jpg", alt: "Coastal experiences" },
];

// ---------------------------
// 🎥 Local Reels Videos
// ---------------------------
const reelsVideos = [
  { id: 1, src: "/images/gallery-videos/gallery-video-1.mp4" },
  { id: 2, src: "/images/gallery-videos/gallery-video-2.mp4" },
  { id: 3, src: "/images/gallery-videos/gallery-video-3.mp4" },
  { id: 4, src: "/images/gallery-videos/gallery-video-4.mp4" },
  { id: 5, src: "/images/gallery-videos/gallery-video-5.mp4" },
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );

  return (
    <div className="pt-28 md:pt-32 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <WhatsAppButton alwaysVisible={true} />

      <div className="container mx-auto px-4 pb-20">
        {/* ---------------- HEADER ---------------- */}
        <div className="text-center mb-16">
          <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
            Travelers Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Glimpses of the unforgettable adventures our travelers have captured around the world.
          </p>
        </div>

        {/* ---------------- GALLERY GRID ---------------- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <GalleryItem
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* ---------------- VIDEOS / REELS ---------------- */}
        <div className="mb-12">
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-center mb-8 text-gray-900">
            Our Travel Moments in Motion 🎥
          </h2>
          <div className="flex gap-5 overflow-x-auto scrollbar-none px-2 pb-4 snap-x snap-mandatory">
            {reelsVideos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 aspect-[9/16] rounded-xl overflow-hidden shadow-lg snap-center"
              >
                <video
                  src={video.src}
                  controls
                  className="w-full h-full object-cover rounded-xl"
                ></video>
              </div>
            ))}
          </div>

          {/* -------- View More Button under Reels -------- */}
          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-accent hover:text-primary transition-colors px-6"
            >
              <Link
                href="https://www.instagram.com/flyingpassport_tours?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                View More on Instagram
              </Link>
            </Button>
          </div>
        </div>

        {/* ---------------- CTA SECTION ---------------- */}
        <div className="text-center">
          <h3 className="font-serif font-bold text-2xl md:text-3xl mb-4 text-gray-900">
            Ready to Create Your Own Memories?
          </h3>
          <p className="text-gray-600 mb-6">
            Join our next group tour and be part of these unforgettable journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-secondary hover:bg-accent hover:text-primary transition-colors text-lg px-6 py-2"
            >
              <Link href="/tours">View Our Tours</Link>
            </Button>
            <Button variant="outline" asChild className="text-lg px-6 py-2">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ---------------- LIGHTBOX ---------------- */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl md:text-4xl hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X />
          </button>
          <button
            className="absolute left-3 md:left-8 text-white text-3xl md:text-4xl hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft />
          </button>
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-h-[90%] max-w-[90%] object-contain rounded-xl shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-3 md:right-8 text-white text-3xl md:text-4xl hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
