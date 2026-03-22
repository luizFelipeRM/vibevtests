import { LucideIcon } from "lucide-react";

export type MealType = string;

export interface MealInfo {
  label: string;
  icon?: LucideIcon;
  color?: string;
}

export interface MealInfoMap {
  [key: string]: MealInfo;
}

export const mealInfoMap: MealInfoMap = {
  breakfast: { label: "Café da Manhã" },
  lunch: { label: "Almoço" },
  dinner: { label: "Janta" },
  supper: { label: "Ceia" },
};
