import { useEffect, useRef, useState } from "react";
import { saltCaptions } from "../data/story";

// Scroll-driven doodle: grain -> crystal lattice -> dissolving -> sea.
// Everything is drawn on one canvas from a single progress value (0..1).

const INK = "#1f2033";
const RED = "#e2483d";
const WATER = "74,127,181";

const COLS = 17;
const ROWS = 11;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lin = (a: number, b: number, x: number) => clamp((x - a) / (b - a));
const ease = (a: number, b: number, x: number) => {
  const t = lin(a, b, x);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function wobblyCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  seed: number
) {
  const n = 18;
  ctx.beginPath();
  for (let i = 0; i <= n + 1; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (1 + (rnd(seed + (i % n)) - 0.5) * 0.18);
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
}

function wobblyLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seed: number
) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const n = Math.max(2, Math.round(len / 22));
  const nx = -(y2 - y1) / (len || 1);
  const ny = (x2 - x1) / (len || 1);
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const j = i === 0 || i === n ? 0 : (rnd(seed + i) - 0.5) * 3.5;
    const x = lerp(x1, x2, t) + nx * j;
    const y = lerp(y1, y2, t) + ny * j;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawCube(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,
  boil: number
) {
  const dx = s * 0.87;
  const dy = s * 0.5;
  const top = [
    [cx, cy - s],
    [cx + dx, cy - dy],
    [cx, cy],
    [cx - dx, cy - dy],
  ];
  const left = [
    [cx - dx, cy - dy],
    [cx, cy],
    [cx, cy + s],
    [cx - dx, cy + dy],
  ];
  const right = [
    [cx + dx, cy - dy],
    [cx, cy],
    [cx, cy + s],
    [cx + dx, cy + dy],
  ];
  const face = (pts: number[][], fill: string, seed: number) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.fill();
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      wobblyLine(ctx, a[0], a[1], b[0], b[1], seed + i * 10 + boil * 100);
    }
  };
  face(left, "#f1eee8", 1);
  face(right, "#e6e2da", 2);
  face(top, "#ffffff", 3);
  // little sparkle ticks
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    const x = cx + (rnd(i * 9 + boil) - 0.5) * s * 2.2;
    const y = cy - s - 18 - rnd(i * 4) * 30;
    wobblyLine(ctx, x - 5, y, x + 5, y, i);
    wobblyLine(ctx, x, y - 5, x, y + 5, i + 20);
  }
}

export default function SaltScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [cap, setCap] = useState(0);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let shown = 0;
    let lastCap = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = (ms: number) => {
      const time = reduce ? 0 : ms / 1000;
      const boil = reduce ? 0 : Math.floor(time * 5) % 3;
      const el = wrap.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const target = clamp(-r.top / Math.max(1, r.height - window.innerHeight));
        shown = reduce ? target : shown + (target - shown) * 0.12;
      }
      const p = shown;

      let idx = 0;
      saltCaptions.forEach((c, i) => {
        if (p >= c.at) idx = i;
      });
      if (idx !== lastCap) {
        lastCap = idx;
        setCap(idx);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const cx = w / 2;
      const cy = h / 2;
      const base = Math.min(w, h);

      // stage values
      const cubeA = 1 - ease(0.14, 0.28, p);
      const latA = ease(0.16, 0.3, p);
      const zoomIn = ease(0.18, 0.42, p);
      const tD = lin(0.42, 0.75, p); // dissolve
      const t2 = ease(0.72, 1, p); // pull out to the sea
      const waterA = ease(0.42, 0.6, p);
      const horizon = lerp(-h * 0.1, h * 0.38, t2);
      const sp = base * 0.12 * lerp(2.6, 1, zoomIn) * lerp(1, 0.45, t2);

      // water: tint + wavy rows
      if (waterA > 0) {
        if (horizon > 0) {
          ctx.fillStyle = `rgba(${WATER},${0.07 * waterA})`;
          ctx.fillRect(0, horizon, w, h - horizon);
          ctx.strokeStyle = `rgba(${WATER},${0.5 * waterA})`;
          ctx.lineWidth = 2;
          wobblyLine(ctx, 0, horizon, w, horizon, 500 + boil);
        } else {
          ctx.fillStyle = `rgba(${WATER},${0.07 * waterA})`;
          ctx.fillRect(0, 0, w, h);
        }
        const gap = lerp(h * 0.13, h * 0.065, t2);
        ctx.strokeStyle = `rgba(${WATER},${0.45 * waterA})`;
        ctx.lineWidth = 1.8;
        for (let k = 0; ; k++) {
          const y0 = Math.max(horizon, 0) + gap * (k + 0.6);
          if (y0 > h + 10) break;
          const dir = k % 2 ? 1 : -1;
          ctx.beginPath();
          for (let x = -10; x <= w + 24; x += 18) {
            const y =
              y0 +
              Math.sin(x * 0.022 + k * 1.3 + time * 0.9 * dir) * 6 +
              (rnd(x * 0.1 + k + boil * 7) - 0.5) * 1.6;
            if (x === -10) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      // sun
      const sunA = ease(0.82, 1, p);
      if (sunA > 0 && horizon > 40) {
        const sx = w * 0.8;
        const sy = Math.max(30, horizon * 0.5);
        ctx.globalAlpha = sunA;
        ctx.strokeStyle = RED;
        ctx.lineWidth = 2;
        wobblyCircle(ctx, sx, sy, 22, 900 + boil * 30);
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + time * 0.1;
          wobblyLine(
            ctx,
            sx + Math.cos(a) * 32,
            sy + Math.sin(a) * 32,
            sx + Math.cos(a) * 44,
            sy + Math.sin(a) * 44,
            950 + i + boil * 30
          );
        }
        ctx.globalAlpha = 1;
      }

      // cube (the grain)
      if (cubeA > 0.01) {
        ctx.globalAlpha = cubeA;
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2.2;
        drawCube(ctx, cx, cy + 10, base * 0.17 * lerp(1, 1.5, ease(0.1, 0.28, p)), boil);
        ctx.globalAlpha = 1;
      }

      // ions
      if (latA > 0.01) {
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const i = r * COLS + c;
            const gx = c - (COLS - 1) / 2;
            const gy = r - (ROWS - 1) / 2;
            const bx = cx + gx * sp;
            const by = cy + gy * sp;
            const dist = clamp(Math.hypot(gx / (COLS / 2), gy / (ROWS / 2)));
            const ti = clamp((tD - (1 - dist) * 0.6 * 0.6) / 0.4);
            const e = ease(0, 1, ti);
            const top = Math.max(horizon, 0) + 24;
            const tx = rnd(i * 3.1) * w;
            const ty = lerp(top, h - 10, rnd(i * 7.7));
            const x =
              lerp(bx, tx, e) + Math.sin(time * 0.8 + i) * 7 * e;
            const y =
              lerp(by, ty, e) + Math.cos(time * 0.7 + i * 1.3) * 5 * e;
            if (x < -30 || x > w + 30 || y < -30 || y > h + 30) continue;

            const isNa = (r + c) % 2 === 0;
            const rad = Math.max(3, sp * (isNa ? 0.2 : 0.3) * (1 - 0.45 * e));
            ctx.globalAlpha = latA * (e > 0 ? lerp(1, 0.85, e) : 1);
            ctx.lineWidth = rad > 8 ? 2 : 1.5;
            ctx.strokeStyle = isNa ? RED : INK;
            ctx.fillStyle = "#fff";
            wobblyCircle(ctx, x, y, rad, i * 5 + boil * 211);
            ctx.fill();
            ctx.stroke();
            if (rad > 9) {
              const q = rad * 0.45;
              wobblyLine(ctx, x - q, y, x + q, y, i + boil * 7);
              if (isNa) wobblyLine(ctx, x, y - q, x, y + q, i + 99 + boil * 7);
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const c = saltCaptions[cap];
  return (
    <div ref={wrap} id="salt" className="salt-wrap">
      <div className="salt-stick">
        <canvas ref={canvas} className="salt-canvas" />
        <p key={cap} className={`salt-caption ${c.big ? "big-cap" : ""}`}>
          {c.text}
        </p>
      </div>
    </div>
  );
}
