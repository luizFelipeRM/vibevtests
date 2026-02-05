import { Macros } from "../types";

/**
 * Distribuição ideal de macronutrientes para dieta plant-based
 * Valores em porcentagem de calorias totais
 */
export const idealRatios = {
  protein: { min: 25, max: 35, ideal: 30 }, // % de calorias
  carbs: { min: 45, max: 65, ideal: 50 },
  fats: { min: 15, max: 30, ideal: 20 },
} as const;

export type MacroValidationStatus = "ideal" | "acceptable" | "needs-adjustment";

export interface MacroValidationResult {
  status: MacroValidationStatus;
  feedback: string[];
  percentages: {
    protein: number;
    carbs: number;
    fats: number;
  };
  evaluations: {
    protein: "ideal" | "acceptable" | "low" | "high";
    carbs: "ideal" | "acceptable" | "low" | "high";
    fats: "ideal" | "acceptable" | "low" | "high";
  };
}

/**
 * Calcula a porcentagem de calorias de cada macronutriente
 */
function calculateMacroPercentages(macros: Macros) {
  const totalCalories = macros.calories;

  if (totalCalories === 0) {
    return { protein: 0, carbs: 0, fats: 0 };
  }

  // Cada grama: proteína = 4 kcal, carbos = 4 kcal, lipídios = 9 kcal
  const proteinCalories = macros.protein * 4;
  const carbsCalories = macros.carbs * 4;
  const fatsCalories = macros.fats * 9;

  return {
    protein: (proteinCalories / totalCalories) * 100,
    carbs: (carbsCalories / totalCalories) * 100,
    fats: (fatsCalories / totalCalories) * 100,
  };
}

/**
 * Avalia se um macronutriente está no range ideal, aceitável ou fora do range
 */
function evaluateMacro(
  percentage: number,
  ranges: { min: number; max: number; ideal: number }
): "ideal" | "acceptable" | "low" | "high" {
  const tolerance = 5; // ±5% ao redor do ideal

  // Ideal: dentro de ±5% do valor ideal
  if (
    percentage >= ranges.ideal - tolerance &&
    percentage <= ranges.ideal + tolerance
  ) {
    return "ideal";
  }

  // Aceitável: dentro do range min-max
  if (percentage >= ranges.min && percentage <= ranges.max) {
    return "acceptable";
  }

  // Fora do range
  return percentage < ranges.min ? "low" : "high";
}

/**
 * Valida a distribuição de macronutrientes
 * Retorna status geral e feedback detalhado
 */
export function validateMacroDistribution(macros: Macros): MacroValidationResult {
  const percentages = calculateMacroPercentages(macros);

  const evaluations = {
    protein: evaluateMacro(percentages.protein, idealRatios.protein),
    carbs: evaluateMacro(percentages.carbs, idealRatios.carbs),
    fats: evaluateMacro(percentages.fats, idealRatios.fats),
  };

  // Determinar status geral
  const idealCount = Object.values(evaluations).filter((e) => e === "ideal").length;
  const acceptableCount = Object.values(evaluations).filter(
    (e) => e === "acceptable"
  ).length;
  const problemCount = Object.values(evaluations).filter(
    (e) => e === "low" || e === "high"
  ).length;

  let status: MacroValidationStatus;
  if (idealCount === 3) {
    status = "ideal";
  } else if (problemCount === 0) {
    status = "acceptable";
  } else {
    status = "needs-adjustment";
  }

  // Gerar feedback
  const feedback: string[] = [];

  if (evaluations.protein === "low") {
    feedback.push(
      "Proteína baixa. Inclua mais leguminosas, tofu, tempeh ou proteína texturizada."
    );
  } else if (evaluations.protein === "high") {
    feedback.push(
      "Proteína alta. Balance com mais carboidratos complexos e vegetais."
    );
  }

  if (evaluations.carbs === "low") {
    feedback.push(
      "Carboidratos baixos. Adicione mais grãos integrais, frutas e tubérculos."
    );
  } else if (evaluations.carbs === "high") {
    feedback.push(
      "Carboidratos altos. Reduza porções e balance com proteínas e gorduras."
    );
  }

  if (evaluations.fats === "low") {
    feedback.push(
      "Lipídios baixos. Inclua oleaginosas, sementes, abacate ou azeite."
    );
  } else if (evaluations.fats === "high") {
    feedback.push(
      "Lipídios altos. Modere oleaginosas e use menos óleo no preparo."
    );
  }

  if (status === "ideal") {
    feedback.push("Distribuição ideal de macronutrientes! Continue assim.");
  } else if (status === "acceptable" && feedback.length === 0) {
    feedback.push("Distribuição aceitável. Pequenos ajustes podem otimizar ainda mais.");
  }

  return {
    status,
    feedback,
    percentages,
    evaluations,
  };
}
