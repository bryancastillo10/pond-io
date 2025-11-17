export type SizingFactorRow = {
  years: string;
  tempAbove20: number;
  tempAbove10: number;
  tempBelow10: number;
};

export const sizingFactorValues: SizingFactorRow[] = [
  { years: "1", tempAbove20: 1.3, tempAbove10: 1.5, tempBelow10: 2.5 },
  { years: "2", tempAbove20: 1.0, tempAbove10: 1.15, tempBelow10: 1.5 },
  { years: "3", tempAbove20: 1.0, tempAbove10: 1.0, tempBelow10: 1.27 },
  { years: "4", tempAbove20: 1.0, tempAbove10: 1.0, tempBelow10: 1.15 },
  { years: "5", tempAbove20: 1.0, tempAbove10: 1.0, tempBelow10: 1.06 },
  { years: "6 or more", tempAbove20: 1.0, tempAbove10: 1.0, tempBelow10: 1.0 },
];
