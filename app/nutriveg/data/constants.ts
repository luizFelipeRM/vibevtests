import { Coffee, Utensils, Moon, Apple } from "lucide-react";
import { MealInfoMap, MacroTarget } from "../types";
import { tokens } from "../styles/tokens";

export const mealInfo: MealInfoMap = {
  breakfast: { label: "Café da Manhã", icon: Coffee, color: tokens.colors.orange },
  lunch: { label: "Almoço", icon: Utensils, color: tokens.colors.primary },
  dinner: { label: "Janta", icon: Moon, color: tokens.colors.purple },
  snacks: { label: "Lanches", icon: Apple, color: tokens.colors.pink },
};

export const targetMacros: MacroTarget = {
  protein: 150,
  carbs: 250,
  fats: 65,
  calories: 2100,
};
