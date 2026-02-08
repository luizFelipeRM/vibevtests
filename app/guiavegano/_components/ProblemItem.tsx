"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChefHat,
  MapPin,
  Heart,
  Users,
  Stethoscope,
  Camera,
  Book,
  MapPinned,
  BarChart3,
  CalendarDays,
  MessageCircle,
  HeartHandshake,
  Hospital,
  ChevronDown,
  Zap,
} from "lucide-react";
import { colors } from "@/src/design/colors";
import { space } from "@/src/design/space";
import { radius } from "@/src/design/radius";
import { sizes } from "@/src/design/sizes";
import { fontSizes } from "@/src/design/fontSizes";
import { fontWeights } from "@/src/design/fontWeights";
import { lineHeights } from "@/src/design/lineHeights";
import CTAButton from "./CTAButton";

interface ProblemItemProps {
  item: {
    id: number;
    title: string;
    problem: string;
    content: string[];
    ctas: Array<{
      text: string;
      icon: string;
      link: string;
    }>;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ProblemItem({
  item,
  isExpanded,
  onToggle,
}: ProblemItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap: Record<number, any> = {
    1: Search,
    2: ChefHat,
    3: MapPin,
    4: Heart,
    5: Users,
    6: Stethoscope,
  };

  const Icon = iconMap[item.id as number];

  const ctaIconMap: Record<string, any> = {
    "📷": Camera,
    "🔎": Search,
    "📖": Book,
    "💾": BarChart3,
    "🗺️": MapPinned,
    "📊": BarChart3,
    "🎪": CalendarDays,
    "💬": MessageCircle,
    "💕": HeartHandshake,
    "🩺": Hospital,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ marginBottom: space.xl, width: "100%" }}
    >
      <motion.div
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          padding: `${space.xl}px ${space.xl}px ${
            isExpanded ? space.md : space.xl
          }px`,
          backgroundColor: isExpanded ? colors.surface : "transparent",
          borderRadius: `${radius.lg}px ${radius.lg}px ${
            isExpanded ? 0 : radius.lg
          }px ${isExpanded ? 0 : radius.lg}px`,
          borderBottom: isExpanded ? `1px solid ${colors.border}` : "none",
          textAlign: "left",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: space.xl,
            flex: 1,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: radius.md,
              background: isExpanded
                ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary_dark} 100%)`
                : colors.primary_lighter,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: isExpanded ? colors.white : colors.primary,
              transition: "all 0.3s ease",
            }}
          >
            <Icon size={sizes.icon_lg} strokeWidth={2.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: fontSizes["2xl"],
                fontWeight: fontWeights.extrabold,
                color: colors.text_primary,
                marginBottom: 4,
                letterSpacing: "-0.01em",
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: fontSizes.md,
                color: colors.text_secondary,
                fontWeight: fontWeights.medium,
              }}
            >
              {item.problem}
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          style={{ marginLeft: space.lg }}
        >
          <ChevronDown size={sizes.icon_md} color={colors.primary} strokeWidth={3} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: colors.surface,
              borderRadius: `0 0 ${radius.lg}px ${radius.lg}px`,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ padding: space.xl }}>
              <div style={{ marginBottom: space.xl }}>
                <p
                  style={{
                    fontSize: fontSizes.md,
                    color: colors.text_secondary,
                    lineHeight: lineHeights.relaxed,
                    marginBottom: space.lg,
                    paddingLeft: space.md,
                    borderLeft: `3px solid ${colors.primary}20`,
                  }}
                >
                  Apps integrados para facilitar sua jornada:
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: space.md,
                  }}
                >
                  {item.content.map((contentItem: string, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        padding: space.md,
                        backgroundColor: colors.background,
                        borderRadius: radius.md,
                        display: "flex",
                        alignItems: "center",
                        gap: space.md,
                        border: `1px solid ${colors.border}40`,
                      }}
                    >
                      <div
                        style={{
                          width: sizes.icon_lg,
                          height: sizes.icon_lg,
                          borderRadius: radius.full,
                          background: colors.primary,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: colors.white,
                          fontSize: fontSizes.xs,
                          fontWeight: fontWeights.bold,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <span
                        style={{
                          fontSize: fontSizes.md,
                          color: colors.text_primary,
                          fontWeight: fontWeights.medium,
                        }}
                      >
                        {contentItem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: `linear-gradient(135deg, ${colors.primary_lighter} 0%, rgba(255,255,255,0.2) 100%)`,
                  padding: space.xl,
                  borderRadius: radius.lg,
                  border: `1px solid ${colors.primary}15`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: space.md,
                    marginBottom: space.xl,
                  }}
                >
                  <div
                    style={{
                      width: sizes["2xl"],
                      height: sizes["2xl"],
                      borderRadius: radius.md,
                      backgroundColor: colors.white,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Zap size={sizes.icon_sm} color={colors.primary} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: fontSizes.lg,
                        fontWeight: fontWeights.extrabold,
                        color: colors.text_primary,
                        margin: 0,
                      }}
                    >
                      Resolva facilita agora no Ecossistema
                    </h4>
                    <p
                      style={{
                        fontSize: fontSizes.sm,
                        color: colors.text_secondary,
                        margin: 0,
                      }}
                    >
                      Infraestrutura de apps dedicados
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: space.md,
                  }}
                >
                  {item.ctas.map((cta: any, idx: number) => {
                    const CtaIcon = ctaIconMap[cta.icon] || Search;
                    return <CTAButton key={idx} cta={cta} CtaIcon={CtaIcon} />;
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
