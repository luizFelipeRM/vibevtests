import React from "react";
import { Apple, Dumbbell } from "lucide-react";
import { Mode } from "../types";
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { radius } from "@/design/radius";
import { fontSizes } from "@/design/fontSizes";
import { fontWeights } from "@/design/fontWeights";

interface ModeToggleProps {
  currentMode: Mode;
  onModeChange: () => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        background: colors.white,
        borderRadius: radius.full,
        padding: space.xs,
        gap: space.xs,
        border: `2px solid ${colors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <button
        onClick={currentMode === "fitness" ? onModeChange : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: space.sm,
          padding: `${space.sm}px ${space.lg}px`,
          background:
            currentMode === "basic"
              ? `linear-gradient(135deg, ${colors.primary}, ${colors.primary_dark})`
              : "transparent",
          color: currentMode === "basic" ? colors.white : colors.text_secondary,
          border: "none",
          borderRadius: radius.full,
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.bold,
          cursor: currentMode === "fitness" ? "pointer" : "default",
          transition: "all 0.2s ease",
        }}
      >
        <Apple size={fontSizes.md} />
        Básico
      </button>
      <button
        onClick={currentMode === "basic" ? onModeChange : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: space.sm,
          padding: `${space.sm}px ${space.lg}px`,
          background:
            currentMode === "fitness"
              ? `linear-gradient(135deg, ${colors.piecharts.royal_blue}, #1d4ed8)`
              : "transparent",
          color: currentMode === "fitness" ? colors.white : colors.text_secondary,
          border: "none",
          borderRadius: radius.full,
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.bold,
          cursor: currentMode === "basic" ? "pointer" : "default",
          transition: "all 0.2s ease",
        }}
      >
        <Dumbbell size={fontSizes.md} />
        Fitness
      </button>
    </div>
  );
};
