import React from "react";
import { Sparkles } from "lucide-react";
import { tokens } from "../../styles/tokens";
import { nutritionRecommendations as recommendations } from "../../data/recommendations";
import { RecommendationCard } from "../basic/RecommendationCard";
import { NutritionistPromo } from "../basic/NutritionistPromo";

export const RecommendationsSection: React.FC = () => {
  // Pegar a de maior prioridade para ser destaque
  const featured = recommendations.find(r => r.priority === "alta") || recommendations[0];
  const others = recommendations.filter(r => r !== featured);

  // Type-safe icon component
  const FeaturedIcon = featured.icon;

  return (
    <div
      style={{
        marginTop: tokens.space.xxl,
        background: "white",
        padding: `${tokens.space.xxl}px`,
        borderRadius: tokens.radii.xl,
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.02)",
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: tokens.space.xl,
        borderBottom: `1px solid ${tokens.colors.border}`,
        paddingBottom: tokens.space.xl
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>✨</span>
            <h3 style={{ fontSize: 24, fontWeight: 300, color: tokens.colors.text, margin: 0, letterSpacing: "-0.02em" }}>
              NutriVeg <strong style={{ fontWeight: 800 }}>Insights</strong>
            </h3>
          </div>
          <p style={{ fontSize: 13, color: tokens.colors.textMuted, margin: 0 }}>
            Análise comportamental e recomendações para otimizar seus resultados.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {recommendations.map((rec, idx) => (
          <RecommendationCard
            key={rec.title}
            index={idx}
            {...rec}
          />
        ))}
      </div>

      <NutritionistPromo />
    </div>
  );
};
