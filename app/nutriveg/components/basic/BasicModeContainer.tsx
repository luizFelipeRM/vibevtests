import React, { useState } from "react";
import { useMealTracking } from "../../hooks/useMealTracking";
import { tokens } from "../../styles/tokens";
import { MealSection } from "./MealSection";
import { ResultsView } from "./ResultsView";

export const BasicModeContainer: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const { meals, addFood, removeFood } = useMealTracking();

  if (showResults) {
    return <ResultsView meals={meals} onBack={() => setShowResults(false)} />;
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: `${tokens.space.xxl}px ${tokens.space.xl}px`,
      }}
    >
      <h2
        style={{
          fontSize: 36,
          fontWeight: 800,
          marginBottom: tokens.space.sm,
          color: tokens.colors.text,
        }}
      >
        O que você costuma comer?
      </h2>
      <p
        style={{
          fontSize: 18,
          color: tokens.colors.textMuted,
          marginBottom: tokens.space.xxl,
        }}
      >
        Selecione os alimentos de cada refeição
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: tokens.space.xl,
          marginBottom: tokens.space.xxl,
        }}
      >
        {(["breakfast", "lunch", "dinner", "snacks"] as const).map((mealKey) => (
          <MealSection
            key={mealKey}
            mealKey={mealKey}
            selectedFoods={meals[mealKey]}
            onAddFood={(food) => addFood(mealKey, food)}
            onRemoveFood={(food) => removeFood(mealKey, food)}
          />
        ))}
      </div>

      <button
        onClick={() => setShowResults(true)}
        style={{
          width: "100%",
          padding: `${tokens.space.xl}px`,
          background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
          color: "white",
          border: "none",
          borderRadius: tokens.radii.lg,
          fontSize: 18,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: `0 8px 24px ${tokens.colors.primary}40`,
        }}
      >
        Analisar Minha Alimentação →
      </button>
    </div>
  );
};
