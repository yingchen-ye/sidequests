// The opening story. Each chapter is one full-height section of the scroll,
// and the side index is generated from this list.
export interface Chapter {
  id: string;
  label: string; // shown in the index
}

export const chapters: Chapter[] = [
  { id: "me", label: "Me · 我" },
  { id: "poem", label: "How did it start?" },
  { id: "origin", label: "Origin" },
  { id: "salt", label: "Salt" },
  { id: "between", label: "Between" },
  { id: "poems", label: "Poems" },
];

// Captions for the salt scroll animation. `at` is scroll progress (0 to 1)
// where the caption appears; it stays until the next one. Edit freely.
export interface SaltCaption {
  at: number;
  text: string;
  big?: boolean;
}

export const saltCaptions: SaltCaption[] = [
  { at: 0, text: "Salt · 盐", big: true },
  { at: 0.08, text: "this is a grain of salt." },
  { at: 0.22, text: "closer: it isn't one thing. it's a pattern — a small thing, next to a different small thing, again and again." },
  { at: 0.44, text: "put it in water, and it lets go." },
  { at: 0.62, text: "you can't find the grain anymore." },
  { at: 0.8, text: "but taste the water." },
  { at: 0.92, text: "that's the sea: made of everything that let go into it. me too.", big: true },
];
