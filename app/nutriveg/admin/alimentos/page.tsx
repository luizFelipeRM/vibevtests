"use client";

import React, { useState } from "react";
import { Edit, Trash2, Plus, Search, Download } from "lucide-react";
import { AdminLayout } from "../_components/AdminLayout";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";
import { radius } from "../../src/design/radius";
import { fontSizes } from "../../src/design/fontSizes";
import { fontWeights } from "../../src/design/fontWeights";
import { sizes } from "../../src/design/sizes";

// Mock data
const mockFoods = [
  { id: 1, name: "Tofu", category: "Proteínas", protein: 8, carbs: 2, fats: 4, calories: 76, unit: "100g", searches: 1243 },
  { id: 2, name: "Feijão Preto", category: "Grãos e Leguminosas", protein: 8.9, carbs: 23.7, fats: 0.5, calories: 132, unit: "100g", searches: 987 },
  { id: 3, name: "Banana", category: "Frutas", protein: 1.1, carbs: 23, fats: 0.3, calories: 89, unit: "100g", searches: 856 },
  { id: 4, name: "Aveia", category: "Grãos e Leguminosas", protein: 13.2, carbs: 66.3, fats: 6.9, calories: 389, unit: "100g", searches: 742 },
  { id: 5, name: "Lentilha", category: "Grãos e Leguminosas", protein: 9, carbs: 20, fats: 0.4, calories: 116, unit: "100g", searches: 621 },
  { id: 6, name: "Espinafre", category: "Vegetais", protein: 2.9, carbs: 3.6, fats: 0.4, calories: 23, unit: "100g", searches: 534 },
  { id: 7, name: "Quinoa", category: "Grãos e Leguminosas", protein: 4.4, carbs: 21.3, fats: 1.9, calories: 120, unit: "100g", searches: 489 },
];

export default function AlimentosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");

  const filteredFoods = mockFoods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "Todas" || food.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout title="Gerenciar Alimentos" subtitle={`${mockFoods.length} alimentos no banco de dados`}>
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
            placeholder="Buscar alimentos..."
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

        {/* Filters & Actions */}
        <div style={{ display: "flex", gap: space.md, flexWrap: "wrap" }}>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: `${space.sm}px ${space.md}px`,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              fontSize: fontSizes.sm,
              cursor: "pointer",
              background: colors.white,
            }}
          >
            <option>Todas</option>
            <option>Grãos e Leguminosas</option>
            <option>Proteínas</option>
            <option>Vegetais</option>
            <option>Frutas</option>
          </select>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: space.sm,
              padding: `${space.sm}px ${space.md}px`,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary_dark})`,
              border: "none",
              borderRadius: radius.lg,
              fontSize: fontSizes.sm,
              fontWeight: fontWeights.semibold,
              color: colors.white,
              cursor: "pointer",
            }}
          >
            <Plus size={fontSizes.md} />
            Novo Alimento
          </button>

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

      {/* Foods Table */}
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
                Nome
              </th>
              <th style={{ padding: space.md, textAlign: "left", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Categoria
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Proteína
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Carbs
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Lipídios
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Calorias
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Buscas
              </th>
              <th style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: colors.text_secondary, textTransform: "uppercase" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map((food) => (
              <tr key={food.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: space.md, fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                  {food.name}
                </td>
                <td style={{ padding: space.md }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: `${space.xs}px ${space.sm}px`,
                      background: colors.primary_lighter,
                      color: colors.primary,
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.semibold,
                      borderRadius: radius.md,
                    }}
                  >
                    {food.category}
                  </span>
                </td>
                <td style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.sm, color: colors.red }}>
                  {food.protein}g
                </td>
                <td style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.sm, color: colors.piecharts.royal_blue }}>
                  {food.carbs}g
                </td>
                <td style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.sm, color: colors.piecharts.gold }}>
                  {food.fats}g
                </td>
                <td style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, color: colors.text_primary }}>
                  {food.calories}
                </td>
                <td style={{ padding: space.md, textAlign: "center", fontSize: fontSizes.sm, color: colors.text_secondary }}>
                  {food.searches}
                </td>
                <td style={{ padding: space.md }}>
                  <div style={{ display: "flex", gap: space.sm, justifyContent: "center" }}>
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

        {filteredFoods.length === 0 && (
          <div style={{ padding: space.xxl, textAlign: "center", color: colors.text_secondary }}>
            Nenhum alimento encontrado
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
