export interface Player {
  name: string;
  place: number;
  gold: number;
  streak: number;
  isInPenaltyBox: boolean;
  isGettingOutOfPenaltyBox: boolean;
  hasQuit: boolean;
}

export type Questions = {
  [key in Category]: string[];
};

export type Category = "pop" | "science" | "sports" | "rock" | "techno";
