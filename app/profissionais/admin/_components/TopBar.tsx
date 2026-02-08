"use client";

import React from "react";
import { Bell, User, Search } from "lucide-react";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle }) => {
  return (
    <div
      style={{
        height: 80,
        background: colors.white,
        borderBottom: `1px solid ${colors.border}`,
        padding: `0 ${space.xl}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Title */}
      <div>
        <h1 style={{ fontSize: fontSizes["2xl"], fontWeight: fontWeights.bold, color: colors.text_primary, margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: fontSizes.sm, color: colors.text_secondary, margin: 0, marginTop: space.xs }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: space.md }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Buscar..."
            style={{
              width: 300,
              padding: `${space.sm}px ${space.lg}px ${space.sm}px ${space.xxl + space.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              fontSize: fontSizes.sm,
              outline: "none",
              background: colors.surface_alt,
            }}
          />
          <Search
            size={fontSizes.lg}
            color={colors.text_secondary}
            style={{
              position: "absolute",
              left: space.md,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Notifications */}
        <button
          style={{
            width: sizes["2xl"],
            height: sizes["2xl"],
            borderRadius: radius.full,
            background: colors.surface_alt,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Bell size={fontSizes.lg} color={colors.text_secondary} />
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: radius.full,
              background: colors.red,
            }}
          />
        </button>

        {/* User */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: space.md,
            padding: `${space.sm}px ${space.md}px`,
            background: colors.surface_alt,
            border: "none",
            borderRadius: radius.lg,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: sizes.xl,
              height: sizes.xl,
              borderRadius: radius.full,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary_dark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={fontSizes.lg} color={colors.white} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
              Admin
            </div>
            <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
              admin@nutriveg.com
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
