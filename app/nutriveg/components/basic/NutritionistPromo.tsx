import React from "react";
import { Users } from "lucide-react";
import { tokens } from "../../styles/tokens";

export const NutritionistPromo: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: tokens.space.xl,
        marginTop: tokens.space.sm,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: tokens.colors.bg,
            borderRadius: tokens.radii.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Users size={18} color={tokens.colors.textMuted} />
        </div>
        <p style={{ fontSize: 13, color: tokens.colors.textMuted, margin: 0, fontWeight: 500 }}>
          Precisa de um plano profissional e individualizado?
        </p>
      </div>
      <button
        style={{
          padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
          background: tokens.colors.text,
          color: "white",
          border: "none",
          borderRadius: tokens.radii.md,
          fontSize: 12,
          fontWeight: 800,
          cursor: "pointer",
          transition: "all 0.2s",
          letterSpacing: "0.02em",
          textTransform: "uppercase"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Consultar Nutricionistas
      </button>
    </div>
  );
};
