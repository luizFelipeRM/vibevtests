import React from "react";
import { motion } from "framer-motion";
import { Flame, Dumbbell, Wheat, Droplet } from "lucide-react";
import { Macros, MacroTarget } from "../../types";
import { tokens } from "../../styles/tokens";
import { calculateMacroPercentage, calculateRemaining } from "../../utils/macroCalculations";
import { MacroTooltip } from "../shared/MacroTooltip";
import { macroExplanations } from "../../data/macroExplanations";

interface MacroSummaryCardsProps {
  macros: Macros;
  targets: MacroTarget;
}

export const MacroSummaryCards: React.FC<MacroSummaryCardsProps> = ({
  macros,
  targets,
}) => {
  const items = [
    {
      label: "Calorias",
      current: macros.calories,
      target: targets.calories,
      unit: "kcal",
      color: tokens.colors.orange,
      icon: Flame,
      explanationKey: "calories" as const,
    },
    {
      label: "Proteína",
      current: macros.protein,
      target: targets.protein,
      unit: "g",
      color: tokens.colors.red,
      icon: Dumbbell,
      explanationKey: "protein" as const,
    },
    {
      label: "Carbos",
      current: macros.carbs,
      target: targets.carbs,
      unit: "g",
      color: tokens.colors.blue,
      icon: Wheat,
      explanationKey: "carbs" as const,
    },
    {
      label: "Lipídios",
      current: macros.fats,
      target: targets.fats,
      unit: "g",
      color: tokens.colors.yellow,
      icon: Droplet,
      explanationKey: "fats" as const,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: tokens.space.md,
        marginBottom: tokens.space.xl,
      }}
    >
      {items.map((macro) => {
        const Icon = macro.icon;
        const percentage = calculateMacroPercentage(macro.current, macro.target);
        const remaining = calculateRemaining(macro.current, macro.target);

        return (
          <div
            key={macro.label}
            style={{
              background: "white",
              padding: tokens.space.lg,
              borderRadius: tokens.radii.lg,
              border: `2px solid ${tokens.colors.border}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <MacroTooltip
              label={macro.label}
              brief={macroExplanations[macro.explanationKey].brief}
              detailed={macroExplanations[macro.explanationKey].detailed}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.sm,
                  marginBottom: tokens.space.md,
                  cursor: "help",
                }}
              >
                <Icon size={18} color={macro.color} />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: tokens.colors.textMuted,
                  }}
                >
                  {macro.label}
                </span>
              </div>
            </MacroTooltip>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: tokens.colors.text,
                marginBottom: tokens.space.xs,
              }}
            >
              {macro.unit === "kcal"
                ? macro.current
                : parseFloat(macro.current.toFixed(1))}
            </div>
            <div
              style={{
                fontSize: 12,
                color: tokens.colors.textMuted,
                marginBottom: tokens.space.sm,
              }}
            >
              de {macro.target} {macro.unit} • Falta:{" "}
              {macro.unit === "kcal"
                ? remaining
                : parseFloat(remaining.toFixed(1))}{" "}
              {macro.unit}
            </div>
            <div
              style={{
                height: 6,
                background: tokens.colors.bg,
                borderRadius: tokens.radii.full,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                style={{
                  height: "100%",
                  background: macro.color,
                  borderRadius: tokens.radii.full,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
