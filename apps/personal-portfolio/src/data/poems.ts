// Poems, with the age at which each was written.
// `translation` lines pair up with `original` lines by index.
export interface Poem {
  id: string;
  age: string;
  original: string[];
  translation: string[];
}

export const poems: Poem[] = [
  {
    id: "far-away",
    age: "teens", // TODO: exact age
    original: [
      "十几岁时以为投身远方便再无难事，如期而至",
      "出走，如漫游荒海，「流浪到世界最远的房看看」",
    ],
    translation: [
      "In my teen years, I thought that once I set out for distant lands, nothing would be too difficult—and it came to pass as expected,",
      "Going out, like drifting across a wild sea, 'to drift to the farthest corner of the world and have a look,'",
    ],
  },
];
