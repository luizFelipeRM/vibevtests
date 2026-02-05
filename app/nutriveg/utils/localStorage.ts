import { DailyLog } from "../types";

export const STORAGE_KEYS = {
  DAILY_LOGS: "nutriveg_daily_logs",
  RECENT_FOODS: "nutriveg_recent_foods",
} as const;

// Helper para verificar se estamos no browser
const isBrowser = typeof window !== "undefined";

/**
 * Salva os logs diários no localStorage
 */
export function saveDailyLogs(logs: DailyLog): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
  } catch (error) {
    console.error("Error saving daily logs to localStorage:", error);
  }
}

/**
 * Carrega os logs diários do localStorage
 */
export function loadDailyLogs(): DailyLog | null {
  if (!isBrowser) return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
    if (!stored) return null;

    return JSON.parse(stored) as DailyLog;
  } catch (error) {
    console.error("Error loading daily logs from localStorage:", error);
    return null;
  }
}

/**
 * Salva a lista de alimentos recentes no localStorage
 */
export function saveRecentFoods(foods: string[]): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEYS.RECENT_FOODS, JSON.stringify(foods));
  } catch (error) {
    console.error("Error saving recent foods to localStorage:", error);
  }
}

/**
 * Carrega a lista de alimentos recentes do localStorage
 */
export function loadRecentFoods(): string[] {
  if (!isBrowser) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_FOODS);
    if (!stored) return [];

    return JSON.parse(stored) as string[];
  } catch (error) {
    console.error("Error loading recent foods from localStorage:", error);
    return [];
  }
}

/**
 * Limpa todos os dados do localStorage (útil para debug/reset)
 */
export function clearAllData(): void {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.DAILY_LOGS);
    localStorage.removeItem(STORAGE_KEYS.RECENT_FOODS);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
