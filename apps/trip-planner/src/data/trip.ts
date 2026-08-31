import type { Trip } from "../types";

// PLACEHOLDER DATA — send me your real dates, hotels, restaurants and
// confirmation numbers and I'll fill this in for real.
export const trip: Trip = {
  name: "China 2026",
  cities: ["Beijing", "Chengdu", "Shanghai", "Hangzhou"],
  days: [
    {
      date: "2026-10-12",
      city: "Beijing",
      bookings: [
        {
          type: "hotel",
          name: "Sample Hotel Beijing",
          address: "1 Sample Rd, Dongcheng, Beijing",
          coordinates: { lat: 39.9163, lng: 116.3972 },
          checkIn: "2026-10-12",
          checkOut: "2026-10-15",
          confirmationNumber: "PLACEHOLDER-123",
          cost: { amount: 1800, currency: "CNY" },
        },
      ],
      experiences: [
        {
          title: "Forbidden City",
          time: "09:00",
          description: "Half day, enter from Meridian Gate.",
          coordinates: { lat: 39.9163, lng: 116.3972 },
        },
      ],
      expenses: [
        {
          description: "Airport taxi",
          category: "transport",
          cost: { amount: 120, currency: "CNY" },
        },
      ],
    },
    {
      date: "2026-10-13",
      city: "Beijing",
      bookings: [
        {
          type: "restaurant",
          name: "Sample Peking Duck House",
          address: "23 Sample Alley, Beijing",
          coordinates: { lat: 39.9289, lng: 116.4193 },
          time: "19:30",
          confirmationNumber: "PLACEHOLDER-RES-1",
          cost: { amount: 320, currency: "CNY" },
        },
      ],
      experiences: [
        {
          title: "Great Wall (Mutianyu)",
          time: "08:00",
          coordinates: { lat: 40.4319, lng: 116.5704 },
        },
      ],
      expenses: [],
    },
    {
      date: "2026-10-16",
      city: "Chengdu",
      bookings: [
        {
          type: "hotel",
          name: "Sample Hotel Chengdu",
          address: "8 Sample St, Jinjiang, Chengdu",
          coordinates: { lat: 30.6598, lng: 104.0633 },
          checkIn: "2026-10-16",
          checkOut: "2026-10-18",
          confirmationNumber: "PLACEHOLDER-456",
          cost: { amount: 900, currency: "CNY" },
        },
      ],
      experiences: [
        {
          title: "Chengdu Panda Base",
          time: "07:30",
          description: "Go early, pandas are most active in the morning.",
          coordinates: { lat: 30.7350, lng: 104.1467 },
        },
      ],
      expenses: [],
    },
    {
      date: "2026-10-19",
      city: "Shanghai",
      bookings: [],
      experiences: [
        {
          title: "The Bund, evening walk",
          time: "18:00",
          coordinates: { lat: 31.2397, lng: 121.4900 },
        },
      ],
      expenses: [],
    },
    {
      date: "2026-10-22",
      city: "Hangzhou",
      bookings: [],
      experiences: [
        {
          title: "West Lake loop",
          time: "09:00",
          coordinates: { lat: 30.2590, lng: 120.1490 },
        },
      ],
      expenses: [],
    },
  ],
};
