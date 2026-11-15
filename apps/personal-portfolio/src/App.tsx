import { useEffect, useRef, useState } from "react";
import Index from "./components/Index";
import StrokeWriter from "./components/StrokeWriter";
import PoemView from "./components/PoemView";
import { poems } from "./data/poems";
import SaltScene from "./components/SaltScene";
import { chapters } from "./data/story";

export default function App() {
  const [active, setActive] = useState(chapters[0].id);
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setSeen((s) => (s[e.target.id] ? s : { ...s, [e.target.id]: true }));
        }
      },
      { threshold: 0.4 }
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));

    // The salt scene is many screens tall, so track the active chapter by
    // which section contains the middle of the viewport.
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let cur = chapters[0].id;
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= mid) cur = c.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const section = (id: string, children: React.ReactNode) => (
    <section
      id={id}
      ref={(el) => (refs.current[id] = el)}
      className={`chapter ${seen[id] ? "in" : ""}`}
    >
      {children}
    </section>
  );

  return (
    <>
      <Index active={active} />
      <main>
        {section(
          "me",
          <>
            <div className="duo">
              <h1 className="big latin">我</h1>
              <h1 className="big han">Self</h1>
            </div>
            <p className="quiet">
              This project is attempting to answer:
            </p>
            <p className="quiet">
              Who am I? What is wǒ?
            </p>
            <a className="scroll-cue" href="#poem">↓</a>
          </>
        )}

        {section(
          "poem",
          <>
            <PoemView poem={poems[0]} />
          </>
        )}

        {section(
          "origin",
          <>
            <h2>Where it came from</h2>
            <p>
              One common reading of 我: in the oldest oracle bone writing it
              was a picture of a weapon with a serrated blade. Later it was
              borrowed, for its sound alone, to mean <em>I</em>.
            </p>
            <div className="evolution" aria-label="Character evolution (placeholder)">
              {["Oracle bone", "Bronze", "Seal", "Clerical", "Regular"].map(
                (name) => (
                  <figure key={name}>
                    <div className="slot">?</div>
                    <figcaption>{name}</figcaption>
                  </figure>
                )
              )}
            </div>
            <p className="note">
              The etymology is debated; this is one account. The historical
              forms will be drawn in later.
            </p>
            <StrokeWriter char="我" size={200} play={!!seen["origin"]} />
            <p className="note">Seven strokes. Click to draw it again.</p>
          </>
        )}

        <SaltScene />

        {section(
          "between",
          <>
            <h2>Between</h2>
            <p>
              English insists on “I” in every sentence. Chinese often leaves
              it out and lets the sentence belong to someone without saying
              who. Translating a poem means deciding where the self goes.
            </p>
          </>
        )}

        {section(
          "poems",
          <>
            <h2>The poems</h2>
            <p>
              Written when I was young. Each one is marked with the age I was
              when I wrote it.
            </p>
            <p className="note">Coming soon.</p>
          </>
        )}
      </main>
    </>
  );
}
