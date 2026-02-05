import React from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { tokens } from "../../styles/tokens";

interface FoodAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (food: string) => void;
  showDropdown: boolean;
  filteredFoods: string[];
  placeholder?: string;
  color: string;
}

export const FoodAutocomplete: React.FC<FoodAutocompleteProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onSelect,
  showDropdown,
  filteredFoods,
  placeholder = "Digite para buscar mais alimentos...",
  color,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px ${
              tokens.space.xl + tokens.space.md
            }px`,
            border: `2px solid ${tokens.colors.border}`,
            borderRadius: tokens.radii.md,
            fontSize: 14,
            fontWeight: 600,
            outline: "none",
            background: "white",
          }}
        />
        <Search
          size={18}
          color={tokens.colors.textMuted}
          style={{
            position: "absolute",
            left: tokens.space.md,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Autocomplete Dropdown */}
      {showDropdown && filteredFoods.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: `2px solid ${tokens.colors.border}`,
            borderRadius: tokens.radii.md,
            marginTop: tokens.space.xs,
            maxHeight: 240,
            overflowY: "auto",
            zIndex: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          {filteredFoods.map((food) => (
            <button
              key={food}
              onClick={() => onSelect(food)}
              style={{
                width: "100%",
                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                border: "none",
                background: "white",
                textAlign: "left",
                fontSize: 14,
                fontWeight: 600,
                color: tokens.colors.text,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: tokens.space.md,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `${color}15`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "white")
              }
            >
              <Plus size={16} color={color} />
              {food}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
