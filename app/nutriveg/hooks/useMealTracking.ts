import { useState, useCallback } from "react";
import { Meals, MealType } from "../types";

export const useMealTracking = () => {
  const [meals, setMeals] = useState<Meals>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const addFood = useCallback((meal: MealType, food: string) => {
    setMeals((prev) => {
      if (prev[meal].includes(food)) return prev;
      return {
        ...prev,
        [meal]: [...prev[meal], food],
      };
    });
  }, []);

  const removeFood = useCallback((meal: MealType, food: string) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((f) => f !== food),
    }));
  }, []);

  const clearMeal = useCallback((meal: MealType) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: [],
    }));
  }, []);

  const resetAllMeals = useCallback(() => {
    setMeals({
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    });
  }, []);

  return {
    meals,
    addFood,
    removeFood,
    clearMeal,
    resetAllMeals,
  };
};
