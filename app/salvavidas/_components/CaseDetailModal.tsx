"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  CheckCircle,
  Send,
  Image as ImageIcon,
  ChevronRight,
  Shield,
  Home,
  Search,
  Stethoscope,
  DollarSign,
  Car,
  AlertTriangle,
  PartyPopper,
  PawPrint,
  AlertCircle,
} from "lucide-react";

const tokens = {
  colors: {
    primary: "#048003",
    primaryDark: "#036002",
    primaryLight: "#d4f4d3",
    primaryLighter: "#e8f9e8",
    bg: "#fafafa",
    surface: "#ffffff",
    text: "#111827",
    textMuted: "#6b7280",
    border: "#e5e7eb",
    red: "#ef4444",
    orange: "#f97316",
    yellow: "#eab308",
    green: "#10b981",
    blue: "#3b82f6",
    purple: "#8b5cf6",
    pink: "#ec4899",
  },
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    giant: 80,
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
};

const caseTypes = [
  { id: "resgate", name: "Resgates", icon: Shield, color: tokens.colors.red },
  { id: "adocao", name: "Adoção", icon: Home, color: tokens.colors.pink },
  { id: "perdido", name: "Perdidos", icon: Search, color: tokens.colors.blue },
  { id: "veterinario", name: "Veterinário", icon: Stethoscope, color: tokens.colors.green },
  { id: "lar-temporario", name: "Lar Temporário", icon: Home, color: tokens.colors.purple },
  { id: "doacao", name: "Doações", icon: DollarSign, color: tokens.colors.yellow },
  { id: "transporte", name: "Transporte", icon: Car, color: tokens.colors.orange },
  { id: "denuncia", name: "Denúncias", icon: AlertTriangle, color: tokens.colors.red },
  { id: "finais-felizes", name: "Finais Felizes", icon: PartyPopper, color: tokens.colors.green },
];

interface CaseDetailModalProps {
  caseData: any;
  onClose: () => void;
}

export function CaseDetailModal({ caseData, onClose }: CaseDetailModalProps) {
  const [activeTab, setActiveTab] = useState("detalhes");
  const [showActionForm, setShowActionForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!caseData) return null;

  const typeConfig = caseTypes.find((t) => t.id === caseData.type);
  const Icon = typeConfig?.icon || PawPrint;

  const tabs = [
    { id: "detalhes", label: "Detalhes", icon: AlertCircle },
    { id: "timeline", label: "Atualizações", icon: Clock },
    { id: "chat", label: "Chat do Grupo", icon: MessageCircle },
    { id: "feed", label: "Publicações", icon: ImageIcon },
    { id: "comentarios", label: "Comentários", icon: MessageCircle },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: tokens.space.lg,
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: tokens.colors.surface,
            borderRadius: tokens.radii.xl,
            maxWidth: 900,
            width: "100%",
            maxHeight: "95vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Hero Section with Image */}
          <div style={{ position: "relative", height: 320, overflow: "hidden" }}>
            <img
              src={caseData.image}
              alt={caseData.animalName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* Gradient Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: tokens.space.lg,
                right: tokens.space.lg,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
                border: "none",
                borderRadius: tokens.radii.full,
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
            >
              <X size={24} color="white" />
            </button>

            {/* Type Badge */}
            <div
              style={{
                position: "absolute",
                top: tokens.space.lg,
                left: tokens.space.lg,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: tokens.radii.md,
                padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                display: "flex",
                alignItems: "center",
                gap: tokens.space.sm,
                fontSize: 14,
                fontWeight: 700,
                color: typeConfig?.color,
              }}
            >
              <Icon size={18} strokeWidth={2.5} />
              {typeConfig?.name}
            </div>

            {/* Urgency Badge */}
            {caseData.urgency === "critica" && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  position: "absolute",
                  top: tokens.space.lg + 48,
                  left: tokens.space.lg,
                  background: tokens.colors.red,
                  color: "white",
                  borderRadius: tokens.radii.md,
                  padding: `${tokens.space.xs}px ${tokens.space.md}px`,
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.xs,
                  fontSize: 13,
                  fontWeight: 800,
                  boxShadow: `0 4px 12px ${tokens.colors.red}60`,
                }}
              >
                <AlertCircle size={16} />
                URGENTE
              </motion.div>
            )}

            {/* Animal Info Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: tokens.space.xl,
                color: "white",
              }}
            >
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  marginBottom: tokens.space.sm,
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                {caseData.animalName}
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.md,
                  fontSize: 16,
                  fontWeight: 600,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xs }}>
                  <MapPin size={18} />
                  {caseData.location}
                </div>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "white", opacity: 0.6 }} />
                <div>{caseData.animalType}</div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: "flex",
              padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
              borderBottom: `1px solid ${tokens.colors.border}`,
              gap: tokens.space.xl,
              background: tokens.colors.bg,
            }}
          >
            {[
              { icon: Users, label: "Seguidores", value: caseData.followers, color: tokens.colors.primary },
              { icon: MessageCircle, label: "Comentários", value: caseData.comments, color: tokens.colors.blue },
              { icon: Clock, label: "Dias Aberto", value: `${Math.ceil((Date.now() - caseData.createdAt.getTime()) / (1000 * 60 * 60 * 24))}`, color: tokens.colors.orange },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: tokens.space.md }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radii.md,
                    background: `${stat.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <stat.icon size={22} color={stat.color} strokeWidth={2.5} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: tokens.colors.text }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: tokens.colors.textMuted, fontWeight: 600 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: tokens.space.xs,
              padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
              borderBottom: `1px solid ${tokens.colors.border}`,
              background: tokens.colors.surface,
            }}
          >
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                    background: activeTab === tab.id ? tokens.colors.primary : "transparent",
                    color: activeTab === tab.id ? "white" : tokens.colors.textMuted,
                    border: "none",
                    borderRadius: tokens.radii.lg,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: tokens.space.sm,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = tokens.colors.bg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <TabIcon size={18} strokeWidth={2.5} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: tokens.space.xl,
              background: tokens.colors.surface,
            }}
          >
            {activeTab === "detalhes" && (
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                {/* Story Card */}
                <div
                  style={{
                    background: tokens.colors.primaryLighter,
                    border: `2px solid ${tokens.colors.primaryLight}`,
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xl,
                    marginBottom: tokens.space.xl,
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: tokens.colors.primary, marginBottom: tokens.space.md }}>
                    📖 História
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: tokens.colors.text, fontWeight: 500 }}>
                    {caseData.story}
                  </p>
                </div>

                {/* Description */}
                <div
                  style={{
                    background: tokens.colors.bg,
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xl,
                    marginBottom: tokens.space.xl,
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.md }}>
                    ℹ️ Descrição
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: tokens.colors.textMuted }}>{caseData.description}</p>
                </div>

                {/* Contact Card */}
                <div
                  style={{
                    background: "white",
                    border: `1px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xl,
                    marginBottom: tokens.space.xl,
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.lg }}>
                    👤 Responsável
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: tokens.space.lg }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: tokens.radii.full,
                        background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        fontWeight: 800,
                        color: "white",
                      }}
                    >
                      {caseData.responsible.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.xs }}>
                        {caseData.responsible}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.primary }}>{caseData.contact}</div>
                    </div>
                  </div>
                </div>

                {/* Happy Ending (if applicable) */}
                {caseData.happyEnding && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      background: `linear-gradient(135deg, ${tokens.colors.yellow}30, ${tokens.colors.orange}30)`,
                      border: `3px solid ${tokens.colors.yellow}`,
                      borderRadius: tokens.radii.xl,
                      padding: tokens.space.xxl,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: tokens.radii.full,
                        background: tokens.colors.yellow,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                      }}
                    >
                      <PartyPopper size={48} color="white" strokeWidth={2.5} />
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.md }}>
                      Final Feliz! 🎉
                    </h2>
                    <p style={{ fontSize: 18, lineHeight: 1.7, color: tokens.colors.text, fontWeight: 500 }}>
                      {caseData.happyEnding}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === "timeline" && (
              <div style={{ maxWidth: 600, margin: "0 auto" }}>
                {caseData.updates?.map((update: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      position: "relative",
                      paddingLeft: tokens.space.xxl,
                      paddingBottom: tokens.space.xl,
                    }}
                  >
                    {/* Timeline line */}
                    {i < caseData.updates.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 11,
                          top: 32,
                          bottom: 0,
                          width: 3,
                          background: `linear-gradient(to bottom, ${tokens.colors.primary}, ${tokens.colors.border})`,
                        }}
                      />
                    )}
                    {/* Timeline dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 8,
                        width: 24,
                        height: 24,
                        borderRadius: tokens.radii.full,
                        background: tokens.colors.primary,
                        border: `4px solid white`,
                        boxShadow: `0 0 0 2px ${tokens.colors.primary}`,
                      }}
                    />
                    <div
                      style={{
                        background: "white",
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.lg,
                        padding: tokens.space.lg,
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.xs }}>
                        {new Date(update.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <p style={{ fontSize: 15, lineHeight: 1.6, color: tokens.colors.text, marginBottom: tokens.space.sm }}>
                        {update.text}
                      </p>
                      <div style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.primary }}>— {update.author}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "chat" && (
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                {/* Chat Messages */}
                <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.md, marginBottom: tokens.space.xl }}>
                  {[
                    { author: "Maria Silva", message: "Alguém conseguiu ração para o Rex?", time: "10:30", isOwn: false },
                    { author: "Você", message: "Eu posso ajudar! Tenho 5kg sobrando aqui.", time: "10:32", isOwn: true },
                    { author: "João Pedro", message: "Ótimo! Eu também posso doar cobertores.", time: "10:35", isOwn: false },
                    { author: "Maria Silva", message: "Muito obrigada pessoal! ❤️", time: "10:40", isOwn: false },
                    { author: "Dra. Paula", message: "Atualizei a consulta dele na timeline!", time: "14:20", isOwn: false },
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.isOwn ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        display: "flex",
                        justifyContent: msg.isOwn ? "flex-end" : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "70%",
                          background: msg.isOwn
                            ? `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`
                            : "white",
                          color: msg.isOwn ? "white" : tokens.colors.text,
                          border: msg.isOwn ? "none" : `1px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.lg,
                          padding: tokens.space.md,
                          boxShadow: msg.isOwn ? `0 2px 8px ${tokens.colors.primary}40` : "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                      >
                        {!msg.isOwn && (
                          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: tokens.space.xs, opacity: 0.9 }}>
                            {msg.author}
                          </div>
                        )}
                        <p style={{ fontSize: 15, lineHeight: 1.5, marginBottom: tokens.space.xs }}>{msg.message}</p>
                        <div style={{ fontSize: 12, opacity: 0.7, textAlign: "right" }}>{msg.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chat Input */}
                <div
                  style={{
                    background: tokens.colors.bg,
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.lg,
                    position: "sticky",
                    bottom: 0,
                  }}
                >
                  <div style={{ display: "flex", gap: tokens.space.md }}>
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      style={{
                        flex: 1,
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `2px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.lg,
                        fontSize: 15,
                        outline: "none",
                      }}
                    />
                    <button
                      style={{
                        padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                        background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                        color: "white",
                        border: "none",
                        borderRadius: tokens.radii.lg,
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: tokens.space.sm,
                      }}
                    >
                      <Send size={18} />
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "feed" && (
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                {/* Create Post */}
                <div
                  style={{
                    background: tokens.colors.bg,
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xl,
                    marginBottom: tokens.space.xl,
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.md }}>
                    Criar Publicação
                  </h3>
                  <textarea
                    placeholder="Compartilhe novidades sobre o caso..."
                    style={{
                      width: "100%",
                      padding: tokens.space.md,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.lg,
                      fontSize: 15,
                      fontFamily: "inherit",
                      resize: "vertical",
                      minHeight: 80,
                      outline: "none",
                      marginBottom: tokens.space.md,
                    }}
                  />
                  <div style={{ display: "flex", gap: tokens.space.md }}>
                    <button
                      style={{
                        padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                        background: "white",
                        color: tokens.colors.textMuted,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: tokens.space.xs,
                      }}
                    >
                      <ImageIcon size={16} />
                      Foto
                    </button>
                    <button
                      style={{
                        marginLeft: "auto",
                        padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                        background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                        color: "white",
                        border: "none",
                        borderRadius: tokens.radii.lg,
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: tokens.space.sm,
                      }}
                    >
                      <Send size={18} />
                      Publicar
                    </button>
                  </div>
                </div>

                {/* Feed Posts */}
                {[
                  {
                    author: "Maria Silva",
                    time: "Há 2 horas",
                    content: "Rex passou pela consulta veterinária hoje! Está tudo bem com ele, só precisa ganhar um pouco de peso. 🐕💚",
                    image: null,
                    likes: 45,
                    comments: 8,
                  },
                  {
                    author: "João Pedro",
                    time: "Ontem às 18:30",
                    content: "Conseguimos um lar temporário para o Rex! Obrigado a todos que ajudaram! 🏠❤️",
                    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=300&fit=crop",
                    likes: 89,
                    comments: 23,
                  },
                  {
                    author: "Dra. Paula",
                    time: "Há 3 dias",
                    content: "Primeira consulta do Rex. Ele é muito dócil e cooperativo! 🩺",
                    image: null,
                    likes: 34,
                    comments: 12,
                  },
                ].map((post, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: "white",
                      border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.xl,
                      padding: tokens.space.lg,
                      marginBottom: tokens.space.lg,
                    }}
                  >
                    {/* Post Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.md }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: tokens.radii.full,
                          background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          fontWeight: 800,
                          color: "white",
                        }}
                      >
                        {post.author.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: tokens.colors.text }}>{post.author}</div>
                        <div style={{ fontSize: 13, color: tokens.colors.textMuted }}>{post.time}</div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: tokens.colors.text, marginBottom: post.image ? tokens.space.md : tokens.space.lg }}>
                      {post.content}
                    </p>

                    {/* Post Image */}
                    {post.image && (
                      <div style={{ marginBottom: tokens.space.lg, borderRadius: tokens.radii.lg, overflow: "hidden" }}>
                        <img src={post.image} alt="Post" style={{ width: "100%", height: "auto", display: "block" }} />
                      </div>
                    )}

                    {/* Post Actions */}
                    <div style={{ display: "flex", gap: tokens.space.lg, paddingTop: tokens.space.md, borderTop: `1px solid ${tokens.colors.border}` }}>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.space.sm,
                          padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                          background: "transparent",
                          border: "none",
                          borderRadius: tokens.radii.md,
                          fontSize: 14,
                          fontWeight: 600,
                          color: tokens.colors.textMuted,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = tokens.colors.bg;
                          e.currentTarget.style.color = tokens.colors.red;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = tokens.colors.textMuted;
                        }}
                      >
                        <Heart size={18} />
                        {post.likes}
                      </button>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.space.sm,
                          padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                          background: "transparent",
                          border: "none",
                          borderRadius: tokens.radii.md,
                          fontSize: 14,
                          fontWeight: 600,
                          color: tokens.colors.textMuted,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = tokens.colors.bg;
                          e.currentTarget.style.color = tokens.colors.blue;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = tokens.colors.textMuted;
                        }}
                      >
                        <MessageCircle size={18} />
                        {post.comments}
                      </button>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.space.sm,
                          padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                          background: "transparent",
                          border: "none",
                          borderRadius: tokens.radii.md,
                          fontSize: 14,
                          fontWeight: 600,
                          color: tokens.colors.textMuted,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = tokens.colors.bg;
                          e.currentTarget.style.color = tokens.colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = tokens.colors.textMuted;
                        }}
                      >
                        <Share2 size={18} />
                        Compartilhar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "comentarios" && (
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                {/* Comment Form */}
                <div
                  style={{
                    background: tokens.colors.bg,
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xl,
                    marginBottom: tokens.space.xl,
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.md }}>
                    Deixe seu comentário
                  </h3>
                  <textarea
                    placeholder="Escreva aqui..."
                    style={{
                      width: "100%",
                      padding: tokens.space.md,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.lg,
                      fontSize: 15,
                      fontFamily: "inherit",
                      resize: "vertical",
                      minHeight: 100,
                      outline: "none",
                      marginBottom: tokens.space.md,
                    }}
                  />
                  <button
                    style={{
                      padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                      background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                      color: "white",
                      border: "none",
                      borderRadius: tokens.radii.lg,
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: tokens.space.sm,
                    }}
                  >
                    <Send size={18} />
                    Enviar Comentário
                  </button>
                </div>

                {/* Comments List */}
                {caseData.userComments?.map((comment: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: "white",
                      border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.lg,
                      padding: tokens.space.lg,
                      marginBottom: tokens.space.md,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.md }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: tokens.radii.full,
                          background: `linear-gradient(135deg, ${tokens.colors.blue}, ${tokens.colors.purple})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {comment.author.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: tokens.colors.text }}>{comment.author}</div>
                        <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                          {new Date(comment.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: tokens.colors.text }}>{comment.text}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div
            style={{
              padding: tokens.space.xl,
              borderTop: `1px solid ${tokens.colors.border}`,
              background: tokens.colors.surface,
              display: "flex",
              gap: tokens.space.md,
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
                background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                color: "white",
                border: "none",
                borderRadius: tokens.radii.lg,
                fontSize: 17,
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: tokens.space.md,
                boxShadow: `0 8px 16px ${tokens.colors.primary}40`,
              }}
            >
              <Heart size={22} strokeWidth={2.5} />
              Quero Ajudar
            </motion.button>
            <button
              style={{
                padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
                background: "white",
                color: tokens.colors.primary,
                border: `2px solid ${tokens.colors.primary}`,
                borderRadius: tokens.radii.lg,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: tokens.space.sm,
              }}
            >
              <Share2 size={20} />
              Compartilhar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
