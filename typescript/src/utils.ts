export const generateRandom = (limit: number, fixedNumber?: number) => {
  return fixedNumber ?? Math.floor(Math.random() * limit) + 1;
};

export const consoleLog = (message: string) => {
  console.log(message);
};
