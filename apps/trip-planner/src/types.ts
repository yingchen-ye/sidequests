export type Currency = "CNY" | "USD";

export interface Money {
  amount: number;
  currency: Currency;
}

export type BookingType = "hotel" | "restaurant";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Booking {
  type: BookingType;
  name: string;
  address: string;
  coordinates?: Coordinates;
  /** ISO date, hotels only */
  checkIn?: string;
  /** ISO date, hotels only */
  checkOut?: string;
  /** e.g. "19:30", restaurants only */
  time?: string;
  confirmationNumber?: string;
  notes?: string;
  cost?: Money;
}

export interface Experience {
  title: string;
  /** e.g. "09:00" */
  time?: string;
  description?: string;
  coordinates?: Coordinates;
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
  city: string;
  bookings: Booking[];
  experiences: Experience[];
  expenses: Expense[];
}

export interface Trip {
  name: string;
  cities: string[];
  days: DayPlan[];
}
