import { useState, useCallback, useEffect } from "react";
import { Macros, DailyLog, LogEntry, MealType } from "../types";
import { formatDate } from "../utils/dateHelpers";
import { emptyMacros, multiplyMacros } from "../utils/macroCalculations";
import { saveDailyLogs, loadDailyLogs } from "../utils/localStorage";
import { foodDatabase } from "../data/foodDatabase";

export const useFitnessTracking = () => {
  const [dailyLogs, setDailyLogs] = useState<DailyLog>(() => {
    // Carregar dados do localStorage na inicialização
    const saved = loadDailyLogs();
    if (!saved) return {};

    // Migração de dados legados (se necessário)
    const migrated: DailyLog = {};
    if (Object.keys(saved).length === 0) {
      // Injetar dados mockados para desenvolvimento se estiver vazio
      const today = new Date();
      for (let i = 1; i <= 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = formatDate(d);
        migrated[key] = {
          totals: {
            protein: Math.floor(Math.random() * 50) + 100,
            carbs: Math.floor(Math.random() * 100) + 200,
            fats: Math.floor(Math.random() * 30) + 50,
            calories: Math.floor(Math.random() * 500) + 2000,
          },
          items: [
            { id: "mock-1", name: "Mock Meal", quantity: 1, unit: "porção", protein: 50, carbs: 100, fats: 25, calories: 1000, meal: "lunch" }
          ]
        };
      }
    } else {
      Object.entries(saved).forEach(([date, data]: [string, any]) => {
        if (data.totals && data.items) {
          migrated[date] = data;
        } else {
          // Formato antigo
          migrated[date] = {
            totals: {
              protein: data.protein || 0,
              carbs: data.carbs || 0,
              fats: data.fats || 0,
              calories: data.calories || 0,
            },
            items: [],
          };
        }
      });
    }
    return migrated;
  });
  const [currentMacros, setCurrentMacros] = useState<Macros>(emptyMacros());
  const [currentItems, setCurrentItems] = useState<LogEntry[]>([]);

  // Sincronizar dailyLogs com localStorage sempre que mudar
  useEffect(() => {
    saveDailyLogs(dailyLogs);
  }, [dailyLogs]);

  const loadDateData = useCallback((date: Date) => {
    const dateKey = formatDate(date);
    if (dailyLogs[dateKey]) {
      setCurrentMacros(dailyLogs[dateKey].totals);
      setCurrentItems(dailyLogs[dateKey].items);
    } else {
      setCurrentMacros(emptyMacros());
      setCurrentItems([]);
    }
  }, [dailyLogs]);

  const saveDateData = useCallback((date: Date, totals: Macros, items: LogEntry[]) => {
    const dateKey = formatDate(date);
    setDailyLogs((prev) => ({
      ...prev,
      [dateKey]: { totals, items },
    }));
  }, []);

  const addFoodToDate = useCallback((date: Date, foodName: string, macrosToAdd: Macros, quantity: number, unit: string, meal?: MealType) => {
    const dateKey = formatDate(date);
    const log = dailyLogs[dateKey] || { totals: emptyMacros(), items: [] };

    const newEntry: LogEntry = {
      id: crypto.randomUUID(),
      name: foodName,
      quantity,
      unit,
      meal,
      ...macrosToAdd
    };

    const newItems = [...log.items, newEntry];
    const newTotals = {
      protein: parseFloat((log.totals.protein + macrosToAdd.protein).toFixed(1)),
      carbs: parseFloat((log.totals.carbs + macrosToAdd.carbs).toFixed(1)),
      fats: parseFloat((log.totals.fats + macrosToAdd.fats).toFixed(1)),
      calories: Math.round(log.totals.calories + macrosToAdd.calories),
    };

    setCurrentMacros(newTotals);
    setCurrentItems(newItems);
    saveDateData(date, newTotals, newItems);
  }, [dailyLogs, saveDateData]);

  const removeFoodFromDate = useCallback((date: Date, entryId: string) => {
    const dateKey = formatDate(date);
    const log = dailyLogs[dateKey];
    if (!log) return;

    const entryToRemove = log.items.find(item => item.id === entryId);
    if (!entryToRemove) return;

    const newItems = log.items.filter(item => item.id !== entryId);
    const newTotals = {
      protein: parseFloat((log.totals.protein - entryToRemove.protein).toFixed(1)),
      carbs: parseFloat((log.totals.carbs - entryToRemove.carbs).toFixed(1)),
      fats: parseFloat((log.totals.fats - entryToRemove.fats).toFixed(1)),
      calories: Math.round(log.totals.calories - entryToRemove.calories),
    };

    setCurrentMacros(newTotals);
    setCurrentItems(newItems);
    saveDateData(date, newTotals, newItems);
  }, [dailyLogs, saveDateData]);

  const updateFoodQuantity = useCallback((date: Date, entryId: string, newQuantity: number) => {
    const dateKey = formatDate(date);
    const log = dailyLogs[dateKey];
    if (!log) return;

    const entryToUpdate = log.items.find(item => item.id === entryId);
    if (!entryToUpdate) return;

    const foodBase = foodDatabase[entryToUpdate.name];
    if (!foodBase) return;

    const newMacros = multiplyMacros(foodBase, newQuantity);

    const newItems = log.items.map(item =>
      item.id === entryId ? { ...item, quantity: newQuantity, ...newMacros } : item
    );

    // Recalcular totais para garantir consistência
    const newTotals = newItems.reduce((acc, item) => ({
      protein: parseFloat((acc.protein + item.protein).toFixed(1)),
      carbs: parseFloat((acc.carbs + item.carbs).toFixed(1)),
      fats: parseFloat((acc.fats + item.fats).toFixed(1)),
      calories: Math.round(acc.calories + item.calories),
    }), emptyMacros());

    setCurrentMacros(newTotals);
    setCurrentItems(newItems);
    saveDateData(date, newTotals, newItems);
  }, [dailyLogs, saveDateData]);

  return {
    dailyLogs,
    currentMacros,
    currentItems,
    addFoodToDate,
    removeFoodFromDate,
    updateFoodQuantity,
    loadDateData,
    saveDateData,
    setCurrentMacros,
  };
};
