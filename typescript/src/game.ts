import { askRockType, initPlayers } from "./utils";
import { Player, Questions } from "./types";

export class Game {
  public players: Player[];
  public currentPlayer: number = 0;
  public isRock: boolean;

  public questions: Questions;

  constructor(playerNames: string[]) {
    this.players = initPlayers(playerNames);
    this.questions = { pop: [], science: [], rock: [], sports: [], techno: [] };
    this.isRock = askRockType();
    for (let i = 0; i < 50; i++) {
      this.questions.pop.push("Pop Question " + i);
      this.questions.science.push("Science Question " + i);
      this.questions.sports.push("Sports Question " + i);
      if (this.isRock) this.questions.rock.push("Rock Question " + i);
      else this.questions.techno.push("Rock Question " + i);
    }
  }
}
