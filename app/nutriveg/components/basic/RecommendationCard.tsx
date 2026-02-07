import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { tokens } from "../../styles/tokens";

interface RecommendationCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  priority: "alta" | "média" | "baixa";
  index: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  icon: Icon,
  title,
  desc,
  color,
  priority,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        background: "white",
        padding: tokens.space.xl,
        borderRadius: tokens.radii.lg,
        border: `1px solid ${tokens.colors.border}`,
        position: "relative",
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
      }}
    >
      <div
        style={{ position: "absolute", top: tokens.space.md, right: tokens.space.md }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: tokens.colors.textMuted,
            background: tokens.colors.bg,
            padding: `2px 8px`,
            borderRadius: tokens.radii.full,
            textTransform: "uppercase",
            border: `1px solid ${tokens.colors.border}`,
          }}
        >
          {priority}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.space.md,
          marginBottom: tokens.space.md,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: tokens.radii.md,
            background: `${color}10`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={22} color={color} strokeWidth={2} />
        </div>
        <h4 style={{ fontSize: 16, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>
          {title}
        </h4>
      </div>

      <p
        style={{
          fontSize: 14,
          color: tokens.colors.textMuted,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
};
