import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { radius } from "@/design/radius";
import { fontSizes } from "@/design/fontSizes";
import { fontWeights } from "@/design/fontWeights";

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
        gap: space.sm,
      }}
    >
      {/* Previous Day */}
      <button
        onClick={onPreviousDay}
        style={{
          padding: space.sm,
          background: colors.white,
          border: `2px solid ${colors.border}`,
          borderRadius: radius.lg,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = colors.surface_alt)
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = colors.white)}
      >
        <ChevronLeft size={fontSizes.md} color={colors.text_primary} />
      </button>

      {/* Date Display */}
      <div
        style={{
          padding: `${space.sm}px ${space.lg}px`,
          background: colors.white,
          border: `2px solid ${colors.border}`,
          borderRadius: radius.lg,
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.bold,
          color: colors.text_primary,
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
          padding: space.sm,
          background: colors.white,
          border: `2px solid ${colors.border}`,
          borderRadius: radius.lg,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = colors.surface_alt)
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = colors.white)}
      >
        <ChevronRight size={fontSizes.md} color={colors.text_primary} />
      </button>

      {/* Today Button */}
      <button
        onClick={onToday}
        style={{
          padding: `${space.sm}px ${space.md}px`,
          background: colors.white,
          border: `2px solid ${colors.border}`,
          borderRadius: radius.lg,
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.bold,
          color: colors.text_primary,
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = colors.surface_alt)
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = colors.white)}
      >
        Hoje
      </button>
    </div>
  );
};
