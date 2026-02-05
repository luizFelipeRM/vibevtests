import { LucideIcon } from "lucide-react";

export interface Macros {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface MacroTarget extends Macros {}

export interface MacroCard {
  name: string;
  current: number;
  percentage: number;
  ideal: string;
  color: string;
  icon: LucideIcon;
}

export interface MacroSummaryItem {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  icon: LucideIcon;
}
