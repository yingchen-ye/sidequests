import { useMemo, useState } from "react";
import type { DayPlan } from "../types";
import DayCard from "./DayCard";

type CalendarMode = "day" | "week";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOT_CATEGORIES = ["transportation", "hotel", "restaurant", "experience"] as const;

function toDate(iso: string) {
  return new Date(iso + "T00:00:00");
}

function isoOf(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatShort(iso: string) {
  return toDate(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

interface CalItem {
  label: string;
  type: (typeof DOT_CATEGORIES)[number];
}

function itemsFor(day: DayPlan): CalItem[] {
  const items: CalItem[] = day.bookings.map((b) => ({ label: b.name, type: b.type }));
  for (const experience of day.experiences) {
    items.push({ label: experience.title, type: "experience" });
  }
  return items;
}

function buildWeeks(days: DayPlan[]): (DayPlan | null)[][] {
  if (days.length === 0) return [];
  const byDate = new Map(days.map((d) => [d.date, d]));

  const start = toDate(days[0].date);
  start.setDate(start.getDate() - start.getDay());
  const end = toDate(days[days.length - 1].date);
  end.setDate(end.getDate() + (6 - end.getDay()));

  const weeks: (DayPlan | null)[][] = [];
  let week: (DayPlan | null)[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    week.push(byDate.get(isoOf(d)) ?? null);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  return weeks;
}

function ItemChips({ day, wrap }: { day: DayPlan; wrap?: boolean }) {
  const items = itemsFor(day);
  return (
    <div className={wrap ? "calendar-chip-row" : "calendar-cell-items"}>
      {items.map((item, i) => (
        <span key={i} className={`calendar-chip type-${item.type}`}>
          {item.label}
        </span>
      ))}
    </div>
  );
}

interface CalendarViewProps {
  days: DayPlan[];
  dayNumberFor: (date: string) => number;
}

export default function CalendarView({ days, dayNumberFor }: CalendarViewProps) {
  const [mode, setMode] = useState<CalendarMode>("week");
  const [selected, setSelected] = useState<DayPlan | null>(null);
  const weeks = useMemo(() => buildWeeks(days), [days]);

  return (
    <div className="calendar">
      <div className="city-tabs calendar-mode-tabs">
        <button className={`city-pill ${mode === "day" ? "is-active" : ""}`} onClick={() => setMode("day")}>
          Day
        </button>
        <button className={`city-pill ${mode === "week" ? "is-active" : ""}`} onClick={() => setMode("week")}>
          Week
        </button>
      </div>

      {mode === "week" &&
        (weeks.length > 0 ? (
          <div className="calendar-grid">
            <div className="calendar-week-row calendar-weekday-row">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label} className="calendar-weekday">
                  {label}
                </span>
              ))}
            </div>
            {weeks.map((week, i) => (
              <div key={i} className="calendar-week-row">
                {week.map((day, j) =>
                  day ? (
                    <button key={j} className="calendar-cell" onClick={() => setSelected(day)}>
                      <span className="calendar-cell-date">{toDate(day.date).getDate()}</span>
                      <ItemChips day={day} />
                    </button>
                  ) : (
                    <span key={j} className="calendar-cell calendar-cell-empty" />
                  )
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="day-empty">Nothing planned yet</div>
        ))}

      {mode === "day" &&
        (days.length > 0 ? (
          <div className="calendar-day-list">
            {days.map((day) => (
              <button key={day.date + day.city} className="calendar-day-row" onClick={() => setSelected(day)}>
                <div className="calendar-day-row-head">
                  <span className="calendar-day-row-date">{formatShort(day.date)}</span>
                  <span className="calendar-day-row-city">{day.city}</span>
                </div>
                <ItemChips day={day} wrap />
              </button>
            ))}
          </div>
        ) : (
          <div className="day-empty">Nothing planned yet</div>
        ))}

      {selected && (
        <div className="calendar-overlay" onClick={() => setSelected(null)}>
          <div className="calendar-sheet" onClick={(e) => e.stopPropagation()}>
            <button className="calendar-sheet-close" onClick={() => setSelected(null)} aria-label="Close">
              ×
            </button>
            <DayCard day={selected} dayNumber={dayNumberFor(selected.date)} />
          </div>
        </div>
      )}
    </div>
  );
}
