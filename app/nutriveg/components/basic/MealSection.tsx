import React, { useState } from "react";
import { MealType } from "../../types";
import { mealInfo } from "../../data/constants";
import { commonFoods } from "../../data/commonFoods";
import { tokens } from "../../styles/tokens";
import { FoodAutocomplete } from "../shared/FoodAutocomplete";
import { FoodPill } from "../shared/FoodPill";
import { useFoodAutocomplete } from "../../hooks/useFoodAutocomplete";

interface MealSectionProps {
  mealKey: MealType;
  selectedFoods: string[];
  onAddFood: (food: string) => void;
  onRemoveFood: (food: string) => void;
}

export const MealSection: React.FC<MealSectionProps> = ({
  mealKey,
  selectedFoods,
  onAddFood,
  onRemoveFood,
}) => {
  const meal = mealInfo[mealKey];
  const Icon = meal.icon;
  const quickFoods = commonFoods[mealKey];

  const {
    searchInput,
    showDropdown,
    filteredFoods,
    handleInputChange,
    handleFocus,
    handleBlur,
    handleSelect,
  } = useFoodAutocomplete(selectedFoods);

  return (
    <div
      style={{
        background: "white",
        borderRadius: tokens.radii.xl,
        padding: tokens.space.xl,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: `2px solid ${tokens.colors.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.space.md,
          marginBottom: tokens.space.lg,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radii.md,
            background: `${meal.color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={24} color={meal.color} />
        </div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: tokens.colors.text,
            margin: 0,
          }}
        >
          {meal.label}
        </h3>
      </div>

      {/* Selected Foods */}
      {selectedFoods.length > 0 && (
        <div
          style={{
            marginBottom: tokens.space.lg,
            display: "flex",
            flexWrap: "wrap",
            gap: tokens.space.sm,
          }}
        >
          {selectedFoods.map((food) => (
            <FoodPill
              key={food}
              food={food}
              color={meal.color}
              onRemove={() => onRemoveFood(food)}
            />
          ))}
        </div>
      )}

      {/* Autocomplete Input */}
      <div style={{ marginBottom: tokens.space.md }}>
        <FoodAutocomplete
          value={searchInput}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSelect={(food) => handleSelect(food, onAddFood)}
          showDropdown={showDropdown}
          filteredFoods={filteredFoods}
          color={meal.color}
        />
      </div>

      {/* Quick Add Options */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: tokens.colors.textMuted,
          marginBottom: tokens.space.sm,
        }}
      >
        ADICIONAR RÁPIDO:
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.space.sm }}>
        {quickFoods.map((food) => {
          const isSelected = selectedFoods.includes(food);
          return (
            <button
              key={food}
              onClick={() => onAddFood(food)}
              disabled={isSelected}
              style={{
                padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                background: isSelected ? tokens.colors.bg : "white",
                color: isSelected ? tokens.colors.textMuted : tokens.colors.text,
                border: `2px solid ${
                  isSelected ? tokens.colors.border : meal.color
                }`,
                borderRadius: tokens.radii.pill,
                fontSize: 13,
                fontWeight: 600,
                cursor: isSelected ? "not-allowed" : "pointer",
                opacity: isSelected ? 0.5 : 1,
              }}
            >
              + {food}
            </button>
          );
        })}
      </div>
    </div>
  );
};
