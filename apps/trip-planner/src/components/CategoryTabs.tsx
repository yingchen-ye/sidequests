import type { CardCategory } from "../types";

const CATEGORIES: { value: CardCategory; label: string }[] = [
  { value: "transportation", label: "Transport" },
  { value: "hotel", label: "Hotels" },
  { value: "restaurant", label: "Food" },
  { value: "experience", label: "Experiences" },
];

interface CategoryTabsProps {
  selected: CardCategory | null;
  onSelect: (category: CardCategory | null) => void;
}

export default function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <div className="city-tabs category-tabs">
      <button
        className={`city-pill ${selected === null ? "is-active" : ""}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          className={`city-pill category-pill type-${category.value} ${
            selected === category.value ? "is-active" : ""
          }`}
          onClick={() => onSelect(category.value)}
        >
          <span className="category-dot" />
          {category.label}
        </button>
      ))}
    </div>
  );
}
