export interface Weight {
  imperial: string;
  metric: string;
}

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  description: string;
  origin: string;
  life_span?: string;
  weight?: Weight;
}

export interface Cat {
  id: string;
  url: string;
  breeds: Breed[];
  width: number;
  height: number;
}