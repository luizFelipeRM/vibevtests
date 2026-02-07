import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, Target, TrendingUp, Dumbbell, Activity } from "lucide-react";
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

          {/* Workout Type */}
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
              Tipo de Treino
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: tokens.space.md,
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
          </div>
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
