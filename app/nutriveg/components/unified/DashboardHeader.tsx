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
        padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
        borderRadius: tokens.radii.xl,
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        marginBottom: tokens.space.xl,
      }}
    >
      {/* Linha superior: Título + Controles */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: tokens.space.lg,
        }}
      >
        {/* Lado Esquerdo: Título e Descrição */}
        <div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: tokens.colors.text,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {isFitness ? "Dashboard Fitness" : "Análise Rápida"}
          </h2>
          <p
            style={{
              fontSize: 14,
              color: tokens.colors.textMuted,
              marginTop: tokens.space.xs,
              marginRight: tokens.space.md,
            }}
          >
            {isFitness
              ? "Acompanhe seus macros diariamente"
              : "Insira o que você costuma comer em um dia típico"}
          </p>
        </div>

        {/* Lado Direito: Controles */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.md,
          }}
        >
          {/* Mode Toggle integrated here */}
          <div style={{ marginRight: tokens.space.sm }}>
            <ModeToggle currentMode={mode} onModeChange={onModeChange} />
          </div>

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
                width: 42,
                height: 42,
                background: "white",
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.md,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = tokens.colors.bg;
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
              }}
            >
              <Settings size={20} color={tokens.colors.text} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
