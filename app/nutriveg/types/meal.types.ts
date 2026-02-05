import { LucideIcon } from "lucide-react";

export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

export interface MealInfo {
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface Meals {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

export interface MealInfoMap {
  breakfast: MealInfo;
  lunch: MealInfo;
  dinner: MealInfo;
  snacks: MealInfo;
}
