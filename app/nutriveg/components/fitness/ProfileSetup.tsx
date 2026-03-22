import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, Target, TrendingUp, Dumbbell, Activity, Plus, Trash2, Clock } from "lucide-react";
import { Profile } from "../../types";
import { tokens } from "../../styles/tokens";

interface ProfileSetupProps {
  profile: Profile;
  onChange: (updates: Partial<Profile>) => void;
  onComplete: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({
  profile,
  onChange,
  onComplete,
}) => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: `${tokens.space.xxl}px ${tokens.space.xl}px`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "white",
          borderRadius: tokens.radii.xl,
          padding: tokens.space.xxl * 2,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            marginBottom: tokens.space.lg,
            color: tokens.colors.text,
          }}
        >
          ⚙️ Configure Seu Perfil
        </h2>
        <p
          style={{
            fontSize: 16,
            color: tokens.colors.textMuted,
            marginBottom: tokens.space.xxl,
          }}
        >
          Vamos personalizar seus objetivos nutricionais
        </p>

        <div style={{ display: "grid", gap: tokens.space.xl }}>
          {/* Measurements */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: tokens.space.lg,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text,
                }}
              >
                Altura (cm)
              </label>
              <input
                type="number"
                value={profile.height}
                onChange={(e) => onChange({ height: e.target.value })}
                onFocus={(e) => (e.currentTarget.style.borderColor = tokens.colors.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = tokens.colors.border)}
                style={{
                  width: "100%",
                  padding: `${tokens.space.md}px`,
                  border: `2px solid ${tokens.colors.border}`,
                  borderRadius: tokens.radii.md,
                  fontSize: 16,
                  fontWeight: 600,
                  outline: "none",
                  background: "white",
                  transition: "border-color 0.2s",
                }}
                placeholder="175"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text,
                }}
              >
                Peso (kg)
              </label>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => onChange({ weight: e.target.value })}
                onFocus={(e) => (e.currentTarget.style.borderColor = tokens.colors.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = tokens.colors.border)}
                style={{
                  width: "100%",
                  padding: `${tokens.space.md}px`,
                  border: `2px solid ${tokens.colors.border}`,
                  borderRadius: tokens.radii.md,
                  fontSize: 16,
                  fontWeight: 600,
                  outline: "none",
                  background: "white",
                  transition: "border-color 0.2s",
                }}
                placeholder="70"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text,
                }}
              >
                Idade
              </label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => onChange({ age: e.target.value })}
                onFocus={(e) => (e.currentTarget.style.borderColor = tokens.colors.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = tokens.colors.border)}
                style={{
                  width: "100%",
                  padding: `${tokens.space.md}px`,
                  border: `2px solid ${tokens.colors.border}`,
                  borderRadius: tokens.radii.md,
                  fontSize: 16,
                  fontWeight: 600,
                  outline: "none",
                  background: "white",
                  transition: "border-color 0.2s",
                }}
                placeholder="25"
              />
            </div>
          </div>

          {/* Goal */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 700,
                marginBottom: tokens.space.md,
                color: tokens.colors.text,
              }}
            >
              Objetivo
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: tokens.space.md,
              }}
            >
              {[
                {
                  value: "lose" as const,
                  label: "Perder Peso",
                  icon: TrendingDown,
                },
                {
                  value: "maintain" as const,
                  label: "Manter",
                  icon: Target,
                },
                {
                  value: "gain" as const,
                  label: "Ganhar Massa",
                  icon: TrendingUp,
                },
              ].map((goal) => {
                const Icon = goal.icon;
                const isSelected = profile.goal === goal.value;
                return (
                  <button
                    key={goal.value}
                    onClick={() => onChange({ goal: goal.value })}
                    style={{
                      padding: tokens.space.lg,
                      background: isSelected ? tokens.colors.primaryLight : "white",
                      color: tokens.colors.text,
                      border: `1.5px solid ${isSelected ? tokens.colors.primary + "66" : tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: tokens.space.sm,
                      transition: "all 0.2s",
                      boxShadow: isSelected ? `0 4px 12px ${tokens.colors.primary}20` : "none",
                    }}
                  >
                    <Icon size={24} color={isSelected ? tokens.colors.primary : tokens.colors.textMuted} />
                    {goal.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 700,
                marginBottom: tokens.space.md,
                color: tokens.colors.text,
              }}
            >
              Nível de Atividade
            </label>
            <select
              value={profile.activityLevel}
              onChange={(e) =>
                onChange({ activityLevel: e.target.value as any })
              }
              style={{
                width: "100%",
                padding: `${tokens.space.md}px`,
                border: `2px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.md,
                fontSize: 15,
                fontWeight: 600,
                outline: "none",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="sedentary">Sedentário (pouco/nenhum exercício)</option>
              <option value="light">Leve (1-3 dias/semana)</option>
              <option value="moderate">Moderado (3-5 dias/semana)</option>
              <option value="active">Ativo (6-7 dias/semana)</option>
              <option value="very_active">Muito Ativo (2x por dia)</option>
            </select>
          </div>

          {/* Workout Type & Times */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 700,
                marginBottom: tokens.space.md,
                color: tokens.colors.text,
              }}
            >
              Tipo e Horário de Treino
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: tokens.space.md,
                marginBottom: tokens.space.md
              }}
            >
              {[
                { value: "strength" as const, label: "Musculação", icon: Dumbbell },
                { value: "cardio" as const, label: "Cardio", icon: Activity },
              ].map((type) => {
                const Icon = type.icon;
                const isSelected = profile.workoutType === type.value;
                return (
                  <button
                    key={type.value}
                    onClick={() => onChange({ workoutType: type.value })}
                    style={{
                      padding: tokens.space.lg,
                      background: isSelected ? tokens.colors.primaryLight : "white",
                      color: tokens.colors.text,
                      border: `1.5px solid ${isSelected ? tokens.colors.primary + "66" : tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: tokens.space.md,
                      transition: "all 0.2s",
                      boxShadow: isSelected ? `0 4px 12px ${tokens.colors.primary}20` : "none",
                    }}
                  >
                    <Icon size={20} color={isSelected ? tokens.colors.primary : tokens.colors.textMuted} />
                    {type.label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
              <Clock size={18} color={tokens.colors.textMuted} />
              <div style={{ display: "flex", gap: tokens.space.sm, flex: 1 }}>
                <input
                  type="time"
                  value={profile.workoutStartTime || "18:00"}
                  onChange={(e) => onChange({ workoutStartTime: e.target.value })}
                  style={{
                    flex: 1, padding: tokens.space.sm, border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md, fontSize: 14, outline: "none", color: tokens.colors.text, background: "white"
                  }}
                />
                <span style={{ display: "flex", alignItems: "center", color: tokens.colors.textMuted }}>até</span>
                <input
                  type="time"
                  value={profile.workoutEndTime || "19:30"}
                  onChange={(e) => onChange({ workoutEndTime: e.target.value })}
                  style={{
                    flex: 1, padding: tokens.space.sm, border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md, fontSize: 14, outline: "none", color: tokens.colors.text, background: "white"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Meals Configuration */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.space.md }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 700,
                  color: tokens.colors.text,
                }}
              >
                Refeições e Horários
              </label>
              <button
                onClick={() => {
                  const newMeals = [...(profile.meals || []), { id: `meal_${Date.now()}`, name: "Nova Refeição", time: "15:00" }];
                  onChange({ meals: newMeals });
                }}
                style={{
                  background: "transparent", border: "none", color: tokens.colors.primary,
                  fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4
                }}
              >
                <Plus size={14} /> Adicionar
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.sm }}>
              {(profile.meals || []).map((meal, index) => (
                <div key={meal.id} style={{ display: "grid", gridTemplateColumns: "1fr 120px 40px", gap: tokens.space.sm, alignItems: "center" }}>
                  <input
                    type="text"
                    value={meal.name}
                    onChange={(e) => {
                      const nm = [...(profile.meals || [])];
                      nm[index] = { ...nm[index], name: e.target.value };
                      onChange({ meals: nm });
                    }}
                    placeholder="Nome da Refeição"
                    style={{
                      width: "100%", padding: tokens.space.sm, border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md, fontSize: 14, outline: "none", background: "white"
                    }}
                  />
                  <input
                    type="time"
                    value={meal.time}
                    onChange={(e) => {
                      const nm = [...(profile.meals || [])];
                      nm[index] = { ...nm[index], time: e.target.value };
                      onChange({ meals: nm });
                    }}
                    style={{
                      width: "100%", padding: tokens.space.sm, border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md, fontSize: 14, outline: "none", background: "white"
                    }}
                  />
                  <button
                    onClick={() => {
                      const nm = (profile.meals || []).filter(m => m.id !== meal.id);
                      onChange({ meals: nm });
                    }}
                    style={{
                      width: "100%", height: "100%", background: "transparent", border: "none",
                      color: tokens.colors.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                    title="Remover refeição"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {(!profile.meals || profile.meals.length === 0) && (
                <div style={{ fontSize: 12, color: tokens.colors.textMuted, textAlign: "center", padding: tokens.space.sm }}>
                  Nenhuma refeição configurada.
                </div>
              )}
            </div>
          </div>

          {/* Coach Management */}
          <div>
            <label
              style={{ display: "block", fontSize: 14, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.sm }}
            >
              👩‍⚕️ Gerenciamento Profissional
            </label>
            <p style={{ fontSize: 12, color: tokens.colors.textMuted, marginBottom: tokens.space.md, lineHeight: 1.4 }}>
              Vincule um profissional para que ele possa acompanhar e alterar seu plano diretamente.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.md }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: 4 }}>Nutricionista</label>
                <select
                  value={profile.assignedNutritionist || ""}
                  onChange={(e) => onChange({ assignedNutritionist: e.target.value })}
                  style={{ width: "100%", padding: tokens.space.sm, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 14, outline: "none", background: "white" }}
                >
                  <option value="">Nenhum(a)</option>
                  <option value="Dra. Ana Silva">Dra. Ana Silva</option>
                  <option value="Dr. Carlos Mendes">Dr. Carlos Mendes</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: 4 }}>Personal Trainer</label>
                <select
                  value={profile.assignedTrainer || ""}
                  onChange={(e) => onChange({ assignedTrainer: e.target.value })}
                  style={{ width: "100%", padding: tokens.space.sm, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 14, outline: "none", background: "white" }}
                >
                  <option value="">Nenhum(a)</option>
                  <option value="Coach Rafael">Coach Rafael</option>
                  <option value="Coach Juliana">Coach Juliana</option>
                </select>
              </div>
            </div>
            {profile.assignedNutritionist && (
              <div style={{ marginTop: tokens.space.md, padding: tokens.space.sm, background: tokens.colors.primary + "10", color: tokens.colors.primary, fontSize: 12, borderRadius: tokens.radii.sm, fontWeight: 600 }}>
                💡 Como você está vinculado(a) a um nutricionista, suas metas calóricas serão definidas por ele!
              </div>
            )}
          </div>

          {/* Auto-Calculated Settings */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
              style={{
                marginTop: tokens.space.sm,
                padding: tokens.space.lg,
                background: tokens.colors.bg || "#f8fafc",
                borderRadius: tokens.radii.lg,
                border: `1px solid ${tokens.colors.border}`,
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 800, color: tokens.colors.primary, marginBottom: tokens.space.md }}>
                🎯 Suas Metas Calculadas (Editáveis)
              </h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.md }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.xs }}>
                    Meta de Calorias (kcal)
                  </label>
                  <input
                    type="number"
                    value={profile.calorieGoal || ""}
                    onChange={(e) => onChange({ calorieGoal: e.target.value })}
                    disabled={!!profile.assignedNutritionist}
                    style={{
                      width: "100%", padding: tokens.space.sm, border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.sm, fontSize: 14, fontWeight: 700, outline: "none", color: tokens.colors.text,
                      background: profile.assignedNutritionist ? tokens.colors.bg : "white",
                      opacity: profile.assignedNutritionist ? 0.7 : 1,
                      cursor: profile.assignedNutritionist ? "not-allowed" : "text"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.xs }}>
                    Gasto Diário (GET)
                  </label>
                  <input
                    type="number"
                    value={profile.tdee || ""}
                    onChange={(e) => onChange({ tdee: e.target.value })}
                    disabled={!!profile.assignedNutritionist}
                    style={{
                      width: "100%", padding: tokens.space.sm, border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.sm, fontSize: 14, fontWeight: 700, outline: "none", color: tokens.colors.text,
                      background: profile.assignedNutritionist ? tokens.colors.bg : "white",
                      opacity: profile.assignedNutritionist ? 0.7 : 1,
                      cursor: profile.assignedNutritionist ? "not-allowed" : "text"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.xs }}>
                    Proteínas (g/kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={profile.proteinPerKg || ""}
                    onChange={(e) => onChange({ proteinPerKg: e.target.value })}
                    disabled={!!profile.assignedNutritionist}
                    style={{
                      width: "100%", padding: tokens.space.sm, border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.sm, fontSize: 14, fontWeight: 700, outline: "none", color: tokens.colors.text,
                      background: profile.assignedNutritionist ? tokens.colors.bg : "white",
                      opacity: profile.assignedNutritionist ? 0.7 : 1,
                      cursor: profile.assignedNutritionist ? "not-allowed" : "text"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.xs }}>
                    Carboidratos (g/kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={profile.carbsPerKg || ""}
                    onChange={(e) => onChange({ carbsPerKg: e.target.value })}
                    disabled={!!profile.assignedNutritionist}
                    style={{
                      width: "100%", padding: tokens.space.sm, border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.sm, fontSize: 14, fontWeight: 700, outline: "none", color: tokens.colors.text,
                      background: profile.assignedNutritionist ? tokens.colors.bg : "white",
                      opacity: profile.assignedNutritionist ? 0.7 : 1,
                      cursor: profile.assignedNutritionist ? "not-allowed" : "text"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.xs }}>
                    Gorduras (g/kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={profile.fatsPerKg || ""}
                    onChange={(e) => onChange({ fatsPerKg: e.target.value })}
                    disabled={!!profile.assignedNutritionist}
                    style={{
                      width: "100%", padding: tokens.space.sm, border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.sm, fontSize: 14, fontWeight: 700, outline: "none", color: tokens.colors.text,
                      background: profile.assignedNutritionist ? tokens.colors.bg : "white",
                      opacity: profile.assignedNutritionist ? 0.7 : 1,
                      cursor: profile.assignedNutritionist ? "not-allowed" : "text"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.xs }}>
                    Taxa Basal (TMB)
                  </label>
                  <input
                    type="number"
                    value={profile.tmb || ""}
                    onChange={(e) => onChange({ tmb: e.target.value })}
                    style={{
                      width: "100%", padding: tokens.space.sm, border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.sm, fontSize: 14, fontWeight: 700, outline: "none", color: tokens.colors.textMuted
                    }}
                  />
                </div>
              </div>
            </motion.div>

        </div>

        <button
          onClick={onComplete}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.colors.primaryDark;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = tokens.colors.primary;
            e.currentTarget.style.transform = "translateY(0)";
          }}
          style={{
            width: "100%",
            marginTop: tokens.space.xxl,
            padding: `${tokens.space.xl}px`,
            background: tokens.colors.primary,
            color: "white",
            border: "none",
            borderRadius: tokens.radii.lg,
            fontSize: 18,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: `0 8px 24px ${tokens.colors.primary}30`,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          Começar Tracking →
        </button>
      </motion.div>
    </div>
  );
};
