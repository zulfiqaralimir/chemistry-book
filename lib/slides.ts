export interface Slide {
  id: string;
  title: string;
  bullets?: string[];
  formula?: string;
  note?: string;
}

export interface SlideDeck {
  topic: string;
  slides: Slide[];
}
