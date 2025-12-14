"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  thumbnail: string
  title: string
  videoId: string
  className?: string
}

export default function VideoCard({ thumbnail, title, videoId, className }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={cn("relative overflow-hidden rounded-lg cursor-pointer group", className)}
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-video relative">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-3 bg-secondary rounded-full transform transition-transform duration-300 group-hover:scale-110">
              <Play size={24} className="text-white" fill="white" />
            </div>
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-base line-clamp-2">{title}</h3>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}
