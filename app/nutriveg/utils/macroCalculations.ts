import { Macros } from "../types";

export const calculateMacroPercentage = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};

export const calculateRemaining = (current: number, target: number): number => {
  return Math.max(target - current, 0);
};

export const addMacros = (macros1: Macros, macros2: Macros): Macros => {
  return {
    protein: parseFloat((macros1.protein + macros2.protein).toFixed(1)),
    carbs: parseFloat((macros1.carbs + macros2.carbs).toFixed(1)),
    fats: parseFloat((macros1.fats + macros2.fats).toFixed(1)),
    calories: Math.round(macros1.calories + macros2.calories),
  };
};

export const multiplyMacros = (macros: Macros, multiplier: number): Macros => {
  return {
    protein: parseFloat((macros.protein * multiplier).toFixed(1)),
    carbs: parseFloat((macros.carbs * multiplier).toFixed(1)),
    fats: parseFloat((macros.fats * multiplier).toFixed(1)),
    calories: Math.round(macros.calories * multiplier),
  };
};

export const emptyMacros = (): Macros => ({
  protein: 0,
  carbs: 0,
  fats: 0,
  calories: 0,
});
