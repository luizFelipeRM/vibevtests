import React from "react";
import { Settings } from "lucide-react";
import { Mode } from "../../types";
import { tokens } from "../../styles/tokens";
import { ModeToggle } from "../shared/ModeToggle";
import { CalendarWidget } from "../shared/CalendarWidget";

interface DashboardHeaderProps {
  mode: Mode;
  isFitness: boolean;
  onModeChange: () => void;
  selectedDate: Date;
  dateLabel: string;
  weekdayLabel: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onSettingsClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  mode,
  isFitness,
  onModeChange,
  dateLabel,
  weekdayLabel,
  onPreviousDay,
  onNextDay,
  onToday,
  onSettingsClick,
}) => {
  return (
    <div
      style={{
        background: "white",
        padding: tokens.space.xl,
        borderRadius: tokens.radii.lg,
        border: `2px solid ${tokens.colors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        marginBottom: tokens.space.xxl,
      }}
    >
      {/* Linha superior: Título + Controles */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.space.md,
        }}
      >
        {/* Título */}
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: tokens.colors.text,
            margin: 0,
          }}
        >
          {isFitness ? "Dashboard Fitness" : "Análise Rápida"}
        </h2>

        {/* Controles à direita */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.md,
          }}
        >
          {/* Calendário (apenas em fitness) */}
          {isFitness && (
            <CalendarWidget
              dateLabel={dateLabel}
              weekdayLabel={weekdayLabel}
              onPreviousDay={onPreviousDay}
              onNextDay={onNextDay}
              onToday={onToday}
            />
          )}

          {/* Botão de Configurações (apenas em fitness) */}
          {isFitness && (
            <button
              onClick={onSettingsClick}
              style={{
                padding: tokens.space.md,
                background: "white",
                border: `2px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.md,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = tokens.colors.bg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "white")
              }
            >
              <Settings size={18} color={tokens.colors.text} />
            </button>
          )}
        </div>
      </div>

      {/* Linha inferior: Descrição + Toggle de Modo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Descrição */}
        <p
          style={{
            fontSize: 14,
            color: tokens.colors.textMuted,
            margin: 0,
          }}
        >
          {isFitness
            ? "Acompanhe seus macros diariamente"
            : "Insira o que você costuma comer em um dia típico"}
        </p>

        {/* Mode Toggle */}
        <ModeToggle currentMode={mode} onModeChange={onModeChange} />
      </div>
    </div>
  );
};
