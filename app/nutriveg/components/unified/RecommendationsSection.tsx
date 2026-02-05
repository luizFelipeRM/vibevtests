import React from "react";
import { Zap } from "lucide-react";
import { tokens } from "../../styles/tokens";
import { nutritionRecommendations } from "../../data/recommendations";
import { RecommendationCard } from "../basic/RecommendationCard";
import { NutritionistPromo } from "../basic/NutritionistPromo";

export const RecommendationsSection: React.FC = () => {
  return (
    <>
      <div
        style={{
          background: "white",
          borderRadius: tokens.radii.xl,
          padding: tokens.space.xxl,
          marginBottom: tokens.space.xxl,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.md,
            marginBottom: tokens.space.xxl,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: tokens.radii.lg,
              background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={24} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: tokens.colors.text,
                margin: 0,
              }}
            >
              Recomendações para Você
            </h3>
            <p
              style={{
                fontSize: 14,
                color: tokens.colors.textMuted,
                margin: 0,
              }}
            >
              Baseadas na sua análise nutricional
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: tokens.space.lg,
          }}
        >
          {nutritionRecommendations.map((suggestion, i) => (
            <RecommendationCard key={i} {...suggestion} index={i} />
          ))}
        </div>
      </div>

      <NutritionistPromo />
    </>
  );
};
