export type Currency = "CNY" | "EUR";

export interface Money {
  amount: number;
  currency: Currency;
}

export type BookingType = "hotel" | "restaurant" | "transportation";

export type CardCategory = BookingType | "experience";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Booking {
  type: BookingType;
  name: string;
  /** hotels/restaurants only */
  address?: string;
  coordinates?: Coordinates;
  /** city coordinates belongs to, for map filtering by city */
  city?: string;
  /** ISO date, hotels only */
  checkIn?: string;
  /** ISO date, hotels only */
  checkOut?: string;
  /** e.g. "19:30", restaurants only */
  time?: string;
  confirmationNumber?: string;
  notes?: string;
  cost?: Money;
  /** hotels spanning multiple nights: e.g. nightIndex 1, nightsTotal 2 → "1/2" */
  nightIndex?: number;
  nightsTotal?: number;
  /** transportation only */
  transportMode?: "flight" | "train";
  /** e.g. flight number or train number, transportation only */
  transportNumber?: string;
  /** transportation spanning midnight: which leg this day's card should emphasize */
  legView?: "departure" | "arrival";
  /** airport or station name */
  departureLocation?: string;
  departureCoordinates?: Coordinates;
  /** city departureCoordinates belongs to, for map filtering by city */
  departureCity?: string;
  /** ISO date, transportation only */
  departureDate?: string;
  /** e.g. "20:30", transportation only */
  departureTime?: string;
  /** airport or station name */
  arrivalLocation?: string;
  arrivalCoordinates?: Coordinates;
  /** city arrivalCoordinates belongs to, for map filtering by city */
  arrivalCity?: string;
  /** ISO date, transportation only */
  arrivalDate?: string;
  /** e.g. "12:45", transportation only */
  arrivalTime?: string;
}

export interface Experience {
  title: string;
  /** e.g. "09:00" */
  time?: string;
  description?: string;
  coordinates?: Coordinates;
  /** city coordinates belongs to, for map filtering by city */
  city?: string;
}

export type ExpenseCategory =
  | "lodging"
  | "food"
  | "transport"
  | "activity"
  | "shopping"
  | "other";

export interface Expense {
  description: string;
  category: ExpenseCategory;
  cost: Money;
}

export interface DayPlan {
  /** ISO date, e.g. "2026-10-12" */
  date: string;
  /** one entry normally; two for a travel day spanning cities, e.g. ["Beijing", "Chengdu"] */
  cities: string[];
  bookings: Booking[];
  experiences: Experience[];
  expenses: Expense[];
}

export interface Trip {
  name: string;
  cities: string[];
  days: DayPlan[];
}
