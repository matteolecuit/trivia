import { getActionFromPrompt, getCategoryFromPrompt } from './prompt-service';
import { Category, Player, Questions } from './types';

export const initPlayers = (playerNames: string[]) => {
  let playerCount = 0;
  const players: Player[] = playerNames.map((playerName) => {
    playerCount += 1;
    console.log(playerName + ' was added');
    console.log('They are ' + playerCount + ' players');
    return {
      name: playerName,
      gold: 0,
      place: 0,
      streak: 0,
      jokers: 1,
      timeInPenaltyBox: 0,
      isInPenaltyBox: false,
      hasQuit: false,
      designedCategory: '',
      prison: 0
    };
  });
  return players;
};

export const didPlayerWin = (player: Player, maxGold: number) => {
  return player.gold >= maxGold;
};

interface CategoriesLength {
  category: Category;
  length: number;
}
export const currentCategory = (nextCategory: string, questions: Questions) => {
  if (nextCategory.length > 0) {
    let chosenCategory = nextCategory;
    console.log(
      `The category has be defined previously and will be ${chosenCategory}`
    );
    nextCategory = '';
    return chosenCategory;
  }

  const categoriesLength: CategoriesLength[] = [
    {
      category: 'rock',
      length: questions.rock.length
    },
    {
      category: 'pop',
      length: questions.pop.length
    },
    {
      category: 'science',
      length: questions.science.length
    },
    {
      category: 'sports',
      length: questions.sports.length
    },
    {
      category: 'techno',
      length: questions.techno.length
    },
    {
      category: 'rap',
      length: questions.rap.length
    },
    {
      category: 'philosophy',
      length: questions.philosophy.length
    },
    {
      category: 'literature',
      length: questions.literature.length
    },
    {
      category: 'geography',
      length: questions.geography.length
    },
    {
      category: 'people',
      length: questions.people.length
    }
  ];

  let totalLength = categoriesLength
    .map((a) => a.length)
    .reduce(function (a, b) {
      return a + b;
    });
  let chosenQuestion = Math.floor(Math.random() * totalLength);
  let category: Category;
  for (const c of categoriesLength) {
    if (!category) {
      chosenQuestion -= c.length;
      if (chosenQuestion <= 0) category = c.category;
    }
  }
  return category;
};
export const askQuestion = (
  player: Player,
  questions: Questions,
  isRock: boolean,
  nextCategory: string
) => {
  if (!player.hasQuit) {
    const category = currentCategory(nextCategory, questions);
    const availableQuestions = questions[category] as string[];
    if (availableQuestions.length <= 0) {
      generateQuestions(questions, 10, isRock);
    }
    console.log(availableQuestions.shift());
  }
};

export const wrongAnswer = (
  players: Player[],
  currentPlayer: number,
  nextCategory: string,
  autoMode: boolean
) => {
  const player = players[currentPlayer];
  console.log('Question was incorrectly answered');
  console.log(player.name + ' was sent to the penalty box');
  player.isInPenaltyBox = true;
  let designedCategory = getCategoryFromPrompt(player, autoMode);
  player.prison += 1;

  player.streak = 0;
  console.log(
    '🍦Streak has been reset for ' + player.name + ' streak: ' + player.streak
  );
  currentPlayer += 1;
  if (currentPlayer == players.length) currentPlayer = 0;

  return designedCategory;
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
    console.log('Answer was correct!!!!');

    player.streak += 1;
    player.gold += player.streak;

    console.log(
      '🔥' +
        player.name +
        ' now 2has ' +
        player.gold +
        ' Gold Coins and has a streak of ' +
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

export const createRockQuestion = (index: number, isRock: boolean) => {
  let type: string;
  type = isRock ? 'Rock' : 'Techno';
  return type + ' Question ' + index;
};

export const roll = (
  players: Player[],
  currentPlayer: number,
  questions: Questions,
  isRock: boolean,
  roll: number,
  nextCategory: string,
  rageQuitBoard: Player[],
  autoMode: boolean
) => {
  const player = players[currentPlayer];
  console.log(player.name + ' is the current player');
  console.log('They have rolled a ' + roll);

  if (!player.hasQuit) {
    if (player.isInPenaltyBox) {
      const chancesOfGettinOut =
        1 / player.prison + 1 / (10 - player.timeInPenaltyBox);

      const canLeaveJail = Math.floor(Math.random()) < chancesOfGettinOut;

      console.log(
        '🏃🏃You have ' +
          Math.floor(chancesOfGettinOut * 100) +
          '% chance to exit.'
      );
      if (canLeaveJail) {
        player.isInPenaltyBox = false;
        player.timeInPenaltyBox = 0;
        console.log('🏃 ' + player.name + ' is getting out of the penalty box');
        player.place = move(player, roll);
      } else {
        player.timeInPenaltyBox++;
        console.log(player.name + ' is not getting out of the penalty box');
      }
      return 1;
    }
    player.place = move(player, roll);

    console.log(player.name + "'s new location is " + player.place);
    console.log('The category is ' + currentCategory(nextCategory, questions));
    if (getActionFromPrompt(player, rageQuitBoard, autoMode) == 2) {
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
};

export const generateQuestions = (
  questions: Questions,
  amount: number,
  isRock: boolean
) => {
  console.log('🃏 Generating ' + amount + ' cards...');
  for (let i = 0; i < amount; i++) {
    questions.pop.push('Pop Question ' + i);
    questions.science.push('Science Question ' + i);
    questions.sports.push('Sports Question ' + i);
    questions.geography.push('Geography Question ' + i);
    questions.rap.push('Rap Question ' + i);
    questions.philosophy.push('Philosophy Question ' + i);
    questions.literature.push('Literature Question ' + i);
    questions.people.push('People Question ' + i);
    if (isRock) questions.rock.push('Rock Question ' + i);
    else questions.techno.push('Rock Question ' + i);
  }
  return questions;
};
