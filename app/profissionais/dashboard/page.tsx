"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Star,
  Eye,
  MessageCircle,
  Calendar,
  TrendingUp,
  Edit,
  Image,
  Briefcase,
  Phone,
  Mail,
  Instagram,
  Globe,
  MapPin,
  DollarSign,
  Award,
  Settings,
  LogOut,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  Upload,
  Plus,
  Camera,
  Heart,
  Bell,
  Search,
  ChevronRight,
  Leaf,
  Home,
  FileText,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";

const tokens = {
  colors: {
    bg: "#fafafa",
    surface: "#ffffff",
    primary: "#048003",
    primaryDark: "#036002",
    primaryLight: "#d4f4d3",
    primaryLighter: "#e8f9e8",
    text: "#111827",
    textMuted: "#6b7280",
    border: "#e5e7eb",
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
};

// Mock data
const professionalData = {
  name: "Dra. Ana Silva",
  specialty: "Nutrição Clínica Vegana",
  category: "Nutricionista",
  location: "São Paulo, SP",
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=400&fit=crop",
  rating: 4.9,
  totalReviews: 127,
  profileViews: 1234,
  messagesCount: 23,
  verified: true,
  bio: "Especialista em nutrição esportiva para atletas veganos. Foco em performance e ganho de massa muscular.",
  experience: "8 anos",
  price: "R$ 300-400",
  phone: "(11) 99999-8888",
  email: "dra.ana@email.com",
  instagram: "@dra.anasilva",
  website: "www.draanasilva.com.br",
  stats: {
    weekViews: 234,
    monthViews: 892,
    weekMessages: 12,
    monthMessages: 45,
    avgResponseTime: "2h",
    conversionRate: 23,
    totalClients: 156,
    activeClients: 42,
  },
};

const chartData = [
  { day: "Seg", views: 45 },
  { day: "Ter", views: 62 },
  { day: "Qua", views: 38 },
  { day: "Qui", views: 75 },
  { day: "Sex", views: 58 },
  { day: "Sáb", views: 42 },
  { day: "Dom", views: 34 },
];

export default function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "analytics" | "messages">("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Modern Metric Card
  const MetricCard = ({ icon: Icon, title, value, change, trend, color, subtitle }: any) => (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: tokens.colors.surface,
        padding: tokens.space.xl,
        borderRadius: tokens.radii.xl,
        border: `1px solid ${tokens.colors.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: tokens.space.md }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: tokens.radii.lg,
              background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={24} color={color} strokeWidth={2.5} />
          </div>
          {change !== undefined && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                borderRadius: tokens.radii.full,
                backgroundColor: trend === "up" ? "#d1fae520" : "#fee2e220",
                border: `1px solid ${trend === "up" ? "#10b98130" : "#ef444430"}`,
              }}
            >
              {trend === "up" ? (
                <ArrowUpRight size={14} color="#10b981" strokeWidth={3} />
              ) : (
                <TrendingDown size={14} color="#ef4444" strokeWidth={3} />
              )}
              <span style={{ fontSize: 12, fontWeight: 700, color: trend === "up" ? "#10b981" : "#ef4444" }}>
                {change}%
              </span>
            </div>
          )}
        </div>

        <div style={{ fontSize: 32, fontWeight: 800, color: tokens.colors.text, marginBottom: 4, letterSpacing: "-0.02em" }}>
          {value}
        </div>
        <div style={{ fontSize: 14, color: tokens.colors.textMuted, fontWeight: 500, marginBottom: 4 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: tokens.colors.textMuted, fontWeight: 400 }}>{subtitle}</div>}
      </div>
    </motion.div>
  );

  // Mini Chart Component
  const MiniChart = () => {
    const maxValue = Math.max(...chartData.map((d) => d.views));
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
        {chartData.map((data, idx) => (
          <motion.div
            key={idx}
            initial={{ height: 0 }}
            animate={{ height: `${(data.views / maxValue) * 100}%` }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
            style={{
              flex: 1,
              backgroundColor: tokens.colors.primary,
              borderRadius: "6px 6px 0 0",
              minHeight: 8,
              position: "relative",
              cursor: "pointer",
              opacity: 0.7,
            }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 10,
                fontWeight: 600,
                color: tokens.colors.textMuted,
                whiteSpace: "nowrap",
              }}
            >
              {data.day}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Sidebar Item
  const SidebarItem = ({ icon: Icon, label, active, badge, onClick }: any) => (
    <motion.button
      whileHover={{ x: 4, backgroundColor: tokens.colors.primaryLighter }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        width: "100%",
        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
        backgroundColor: active ? tokens.colors.primaryLighter : "transparent",
        border: "none",
        borderLeft: `3px solid ${active ? tokens.colors.primary : "transparent"}`,
        borderRadius: `0 ${tokens.radii.md}px ${tokens.radii.md}px 0`,
        display: "flex",
        alignItems: "center",
        gap: tokens.space.md,
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
      }}
    >
      <Icon size={20} color={active ? tokens.colors.primary : tokens.colors.textMuted} strokeWidth={active ? 2.5 : 2} />
      <span
        style={{
          fontSize: 15,
          fontWeight: active ? 700 : 500,
          color: active ? tokens.colors.primary : tokens.colors.text,
          flex: 1,
          textAlign: "left",
        }}
      >
        {label}
      </span>
      {badge && (
        <span
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: tokens.radii.full,
            minWidth: 20,
            textAlign: "center",
          }}
        >
          {badge}
        </span>
      )}
    </motion.button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: tokens.colors.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          width: 280,
          backgroundColor: tokens.colors.surface,
          borderRight: `1px solid ${tokens.colors.border}`,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div style={{ padding: tokens.space.xl, borderBottom: `1px solid ${tokens.colors.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: tokens.radii.md,
                background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Leaf size={24} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: tokens.colors.text, margin: 0, letterSpacing: "-0.01em" }}>
                GuiaVegano
              </h1>
              <p style={{ fontSize: 12, color: tokens.colors.textMuted, margin: 0, fontWeight: 500 }}>Dashboard Pro</p>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div style={{ padding: tokens.space.xl, borderBottom: `1px solid ${tokens.colors.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
            <div style={{ position: "relative" }}>
              <img
                src={professionalData.image}
                alt={professionalData.name}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: tokens.radii.full,
                  objectFit: "cover",
                  border: `3px solid ${tokens.colors.primary}`,
                }}
              />
              {professionalData.verified && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    width: 20,
                    height: 20,
                    borderRadius: tokens.radii.full,
                    backgroundColor: tokens.colors.primary,
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle size={12} color="white" fill="white" />
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: tokens.colors.text,
                  margin: 0,
                  marginBottom: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {professionalData.name}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: tokens.colors.textMuted,
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {professionalData.specialty}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: `${tokens.space.lg}px 0`, overflowY: "auto" }}>
          <div style={{ marginBottom: tokens.space.lg }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: tokens.colors.textMuted,
                margin: 0,
                marginBottom: tokens.space.md,
                paddingLeft: tokens.space.lg,
              }}
            >
              Menu Principal
            </p>
            <SidebarItem icon={Home} label="Visão Geral" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
            <SidebarItem icon={User} label="Meu Perfil" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
            <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} />
            <SidebarItem
              icon={MessageCircle}
              label="Mensagens"
              active={activeTab === "messages"}
              badge={professionalData.messagesCount}
              onClick={() => setActiveTab("messages")}
            />
          </div>

          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: tokens.colors.textMuted,
                margin: 0,
                marginBottom: tokens.space.md,
                paddingLeft: tokens.space.lg,
              }}
            >
              Configurações
            </p>
            <SidebarItem icon={Settings} label="Preferências" active={false} onClick={() => {}} />
            <SidebarItem icon={Bell} label="Notificações" active={false} onClick={() => {}} />
          </div>
        </nav>

        {/* Logout */}
        <div style={{ padding: tokens.space.lg, borderTop: `1px solid ${tokens.colors.border}` }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (confirm("Deseja realmente sair?")) {
                window.location.href = "/profissionais";
              }
            }}
            style={{
              width: "100%",
              padding: `${tokens.space.md}px ${tokens.space.lg}px`,
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              border: "1px solid #fecaca",
              borderRadius: tokens.radii.md,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: tokens.space.sm,
            }}
          >
            <LogOut size={16} />
            Sair
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Top Bar */}
        <header
          style={{
            backgroundColor: tokens.colors.surface,
            borderBottom: `1px solid ${tokens.colors.border}`,
            padding: `${tokens.space.lg}px ${tokens.space.xxl}px`,
            position: "sticky",
            top: 0,
            zIndex: 10,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, margin: 0, marginBottom: 4, letterSpacing: "-0.02em" }}>
                {activeTab === "overview" && "Visão Geral"}
                {activeTab === "profile" && "Meu Perfil"}
                {activeTab === "analytics" && "Analytics"}
                {activeTab === "messages" && "Mensagens"}
              </h2>
              <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
                Bem-vinda de volta, {professionalData.name.split(" ")[1]}! 👋
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/profissionais")}
                style={{
                  padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
                  background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                  color: "white",
                  border: "none",
                  borderRadius: tokens.radii.md,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.sm,
                  boxShadow: `0 4px 12px ${tokens.colors.primary}30`,
                }}
              >
                <Eye size={16} />
                Ver Perfil Público
              </motion.button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: tokens.space.xxl }}>
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Welcome Banner */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                    padding: tokens.space.xxl,
                    borderRadius: tokens.radii.xl,
                    marginBottom: tokens.space.xxl,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Decorative circles */}
                  <div
                    style={{
                      position: "absolute",
                      width: 300,
                      height: 300,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      top: -100,
                      right: -100,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      bottom: -50,
                      left: -50,
                    }}
                  />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.md }}>
                          <Sparkles size={32} color="white" />
                          <h3 style={{ fontSize: 36, fontWeight: 800, color: "white", margin: 0, letterSpacing: "-0.02em" }}>
                            Seu mês está incrível!
                          </h3>
                        </div>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", margin: 0, fontWeight: 500 }}>
                          {professionalData.stats.monthViews} visualizações • {professionalData.stats.monthMessages} mensagens •{" "}
                          {professionalData.totalReviews} avaliações
                        </p>
                      </div>

                      {professionalData.verified && (
                        <div
                          style={{
                            padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                            backgroundColor: "rgba(255,255,255,0.2)",
                            borderRadius: tokens.radii.lg,
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
                            <CheckCircle size={24} color="white" fill="white" />
                            <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>Perfil Verificado</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Metrics Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: tokens.space.lg, marginBottom: tokens.space.xxl }}>
                  <MetricCard
                    icon={Eye}
                    title="Visualizações (30 dias)"
                    value={professionalData.stats.monthViews}
                    change={15}
                    trend="up"
                    color={tokens.colors.primary}
                    subtitle={`+${professionalData.stats.weekViews} esta semana`}
                  />
                  <MetricCard
                    icon={Star}
                    title="Avaliação Média"
                    value={professionalData.rating}
                    color="#f59e0b"
                    subtitle={`${professionalData.totalReviews} avaliações totais`}
                  />
                  <MetricCard
                    icon={MessageCircle}
                    title="Mensagens (30 dias)"
                    value={professionalData.stats.monthMessages}
                    change={8}
                    trend="up"
                    color="#3b82f6"
                    subtitle={`Responde em ${professionalData.stats.avgResponseTime}`}
                  />
                  <MetricCard
                    icon={Users}
                    title="Taxa de Conversão"
                    value={`${professionalData.stats.conversionRate}%`}
                    change={5}
                    trend="up"
                    color="#8b5cf6"
                    subtitle="Visitantes → Clientes"
                  />
                </div>

                {/* Charts & Activity */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: tokens.space.lg, marginBottom: tokens.space.xxl }}>
                  {/* Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      backgroundColor: tokens.colors.surface,
                      padding: tokens.space.xxl,
                      borderRadius: tokens.radii.xl,
                      border: `1px solid ${tokens.colors.border}`,
                    }}
                  >
                    <div style={{ marginBottom: tokens.space.xl }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text, margin: 0, marginBottom: 4 }}>
                        Visualizações da Semana
                      </h3>
                      <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>Seu desempenho nos últimos 7 dias</p>
                    </div>
                    <div style={{ paddingBottom: tokens.space.lg }}>
                      <MiniChart />
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      backgroundColor: tokens.colors.surface,
                      padding: tokens.space.xl,
                      borderRadius: tokens.radii.xl,
                      border: `1px solid ${tokens.colors.border}`,
                    }}
                  >
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.text, margin: 0, marginBottom: tokens.space.lg }}>
                      Atividade Recente
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.md }}>
                      {[
                        { icon: Star, text: "Nova avaliação 5⭐", time: "2h atrás", color: "#f59e0b" },
                        { icon: MessageCircle, text: "3 novas mensagens", time: "4h atrás", color: "#3b82f6" },
                        { icon: Eye, text: "42 visualizações hoje", time: "6h atrás", color: tokens.colors.primary },
                        { icon: Heart, text: "Adicionado aos favoritos", time: "1d atrás", color: "#ef4444" },
                      ].map((activity, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: tokens.space.md,
                            padding: tokens.space.md,
                            backgroundColor: tokens.colors.bg,
                            borderRadius: tokens.radii.md,
                          }}
                        >
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: tokens.radii.md,
                              backgroundColor: `${activity.color}15`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <activity.icon size={18} color={activity.color} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.text, margin: 0, marginBottom: 2 }}>{activity.text}</p>
                            <p style={{ fontSize: 11, color: tokens.colors.textMuted, margin: 0 }}>{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    backgroundColor: tokens.colors.surface,
                    padding: tokens.space.xxl,
                    borderRadius: tokens.radii.xl,
                    border: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text, margin: 0, marginBottom: tokens.space.xl }}>Ações Rápidas</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: tokens.space.md }}>
                    {[
                      { icon: Edit, label: "Editar Perfil", color: tokens.colors.primary, action: () => setActiveTab("profile") },
                      { icon: Image, label: "Gerenciar Portfólio", color: "#8b5cf6", action: () => {} },
                      { icon: Calendar, label: "Disponibilidade", color: "#3b82f6", action: () => {} },
                      { icon: DollarSign, label: "Preços & Serviços", color: "#10b981", action: () => {} },
                    ].map((action, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${action.color}20` }}
                        whileTap={{ scale: 0.97 }}
                        onClick={action.action}
                        style={{
                          padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
                          background: `linear-gradient(135deg, ${action.color}15 0%, ${action.color}05 100%)`,
                          border: `1px solid ${action.color}30`,
                          borderRadius: tokens.radii.lg,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.space.md,
                          transition: "all 0.2s",
                        }}
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radii.md,
                            backgroundColor: `${action.color}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <action.icon size={20} color={action.color} strokeWidth={2.5} />
                        </div>
                        <div style={{ flex: 1, textAlign: "left" }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: tokens.colors.text }}>{action.label}</div>
                        </div>
                        <ChevronRight size={18} color={tokens.colors.textMuted} />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: tokens.colors.surface,
                  padding: tokens.space.xxl,
                  borderRadius: tokens.radii.xl,
                  border: `1px solid ${tokens.colors.border}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.space.xxl }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, margin: 0, marginBottom: 4 }}>Editar Perfil</h3>
                    <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>Mantenha suas informações sempre atualizadas</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    style={{
                      padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                      background: isEditingProfile
                        ? `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`
                        : tokens.colors.bg,
                      color: isEditingProfile ? "white" : tokens.colors.text,
                      border: `1px solid ${isEditingProfile ? tokens.colors.primary : tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: tokens.space.sm,
                      boxShadow: isEditingProfile ? `0 4px 12px ${tokens.colors.primary}30` : "none",
                    }}
                  >
                    {isEditingProfile ? <CheckCircle size={18} /> : <Edit size={18} />}
                    {isEditingProfile ? "Salvar Alterações" : "Editar Perfil"}
                  </motion.button>
                </div>

                {/* Cover & Avatar */}
                <div style={{ position: "relative", marginBottom: tokens.space.xxl }}>
                  <div
                    style={{
                      height: 200,
                      borderRadius: tokens.radii.xl,
                      backgroundImage: `url(${professionalData.coverImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {isEditingProfile && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          position: "absolute",
                          top: tokens.space.lg,
                          right: tokens.space.lg,
                          width: 48,
                          height: 48,
                          borderRadius: tokens.radii.full,
                          backgroundColor: "rgba(0,0,0,0.7)",
                          border: "2px solid rgba(255,255,255,0.3)",
                          color: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Camera size={20} />
                      </motion.button>
                    )}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: -60,
                      left: tokens.space.xxl,
                      width: 140,
                      height: 140,
                      borderRadius: tokens.radii.full,
                      border: "6px solid white",
                      overflow: "hidden",
                      backgroundColor: "white",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                  >
                    <img src={professionalData.image} alt={professionalData.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {isEditingProfile && (
                      <motion.div
                        whileHover={{ opacity: 1 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(0,0,0,0.7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.2s",
                          cursor: "pointer",
                        }}
                      >
                        <Camera size={28} color="white" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div style={{ marginTop: 80 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.lg, marginBottom: tokens.space.lg }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={professionalData.name}
                        disabled={!isEditingProfile}
                        style={{
                          width: "100%",
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          border: `2px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.md,
                          fontSize: 15,
                          backgroundColor: isEditingProfile ? "white" : tokens.colors.bg,
                          color: tokens.colors.text,
                          fontWeight: 500,
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                        Especialidade *
                      </label>
                      <input
                        type="text"
                        value={professionalData.specialty}
                        disabled={!isEditingProfile}
                        style={{
                          width: "100%",
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          border: `2px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.md,
                          fontSize: 15,
                          backgroundColor: isEditingProfile ? "white" : tokens.colors.bg,
                          color: tokens.colors.text,
                          fontWeight: 500,
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: tokens.space.lg }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                      Sobre Você *
                    </label>
                    <textarea
                      value={professionalData.bio}
                      disabled={!isEditingProfile}
                      rows={4}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `2px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 15,
                        fontFamily: "inherit",
                        resize: "vertical",
                        backgroundColor: isEditingProfile ? "white" : tokens.colors.bg,
                        color: tokens.colors.text,
                        fontWeight: 500,
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.lg, marginBottom: tokens.space.lg }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={professionalData.phone}
                        disabled={!isEditingProfile}
                        style={{
                          width: "100%",
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          border: `2px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.md,
                          fontSize: 15,
                          backgroundColor: isEditingProfile ? "white" : tokens.colors.bg,
                          color: tokens.colors.text,
                          fontWeight: 500,
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={professionalData.email}
                        disabled={!isEditingProfile}
                        style={{
                          width: "100%",
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          border: `2px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.md,
                          fontSize: 15,
                          backgroundColor: isEditingProfile ? "white" : tokens.colors.bg,
                          color: tokens.colors.text,
                          fontWeight: 500,
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.lg }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={professionalData.instagram}
                        disabled={!isEditingProfile}
                        style={{
                          width: "100%",
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          border: `2px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.md,
                          fontSize: 15,
                          backgroundColor: isEditingProfile ? "white" : tokens.colors.bg,
                          color: tokens.colors.text,
                          fontWeight: 500,
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                        Website
                      </label>
                      <input
                        type="text"
                        value={professionalData.website}
                        disabled={!isEditingProfile}
                        style={{
                          width: "100%",
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          border: `2px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.md,
                          fontSize: 15,
                          backgroundColor: isEditingProfile ? "white" : tokens.colors.bg,
                          color: tokens.colors.text,
                          fontWeight: 500,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: tokens.colors.surface,
                  padding: tokens.space.xxl,
                  borderRadius: tokens.radii.xl,
                  border: `1px solid ${tokens.colors.border}`,
                  textAlign: "center",
                }}
              >
                <BarChart3 size={64} color={tokens.colors.textMuted} style={{ margin: "0 auto", marginBottom: tokens.space.lg }} />
                <h3 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, margin: 0, marginBottom: tokens.space.sm }}>
                  Analytics Detalhado
                </h3>
                <p style={{ fontSize: 15, color: tokens.colors.textMuted, margin: 0 }}>
                  Em breve: gráficos detalhados, métricas avançadas e insights sobre seu desempenho!
                </p>
              </motion.div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: tokens.colors.surface,
                  padding: tokens.space.xxl,
                  borderRadius: tokens.radii.xl,
                  border: `1px solid ${tokens.colors.border}`,
                  textAlign: "center",
                }}
              >
                <MessageCircle size={64} color={tokens.colors.textMuted} style={{ margin: "0 auto", marginBottom: tokens.space.lg }} />
                <h3 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, margin: 0, marginBottom: tokens.space.sm }}>Sistema de Mensagens</h3>
                <p style={{ fontSize: 15, color: tokens.colors.textMuted, margin: 0 }}>
                  Em breve: chat em tempo real, notificações e histórico de conversas!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        input::placeholder,
        textarea::placeholder {
          color: #9ca3af !important;
          opacity: 1;
        }

        input,
        textarea {
          color: #111827 !important;
        }

        input:focus,
        textarea:focus {
          outline: 2px solid ${tokens.colors.primary};
          outline-offset: 2px;
          border-color: ${tokens.colors.primary} !important;
        }

        input:disabled,
        textarea:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
