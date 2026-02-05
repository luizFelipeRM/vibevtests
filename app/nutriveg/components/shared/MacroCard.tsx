import React from "react";
import { LucideIcon } from "lucide-react";
import { tokens } from "../../styles/tokens";

interface MacroCardProps {
  name: string;
  current: number;
  percentage: number;
  ideal: string;
  color: string;
  icon: LucideIcon;
}

export const MacroCard: React.FC<MacroCardProps> = ({
  name,
  current,
  percentage,
  ideal,
  color,
  icon: Icon,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.space.md,
        background: `${color}08`,
        borderRadius: tokens.radii.md,
        border: `1px solid ${color}20`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radii.sm,
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: tokens.colors.text }}>
            {name}
          </div>
          <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>
            Ideal: {ideal}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color }}>{percentage}%</div>
        <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>
          {current}g
        </div>
      </div>
    </div>
  );
};
