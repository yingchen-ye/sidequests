// Poems, with the age at which each was written.
// `translation[i]` is the English for `original[i]`, so keep the arrays the
// same length.
export interface Poem {
  id: string;
  title: { zh: string; en: string };
  age: string;
  original: string[];
  translation: string[];
}

export const poems: Poem[] = [
  {
    id: "what-kind-of-love",
    title: { zh: "第几种爱情", en: "What Kind of Love" }, // en title: draft
    age: "26",
    original: [
      "十几岁时以为投身远方便再无难事，如期而至",
      "出走，如漫游荒海，「流浪到世界最远的房看看」",
    ],
    translation: [
      "In my teen years, I thought that once I set out for distant lands, life would be sorted out by itself.",
      "I thought, 'to drift to the farthest corner of the world and have a look'. \
      While the days came, it felt like drifting across a wild sea.",
    ],
  },
];
