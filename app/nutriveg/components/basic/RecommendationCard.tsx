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
        background: `linear-gradient(135deg, ${color}08, ${color}03)`,
        padding: tokens.space.xl,
        borderRadius: tokens.radii.lg,
        border: `2px solid ${color}20`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{ position: "absolute", top: tokens.space.md, right: tokens.space.md }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color,
            background: `${color}20`,
            padding: `${tokens.space.xs}px ${tokens.space.sm}px`,
            borderRadius: tokens.radii.pill,
            textTransform: "uppercase",
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
          marginBottom: tokens.space.lg,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radii.md,
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 16px ${color}40`,
          }}
        >
          <Icon size={28} color="white" strokeWidth={2.5} />
        </div>
        <h4 style={{ fontSize: 18, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>
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
