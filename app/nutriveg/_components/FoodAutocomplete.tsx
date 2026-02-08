import React from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { radius } from "@/design/radius";
import { fontSizes } from "@/design/fontSizes";
import { fontWeights } from "@/design/fontWeights";

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
            padding: `${space.md}px ${space.lg}px ${space.md}px ${
              space.xl + space.md
            }px`,
            border: `2px solid ${colors.border}`,
            borderRadius: radius.lg,
            fontSize: fontSizes.sm,
            fontWeight: fontWeights.semibold,
            outline: "none",
            background: colors.white,
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
            background: colors.white,
            border: `2px solid ${colors.border}`,
            borderRadius: radius.lg,
            marginTop: space.xs,
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
                padding: `${space.md}px ${space.lg}px`,
                border: "none",
                background: colors.white,
                textAlign: "left",
                fontSize: fontSizes.sm,
                fontWeight: fontWeights.semibold,
                color: colors.text_primary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: space.md,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `${color}15`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = colors.white)
              }
            >
              <Plus size={fontSizes.md} color={color} />
              {food}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
