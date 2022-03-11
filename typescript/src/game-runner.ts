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
    
    game: Game;

    public main(): void {
        let maxGold: number = readline.question(
            "Maximum gold wished ? (6 min) "
        );
        if (maxGold < 6) {
            console.log("Error : you cannot have less than 6 gold, maximum gold are set to 6");
            maxGold = 6;
        }

        do{
            this.game = new Game(["Chet", "Pat", "Sue"], maxGold);

            const isGameValid = checkPlayers(this.game.players);
            if (!isGameValid) {
                console.error("Game should have more than 2 and less than 7 players");
                return;
            }
            this.play()
        }while(this.wantToReplay())
        
    }

    private play(): void{
        let gameHasEnded = false;
        do {
            const diceRoll = Math.floor(Math.random() * 6) + 1;
            let action = roll(
                this.game.players,
                this.game.currentPlayer,
                this.game.questions,
                this.game.isRock,
                diceRoll,
                this.game.nextCategory,
                this.game.rageQuitBoard
            );
            this.game.nextCategory = ""

            if (action == 0) {
                if (Math.floor(Math.random() * 3) == 1) {
                    this.game.nextCategory = wrongAnswer(this.game.players, this.game.currentPlayer, this.game.nextCategory);
                } else {
                    let winner = wasCorrectlyAnswered(
                        this.game.players,
                        this.game.currentPlayer,
                        this.game.maxGold
                    );
                    if (winner) {
                        this.game.leaderboard.push(this.game.players[this.game.currentPlayer]);
                        this.game.players[this.game.currentPlayer].hasQuit = true;
                    } 
                    if ((this.game.leaderboard.length === (this.game.players.length - this.game.rageQuitBoard.length)) || this.game.leaderboard.length === 3) gameHasEnded = true;
                }
            } if(action == 2) {
                console.log(
                    "🃏" + this.game.players[this.game.currentPlayer].name + " used a joker"
                );
            }
            this.game.currentPlayer = switchPlayer(this.game.currentPlayer, this.game.players);
        } while (!gameHasEnded);
        if (this.game.leaderboard.length + this.game.rageQuitBoard.length >= 3) {
            this.game.rageQuitBoard.reverse();
            this.game.rageQuitBoard.forEach(element => {
                this.game.leaderboard.push(element);
            })
        }
        let i = 1;
        console.log("LeaderBoard: \ ");
        this.game.leaderboard.forEach(element => {
            console.log(i + " - " + element.name + " \ ");
            i++;
        })
    }

    private wantToReplay() {
        let askPrompt: string = readline.question("Souhaitez-vous rejouer ? (Y/N)");
        if (askPrompt == "Y" || askPrompt == "y") {
            return true;
        }else{
            return false;
        }
    }
}

new GameRunner().main();