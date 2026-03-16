export type TourStatus = "upcoming" | "expired" | "live" | "closed";

export type TourAvailability = "available" | "limited";

export type TourRegion =
  | "asia"
  | "africa"
  | "europe"
  | "north-america"
  | "south-america"
  | "australia"
  | "antarctica";

export type TourItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export type Tour = {
  id: string;

  // REQUIRED → used for routing
  slug: string;

  title: string;

  destination: string;

  region: TourRegion;

  // Main cover image
  image: string;

  // Extra gallery images
  gallery?: string[];

  duration: number;

  groupSize: string;

  // Allow zero-price tours safely
  price: number;

  status: TourStatus;

  availability?: TourAvailability;

  departureDate: string;

  departureDateISO: string;

  description: string;

  highlights: string[];

  itinerary: TourItineraryDay[];

  inclusions: string[];

  exclusions: string[];

  singleOccupancy?: number;

  childPrice?: number;

  seoTitle: string;

  seoDescription: string;

  keywords?: string[];
};