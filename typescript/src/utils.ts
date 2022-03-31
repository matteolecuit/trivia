export const generateRandom = (limit: number, fixedNumber?: number) => {
  return fixedNumber ?? Math.floor(Math.random() * limit) + 1;
};
