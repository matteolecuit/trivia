export interface Player {
  name: string;
  place: number;
  gold: number;
  isInPenaltyBox: boolean;
  isGettingOutOfPenaltyBox: boolean;
}

export type Questions = {
  [key in Category]: string[];
};

export type Category = "pop" | "science" | "sports" | "rock" | "techno";
