"use client";

import React from "react";
import { Briefcase, Users, Star, TrendingUp } from "lucide-react";
import { AdminLayout } from "./_components/AdminLayout";
import { StatCard } from "./_components/StatCard";
import { colors } from "../src/design/colors";
import { space } from "../src/design/space";
import { radius } from "../src/design/radius";
import { fontSizes } from "../src/design/fontSizes";
import { fontWeights } from "../src/design/fontWeights";

const stats = [
  { title: "Total de Profissionais", value: "247", change: 18.2, icon: Briefcase, color: colors.piecharts.royal_blue },
  { title: "Cadastros Pendentes", value: "12", change: -5.3, icon: Users, color: colors.piecharts.gold },
  { title: "Avaliações (30 dias)", value: "1,834", change: 23.1, icon: Star, color: colors.piecharts.light_green },
  { title: "Taxa de Satisfação", value: "94%", change: 4.2, icon: TrendingUp, color: colors.piecharts.purple },
];

const recentProfessionals = [
  { id: 1, name: "Dra. Ana Silva", category: "Nutricionista", status: "Aprovado", date: "Hoje às 10:30", verified: true },
  { id: 2, name: "Dr. Carlos Souza", category: "Médico", status: "Pendente", date: "Hoje às 09:15", verified: false },
  { id: 3, name: "Marina Costa", category: "Personal Trainer", status: "Aprovado", date: "Ontem às 16:20", verified: true },
  { id: 4, name: "João Pedro", category: "Chef", status: "Aprovado", date: "Ontem às 14:10", verified: true },
  { id: 5, name: "Fernanda Lima", category: "Psicóloga", status: "Pendente", date: "Há 2 dias", verified: false },
];

const topRated = [
  { name: "Dra. Paula Oliveira", rating: 5.0, reviews: 127, category: "Nutricionista" },
  { name: "Dr. Ricardo Martins", rating: 4.9, reviews: 98, category: "Médico" },
  { name: "Julia Santos", rating: 4.9, reviews: 85, category: "Dermatologista" },
  { name: "Pedro Alves", rating: 4.8, reviews: 76, category: "Personal" },
  { name: "Ana Clara", rating: 4.8, reviews: 64, category: "Esteticista" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Visão geral do Profissionais">
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
        {/* Recent Professionals */}
        <div
          style={{
            background: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.xl,
            padding: space.lg,
          }}
        >
          <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.lg }}>
            Cadastros Recentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: space.md }}>
            {recentProfessionals.map((pro) => (
              <div
                key={pro.id}
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
                    {pro.name}
                  </div>
                  <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                    {pro.category}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.semibold,
                      color: colors.white,
                      background: pro.status === "Aprovado" ? colors.piecharts.light_green : colors.piecharts.gold,
                      padding: `${space.xs}px ${space.sm}px`,
                      borderRadius: radius.md,
                      marginBottom: space.xs,
                    }}
                  >
                    {pro.status}
                  </div>
                  <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                    {pro.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div
          style={{
            background: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.xl,
            padding: space.lg,
          }}
        >
          <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.lg }}>
            Melhores Avaliados
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: space.md }}>
            {topRated.map((pro, index) => (
              <div
                key={pro.name}
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
                      background: colors.piecharts.gold,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: fontSizes.sm,
                      fontWeight: fontWeights.bold,
                      color: colors.white,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                      {pro.name}
                    </div>
                    <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                      {pro.category} • {pro.reviews} avaliações
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: space.xs }}>
                  <Star size={16} fill={colors.piecharts.gold} color={colors.piecharts.gold} />
                  <span style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.bold, color: colors.text_primary }}>
                    {pro.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
