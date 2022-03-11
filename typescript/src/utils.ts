import { Category, Player, Questions } from "./types";
import * as readline from "readline-sync";
import { categories } from '../enums/categories.enum';

export const initPlayers = (playerNames: string[]) => {
  let playerCount = 0;
  const players: Player[] = playerNames.map((playerName) => {
    playerCount += 1;
    console.log(playerName + " was added");
    console.log("They are " + playerCount + " players");
    return {
      name: playerName,
      gold: 0,
      place: 0,
      streak: 0,
      jokers: 1,
      isInPenaltyBox: false,
      hasQuit: false,
      designedCategory: "",
      prison: 0,
    };
  });
  return players;
};

export const didPlayerWin = (player: Player, maxGold: number) => {
  return player.gold >= maxGold;
};

export const currentCategory = (player: Player, isRock: boolean, nextCategory: string) => {
  if (nextCategory.length > 0) {
    let choosenCategory = nextCategory;
    console.log(`The category has be defined previously and will be ${choosenCategory}`);
    nextCategory = "";
    return choosenCategory;
  }
  
  let category: Category = "rock";
  if (player.place == 0) category = "pop";
  if (player.place == 1) category = "science";
  if (player.place == 2) category = "sports";
  if (player.place == 4) category = "pop";
  if (player.place == 5) category = "science";
  if (player.place == 6) category = "sports";
  if (player.place == 8) category = "pop";
  if (player.place == 9) category = "science";
  if (player.place == 10) category = "sports";

  if (category == "rock" && !isRock) category = "techno";
  return category;
};
export const askQuestion = (
  player: Player,
  questions: Questions,
  isRock: boolean,
  nextCategory: string
) => {
  if (!player.hasQuit) {
    const category = currentCategory(player, isRock, nextCategory);
    const availableQuestions = questions[category] as string[];
    if (availableQuestions.length <= 0) {
      generateQuestions
        (questions, 10, isRock);
    }
    console.log(availableQuestions.shift());
  }
};

export const wrongAnswer = (players: Player[], currentPlayer: number, nextCategory: string) => {
  const player = players[currentPlayer];
  console.log("Question was incorrectly answered");
  console.log(player.name + " was sent to the penalty box");
  player.isInPenaltyBox = true;
  let designedCategory = askCategory(player);
  player.prison += 1;

  player.streak = 0;
  console.log(
    "🍦Streak has been reset for " + player.name + " streak: " + player.streak
  );
  currentPlayer += 1;
  if (currentPlayer == players.length) currentPlayer = 0;

  return designedCategory
};

export const switchPlayer = (currentPlayer: number, players: Player[]) => {
  currentPlayer += 1;
  if (currentPlayer == players.length) currentPlayer = 0;
  return currentPlayer;
};
export const wasCorrectlyAnswered = (
  players: Player[],
  currentPlayer: number,
  maxGold: number
) => {
  const player = players[currentPlayer];
  if (!player.hasQuit) {
      console.log("Answer was correct!!!!");

      player.streak += 1;
      player.gold += player.streak;

      console.log(
        "🔥" +
        player.name +
        " now 2has " +
        player.gold +
        " Gold Coins and has a streak of " +
        player.streak
      );

      var winner = didPlayerWin(player, maxGold);

      return winner;
  } else {
    return false;
  }
};

export const checkPlayers = (players: Player[]) => {
  if (players.length >= 2 && players.length <= 6) {
    return true;
  }
  return false;
};

export const askRockType = () => {
  let rockPrompt: string = readline.question(
    "Tu veux du rock mon copain ? (Y/N) : "
  );

  if (rockPrompt.toLowerCase() === "y") {
    console.log("You choose Rock");
    return true;
  } else if (rockPrompt.toLowerCase() === "n") {
    console.log("You'll have Techno questions");
    return false;
  } else {
    console.log("Invalid answer, You'll have Techno questions");
    return false;
  }
};

export const askAction = (player: Player, rageQuitBoard: Player[]) => {
  let askPrompt: string = readline.question(
    "Choisissez votre action ? : \
    1- Répondre à la question \
    2- Utiliser un joker \
    3- Quitter la partie"
  );

  if (askPrompt === "1") {
    console.log("You'll answer to this question");
  } else if (askPrompt === "2") {
    if (player.jokers > 0) {
      console.log("You skip the question, you lost your Joker !");
    } else {
      console.log("You don't have any jokers, You'll answer to this question");
      return 1;
    }
  } else if (askPrompt === "3") {
    console.log("You are out !");
    player.hasQuit = true;
    rageQuitBoard.push(player);
  } else {
    console.log("Invalid answer, You'll answer to this question");
    return 0;
  }
  return Number(askPrompt);
};

export const askCategory = (player: Player) => {
  let isValid = false;
  let askPrompt = "";
  let validCategories: string[] = Object.values(categories);
  const objectCategories = {}
  validCategories.map((c, i) => objectCategories[i+1] = c);

  do {
    console.table(objectCategories);
    askPrompt = readline.question(
      "Which category would you like to give to next player ? : "
    );

    if (Object.keys(objectCategories).includes(askPrompt)) {
      isValid = true;
    } else {
      console.log("Please choose a valid category")
    }
  } while (!isValid)

  return objectCategories[askPrompt];
};

export const createRockQuestion = (index: number, isRock: boolean) => {
  let type: string;
  type = isRock ? "Rock" : "Techno";
  return type + " Question " + index;
};

export const roll = (
  players: Player[],
  currentPlayer: number,
  questions: Questions,
  isRock: boolean,
  roll: number,
  nextCategory: string,
  rageQuitBoard: Player[]
) => {
  const player = players[currentPlayer];
  console.log(player.name + " is the current player");
  console.log("They have rolled a " + roll);

  if (!player.hasQuit) {
    if (player.isInPenaltyBox) {
      const rollExitPrison = Math.floor(Math.random() * player.prison) + 1
      console.log('🏃🏃You have 1/'+player.prison+" chance to exit. Result must be 1 : "+rollExitPrison);
      if (rollExitPrison == 1) {
        player.isInPenaltyBox = false;
        console.log("🏃 "+player.name + " is getting out of the penalty box");
        player.place = move(player, roll);
      } else {
        console.log(player.name + " is not getting out of the penalty box");
      }
      return 1;
    }
    player.place = move(player, roll);

    console.log(player.name + "'s new location is " + player.place);
    console.log("The category is " + currentCategory(player, isRock, nextCategory));
    if (askAction(player, rageQuitBoard) == 2) {
      player.jokers--;
      return 2;
    }

    askQuestion(player, questions, isRock, nextCategory);

    return 0;

  }
};

export const move = (player: Player, roll: number) => {
  player.place = player.place + roll;
  if (player.place > 11) {
    player.place = player.place - 12;
  }
  console.log(player.name + "'s new location is " + player.place);
  return player.place;
}

export const generateQuestions = (questions: Questions, amount: number, isRock: boolean) => {
  console.log("🃏 Generating " + amount + " cards...");
  for (let i = 0; i < amount; i++) {
    questions.pop.push("Pop Question " + i);
    questions.science.push("Science Question " + i);
    questions.sports.push("Sports Question " + i);
    if (isRock) questions.rock.push("Rock Question " + i);
    else questions.techno.push("Rock Question " + i);
  }
  return questions;
}