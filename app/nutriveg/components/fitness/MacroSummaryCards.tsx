import React from "react";
import { motion } from "framer-motion";
import { Flame, Dumbbell, Wheat, Droplet, Share2 } from "lucide-react";
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
          <motion.div
            key={macro.label}
            whileHover={{ translateY: -4 }}
            style={{
              background: "white",
              padding: tokens.space.xl,
              borderRadius: tokens.radii.xl,
              border: `1px solid ${tokens.colors.border}`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
            }}
          >
            <div>
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
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: tokens.radii.md,
                      background: `${macro.color}10`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon size={16} color={macro.color} />
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: tokens.colors.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {macro.label}
                  </span>
                  {percentage >= 100 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        background: tokens.colors.primary,
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontSize: 8,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        cursor: "pointer"
                      }}
                      whileHover={{ scale: 1.1 }}
                      title="Compartilhar Conquista!"
                    >
                      <Share2 size={10} /> SHARE
                    </motion.div>
                  )}
                </div>
              </MacroTooltip>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: tokens.colors.text,
                  marginBottom: tokens.space.xs,
                  letterSpacing: "-0.02em",
                }}
              >
                {macro.unit === "kcal"
                  ? macro.current
                  : parseFloat(macro.current.toFixed(1))}
                <span style={{ fontSize: 16, fontWeight: 500, color: tokens.colors.textMuted, marginLeft: 4 }}>
                  {macro.unit}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: tokens.colors.textMuted,
                  marginBottom: tokens.space.lg,
                  fontWeight: 500,
                }}
              >
                Meta: {macro.target} {macro.unit} • <span style={{ color: remaining > 0 ? tokens.colors.orange : tokens.colors.green }}>Falta: {macro.unit === "kcal" ? remaining : parseFloat(remaining.toFixed(1))} {macro.unit}</span>
              </div>
            </div>

            <div
              style={{
                height: 8,
                background: tokens.colors.bg,
                borderRadius: tokens.radii.full,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                style={{
                  height: "100%",
                  background: macro.color,
                  borderRadius: tokens.radii.full,
                  transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
