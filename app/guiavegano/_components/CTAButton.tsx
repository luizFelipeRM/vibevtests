"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { colors } from "@/src/design/colors";
import { space } from "@/src/design/space";
import { radius } from "@/src/design/radius";
import { sizes } from "@/src/design/sizes";
import { fontSizes } from "@/src/design/fontSizes";
import { fontWeights } from "@/src/design/fontWeights";

interface CTAButtonProps {
  cta: {
    text: string;
    icon: string;
    link: string;
  };
  CtaIcon: any;
}

export default function CTAButton({ cta, CtaIcon }: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={() => window.open(cta.link, "_blank")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary_dark} 100%)`,
        padding: space.lg,
        borderRadius: radius.lg,
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: space.md,
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        boxShadow: isHovered
          ? `0 20px 40px ${colors.primary}40, 0 8px 16px ${colors.primary}25`
          : `0 4px 12px ${colors.primary}20`,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        minHeight: 80,
      }}
    >
      <motion.div
        animate={{ left: isHovered ? "120%" : "-20%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: space.lg,
          zIndex: 2,
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            width: sizes["3xl"],
            height: sizes["3xl"],
            borderRadius: radius.md,
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: colors.white,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <CtaIcon size={sizes.icon_md} strokeWidth={2.5} />
        </div>
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: fontSizes.md,
              fontWeight: fontWeights.bold,
              color: colors.white,
              display: "block",
              letterSpacing: "-0.01em",
            }}
          >
            {cta.text}
          </span>
          <span
            style={{
              fontSize: fontSizes.xs,
              fontWeight: fontWeights.medium,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Acessar aplicação
          </span>
        </div>
        <motion.div
          animate={{ x: isHovered ? 5 : 0, opacity: 1 }}
          style={{ color: colors.white }}
        >
          <ArrowRight size={sizes.icon_sm} strokeWidth={3} />
        </motion.div>
      </div>
    </motion.button>
  );
}
