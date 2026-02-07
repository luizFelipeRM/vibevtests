import React from "react";
import { Macros, DailyLog, Mode } from "../../types";
import { targetMacros } from "../../data/constants";
import { MacroDistribution } from "../fitness/MacroDistribution";
import { WeeklyProgress } from "../fitness/WeeklyProgress";
import { tokens } from "../../styles/tokens";

interface ChartsSectionProps {
  mode: Mode;
  currentMacros: Macros;
  dailyLogs: DailyLog;
  currentDate: Date;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  mode,
  currentMacros,
  dailyLogs,
  currentDate,
}) => {
  const isFitness = mode === "fitness";
  const cardStyle = {
    background: "white",
    padding: tokens.space.xl,
    borderRadius: tokens.radii.xl,
    border: `1px solid ${tokens.colors.border}`,
    boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
    height: "100%",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: tokens.space.xl,
    color: tokens.colors.text,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.xl }}>
      <div style={cardStyle}>
        <h3 style={titleStyle}>
          Distribuição de Macros
        </h3>
        <MacroDistribution mode={mode} macros={currentMacros} targets={targetMacros} />
      </div>

      {isFitness && (
        <div style={cardStyle}>
          <h3 style={titleStyle}>
            Progresso Semanal
          </h3>
          <WeeklyProgress
            currentMacros={currentMacros}
            targetMacros={targetMacros}
            dailyLogs={dailyLogs}
            currentDate={currentDate}
          />
        </div>
      )}
    </div>
  );
};
