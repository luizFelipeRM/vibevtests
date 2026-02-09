"use client";
import React, { useState } from "react";
import { Leaf, Search, Bell, User, X, TrendingUp, Award, AlertCircle, CheckCircle, Heart, Clock, Calendar } from "lucide-react";
import { tokens } from "../../styles/tokens";

export const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(true); // Aberto por padrão
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // Notificações de exemplo (todos os tipos possíveis)
  const notifications = [
    {
      id: 1,
      type: "success",
      icon: CheckCircle,
      color: "#10b981",
      bg: "#d1fae5",
      title: "Meta alcançada!",
      message: "Você atingiu sua meta de proteínas hoje",
      time: "2 min atrás",
    },
    {
      id: 2,
      type: "warning",
      icon: AlertCircle,
      color: "#f59e0b",
      bg: "#fef3c7",
      title: "Atenção com carboidratos",
      message: "Você está 15% acima da meta diária",
      time: "10 min atrás",
    },
    {
      id: 3,
      type: "achievement",
      icon: Award,
      color: "#8b5cf6",
      bg: "#ede9fe",
      title: "Conquista desbloqueada!",
      message: "7 dias consecutivos registrando refeições",
      time: "1 hora atrás",
    },
    {
      id: 4,
      type: "trend",
      icon: TrendingUp,
      color: "#3b82f6",
      bg: "#dbeafe",
      title: "Progresso semanal",
      message: "Você melhorou 23% na distribuição de macros",
      time: "2 horas atrás",
    },
    {
      id: 5,
      type: "reminder",
      icon: Clock,
      color: "#ef4444",
      bg: "#fee2e2",
      title: "Lembrete de refeição",
      message: "Não esqueça de registrar seu jantar",
      time: "3 horas atrás",
    },
    {
      id: 6,
      type: "favorite",
      icon: Heart,
      color: "#ec4899",
      bg: "#fce7f3",
      title: "Novo alimento favorito",
      message: "Tofu adicionado aos seus favoritos",
      time: "5 horas atrás",
    },
    {
      id: 7,
      type: "appointment",
      icon: Calendar,
      color: "#06b6d4",
      bg: "#cffafe",
      title: "Consulta agendada",
      message: "Nutricionista Dra. Ana - Amanhã às 14h",
      time: "Ontem",
    },
  ];

  return (
    <>
      <header
        style={{
          background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
          color: "white",
          padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: tokens.space.xl,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: tokens.radii.lg,
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Leaf size={32} fill="white" color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>NutriVeg</h1>
              <p style={{ fontSize: 12, margin: 0, opacity: 0.9 }}>
                Nutrição Vegana Inteligente
              </p>
            </div>
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 600 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: tokens.radii.full,
                padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
                display: "flex",
                alignItems: "center",
                gap: tokens.space.md,
              }}
            >
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar alimentos..."
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: 14,
                  flex: 1,
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: tokens.space.md, alignItems: "center" }}>
            {/* Bell - Notifications */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: tokens.radii.full,
                  background: showNotifications ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  transition: "all 0.2s",
                }}
              >
                <Bell size={20} color="white" />
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    border: "2px solid white",
                    fontSize: 10,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  7
                </div>
              </button>
            </div>

            {/* User */}
            <button
              onClick={() => setShowAuthModal(true)}
              style={{
                width: 48,
                height: 48,
                borderRadius: tokens.radii.full,
                background: "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
            >
              <User size={20} color="white" />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div
          style={{
            position: "fixed",
            top: 90,
            right: 32,
            width: 420,
            maxHeight: "80vh",
            backgroundColor: "white",
            borderRadius: 16,
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            zIndex: 1000,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f8fafc",
            }}
          >
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: 0 }}>
                Notificações
              </h3>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                Você tem 7 notificações não lidas
              </p>
            </div>
            <button
              onClick={() => setShowNotifications(false)}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <X size={18} color="#64748b" />
            </button>
          </div>

          {/* Notifications List */}
          <div style={{ maxHeight: "calc(80vh - 140px)", overflowY: "auto" }}>
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  style={{
                    padding: "16px 24px",
                    borderBottom: "1px solid #f1f5f9",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <div style={{ display: "flex", gap: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: notif.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} color={notif.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0f172a",
                          margin: 0,
                          marginBottom: 4,
                        }}
                      >
                        {notif.title}
                      </h4>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#64748b",
                          margin: 0,
                          marginBottom: 6,
                          lineHeight: 1.4,
                        }}
                      >
                        {notif.message}
                      </p>
                      <span style={{ fontSize: 12, color: "#94a3b8" }}>
                        {notif.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "#f8fafc",
            }}
          >
            <button
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: tokens.colors.primary,
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Marcar todas como lidas
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div
          onClick={() => setShowAuthModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              width: "90%",
              maxWidth: 450,
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                padding: "32px 32px 24px",
                color: "white",
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowAuthModal(false)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} color="white" />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Leaf size={28} fill="white" color="white" />
                </div>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>
                    {authMode === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
                  </h2>
                  <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
                    {authMode === "login"
                      ? "Entre para continuar"
                      : "Comece sua jornada saudável"}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: 32 }}>
              {authMode === "login" ? (
                // LOGIN FORM
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                        marginBottom: 8,
                      }}
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: 10,
                        fontSize: 14,
                        outline: "none",
                        transition: "border 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.primary;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                        marginBottom: 8,
                      }}
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: 10,
                        fontSize: 14,
                        outline: "none",
                        transition: "border 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.primary;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 24,
                    }}
                  >
                    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span style={{ fontSize: 14, color: "#64748b" }}>Lembrar-me</span>
                    </label>
                    <a
                      href="#"
                      style={{
                        fontSize: 14,
                        color: tokens.colors.primary,
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Esqueceu a senha?
                    </a>
                  </div>

                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                      color: "white",
                      border: "none",
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginBottom: 16,
                      boxShadow: `0 4px 12px ${tokens.colors.primary}40`,
                    }}
                  >
                    Entrar
                  </button>

                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 14, color: "#64748b" }}>
                      Não tem uma conta?{" "}
                    </span>
                    <button
                      onClick={() => setAuthMode("register")}
                      style={{
                        background: "none",
                        border: "none",
                        color: tokens.colors.primary,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Cadastre-se
                    </button>
                  </div>
                </div>
              ) : (
                // REGISTER FORM
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                        marginBottom: 8,
                      }}
                    >
                      Nome completo
                    </label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: 10,
                        fontSize: 14,
                        outline: "none",
                        transition: "border 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.primary;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                        marginBottom: 8,
                      }}
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: 10,
                        fontSize: 14,
                        outline: "none",
                        transition: "border 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.primary;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                        marginBottom: 8,
                      }}
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: 10,
                        fontSize: 14,
                        outline: "none",
                        transition: "border 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.primary;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                        marginBottom: 8,
                      }}
                    >
                      Confirmar senha
                    </label>
                    <input
                      type="password"
                      placeholder="Digite a senha novamente"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: 10,
                        fontSize: 14,
                        outline: "none",
                        transition: "border 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = tokens.colors.primary;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    />
                  </div>

                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`,
                      color: "white",
                      border: "none",
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginBottom: 16,
                      boxShadow: `0 4px 12px ${tokens.colors.primary}40`,
                    }}
                  >
                    Criar conta
                  </button>

                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 14, color: "#64748b" }}>
                      Já tem uma conta?{" "}
                    </span>
                    <button
                      onClick={() => setAuthMode("login")}
                      style={{
                        background: "none",
                        border: "none",
                        color: tokens.colors.primary,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
