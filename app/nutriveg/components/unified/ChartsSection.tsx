import React from "react";
import { Macros, DailyLog } from "../../types";
import { targetMacros } from "../../data/constants";
import { MacroDistribution } from "../fitness/MacroDistribution";
import { WeeklyProgress } from "../fitness/WeeklyProgress";

interface ChartsSectionProps {
  currentMacros: Macros;
  dailyLogs: DailyLog;
  currentDate: Date;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  currentMacros,
  dailyLogs,
  currentDate,
}) => {
  return (
    <div>
      <MacroDistribution macros={currentMacros} targets={targetMacros} />
      <WeeklyProgress
        currentMacros={currentMacros}
        targetMacros={targetMacros}
        dailyLogs={dailyLogs}
        currentDate={currentDate}
      />
    </div>
  );
};
