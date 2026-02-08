"use client";

import React from "react";
import { Download, Calendar, FileText, BarChart3, TrendingUp, Heart } from "lucide-react";
import { AdminLayout } from "../_components/AdminLayout";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";

const reports = [
  {
    title: "Casos por Tipo",
    description: "Relatório completo de casos separados por categoria",
    icon: Heart,
    color: colors.piecharts.royal_blue,
    period: "Último mês",
    records: 423,
  },
  {
    title: "Resgates e Adoções",
    description: "Análise detalhada de resgates realizados e adoções concluídas",
    icon: TrendingUp,
    color: colors.piecharts.gold,
    period: "Últimos 30 dias",
    records: 156,
  },
  {
    title: "Performance por Região",
    description: "Distribuição de casos e taxa de sucesso por localização",
    icon: BarChart3,
    color: colors.piecharts.light_green,
    period: "Todo período",
    records: 423,
  },
  {
    title: "Casos Urgentes",
    description: "Lista de casos ativos que requerem atenção imediata",
    icon: FileText,
    color: colors.piecharts.purple,
    period: "Ativos",
    records: 15,
  },
];

const stats = [
  { label: "Total de Casos", value: "423", change: "+15.3%" },
  { label: "Casos Ativos", value: "87", change: "-8.2%" },
  { label: "Taxa de Sucesso", value: "89%", change: "+4.7%" },
  { label: "Tempo Médio", value: "12d", change: "-6.3%" },
];

export default function RelatoriosPage() {
  return (
    <AdminLayout title="Relatórios" subtitle="Gere e exporte relatórios detalhados">
      {/* Quick Stats */}
      <div
        style={{
          background: colors.white,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.xl,
          padding: space.lg,
          marginBottom: space.lg,
        }}
      >
        <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.lg }}>
          Estatísticas Rápidas
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: space.lg,
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary, marginBottom: space.xs }}>
                {stat.label}
              </div>
              <div style={{ fontSize: fontSizes["2xl"], fontWeight: fontWeights.extrabold, color: colors.text_primary }}>
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: fontSizes.xs,
                  fontWeight: fontWeights.semibold,
                  color: stat.change.startsWith("+") ? colors.piecharts.light_green : colors.red,
                  marginTop: space.xs,
                }}
              >
                {stat.change} vs mês anterior
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Reports */}
      <div
        style={{
          background: colors.white,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.xl,
          padding: space.lg,
          marginBottom: space.lg,
        }}
      >
        <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.lg }}>
          Relatórios Disponíveis
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: space.lg,
          }}
        >
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.title}
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.lg,
                  padding: space.lg,
                  background: colors.surface_alt,
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = report.color;
                  e.currentTarget.style.background = colors.white;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.background = colors.surface_alt;
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: space.md }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: radius.lg,
                      background: `${report.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={fontSizes.xl} color={report.color} />
                  </div>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: space.xs,
                      padding: `${space.xs}px ${space.sm}px`,
                      background: report.color,
                      color: colors.white,
                      border: "none",
                      borderRadius: radius.md,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      cursor: "pointer",
                    }}
                  >
                    <Download size={fontSizes.xs} />
                    Exportar
                  </button>
                </div>
                <h3 style={{ fontSize: fontSizes.md, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.xs }}>
                  {report.title}
                </h3>
                <p style={{ fontSize: fontSizes.sm, color: colors.text_secondary, marginBottom: space.md }}>
                  {report.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: space.xs }}>
                    <Calendar size={fontSizes.sm} color={colors.text_secondary} />
                    <span style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                      {report.period}
                    </span>
                  </div>
                  <span style={{ fontSize: fontSizes.xs, fontWeight: fontWeights.semibold, color: report.color }}>
                    {report.records} registros
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Options */}
      <div
        style={{
          background: colors.white,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.xl,
          padding: space.lg,
        }}
      >
        <h2 style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: colors.text_primary, marginBottom: space.md }}>
          Opções de Exportação
        </h2>
        <p style={{ fontSize: fontSizes.sm, color: colors.text_secondary, marginBottom: space.lg }}>
          Todos os relatórios podem ser exportados nos seguintes formatos:
        </p>
        <div style={{ display: "flex", gap: space.md, flexWrap: "wrap" }}>
          {["CSV", "Excel (XLSX)", "PDF", "JSON"].map((format) => (
            <div
              key={format}
              style={{
                padding: `${space.sm}px ${space.lg}px`,
                background: colors.surface_alt,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.lg,
                fontSize: fontSizes.sm,
                fontWeight: fontWeights.semibold,
                color: colors.text_primary,
              }}
            >
              {format}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
