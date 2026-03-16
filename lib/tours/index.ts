import type { Tour } from "./types";

// ===== IMPORT ALL ACTIVE TOURS =====
import { kenya2026 } from "./kenya-2026";
import { vietnam2026 } from "./vietnam-2026";
import { scandinavia2026 } from "./scandinavia-2026";

// ===== MASTER TOUR LIST =====
const allTours: Tour[] = [
  kenya2026,
  vietnam2026,
  scandinavia2026,
].filter((tour) => Boolean(tour.slug));

// ===== SORT ACTIVE TOURS =====
const activeTours: Tour[] = allTours
  .filter((tour) => tour.status !== "expired")
  .sort((a, b) => {
    const aDate = a.departureDateISO
      ? new Date(a.departureDateISO).getTime()
      : Infinity;

    const bDate = b.departureDateISO
      ? new Date(b.departureDateISO).getTime()
      : Infinity;

    return aDate - bDate;
  });

// ===== SORT EXPIRED TOURS =====
const expiredTours: Tour[] = allTours.filter(
  (tour) => tour.status === "expired"
);

// ===== FINAL EXPORT =====
export const tours: Tour[] = [...activeTours, ...expiredTours];

// ===== HELPERS =====
export const upcomingTours: Tour[] = tours.filter(
  (tour) => tour.status === "upcoming" || tour.status === "live"
);

export const expiredToursList: Tour[] = tours.filter(
  (tour) => tour.status === "expired"
);

// ===== SAFE HELPER =====
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}