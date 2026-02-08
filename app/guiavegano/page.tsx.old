"use client";
import React, { useState, useRef, useEffect } from "react";
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
  Monitor,
  Apple,
  X,
  MessageSquare,
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

// Hero Section
function IntroSection({ onStartClick }: { onStartClick: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any } },
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
        padding: `${tokens.space.massive}px ${tokens.space.xl}px ${tokens.space.massive}px`,
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}
    >
      {/* Immersive background elements */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "radial-gradient(#10b981 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <motion.div variants={itemVariants} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, backgroundColor: "white", borderRadius: tokens.radii.lg, color: tokens.colors.primaryDark, marginBottom: tokens.space.xl, boxShadow: "0 10px 25px rgba(0,0,0,0.06)", border: `1px solid ${tokens.colors.border}` }}>
          <Leaf size={32} strokeWidth={2.5} />
        </motion.div>

        <motion.h1 variants={itemVariants} style={{ fontSize: "clamp(2.5rem, 8vw, 4.2rem)", fontWeight: 800, color: tokens.colors.text, lineHeight: 1.1, marginBottom: tokens.space.lg, letterSpacing: "-0.04em" }}>
          O Ecossistema de Apps que<br />
          <span style={{ color: tokens.colors.primaryDark }}>facilita sua vida vegana.</span>
        </motion.h1>

        <motion.p variants={itemVariants} style={{ fontSize: 20, color: tokens.colors.textMuted, maxWidth: 740, margin: "0 auto", marginBottom: tokens.space.xxl, lineHeight: 1.6, fontWeight: 450 }}>
          Descubra o primeiro Super App dedicado a facilitar cada passo da sua jornada. Uma infraestrutura de aplicações integradas para resolver — na hora — qualquer dificuldade de ser vegano hoje.
        </motion.p>

        <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.massive }}>
          <button
            onClick={onStartClick}
            style={{ backgroundColor: tokens.colors.text, color: "white", padding: `${tokens.space.md}px ${tokens.space.xxl}px`, borderRadius: tokens.radii.lg, border: "none", fontSize: 17, fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: tokens.space.sm, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", width: "fit-content" }}
          >
            Dificuldades Veganas que o APP resolve <ArrowRight size={20} />
          </button>

          <span style={{ fontSize: 13, color: tokens.colors.textMuted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Tecnologia para Facilitar sua Vida Ética
          </span>
        </motion.div>

        {/* Minimal Benefits Grid */}
        <motion.div variants={itemVariants} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: tokens.space.xl, maxWidth: 800, margin: "0 auto", padding: tokens.space.xl, backgroundColor: "white", borderRadius: tokens.radii.xl, border: `1px solid ${tokens.colors.border}`, boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
          {benefits.map((benefit, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: tokens.space.sm, textAlign: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: tokens.radii.full, backgroundColor: tokens.colors.primaryLighter, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: tokens.space.xs, color: tokens.colors.primaryDark }}>
                <benefit.icon size={20} />
              </div>
              <span style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 600 }}>{benefit.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Problem Solver Item
function ProblemItem({ item, isExpanded, onToggle }: { item: any; isExpanded: boolean; onToggle: () => void }) {
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
      style={{ marginBottom: tokens.space.xl, width: "100%" }}
    >
      <motion.div
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          padding: `${tokens.space.xl}px ${tokens.space.xl}px ${isExpanded ? tokens.space.md : tokens.space.xl}px`,
          backgroundColor: isExpanded ? tokens.colors.surface : "transparent",
          borderRadius: `${tokens.radii.lg}px ${tokens.radii.lg}px ${isExpanded ? 0 : tokens.radii.lg}px ${isExpanded ? 0 : tokens.radii.lg}px`,
          borderBottom: isExpanded ? `1px solid ${tokens.colors.border}` : "none",
          textAlign: "left",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xl, flex: 1, zIndex: 1 }}>
          <div style={{ width: 60, height: 60, borderRadius: tokens.radii.md, background: isExpanded ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : tokens.colors.primaryLighter, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: isExpanded ? "white" : tokens.colors.primary, transition: "all 0.3s ease" }}>
            <Icon size={28} strokeWidth={2.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: tokens.colors.text, marginBottom: 4, letterSpacing: "-0.01em" }}>{item.title}</div>
            <div style={{ fontSize: 16, color: tokens.colors.textMuted, fontWeight: 500 }}>{item.problem}</div>
          </div>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} style={{ marginLeft: tokens.space.lg }}>
          <ChevronDown size={24} color={tokens.colors.primary} strokeWidth={3} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: tokens.colors.surface, borderRadius: `0 0 ${tokens.radii.lg}px ${tokens.radii.lg}px`, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
          >
            <div style={{ padding: tokens.space.xl }}>
              <div style={{ marginBottom: tokens.space.xl }}>
                <p style={{ fontSize: 16, color: tokens.colors.textMuted, lineHeight: 1.6, marginBottom: tokens.space.lg, paddingLeft: tokens.space.md, borderLeft: `3px solid ${tokens.colors.primary}20` }}>
                  Apps integrados para facilitar sua jornada:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: tokens.space.md }}>
                  {item.content.map((contentItem: any, idx: number) => (
                    <div key={idx} style={{ padding: tokens.space.md, backgroundColor: tokens.colors.bg, borderRadius: tokens.radii.md, display: "flex", alignItems: "center", gap: tokens.space.md, border: `1px solid ${tokens.colors.border}40` }}>
                      <div style={{ width: 28, height: 28, borderRadius: tokens.radii.full, background: tokens.colors.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", fontSize: 12, fontWeight: 700 }}>{idx + 1}</div>
                      <span style={{ fontSize: 15, color: tokens.colors.text, fontWeight: 500 }}>{contentItem}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: `linear-gradient(135deg, ${tokens.colors.primaryLighter} 0%, rgba(255,255,255,0.2) 100%)`, padding: tokens.space.xl, borderRadius: tokens.radii.lg, border: `1px solid ${tokens.colors.primary}15` }}>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.xl }}>
                  <div style={{ width: 40, height: 40, borderRadius: tokens.radii.md, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}><Zap size={22} color={tokens.colors.primary} /></div>
                  <div>
                    <h4 style={{ fontSize: 18, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>Resolva facilita agora no Ecossistema</h4>
                    <p style={{ fontSize: 13, color: tokens.colors.textMuted, margin: 0 }}>Infraestrutura de apps dedicados</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: tokens.space.md }}>
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

// CTA Button Component
function CTAButton({ cta, CtaIcon }: { cta: any; CtaIcon: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={() => window.open(cta.link, "_blank")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        padding: tokens.space.lg,
        borderRadius: tokens.radii.lg,
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: tokens.space.md,
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        boxShadow: isHovered ? `0 20px 40px ${tokens.colors.primary}40, 0 8px 16px ${tokens.colors.primary}25` : `0 4px 12px ${tokens.colors.primary}20`,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        minHeight: 80,
      }}
    >
      <motion.div animate={{ left: isHovered ? "120%" : "-20%" }} transition={{ duration: 0.8, ease: "easeInOut" }} style={{ position: "absolute", top: 0, width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: tokens.space.lg, zIndex: 2, position: "relative", width: "100%" }}>
        <div style={{ width: 48, height: 48, borderRadius: tokens.radii.md, background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <CtaIcon size={24} strokeWidth={2.5} />
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "white", display: "block", letterSpacing: "-0.01em" }}>{cta.text}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255, 255, 255, 0.8)" }}>Acessar aplicação</span>
        </div>
        <motion.div animate={{ x: isHovered ? 5 : 0, opacity: 1 }} style={{ color: "white" }}>
          <ArrowRight size={20} strokeWidth={3} />
        </motion.div>
      </div>
    </motion.button>
  );
}

// Custom Android Icon
const AndroidIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.523 15.3414C17.0734 15.3414 16.7092 14.9772 16.7092 14.5275C16.7092 14.0779 17.0734 13.7137 17.523 13.7137C17.9727 13.7137 18.3369 14.0779 18.3369 14.5275C18.3369 14.9772 17.9727 15.3414 17.523 15.3414ZM6.47702 15.3414C6.02736 15.3414 5.66318 14.9772 5.66318 14.5275C5.66318 14.0779 6.02736 13.7137 6.47702 13.7137C6.92668 13.7137 7.29086 14.0779 7.29086 14.5275C7.29086 14.9772 6.92668 15.3414 6.47702 15.3414ZM17.9863 11.238L19.7825 8.12659C19.9213 7.88607 19.8389 7.57917 19.5984 7.4404C19.3578 7.30164 19.051 7.38401 18.9122 7.62453L17.1009 10.7618C15.6599 10.1036 14.0041 9.71887 12.25 9.71887C10.4959 9.71887 8.84013 10.1036 7.39912 10.7618L5.58778 7.62453C5.44901 7.38401 5.14211 7.30164 4.90159 7.4404C4.66107 7.57917 4.5787 7.88601 4.71746 8.12659L6.51371 11.238C3.12056 12.915 0.796875 16.3315 0.75 20.3228H23.75C23.7031 16.3315 21.3794 12.915 17.9863 11.238Z" />
  </svg>
);

function QuestionsSection({ expandedIndices, setExpandedIndices, sectionRef }: { expandedIndices: number[]; setExpandedIndices: React.Dispatch<React.SetStateAction<number[]>>; sectionRef: React.RefObject<HTMLDivElement> }) {
  return (
    <section
      id="questions"
      ref={sectionRef}
      style={{ padding: `0 0 ${tokens.space.massive}px`, position: "relative" }}
    >
      <div style={{ maxWidth: 840, margin: "0 auto", padding: `0 ${tokens.space.lg}px` }}>
        {questionsData.map((item: any, index: number) => (
          <ProblemItem key={item.id} item={item} isExpanded={expandedIndices.includes(index)} onToggle={() => setExpandedIndices(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginTop: tokens.space.massive, padding: `${tokens.space.massive}px ${tokens.space.xl}px`, background: "linear-gradient(135deg, #065f46 0%, #059669 100%)", textAlign: "center", position: "relative", overflow: "hidden", width: "100vw", marginLeft: "calc(-50vw + 50%)", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "50%", height: "120%", background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", bottom: "-20%", left: "-5%", width: "40%", height: "100%", background: "radial-gradient(circle, rgba(5, 150, 105, 0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} style={{ width: 56, height: 56, borderRadius: tokens.radii.lg, background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", marginBottom: tokens.space.xl, color: "white", border: "1px solid rgba(255, 255, 255, 0.2)" }}><Leaf size={28} strokeWidth={2.5} /></motion.div>
          <h3 style={{ fontSize: 40, color: "white", fontWeight: 800, marginBottom: tokens.space.lg, letterSpacing: "-0.02em" }}>O Super App na sua mão</h3>
          <p style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.9)", maxWidth: 700, margin: "0 auto", marginBottom: tokens.space.giant, lineHeight: 1.6 }}>Desbloqueie o poder total do ecossistema para facilitar sua vida: notificações inteligentes, modo offline e infraestrutura dedicada para sua jornada ética.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: tokens.space.xl, marginBottom: tokens.space.giant }}>
            <motion.button whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }} whileTap={{ scale: 0.96 }} style={{ width: 260, minHeight: 180, padding: `${tokens.space.xl}px`, backgroundColor: "rgba(0, 0, 0, 0.45)", backdropFilter: "blur(20px)", color: "white", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: tokens.radii.xl, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: tokens.space.lg, transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)" }}>
              <Apple size={48} fill="white" />
              <div style={{ textAlign: "center" }}><span style={{ fontSize: 12, display: "block", color: "rgba(255, 255, 255, 0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>Premium Ecosystem</span><span style={{ fontSize: 24, fontWeight: 800, display: "block" }}>iPhone Super App</span></div>
            </motion.button>
            <motion.button whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }} whileTap={{ scale: 0.96 }} style={{ width: 260, minHeight: 180, padding: `${tokens.space.xl}px`, backgroundColor: "rgba(0, 0, 0, 0.45)", backdropFilter: "blur(20px)", color: "white", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: tokens.radii.xl, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: tokens.space.lg, transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)" }}>
              <AndroidIcon size={48} />
              <div style={{ textAlign: "center" }}><span style={{ fontSize: 12, display: "block", color: "rgba(255, 255, 255, 0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>Full Infrastructure</span><span style={{ fontSize: 24, fontWeight: 800, display: "block" }}>Android Super App</span></div>
            </motion.button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: tokens.space.lg, borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: tokens.space.xxl, maxWidth: 500, margin: "0 auto" }}>
            <motion.button whileHover={{ color: "white", y: -1 }} style={{ background: "none", border: "none", color: "rgba(255, 255, 255, 0.65)", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: tokens.space.sm, transition: "all 0.2s ease" }}><Monitor size={20} />Acessar via Web Browser</motion.button>
            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, color: "rgba(255,255,255,0.3)", fontSize: 13, fontWeight: 500 }}>
              <span>© 2026 Guia Vegano</span>
              <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "currentColor" }} />
              <span>Infraestrutura para Facilitar sua Vida</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Dados das perguntas
const questionsData = [
  { id: 1, title: "Decidir sem errar", problem: "Isso é vegano?", keywords: ["leite", "ovo", "mel", "ingrediente", "rótulo", "mercado", "comprar", "escane", "produto"], content: ["Erros comuns que iniciantes cometem ao ler rótulos", "Ingredientes armadilha que parecem veganos mas não são", "Como identificar derivados animais em listas de ingredientes"], ctas: [{ text: "Escanear produto", icon: "📷", link: "/app/scanner" }, { text: "Pesquisar ingrediente", icon: "🔎", link: "/app/ingredients" }] },
  { id: 2, title: "Comer no dia a dia", problem: "O que eu como?", keywords: ["receita", "cozinha", "almoço", "jantar", "café", "comida", "preparar", "fácil", "rápido"], content: ["Prato vegano simples e completo para todas as refeições", "Combinações básicas para nutrição equilibrada", "Substituições simples para ingredientes não-veganos"], ctas: [{ text: "Ver receitas", icon: "📖", link: "/app/recipes" }, { text: "Salvar refeições base", icon: "💾", link: "/app/meal-plans" }] },
  { id: 3, title: "Comer fora", problem: "Onde comer?", keywords: ["restaurante", "bar", "viagem", "rua", "lanche", "pizza", "hamburguer", "shopping", "fora"], content: ["Como perguntar no restaurante sem constrangimento", "O que evitar em cardápios aparentemente veganos", "Restaurantes étnicos com mais opções naturais"], ctas: [{ text: "Ver restaurantes perto de mim", icon: "🗺️", link: "/app/restaurants" }] },
  { id: 4, title: "Alimentação ok", problem: "Tô fazendo certo?", keywords: ["saúde", "b12", "proteina", "ferro", "calcio", "exame", "vitamina", "nutri", "sangue"], content: ["Nutrientes-chave que precisam de atenção especial", "Suplementação de B12: por que é essencial e como fazer", "Fontes veganas de proteína, ferro e cálcio"], ctas: [{ text: "Configurar Nutri Simples", icon: "📊", link: "/app/nutrition" }] },
  { id: 5, title: "Vida social", problem: "Sou o único vegano?", keywords: ["amigo", "familia", "festa", "natal", "churrasco", "conversa", "evento", "grupo", "comunidade"], content: ["Normalização: você não está sozinho nesta jornada", "Como lidar com questionamentos de familiares e amigos", "Encontrar apoio e inspiração em grupos veganos"], ctas: [{ text: "Ver eventos", icon: "🎪", link: "/app/events" }, { text: "Entrar na comunidade", icon: "💬", link: "/app/community" }, { text: "Conhecer pessoas veganas", icon: "💕", link: "/app/meet" }] },
  { id: 6, title: "Saúde", problem: "Preciso de ajuda profissional?", keywords: ["médico", "nutricionista", "consulta", "ajuda", "profissional", "hospital", "clinica", "especialista"], content: ["Quando procurar um profissional de saúde especializado", "Que tipo de profissional procurar (nutricionista, médico)", "Como encontrar profissionais que respeitam sua escolha vegana"], ctas: [{ text: "Encontrar profissionais veganos", icon: "🩺", link: "/app/professionals" }] },
];

function VeganGuidePage() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);
  const questionsRef = useRef<HTMLDivElement>(null);

  const scrollToSolution = () => {
    questionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: tokens.colors.bg, fontFamily: "'Inter', sans-serif", color: tokens.colors.text }}>
      <IntroSection onStartClick={scrollToSolution} />
      <QuestionsSection
        expandedIndices={expandedIndices}
        setExpandedIndices={setExpandedIndices}
        sectionRef={questionsRef}
      />
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; padding: 0; font-family: "Inter", sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        button { font-family: inherit; outline: none; }
      `}</style>
    </div>
  );
}

export default VeganGuidePage;
