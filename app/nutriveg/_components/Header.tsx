import React from "react";
import { Leaf, Search, Bell, User } from "lucide-react";
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { radius } from "@/design/radius";
import { fontSizes } from "@/design/fontSizes";
import { fontWeights } from "@/design/fontWeights";
import { sizes } from "@/design/sizes";

export const Header: React.FC = () => {
  return (
    <header
      style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary_dark})`,
        color: colors.white,
        padding: `${space.lg}px ${space.xl}px`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: space.xl,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: space.md }}>
          <div
            style={{
              width: sizes["4xl"],
              height: sizes["4xl"],
              borderRadius: radius.xl,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={sizes.xl} fill={colors.white} color={colors.white} />
          </div>
          <div>
            <h1 style={{ fontSize: fontSizes["2xl"], fontWeight: fontWeights.black, margin: 0 }}>NutriVeg</h1>
            <p style={{ fontSize: fontSizes.xs, margin: 0, opacity: 0.9 }}>
              Nutrição Vegana Inteligente
            </p>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 600 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: radius.full,
              padding: `${space.sm}px ${space.lg}px`,
              display: "flex",
              alignItems: "center",
              gap: space.md,
            }}
          >
            <Search size={fontSizes.xl} />
            <input
              type="text"
              placeholder="Buscar alimentos..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: colors.white,
                fontSize: fontSizes.sm,
                flex: 1,
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: space.md, alignItems: "center" }}>
          <button
            style={{
              width: sizes["3xl"],
              height: sizes["3xl"],
              borderRadius: radius.full,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={fontSizes.xl} color={colors.white} />
          </button>
          <button
            style={{
              width: sizes["3xl"],
              height: sizes["3xl"],
              borderRadius: radius.full,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={fontSizes.xl} color={colors.white} />
          </button>
        </div>
      </div>
    </header>
  );
};
