import type { DayPlan, Money, ExpenseCategory } from "../types";

interface LineItem {
  city: string;
  category: ExpenseCategory;
  cost: Money;
}

function collectLineItems(days: DayPlan[]): LineItem[] {
  const items: LineItem[] = [];
  for (const day of days) {
    const city = day.cities.join(" → ");
    for (const expense of day.expenses) {
      items.push({ city, category: expense.category, cost: expense.cost });
    }
    for (const booking of day.bookings) {
      if (booking.cost) {
        items.push({
          city,
          category: booking.type === "hotel" ? "lodging" : "food",
          cost: booking.cost,
        });
      }
    }
  }
  return items;
}

function sumByCurrency(items: LineItem[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const item of items) {
    totals[item.cost.currency] = (totals[item.cost.currency] ?? 0) + item.cost.amount;
  }
  return totals;
}

function groupBy<T, K extends string>(items: T[], keyFn: (item: T) => K): Record<K, T[]> {
  const groups = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keyFn(item);
    (groups[key] ??= []).push(item);
  }
  return groups;
}

function formatTotals(totals: Record<string, number>) {
  const entries = Object.entries(totals);
  if (entries.length === 0) return "—";
  return entries.map(([currency, amount]) => `${amount.toLocaleString()} ${currency}`).join(" + ");
}

export default function ExpensesSummary({ days }: { days: DayPlan[] }) {
  const items = collectLineItems(days);
  const grandTotal = sumByCurrency(items);
  const byCategory = groupBy(items, (i) => i.category);
  const byCity = groupBy(items, (i) => i.city);

  return (
    <div className="expenses">
      <div className="expenses-total">
        <span className="expenses-total-label">Total spent</span>
        <span className="expenses-total-value">{formatTotals(grandTotal)}</span>
      </div>

      <h3 className="expenses-heading">By category</h3>
      <ul className="expenses-list">
        {Object.entries(byCategory).map(([category, group]) => (
          <li key={category} className="expenses-row">
            <span className="expenses-row-label">{category}</span>
            <span className="expenses-row-value">{formatTotals(sumByCurrency(group))}</span>
          </li>
        ))}
      </ul>

      <h3 className="expenses-heading">By city</h3>
      <ul className="expenses-list">
        {Object.entries(byCity).map(([city, group]) => (
          <li key={city} className="expenses-row">
            <span className="expenses-row-label">{city}</span>
            <span className="expenses-row-value">{formatTotals(sumByCurrency(group))}</span>
          </li>
        ))}
      </ul>

      {items.length === 0 && <p className="day-empty">No expenses logged yet</p>}
    </div>
  );
}
