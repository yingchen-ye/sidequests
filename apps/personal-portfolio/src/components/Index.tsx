import { chapters } from "../data/story";

export default function Index({ active }: { active: string }) {
  return (
    <nav className="index" aria-label="Chapters">
      {chapters.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={c.id === active ? "active" : ""}
          aria-current={c.id === active ? "true" : undefined}
        >
          <span className="dot" />
          <span className="label">{c.label}</span>
        </a>
      ))}
    </nav>
  );
}
