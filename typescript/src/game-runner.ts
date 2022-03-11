import { Game } from "./game";
import {
    checkPlayers,
    roll,
    switchPlayer,
    wasCorrectlyAnswered,
    wrongAnswer,
} from "./utils";
import * as readline from "readline-sync";

export class GameRunner {
    public static main(): void {
        let maxGold: number = readline.question(
            "Maximum gold wished ? (6 min) "
        );
        if (maxGold < 6) {
            console.log("Error : you cannot have less than 6 gold, maximum gold are set to 6");
            maxGold = 6;
        }
        const game = new Game(["Chet", "Pat", "Sue"], maxGold);

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
                game.rageQuitBoard
                game.nextCategory
            );
            game.nextCategory = ""

            if (action == 0) {
                if (Math.floor(Math.random() * 3) == 1) {
                    game.nextCategory = wrongAnswer(game.players, game.currentPlayer, game.nextCategory);
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
                    if ((game.leaderboard.length === (game.players.length - game.rageQuitBoard.length)) || game.leaderboard.length === 3) gameHasEnded = true;
                }
            } if(action == 2) {
                console.log(
                    "🃏" + game.players[game.currentPlayer].name + " used a joker"
                );
            }
            game.currentPlayer = switchPlayer(game.currentPlayer, game.players);
        } while (!gameHasEnded);
        if (game.leaderboard.length + game.rageQuitBoard.length >= 3) {
            game.rageQuitBoard.reverse();
            game.rageQuitBoard.forEach(element => {
                game.leaderboard.push(element);
            })
        }
        let i = 1;
        console.log("LeaderBoard: \ ");
        game.leaderboard.forEach(element => {
            console.log(i + " - " + element.name + " \ ");
            i++;
        })
    }
}

GameRunner.main();