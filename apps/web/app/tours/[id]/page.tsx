import { notFound } from "next/navigation"
   import { tours } from "@/lib/tours"
   import TourDetailClient from "@/components/TourDetailClient"

   export const revalidate = 60 // ISR: Revalidate every 60 seconds

   export async function generateStaticParams() {
     return tours.map((tour) => ({
       id: tour.id,
     }))
   }

   export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params
     const tour = tours.find((t) => t.id === id)

     if (!tour) {
       notFound()
     }

     return <TourDetailClient tour={tour} />
   }