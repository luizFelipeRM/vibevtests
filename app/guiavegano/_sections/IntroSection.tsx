"use client";
import { motion } from "framer-motion";
import { Leaf, Zap, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { colors } from "@/src/design/colors";
import { space } from "@/src/design/space";
import { radius } from "@/src/design/radius";
import { sizes } from "@/src/design/sizes";
import { fontSizes } from "@/src/design/fontSizes";
import { fontWeights } from "@/src/design/fontWeights";
import { lineHeights } from "@/src/design/lineHeights";

interface IntroSectionProps {
  onStartClick: () => void;
}

export default function IntroSection({ onStartClick }: IntroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any },
    },
  };

  const benefits = [
    { icon: Zap, text: "Soluções Instantâneas" },
    { icon: CheckCircle2, text: "Apps Especializados" },
    { icon: Users, text: "Ecossistema Completo" },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: `${space["3xl"]}px ${space.xl}px`,
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      {/* Immersive background elements */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.primary}14 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.02,
            backgroundImage: `radial-gradient(${colors.primary} 0.5px, transparent 0.5px)`,
            backgroundSize: `${sizes.lg}px ${sizes.lg}px`,
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          maxWidth: sizes.pagecontainer,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <motion.div
          variants={itemVariants}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: sizes["5xl"],
            height: sizes["5xl"],
            backgroundColor: colors.white,
            borderRadius: radius.lg,
            color: colors.primary_dark,
            marginBottom: space.xl,
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
            border: `1px solid ${colors.border}`,
          }}
        >
          <Leaf size={sizes.xl} strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4.2rem)",
            fontWeight: fontWeights.extrabold,
            color: colors.text_primary,
            lineHeight: lineHeights.tight,
            marginBottom: space.lg,
            letterSpacing: "-0.04em",
          }}
        >
          O Ecossistema de Apps que
          <br />
          <span style={{ color: colors.primary_dark }}>
            facilita sua vida vegana.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: fontSizes.xl,
            color: colors.text_secondary,
            maxWidth: 740,
            margin: "0 auto",
            marginBottom: space.xxl,
            lineHeight: lineHeights.relaxed,
            fontWeight: fontWeights.medium,
          }}
        >
          Descubra o primeiro Super App dedicado a facilitar cada passo da sua
          jornada. Uma infraestrutura de aplicações integradas para resolver —
          na hora — qualquer dificuldade de ser vegano hoje.
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.md,
            marginBottom: space["3xl"],
          }}
        >
          <button
            onClick={onStartClick}
            style={{
              backgroundColor: colors.text_primary,
              color: colors.white,
              padding: `${space.md}px ${space.xxl}px`,
              borderRadius: radius.lg,
              border: "none",
              fontSize: fontSizes.lg,
              fontWeight: fontWeights.bold,
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: space.sm,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              width: "fit-content",
            }}
          >
            Dificuldades Veganas que o APP resolve{" "}
            <ArrowRight size={sizes.icon_sm} />
          </button>

          <span
            style={{
              fontSize: fontSizes.sm,
              color: colors.text_secondary,
              fontWeight: fontWeights.semibold,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Tecnologia para Facilitar sua Vida Ética
          </span>
        </motion.div>

        {/* Minimal Benefits Grid */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: space.xl,
            maxWidth: 800,
            margin: "0 auto",
            padding: space.xl,
            backgroundColor: colors.white,
            borderRadius: radius.xl,
            border: `1px solid ${colors.border}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
          }}
        >
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: space.sm,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: sizes["2xl"],
                  height: sizes["2xl"],
                  borderRadius: radius.full,
                  backgroundColor: colors.primary_lighter,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: space.xs,
                  color: colors.primary_dark,
                }}
              >
                <benefit.icon size={sizes.icon_sm} />
              </div>
              <span
                style={{
                  fontSize: fontSizes.sm,
                  color: colors.text_primary,
                  fontWeight: fontWeights.semibold,
                }}
              >
                {benefit.text}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
