"use client";

import React from "react";
import { Heart, Shield, Home, PartyPopper } from "lucide-react";
import { AdminLayout } from "./_components/AdminLayout";
import { StatCard } from "./_components/StatCard";
import { colors } from "../src/design/colors";
import { space } from "../src/design/space";
import { radius } from "../src/design/radius";
import { fontSizes } from "../src/design/fontSizes";
import { fontWeights } from "../src/design/fontWeights";

const stats = [
  { title: "Total de Casos", value: "423", change: 15.3, icon: Heart, color: colors.piecharts.royal_blue },
  { title: "Casos Ativos", value: "87", change: -8.2, icon: Shield, color: colors.piecharts.gold },
  { title: "Adoções Realizadas", value: "156", change: 28.4, icon: Home, color: colors.piecharts.light_green },
  { title: "Finais Felizes", value: "180", change: 12.7, icon: PartyPopper, color: colors.piecharts.purple },
];

const recentCases = [
  { id: 1, animal: "Rex", type: "Resgate", status: "Em Andamento", urgency: "Crítica", date: "Há 2 horas" },
  { id: 2, animal: "Mimi", type: "Adoção", status: "Novo", urgency: "Baixa", date: "Há 5 horas" },
  { id: 3, animal: "Totó", type: "Perdido", status: "Em Andamento", urgency: "Alta", date: "Há 1 dia" },
  { id: 4, animal: "Luna", type: "Veterinário", status: "Em Andamento", urgency: "Alta", date: "Há 2 dias" },
  { id: 5, animal: "Thor", type: "Final Feliz", status: "Resolvido", urgency: "Baixa", date: "Há 3 dias" },
];

const casesByType = [
  { type: "Resgates", count: 92, color: colors.red },
  { type: "Adoção", count: 78, color: colors.pink },
  { type: "Perdidos", count: 45, color: colors.blue },
  { type: "Veterinário", count: 34, color: colors.green },
  { type: "Finais Felizes", count: 180, color: colors.yellow },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Visão geral do Salva-Vidas">
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
        {/* Recent Cases */}
        <div
          style={{
            background: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.xl,
            padding: space.lg,
          }}
        >
          <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.lg }}>
            Casos Recentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: space.md }}>
            {recentCases.map((caso) => (
              <div
                key={caso.id}
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
                    {caso.animal}
                  </div>
                  <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                    {caso.type}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.semibold,
                      color: colors.white,
                      background: caso.urgency === "Crítica" ? colors.red : caso.urgency === "Alta" ? colors.orange : colors.piecharts.light_green,
                      padding: `${space.xs}px ${space.sm}px`,
                      borderRadius: radius.md,
                      marginBottom: space.xs,
                    }}
                  >
                    {caso.urgency}
                  </div>
                  <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                    {caso.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cases by Type */}
        <div
          style={{
            background: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.xl,
            padding: space.lg,
          }}
        >
          <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.lg }}>
            Casos por Tipo
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: space.md }}>
            {casesByType.map((item, index) => (
              <div
                key={item.type}
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
                      background: `${item.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: fontSizes.sm,
                      fontWeight: fontWeights.bold,
                      color: item.color,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                    {item.type}
                  </div>
                </div>
                <div style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: item.color }}>
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
