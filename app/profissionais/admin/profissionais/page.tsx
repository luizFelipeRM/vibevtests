"use client";

import React, { useState } from "react";
import { Edit, Trash2, Eye, Plus, Search, Filter, Download, CheckCircle, XCircle } from "lucide-react";
import { AdminLayout } from "../_components/AdminLayout";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

// Mock data
const mockProfessionals = [
  { id: 1, name: "Dr. Carlos Silva", specialty: "Nutricionista", email: "carlos@email.com", phone: "(11) 98765-4321", status: "Aprovado", rating: 4.9, reviews: 127, registered: "15/01/2026" },
  { id: 2, name: "Dra. Ana Santos", specialty: "Nutricionista", email: "ana@email.com", phone: "(11) 97654-3210", status: "Pendente", rating: 0, reviews: 0, registered: "05/02/2026" },
  { id: 3, name: "Dr. João Costa", specialty: "Personal Trainer", email: "joao@email.com", phone: "(11) 96543-2109", status: "Aprovado", rating: 4.7, reviews: 89, registered: "10/01/2026" },
  { id: 4, name: "Dra. Maria Lima", specialty: "Nutricionista", email: "maria@email.com", phone: "(11) 95432-1098", status: "Aprovado", rating: 4.8, reviews: 156, registered: "20/01/2026" },
  { id: 5, name: "Dr. Pedro Oliveira", specialty: "Fisioterapeuta", email: "pedro@email.com", phone: "(11) 94321-0987", status: "Rejeitado", rating: 0, reviews: 0, registered: "01/02/2026" },
  { id: 6, name: "Dra. Julia Souza", specialty: "Personal Trainer", email: "julia@email.com", phone: "(11) 93210-9876", status: "Aprovado", rating: 4.6, reviews: 67, registered: "25/01/2026" },
  { id: 7, name: "Dr. Ricardo Alves", specialty: "Nutricionista", email: "ricardo@email.com", phone: "(11) 92109-8765", status: "Pendente", rating: 0, reviews: 0, registered: "06/02/2026" },
  { id: 8, name: "Dra. Fernanda Martins", specialty: "Fisioterapeuta", email: "fernanda@email.com", phone: "(11) 91098-7654", status: "Aprovado", rating: 4.9, reviews: 201, registered: "12/01/2026" },
];

export default function ProfissionaisPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("Todos");
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const filteredProfessionals = mockProfessionals.filter((prof) => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === "Todos" || prof.specialty === filterSpecialty;
    const matchesStatus = filterStatus === "Todos" || prof.status === filterStatus;
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  return (
    <AdminLayout title="Gerenciar Profissionais" subtitle={`${mockProfessionals.length} profissionais cadastrados`}>
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
            placeholder="Buscar profissionais..."
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
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
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
            <option>Nutricionista</option>
            <option>Personal Trainer</option>
            <option>Fisioterapeuta</option>
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
            <option>Aprovado</option>
            <option>Pendente</option>
            <option>Rejeitado</option>
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

      {/* Professionals Table */}
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
                Especialidade
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Email
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Telefone
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Status
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Avaliação
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProfessionals.map((prof) => (
              <tr key={prof.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  #{prof.id}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                  {prof.name}
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
                    {prof.specialty}
                  </span>
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {prof.email}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {prof.phone}
                </td>
                <td style={{ padding: space.md }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: space.xs,
                      padding: `${space.xs}px ${space.sm}px`,
                      background: prof.status === "Aprovado" ? colors.piecharts.light_green + "20" :
                                 prof.status === "Pendente" ? colors.piecharts.gold + "20" :
                                 colors.piecharts.red + "20",
                      color: prof.status === "Aprovado" ? colors.piecharts.light_green :
                             prof.status === "Pendente" ? colors.piecharts.gold :
                             colors.piecharts.red,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      borderRadius: radius.md,
                    }}
                  >
                    {prof.status === "Aprovado" && <CheckCircle size={12} />}
                    {prof.status === "Rejeitado" && <XCircle size={12} />}
                    {prof.status}
                  </span>
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_primary }}>
                  {prof.status === "Aprovado" ? (
                    <div>
                      <div style={{ fontWeight: fontWeights.bold }}>⭐ {prof.rating.toFixed(1)}</div>
                      <div style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>{prof.reviews} avaliações</div>
                    </div>
                  ) : (
                    <span style={{ color: colors.text_secondary, fontSize: fontSizes.xs }}>-</span>
                  )}
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

        {filteredProfessionals.length === 0 && (
          <div style={{ padding: space.xxl, textAlign: "center", color: colors.text_secondary }}>
            Nenhum profissional encontrado
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
