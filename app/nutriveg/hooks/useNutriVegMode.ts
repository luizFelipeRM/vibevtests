import { useState, useCallback } from "react";
import { Mode } from "../types";

export const useNutriVegMode = () => {
  const [mode, setMode] = useState<Mode>("basic");

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "basic" ? "fitness" : "basic"));
  }, []);

  const setBasicMode = useCallback(() => {
    setMode("basic");
  }, []);

  const setFitnessMode = useCallback(() => {
    setMode("fitness");
  }, []);

  const isBasic = mode === "basic";
  const isFitness = mode === "fitness";

  return {
    mode,
    toggleMode,
    setBasicMode,
    setFitnessMode,
    isBasic,
    isFitness,
  };
};
