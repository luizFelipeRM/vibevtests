import React from "react";
import { foodDatabase } from "../../data/foodDatabase";
import { tokens } from "../../styles/tokens";

interface FoodInputFormProps {
  foodName: string;
  quantity: string;
  onFoodNameChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onAdd: () => void;
}

export const FoodInputForm: React.FC<FoodInputFormProps> = ({
  foodName,
  quantity,
  onFoodNameChange,
  onQuantityChange,
  onAdd,
}) => {
  const selectedFood = foodDatabase[foodName];

  return (
    <div
      style={{
        background: "white",
        padding: tokens.space.xl,
        borderRadius: tokens.radii.lg,
        marginBottom: tokens.space.xl,
        border: `2px solid ${tokens.colors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: tokens.space.lg,
          color: tokens.colors.text,
        }}
      >
        ✍️ Adicionar Alimento
      </h3>

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
            onChange={(e) => onFoodNameChange(e.target.value)}
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
            onChange={(e) => onQuantityChange(e.target.value)}
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
            onClick={onAdd}
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
            {selectedFood.fats}g gordura • {selectedFood.calories} kcal
          </div>
        </div>
      )}
    </div>
  );
};
