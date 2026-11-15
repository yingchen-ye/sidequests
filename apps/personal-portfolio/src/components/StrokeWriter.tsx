import { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

// Draws a character stroke by stroke. Stroke data is fetched from a CDN by
// hanzi-writer, so this needs a network connection.
export default function StrokeWriter({
  char,
  size = 260,
  play,
}: {
  char: string;
  size?: number;
  play: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const writer = useRef<HanziWriter | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    writer.current = HanziWriter.create(ref.current, char, {
      width: size,
      height: size,
      padding: 10,
      strokeColor: "#1f2033",
      outlineColor: "#e4e1da",
      strokeAnimationSpeed: 0.8,
      delayBetweenStrokes: 250,
    });
    return () => {
      writer.current?.cancelQuiz?.();
      writer.current = null;
    };
  }, [char, size]);

  useEffect(() => {
    if (play) writer.current?.animateCharacter();
  }, [play]);

  return (
    <div
      className="strokes-box"
      ref={ref}
      onClick={() => writer.current?.animateCharacter()}
      title="Click to replay"
    />
  );
}
