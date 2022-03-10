export interface Player {
  name: string;
  place: number;
  gold: number;
  streak: number;
  jokers: number;
  isInPenaltyBox: boolean;
  hasQuit: boolean;
  prison: number;
}

export type Questions = {
  [key in Category]: string[];
};

export type Category = "pop" | "science" | "sports" | "rock" | "techno";
