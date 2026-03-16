"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryItemProps {
  src: string
  alt: string
  className?: string
}

export default function GalleryItem({ src, alt, className }: GalleryItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={cn("overflow-hidden rounded-lg cursor-pointer group", className)}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-secondary transition-colors z-10"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>

          <div
            className="relative w-full max-w-5xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
              quality={95}
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}