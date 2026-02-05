import React from "react";
import { motion } from "framer-motion";
import { tokens } from "../../styles/tokens";

interface MacroData {
  name: string;
  percentage: number;
  color: string;
}

interface MacroChartProps {
  macrosData: MacroData[];
  totalGrams: number;
}

export const MacroChart: React.FC<MacroChartProps> = ({
  macrosData,
  totalGrams,
}) => {
  return (
    <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto" }}>
      <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={tokens.colors.bg}
          strokeWidth="20"
        />

        {/* Animated segments */}
        {(() => {
          let offset = 0;
          return macrosData.map((macro) => {
            const circumference = 2 * Math.PI * 40;
            const segmentLength = (macro.percentage / 100) * circumference;
            const currentOffset = offset;
            offset += segmentLength;

            return (
              <motion.circle
                key={macro.name}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={macro.color}
                strokeWidth="20"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={-currentOffset}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{
                  strokeDasharray: `${segmentLength} ${
                    circumference - segmentLength
                  }`,
                }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            );
          });
        })()}
      </svg>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: tokens.colors.textMuted,
            marginBottom: 4,
          }}
        >
          TOTAL
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: tokens.colors.text }}>
          {totalGrams}g
        </div>
        <div style={{ fontSize: 13, color: tokens.colors.textMuted }}>macros</div>
      </div>
    </div>
  );
};
