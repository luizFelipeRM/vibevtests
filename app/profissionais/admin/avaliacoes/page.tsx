"use client";

import React, { useState } from "react";
import { Trash2, Eye, Search, Download, Star, Flag, ThumbsUp } from "lucide-react";
import { AdminLayout } from "../_components/AdminLayout";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

// Mock data
const mockReviews = [
  { id: 1, professional: "Dr. Carlos Silva", reviewer: "Maria Santos", rating: 5, comment: "Excelente profissional! Me ajudou muito com minha dieta vegana.", date: "05/02/2026", status: "Aprovado", helpful: 12 },
  { id: 2, professional: "Dra. Ana Santos", reviewer: "João Costa", rating: 4, comment: "Ótimo atendimento, muito atenciosa.", date: "04/02/2026", status: "Pendente", helpful: 0 },
  { id: 3, professional: "Dr. João Costa", reviewer: "Pedro Lima", rating: 5, comment: "Personal trainer incrível, treinos bem planejados.", date: "03/02/2026", status: "Aprovado", helpful: 8 },
  { id: 4, professional: "Dra. Maria Lima", reviewer: "Julia Oliveira", rating: 3, comment: "Bom profissional, mas às vezes demora a responder.", date: "02/02/2026", status: "Reportado", helpful: 2 },
  { id: 5, professional: "Dra. Fernanda Martins", reviewer: "Carlos Souza", rating: 5, comment: "Fisioterapeuta excelente! Recuperação rápida.", date: "01/02/2026", status: "Aprovado", helpful: 15 },
  { id: 6, professional: "Dra. Julia Souza", reviewer: "Fernanda Alves", rating: 4, comment: "Treinos desafiadores e eficientes.", date: "31/01/2026", status: "Aprovado", helpful: 6 },
  { id: 7, professional: "Dr. Carlos Silva", reviewer: "Ricardo Martins", rating: 2, comment: "Não gostei da abordagem, esperava algo diferente.", date: "30/01/2026", status: "Pendente", helpful: 1 },
  { id: 8, professional: "Dra. Maria Lima", reviewer: "Ana Silva", rating: 5, comment: "Mudou minha relação com a alimentação!", date: "29/01/2026", status: "Aprovado", helpful: 20 },
];

export default function AvaliacoesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<string>("Todos");
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch = review.professional.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === "Todos" || review.rating.toString() === filterRating;
    const matchesStatus = filterStatus === "Todos" || review.status === filterStatus;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? colors.piecharts.gold : "none"}
        color={i < rating ? colors.piecharts.gold : colors.grays[300]}
      />
    ));
  };

  return (
    <AdminLayout title="Gerenciar Avaliações" subtitle={`${mockReviews.length} avaliações cadastradas`}>
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
            placeholder="Buscar avaliações..."
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
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
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
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
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
            <option>Reportado</option>
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

      {/* Reviews Table */}
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
                Profissional
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Avaliador
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Avaliação
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Comentário
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Data
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
            {filteredReviews.map((review) => (
              <tr key={review.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  #{review.id}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                  {review.professional}
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {review.reviewer}
                </td>
                <td style={{ padding: space.md }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {renderStars(review.rating)}
                  </div>
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary, maxWidth: 300 }}>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {review.comment}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: space.xs, marginTop: space.xs }}>
                    <ThumbsUp size={12} color={colors.text_secondary} />
                    <span style={{ fontSize: fontSizes.xs, color: colors.text_secondary }}>
                      {review.helpful} acharam útil
                    </span>
                  </div>
                </td>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {review.date}
                </td>
                <td style={{ padding: space.md }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: space.xs,
                      padding: `${space.xs}px ${space.sm}px`,
                      background: review.status === "Aprovado" ? colors.piecharts.light_green + "20" :
                                 review.status === "Pendente" ? colors.piecharts.gold + "20" :
                                 colors.piecharts.red + "20",
                      color: review.status === "Aprovado" ? colors.piecharts.light_green :
                             review.status === "Pendente" ? colors.piecharts.gold :
                             colors.piecharts.red,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.bold,
                      borderRadius: radius.md,
                    }}
                  >
                    {review.status === "Reportado" && <Flag size={12} />}
                    {review.status}
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

        {filteredReviews.length === 0 && (
          <div style={{ padding: space.xxl, textAlign: "center", color: colors.text_secondary }}>
            Nenhuma avaliação encontrada
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
