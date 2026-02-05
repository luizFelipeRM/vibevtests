import React from "react";
import { Leaf, Search, Bell, User } from "lucide-react";
import { tokens } from "../../styles/tokens";

export const Header: React.FC = () => {
  return (
    <header
      style={{
        background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
        color: "white",
        padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
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
          gap: tokens.space.xl,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: tokens.radii.lg,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={32} fill="white" color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>NutriVeg</h1>
            <p style={{ fontSize: 12, margin: 0, opacity: 0.9 }}>
              Nutrição Vegana Inteligente
            </p>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 600 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: tokens.radii.full,
              padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
              display: "flex",
              alignItems: "center",
              gap: tokens.space.md,
            }}
          >
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar alimentos..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: 14,
                flex: 1,
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: tokens.space.md, alignItems: "center" }}>
          <button
            style={{
              width: 48,
              height: 48,
              borderRadius: tokens.radii.full,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={20} color="white" />
          </button>
          <button
            style={{
              width: 48,
              height: 48,
              borderRadius: tokens.radii.full,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={20} color="white" />
          </button>
        </div>
      </div>
    </header>
  );
};
