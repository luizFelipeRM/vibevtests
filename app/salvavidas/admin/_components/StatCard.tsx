"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div
      style={{
        background: colors.white,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.xl,
        padding: space.lg,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: fontSizes.sm, color: colors.text_secondary, marginBottom: space.sm }}>
          {title}
        </div>
        <div style={{ fontSize: fontSizes["2xl"], fontWeight: fontWeights.black, color: colors.text_primary, marginBottom: space.xs }}>
          {value}
        </div>
        {change !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: space.xs }}>
            {isPositive && <TrendingUp size={fontSizes.md} color={colors.piecharts.light_green} />}
            {isNegative && <TrendingDown size={fontSizes.md} color={colors.red} />}
            <span
              style={{
                fontSize: fontSizes.xs,
                fontWeight: fontWeights.semibold,
                color: isPositive ? colors.piecharts.light_green : isNegative ? colors.red : colors.text_secondary,
              }}
            >
              {isPositive ? "+" : ""}{change}% vs mês anterior
            </span>
          </div>
        )}
      </div>
      <div
        style={{
          width: sizes["4xl"],
          height: sizes["4xl"],
          borderRadius: radius.lg,
          background: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={fontSizes["2xl"]} color={color} />
      </div>
    </div>
  );
};
