import { DailyLog } from "../types";
import { formatDate } from "./dateHelpers";

export interface WeeklyData {
  dayLabel: string;
  date: string;
  percentageComplete: number;
  isToday: boolean;
}

/**
 * Retorna os dados dos últimos 7 dias baseado nos logs diários
 * @param currentDate Data atual selecionada
 * @param dailyLogs Objeto com os logs diários
 * @param targetCalories Meta de calorias diária
 * @returns Array com dados dos últimos 7 dias
 */
export function getLast7Days(
  currentDate: Date,
  dailyLogs: DailyLog,
  targetCalories: number
): WeeklyData[] {
  const result: WeeklyData[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 6; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const dateKey = formatDate(date);
    const dayLog = dailyLogs[dateKey];

    // Se não tem log para este dia, considerar 0% completo
    const caloriesConsumed = dayLog?.calories || 0;
    const percentageComplete = targetCalories > 0
      ? Math.min((caloriesConsumed / targetCalories) * 100, 100)
      : 0;

    // Labels dos dias da semana
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const dayLabel = dayNames[date.getDay()];

    // Verificar se é hoje
    const isToday = date.getTime() === today.getTime();

    result.push({
      dayLabel,
      date: dateKey,
      percentageComplete,
      isToday,
    });
  }

  return result;
}
