"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Check,
  ArrowLeft,
  Heart,
  Instagram,
  Briefcase,
  MapPinned,
  DollarSign,
  FileText,
  Image as ImageIcon,
  List,
  Calendar,
  Award,
  Globe,
  Info,
  ArrowRight,
  Building,
  Sparkles
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

const categories = [
  { id: "nutricao", label: "Nutrição", emoji: "🥗" },
  { id: "psicologia", label: "Psicologia", emoji: "🧠" },
  { id: "medicina", label: "Medicina", emoji: "⚕️" },
  { id: "personal", label: "Personal Trainer", emoji: "💪" },
  { id: "yoga", label: "Yoga/Pilates", emoji: "🧘" },
  { id: "chef", label: "Chef/Cozinheiro", emoji: "👨‍🍳" },
  { id: "estetica", label: "Estética", emoji: "💆" },
  { id: "veterinario", label: "Veterinário", emoji: "🐾" },
  { id: "outros", label: "Outros", emoji: "💼" },
];

export default function UnifiedRegistration() {
  const [registrationType, setRegistrationType] = useState<"client" | "professional">("client");
  const [clientStep, setClientStep] = useState(1);
  const [professionalStep, setProfessionalStep] = useState(1);
  const [emailChecked, setEmailChecked] = useState(false);
  const [existingAccount, setExistingAccount] = useState<{type: "client" | "professional", email: string} | null>(null);

  const [clientData, setClientData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    instagram: "",
  });

  const [professionalData, setProfessionalData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
    customCategory: "",
    specialty: "",
    city: "",
    address: "",
    remote: false,
    experience: "",
    priceRange: "",
    bio: "",
    phone: "",
    contactEmail: "",
    instagram: "",
    website: "",
    profilePicture: null as File | null,
    coverPicture: null as File | null,
    portfolio: [] as File[],
    services: [""],
    priceTable: [{ service: "", price: "", description: "" }],
  });

  // Mock function to check if email exists
  const checkEmailExists = (email: string) => {
    // Mock: emails with "prof" are professionals, others are clients
    if (email.includes("prof")) {
      return { exists: true, type: "professional" as const };
    } else if (email.includes("client")) {
      return { exists: true, type: "client" as const };
    }
    return { exists: false, type: null };
  };

  const handleEmailBlur = (email: string) => {
    if (email && email.includes("@")) {
      const result = checkEmailExists(email);
      if (result.exists) {
        setExistingAccount({ type: result.type!, email });
      } else {
        setExistingAccount(null);
      }
      setEmailChecked(true);
    }
  };

  const handleUpgradeDowngrade = () => {
    if (existingAccount) {
      if (existingAccount.type === "client" && registrationType === "professional") {
        alert(`Transformando conta de cliente em profissional para ${existingAccount.email}`);
        // TODO: Implement actual upgrade logic
      } else if (existingAccount.type === "professional" && registrationType === "client") {
        alert(`Transformando conta de profissional em cliente para ${existingAccount.email}`);
        // TODO: Implement actual downgrade logic
      }
      window.location.href = "/profissionais";
    }
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (clientStep === 1) {
      if (!clientData.name || !clientData.email || !clientData.password || !clientData.confirmPassword) {
        alert("Por favor, preencha todos os campos obrigatórios");
        return;
      }

      if (clientData.password !== clientData.confirmPassword) {
        alert("As senhas não coincidem");
        return;
      }

      setClientStep(2);
    } else {
      console.log("Cadastro de cliente:", clientData);
      alert("Cadastro realizado com sucesso! Bem-vindo ao GuiaVegano! 🌱");
      window.location.href = "/profissionais";
    }
  };

  const handleProfessionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (professionalStep < 7) {
      setProfessionalStep(professionalStep + 1);
    } else {
      console.log("Cadastro de profissional:", professionalData);
      alert("Cadastro profissional realizado com sucesso! Bem-vindo ao GuiaVegano! 🌱");
      window.location.href = "/profissionais/dashboard";
    }
  };

  const addService = () => {
    setProfessionalData({
      ...professionalData,
      services: [...professionalData.services, ""],
    });
  };

  const removeService = (index: number) => {
    setProfessionalData({
      ...professionalData,
      services: professionalData.services.filter((_, i) => i !== index),
    });
  };

  const updateService = (index: number, value: string) => {
    const newServices = [...professionalData.services];
    newServices[index] = value;
    setProfessionalData({ ...professionalData, services: newServices });
  };

  const addPriceTableItem = () => {
    setProfessionalData({
      ...professionalData,
      priceTable: [...professionalData.priceTable, { service: "", price: "", description: "" }],
    });
  };

  const removePriceTableItem = (index: number) => {
    setProfessionalData({
      ...professionalData,
      priceTable: professionalData.priceTable.filter((_, i) => i !== index),
    });
  };

  const updatePriceTableItem = (index: number, field: string, value: string) => {
    const newPriceTable = [...professionalData.priceTable];
    newPriceTable[index] = { ...newPriceTable[index], [field]: value };
    setProfessionalData({ ...professionalData, priceTable: newPriceTable });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "cover" | "portfolio") => {
    const files = e.target.files;
    if (!files) return;

    if (type === "profile") {
      setProfessionalData({ ...professionalData, profilePicture: files[0] });
    } else if (type === "cover") {
      setProfessionalData({ ...professionalData, coverPicture: files[0] });
    } else if (type === "portfolio") {
      const currentPortfolio = professionalData.portfolio;
      const newFiles = Array.from(files).slice(0, 5 - currentPortfolio.length);
      setProfessionalData({ ...professionalData, portfolio: [...currentPortfolio, ...newFiles] });
    }
  };

  const removePortfolioImage = (index: number) => {
    setProfessionalData({
      ...professionalData,
      portfolio: professionalData.portfolio.filter((_, i) => i !== index),
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: tokens.colors.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: tokens.space.xl,
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Toggle Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.radii.xl,
            padding: tokens.space.sm,
            marginBottom: tokens.space.xl,
            display: "flex",
            gap: tokens.space.sm,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <button
            onClick={() => {
              setRegistrationType("client");
              setExistingAccount(null);
              setEmailChecked(false);
            }}
            style={{
              flex: 1,
              padding: `${tokens.space.md}px ${tokens.space.lg}px`,
              backgroundColor: registrationType === "client" ? tokens.colors.primary : "transparent",
              color: registrationType === "client" ? "white" : tokens.colors.text,
              border: "none",
              borderRadius: tokens.radii.md,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: tokens.space.sm,
            }}
          >
            <Heart size={18} />
            Cadastro Cliente
          </button>
          <button
            onClick={() => {
              setRegistrationType("professional");
              setExistingAccount(null);
              setEmailChecked(false);
            }}
            style={{
              flex: 1,
              padding: `${tokens.space.md}px ${tokens.space.lg}px`,
              backgroundColor: registrationType === "professional" ? tokens.colors.primary : "transparent",
              color: registrationType === "professional" ? "white" : tokens.colors.text,
              border: "none",
              borderRadius: tokens.radii.md,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: tokens.space.sm,
            }}
          >
            <Briefcase size={18} />
            Cadastro Profissional
          </button>
        </motion.div>

        {/* Existing Account Notice */}
        <AnimatePresence>
          {existingAccount && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: tokens.colors.primaryLighter,
                border: `2px solid ${tokens.colors.primary}`,
                borderRadius: tokens.radii.md,
                padding: tokens.space.lg,
                marginBottom: tokens.space.xl,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.md }}>
                <Info size={24} color={tokens.colors.primary} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: tokens.colors.text }}>
                    Conta existente encontrada!
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: tokens.colors.textMuted, marginTop: tokens.space.xs }}>
                    {existingAccount.type === "client" && registrationType === "professional"
                      ? "Esta conta é de cliente. Deseja transformar em conta profissional?"
                      : "Esta conta é de profissional. Deseja transformar em conta de cliente?"}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpgradeDowngrade}
                style={{
                  width: "100%",
                  padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                  background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                  color: "white",
                  border: "none",
                  borderRadius: tokens.radii.md,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: tokens.space.sm,
                }}
              >
                <Sparkles size={18} />
                {existingAccount.type === "client" ? "Transformar em Profissional" : "Transformar em Cliente"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Registration Forms */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            backgroundColor: tokens.colors.surface,
            padding: tokens.space.xxl,
            borderRadius: tokens.radii.xl,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: `1px solid ${tokens.colors.border}`,
          }}
        >
          <AnimatePresence mode="wait">
            {registrationType === "client" ? (
              <motion.div
                key="client"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Client Header */}
                <div style={{ textAlign: "center", marginBottom: tokens.space.xxl }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      width: 80,
                      height: 80,
                      margin: "0 auto",
                      marginBottom: tokens.space.lg,
                      borderRadius: tokens.radii.full,
                      background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 8px 24px ${tokens.colors.primary}40`,
                    }}
                  >
                    <Heart size={40} color="white" />
                  </motion.div>
                  <h1 style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.sm, margin: 0 }}>
                    Junte-se à Comunidade
                  </h1>
                  <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
                    Crie sua conta e conecte-se com profissionais veganos
                  </p>
                </div>

                {/* Client Progress */}
                <div style={{ display: "flex", gap: tokens.space.sm, marginBottom: tokens.space.xl }}>
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: tokens.radii.full,
                      backgroundColor: tokens.colors.primary,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: tokens.radii.full,
                      backgroundColor: clientStep === 2 ? tokens.colors.primary : tokens.colors.border,
                    }}
                  />
                </div>

                {/* Client Form */}
                <form onSubmit={handleClientSubmit}>
                  {clientStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                          }}
                        >
                          Nome Completo *
                        </label>
                        <div style={{ position: "relative" }}>
                          <User
                            size={18}
                            color={tokens.colors.textMuted}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                          <input
                            type="text"
                            required
                            value={clientData.name}
                            onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                            placeholder="Seu nome"
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                          }}
                        >
                          Nome de Usuário * <span style={{ fontSize: 12, fontWeight: 400, color: tokens.colors.textMuted }}>(seu identificador único)</span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <User
                            size={18}
                            color={tokens.colors.textMuted}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                          <input
                            type="text"
                            required
                            value={clientData.username}
                            onChange={(e) => {
                              // Remove caracteres especiais e converte para minúsculas
                              const username = e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9-_]/g, '-')
                                .replace(/-+/g, '-')
                                .replace(/^-|-$/g, '');
                              setClientData({ ...clientData, username });
                            }}
                            placeholder="seu-usuario"
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                        {clientData.username && (
                          <p style={{ fontSize: 12, color: tokens.colors.textMuted, marginTop: 4, marginLeft: 2 }}>
                            Seu usuário: <strong>@{clientData.username}</strong>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                          }}
                        >
                          E-mail *
                        </label>
                        <div style={{ position: "relative" }}>
                          <Mail
                            size={18}
                            color={tokens.colors.textMuted}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                          <input
                            type="email"
                            required
                            value={clientData.email}
                            onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                            onBlur={(e) => handleEmailBlur(e.target.value)}
                            placeholder="seu@email.com"
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                          }}
                        >
                          Senha *
                        </label>
                        <div style={{ position: "relative" }}>
                          <Lock
                            size={18}
                            color={tokens.colors.textMuted}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                          <input
                            type="password"
                            required
                            value={clientData.password}
                            onChange={(e) => setClientData({ ...clientData, password: e.target.value })}
                            placeholder="Mínimo 6 caracteres"
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                          }}
                        >
                          Confirmar Senha *
                        </label>
                        <div style={{ position: "relative" }}>
                          <Lock
                            size={18}
                            color={tokens.colors.textMuted}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                          <input
                            type="password"
                            required
                            value={clientData.confirmPassword}
                            onChange={(e) => setClientData({ ...clientData, confirmPassword: e.target.value })}
                            placeholder="Digite a senha novamente"
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {clientStep === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                          }}
                        >
                          Telefone (Opcional)
                        </label>
                        <div style={{ position: "relative" }}>
                          <Phone
                            size={18}
                            color={tokens.colors.textMuted}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                          <input
                            type="tel"
                            value={clientData.phone}
                            onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                            placeholder="(11) 98765-4321"
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                          }}
                        >
                          Cidade (Opcional)
                        </label>
                        <div style={{ position: "relative" }}>
                          <MapPin
                            size={18}
                            color={tokens.colors.textMuted}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                          <input
                            type="text"
                            value={clientData.city}
                            onChange={(e) => setClientData({ ...clientData, city: e.target.value })}
                            placeholder="São Paulo, SP"
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                          }}
                        >
                          Instagram (Opcional)
                        </label>
                        <div style={{ position: "relative" }}>
                          <Instagram
                            size={18}
                            color={tokens.colors.textMuted}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                          <input
                            type="text"
                            value={clientData.instagram}
                            onChange={(e) => setClientData({ ...clientData, instagram: e.target.value })}
                            placeholder="@seuperfil"
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          padding: tokens.space.lg,
                          backgroundColor: tokens.colors.primaryLighter,
                          borderRadius: tokens.radii.md,
                          border: `1px solid ${tokens.colors.primary}30`,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 13,
                            color: tokens.colors.text,
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          💚 <strong>Benefícios:</strong> Avalie profissionais, salve seus favoritos e receba recomendações personalizadas!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Client Buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: tokens.space.md,
                      marginTop: tokens.space.xl,
                    }}
                  >
                    {clientStep === 2 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setClientStep(1)}
                        style={{
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          backgroundColor: tokens.colors.bg,
                          color: tokens.colors.text,
                          border: `1px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.md,
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.space.sm,
                        }}
                      >
                        <ArrowLeft size={16} />
                        Voltar
                      </motion.button>
                    )}

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flex: 1,
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                        color: "white",
                        border: "none",
                        borderRadius: tokens.radii.md,
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: tokens.space.sm,
                        boxShadow: `0 4px 16px ${tokens.colors.primary}40`,
                      }}
                    >
                      {clientStep === 1 ? (
                        <>
                          Continuar
                          <ArrowRight size={16} />
                        </>
                      ) : (
                        <>
                          <Check size={18} />
                          Criar Conta
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="professional"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Professional Header */}
                <div style={{ textAlign: "center", marginBottom: tokens.space.xxl }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      width: 80,
                      height: 80,
                      margin: "0 auto",
                      marginBottom: tokens.space.lg,
                      borderRadius: tokens.radii.full,
                      background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 8px 24px ${tokens.colors.primary}40`,
                    }}
                  >
                    <Briefcase size={40} color="white" />
                  </motion.div>
                  <h1 style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.sm, margin: 0 }}>
                    Cadastro Profissional
                  </h1>
                  <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
                    Passo {professionalStep} de 7
                  </p>
                </div>

                {/* Professional Progress */}
                <div style={{ display: "flex", gap: tokens.space.xs, marginBottom: tokens.space.xl }}>
                  {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                    <div
                      key={step}
                      style={{
                        flex: 1,
                        height: 4,
                        borderRadius: tokens.radii.full,
                        backgroundColor: step <= professionalStep ? tokens.colors.primary : tokens.colors.border,
                      }}
                    />
                  ))}
                </div>

                {/* Professional Form - This would be very long, so I'll create a condensed version with all 7 steps */}
                <form onSubmit={handleProfessionalSubmit}>
                  {/* Step 1: Basic Info */}
                  {professionalStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
                        Informações Básicas
                      </h2>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={professionalData.name}
                          onChange={(e) => setProfessionalData({ ...professionalData, name: e.target.value })}
                          placeholder="Seu nome profissional"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Nome de Usuário * <span style={{ fontSize: 12, fontWeight: 400, color: tokens.colors.textMuted }}>(será sua URL: /profissionais/seu-usuario)</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={professionalData.username}
                          onChange={(e) => {
                            // Remove caracteres especiais e converte para minúsculas
                            const username = e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-]/g, '-')
                              .replace(/-+/g, '-')
                              .replace(/^-|-$/g, '');
                            setProfessionalData({ ...professionalData, username });
                          }}
                          placeholder="seu-usuario-profissional"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                        {professionalData.username && (
                          <p style={{ fontSize: 12, color: tokens.colors.textMuted, marginTop: 4 }}>
                            Sua URL será: <strong>/profissionais/{professionalData.username}</strong>
                          </p>
                        )}
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          E-mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={professionalData.email}
                          onChange={(e) => setProfessionalData({ ...professionalData, email: e.target.value })}
                          onBlur={(e) => handleEmailBlur(e.target.value)}
                          placeholder="seu@email.com"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Senha *
                        </label>
                        <input
                          type="password"
                          required
                          value={professionalData.password}
                          onChange={(e) => setProfessionalData({ ...professionalData, password: e.target.value })}
                          placeholder="Mínimo 6 caracteres"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Confirmar Senha *
                        </label>
                        <input
                          type="password"
                          required
                          value={professionalData.confirmPassword}
                          onChange={(e) => setProfessionalData({ ...professionalData, confirmPassword: e.target.value })}
                          placeholder="Digite a senha novamente"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.md, color: tokens.colors.text }}>
                          Categoria *
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: tokens.space.md }}>
                          {categories.map((cat) => (
                            <motion.button
                              key={cat.id}
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setProfessionalData({ ...professionalData, category: cat.id })}
                              style={{
                                padding: tokens.space.md,
                                backgroundColor: professionalData.category === cat.id ? tokens.colors.primaryLight : tokens.colors.bg,
                                border: `2px solid ${professionalData.category === cat.id ? tokens.colors.primary : tokens.colors.border}`,
                                borderRadius: tokens.radii.md,
                                cursor: "pointer",
                                textAlign: "center",
                                fontSize: 13,
                                fontWeight: 600,
                                color: tokens.colors.text,
                              }}
                            >
                              <div style={{ fontSize: 28, marginBottom: tokens.space.xs }}>{cat.emoji}</div>
                              {cat.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {professionalData.category === "outros" && (
                        <div>
                          <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                            Digite sua profissão *
                          </label>
                          <input
                            type="text"
                            required
                            value={professionalData.customCategory}
                            onChange={(e) => setProfessionalData({ ...professionalData, customCategory: e.target.value })}
                            placeholder="Ex: Programador, Pedreiro, Designer..."
                            style={{
                              width: "100%",
                              padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                              border: `2px solid ${tokens.colors.primary}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              backgroundColor: tokens.colors.primaryLighter,
                              color: tokens.colors.text,
                            }}
                          />
                        </div>
                      )}

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Especialidade *
                        </label>
                        <input
                          type="text"
                          required
                          value={professionalData.specialty}
                          onChange={(e) => setProfessionalData({ ...professionalData, specialty: e.target.value })}
                          placeholder="Ex: Nutrição Esportiva, Psicologia Clínica..."
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Location - Similar structure */}
                  {professionalStep === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
                        Localização
                      </h2>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Cidade *
                        </label>
                        <input
                          type="text"
                          required
                          value={professionalData.city}
                          onChange={(e) => setProfessionalData({ ...professionalData, city: e.target.value })}
                          placeholder="São Paulo, SP"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Endereço
                        </label>
                        <input
                          type="text"
                          value={professionalData.address}
                          onChange={(e) => setProfessionalData({ ...professionalData, address: e.target.value })}
                          placeholder="Rua, número, bairro"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                        <input
                          type="checkbox"
                          id="remote"
                          checked={professionalData.remote}
                          onChange={(e) => setProfessionalData({ ...professionalData, remote: e.target.checked })}
                          style={{ width: 20, height: 20, cursor: "pointer", accentColor: tokens.colors.primary }}
                        />
                        <label htmlFor="remote" style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.text, cursor: "pointer" }}>
                          Atendimento remoto disponível
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Experience */}
                  {professionalStep === 3 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
                        Experiência
                      </h2>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Anos de Experiência *
                        </label>
                        <input
                          type="number"
                          required
                          value={professionalData.experience}
                          onChange={(e) => setProfessionalData({ ...professionalData, experience: e.target.value })}
                          placeholder="Ex: 5"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Faixa de Preço *
                        </label>
                        <input
                          type="text"
                          required
                          value={professionalData.priceRange}
                          onChange={(e) => setProfessionalData({ ...professionalData, priceRange: e.target.value })}
                          placeholder="Ex: R$ 150 - R$ 300"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Sobre Você *
                        </label>
                        <textarea
                          required
                          value={professionalData.bio}
                          onChange={(e) => setProfessionalData({ ...professionalData, bio: e.target.value })}
                          placeholder="Conte sobre sua trajetória, abordagem e o que te motiva..."
                          rows={5}
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                            fontFamily: "inherit",
                            resize: "vertical",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Contact */}
                  {professionalStep === 4 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
                        Contato
                      </h2>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={professionalData.phone}
                          onChange={(e) => setProfessionalData({ ...professionalData, phone: e.target.value })}
                          placeholder="(11) 98765-4321"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          E-mail de Contato *
                        </label>
                        <input
                          type="email"
                          required
                          value={professionalData.contactEmail}
                          onChange={(e) => setProfessionalData({ ...professionalData, contactEmail: e.target.value })}
                          placeholder="contato@seuemail.com"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Instagram
                        </label>
                        <input
                          type="text"
                          value={professionalData.instagram}
                          onChange={(e) => setProfessionalData({ ...professionalData, instagram: e.target.value })}
                          placeholder="@seuperfil"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                          Website
                        </label>
                        <input
                          type="url"
                          value={professionalData.website}
                          onChange={(e) => setProfessionalData({ ...professionalData, website: e.target.value })}
                          placeholder="https://seusite.com"
                          style={{
                            width: "100%",
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.md,
                            fontSize: 15,
                            color: tokens.colors.text,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Images */}
                  {professionalStep === 5 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.xxl }}>
                      <div>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0, marginBottom: tokens.space.sm }}>
                          Imagens do Perfil
                        </h2>
                        <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
                          Escolha imagens que representem bem seu trabalho profissional
                        </p>
                      </div>

                      {/* Profile Picture Upload */}
                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.md, color: tokens.colors.text }}>
                          Foto de Perfil
                        </label>
                        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xl }}>
                          {/* Preview Circle */}
                          <div
                            style={{
                              position: "relative",
                              width: 120,
                              height: 120,
                              borderRadius: "50%",
                              backgroundColor: professionalData.profilePicture ? "transparent" : tokens.colors.primaryLighter,
                              border: `3px dashed ${professionalData.profilePicture ? "transparent" : tokens.colors.primary}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              flexShrink: 0,
                            }}
                          >
                            {professionalData.profilePicture ? (
                              <img
                                src={URL.createObjectURL(professionalData.profilePicture)}
                                alt="Preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              <User size={48} color={tokens.colors.primary} strokeWidth={1.5} />
                            )}
                          </div>

                          <div style={{ flex: 1 }}>
                            <input
                              type="file"
                              id="profile-upload"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, "profile")}
                              style={{ display: "none" }}
                            />
                            <label
                              htmlFor="profile-upload"
                              style={{
                                display: "inline-block",
                                padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                                backgroundColor: tokens.colors.primary,
                                color: "white",
                                borderRadius: tokens.radii.md,
                                cursor: "pointer",
                                fontSize: 14,
                                fontWeight: 600,
                                transition: "all 0.2s",
                              }}
                            >
                              {professionalData.profilePicture ? "Alterar Foto" : "Escolher Foto"}
                            </label>
                            <p style={{ fontSize: 13, color: tokens.colors.textMuted, marginTop: tokens.space.sm, margin: `${tokens.space.sm}px 0 0 0` }}>
                              Esta foto aparecerá no seu card de perfil • Formato circular • Recomendado: 400x400px
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cover Picture Upload */}
                      <div>
                        <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: tokens.space.md, color: tokens.colors.text }}>
                          Foto de Capa
                        </label>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: 200,
                            borderRadius: tokens.radii.lg,
                            backgroundColor: professionalData.coverPicture ? "transparent" : tokens.colors.primaryLighter,
                            border: `3px dashed ${professionalData.coverPicture ? "transparent" : tokens.colors.primary}`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            cursor: "pointer",
                          }}
                          onClick={() => document.getElementById("cover-upload")?.click()}
                        >
                          {professionalData.coverPicture ? (
                            <img
                              src={URL.createObjectURL(professionalData.coverPicture)}
                              alt="Cover Preview"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <>
                              <ImageIcon size={48} color={tokens.colors.primary} strokeWidth={1.5} />
                              <p style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 600, marginTop: tokens.space.md, margin: `${tokens.space.md}px 0 ${tokens.space.xs}px` }}>
                                Clique para adicionar foto de capa
                              </p>
                              <p style={{ fontSize: 13, color: tokens.colors.textMuted, margin: 0 }}>
                                Esta imagem aparecerá no topo do seu perfil • Recomendado: 1200x400px
                              </p>
                            </>
                          )}
                          <input
                            type="file"
                            id="cover-upload"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "cover")}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>

                      {/* Portfolio Images */}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.space.md }}>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: tokens.colors.text }}>
                              Portfólio ({professionalData.portfolio.length}/5)
                            </label>
                            <p style={{ fontSize: 13, color: tokens.colors.textMuted, marginTop: tokens.space.xs, margin: `${tokens.space.xs}px 0 0 0` }}>
                              Mostre seus melhores trabalhos em uma galeria
                            </p>
                          </div>
                          {professionalData.portfolio.length < 5 && (
                            <>
                              <input
                                type="file"
                                id="portfolio-upload"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleFileUpload(e, "portfolio")}
                                style={{ display: "none" }}
                              />
                              <label
                                htmlFor="portfolio-upload"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: tokens.space.sm,
                                  padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                                  backgroundColor: tokens.colors.primaryLighter,
                                  color: tokens.colors.primary,
                                  borderRadius: tokens.radii.md,
                                  cursor: "pointer",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  border: `2px solid ${tokens.colors.primary}`,
                                }}
                              >
                                <Plus size={16} />
                                Adicionar Fotos
                              </label>
                            </>
                          )}
                        </div>

                        {/* Portfolio Grid */}
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                          gap: tokens.space.md
                        }}>
                          {professionalData.portfolio.map((file, index) => (
                            <div
                              key={index}
                              style={{
                                position: "relative",
                                paddingTop: "100%",
                                borderRadius: tokens.radii.md,
                                overflow: "hidden",
                                backgroundColor: tokens.colors.bg,
                              }}
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Portfolio ${index + 1}`}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removePortfolioImage(index)}
                                style={{
                                  position: "absolute",
                                  top: tokens.space.sm,
                                  right: tokens.space.sm,
                                  width: 28,
                                  height: 28,
                                  borderRadius: "50%",
                                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                                  color: "white",
                                  border: "none",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 16,
                                  fontWeight: 700,
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}

                          {/* Empty Slots */}
                          {Array.from({ length: Math.max(0, 3 - professionalData.portfolio.length) }).map((_, index) => (
                            <div
                              key={`empty-${index}`}
                              style={{
                                position: "relative",
                                paddingTop: "100%",
                                borderRadius: tokens.radii.md,
                                backgroundColor: tokens.colors.bg,
                                border: `2px dashed ${tokens.colors.border}`,
                              }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <ImageIcon size={32} color={tokens.colors.border} strokeWidth={1.5} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Services */}
                  {professionalStep === 6 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
                        Serviços Oferecidos
                      </h2>

                      {professionalData.services.map((service, index) => (
                        <div key={index} style={{ display: "flex", gap: tokens.space.md, alignItems: "center" }}>
                          <input
                            type="text"
                            value={service}
                            onChange={(e) => updateService(index, e.target.value)}
                            placeholder={`Serviço ${index + 1}`}
                            style={{
                              flex: 1,
                              padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.md,
                              fontSize: 15,
                              color: tokens.colors.text,
                            }}
                          />
                          {professionalData.services.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeService(index)}
                              style={{
                                padding: tokens.space.md,
                                backgroundColor: "#fee2e2",
                                color: "#dc2626",
                                border: "none",
                                borderRadius: tokens.radii.md,
                                cursor: "pointer",
                                fontSize: 14,
                                fontWeight: 600,
                              }}
                            >
                              Remover
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addService}
                        style={{
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          backgroundColor: tokens.colors.primaryLighter,
                          color: tokens.colors.primary,
                          border: `2px dashed ${tokens.colors.primary}`,
                          borderRadius: tokens.radii.md,
                          cursor: "pointer",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        + Adicionar Serviço
                      </button>
                    </div>
                  )}

                  {/* Step 7: Price Table */}
                  {professionalStep === 7 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
                        Tabela de Preços
                      </h2>

                      {professionalData.priceTable.map((item, index) => (
                        <div key={index} style={{ padding: tokens.space.lg, backgroundColor: tokens.colors.bg, borderRadius: tokens.radii.md, border: `1px solid ${tokens.colors.border}` }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.md }}>
                            <input
                              type="text"
                              value={item.service}
                              onChange={(e) => updatePriceTableItem(index, "service", e.target.value)}
                              placeholder="Nome do Serviço (ex: Consulta Inicial)"
                              style={{
                                width: "100%",
                                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                                border: `2px solid ${tokens.colors.border}`,
                                borderRadius: tokens.radii.md,
                                fontSize: 15,
                                color: tokens.colors.text,
                              }}
                            />
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e) => updatePriceTableItem(index, "price", e.target.value)}
                              placeholder="Preço (ex: R$ 200)"
                              style={{
                                width: "100%",
                                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                                border: `2px solid ${tokens.colors.border}`,
                                borderRadius: tokens.radii.md,
                                fontSize: 15,
                                color: tokens.colors.text,
                              }}
                            />
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => updatePriceTableItem(index, "description", e.target.value)}
                              placeholder="Descrição (ex: Avaliação completa - 60 min)"
                              style={{
                                width: "100%",
                                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                                border: `2px solid ${tokens.colors.border}`,
                                borderRadius: tokens.radii.md,
                                fontSize: 15,
                                color: tokens.colors.text,
                              }}
                            />
                            {professionalData.priceTable.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePriceTableItem(index)}
                                style={{
                                  padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                                  backgroundColor: "#fee2e2",
                                  color: "#dc2626",
                                  border: "none",
                                  borderRadius: tokens.radii.md,
                                  cursor: "pointer",
                                  fontSize: 13,
                                  fontWeight: 600,
                                }}
                              >
                                Remover Item
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addPriceTableItem}
                        style={{
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          backgroundColor: tokens.colors.primaryLighter,
                          color: tokens.colors.primary,
                          border: `2px dashed ${tokens.colors.primary}`,
                          borderRadius: tokens.radii.md,
                          cursor: "pointer",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        + Adicionar Item à Tabela
                      </button>
                    </div>
                  )}

                  {/* Professional Buttons */}
                  <div style={{ display: "flex", gap: tokens.space.md, marginTop: tokens.space.xl }}>
                    {professionalStep > 1 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setProfessionalStep(professionalStep - 1)}
                        style={{
                          padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                          backgroundColor: tokens.colors.bg,
                          color: tokens.colors.text,
                          border: `1px solid ${tokens.colors.border}`,
                          borderRadius: tokens.radii.md,
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.space.sm,
                        }}
                      >
                        <ArrowLeft size={16} />
                        Voltar
                      </motion.button>
                    )}

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flex: 1,
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                        color: "white",
                        border: "none",
                        borderRadius: tokens.radii.md,
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: tokens.space.sm,
                        boxShadow: `0 4px 16px ${tokens.colors.primary}40`,
                      }}
                    >
                      {professionalStep < 7 ? (
                        <>
                          Continuar
                          <ArrowRight size={16} />
                        </>
                      ) : (
                        <>
                          <Check size={18} />
                          Finalizar Cadastro
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div
            style={{
              marginTop: tokens.space.xl,
              paddingTop: tokens.space.lg,
              borderTop: `1px solid ${tokens.colors.border}`,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
              Já tem uma conta?{" "}
              <a
                href="/profissionais/login"
                style={{
                  color: tokens.colors.primary,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Fazer login
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        input::placeholder {
          color: #9ca3af !important;
          opacity: 1;
        }

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
      `}</style>
    </div>
  );
}
