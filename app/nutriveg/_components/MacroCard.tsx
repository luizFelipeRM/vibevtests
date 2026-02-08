import React from "react";
import { LucideIcon } from "lucide-react";
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { radius } from "@/design/radius";
import { fontSizes } from "@/design/fontSizes";
import { fontWeights } from "@/design/fontWeights";
import { sizes } from "@/design/sizes";

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
        padding: space.md,
        background: `${color}08`,
        borderRadius: radius.lg,
        border: `1px solid ${color}20`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: space.md }}>
        <div
          style={{
            width: sizes["2xl"],
            height: sizes["2xl"],
            borderRadius: radius.md,
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={fontSizes.xl} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontSize: fontSizes.md, fontWeight: fontWeights.bold, color: colors.text_primary }}>
            {name}
          </div>
          <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
            Ideal: {ideal}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: fontSizes.xl, fontWeight: fontWeights.black, color }}>{percentage}%</div>
        <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
          {current}g
        </div>
      </div>
    </div>
  );
};
