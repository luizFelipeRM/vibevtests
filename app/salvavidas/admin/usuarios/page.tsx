"use client";

import React, { useState } from "react";
import { Edit, Trash2, Eye, Plus, Search, Filter, Download, Shield } from "lucide-react";
import { AdminLayout } from "../_components/AdminLayout";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

// Mock data
const mockUsers = [
  { id: 1, name: "Maria Silva", email: "maria@email.com", role: "Voluntário", casesReported: 12, casesHelped: 8, registered: "15/01/2026", status: "Ativo" },
  { id: 2, name: "João Santos", email: "joao@email.com", role: "Protetor", casesReported: 34, casesHelped: 45, registered: "20/12/2025", status: "Ativo" },
  { id: 3, name: "Ana Costa", email: "ana@email.com", role: "Voluntário", casesReported: 5, casesHelped: 3, registered: "22/01/2026", status: "Ativo" },
  { id: 4, name: "Pedro Lima", email: "pedro@email.com", role: "Moderador", casesReported: 8, casesHelped: 67, registered: "10/11/2025", status: "Ativo" },
  { id: 5, name: "Julia Oliveira", email: "julia@email.com", role: "Voluntário", casesReported: 19, casesHelped: 12, registered: "28/01/2026", status: "Ativo" },
  { id: 6, name: "Carlos Souza", email: "carlos@email.com", role: "Protetor", casesReported: 45, casesHelped: 89, registered: "05/10/2025", status: "Ativo" },
  { id: 7, name: "Fernanda Alves", email: "fernanda@email.com", role: "Voluntário", casesReported: 7, casesHelped: 4, registered: "01/02/2026", status: "Inativo" },
  { id: 8, name: "Ricardo Martins", email: "ricardo@email.com", role: "Voluntário", casesReported: 15, casesHelped: 9, registered: "03/01/2026", status: "Ativo" },
];

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("Todos");
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "Todos" || user.role === filterRole;
    const matchesStatus = filterStatus === "Todos" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
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
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
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
            <option>Voluntário</option>
            <option>Protetor</option>
            <option>Moderador</option>
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
                Função
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Casos Reportados
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Casos Ajudados
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Cadastro
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Status
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
                      display: "inline-flex",
                      alignItems: "center",
                      gap: space.xs,
                      padding: `${space.xs}px ${space.sm}px`,
                      background: user.role === "Moderador" ? colors.piecharts.purple + "20" :
                                 user.role === "Protetor" ? colors.piecharts.royal_blue + "20" :
                                 colors.piecharts.light_green + "20",
                      color: user.role === "Moderador" ? colors.piecharts.purple :
                             user.role === "Protetor" ? colors.piecharts.royal_blue :
                             colors.piecharts.light_green,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      borderRadius: radius.md,
                    }}
                  >
                    {user.role === "Moderador" && <Shield size={12} />}
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                  {user.casesReported}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.piecharts.light_green }}>
                  {user.casesHelped}
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
