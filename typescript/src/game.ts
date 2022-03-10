import {
  askQuestion,
  currentCategory,
  didPlayerWin,
  howManyPlayers,
} from "./utils";
import { Player, Questions } from "./types";

export const initPlayers = (playerNames: string[]) => {
  const players: Player[] = playerNames.map((playerName) => {
    return {
      name: playerName,
      gold: 0,
      place: 0,
      isInPenaltyBox: false,
      isGettingOutOfPenaltyBox: false,
    };
  });
  return players;
};

export class Game {
  private nplayers: Player[];
  private players: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private nquestions: Questions;
  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor(playerNames: string[]) {
    this.nplayers = initPlayers(playerNames);
    for (let i = 0; i < 50; i++) {
      this.nquestions.pop.push("Pop Question " + i);
      this.nquestions.science.push("Science Question " + i);
      this.nquestions.sports.push("Sports Question " + i);
      this.nquestions.rock.push(this.createRockQuestion(i));
    }
  }

  private createRockQuestion(index: number): string {
    return "Rock Question " + index;
  }

  public add(name: string): boolean {
    this.players.push(name);
    this.places[howManyPlayers(this.nplayers)] = 0;
    this.purses[howManyPlayers(this.nplayers)] = 0;
    this.inPenaltyBox[howManyPlayers(this.nplayers)] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  public roll(roll: number) {
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(
          this.players[this.currentPlayer] +
            " is getting out of the penalty box"
        );
        this.places[this.currentPlayer] =
          this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
          this.places[this.currentPlayer] =
            this.places[this.currentPlayer] - 12;
        }

        console.log(
          this.players[this.currentPlayer] +
            "'s new location is " +
            this.places[this.currentPlayer]
        );
        console.log(
          "The category is " +
            currentCategory(this.nplayers[this.currentPlayer])
        );
        askQuestion(this.nplayers[this.currentPlayer], this.nquestions);
      } else {
        console.log(
          this.players[this.currentPlayer] +
            " is not getting out of the penalty box"
        );
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
      if (this.places[this.currentPlayer] > 11) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
      }

      console.log(
        this.players[this.currentPlayer] +
          "'s new location is " +
          this.places[this.currentPlayer]
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
      this.players[this.currentPlayer] + " was sent to the penalty box"
    );
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.purses[this.currentPlayer] += 1;
        console.log(
          this.players[this.currentPlayer] +
            " now 1has " +
            this.purses[this.currentPlayer] +
            " Gold Coins."
        );

        var winner = didPlayerWin(this.nplayers[this.currentPlayer]);
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

        return winner;
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was corrent!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(
        this.players[this.currentPlayer] +
          " now 2has " +
          this.purses[this.currentPlayer] +
          " Gold Coins."
      );

      var winner = didPlayerWin(this.nplayers[this.currentPlayer]);

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      return winner;
    }
  }
}
