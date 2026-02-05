export * from "./food.types";
export * from "./meal.types";
export * from "./macro.types";
export * from "./profile.types";

export type Mode = "basic" | "fitness";

export interface DailyLog {
  [date: string]: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
}
