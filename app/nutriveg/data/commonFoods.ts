import { MealType } from "../types";

export const commonFoods: Record<MealType, string[]> = {
  breakfast: ["Aveia", "Banana", "Pasta de amendoim", "Leite de soja", "Granola"],
  lunch: ["Arroz integral", "Feijão preto", "Tofu", "Batata doce", "Salada"],
  dinner: ["Massas integrais", "Brócolis", "Sopa de legumes", "Hambúrguer vegetal"],
  snacks: ["Castanhas", "Morango", "Hummus", "Barra de cereal"],
};
