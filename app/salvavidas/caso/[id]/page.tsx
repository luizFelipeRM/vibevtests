"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Phone,
  Clock,
  CheckCircle,
  Send,
  Image as ImageIcon,
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
  Mail,
  ExternalLink,
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
];

// Mock data - em produção viria de uma API
const mockCase = {
  id: 1,
  animalName: "Rex",
  animalType: "Cachorro",
  type: "resgate",
  location: "Centro, São Paulo - SP",
  story: "Rex foi encontrado abandonado em uma caixa de papelão embaixo de uma ponte. Estava com fome, frio e muito assustado.",
  description: "Cachorro de porte médio, aparentemente vira-lata, muito dócil. Precisa de abrigo urgente e cuidados veterinários.",
  urgency: "critica",
  status: "em-andamento",
  responsible: "Maria Silva",
  contact: "(11) 98765-4321",
  email: "maria@email.com",
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  comments: 12,
  followers: 45,
  image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=1200&h=600&fit=crop",
  updates: [
    { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), text: "Caso criado - Rex foi resgatado das ruas", author: "Maria Silva" },
    { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), text: "Rex passou por consulta veterinária. Está saudável!", author: "Dra. Paula" },
    { date: new Date(Date.now() - 12 * 60 * 60 * 1000), text: "Procurando lar temporário urgente!", author: "Maria Silva" },
  ],
  userComments: [
    { author: "João Pedro", text: "Que lindo! Compartilhei com amigos.", date: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { author: "Ana Clara", text: "Posso ajudar com ração!", date: new Date(Date.now() - 3 * 60 * 60 * 1000) },
  ],
};

export default function CaseDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sobre");
  const [showShareModal, setShowShareModal] = useState(false);
  const caseData = mockCase;

  const typeConfig = caseTypes.find((t) => t.id === caseData.type);
  const Icon = typeConfig?.icon || PawPrint;

  return (
    <div style={{ minHeight: "100vh", background: tokens.colors.bg }}>
      {/* Hero Section */}
      <div style={{ position: "relative", height: 480, overflow: "hidden", background: "#000" }}>
        <img
          src={caseData.image}
          alt={caseData.animalName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.7,
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            position: "absolute",
            top: tokens.space.xl,
            left: tokens.space.xl,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            border: "none",
            borderRadius: tokens.radii.lg,
            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
            color: "white",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: tokens.space.sm,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        {/* Type Badge */}
        <div
          style={{
            position: "absolute",
            top: tokens.space.xl,
            right: tokens.space.xl,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: tokens.radii.lg,
            padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
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

        {/* Content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: tokens.space.xxl,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              marginBottom: tokens.space.md,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {caseData.animalName}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xl, fontSize: 16, color: "white" }}>
            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
              <MapPin size={20} />
              {caseData.location}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
              <PawPrint size={20} />
              {caseData.animalType}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
              <Calendar size={20} />
              {new Date(caseData.createdAt).toLocaleDateString("pt-BR")}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: tokens.space.xxl, paddingBottom: 120 }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: tokens.space.sm, marginBottom: tokens.space.xl, borderBottom: `2px solid ${tokens.colors.border}` }}>
              {[
                { id: "sobre", label: "Sobre" },
                { id: "timeline", label: "Atualizações" },
                { id: "feed", label: "Feed" },
                { id: "chat", label: "Chat" },
                { id: "comentarios", label: "Comentários" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                    background: "transparent",
                    color: activeTab === tab.id ? tokens.colors.primary : tokens.colors.textMuted,
                    border: "none",
                    borderBottom: activeTab === tab.id ? `3px solid ${tokens.colors.primary}` : "3px solid transparent",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    marginBottom: -2,
                    transition: "all 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
        </div>

        {/* Tab Content */}
        {activeTab === "sobre" && (
          <div>
                {/* Story */}
                <div
                  style={{
                    background: "white",
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xxl,
                    marginBottom: tokens.space.xl,
                    border: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.lg }}>
                    A História
                  </h2>
                  <p style={{ fontSize: 17, lineHeight: 1.8, color: tokens.colors.text, marginBottom: tokens.space.xl }}>
                    {caseData.story}
                  </p>
                  <div
                    style={{
                      background: tokens.colors.bg,
                      borderLeft: `4px solid ${tokens.colors.primary}`,
                      borderRadius: tokens.radii.md,
                      padding: tokens.space.lg,
                    }}
                  >
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: tokens.colors.textMuted }}>
                      {caseData.description}
                    </p>
                  </div>
                </div>

                {/* Contact Person */}
                <div
                  style={{
                    background: "white",
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xxl,
                    border: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.xl }}>
                    Responsável pelo Caso
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xl, marginBottom: tokens.space.xl }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: tokens.radii.full,
                        background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 32,
                        fontWeight: 800,
                        color: "white",
                      }}
                    >
                      {caseData.responsible.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.xs }}>
                        {caseData.responsible}
                      </div>
                      <div style={{ fontSize: 14, color: tokens.colors.textMuted }}>Criou o caso há {Math.ceil((Date.now() - caseData.createdAt.getTime()) / (1000 * 60 * 60 * 24))} dias</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: tokens.space.md }}>
                    <a
                      href={`tel:${caseData.contact}`}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: tokens.space.sm,
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        background: tokens.colors.bg,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.lg,
                        fontSize: 15,
                        fontWeight: 600,
                        color: tokens.colors.text,
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = tokens.colors.primary;
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = tokens.colors.bg;
                        e.currentTarget.style.color = tokens.colors.text;
                      }}
                    >
                      <Phone size={18} />
                      {caseData.contact}
                    </a>
                    <a
                      href={`mailto:${caseData.email}`}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: tokens.space.sm,
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        background: tokens.colors.bg,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.lg,
                        fontSize: 15,
                        fontWeight: 600,
                        color: tokens.colors.text,
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = tokens.colors.primary;
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = tokens.colors.bg;
                        e.currentTarget.style.color = tokens.colors.text;
                      }}
                    >
                      <Mail size={18} />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "timeline" && (
              <div
                style={{
                  background: "white",
                  borderRadius: tokens.radii.xl,
                  padding: tokens.space.xxl,
                  border: `1px solid ${tokens.colors.border}`,
                }}
              >
                <h2 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.xxl }}>
                  Linha do Tempo
                </h2>
                {caseData.updates?.map((update, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      position: "relative",
                      paddingLeft: 40,
                      paddingBottom: i < caseData.updates.length - 1 ? tokens.space.xxl : 0,
                    }}
                  >
                    {i < caseData.updates.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 11,
                          top: 32,
                          bottom: 0,
                          width: 2,
                          background: tokens.colors.border,
                        }}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 8,
                        width: 24,
                        height: 24,
                        borderRadius: tokens.radii.full,
                        background: tokens.colors.primary,
                        border: `4px solid ${tokens.colors.primaryLight}`,
                      }}
                    />
                    <div style={{ marginBottom: tokens.space.sm }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.textMuted }}>
                        {new Date(update.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: tokens.colors.text, marginBottom: tokens.space.xs }}>
                      {update.text}
                    </p>
                    <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.primary }}>
                      Por {update.author}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "feed" && (
              <div>
                {/* Create Post */}
                <div
                  style={{
                    background: "white",
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xxl,
                    marginBottom: tokens.space.xl,
                    border: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.lg }}>
                    Compartilhar Novidade
                  </h3>
                  <textarea
                    placeholder="Compartilhe atualizações, fotos ou boas notícias sobre o caso..."
                    style={{
                      width: "100%",
                      padding: tokens.space.lg,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.lg,
                      fontSize: 15,
                      fontFamily: "inherit",
                      resize: "vertical",
                      minHeight: 100,
                      outline: "none",
                      marginBottom: tokens.space.lg,
                    }}
                  />
                  <div style={{ display: "flex", gap: tokens.space.md }}>
                    <button
                      style={{
                        padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
                        background: tokens.colors.bg,
                        color: tokens.colors.text,
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
                      Adicionar Foto
                    </button>
                    <button
                      style={{
                        marginLeft: "auto",
                        padding: `${tokens.space.md}px ${tokens.space.xxl}px`,
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
                      padding: tokens.space.xl,
                      marginBottom: tokens.space.lg,
                    }}
                  >
                    {/* Post Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.lg }}>
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
                        <div style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.text }}>{post.author}</div>
                        <div style={{ fontSize: 13, color: tokens.colors.textMuted }}>{post.time}</div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: tokens.colors.text, marginBottom: post.image ? tokens.space.lg : tokens.space.xl }}>
                      {post.content}
                    </p>

                    {/* Post Image */}
                    {post.image && (
                      <div style={{ marginBottom: tokens.space.xl, borderRadius: tokens.radii.lg, overflow: "hidden" }}>
                        <img src={post.image} alt="Post" style={{ width: "100%", height: "auto", display: "block" }} />
                      </div>
                    )}

                    {/* Post Actions */}
                    <div style={{ display: "flex", gap: tokens.space.xl, paddingTop: tokens.space.md, borderTop: `1px solid ${tokens.colors.border}` }}>
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
                          e.currentTarget.style.background = `${tokens.colors.red}10`;
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
                          e.currentTarget.style.background = `${tokens.colors.blue}10`;
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
                          e.currentTarget.style.background = `${tokens.colors.primary}10`;
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

            {activeTab === "chat" && (
              <div
                style={{
                  background: "white",
                  borderRadius: tokens.radii.xl,
                  padding: tokens.space.xxl,
                  border: `1px solid ${tokens.colors.border}`,
                  minHeight: 500,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.lg }}>
                  Chat do Caso
                </h2>
                <p style={{ fontSize: 14, color: tokens.colors.textMuted, marginBottom: tokens.space.xxl }}>
                  Converse em tempo real com quem está ajudando neste caso
                </p>

                {/* Chat Messages */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: tokens.space.md, marginBottom: tokens.space.xl }}>
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
                            : tokens.colors.bg,
                          color: msg.isOwn ? "white" : tokens.colors.text,
                          border: msg.isOwn ? "none" : `1px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.lg,
                          padding: tokens.space.lg,
                          boxShadow: msg.isOwn ? `0 2px 8px ${tokens.colors.primary}40` : "none",
                        }}
                      >
                        {!msg.isOwn && (
                          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: tokens.space.xs, opacity: 0.9 }}>
                            {msg.author}
                          </div>
                        )}
                        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: tokens.space.xs }}>{msg.message}</p>
                        <div style={{ fontSize: 12, opacity: 0.7, textAlign: "right" }}>{msg.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chat Input */}
                <div style={{ display: "flex", gap: tokens.space.md, paddingTop: tokens.space.lg, borderTop: `1px solid ${tokens.colors.border}` }}>
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
                      padding: `${tokens.space.md}px ${tokens.space.xxl}px`,
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
            )}

            {activeTab === "comentarios" && (
              <div>
                <div
                  style={{
                    background: "white",
                    borderRadius: tokens.radii.xl,
                    padding: tokens.space.xxl,
                    marginBottom: tokens.space.xl,
                    border: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.lg }}>
                    Deixe seu comentário
                  </h3>
                  <textarea
                    placeholder="Conte como você pode ajudar ou deixe uma mensagem de apoio..."
                    style={{
                      width: "100%",
                      padding: tokens.space.lg,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.lg,
                      fontSize: 15,
                      fontFamily: "inherit",
                      resize: "vertical",
                      minHeight: 120,
                      outline: "none",
                      marginBottom: tokens.space.lg,
                    }}
                  />
                  <button
                    style={{
                      padding: `${tokens.space.md}px ${tokens.space.xxl}px`,
                      background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                      color: "white",
                      border: "none",
                      borderRadius: tokens.radii.lg,
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: tokens.space.sm,
                    }}
                  >
                    <Send size={20} />
                    Publicar Comentário
                  </button>
                </div>

                {caseData.userComments?.map((comment, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: "white",
                      border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.lg,
                      padding: tokens.space.xl,
                      marginBottom: tokens.space.md,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.md }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: tokens.radii.full,
                          background: `linear-gradient(135deg, ${tokens.colors.blue}, ${tokens.colors.purple})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {comment.author.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.text }}>{comment.author}</div>
                        <div style={{ fontSize: 13, color: tokens.colors.textMuted }}>
                          {new Date(comment.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: tokens.colors.text }}>{comment.text}</p>
                  </motion.div>
                ))}
              </div>
            )}
      </div>

      {/* Sticky Action Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${tokens.colors.border}`,
          padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            gap: tokens.space.md,
            alignItems: "center",
          }}
        >
          <button
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
              boxShadow: `0 4px 16px ${tokens.colors.primary}40`,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${tokens.colors.primary}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 16px ${tokens.colors.primary}40`;
            }}
          >
            <Heart size={20} strokeWidth={2.5} />
            Quero Ajudar
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            style={{
              flex: 1,
              padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
              background: "white",
              color: tokens.colors.primary,
              border: `2px solid ${tokens.colors.primary}`,
              borderRadius: tokens.radii.lg,
              fontSize: 17,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: tokens.space.md,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = tokens.colors.primary;
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = tokens.colors.primary;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Share2 size={20} />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          onClick={() => setShowShareModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: tokens.space.xl,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: tokens.radii.xl,
              padding: tokens.space.xxl,
              maxWidth: 500,
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: tokens.space.lg }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text }}>
                Compartilhar Caso
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 24,
                  color: tokens.colors.textMuted,
                  cursor: "pointer",
                  padding: tokens.space.xs,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: 15, color: tokens.colors.textMuted, lineHeight: 1.6, marginBottom: tokens.space.xxl }}>
              Ajude a divulgar este caso e aumentar as chances de {caseData.animalName} receber ajuda!
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.md }}>
              {[
                { name: "WhatsApp", color: "#25D366" },
                { name: "Facebook", color: "#1877F2" },
                { name: "Twitter", color: "#1DA1F2" },
                { name: "Copiar Link", color: tokens.colors.text },
              ].map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => {
                    // Handle share logic here
                    setShowShareModal(false);
                  }}
                  style={{
                    width: "100%",
                    padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
                    background: "white",
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.lg,
                    fontSize: 16,
                    fontWeight: 700,
                    color: tokens.colors.text,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: tokens.space.md,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = platform.color;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = platform.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = tokens.colors.text;
                    e.currentTarget.style.borderColor = tokens.colors.border;
                  }}
                >
                  <Share2 size={20} />
                  {platform.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: "Inter", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
}
