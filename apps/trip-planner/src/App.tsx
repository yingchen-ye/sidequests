import { useMemo, useState } from "react";
import { trip } from "./data/trip";
import type { CardCategory, DayPlan } from "./types";
import CityTabs from "./components/CityTabs";
import CategoryTabs from "./components/CategoryTabs";
import DayCard from "./components/DayCard";
import TripMap from "./components/TripMap";
import ExpensesSummary from "./components/ExpensesSummary";
import CalendarView from "./components/CalendarView";

type Tab = "itinerary" | "calendar" | "map" | "expenses";

function filterDayByCategory(day: DayPlan, category: CardCategory | null): DayPlan {
  if (!category) return day;
  return {
    ...day,
    bookings: day.bookings.filter((b) => b.type === category),
    experiences: category === "experience" ? day.experiences : [],
  };
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function dayNumberFor(date: string, tripStartDate: string) {
  const start = new Date(tripStartDate + "T00:00:00");
  const current = new Date(date + "T00:00:00");
  return Math.round((current.getTime() - start.getTime()) / MS_PER_DAY) + 1;
}

export default function App() {
  const [tab, setTab] = useState<Tab>("itinerary");
  const [city, setCity] = useState<string | null>(null);
  const [category, setCategory] = useState<CardCategory | null>(null);

  const tripStartDate = useMemo(
    () => trip.days.reduce((min, d) => (d.date < min ? d.date : min), trip.days[0].date),
    []
  );

  const days = useMemo(() => {
    const cityFiltered = city ? trip.days.filter((d) => d.city === city) : trip.days;
    if (!category) return cityFiltered;
    return cityFiltered
      .map((d) => filterDayByCategory(d, category))
      .filter((d) => d.bookings.length > 0 || d.experiences.length > 0);
  }, [city, category]);

  return (
    <div className="app">
      <header className="app-header">
        <a className="back-link" href="../">
          ← Side Quests
        </a>
        <h1 className="app-title">{trip.name}</h1>
      </header>

      {tab !== "expenses" && (
        <>
          <CityTabs cities={trip.cities} selected={city} onSelect={setCity} />
          <CategoryTabs selected={category} onSelect={setCategory} />
        </>
      )}

      <main className="app-main">
        {tab === "itinerary" && (
          <div className="day-list">
            {days.map((day) => (
              <DayCard
                key={day.date + day.city}
                day={day}
                dayNumber={dayNumberFor(day.date, tripStartDate)}
              />
            ))}
          </div>
        )}
        {tab === "calendar" && (
          <CalendarView days={days} dayNumberFor={(date) => dayNumberFor(date, tripStartDate)} />
        )}
        {tab === "map" && <TripMap days={days} />}
        {tab === "expenses" && <ExpensesSummary days={trip.days} />}
      </main>

      <nav className="bottom-nav">
        <button className={tab === "itinerary" ? "is-active" : ""} onClick={() => setTab("itinerary")}>
          Itinerary
        </button>
        <button className={tab === "calendar" ? "is-active" : ""} onClick={() => setTab("calendar")}>
          Calendar
        </button>
        <button className={tab === "map" ? "is-active" : ""} onClick={() => setTab("map")}>
          Map
        </button>
        <button className={tab === "expenses" ? "is-active" : ""} onClick={() => setTab("expenses")}>
          Expenses
        </button>
      </nav>
    </div>
  );
}
