import { Game } from "./game";
import {
  checkPlayers,
  roll,
  switchPlayer,
  wasCorrectlyAnswered,
  wrongAnswer,
} from "./utils";
import {
  getGameModeFromPrompt,
  getGoldLimitFromPrompt,
} from "./prompt-service";

export class GameRunner {
  public static main(): void {
    const gameMode = getGameModeFromPrompt();
    let autoMode = gameMode === "auto";
    const maxGold = getGoldLimitFromPrompt(autoMode);
    const game = new Game(["Chet", "Pat", "Sue"], maxGold, autoMode);

    const isGameValid = checkPlayers(game.players);
    if (!isGameValid) {
      console.error("Game should have more than 2 and less than 7 players");
      return;
    }
    let gameHasEnded = false;
    do {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      let action = roll(
        game.players,
        game.currentPlayer,
        game.questions,
        game.isRock,
        diceRoll,
        game.nextCategory,
        game.rageQuitBoard,
        game.autoMode
      );
      game.nextCategory = "";

      if (action == 0) {
        if (Math.floor(Math.random() * 3) == 1) {
          game.nextCategory = wrongAnswer(
            game.players,
            game.currentPlayer,
            game.nextCategory,
            game.autoMode
          );
        } else {
          let winner = wasCorrectlyAnswered(
            game.players,
            game.currentPlayer,
            game.maxGold
          );
          if (winner) {
            game.leaderboard.push(game.players[game.currentPlayer]);
            game.players[game.currentPlayer].hasQuit = true;
          }
          if (
            game.leaderboard.length ===
              game.players.length - game.rageQuitBoard.length ||
            game.leaderboard.length === 3
          )
            gameHasEnded = true;
        }
      }
      if (action == 2) {
        console.log(
          "🃏" + game.players[game.currentPlayer].name + " used a joker"
        );
      }
      game.currentPlayer = switchPlayer(game.currentPlayer, game.players);
    } while (!gameHasEnded);
    if (game.leaderboard.length + game.rageQuitBoard.length >= 3) {
      game.rageQuitBoard.reverse();
      game.rageQuitBoard.forEach((element) => {
        game.leaderboard.push(element);
      });
    }
    let i = 1;
    console.log("LeaderBoard:  ");
    game.leaderboard.forEach((element) => {
      console.log(i + " - " + element.name + "  ");
      i++;
    });
  }
}

GameRunner.main();
