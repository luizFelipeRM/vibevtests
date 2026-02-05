import React from "react";
import { tokens } from "../../styles/tokens";

interface QuickFoodButtonsProps {
  foods: string[];
  onSelect: (food: string) => void;
}

export const QuickFoodButtons: React.FC<QuickFoodButtonsProps> = ({
  foods,
  onSelect,
}) => {
  return (
    <div
      style={{
        background: "white",
        padding: tokens.space.xl,
        borderRadius: tokens.radii.lg,
        border: `2px solid ${tokens.colors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          marginBottom: tokens.space.lg,
          color: tokens.colors.text,
        }}
      >
        ⚡ Alimentos Populares
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: tokens.space.sm,
        }}
      >
        {foods.map((food) => (
          <button
            key={food}
            onClick={() => onSelect(food)}
            style={{
              padding: `${tokens.space.md}px`,
              background: tokens.colors.bg,
              border: "none",
              borderRadius: tokens.radii.md,
              fontSize: 13,
              fontWeight: 600,
              color: tokens.colors.text,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `${tokens.colors.primary}20`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = tokens.colors.bg)
            }
          >
            {food}
          </button>
        ))}
      </div>
    </div>
  );
};
