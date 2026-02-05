import React from "react";
import { motion } from "framer-motion";
import { tokens } from "../../styles/tokens";
import { MacroTooltip } from "./MacroTooltip";

interface MacroProgressBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
  tooltipBrief?: string;
  tooltipDetailed?: string;
}

export const MacroProgressBar: React.FC<MacroProgressBarProps> = ({
  label,
  current,
  target,
  color,
  tooltipBrief,
  tooltipDetailed,
}) => {
  const percentage = Math.min((current / target) * 100, 100);

  const labelElement = (
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: tokens.colors.text,
        cursor: tooltipBrief ? "help" : "default",
      }}
    >
      {label}
    </span>
  );

  return (
    <div style={{ marginBottom: tokens.space.lg }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: tokens.space.sm,
        }}
      >
        {tooltipBrief && tooltipDetailed ? (
          <MacroTooltip
            label={label}
            brief={tooltipBrief}
            detailed={tooltipDetailed}
          >
            {labelElement}
          </MacroTooltip>
        ) : (
          labelElement
        )}
        <span style={{ fontSize: 13, fontWeight: 700, color }}>
          {parseFloat(current.toFixed(1))}g / {target}g
        </span>
      </div>
      <div
        style={{
          height: 10,
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
            background: color,
            borderRadius: tokens.radii.full,
            transition: "width 0.5s ease",
            boxShadow: `inset 0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  );
};
