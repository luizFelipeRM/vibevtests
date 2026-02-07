import { LucideIcon } from "lucide-react";

export type MealType = "breakfast" | "lunch" | "dinner" | "supper";

export interface MealInfo {
  label: string;
  icon?: LucideIcon;
  color?: string;
}

export interface MealInfoMap {
  breakfast: MealInfo;
  lunch: MealInfo;
  dinner: MealInfo;
  supper: MealInfo;
}

export const mealInfoMap: MealInfoMap = {
  breakfast: { label: "Café da Manhã" },
  lunch: { label: "Almoço" },
  dinner: { label: "Janta" },
  supper: { label: "Ceia" },
};
