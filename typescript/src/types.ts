export interface Player {
  name: string;
  place: number;
  gold: number;
  streak: number;
  jokers: number;
  isInPenaltyBox: boolean;
  isGettingOutOfPenaltyBox: boolean;
  hasQuit: boolean;
  designedCategory: string;
}

export type Questions = {
  [key in Category]: string[];
};

export type Category = "pop" | "science" | "sports" | "rock" | "techno";
