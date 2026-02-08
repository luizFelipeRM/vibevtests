"use client";

import React, { useState } from "react";
import { Edit, Trash2, Eye, Plus, Search, Filter, Download } from "lucide-react";
import { AdminLayout } from "../_components/AdminLayout";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

// Mock data
const mockUsers = [
  { id: 1, name: "Maria Silva", email: "maria@email.com", mode: "Fitness", registered: "15/01/2026", status: "Ativo", logs: 45 },
  { id: 2, name: "João Santos", email: "joao@email.com", mode: "Básico", registered: "20/01/2026", status: "Ativo", logs: 12 },
  { id: 3, name: "Ana Costa", email: "ana@email.com", mode: "Fitness", registered: "22/01/2026", status: "Ativo", logs: 67 },
  { id: 4, name: "Pedro Lima", email: "pedro@email.com", mode: "Fitness", registered: "25/01/2026", status: "Inativo", logs: 8 },
  { id: 5, name: "Julia Oliveira", email: "julia@email.com", mode: "Básico", registered: "28/01/2026", status: "Ativo", logs: 23 },
  { id: 6, name: "Carlos Souza", email: "carlos@email.com", mode: "Fitness", registered: "30/01/2026", status: "Ativo", logs: 91 },
  { id: 7, name: "Fernanda Alves", email: "fernanda@email.com", mode: "Básico", registered: "01/02/2026", status: "Ativo", logs: 34 },
  { id: 8, name: "Ricardo Martins", email: "ricardo@email.com", mode: "Fitness", registered: "03/02/2026", status: "Ativo", logs: 56 },
];

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<"Todos" | "Fitness" | "Básico">("Todos");
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Ativo" | "Inativo">("Todos");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = filterMode === "Todos" || user.mode === filterMode;
    const matchesStatus = filterStatus === "Todos" || user.status === filterStatus;
    return matchesSearch && matchesMode && matchesStatus;
  });

  return (
    <AdminLayout title="Gerenciar Usuários" subtitle={`${mockUsers.length} usuários cadastrados`}>
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
            placeholder="Buscar usuários..."
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
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as any)}
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
            <option>Fitness</option>
            <option>Básico</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
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
            <option>Ativo</option>
            <option>Inativo</option>
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

      {/* Users Table */}
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
                Nome
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Email
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Modo
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Cadastro
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Status
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Logs
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  #{user.id}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                  {user.name}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {user.email}
                </td>
                <td style={{ padding: space.md }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: `${space.xs}px ${space.sm}px`,
                      background: user.mode === "Fitness" ? colors.piecharts.royal_blue + "20" : colors.piecharts.purple + "20",
                      color: user.mode === "Fitness" ? colors.piecharts.royal_blue : colors.piecharts.purple,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      borderRadius: radius.md,
                    }}
                  >
                    {user.mode}
                  </span>
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {user.registered}
                </td>
                <td style={{ padding: space.md }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: `${space.xs}px ${space.sm}px`,
                      background: user.status === "Ativo" ? colors.piecharts.light_green + "20" : colors.grays[200],
                      color: user.status === "Ativo" ? colors.piecharts.light_green : colors.text_secondary,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      borderRadius: radius.md,
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                  {user.logs}
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

        {filteredUsers.length === 0 && (
          <div style={{ padding: space.xxl, textAlign: "center", color: colors.text_secondary }}>
            Nenhum usuário encontrado
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
