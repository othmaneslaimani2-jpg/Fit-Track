export const calculateCalories = (steps: number): number => {
  if (steps <= 0) return 0;
  return Math.floor(steps * 0.04);
};
