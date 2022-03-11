import { askRockType, generateQuestions, initPlayers } from "./utils";
import { Player, Questions } from "./types";

export class Game {
    public players: Player[];
    public currentPlayer: number = 0;
    public isRock: boolean;
    public maxGold: number;
    public questions: Questions;
	public leaderboard: Player[];
	public rageQuitBoard: Player[];
    public nextCategory: string;

    constructor(playerNames: string[], maxGold: number) {
        this.players = initPlayers(playerNames);
        this.maxGold = maxGold;
        this.questions = { pop: [], science: [], rock: [], sports: [], techno: [] };
        this.isRock = askRockType();
		this.leaderboard = [];
		this.rageQuitBoard = [];
        this.nextCategory = "";
        generateQuestions(this.questions, 2, this.isRock);
        /*for (let i = 0; i < 50; i++) {
            this.questions.pop.push("Pop Question " + i);
            this.questions.science.push("Science Question " + i);
            this.questions.sports.push("Sports Question " + i);
            if (this.isRock) this.questions.rock.push("Rock Question " + i);
            else this.questions.techno.push("Rock Question " + i);
        }*/
    }
}
