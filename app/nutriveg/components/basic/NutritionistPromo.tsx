import React from "react";
import { Users } from "lucide-react";
import { tokens } from "../../styles/tokens";

export const NutritionistPromo: React.FC = () => {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${tokens.colors.blue}15, ${tokens.colors.purple}15)`,
        padding: tokens.space.xxl,
        borderRadius: tokens.radii.xl,
        border: `2px solid ${tokens.colors.blue}30`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: tokens.space.md,
              marginBottom: tokens.space.md,
            }}
          >
            <Users size={28} color={tokens.colors.blue} />
            <h3
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: tokens.colors.text,
                margin: 0,
              }}
            >
              Quer um Plano Personalizado?
            </h3>
          </div>
          <p
            style={{
              fontSize: 16,
              color: tokens.colors.textMuted,
              marginBottom: 0,
            }}
          >
            Consulte um nutricionista vegano para um acompanhamento profissional
            completo
          </p>
        </div>
        <button
          style={{
            padding: `${tokens.space.lg}px ${tokens.space.xxl}px`,
            background: tokens.colors.blue,
            color: "white",
            border: "none",
            borderRadius: tokens.radii.lg,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: `0 8px 24px ${tokens.colors.blue}40`,
            whiteSpace: "nowrap",
          }}
        >
          Ver Profissionais →
        </button>
      </div>
    </div>
  );
};
