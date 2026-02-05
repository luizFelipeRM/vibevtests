import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "../../styles/tokens";

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
              bottom: "calc(100% + 12px)",
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
                width: 12,
                height: 12,
                background: "white",
                border: `2px solid ${tokens.colors.border}`,
                borderTop: "none",
                borderLeft: "none",
                rotate: "45deg",
              }}
            />

            {/* Tooltip content */}
            <div
              style={{
                background: "white",
                border: `2px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.lg,
                padding: tokens.space.lg,
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: tokens.colors.text,
                  marginBottom: tokens.space.xs,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: tokens.colors.primary,
                  marginBottom: tokens.space.sm,
                  fontStyle: "italic",
                }}
              >
                {brief}
              </div>
              <div
                style={{
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: tokens.colors.textMuted,
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
