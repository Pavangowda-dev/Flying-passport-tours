export const dynamic = "force-static";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTourBySlug, tours } from "@/lib/tours";
import TourDetailClient from "@/components/TourDetailClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// ===== PREBUILD TOUR ROUTES =====
export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

// ===== SEO METADATA =====
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found | Flying Passport",
      description: "Requested tour could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: tour.seoTitle,
    description: tour.seoDescription,
    keywords: tour.keywords,

    alternates: {
      canonical: `https://flyingpassports.com/tours/${tour.slug}`,
    },

    openGraph: {
      title: tour.seoTitle,
      description: tour.seoDescription,
      url: `https://flyingpassports.com/tours/${tour.slug}`,
      siteName: "Flying Passport",
      images: [
        {
          url: tour.image,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: tour.seoTitle,
      description: tour.seoDescription,
      images: [tour.image],
    },
  };
}

// ===== TOUR DETAIL PAGE =====
export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return <TourDetailClient tour={tour} />;
}