"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
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
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

// Design Tokens
const tokens = {
  colors: {
    bg: "#fafafa",
    surface: "#ffffff",
    surfaceAlt: "#f8fafc",
    primary: "#10b981",
    primaryLight: "#d1fae5",
    primaryLighter: "#ecfdf5",
    primaryDark: "#059669",
    accent: "#8b5cf6",
    text: "#111827",
    textMuted: "#6b7280",
    border: "#e5e7eb",
  },
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    giant: 64,
    massive: 96,
  },
  radii: {
    md: 12,
    lg: 16,
    xl: 24,
    pill: 50,
    full: 9999,
  },
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Hero Section
function IntroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const benefits = [
    { icon: Zap, text: "Te ajudar a decidir rápido" },
    { icon: CheckCircle2, text: "Evitar erros desnecessários" },
    { icon: Users, text: "Conectar você com pessoas e serviços veganos" },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)",
        padding: `${tokens.space.massive}px ${tokens.space.xl}px`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Elementos decorativos */}
      <FloatingElement delay={0}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.1)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
      </FloatingElement>

      <FloatingElement delay={1}>
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "5%",
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.1)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
      </FloatingElement>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Ícone principal */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 5 }}
          style={{
            width: 120,
            height: 120,
            borderRadius: tokens.radii.full,
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            marginBottom: tokens.space.xxl,
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
            border: "6px solid white",
          }}
        >
          <Leaf size={56} color="white" strokeWidth={2.5} />
        </motion.div>

        {/* Título */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: tokens.colors.text,
            lineHeight: 1.2,
            marginBottom: tokens.space.xl,
            letterSpacing: "-0.02em",
          }}
        >
          Ser vegano é simples.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
              marginTop: tokens.space.md,
            }}
          >
            O difícil é viver num mundo que não foi feito pra isso.
          </span>
        </motion.h1>

        {/* Card de benefícios */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            padding: tokens.space.xxl,
            borderRadius: tokens.radii.xl,
            border: "1px solid rgba(16, 185, 129, 0.2)",
            maxWidth: 700,
            margin: "0 auto",
            marginBottom: tokens.space.xxl,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: tokens.space.sm,
              marginBottom: tokens.space.xl,
            }}
          >
            <Sparkles size={24} color={tokens.colors.primary} />
            <p
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: tokens.colors.text,
                margin: 0,
              }}
            >
              Esse app existe pra:
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: tokens.space.lg,
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.lg,
                  padding: tokens.space.lg,
                  borderRadius: tokens.radii.md,
                  background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
                  border: `1px solid ${tokens.colors.border}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radii.md,
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <benefit.icon size={24} color="white" strokeWidth={2.5} />
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: tokens.colors.text,
                    fontWeight: 500,
                  }}
                >
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Frase final */}
        <motion.div
          variants={itemVariants}
          style={{
            padding: tokens.space.xl,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              height: 2,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              marginBottom: tokens.space.xl,
              borderRadius: tokens.radii.full,
            }}
          />
          <p
            style={{
              fontSize: 24,
              fontStyle: "italic",
              color: tokens.colors.primaryDark,
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            A gente cuida da parte chata.
            <br />
            <span style={{ fontWeight: 700 }}>Você só vive.</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Question Item
function QuestionItem({ question, isExpanded, onToggle }) {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap = {
    1: Search,
    2: ChefHat,
    3: MapPin,
    4: Heart,
    5: Users,
    6: Stethoscope,
  };

  const Icon = iconMap[question.id];

  const ctaIconMap = {
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginBottom: tokens.space.lg,
        width: "100%",
      }}
    >
      <motion.button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        style={{
          width: "100%",
          padding: tokens.space.xl,
          backgroundColor: isExpanded ? "rgba(255, 255, 255, 1)" : tokens.colors.surface,
          border: `2px solid ${isExpanded ? tokens.colors.primary : tokens.colors.border}`,
          borderRadius: tokens.radii.lg,
          textAlign: "left",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: isExpanded ? "0 10px 30px rgba(0, 0, 0, 0.1)" : "0 1px 3px rgba(0,0,0,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradiente de fundo no hover */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${tokens.colors.primaryLighter} 0%, transparent 100%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.xl,
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Ícone */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            style={{
              width: 70,
              height: 70,
              borderRadius: tokens.radii.lg,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: isExpanded
                ? "0 0 30px rgba(16, 185, 129, 0.3)"
                : "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <Icon size={32} color="white" strokeWidth={2.5} />
          </motion.div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: tokens.colors.text,
                marginBottom: tokens.space.xs,
                display: "flex",
                alignItems: "center",
                gap: tokens.space.md,
              }}
            >
              {question.title}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "white",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  padding: `${tokens.space.xs}px ${tokens.space.md}px`,
                  borderRadius: tokens.radii.pill,
                }}
              >
                {question.id}/6
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                color: tokens.colors.textMuted,
                fontStyle: "italic",
              }}
            >
              {question.problem}
            </div>
          </div>
        </div>

        {/* Ícone de expansão */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            marginLeft: tokens.space.lg,
            zIndex: 1,
          }}
        >
          <ChevronDown size={28} color={tokens.colors.primary} strokeWidth={2.5} />
        </motion.div>
      </motion.button>

      {/* Conteúdo expandido */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: tokens.space.xxl,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                border: `2px solid ${tokens.colors.primary}`,
                borderTop: "none",
                borderRadius: `0 0 ${tokens.radii.lg}px ${tokens.radii.lg}px`,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Informações importantes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  marginBottom: tokens.space.xxl,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: tokens.space.md,
                    marginBottom: tokens.space.xl,
                  }}
                >
                  <Sparkles size={24} color={tokens.colors.primary} />
                  <h4
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: tokens.colors.text,
                      margin: 0,
                    }}
                  >
                    Informações importantes
                  </h4>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: tokens.space.lg,
                  }}
                >
                  {question.content.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      style={{
                        padding: tokens.space.lg,
                        backgroundColor: "white",
                        borderRadius: tokens.radii.md,
                        border: `1px solid ${tokens.colors.border}`,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: tokens.space.md,
                        transition: "all 0.3s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                        cursor: "default",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: tokens.radii.full,
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "white",
                          fontSize: 14,
                          fontWeight: 700,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                        }}
                      >
                        {index + 1}
                      </div>
                      <span
                        style={{
                          fontSize: 16,
                          color: tokens.colors.text,
                          lineHeight: 1.6,
                        }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: tokens.space.md,
                    marginBottom: tokens.space.xl,
                  }}
                >
                  <Zap size={24} color={tokens.colors.accent} />
                  <h4
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: tokens.colors.text,
                      margin: 0,
                    }}
                  >
                    No nosso app você pode
                  </h4>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: tokens.space.md,
                  }}
                >
                  {question.ctas.map((cta, index) => {
                    const CtaIcon = ctaIconMap[cta.icon] || Search;
                    return (
                      <CTAButton key={index} cta={cta} CtaIcon={CtaIcon} />
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// CTA Button Component
function CTAButton({ cta, CtaIcon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={() => window.open(cta.link, "_blank")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
        backgroundColor: "white",
        color: isHovered ? "white" : tokens.colors.primary,
        border: `2px solid ${tokens.colors.primary}`,
        borderRadius: tokens.radii.md,
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.space.md,
          zIndex: 1,
          position: "relative",
        }}
      >
        <CtaIcon size={20} strokeWidth={2.5} />
        <span>{cta.text}</span>
      </div>
      <ArrowRight
        size={20}
        strokeWidth={2.5}
        style={{ zIndex: 1, position: "relative" }}
      />
    </motion.button>
  );
}

// Questions Section
function QuestionsSection() {
  const [expandedQuestion, setExpandedQuestion] = useState(1);

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div
      style={{
        padding: `${tokens.space.giant}px ${tokens.space.xl}px`,
        maxWidth: "1100px",
        margin: "0 auto",
        backgroundColor: tokens.colors.bg,
      }}
    >
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          marginBottom: tokens.space.giant,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: tokens.space.sm,
            padding: `${tokens.space.md}px ${tokens.space.xl}px`,
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            borderRadius: tokens.radii.pill,
            marginBottom: tokens.space.xl,
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
          }}
        >
          <Sparkles size={18} color="white" />
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "white",
            }}
          >
            Guia completo
          </span>
        </motion.div>

        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: tokens.colors.text,
            marginBottom: tokens.space.lg,
            letterSpacing: "-0.02em",
          }}
        >
          Perguntas recorrentes
        </h2>
        <p
          style={{
            fontSize: 20,
            color: tokens.colors.textMuted,
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Clique em qualquer pergunta para ver informações detalhadas e soluções
          práticas
        </p>
      </motion.div>

      {/* Lista de perguntas */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: tokens.space.lg,
        }}
      >
        {questionsData.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <QuestionItem
              question={question}
              isExpanded={expandedQuestion === question.id}
              onToggle={() => toggleQuestion(question.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Rodapé */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02, y: -5 }}
        style={{
          marginTop: tokens.space.giant,
          padding: tokens.space.xxl,
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          borderRadius: tokens.radii.xl,
          textAlign: "center",
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingElement>
          <div
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
        </FloatingElement>

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Leaf
            size={48}
            color="white"
            strokeWidth={2}
            style={{ marginBottom: tokens.space.lg }}
          />
        </motion.div>

        <p
          style={{
            fontSize: 24,
            color: "white",
            fontWeight: 700,
            marginBottom: tokens.space.xl,
            position: "relative",
          }}
        >
          Baixe nosso app para ter todas essas soluções na palma da mão
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: `${tokens.space.lg}px ${tokens.space.xxl}px`,
            backgroundColor: "white",
            color: tokens.colors.primary,
            border: "none",
            borderRadius: tokens.radii.pill,
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: tokens.space.md,
            position: "relative",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          Baixar App Gratuito
          <ArrowRight size={24} strokeWidth={2.5} />
        </motion.button>
      </motion.div>
    </div>
  );
}

// Dados das perguntas
const questionsData = [
  {
    id: 1,
    title: "Decidir sem errar",
    problem: "Isso é vegano?",
    content: [
      "Erros comuns que iniciantes cometem ao ler rótulos",
      "Ingredientes armadilha que parecem veganos mas não são",
      "Como identificar derivados animais em listas de ingredientes",
    ],
    ctas: [
      { text: "Escanear produto", icon: "📷", link: "/app/scanner" },
      { text: "Pesquisar ingrediente", icon: "🔎", link: "/app/ingredients" },
    ],
  },
  {
    id: 2,
    title: "Comer no dia a dia",
    problem: "O que eu como?",
    content: [
      "Prato vegano simples e completo para todas as refeições",
      "Combinações básicas para nutrição equilibrada",
      "Substituições simples para ingredientes não-veganos",
    ],
    ctas: [
      { text: "Ver receitas", icon: "📖", link: "/app/recipes" },
      { text: "Salvar refeições base", icon: "💾", link: "/app/meal-plans" },
    ],
  },
  {
    id: 3,
    title: "Comer fora",
    problem: "Onde comer?",
    content: [
      "Como perguntar no restaurante sem constrangimento",
      "O que evitar em cardápios aparentemente veganos",
      "Restaurantes étnicos com mais opções naturais",
    ],
    ctas: [
      {
        text: "Ver restaurantes perto de mim",
        icon: "🗺️",
        link: "/app/restaurants",
      },
    ],
  },
  {
    id: 4,
    title: "Alimentação ok",
    problem: "Tô fazendo certo?",
    content: [
      "Nutrientes-chave que precisam de atenção especial",
      "Suplementação de B12: por que é essencial e como fazer",
      "Fontes veganas de proteína, ferro e cálcio",
    ],
    ctas: [
      { text: "Configurar Nutri Simples", icon: "📊", link: "/app/nutrition" },
    ],
  },
  {
    id: 5,
    title: "Vida social",
    problem: "Sou o único vegano?",
    content: [
      "Normalização: você não está sozinho nesta jornada",
      "Como lidar com questionamentos de familiares e amigos",
      "Encontrar apoio e inspiração em grupos veganos",
    ],
    ctas: [
      { text: "Ver eventos", icon: "🎪", link: "/app/events" },
      { text: "Entrar na comunidade", icon: "💬", link: "/app/community" },
      { text: "Conhecer pessoas veganas", icon: "💕", link: "/app/meet" },
    ],
  },
  {
    id: 6,
    title: "Saúde",
    problem: "Preciso de ajuda profissional?",
    content: [
      "Quando procurar um profissional de saúde especializado",
      "Que tipo de profissional procurar (nutricionista, médico)",
      "Como encontrar profissionais que respeitam sua escolha vegana",
    ],
    ctas: [
      {
        text: "Encontrar profissionais veganos",
        icon: "🩺",
        link: "/app/professionals",
      },
    ],
  },
];

// Componente Principal
function VeganGuidePage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: tokens.colors.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: tokens.colors.text,
      }}
    >
      <IntroSection />
      <QuestionsSection />

      {/* Estilos globais */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        button {
          font-family: inherit;
          outline: none;
        }
      `}</style>
    </div>
  );
}

export default VeganGuidePage;
