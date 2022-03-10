import {
  askQuestion,
  currentCategory,
  didPlayerWin,
  initPlayers,
} from "./utils";
import { Player, Questions } from "./types";

export class Game {
  private nplayers: Player[];
  private players: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private nquestions: Questions;

  constructor(playerNames: string[]) {
    this.nplayers = initPlayers(playerNames);
    this.nquestions = { pop: [], science: [], rock: [], sports: [] };
    for (let i = 0; i < 50; i++) {
      this.nquestions.pop.push("Pop Question " + i);
      this.nquestions.science.push("Science Question " + i);
      this.nquestions.sports.push("Sports Question " + i);
      this.nquestions.rock.push("Rock Question " + i);
    }
  }

  public roll(roll: number) {
    console.log(
      this.nplayers[this.currentPlayer].name + " is the current player"
    );
    console.log("They have rolled a " + roll);

    if (this.nplayers[this.currentPlayer].isInPenaltyBox) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(
          this.nplayers[this.currentPlayer].name +
            " is getting out of the penalty box"
        );
        this.nplayers[this.currentPlayer].place =
          this.nplayers[this.currentPlayer].place + roll;
        if (this.nplayers[this.currentPlayer].place > 11) {
          this.nplayers[this.currentPlayer].place =
            this.nplayers[this.currentPlayer].place - 12;
        }

        console.log(
          this.nplayers[this.currentPlayer].name +
            "'s new location is " +
            this.nplayers[this.currentPlayer].place
        );
        console.log(
          "The category is " +
            currentCategory(this.nplayers[this.currentPlayer])
        );
        askQuestion(this.nplayers[this.currentPlayer], this.nquestions);
      } else {
        console.log(
          this.nplayers[this.currentPlayer].name +
            " is not getting out of the penalty box"
        );
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.nplayers[this.currentPlayer].place =
        this.nplayers[this.currentPlayer].place + roll;
      if (this.nplayers[this.currentPlayer].place > 11) {
        this.nplayers[this.currentPlayer].place =
          this.nplayers[this.currentPlayer].place - 12;
      }

      console.log(
        this.nplayers[this.currentPlayer].name +
          "'s new location is " +
          this.nplayers[this.currentPlayer].place
      );
      console.log(
        "The category is " + currentCategory(this.nplayers[this.currentPlayer])
      );
      askQuestion(this.nplayers[this.currentPlayer], this.nquestions);
    }
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(
      this.nplayers[this.currentPlayer].name + " was sent to the penalty box"
    );
    this.nplayers[this.currentPlayer].isInPenaltyBox = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.nplayers.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.nplayers[this.currentPlayer].isInPenaltyBox) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.nplayers[this.currentPlayer].gold += 1;
        console.log(
          this.nplayers[this.currentPlayer].name +
            " now 1has " +
            this.nplayers[this.currentPlayer].gold +
            " Gold Coins."
        );

        var winner = didPlayerWin(this.nplayers[this.currentPlayer]);
        this.currentPlayer += 1;
        if (this.currentPlayer == this.nplayers.length) this.currentPlayer = 0;

        return winner;
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.nplayers.length) this.currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was corrent!!!!");

      this.nplayers[this.currentPlayer].gold += 1;
      console.log(
        this.nplayers[this.currentPlayer].name +
          " now 2has " +
          this.nplayers[this.currentPlayer].gold +
          " Gold Coins."
      );

      var winner = didPlayerWin(this.nplayers[this.currentPlayer]);

      this.currentPlayer += 1;
      if (this.currentPlayer == this.nplayers.length) this.currentPlayer = 0;

      return winner;
    }
  }
}
