interface CityTabsProps {
  cities: string[];
  selected: string | null;
  onSelect: (city: string | null) => void;
}

export default function CityTabs({ cities, selected, onSelect }: CityTabsProps) {
  return (
    <div className="city-tabs">
      <button
        className={`city-pill ${selected === null ? "is-active" : ""}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {cities.map((city) => (
        <button
          key={city}
          className={`city-pill ${selected === city ? "is-active" : ""}`}
          onClick={() => onSelect(city)}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
