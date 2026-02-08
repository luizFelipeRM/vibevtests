import React from "react";
import { X } from "lucide-react";
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { radius } from "@/design/radius";
import { fontSizes } from "@/design/fontSizes";
import { fontWeights } from "@/design/fontWeights";
import { sizes } from "@/design/sizes";

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
        color: colors.white,
        padding: `${space.sm}px ${space.md}px`,
        borderRadius: radius.full,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.semibold,
        display: "flex",
        alignItems: "center",
        gap: space.sm,
      }}
    >
      {food}
      <button
        onClick={onRemove}
        style={{
          background: "rgba(255,255,255,0.3)",
          border: "none",
          borderRadius: "50%",
          width: sizes.sm,
          height: sizes.sm,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <X size={fontSizes.xs} color={colors.white} />
      </button>
    </div>
  );
};
