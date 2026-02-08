"use client";
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Monitor, Apple } from "lucide-react";
import { colors } from "@/src/design/colors";
import { space } from "@/src/design/space";
import { radius } from "@/src/design/radius";
import { sizes } from "@/src/design/sizes";
import { fontSizes } from "@/src/design/fontSizes";
import { fontWeights } from "@/src/design/fontWeights";
import { lineHeights } from "@/src/design/lineHeights";
import ProblemItem from "../_components/ProblemItem";

// Custom Android Icon
const AndroidIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.523 15.3414C17.0734 15.3414 16.7092 14.9772 16.7092 14.5275C16.7092 14.0779 17.0734 13.7137 17.523 13.7137C17.9727 13.7137 18.3369 14.0779 18.3369 14.5275C18.3369 14.9772 17.9727 15.3414 17.523 15.3414ZM6.47702 15.3414C6.02736 15.3414 5.66318 14.9772 5.66318 14.5275C5.66318 14.0779 6.02736 13.7137 6.47702 13.7137C6.92668 13.7137 7.29086 14.0779 7.29086 14.5275C7.29086 14.9772 6.92668 15.3414 6.47702 15.3414ZM17.9863 11.238L19.7825 8.12659C19.9213 7.88607 19.8389 7.57917 19.5984 7.4404C19.3578 7.30164 19.051 7.38401 18.9122 7.62453L17.1009 10.7618C15.6599 10.1036 14.0041 9.71887 12.25 9.71887C10.4959 9.71887 8.84013 10.1036 7.39912 10.7618L5.58778 7.62453C5.44901 7.38401 5.14211 7.30164 4.90159 7.4404C4.66107 7.57917 4.5787 7.88601 4.71746 8.12659L6.51371 11.238C3.12056 12.915 0.796875 16.3315 0.75 20.3228H23.75C23.7031 16.3315 21.3794 12.915 17.9863 11.238Z" />
  </svg>
);

// Dados das perguntas
const questionsData = [
  {
    id: 1,
    title: "Decidir sem errar",
    problem: "Isso é vegano?",
    keywords: [
      "leite",
      "ovo",
      "mel",
      "ingrediente",
      "rótulo",
      "mercado",
      "comprar",
      "escane",
      "produto",
    ],
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
    keywords: [
      "receita",
      "cozinha",
      "almoço",
      "jantar",
      "café",
      "comida",
      "preparar",
      "fácil",
      "rápido",
    ],
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
    keywords: [
      "restaurante",
      "bar",
      "viagem",
      "rua",
      "lanche",
      "pizza",
      "hamburguer",
      "shopping",
      "fora",
    ],
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
    keywords: [
      "saúde",
      "b12",
      "proteina",
      "ferro",
      "calcio",
      "exame",
      "vitamina",
      "nutri",
      "sangue",
    ],
    content: [
      "Nutrientes-chave que precisam de atenção especial",
      "Suplementação de B12: por que é essencial e como fazer",
      "Fontes veganas de proteína, ferro e cálcio",
    ],
    ctas: [
      {
        text: "Configurar Nutri Simples",
        icon: "📊",
        link: "/app/nutrition",
      },
    ],
  },
  {
    id: 5,
    title: "Vida social",
    problem: "Sou o único vegano?",
    keywords: [
      "amigo",
      "familia",
      "festa",
      "natal",
      "churrasco",
      "conversa",
      "evento",
      "grupo",
      "comunidade",
    ],
    content: [
      "Normalização: você não está sozinho nesta jornada",
      "Como lidar com questionamentos de familiares e amigos",
      "Encontrar apoio e inspiração em grupos veganos",
    ],
    ctas: [
      { text: "Ver eventos", icon: "🎪", link: "/app/events" },
      { text: "Entrar na comunidade", icon: "💬", link: "/app/community" },
      {
        text: "Conhecer pessoas veganas",
        icon: "💕",
        link: "/app/meet",
      },
    ],
  },
  {
    id: 6,
    title: "Saúde",
    problem: "Preciso de ajuda profissional?",
    keywords: [
      "médico",
      "nutricionista",
      "consulta",
      "ajuda",
      "profissional",
      "hospital",
      "clinica",
      "especialista",
    ],
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

interface QuestionsSectionProps {
  expandedIndices: number[];
  setExpandedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export default function QuestionsSection({
  expandedIndices,
  setExpandedIndices,
  sectionRef,
}: QuestionsSectionProps) {
  return (
    <section
      id="questions"
      ref={sectionRef}
      style={{ padding: `0 0 ${space["3xl"]}px`, position: "relative" }}
    >
      <div
        style={{
          maxWidth: 840,
          margin: "0 auto",
          padding: `0 ${space.lg}px`,
        }}
      >
        {questionsData.map((item: any, index: number) => (
          <ProblemItem
            key={item.id}
            item={item}
            isExpanded={expandedIndices.includes(index)}
            onToggle={() =>
              setExpandedIndices((prev) =>
                prev.includes(index)
                  ? prev.filter((i) => i !== index)
                  : [...prev, index]
              )
            }
          />
        ))}
      </div>

      {/* Download CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          marginTop: space["3xl"],
          padding: `${space["3xl"]}px ${space.xl}px`,
          background: `linear-gradient(135deg, ${colors.primary_dark} 0%, ${colors.primary} 100%)`,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-5%",
              width: "50%",
              height: "120%",
              background: `radial-gradient(circle, ${colors.primary}66 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "-5%",
              width: "40%",
              height: "100%",
              background: `radial-gradient(circle, ${colors.primary_dark}4d 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              width: sizes["4xl"],
              height: sizes["4xl"],
              borderRadius: radius.lg,
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              marginBottom: space.xl,
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Leaf size={sizes.icon_lg} strokeWidth={2.5} />
          </motion.div>
          <h3
            style={{
              fontSize: fontSizes["3xl"],
              color: "white",
              fontWeight: fontWeights.extrabold,
              marginBottom: space.lg,
              letterSpacing: "-0.02em",
            }}
          >
            O Super App na sua mão
          </h3>
          <p
            style={{
              fontSize: fontSizes.xl,
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: 700,
              margin: "0 auto",
              marginBottom: space["2xl"],
              lineHeight: lineHeights.relaxed,
            }}
          >
            Desbloqueie o poder total do ecossistema para facilitar sua vida:
            notificações inteligentes, modo offline e infraestrutura dedicada
            para sua jornada ética.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: space.xl,
              marginBottom: space["2xl"],
            }}
          >
            <motion.button
              whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                width: 260,
                minHeight: 180,
                padding: space.xl,
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(20px)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: radius.xl,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: space.lg,
                transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <Apple size={sizes["3xl"]} fill="white" />
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: fontSizes.xs,
                    display: "block",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontWeight: fontWeights.semibold,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: sizes.dot,
                  }}
                >
                  Premium Ecosystem
                </span>
                <span style={{ fontSize: fontSizes["2xl"], fontWeight: fontWeights.extrabold, display: "block" }}>
                  iPhone Super App
                </span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                width: 260,
                minHeight: 180,
                padding: space.xl,
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(20px)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: radius.xl,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: space.lg,
                transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <AndroidIcon size={sizes["3xl"]} />
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: fontSizes.xs,
                    display: "block",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontWeight: fontWeights.semibold,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: sizes.dot,
                  }}
                >
                  Full Infrastructure
                </span>
                <span style={{ fontSize: fontSizes["2xl"], fontWeight: fontWeights.extrabold, display: "block" }}>
                  Android Super App
                </span>
              </div>
            </motion.button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: space.lg,
              borderTop: "1px solid rgba(255,255,255,0.15)",
              paddingTop: space.xxl,
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            <motion.button
              whileHover={{ color: "white", y: -1 }}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255, 255, 255, 0.65)",
                fontSize: fontSizes.md,
                fontWeight: fontWeights.semibold,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: space.sm,
                transition: "all 0.2s ease",
              }}
            >
              <Monitor size={sizes.md} />
              Acessar via Web Browser
            </motion.button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: space.md,
                color: "rgba(255,255,255,0.3)",
                fontSize: fontSizes.sm,
                fontWeight: fontWeights.medium,
              }}
            >
              <span>© 2026 Guia Vegano</span>
              <div
                style={{
                  width: sizes.dot,
                  height: sizes.dot,
                  borderRadius: "50%",
                  backgroundColor: "currentColor",
                }}
              />
              <span>Infraestrutura para Facilitar sua Vida</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
