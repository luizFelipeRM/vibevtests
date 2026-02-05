import { FoodDatabase } from "../types";

export const foodDatabase: FoodDatabase = {
  // Grains & Legumes
  "Arroz integral": { protein: 2.6, carbs: 23, fats: 0.9, calories: 111, unit: "100g" },
  "Arroz branco": { protein: 2.7, carbs: 28, fats: 0.3, calories: 130, unit: "100g" },
  "Aveia": { protein: 6.9, carbs: 33.8, fats: 3.5, calories: 194, unit: "50g" },
  "Quinoa": { protein: 4.4, carbs: 21.3, fats: 1.9, calories: 120, unit: "100g" },
  "Feijão preto": { protein: 8.9, carbs: 23.7, fats: 0.5, calories: 132, unit: "100g" },
  "Feijão carioca": { protein: 8.7, carbs: 24, fats: 0.5, calories: 136, unit: "100g" },
  "Grão de bico": { protein: 8.9, carbs: 27.4, fats: 2.6, calories: 164, unit: "100g" },
  "Lentilha": { protein: 9, carbs: 20, fats: 0.4, calories: 116, unit: "100g" },

  // Proteins
  "Tofu": { protein: 8, carbs: 1.9, fats: 4.8, calories: 76, unit: "100g" },
  "Tempeh": { protein: 19, carbs: 9, fats: 11, calories: 193, unit: "100g" },
  "Seitan": { protein: 25, carbs: 4, fats: 2, calories: 140, unit: "100g" },
  "Proteína de soja texturizada (PTS)": { protein: 52, carbs: 30, fats: 1, calories: 336, unit: "100g" },

  // Vegetables
  "Brócolis": { protein: 2.8, carbs: 7, fats: 0.4, calories: 34, unit: "100g" },
  "Batata doce": { protein: 1.6, carbs: 20.1, fats: 0.1, calories: 86, unit: "100g" },
  "Couve": { protein: 4.3, carbs: 9, fats: 0.9, calories: 49, unit: "100g" },
  "Espinafre": { protein: 2.9, carbs: 3.6, fats: 0.4, calories: 23, unit: "100g" },
  "Cenoura": { protein: 0.9, carbs: 10, fats: 0.2, calories: 41, unit: "100g" },
  "Tomate": { protein: 0.9, carbs: 3.9, fats: 0.2, calories: 18, unit: "100g" },
  "Abóbora": { protein: 1, carbs: 7, fats: 0.1, calories: 26, unit: "100g" },
  "Beterraba": { protein: 1.6, carbs: 10, fats: 0.2, calories: 43, unit: "100g" },

  // Fruits
  "Banana": { protein: 1.3, carbs: 27, fats: 0.3, calories: 105, unit: "unidade" },
  "Maçã": { protein: 0.3, carbs: 14, fats: 0.2, calories: 52, unit: "unidade" },
  "Abacate": { protein: 2, carbs: 9, fats: 15, calories: 160, unit: "100g" },
  "Morango": { protein: 0.7, carbs: 8, fats: 0.3, calories: 32, unit: "100g" },
  "Manga": { protein: 0.8, carbs: 15, fats: 0.4, calories: 60, unit: "100g" },
  "Laranja": { protein: 0.9, carbs: 12, fats: 0.1, calories: 47, unit: "unidade" },

  // Nuts & Seeds
  "Castanhas": { protein: 15, carbs: 30, fats: 54, calories: 607, unit: "100g" },
  "Amendoim": { protein: 26, carbs: 16, fats: 49, calories: 567, unit: "100g" },
  "Amêndoas": { protein: 21, carbs: 22, fats: 50, calories: 579, unit: "100g" },
  "Nozes": { protein: 15, carbs: 14, fats: 65, calories: 654, unit: "100g" },
  "Sementes de chia": { protein: 17, carbs: 42, fats: 31, calories: 486, unit: "30g" },
  "Sementes de linhaça": { protein: 18, carbs: 29, fats: 42, calories: 534, unit: "30g" },

  // Spreads & Sauces
  "Pasta de amendoim": { protein: 5, carbs: 4, fats: 10, calories: 120, unit: "20g" },
  "Hummus": { protein: 8, carbs: 14, fats: 10, calories: 166, unit: "100g" },
  "Tahini": { protein: 17, carbs: 21, fats: 54, calories: 595, unit: "100g" },

  // Milk Alternatives
  "Leite de soja": { protein: 3.3, carbs: 4, fats: 1.8, calories: 54, unit: "250ml" },
  "Leite de aveia": { protein: 1, carbs: 16, fats: 3, calories: 120, unit: "250ml" },
  "Leite de amêndoas": { protein: 1, carbs: 2, fats: 2.5, calories: 30, unit: "250ml" },
  "Iogurte de soja": { protein: 3.5, carbs: 6, fats: 2, calories: 60, unit: "100g" },

  // Snacks & Treats
  "Granola": { protein: 10, carbs: 65, fats: 10, calories: 471, unit: "100g" },
  "Barra de cereal": { protein: 2, carbs: 18, fats: 3, calories: 110, unit: "unidade" },
  "Pipoca": { protein: 3.2, carbs: 13, fats: 0.4, calories: 31, unit: "100g" },

  // Pasta & Bread
  "Massas integrais": { protein: 5, carbs: 26, fats: 0.5, calories: 124, unit: "100g" },
  "Pão integral": { protein: 9, carbs: 41, fats: 4, calories: 247, unit: "100g" },

  // Others
  "Salada": { protein: 1.5, carbs: 5, fats: 0.3, calories: 25, unit: "porção" },
  "Sopa de legumes": { protein: 2, carbs: 8, fats: 1, calories: 50, unit: "porção" },
  "Hambúrguer vegetal": { protein: 18, carbs: 15, fats: 8, calories: 200, unit: "unidade" },
  "Cogumelos": { protein: 3.1, carbs: 3.3, fats: 0.3, calories: 22, unit: "100g" },
};

export const fullFoodNames = Object.keys(foodDatabase);
