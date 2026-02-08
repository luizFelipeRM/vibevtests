"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Apple,
  FileText,
  Settings,
  LogOut,
  Leaf
} from "lucide-react";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/nutriveg/admin", icon: LayoutDashboard },
  { label: "Usuários", href: "/nutriveg/admin/usuarios", icon: Users },
  { label: "Alimentos", href: "/nutriveg/admin/alimentos", icon: Apple },
  { label: "Relatórios", href: "/nutriveg/admin/relatorios", icon: FileText },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div
      style={{
        width: 280,
        height: "100vh",
        background: colors.white,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: space.xl,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: space.md }}>
          <div
            style={{
              width: sizes["3xl"],
              height: sizes["3xl"],
              borderRadius: radius.lg,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary_dark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={fontSizes.xl} color={colors.white} />
          </div>
          <div>
            <div style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary }}>
              NutriVeg
            </div>
            <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
              Painel Admin
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: space.lg }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: space.md,
                padding: `${space.md}px ${space.lg}px`,
                marginBottom: space.sm,
                borderRadius: radius.lg,
                background: isActive ? colors.primary_lighter : "transparent",
                color: isActive ? colors.primary : colors.text_secondary,
                fontSize: fontSizes.sm,
                fontWeight: isActive ? fontWeights.bold : fontWeights.medium,
                textDecoration: "none",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = colors.surface_alt;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <Icon size={fontSizes.xl} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: space.lg,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: space.md,
            padding: `${space.md}px ${space.lg}px`,
            background: "transparent",
            border: `1px solid ${colors.border}`,
            borderRadius: radius.lg,
            color: colors.text_secondary,
            fontSize: fontSizes.sm,
            fontWeight: fontWeights.medium,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.surface_alt;
            e.currentTarget.style.borderColor = colors.text_secondary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = colors.border;
          }}
        >
          <LogOut size={fontSizes.lg} />
          Sair
        </button>
      </div>
    </div>
  );
};
