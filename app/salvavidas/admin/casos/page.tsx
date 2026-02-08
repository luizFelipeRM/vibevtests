"use client";

import React, { useState } from "react";
import { Edit, Trash2, Eye, Plus, Search, Filter, Download, AlertTriangle } from "lucide-react";
import { AdminLayout } from "../_components/AdminLayout";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

// Mock data
const mockCases = [
  { id: 1, animal: "Rex", type: "Resgate", status: "Em Andamento", urgency: "Crítica", location: "Zona Sul, SP", reporter: "Maria Silva", date: "07/02/2026", updates: 12 },
  { id: 2, animal: "Mimi", type: "Adoção", status: "Novo", urgency: "Baixa", location: "Centro, SP", reporter: "João Santos", date: "06/02/2026", updates: 2 },
  { id: 3, animal: "Totó", type: "Perdido", status: "Em Andamento", urgency: "Alta", location: "Zona Oeste, SP", reporter: "Ana Costa", date: "06/02/2026", updates: 8 },
  { id: 4, animal: "Luna", type: "Veterinário", status: "Em Andamento", urgency: "Alta", location: "Zona Norte, SP", reporter: "Pedro Lima", date: "05/02/2026", updates: 15 },
  { id: 5, animal: "Thor", type: "Final Feliz", status: "Resolvido", urgency: "Baixa", location: "Zona Leste, SP", reporter: "Julia Oliveira", date: "04/02/2026", updates: 23 },
  { id: 6, animal: "Belinha", type: "Resgate", status: "Novo", urgency: "Crítica", location: "Zona Sul, SP", reporter: "Carlos Souza", date: "07/02/2026", updates: 1 },
  { id: 7, animal: "Fifi", type: "Adoção", status: "Em Andamento", urgency: "Média", location: "Centro, SP", reporter: "Fernanda Alves", date: "05/02/2026", updates: 6 },
  { id: 8, animal: "Max", type: "Perdido", status: "Novo", urgency: "Alta", location: "Zona Norte, SP", reporter: "Ricardo Martins", date: "07/02/2026", updates: 3 },
];

export default function CasosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("Todos");
  const [filterStatus, setFilterStatus] = useState<string>("Todos");
  const [filterUrgency, setFilterUrgency] = useState<string>("Todos");

  const filteredCases = mockCases.filter((caso) => {
    const matchesSearch = caso.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "Todos" || caso.type === filterType;
    const matchesStatus = filterStatus === "Todos" || caso.status === filterStatus;
    const matchesUrgency = filterUrgency === "Todos" || caso.urgency === filterUrgency;
    return matchesSearch && matchesType && matchesStatus && matchesUrgency;
  });

  return (
    <AdminLayout title="Gerenciar Casos" subtitle={`${mockCases.length} casos cadastrados`}>
      {/* Actions Bar */}
      <div
        style={{
          background: colors.white,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.xl,
          padding: space.lg,
          marginBottom: space.lg,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: space.md,
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 300px" }}>
          <input
            type="text"
            placeholder="Buscar casos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: `${space.sm}px ${space.lg}px ${space.sm}px ${space.xxl + space.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              fontSize: fontSizes.sm,
              outline: "none",
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

        {/* Filters */}
        <div style={{ display: "flex", gap: space.md, flexWrap: "wrap" }}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: `${space.sm}px ${space.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              fontSize: fontSizes.sm,
              cursor: "pointer",
              background: colors.white,
            }}
          >
            <option>Todos</option>
            <option>Resgate</option>
            <option>Adoção</option>
            <option>Perdido</option>
            <option>Veterinário</option>
            <option>Final Feliz</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: `${space.sm}px ${space.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              fontSize: fontSizes.sm,
              cursor: "pointer",
              background: colors.white,
            }}
          >
            <option>Todos</option>
            <option>Novo</option>
            <option>Em Andamento</option>
            <option>Resolvido</option>
          </select>

          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            style={{
              padding: `${space.sm}px ${space.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              fontSize: fontSizes.sm,
              cursor: "pointer",
              background: colors.white,
            }}
          >
            <option>Todos</option>
            <option>Crítica</option>
            <option>Alta</option>
            <option>Média</option>
            <option>Baixa</option>
          </select>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: space.sm,
              padding: `${space.sm}px ${space.md}px`,
              background: colors.white,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              fontSize: fontSizes.sm,
              fontWeight: fontWeights.medium,
              color: colors.text_secondary,
              cursor: "pointer",
            }}
          >
            <Download size={fontSizes.md} />
            Exportar
          </button>
        </div>
      </div>

      {/* Cases Table */}
      <div
        style={{
          background: colors.white,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.xl,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: colors.surface_alt, borderBottom: `1px solid ${colors.border}` }}>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                ID
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Animal
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Tipo
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Status
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Urgência
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Localização
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Reportado Por
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Data
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caso) => (
              <tr key={caso.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  #{caso.id}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                  {caso.animal}
                </td>
                <td style={{ padding: space.md }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: `${space.xs}px ${space.sm}px`,
                      background: colors.piecharts.royal_blue + "20",
                      color: colors.piecharts.royal_blue,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      borderRadius: radius.md,
                    }}
                  >
                    {caso.type}
                  </span>
                </td>
                <td style={{ padding: space.md }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: `${space.xs}px ${space.sm}px`,
                      background: caso.status === "Resolvido" ? colors.piecharts.light_green + "20" :
                                 caso.status === "Em Andamento" ? colors.piecharts.gold + "20" :
                                 colors.grays[200],
                      color: caso.status === "Resolvido" ? colors.piecharts.light_green :
                             caso.status === "Em Andamento" ? colors.piecharts.gold :
                             colors.text_secondary,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      borderRadius: radius.md,
                    }}
                  >
                    {caso.status}
                  </span>
                </td>
                <td style={{ padding: space.md }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: space.xs,
                      padding: `${space.xs}px ${space.sm}px`,
                      background: caso.urgency === "Crítica" ? colors.red + "20" :
                                 caso.urgency === "Alta" ? colors.piecharts.gold + "20" :
                                 caso.urgency === "Média" ? colors.piecharts.royal_blue + "20" :
                                 colors.grays[200],
                      color: caso.urgency === "Crítica" ? colors.red :
                             caso.urgency === "Alta" ? colors.piecharts.gold :
                             caso.urgency === "Média" ? colors.piecharts.royal_blue :
                             colors.text_secondary,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      borderRadius: radius.md,
                    }}
                  >
                    {caso.urgency === "Crítica" && <AlertTriangle size={12} />}
                    {caso.urgency}
                  </span>
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {caso.location}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {caso.reporter}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  <div>{caso.date}</div>
                  <div style={{ fontSize: fontSizes.xs, color: colors.text_muted }}>
                    {caso.updates} atualizações
                  </div>
                </td>
                <td style={{ padding: space.md }}>
                  <div style={{ display: "flex", gap: space.sm, justifyContent: "center" }}>
                    <button
                      style={{
                        width: sizes.xl,
                        height: sizes.xl,
                        borderRadius: radius.md,
                        background: colors.piecharts.royal_blue + "20",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Visualizar"
                    >
                      <Eye size={fontSizes.md} color={colors.piecharts.royal_blue} />
                    </button>
                    <button
                      style={{
                        width: sizes.xl,
                        height: sizes.xl,
                        borderRadius: radius.md,
                        background: colors.piecharts.gold + "20",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Editar"
                    >
                      <Edit size={fontSizes.md} color={colors.piecharts.gold} />
                    </button>
                    <button
                      style={{
                        width: sizes.xl,
                        height: sizes.xl,
                        borderRadius: radius.md,
                        background: colors.red + "20",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Deletar"
                    >
                      <Trash2 size={fontSizes.md} color={colors.red} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCases.length === 0 && (
          <div style={{ padding: space.xxl, textAlign: "center", color: colors.text_secondary }}>
            Nenhum caso encontrado
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
