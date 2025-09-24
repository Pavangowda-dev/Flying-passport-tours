"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DestinationCardProps {
  image: string
  name: string
  tagline: string
  link: string
  className?: string
}

export default function DestinationCard({ image, name, tagline, link, className }: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg hover-lift group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-300">
        <h3 className="font-serif font-bold text-2xl mb-1">{name}</h3>
        <p className="text-sm text-white/90 mb-4">{tagline}</p>

        <Button
          asChild
          className={cn(
            "bg-secondary hover:bg-accent hover:text-primary transition-all duration-300 opacity-0 transform translate-y-4",
            isHovered && "opacity-100 transform-none",
          )}
        >
          <Link href={link}>Explore Now</Link>
        </Button>
      </div>
    </div>
  )
}
