import React, { useState } from "react";
import { Mode, Macros } from "../../types";
import { foodDatabase } from "../../data/foodDatabase";
import { tokens } from "../../styles/tokens";
import { multiplyMacros } from "../../utils/macroCalculations";
import { useRecentFoods } from "../../hooks/useRecentFoods";

interface FoodInputSectionProps {
  mode: Mode;
  selectedDate: Date;
  onAddFood: (date: Date, macros: Macros) => void;
}

export const FoodInputSection: React.FC<FoodInputSectionProps> = ({
  mode,
  selectedDate,
  onAddFood,
}) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [activeTab, setActiveTab] = useState<"popular" | "recent">("popular");
  const { recentFoods, addRecentFood } = useRecentFoods();

  const handleAddFood = () => {
    if (!foodName || !quantity) return;

    const food = foodDatabase[foodName];
    if (!food) return;

    const multiplier = parseFloat(quantity) || 1;
    const macrosToAdd = multiplyMacros(food, multiplier);

    onAddFood(selectedDate, macrosToAdd);

    // Adicionar aos alimentos recentes
    addRecentFood(foodName);

    setFoodName("");
    setQuantity("");
  };

  const handleQuickSelect = (food: string) => {
    setFoodName(food);
    setQuantity("1");
  };

  const selectedFood = foodDatabase[foodName];

  // Alimentos populares (primeiros 6 do banco de dados)
  const popularFoods = Object.keys(foodDatabase).slice(0, 6);

  // Alimentos para o grid de sugestões
  const suggestedFoods = activeTab === "popular" ? popularFoods : recentFoods;

  return (
    <div>
      {/* Add Food Form */}
      <div
        style={{
          background: "white",
          padding: tokens.space.xl,
          borderRadius: tokens.radii.lg,
          border: `2px solid ${tokens.colors.border}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: tokens.space.sm,
            color: tokens.colors.text,
          }}
        >
          ✍️ Adicionar Alimento
        </h3>
        <p
          style={{
            fontSize: 13,
            color: tokens.colors.textMuted,
            marginBottom: tokens.space.lg,
          }}
        >
          {mode === "basic"
            ? "Adicione os alimentos que você costuma comer em um dia típico"
            : "Adicione os alimentos consumidos hoje"}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr auto",
            gap: tokens.space.md,
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: tokens.space.sm,
                color: tokens.colors.textMuted,
              }}
            >
              ALIMENTO
            </label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Ex: Arroz integral, Tofu, Banana..."
              list="food-options"
              style={{
                width: "100%",
                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                border: `2px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.md,
                fontSize: 15,
                fontWeight: 600,
                outline: "none",
                background: "white",
              }}
            />
            <datalist id="food-options">
              {Object.keys(foodDatabase).map((food) => (
                <option key={food} value={food} />
              ))}
            </datalist>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: tokens.space.sm,
                color: tokens.colors.textMuted,
              }}
            >
              PORÇÕES
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="1"
              step="0.5"
              min="0"
              style={{
                width: "100%",
                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                border: `2px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.md,
                fontSize: 15,
                fontWeight: 600,
                outline: "none",
                background: "white",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              onClick={handleAddFood}
              style={{
                padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                color: "white",
                border: "none",
                borderRadius: tokens.radii.md,
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: `0 4px 12px ${tokens.colors.primary}40`,
                whiteSpace: "nowrap",
              }}
            >
              + Adicionar
            </button>
          </div>
        </div>

        {selectedFood && (
          <div
            style={{
              marginTop: tokens.space.lg,
              padding: tokens.space.md,
              background: `${tokens.colors.blue}10`,
              borderRadius: tokens.radii.md,
              border: `1px solid ${tokens.colors.blue}30`,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: tokens.colors.textMuted,
                marginBottom: tokens.space.xs,
              }}
            >
              Informação nutricional por {selectedFood.unit}:
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: tokens.colors.text }}>
              {selectedFood.protein}g proteína • {selectedFood.carbs}g carbos •{" "}
              {selectedFood.fats}g lipídios • {selectedFood.calories} kcal
            </div>
          </div>
        )}

        {/* Tabs: Popular / Recentes */}
        <div
          style={{
            marginTop: tokens.space.xl,
            borderTop: `1px solid ${tokens.colors.border}`,
            paddingTop: tokens.space.lg,
          }}
        >
          {/* Tab Headers */}
          <div
            style={{
              display: "flex",
              gap: tokens.space.sm,
              marginBottom: tokens.space.lg,
            }}
          >
            <button
              onClick={() => setActiveTab("popular")}
              style={{
                padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
                background:
                  activeTab === "popular"
                    ? `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`
                    : "white",
                color: activeTab === "popular" ? "white" : tokens.colors.text,
                border: `2px solid ${
                  activeTab === "popular" ? tokens.colors.primary : tokens.colors.border
                }`,
                borderRadius: tokens.radii.md,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              🔥 Populares
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              style={{
                padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
                background:
                  activeTab === "recent"
                    ? `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`
                    : "white",
                color: activeTab === "recent" ? "white" : tokens.colors.text,
                border: `2px solid ${
                  activeTab === "recent" ? tokens.colors.primary : tokens.colors.border
                }`,
                borderRadius: tokens.radii.md,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              ⏱️ Recentes
            </button>
          </div>

          {/* Grid de Sugestões */}
          {suggestedFoods.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: tokens.space.sm,
              }}
            >
              {suggestedFoods.slice(0, 6).map((food) => (
                <button
                  key={food}
                  onClick={() => handleQuickSelect(food)}
                  style={{
                    padding: `${tokens.space.md}px`,
                    background: tokens.colors.bg,
                    border: "none",
                    borderRadius: tokens.radii.md,
                    fontSize: 13,
                    fontWeight: 600,
                    color: tokens.colors.text,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = `${tokens.colors.primary}20`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = tokens.colors.bg)
                  }
                >
                  {food}
                </button>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: tokens.space.xl,
                textAlign: "center",
                color: tokens.colors.textMuted,
                fontSize: 13,
              }}
            >
              {activeTab === "recent"
                ? "Nenhum alimento recente ainda. Adicione alimentos para vê-los aqui!"
                : "Nenhum alimento disponível"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
