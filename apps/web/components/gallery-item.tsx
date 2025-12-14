"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryItemProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function GalleryItem({ src, alt, className, width = 400, height = 300 }: GalleryItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={cn("overflow-hidden rounded-lg cursor-pointer group", className)} onClick={() => setIsOpen(true)}>
        <div className="relative w-full h-full">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 33vw"
            loading="lazy"
            quality={75}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-secondary transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="relative max-w-4xl max-h-[80vh]">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={1200}
              height={900}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
