import React from "react";
import { motion } from "framer-motion";
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { radius } from "@/design/radius";
import { fontSizes } from "@/design/fontSizes";
import { fontWeights } from "@/design/fontWeights";
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
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
        color: colors.text_primary,
        cursor: tooltipBrief ? "help" : "default",
      }}
    >
      {label}
    </span>
  );

  return (
    <div style={{ marginBottom: space.lg }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: space.sm,
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
        <span style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.bold, color }}>
          {parseFloat(current.toFixed(1))}g / {target}g
        </span>
      </div>
      <div
        style={{
          height: 10,
          background: colors.surface_alt,
          borderRadius: radius.full,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          style={{
            height: "100%",
            background: color,
            borderRadius: radius.full,
            transition: "width 0.5s ease",
            boxShadow: `inset 0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  );
};
