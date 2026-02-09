import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Macros, MacroTarget, Mode } from "../../types";
import { tokens } from "../../styles/tokens";
import { PieChart } from "../shared/PieChart";
import {
  validateMacroDistribution,
  idealRatios,
} from "../../utils/macroValidation";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface MacroDistributionProps {
  mode: Mode;
  macros: Macros;
  targets: MacroTarget;
}

export const MacroDistribution: React.FC<MacroDistributionProps> = ({
  mode,
  macros,
  targets,
}) => {
  const isFitness = mode === "fitness";
  const validation = useMemo(
    () => validateMacroDistribution(macros),
    [macros]
  );

  // Ícone e cor baseado no status
  const statusConfig = {
    ideal: {
      icon: CheckCircle2,
      color: tokens.colors.green,
      label: "Ideal",
      bgColor: `${tokens.colors.green}10`,
      borderColor: `${tokens.colors.green}30`,
    },
    acceptable: {
      icon: AlertCircle,
      color: tokens.colors.orange,
      label: "Aceitável",
      bgColor: `${tokens.colors.orange}10`,
      borderColor: `${tokens.colors.orange}30`,
    },
    "needs-adjustment": {
      icon: XCircle,
      color: tokens.colors.red,
      label: "Precisa Ajuste",
      bgColor: `${tokens.colors.red}10`,
      borderColor: `${tokens.colors.red}30`,
    },
  };

  const status = statusConfig[validation.status];
  const StatusIcon = status.icon;

  return (
    <div>
      {/* Gráfico de Pizza */}
      <div style={{ marginBottom: isFitness ? tokens.space.lg : 0 }}>
        <PieChart percentages={validation.percentages} />
      </div>

      {/* Badge de Status */}
      {isFitness && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: tokens.space.sm,
            padding: tokens.space.md,
            background: status.bgColor,
            border: `2px solid ${status.borderColor}`,
            borderRadius: tokens.radii.md,
            marginBottom: tokens.space.lg,
          }}
        >
          <StatusIcon size={18} color={status.color} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: status.color,
            }}
          >
            {status.label}
          </span>
        </div>
      )}

      {/* Valores Atuais vs Ideais */}
      <div
        style={{
          background: tokens.colors.bg,
          padding: tokens.space.lg,
          borderRadius: tokens.radii.md,
          marginBottom: tokens.space.lg,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: tokens.colors.textMuted,
            marginBottom: tokens.space.md,
            textTransform: "uppercase",
          }}
        >
          {isFitness ? "Distribuição Atual vs Ideal" : "Distribuição Nutricional"}
        </div>

        {/* Proteína */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: tokens.space.sm,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: tokens.colors.red,
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.text }}>
              Proteína
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.text }}>
              {validation.percentages.protein.toFixed(1)}%
            </span>
            {isFitness && (
              <>
                <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                  (ideal: {idealRatios.protein.ideal}%)
                </span>
                {validation.evaluations.protein === "ideal" && (
                  <CheckCircle2 size={14} color={tokens.colors.green} />
                )}
              </>
            )}
          </div>
        </div>

        {/* Carboidratos */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: tokens.space.sm,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: tokens.colors.blue,
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.text }}>
              Carboidratos
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.text }}>
              {validation.percentages.carbs.toFixed(1)}%
            </span>
            {isFitness && (
              <>
                <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                  (ideal: {idealRatios.carbs.ideal}%)
                </span>
                {validation.evaluations.carbs === "ideal" && (
                  <CheckCircle2 size={14} color={tokens.colors.green} />
                )}
              </>
            )}
          </div>
        </div>

        {/* Lipídios */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: tokens.colors.yellow,
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.text }}>
              Lipídios
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.text }}>
              {validation.percentages.fats.toFixed(1)}%
            </span>
            {isFitness && (
              <>
                <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                  (ideal: {idealRatios.fats.ideal}%)
                </span>
                {validation.evaluations.fats === "ideal" && (
                  <CheckCircle2 size={14} color={tokens.colors.green} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {isFitness && validation.feedback.length > 0 && (
        <div
          style={{
            fontSize: 12,
            lineHeight: 1.6,
            color: tokens.colors.textMuted,
            marginBottom: tokens.space.lg,
          }}
        >
          {validation.feedback.map((text, index) => (
            <div key={index} style={{ marginBottom: tokens.space.xs }}>
              • {text}
            </div>
          ))}
        </div>
      )}

      {/* Calorie Chart */}
      <div
        style={{
          background: `linear-gradient(135deg, ${tokens.colors.orange}15, ${tokens.colors.orange}05)`,
          padding: tokens.space.lg,
          borderRadius: tokens.radii.md,
          border: `2px solid ${tokens.colors.orange}30`,
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
          TOTAL DE CALORIAS
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: tokens.colors.orange,
            marginBottom: tokens.space.xs,
          }}
        >
          {macros.calories}
        </div>
        <div style={{ fontSize: 14, color: tokens.colors.textMuted }}>
          {isFitness ? `Meta: ${targets.calories} kcal` : "Calorias consumidas"}
        </div>
        {isFitness && (
          <div
            style={{
              marginTop: tokens.space.md,
              height: 8,
              background: "rgba(0,0,0,0.1)",
              borderRadius: tokens.radii.full,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(
                  (macros.calories / targets.calories) * 100,
                  100
                )}%`,
              }}
              style={{
                height: "100%",
                background: tokens.colors.orange,
                borderRadius: tokens.radii.full,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
