export interface Player {
  name: string;
  place: number;
  gold: number;
  streak: number;
  jokers: number;
  isInPenaltyBox: boolean;
  timeInPenaltyBox: number;
  hasQuit: boolean;
  designedCategory: string;
  prison: number;
}

export type Questions = {
  [key in Category]: string[];
};

export type Category =
  | 'pop'
  | 'science'
  | 'sports'
  | 'rock'
  | 'techno'
  | 'rap'
  | 'philosophy'
  | 'literature'
  | 'geography'
  | 'people';
