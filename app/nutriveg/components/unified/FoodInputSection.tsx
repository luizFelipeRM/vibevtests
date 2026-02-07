import React, { useState } from "react";
import { Mode, Macros, LogEntry, MealType, mealInfoMap } from "../../types";
import { foodDatabase } from "../../data/foodDatabase";
import { tokens } from "../../styles/tokens";
import { multiplyMacros } from "../../utils/macroCalculations";
import { useRecentFoods } from "../../hooks/useRecentFoods";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Edit2, Check, X, Coffee, Salad, Soup, Moon } from "lucide-react";

interface FoodInputSectionProps {
  mode: Mode;
  selectedDate: Date;
  onAddFood: (date: Date, name: string, macros: Macros, quantity: number, meal?: MealType) => void;
  foodItems: LogEntry[];
  onRemoveFood: (date: Date, id: string) => void;
  onUpdateQuantity: (date: Date, id: string, newQuantity: number) => void;
}

export const FoodInputSection: React.FC<FoodInputSectionProps> = ({
  mode,
  selectedDate,
  onAddFood,
  foodItems = [],
  onRemoveFood,
  onUpdateQuantity,
}) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<MealType>("breakfast");
  const [activeTab, setActiveTab] = useState<"popular" | "recent">("popular");
  const { recentFoods, addRecentFood } = useRecentFoods();

  const handleAddFood = () => {
    if (!foodName || !quantity) return;

    const food = foodDatabase[foodName];
    if (!food) return;

    const multiplier = parseFloat(quantity) || 1;
    const macrosToAdd = multiplyMacros(food, multiplier);

    onAddFood(selectedDate, foodName, macrosToAdd, multiplier, mode === "basic" ? selectedMeal : undefined);

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

  const renderFoodItem = (item: LogEntry) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.space.md,
        background: tokens.colors.bg,
        borderRadius: tokens.radii.lg,
        border: "1px solid transparent",
        marginBottom: tokens.space.xs,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = tokens.colors.border)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: tokens.colors.text }}>{item.name}</div>
        <div style={{ fontSize: 12, color: tokens.colors.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
          {editingId === item.id ? (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <input
                type="number"
                value={editQty}
                onChange={(e) => setEditQty(e.target.value)}
                style={{
                  width: 50,
                  padding: "2px 4px",
                  fontSize: 12,
                  border: `1px solid ${tokens.colors.primary}`,
                  borderRadius: 4,
                  outline: "none"
                }}
                autoFocus
              />
              <button
                onClick={() => {
                  const qty = parseFloat(editQty);
                  if (!isNaN(qty) && qty > 0) onUpdateQuantity(selectedDate, item.id, qty);
                  setEditingId(null);
                }}
                style={{ background: tokens.colors.primary, color: "white", border: "none", borderRadius: 4, padding: 2, display: "flex", cursor: "pointer" }}
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <span
              onClick={() => {
                setEditingId(item.id);
                setEditQty(item.quantity.toString());
              }}
              style={{ cursor: "pointer", borderBottom: `1px dashed ${tokens.colors.textMuted}` }}
              title="Clique para editar"
            >
              {item.quantity} {foodDatabase[item.name]?.unit || "unit"}
            </span>
          )}
          <span>• {item.calories} kcal</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: tokens.space.sm, alignItems: "center" }}>
        <div style={{ textAlign: "right", paddingRight: tokens.space.md, borderRight: `1px solid ${tokens.colors.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: tokens.colors.textMuted }}>{item.protein}g P</div>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {editingId === item.id ? (
            <>
              <button
                onClick={() => {
                  const qty = parseFloat(editQty);
                  if (!isNaN(qty) && qty > 0) onUpdateQuantity(selectedDate, item.id, qty);
                  setEditingId(null);
                }}
                style={actionButtonStyle(tokens.colors.green)}
                title="Salvar"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => setEditingId(null)}
                style={actionButtonStyle(tokens.colors.textMuted)}
                title="Cancelar"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditingId(item.id);
                  setEditQty(item.quantity.toString());
                }}
                style={actionButtonStyle(tokens.colors.textMuted)}
                title="Editar quantidade"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onRemoveFood(selectedDate, item.id)}
                style={actionButtonStyle(tokens.colors.textMuted)}
                title="Remover item"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.xl }}>
      {/* Search & Add Section */}
      <div
        style={{
          background: "white",
          padding: tokens.space.xl,
          borderRadius: tokens.radii.xl,
          border: `1px solid ${tokens.colors.border}`,
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ marginBottom: tokens.space.xl }}>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 800,
              marginBottom: tokens.space.xs,
              color: tokens.colors.text,
              display: "flex",
              alignItems: "center",
              gap: tokens.space.sm,
            }}
          >
            <span>✍️</span> Adicionar Alimento
          </h3>
          <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
            {mode === "basic"
              ? "Registre o que você costuma comer regularmente"
              : "Registre os alimentos consumidos hoje"}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 100px auto",
            gap: tokens.space.md,
            alignItems: "flex-end",
            marginBottom: tokens.space.lg,
          }}
        >
          <div style={{ position: "relative" }}>
            <label style={labelStyle}>Alimento</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Ex: Arroz integral, Tofu..."
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = tokens.colors.primary)}
              onBlur={(e) => (e.currentTarget.style.borderColor = tokens.colors.border)}
            />
          </div>

          <div>
            <label style={labelStyle}>Qtd</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="1"
              step="0.5"
              min="0"
              style={{ ...inputStyle, textAlign: "center" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = tokens.colors.primary)}
              onBlur={(e) => (e.currentTarget.style.borderColor = tokens.colors.border)}
            />
          </div>

          <button onClick={handleAddFood} style={buttonStyle} onMouseEnter={btnHover} onMouseLeave={btnLeave}>
            <Plus size={20} /> Adicionar
          </button>
        </div>

        {/* Seleção de Refeição (apenas no modo básico) */}
        {mode === "basic" && (
          <div style={{ display: "flex", gap: tokens.space.sm, marginBottom: tokens.space.lg }}>
            {(["breakfast", "lunch", "dinner", "supper"] as MealType[]).map((m) => {
              const Icon = m === "breakfast" ? Coffee : m === "lunch" ? Salad : m === "dinner" ? Soup : Moon;
              const isSelected = selectedMeal === m;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMeal(m)}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    padding: tokens.space.sm,
                    background: isSelected ? tokens.colors.primary + "10" : "transparent",
                    border: `1px solid ${isSelected ? tokens.colors.primary : tokens.colors.border}`,
                    borderRadius: tokens.radii.lg,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <Icon size={18} color={isSelected ? tokens.colors.primary : tokens.colors.textMuted} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: isSelected ? tokens.colors.primary : tokens.colors.textMuted }}>
                    {mealInfoMap[m].label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Info Nutricional Rápida */}
        {selectedFood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{
              marginBottom: tokens.space.xl,
              padding: tokens.space.md,
              background: tokens.colors.bg,
              borderRadius: tokens.radii.lg,
              border: `1px solid ${tokens.colors.border}`,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: tokens.space.sm }}>
              {[
                { label: "Prot", value: `${selectedFood.protein}g`, color: tokens.colors.red },
                { label: "Carb", value: `${selectedFood.carbs}g`, color: tokens.colors.blue },
                { label: "Gord", value: `${selectedFood.fats}g`, color: tokens.colors.yellow },
                { label: "Kcal", value: selectedFood.calories, color: tokens.colors.orange },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: tokens.colors.textMuted }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sugestões diretamente abaixo */}
        <div style={{ borderTop: `1px solid ${tokens.colors.border}`, paddingTop: tokens.space.lg }}>
          <div style={{ display: "flex", gap: tokens.space.md, marginBottom: tokens.space.md }}>
            {["popular", "recent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                style={{
                  padding: `${tokens.space.xs}px ${tokens.space.md}px`,
                  background: activeTab === tab ? tokens.colors.primary + "10" : "transparent",
                  color: activeTab === tab ? tokens.colors.primary : tokens.colors.textMuted,
                  border: "none",
                  borderRadius: tokens.radii.full,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {tab === "popular" ? "🔥 Sugestões" : "⏱️ Recentes"}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.space.xs }}>
            {suggestedFoods.slice(0, 8).map((food) => (
              <button
                key={food}
                onClick={() => handleQuickSelect(food)}
                style={{
                  padding: `${tokens.space.xs}px ${tokens.space.md}px`,
                  background: "white",
                  border: `1px solid ${tokens.colors.border}`,
                  borderRadius: tokens.radii.md,
                  fontSize: 12,
                  fontWeight: 600,
                  color: tokens.colors.text,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.primary;
                  e.currentTarget.style.color = tokens.colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.border;
                  e.currentTarget.style.color = tokens.colors.text;
                }}
              >
                {food}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Diário de Alimentos */}
      <div
        style={{
          background: "white",
          padding: tokens.space.xl,
          borderRadius: tokens.radii.xl,
          border: `1px solid ${tokens.colors.border}`,
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: tokens.space.xl,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: tokens.colors.text }}>🍽️ Diário de Alimentos</h3>
          <span style={{ fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, background: tokens.colors.bg, padding: "4px 10px", borderRadius: tokens.radii.full }}>
            {mode === "basic"
              ? `${foodItems.filter(i => i.meal === selectedMeal).length} itens no ${mealInfoMap[selectedMeal].label}`
              : `${foodItems.length} itens`
            }
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.sm }}>
          <AnimatePresence initial={false} mode="wait">
            {foodItems.length > 0 ? (
              mode === "basic" ? (
                (() => {
                  const items = foodItems.filter(item => item.meal === selectedMeal);
                  if (items.length === 0) {
                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ padding: tokens.space.xl, textAlign: "center", color: tokens.colors.textMuted }}
                      >
                        <div style={{ fontSize: 24, marginBottom: tokens.space.sm }}>🍽️</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>Nenhum item em {mealInfoMap[selectedMeal].label}</div>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={selectedMeal}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ display: "flex", flexDirection: "column", gap: tokens.space.xs }}
                    >
                      {items.map(item => renderFoodItem(item))}
                    </motion.div>
                  );
                })()
              ) : (
                foodItems.map((item) => renderFoodItem(item))
              )
            ) : (
              <div
                style={{
                  padding: tokens.space.xxl,
                  textAlign: "center",
                  color: tokens.colors.textMuted,
                  border: `2px dashed ${tokens.colors.border}`,
                  borderRadius: tokens.radii.lg,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: tokens.space.md }}>🍱</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Nenhum alimento registrado</div>
                <div style={{ fontSize: 12 }}>Adicione acima para começar seu diário</div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 800,
  marginBottom: tokens.space.xs,
  color: tokens.colors.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: `${tokens.space.md}px ${tokens.space.lg}px`,
  border: `1px solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.lg,
  fontSize: 15,
  fontWeight: 600,
  outline: "none",
  background: tokens.colors.bg,
  transition: "all 0.2s",
};

const buttonStyle: React.CSSProperties = {
  height: 54,
  padding: `0 ${tokens.space.xxl}px`,
  background: tokens.colors.primary,
  color: "white",
  border: "none",
  borderRadius: tokens.radii.lg,
  fontSize: 15,
  fontWeight: 800,
  cursor: "pointer",
  boxShadow: `0 4px 12px ${tokens.colors.primary}30`,
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  alignItems: "center",
  gap: tokens.space.sm,
};

const btnHover = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.background = tokens.colors.primaryDark;
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow = `0 6px 16px ${tokens.colors.primary}50`;
};

const btnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.background = tokens.colors.primary;
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = `0 4px 12px ${tokens.colors.primary}30`;
};

const actionButtonStyle = (color: string): React.CSSProperties => ({
  width: 32,
  height: 32,
  borderRadius: tokens.radii.md,
  border: "none",
  background: `${color}10`,
  color: color,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
});


