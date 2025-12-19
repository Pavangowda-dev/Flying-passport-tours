export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { tours } from "@/lib/tours";
import TourDetailClient from "@/components/TourDetailClient";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function TourDetailPage({ params }: PageProps) {
  const { id } = params;

  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    notFound();
  }

  return <TourDetailClient tour={tour} />;
}
