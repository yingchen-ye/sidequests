import { useMemo, useState } from "react";
import { trip } from "./data/trip";
import CityTabs from "./components/CityTabs";
import DayCard from "./components/DayCard";
import TripMap from "./components/TripMap";
import ExpensesSummary from "./components/ExpensesSummary";

type Tab = "itinerary" | "map" | "expenses";

export default function App() {
  const [tab, setTab] = useState<Tab>("itinerary");
  const [city, setCity] = useState<string | null>(null);

  const days = useMemo(
    () => (city ? trip.days.filter((d) => d.city === city) : trip.days),
    [city]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">{trip.name}</h1>
      </header>

      {tab !== "expenses" && (
        <CityTabs cities={trip.cities} selected={city} onSelect={setCity} />
      )}

      <main className="app-main">
        {tab === "itinerary" && (
          <div className="day-list">
            {days.map((day, i) => (
              <DayCard key={day.date + day.city} day={day} dayNumber={i + 1} />
            ))}
          </div>
        )}
        {tab === "map" && <TripMap days={days} />}
        {tab === "expenses" && <ExpensesSummary days={trip.days} />}
      </main>

      <nav className="bottom-nav">
        <button className={tab === "itinerary" ? "is-active" : ""} onClick={() => setTab("itinerary")}>
          Itinerary
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
