import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { radius } from "@/design/radius";
import { fontSizes } from "@/design/fontSizes";
import { fontWeights } from "@/design/fontWeights";
import { sizes } from "@/design/sizes";

interface MacroTooltipProps {
  label: string;
  brief: string;
  detailed: string;
  children: React.ReactNode;
}

export const MacroTooltip: React.FC<MacroTooltipProps> = ({
  label,
  brief,
  detailed,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: `calc(100% + ${space.md}px)`,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              minWidth: 320,
              maxWidth: 380,
              pointerEvents: "none",
            }}
          >
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: "50%",
                transform: "translateX(-50%)",
                width: sizes.xs,
                height: sizes.xs,
                background: colors.white,
                border: `2px solid ${colors.border}`,
                borderTop: "none",
                borderLeft: "none",
                rotate: "45deg",
              }}
            />

            {/* Tooltip content */}
            <div
              style={{
                background: colors.white,
                border: `2px solid ${colors.border}`,
                borderRadius: radius.xl,
                padding: space.lg,
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              <div
                style={{
                  fontSize: fontSizes.sm,
                  fontWeight: fontWeights.bold,
                  color: colors.text_primary,
                  marginBottom: space.xs,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: fontSizes.sm,
                  fontWeight: fontWeights.semibold,
                  color: colors.primary,
                  marginBottom: space.sm,
                  fontStyle: "italic",
                }}
              >
                {brief}
              </div>
              <div
                style={{
                  fontSize: fontSizes.xs,
                  lineHeight: 1.6,
                  color: colors.text_secondary,
                }}
              >
                {detailed}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
