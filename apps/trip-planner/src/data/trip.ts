import type { Trip } from "../types";

// Flights are confirmed. Hotels, restaurants and experiences below are
// still SAMPLE PLACEHOLDER DATA — send me the real bookings and I'll swap
// them in.
export const trip: Trip = {
  name: "China 2026",
  cities: ["Beijing", "Chengdu", "Shanghai", "Hangzhou"],
  days: [
    {
      date: "2026-09-17",
      city: "Beijing",
      bookings: [
        {
          type: "transportation",
          name: "Air China CA940",
          transportNumber: "CA940",
          legView: "departure",
          departureLocation: "FCO Rome Fiumicino T3",
          departureCoordinates: { lat: 41.79566424002674, lng: 12.250537468029162 },
          departureDate: "2026-09-17",
          departureTime: "20:30",
          arrivalLocation: "PEK Beijing Capital Intl. T3",
          arrivalDate: "2026-09-18",
          arrivalTime: "12:45",
          notes:
            "10h 15m · Economy · Boeing 777-300ER (Large) · Meal · Carry-on 5kg, checked 23kg",
        },
      ],
      experiences: [],
      expenses: [{
          description: "Flight tickets",
          category: "transport",
          cost: { amount: 4000, currency: "CNY" },
        },],
    },
    {
      date: "2026-09-18",
      city: "Beijing",
      bookings: [
        {
          type: "transportation",
          name: "Air China CA940",
          transportNumber: "CA940",
          legView: "arrival",
          departureLocation: "FCO Rome Fiumicino T3",
          departureDate: "2026-09-17",
          departureTime: "20:30",
          arrivalLocation: "PEK Beijing Capital Intl. T3",
          arrivalCoordinates: { lat: 40.0799721994354, lng: 116.60312282563372 },
          arrivalDate: "2026-09-18",
          arrivalTime: "12:45",
          notes:
            "10h 15m · Economy · Boeing 777-300ER (Large) · Meal · Carry-on 5kg, checked 23kg",
        },
        {
          type: "hotel",
          name: "Gong Hotel (Beijing Sanlitun Taikooli Tuanjiehu Subway Station Branch)",
          coordinates: { lat: 39.92724629449823, lng: 116.47060498086394 },
          checkIn: "2026-09-18",
          checkOut: "2026-09-20",
          cost: { amount: 344/2, currency: "CNY" },
          nightIndex: 1,
          nightsTotal: 2,
        },
        {
          type: "restaurant",
          name: "Duck de Chine",
          address: "98 Jinbao Street, Dongcheng, Beijing, China",
          coordinates: { lat: 39.914843406727755, lng: 116.42067582747129 },
          time: "19:00",
          confirmationNumber: "RXVK654D3M949",
          cost: { amount: 500, currency: "CNY" },
        }
      ],
      experiences: [],
      expenses: [
        {
          description: "Airport taxi",
          category: "transport",
          cost: { amount: 120, currency: "CNY" },
        },
      ],
    },
    {
      date: "2026-09-19",
      city: "Beijing",
      bookings: [
        {
          type: "hotel",
          name: "Gong Hotel (Beijing Sanlitun Taikooli Tuanjiehu Subway Station Branch)",
          coordinates: { lat: 39.92724629449823, lng: 116.47060498086394 },
          checkIn: "2026-09-18",
          checkOut: "2026-09-20",
          nightIndex: 2,
          nightsTotal: 2,
          cost: { amount: 344/2, currency: "CNY" },
        },
      ],
      experiences: [
        {
          title: "Forbidden City",
          time: "09:00",
          description: "Half day, enter from Meridian Gate.",
          coordinates: { lat: 39.9163, lng: 116.3972 },
        },
        {
          title: "Great Wall (Mutianyu)",
          time: "13:00",
          coordinates: { lat: 40.4319, lng: 116.5704 },
        },
      ],
      expenses: [],
    },
    {
      date: "2026-09-20",
      city: "Chengdu",
      bookings: [
        {
          type: "transportation",
          name: "China Southern CZ8849",
          transportNumber: "CZ8849",
          departureLocation: "PKX Beijing Daxing",
          departureCoordinates: { lat: 40.080095336293404, lng: 116.60343396184305 },
          departureDate: "2026-09-20",
          departureTime: "19:00",
          arrivalLocation: "CTU Chengdu Shuangliu T1",
          arrivalCoordinates: { lat: 30.58012407467801, lng: 103.95993626890618 },
          arrivalDate: "2026-09-20",
          arrivalTime: "21:55",
          notes: "2h 55m · Checked baggage 20kg",
        },
        {
          type: "hotel",
          name: "GuiYuan Hotel · ChengDu Grand Mansion",
          coordinates: { lat: 30.684631548785006, lng: 104.06386425172632 },
          checkIn: "2026-09-20",
          checkOut: "2026-09-23",
          cost: { amount: 1238.8/4, currency: "CNY" },
          nightIndex: 1,
          nightsTotal: 3,
        },
      ],
      experiences: [
      ],
      expenses: [],
    },
    {
      date: "2026-09-21",
      city: "Chengdu",
      bookings: [
        {
          type: "hotel",
          name: "GuiYuan Hotel · ChengDu Grand Mansion",
          coordinates: { lat: 30.684631548785006, lng: 104.06386425172632 },
          checkIn: "2026-09-20",
          checkOut: "2026-09-23",
          cost: { amount: 1238.8/4, currency: "CNY" },
          nightIndex: 2,
          nightsTotal: 3,
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
      date: "2026-09-22",
      city: "Chengdu",
      bookings: [
        {
          type: "hotel",
          name: "GuiYuan Hotel · ChengDu Grand Mansion",
          address: "No. 111 Pudong South Road, Pudong New Area, Shanghai, 200120, China",
          coordinates: { lat: 30.684631548785006, lng: 104.06386425172632 },
          checkIn: "2026-09-20",
          checkOut: "2026-09-23",
          cost: { amount: 1278/2, currency: "CNY" },
          nightIndex: 3,
          nightsTotal: 3,
        },
      ],
      experiences: [],
      expenses: [],
    },
    {
      date: "2026-09-23",
      city: "Shanghai",
      bookings: [
        {
          type: "transportation",
          name: "Chengdu Airlines EU6667",
          transportNumber: "EU6667",
          departureLocation: "CTU Chengdu Shuangliu T2",
          departureCoordinates: { lat: 30.56457507049901, lng: 103.95767728483526 },
          departureDate: "2026-09-23",
          departureTime: "15:25",
          arrivalLocation: "PVG Shanghai Pudong T2",
          arrivalCoordinates: { lat: 31.151703463581327, lng: 121.8076384094094 },
          arrivalDate: "2026-09-23",
          arrivalTime: "18:20",
          notes: "Checked baggage 20kg",
        },
        {
          type: "hotel",
          name: "Mandarin Oriental Pudong, Shanghai",
          address: "No. 111 Pudong South Road, Pudong New Area, Shanghai, 200120, China",
          coordinates: { lat: 31.2437482580197, lng: 121.50789516708176 },
          checkIn: "2026-09-23",
          checkOut: "2026-09-24",
          cost: { amount: 2902/2, currency: "CNY" },
          notes: "Breakfast included",
          nightIndex: 1,
          nightsTotal: 1,
        },
      ],
      experiences: [],
      expenses: [],
    },
    {
      date: "2026-09-24",
      city: "Hangzhou",
      bookings: [
        {
          type: "hotel",
          name: "HanTing Hotel (Hangzhou West Lake Hubin)",
          address:
            "7th Floor, Xueshi Commercial Building, No. 15 Banqiao Road, Shangcheng District, Hangzhou, Zhejiang, China",
          coordinates: { lat: 30.25574605571935, lng: 120.16643842103588 },
          checkIn: "2026-09-24",
          checkOut: "2026-09-27",
          cost: { amount: 958 / 6, currency: "CNY" },
          notes: "958 CNY total for 3 nights",
          nightIndex: 1,
          nightsTotal: 3,
        },
      ],
      experiences: [
        {
          title: "Mid-autumn Family Dinner",
          time: "18:00",
          coordinates: { lat: 30.29351788795101, lng: 120.12377940997519},
        },
      ],
      expenses: [],
    },
    {
      date: "2026-09-25",
      city: "Hangzhou",
      bookings: [
        {
          type: "hotel",
          name: "HanTing Hotel (Hangzhou West Lake Hubin)",
          address:
            "7th Floor, Xueshi Commercial Building, No. 15 Banqiao Road, Shangcheng District, Hangzhou, Zhejiang, China",
          coordinates: { lat: 30.25574605571935, lng: 120.16643842103588 },
          checkIn: "2026-09-24",
          checkOut: "2026-09-27",
          cost: { amount: 958 / 6, currency: "CNY" },
          notes: "958 CNY total for 3 nights",
          nightIndex: 2,
          nightsTotal: 3,
        },
      ],
      experiences: [],
      expenses: [],
    },
    {
      date: "2026-09-26",
      city: "Hangzhou",
      bookings: [
        {
          type: "hotel",
          name: "HanTing Hotel (Hangzhou West Lake Hubin)",
          address:
            "7th Floor, Xueshi Commercial Building, No. 15 Banqiao Road, Shangcheng District, Hangzhou, Zhejiang, China",
          coordinates: { lat: 30.25574605571935, lng: 120.16643842103588 },
          checkIn: "2026-09-24",
          checkOut: "2026-09-27",
          cost: { amount: 958 / 6, currency: "CNY" },
          notes: "958 CNY total for 3 nights",
          nightIndex: 3,
          nightsTotal: 3,
        },
      ],
      experiences: [
        {
          title: "West Lake loop",
          time: "09:00",
          coordinates: { lat: 30.2590, lng: 120.1490 },
        },
      ],
      expenses: [],
    },
    {
      date: "2026-09-27",
      city: "Hangzhou",
      bookings: [
        {
          type: "transportation",
          name: "Chiara — flight home (placeholder)",
          departureLocation: "HGH Hangzhou Xiaoshan",
          departureDate: "2026-09-27",
          departureTime: "09:00",
          arrivalLocation: "Rome (airport TBC)",
          arrivalDate: "2026-09-27",
          arrivalTime: "18:00",
          notes: "Placeholder — airline, flight number and confirmation not booked yet. Chiara only.",
        },
      ],
      experiences: [],
      expenses: [],
    },
  ],
};
