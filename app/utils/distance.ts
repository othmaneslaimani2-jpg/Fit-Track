export const calculateDistance = (steps: number): string => {
  if (steps <= 0) return "0.0";
  return (steps * 0.000762).toFixed(1);
};
