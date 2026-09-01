import type { DayPlan } from "../types";
import BookingCard from "./BookingCard";
import ExperienceItem from "./ExperienceItem";

function formatDate(iso: string) {
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function DayCard({ day, dayNumber }: { day: DayPlan; dayNumber: number }) {
  return (
    <section className="day-card">
      <header className="day-header">
        <span className="day-number">Day {dayNumber}</span>
        <span className="day-date">{formatDate(day.date)}</span>
        <span className="day-city">{day.cities.join(" → ")}</span>
      </header>
      <div className="day-items">
        {day.bookings.map((booking, i) => (
          <BookingCard key={`b-${i}`} booking={booking} />
        ))}
        {day.experiences.map((experience, i) => (
          <ExperienceItem key={`e-${i}`} experience={experience} />
        ))}
        {day.bookings.length === 0 && day.experiences.length === 0 && (
          <div className="day-empty">Nothing planned yet</div>
        )}
      </div>
    </section>
  );
}
