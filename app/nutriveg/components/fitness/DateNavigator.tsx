import React from "react";
import { tokens } from "../../styles/tokens";

interface DateNavigatorProps {
  dateLabel: string;
  weekdayLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({
  dateLabel,
  weekdayLabel,
  onPrevious,
  onNext,
  onToday,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: tokens.space.md,
        background: "white",
        padding: tokens.space.md,
        borderRadius: tokens.radii.lg,
        border: `2px solid ${tokens.colors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <button
        onClick={onPrevious}
        style={{
          width: 36,
          height: 36,
          borderRadius: tokens.radii.sm,
          background: tokens.colors.bg,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 18,
          color: tokens.colors.text,
        }}
      >
        ‹
      </button>
      <div style={{ minWidth: 140, textAlign: "center" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: tokens.colors.text,
          }}
        >
          {dateLabel}
        </div>
        <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>
          {weekdayLabel}
        </div>
      </div>
      <button
        onClick={onNext}
        style={{
          width: 36,
          height: 36,
          borderRadius: tokens.radii.sm,
          background: tokens.colors.bg,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 18,
          color: tokens.colors.text,
        }}
      >
        ›
      </button>
      <div
        style={{
          width: 1,
          height: 32,
          background: tokens.colors.border,
          margin: `0 ${tokens.space.sm}px`,
        }}
      />
      <button
        onClick={onToday}
        style={{
          padding: `${tokens.space.sm}px ${tokens.space.md}px`,
          background: tokens.colors.primary,
          color: "white",
          border: "none",
          borderRadius: tokens.radii.sm,
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Hoje
      </button>
    </div>
  );
};
