import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Macros, MacroTarget, DailyLog } from "../../types";
import { tokens } from "../../styles/tokens";
import { getLast7Days } from "../../utils/weeklyDataHelpers";

interface WeeklyProgressProps {
  currentMacros: Macros;
  targetMacros: MacroTarget;
  dailyLogs: DailyLog;
  currentDate: Date;
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({
  currentMacros,
  targetMacros,
  dailyLogs,
  currentDate,
}) => {
  const weeklyData = useMemo(
    () => getLast7Days(currentDate, dailyLogs, targetMacros.calories),
    [currentDate, dailyLogs, targetMacros.calories]
  );
  return (
    <div
      style={{
        background: "white",
        padding: tokens.space.xl,
        borderRadius: tokens.radii.lg,
        border: `2px solid ${tokens.colors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          marginBottom: tokens.space.xl,
          color: tokens.colors.text,
        }}
      >
        📊 Progresso Semanal
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: tokens.space.sm,
          height: 120,
        }}
      >
        {weeklyData.map((dayData, i) => {
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: tokens.space.sm,
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: tokens.colors.bg,
                  borderRadius: tokens.radii.sm,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${dayData.percentageComplete}%` }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    background: dayData.isToday
                      ? `linear-gradient(to top, ${tokens.colors.primary}, ${tokens.colors.primaryLight})`
                      : tokens.colors.border,
                    borderRadius: tokens.radii.sm,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: dayData.isToday ? 800 : 600,
                  color: dayData.isToday ? tokens.colors.primary : tokens.colors.textMuted,
                }}
              >
                {dayData.dayLabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
