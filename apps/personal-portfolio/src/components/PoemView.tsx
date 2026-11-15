import type { Poem } from "../data/poems";

export default function PoemView({ poem }: { poem: Poem }) {
  return (
    <article className="poem">
      <p className="age">age · {poem.age}</p>
      {poem.original.map((line, i) => (
        <div className="pair" key={i}>
          <p className="orig han">{line}</p>
          <p className="trans">{poem.translation[i]}</p>
        </div>
      ))}
      <p className="cite han">——《{poem.title.zh}》</p>
    </article>
  );
}
