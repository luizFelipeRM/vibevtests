"use client";

import React from "react";
import { Users, Apple, TrendingUp, Target } from "lucide-react";
import { AdminLayout } from "./_components/AdminLayout";
import { StatCard } from "./_components/StatCard";
import { colors } from "../src/design/colors";
import { space } from "../src/design/space";
import { radius } from "../src/design/radius";
import { fontSizes } from "../src/design/fontSizes";
import { fontWeights } from "../src/design/fontWeights";

// Mock data
const stats = [
  { title: "Total de Usuários", value: "1,247", change: 12.5, icon: Users, color: colors.piecharts.royal_blue },
  { title: "Alimentos Cadastrados", value: "73", change: 5.2, icon: Apple, color: colors.piecharts.light_green },
  { title: "Logs Diários (Hoje)", value: "342", change: -3.1, icon: TrendingUp, color: colors.piecharts.gold },
  { title: "Taxa de Engajamento", value: "68%", change: 8.4, icon: Target, color: colors.piecharts.purple },
];

const recentUsers = [
  { id: 1, name: "Maria Silva", email: "maria@email.com", mode: "Fitness", date: "Hoje às 14:30" },
  { id: 2, name: "João Santos", email: "joao@email.com", mode: "Básico", date: "Hoje às 12:15" },
  { id: 3, name: "Ana Costa", email: "ana@email.com", mode: "Fitness", date: "Ontem às 18:20" },
  { id: 4, name: "Pedro Lima", email: "pedro@email.com", mode: "Fitness", date: "Ontem às 16:45" },
  { id: 5, name: "Julia Oliveira", email: "julia@email.com", mode: "Básico", date: "Há 2 dias" },
];

const popularFoods = [
  { name: "Tofu", searches: 1243, trend: "up" },
  { name: "Feijão Preto", searches: 987, trend: "up" },
  { name: "Banana", searches: 856, trend: "down" },
  { name: "Aveia", searches: 742, trend: "up" },
  { name: "Lentilha", searches: 621, trend: "up" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Visão geral do NutriVeg">
      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: space.lg,
          marginBottom: space.xl,
        }}
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Tables Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: space.lg,
        }}
      >
        {/* Recent Users */}
        <div
          style={{
            background: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.xl,
            padding: space.lg,
          }}
        >
          <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.lg }}>
            Usuários Recentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: space.md }}>
            {recentUsers.map((user) => (
              <div
                key={user.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: space.md,
                  background: colors.surface_alt,
                  borderRadius: radius.lg,
                }}
              >
                <div>
                  <div style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                    {user.email}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.semibold,
                      color: colors.white,
                      background: user.mode === "Fitness" ? colors.piecharts.royal_blue : colors.piecharts.purple,
                      padding: `${space.xs}px ${space.sm}px`,
                      borderRadius: radius.md,
                      marginBottom: space.xs,
                    }}
                  >
                    {user.mode}
                  </div>
                  <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                    {user.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Foods */}
        <div
          style={{
            background: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.xl,
            padding: space.lg,
          }}
        >
          <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.lg }}>
            Alimentos Mais Buscados
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: space.md }}>
            {popularFoods.map((food, index) => (
              <div
                key={food.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: space.md,
                  background: colors.surface_alt,
                  borderRadius: radius.lg,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: space.md }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: radius.full,
                      background: colors.primary_lighter,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: fontSizes.sm,
                      fontWeight: fontWeights.bold,
                      color: colors.primary,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                      {food.name}
                    </div>
                    <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                      {food.searches} buscas
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: fontSizes.xs,
                    fontWeight: fontWeights.bold,
                    color: food.trend === "up" ? colors.piecharts.light_green : colors.red,
                  }}
                >
                  {food.trend === "up" ? "↑" : "↓"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
