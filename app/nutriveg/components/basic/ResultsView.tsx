import React from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle, Zap, Wheat, Dumbbell, Droplet } from "lucide-react";
import { Meals } from "../../types";
import { tokens } from "../../styles/tokens";
import { MacroChart } from "../shared/MacroChart";
import { MacroCard } from "../shared/MacroCard";
import { RecommendationCard } from "./RecommendationCard";
import { NutritionistPromo } from "./NutritionistPromo";
import { nutritionRecommendations } from "../../data/recommendations";

interface ResultsViewProps {
  meals: Meals;
  onBack: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ meals, onBack }) => {
  const macrosData = [
    {
      name: "Carboidratos",
      current: 245,
      percentage: 54,
      ideal: "50-60%",
      color: tokens.colors.blue,
      icon: Wheat,
    },
    {
      name: "Proteínas",
      current: 65,
      percentage: 18,
      ideal: "15-25%",
      color: tokens.colors.red,
      icon: Dumbbell,
    },
    {
      name: "Lipídios",
      current: 55,
      percentage: 28,
      ideal: "20-30%",
      color: tokens.colors.yellow,
      icon: Droplet,
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: `${tokens.space.xxl}px ${tokens.space.xl}px`,
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: tokens.colors.primary,
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: tokens.space.xl,
        }}
      >
        ← Voltar
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            marginBottom: tokens.space.lg,
            color: tokens.colors.text,
          }}
        >
          📊 Sua Análise Nutricional
        </h2>
        <p
          style={{
            fontSize: 18,
            color: tokens.colors.textMuted,
            marginBottom: tokens.space.xxl,
          }}
        >
          Baseada nos alimentos que você selecionou
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: tokens.space.xxl,
            marginBottom: tokens.space.xxl,
          }}
        >
          {/* Left: Pie Chart */}
          <div
            style={{
              background: "white",
              borderRadius: tokens.radii.xl,
              padding: tokens.space.xxl,
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: tokens.space.xxl,
                color: tokens.colors.text,
                textAlign: "center",
              }}
            >
              Distribuição de Macronutrientes
            </h3>

            <MacroChart macrosData={macrosData} totalGrams={365} />

            {/* Legend */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: tokens.space.md,
                marginTop: tokens.space.xxl,
              }}
            >
              {macrosData.map((macro) => (
                <MacroCard key={macro.name} {...macro} />
              ))}
            </div>
          </div>

          {/* Right: Status Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
            <div
              style={{
                background: "white",
                borderRadius: tokens.radii.xl,
                padding: tokens.space.xxl,
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: tokens.space.xl,
                  color: tokens.colors.text,
                }}
              >
                Status Geral
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: tokens.space.lg,
                  marginBottom: tokens.space.xl,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${tokens.colors.primary}15, ${tokens.colors.primary}05)`,
                    padding: tokens.space.lg,
                    borderRadius: tokens.radii.lg,
                    border: `2px solid ${tokens.colors.primary}30`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: tokens.colors.textMuted,
                      marginBottom: tokens.space.sm,
                    }}
                  >
                    EQUILÍBRIO
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: tokens.colors.primary,
                    }}
                  >
                    82%
                  </div>
                  <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                    Muito bom!
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${tokens.colors.blue}15, ${tokens.colors.blue}05)`,
                    padding: tokens.space.lg,
                    borderRadius: tokens.radii.lg,
                    border: `2px solid ${tokens.colors.blue}30`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: tokens.colors.textMuted,
                      marginBottom: tokens.space.sm,
                    }}
                  >
                    CALORIAS
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: tokens.colors.blue,
                    }}
                  >
                    2100
                  </div>
                  <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                    kcal estimadas
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: tokens.space.lg,
                  background: `linear-gradient(135deg, ${tokens.colors.primary}08, ${tokens.colors.blue}08)`,
                  borderRadius: tokens.radii.lg,
                  border: `2px dashed ${tokens.colors.primary}40`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: tokens.space.md,
                    marginBottom: tokens.space.sm,
                  }}
                >
                  <Check size={20} color={tokens.colors.primary} strokeWidth={3} />
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: tokens.colors.text,
                    }}
                  >
                    Dieta Equilibrada
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: tokens.colors.textMuted,
                    margin: 0,
                  }}
                >
                  Sua alimentação está dentro dos padrões recomendados para uma dieta
                  vegana saudável
                </p>
              </div>
            </div>

            <div
              style={{
                background: `linear-gradient(135deg, ${tokens.colors.orange}15, ${tokens.colors.red}15)`,
                borderRadius: tokens.radii.xl,
                padding: tokens.space.xl,
                border: `2px solid ${tokens.colors.orange}30`,
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
                    borderRadius: tokens.radii.full,
                    background: tokens.colors.red,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AlertCircle size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: tokens.colors.text,
                    }}
                  >
                    Ponto de Atenção
                  </div>
                  <div style={{ fontSize: 13, color: tokens.colors.textMuted }}>
                    Vitamina B12
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: tokens.colors.text,
                  marginBottom: tokens.space.lg,
                }}
              >
                A suplementação de B12 é <strong>essencial</strong> para veganos.
                Alimentos fortificados não são suficientes.
              </p>
              <button
                style={{
                  width: "100%",
                  padding: `${tokens.space.md}px`,
                  background: tokens.colors.red,
                  color: "white",
                  border: "none",
                  borderRadius: tokens.radii.md,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Saber Mais sobre B12
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
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

        {/* Nutritionists */}
        <NutritionistPromo />
      </motion.div>
    </div>
  );
};
