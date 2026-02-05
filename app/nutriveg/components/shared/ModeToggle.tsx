import React from "react";
import { Apple, Dumbbell } from "lucide-react";
import { Mode } from "../../types";
import { tokens } from "../../styles/tokens";

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
        background: "white",
        borderRadius: tokens.radii.full,
        padding: tokens.space.xs,
        gap: tokens.space.xs,
        border: `2px solid ${tokens.colors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <button
        onClick={currentMode === "fitness" ? onModeChange : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.space.sm,
          padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
          background:
            currentMode === "basic"
              ? `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`
              : "transparent",
          color: currentMode === "basic" ? "white" : tokens.colors.textMuted,
          border: "none",
          borderRadius: tokens.radii.full,
          fontSize: 14,
          fontWeight: 700,
          cursor: currentMode === "fitness" ? "pointer" : "default",
          transition: "all 0.2s ease",
        }}
      >
        <Apple size={16} />
        Básico
      </button>
      <button
        onClick={currentMode === "basic" ? onModeChange : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.space.sm,
          padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
          background:
            currentMode === "fitness"
              ? `linear-gradient(135deg, ${tokens.colors.blue}, #1d4ed8)`
              : "transparent",
          color: currentMode === "fitness" ? "white" : tokens.colors.textMuted,
          border: "none",
          borderRadius: tokens.radii.full,
          fontSize: 14,
          fontWeight: 700,
          cursor: currentMode === "basic" ? "pointer" : "default",
          transition: "all 0.2s ease",
        }}
      >
        <Dumbbell size={16} />
        Fitness
      </button>
    </div>
  );
};
