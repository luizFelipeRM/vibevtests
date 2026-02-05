export type Gender = "male" | "female";
export type Goal = "lose" | "maintain" | "gain";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type WorkoutType = "strength" | "cardio";

export interface Profile {
  height: string;
  weight: string;
  age: string;
  gender: Gender;
  goal: Goal;
  activityLevel: ActivityLevel;
  workoutType: WorkoutType;
}
