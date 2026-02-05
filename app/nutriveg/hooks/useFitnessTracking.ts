import { useState, useCallback, useEffect } from "react";
import { Macros, DailyLog } from "../types";
import { formatDate } from "../utils/dateHelpers";
import { emptyMacros } from "../utils/macroCalculations";
import { saveDailyLogs, loadDailyLogs } from "../utils/localStorage";

export const useFitnessTracking = () => {
  const [dailyLogs, setDailyLogs] = useState<DailyLog>(() => {
    // Carregar dados do localStorage na inicialização
    const saved = loadDailyLogs();
    return saved || {};
  });
  const [currentMacros, setCurrentMacros] = useState<Macros>(emptyMacros());

  // Sincronizar dailyLogs com localStorage sempre que mudar
  useEffect(() => {
    saveDailyLogs(dailyLogs);
  }, [dailyLogs]);

  const loadDateData = useCallback((date: Date) => {
    const dateKey = formatDate(date);
    if (dailyLogs[dateKey]) {
      setCurrentMacros(dailyLogs[dateKey]);
    } else {
      setCurrentMacros(emptyMacros());
    }
  }, [dailyLogs]);

  const saveDateData = useCallback((date: Date, macros: Macros) => {
    const dateKey = formatDate(date);
    setDailyLogs((prev) => ({
      ...prev,
      [dateKey]: macros,
    }));
  }, []);

  const addFoodToDate = useCallback((date: Date, macrosToAdd: Macros) => {
    const newMacros = {
      protein: parseFloat((currentMacros.protein + macrosToAdd.protein).toFixed(1)),
      carbs: parseFloat((currentMacros.carbs + macrosToAdd.carbs).toFixed(1)),
      fats: parseFloat((currentMacros.fats + macrosToAdd.fats).toFixed(1)),
      calories: Math.round(currentMacros.calories + macrosToAdd.calories),
    };

    setCurrentMacros(newMacros);
    saveDateData(date, newMacros);
  }, [currentMacros, saveDateData]);

  return {
    dailyLogs,
    currentMacros,
    addFoodToDate,
    loadDateData,
    saveDateData,
    setCurrentMacros,
  };
};
