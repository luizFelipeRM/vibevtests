import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tokens } from "../../styles/tokens";

interface CalendarWidgetProps {
  dateLabel: string;
  weekdayLabel: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  dateLabel,
  weekdayLabel,
  onPreviousDay,
  onNextDay,
  onToday,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: tokens.space.sm,
      }}
    >
      {/* Previous Day */}
      <button
        onClick={onPreviousDay}
        style={{
          padding: tokens.space.sm,
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
        onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
      >
        <ChevronLeft size={16} color={tokens.colors.text} />
      </button>

      {/* Date Display */}
      <div
        style={{
          padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
          background: "white",
          border: `2px solid ${tokens.colors.border}`,
          borderRadius: tokens.radii.md,
          fontSize: 14,
          fontWeight: 700,
          color: tokens.colors.text,
          minWidth: 140,
          textAlign: "center",
        }}
      >
        {dateLabel} • {weekdayLabel}
      </div>

      {/* Next Day */}
      <button
        onClick={onNextDay}
        style={{
          padding: tokens.space.sm,
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
        onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
      >
        <ChevronRight size={16} color={tokens.colors.text} />
      </button>

      {/* Today Button */}
      <button
        onClick={onToday}
        style={{
          padding: `${tokens.space.sm}px ${tokens.space.md}px`,
          background: "white",
          border: `2px solid ${tokens.colors.border}`,
          borderRadius: tokens.radii.md,
          fontSize: 13,
          fontWeight: 700,
          color: tokens.colors.text,
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = tokens.colors.bg)
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
      >
        Hoje
      </button>
    </div>
  );
};
