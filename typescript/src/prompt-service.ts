import * as readline from "readline-sync";
import { Player } from "./types";
import { categories } from "../enums/categories.enum";

export const getGoldLimitFromPrompt = (autoMode: boolean) => {
  const defaultMaxGold = 6;
  if (autoMode) return defaultMaxGold;
  let maxGold: number = readline.question("Maximum gold wished ? (6 min) ");
  if (maxGold < 6) {
    console.log(
      "Error : you cannot have less than 6 gold, maximum gold are set to 6"
    );
    maxGold = defaultMaxGold;
  }
  return maxGold;
};

export const getGameModeFromPrompt = () => {
  let gameMode: number = readline.question(
    "Do you wish to play: 1 - Manually  2 - Auto"
  );
  if (gameMode == 2) return "auto";
  return "manual";
};

export const getCategoryFromPrompt = (player: Player, autoMode: boolean) => {
  let isValid = false;
  let askPrompt = "";
  let validCategories: string[] = Object.values(categories);

  if (autoMode) {
    return validCategories[Math.floor(Math.random() * validCategories.length)];
  } else {
    const objectCategories = {};
    validCategories.map((c, i) => (objectCategories[i + 1] = c));
    do {
      console.table(objectCategories);
      askPrompt = readline.question(
        "Which category would you like to give to next player ? : "
      );

      if (Object.keys(objectCategories).includes(askPrompt)) {
        isValid = true;
      } else {
        console.log("Please choose a valid category");
      }
    } while (!isValid);

    return objectCategories[askPrompt];
  }
};

export const getRockTypeFromPrompt = (autoMode: boolean) => {
  if (autoMode) {
    console.log(`It's rock time !`);
    return true;
  }
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

export const getActionFromPrompt = (
  player: Player,
  rageQuitBoard: Player[],
  autoMode: boolean
) => {
  if (autoMode) {
    let action = 1;
    if (Math.floor(Math.random() * 12) == 0) action = 3;
    if (player.jokers > 0 && Math.floor(Math.random() * 3) == 0) action = 2;
    return action;
  }
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
