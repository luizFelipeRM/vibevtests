import React from "react";
import { X } from "lucide-react";
import { tokens } from "../../styles/tokens";

interface FoodPillProps {
  food: string;
  color: string;
  onRemove: () => void;
}

export const FoodPill: React.FC<FoodPillProps> = ({ food, color, onRemove }) => {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: `${tokens.space.sm}px ${tokens.space.md}px`,
        borderRadius: tokens.radii.pill,
        fontSize: 13,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: tokens.space.sm,
      }}
    >
      {food}
      <button
        onClick={onRemove}
        style={{
          background: "rgba(255,255,255,0.3)",
          border: "none",
          borderRadius: "50%",
          width: 18,
          height: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <X size={12} color="white" />
      </button>
    </div>
  );
};
