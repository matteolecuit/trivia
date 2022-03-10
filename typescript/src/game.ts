import {
  askQuestion,
  askRockType,
  askAction,
  currentCategory,
  didPlayerWin,
  initPlayers,
} from "./utils";
import { Player, Questions } from "./types";

export class Game {
  public players: Player[];
  public currentPlayer: number = 0;
  private isRock: boolean;

  private questions: Questions;

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

  public roll(roll: number) {
    if (!this.players[this.currentPlayer].hasQuit) {
      console.log(
        this.players[this.currentPlayer].name + " is the current player"
      );
      console.log("They have rolled a " + roll);
  
      if (this.players[this.currentPlayer].isInPenaltyBox) {
        if (roll % 2 != 0) {
          this.players[this.currentPlayer].isGettingOutOfPenaltyBox = true;
  
          console.log(
            this.players[this.currentPlayer].name +
              " is getting out of the penalty box"
          );
          this.players[this.currentPlayer].place =
            this.players[this.currentPlayer].place + roll;
          if (this.players[this.currentPlayer].place > 11) {
            this.players[this.currentPlayer].place =
              this.players[this.currentPlayer].place - 12;
          }
  
          console.log(
            this.players[this.currentPlayer].name +
              "'s new location is " +
              this.players[this.currentPlayer].place
          );
          console.log(
            "The category is " +
              currentCategory(this.players[this.currentPlayer], this.isRock)
          );
          askAction(this.players[this.currentPlayer]);
          askQuestion(
            this.players[this.currentPlayer],
            this.questions,
            this.isRock
          );
        
        } else {
          console.log(
            this.players[this.currentPlayer].name +
              " is not getting out of the penalty box"
          );
          this.players[this.currentPlayer].isGettingOutOfPenaltyBox = false;
        }
      } else {
        this.players[this.currentPlayer].place =
          this.players[this.currentPlayer].place + roll;
        if (this.players[this.currentPlayer].place > 11) {
          this.players[this.currentPlayer].place =
            this.players[this.currentPlayer].place - 12;
        }
  
        console.log(
          this.players[this.currentPlayer].name +
            "'s new location is " +
            this.players[this.currentPlayer].place
        );
        console.log(
          "The category is " +
            currentCategory(this.players[this.currentPlayer], this.isRock)
        );
        askAction(this.players[this.currentPlayer]);
        askQuestion(
          this.players[this.currentPlayer],
          this.questions,
          this.isRock
        );
      
      }
    }
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.players[this.currentPlayer].isInPenaltyBox) {
      if (this.players[this.currentPlayer].isGettingOutOfPenaltyBox) {
        console.log("---------------------------")
        this.players[this.currentPlayer].isInPenaltyBox = false;
        this.players[this.currentPlayer].isGettingOutOfPenaltyBox = false;
        console.log("Answer was correct!!!!\n"+this.players[this.currentPlayer].name + " is leaving the penalty box.");
        this.players[this.currentPlayer].gold += 1;
        console.log(
          this.players[this.currentPlayer].name +
            " now has " +
            this.players[this.currentPlayer].gold +
            " Gold Coins."
        );

        var winner = didPlayerWin(this.players[this.currentPlayer]);
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return winner;
      }
    } else {
      console.log("Answer was corrent!!!!");

      this.players[this.currentPlayer].gold += 1;
      console.log(
        this.players[this.currentPlayer].name +
          " now 2has " +
          this.players[this.currentPlayer].gold +
          " Gold Coins."
      );

      var winner = didPlayerWin(this.players[this.currentPlayer]);

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      return winner;
    }
  }
}
