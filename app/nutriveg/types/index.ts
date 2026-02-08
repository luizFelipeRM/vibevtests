import { MealType } from "./meal.types";
export * from "./food.types";
export * from "./meal.types";
export * from "./macro.types";
export * from "./profile.types";

export type Mode = "basic" | "fitness";

export interface LogEntry {
  id: string;
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  quantity: number;
  unit: string;
  meal?: MealType;
}

export interface DailyLog {
  [date: string]: {
    totals: {
      protein: number;
      carbs: number;
      fats: number;
      calories: number;
    };
    items: LogEntry[];
  };
}
