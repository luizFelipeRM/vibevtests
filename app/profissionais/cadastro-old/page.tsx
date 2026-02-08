"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Globe,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft,
  Star,
  DollarSign,
  Award,
  Camera,
  Image as ImageIcon,
  Video,
  MessageCircle,
  AlertCircle,
  Sparkles,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Calendar,
  ArrowUp,
  ArrowDown
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
  { id: "nutricionista", name: "Nutricionista", icon: "🥗" },
  { id: "medico", name: "Médico", icon: "⚕️" },
  { id: "psicologo", name: "Psicólogo", icon: "🧠" },
  { id: "pediatra", name: "Pediatra", icon: "👶" },
  { id: "dermatologista", name: "Dermatologista", icon: "✨" },
  { id: "tatuador", name: "Tatuador", icon: "🎨" },
  { id: "veterinario", name: "Veterinário", icon: "🐾" },
  { id: "personal", name: "Personal Trainer", icon: "💪" },
  { id: "chef", name: "Chef", icon: "👨‍🍳" },
  { id: "esteticista", name: "Esteticista", icon: "💅" },
  { id: "outros", name: "Outros", icon: "💼" },
];

export default function ProfessionalRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Básico
    name: "",
    category: "",
    customCategory: "",
    specialty: "",

    // Step 2: Localização
    location: "",
    address: "",
    isRemote: false,

    // Step 3: Experiência
    experience: "",
    price: "",
    bio: "",

    // Step 4: Contato
    phone: "",
    email: "",
    instagram: "",
    website: "",

    // Step 5: Imagens
    profilePicture: null as File | null,
    coverPicture: null as File | null,
    portfolio: [] as File[],

    // Step 6: Serviços
    services: ["", "", "", ""],
    video: "",

    // Step 7: Tabela de Preços
    priceTable: [
      { service: "Consulta Inicial", description: "", price: "" },
      { service: "Consulta de Retorno", description: "", price: "" },
    ],
  });

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Cadastro enviado com sucesso! Você será redirecionado para seu dashboard.");
    window.location.href = "/profissionais/dashboard";
  };

  const updateService = (index: number, value: string) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    setFormData({ ...formData, services: newServices });
  };

  const addService = () => {
    setFormData({ ...formData, services: [...formData.services, ""] });
  };

  const removeService = (index: number) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePicture' | 'coverPicture') => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, portfolio: [...prev.portfolio, ...filesArray] }));
    }
  };

  const removePortfolioImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index)
    }));
  };

  const updatePriceTableItem = (index: number, field: 'service' | 'description' | 'price', value: string) => {
    const newPriceTable = [...formData.priceTable];
    newPriceTable[index] = { ...newPriceTable[index], [field]: value };
    setFormData({ ...formData, priceTable: newPriceTable });
  };

  const addPriceTableItem = () => {
    setFormData({
      ...formData,
      priceTable: [...formData.priceTable, { service: "", description: "", price: "" }]
    });
  };

  const removePriceTableItem = (index: number) => {
    setFormData({
      ...formData,
      priceTable: formData.priceTable.filter((_, i) => i !== index)
    });
  };

  const movePriceTableItemUp = (index: number) => {
    if (index === 0) return;
    const newPriceTable = [...formData.priceTable];
    [newPriceTable[index - 1], newPriceTable[index]] = [newPriceTable[index], newPriceTable[index - 1]];
    setFormData({ ...formData, priceTable: newPriceTable });
  };

  const movePriceTableItemDown = (index: number) => {
    if (index === formData.priceTable.length - 1) return;
    const newPriceTable = [...formData.priceTable];
    [newPriceTable[index], newPriceTable[index + 1]] = [newPriceTable[index + 1], newPriceTable[index]];
    setFormData({ ...formData, priceTable: newPriceTable });
  };

  const steps = [
    { number: 1, title: "Informações Básicas", icon: User },
    { number: 2, title: "Localização", icon: MapPin },
    { number: 3, title: "Experiência", icon: Award },
    { number: 4, title: "Contato", icon: MessageCircle },
    { number: 5, title: "Imagens", icon: Camera },
    { number: 6, title: "Serviços", icon: Briefcase },
    { number: 7, title: "Tabela de Preços", icon: DollarSign },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: tokens.colors.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: `${tokens.space.xxl}px ${tokens.space.lg}px`
    }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: '0 auto', marginBottom: tokens.space.xxl }}>
        <div style={{ textAlign: 'center', marginBottom: tokens.space.xl }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: 80,
              height: 80,
              margin: '0 auto',
              marginBottom: tokens.space.lg,
              borderRadius: tokens.radii.full,
              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 24px ${tokens.colors.primary}40`
            }}
          >
            <Sparkles size={40} color="white" />
          </motion.div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.sm, margin: 0 }}>
            Cadastro de Profissional
          </h1>
          <p style={{ fontSize: 16, color: tokens.colors.textMuted, margin: 0 }}>
            Junte-se à maior rede de profissionais veganos do Brasil
          </p>
        </div>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: tokens.space.xxl,
          position: 'relative'
        }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            top: 20,
            left: '5%',
            right: '5%',
            height: 3,
            backgroundColor: tokens.colors.border,
            zIndex: 0
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: '100%',
                backgroundColor: tokens.colors.primary,
              }}
            />
          </div>

          {steps.map((step) => (
            <div key={step.number} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <motion.div
                animate={{
                  scale: currentStep === step.number ? 1.1 : 1,
                  backgroundColor: currentStep >= step.number ? tokens.colors.primary : tokens.colors.surface
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: tokens.radii.full,
                  border: `3px solid ${currentStep >= step.number ? tokens.colors.primary : tokens.colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: tokens.colors.surface,
                  marginBottom: tokens.space.sm,
                  transition: 'all 0.3s'
                }}
              >
                {currentStep > step.number ? (
                  <Check size={20} color="white" />
                ) : (
                  <step.icon size={18} color={currentStep >= step.number ? 'white' : tokens.colors.textMuted} />
                )}
              </motion.div>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                color: currentStep >= step.number ? tokens.colors.primary : tokens.colors.textMuted,
                textAlign: 'center',
                maxWidth: 100
              }}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        style={{
          maxWidth: 900,
          margin: '0 auto',
          backgroundColor: tokens.colors.surface,
          padding: tokens.space.xxl,
          borderRadius: tokens.radii.xl,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${tokens.colors.border}`
        }}
      >
        {/* Step 1: Informações Básicas */}
        {currentStep === 1 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
              Vamos começar com o básico
            </h2>
            <p style={{ fontSize: 14, color: tokens.colors.textMuted, marginBottom: tokens.space.xl }}>
              Conte-nos quem você é e o que você faz
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Nome Completo ou Nome da Clínica *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Dra. Ana Silva ou Clínica Vida Vegana"
                  style={{
                    width: '100%',
                    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 15,
                    transition: 'all 0.2s',
                    color: tokens.colors.text
                  }}
                  className="input-dark"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Categoria *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: tokens.space.md }}>
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      style={{
                        padding: tokens.space.md,
                        border: `2px solid ${formData.category === cat.id ? tokens.colors.primary : tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        backgroundColor: formData.category === cat.id ? tokens.colors.primaryLighter : tokens.colors.surface,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: tokens.space.xs,
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontSize: 28 }}>{cat.icon}</span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: formData.category === cat.id ? tokens.colors.primary : tokens.colors.text,
                        textAlign: 'center'
                      }}>
                        {cat.name}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Campo condicional para "Outros" */}
                {formData.category === 'outros' && (
                  <div style={{ marginTop: tokens.space.md }}>
                    <input
                      type="text"
                      value={formData.customCategory}
                      onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                      placeholder="Digite sua profissão (ex: Programador, Pedreiro, etc.)"
                      style={{
                        width: '100%',
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `2px solid ${tokens.colors.primary}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 15,
                        backgroundColor: tokens.colors.primaryLighter,
                        color: tokens.colors.text
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Especialidade *
                </label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="Ex: Nutrição Esportiva Vegana"
                  style={{
                    width: '100%',
                    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 15
                  }}
                />
                <p style={{ fontSize: 12, color: tokens.colors.textMuted, marginTop: 4, marginBottom: 0 }}>
                  Seja específico! Isso ajuda clientes a te encontrarem
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Localização */}
        {currentStep === 2 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
              Onde você atende?
            </h2>
            <p style={{ fontSize: 14, color: tokens.colors.textMuted, marginBottom: tokens.space.xl }}>
              Ajude seus clientes a te encontrarem
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Cidade e Estado *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: São Paulo, SP"
                  style={{
                    width: '100%',
                    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 15
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Endereço Completo (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Rua, Número, Bairro, CEP"
                  style={{
                    width: '100%',
                    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 15
                  }}
                />
                <p style={{ fontSize: 12, color: tokens.colors.textMuted, marginTop: 4, marginBottom: 0 }}>
                  Seu endereço completo não será exibido publicamente
                </p>
              </div>

              <div style={{
                padding: tokens.space.lg,
                backgroundColor: tokens.colors.primaryLighter,
                borderRadius: tokens.radii.md,
                border: `1px solid ${tokens.colors.primary}30`,
                display: 'flex',
                alignItems: 'center',
                gap: tokens.space.md
              }}>
                <input
                  type="checkbox"
                  id="isRemote"
                  checked={formData.isRemote}
                  onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
                  style={{ width: 20, height: 20, cursor: 'pointer' }}
                />
                <label htmlFor="isRemote" style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.text, cursor: 'pointer', flex: 1 }}>
                  Atendo remotamente (online)
                </label>
                <Video size={20} color={tokens.colors.primary} />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Experiência */}
        {currentStep === 3 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
              Sua experiência profissional
            </h2>
            <p style={{ fontSize: 14, color: tokens.colors.textMuted, marginBottom: tokens.space.xl }}>
              Mostre sua expertise e valores
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.space.lg }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                    Anos de Experiência *
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Ex: 8 anos"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                    Faixa de Preço *
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ex: R$ 200-300"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Sobre Você *
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={6}
                  placeholder="Conte sobre sua trajetória, sua abordagem profissional e por que você é vegano..."
                  style={{
                    width: '100%',
                    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 15,
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
                <p style={{ fontSize: 12, color: tokens.colors.textMuted, marginTop: 4, marginBottom: 0 }}>
                  Mínimo 100 caracteres. Seja autêntico e mostre sua paixão!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contato */}
        {currentStep === 4 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
              Como os clientes podem te contatar?
            </h2>
            <p style={{ fontSize: 14, color: tokens.colors.textMuted, marginBottom: tokens.space.xl }}>
              Adicione seus canais de comunicação
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.space.lg }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text, display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
                    <Phone size={16} color={tokens.colors.primary} />
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 98765-4321"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text, display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
                    <Mail size={16} color={tokens.colors.primary} />
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seuemail@exemplo.com"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.space.lg }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text, display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
                    <Instagram size={16} color={tokens.colors.primary} />
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@seuperfil"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text, display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
                    <Globe size={16} color={tokens.colors.primary} />
                    Website
                  </label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="www.seusite.com.br"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Imagens */}
        {currentStep === 5 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
              Mostre seu trabalho
            </h2>
            <p style={{ fontSize: 14, color: tokens.colors.textMuted, marginBottom: tokens.space.xl }}>
              Imagens profissionais aumentam muito sua visibilidade!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.xl }}>
              {/* Profile Picture */}
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Foto de Perfil *
                </label>
                <div
                  onClick={() => profileInputRef.current?.click()}
                  style={{
                    border: `3px dashed ${formData.profilePicture ? tokens.colors.primary : tokens.colors.border}`,
                    borderRadius: tokens.radii.lg,
                    padding: tokens.space.xl,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: formData.profilePicture ? tokens.colors.primaryLighter : tokens.colors.bg,
                    transition: 'all 0.3s',
                    position: 'relative',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    type="file"
                    hidden
                    ref={profileInputRef}
                    onChange={(e) => handleFileChange(e, 'profilePicture')}
                    accept="image/*"
                  />
                  {formData.profilePicture ? (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <img
                        src={URL.createObjectURL(formData.profilePicture)}
                        alt="Profile Preview"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: tokens.radii.md
                        }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({ ...formData, profilePicture: null });
                        }}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 32,
                          height: 32,
                          borderRadius: tokens.radii.full,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          border: 'none',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  ) : (
                    <div>
                      <Camera size={48} color={tokens.colors.textMuted} style={{ marginBottom: tokens.space.md }} />
                      <p style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.text, marginBottom: 4 }}>
                        Clique para adicionar sua foto
                      </p>
                      <p style={{ fontSize: 13, color: tokens.colors.textMuted, margin: 0 }}>
                        Recomendado: formato quadrado, mínimo 400x400px
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Picture */}
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Foto de Capa (Opcional)
                </label>
                <div
                  onClick={() => coverInputRef.current?.click()}
                  style={{
                    border: `3px dashed ${formData.coverPicture ? tokens.colors.primary : tokens.colors.border}`,
                    borderRadius: tokens.radii.lg,
                    padding: tokens.space.xl,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: formData.coverPicture ? tokens.colors.primaryLighter : tokens.colors.bg,
                    transition: 'all 0.3s',
                    position: 'relative',
                    height: 160,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    type="file"
                    hidden
                    ref={coverInputRef}
                    onChange={(e) => handleFileChange(e, 'coverPicture')}
                    accept="image/*"
                  />
                  {formData.coverPicture ? (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <img
                        src={URL.createObjectURL(formData.coverPicture)}
                        alt="Cover Preview"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: tokens.radii.md
                        }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({ ...formData, coverPicture: null });
                        }}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 32,
                          height: 32,
                          borderRadius: tokens.radii.full,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          border: 'none',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon size={48} color={tokens.colors.textMuted} style={{ marginBottom: tokens.space.md }} />
                      <p style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.text, marginBottom: 4 }}>
                        Adicione uma foto de capa
                      </p>
                      <p style={{ fontSize: 13, color: tokens.colors.textMuted, margin: 0 }}>
                        Recomendado: 1200x400px
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                  Portfólio (Opcional)
                </label>
                <p style={{ fontSize: 13, color: tokens.colors.textMuted, marginBottom: tokens.space.md }}>
                  Adicione até 5 fotos do seu trabalho
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.space.md }}>
                  {formData.portfolio.map((file, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        width: 120,
                        height: 120,
                        borderRadius: tokens.radii.md,
                        overflow: 'hidden',
                        border: `2px solid ${tokens.colors.border}`
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Portfolio"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        type="button"
                        onClick={() => removePortfolioImage(idx)}
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          width: 24,
                          height: 24,
                          borderRadius: tokens.radii.full,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          border: 'none',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={12} />
                      </motion.button>
                    </div>
                  ))}

                  {formData.portfolio.length < 5 && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={() => portfolioInputRef.current?.click()}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: tokens.radii.md,
                        border: `3px dashed ${tokens.colors.border}`,
                        backgroundColor: tokens.colors.bg,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        gap: tokens.space.xs
                      }}
                    >
                      <input
                        type="file"
                        hidden
                        multiple
                        ref={portfolioInputRef}
                        onChange={handlePortfolioUpload}
                        accept="image/*"
                      />
                      <Plus size={24} color={tokens.colors.textMuted} />
                      <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>Adicionar</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Serviços */}
        {currentStep === 6 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
              Quase lá! Seus serviços
            </h2>
            <p style={{ fontSize: 14, color: tokens.colors.textMuted, marginBottom: tokens.space.xl }}>
              Liste os principais serviços que você oferece
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.md }}>
                {formData.services.map((service, index) => (
                  <div key={index} style={{ display: 'flex', gap: tokens.space.sm, alignItems: 'center' }}>
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
                        fontSize: 15
                      }}
                    />
                    {formData.services.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => removeService(index)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: tokens.radii.md,
                          backgroundColor: '#fee2e2',
                          border: '1px solid #fecaca',
                          color: '#dc2626',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>

              {formData.services.length < 10 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={addService}
                  style={{
                    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                    backgroundColor: tokens.colors.primaryLighter,
                    color: tokens.colors.primary,
                    border: `2px dashed ${tokens.colors.primary}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.space.sm
                  }}
                >
                  <Plus size={16} />
                  Adicionar Serviço
                </motion.button>
              )}

              <div style={{ marginTop: tokens.space.lg }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text, display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
                  <Video size={16} color={tokens.colors.primary} />
                  Vídeo de Apresentação (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.video}
                  onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  style={{
                    width: '100%',
                    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 15
                  }}
                />
                <p style={{ fontSize: 12, color: tokens.colors.textMuted, marginTop: 4, marginBottom: 0 }}>
                  Cole o link do seu vídeo do YouTube para se destacar ainda mais!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Tabela de Preços */}
        {currentStep === 7 && (
          <div>
            <div style={{ marginBottom: tokens.space.xl }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: tokens.radii.lg,
                  background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)'
                }}>
                  <DollarSign size={28} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: tokens.colors.text, letterSpacing: '-0.02em' }}>
                    Tabela de Preços
                  </h2>
                  <p style={{ fontSize: 15, color: tokens.colors.textMuted, margin: 0, marginTop: 4 }}>
                    Configure os preços dos seus serviços com transparência
                  </p>
                </div>
              </div>
            </div>

            {/* Price Table Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg, marginBottom: tokens.space.xl }}>
              <AnimatePresence>
                {formData.priceTable.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                    style={{
                      padding: tokens.space.xl,
                      backgroundColor: tokens.colors.surface,
                      borderRadius: tokens.radii.xl,
                      border: `2px solid ${tokens.colors.border}`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.space.lg }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radii.md,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 16,
                            color: 'white'
                          }}>
                            {index + 1}
                          </div>
                          <h4 style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
                            Serviço {index + 1}
                          </h4>
                        </div>

                        <div style={{ display: 'flex', gap: tokens.space.sm }}>
                          {/* Reorder Buttons */}
                          {formData.priceTable.length > 1 && (
                            <div style={{ display: 'flex', gap: 4 }}>
                              {index > 0 && (
                                <motion.button
                                  whileHover={{ scale: 1.1, y: -2, backgroundColor: '#e5e7eb' }}
                                  whileTap={{ scale: 0.9 }}
                                  type="button"
                                  onClick={() => movePriceTableItemUp(index)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: tokens.radii.md,
                                    backgroundColor: tokens.colors.bg,
                                    border: `1px solid ${tokens.colors.border}`,
                                    color: tokens.colors.textMuted,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'none'
                                  }}
                                  title="Mover para cima"
                                >
                                  <ArrowUp size={14} strokeWidth={2.5} />
                                </motion.button>
                              )}
                              {index < formData.priceTable.length - 1 && (
                                <motion.button
                                  whileHover={{ scale: 1.1, y: 2, backgroundColor: '#e5e7eb' }}
                                  whileTap={{ scale: 0.9 }}
                                  type="button"
                                  onClick={() => movePriceTableItemDown(index)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: tokens.radii.md,
                                    backgroundColor: tokens.colors.bg,
                                    border: `1px solid ${tokens.colors.border}`,
                                    color: tokens.colors.textMuted,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'none'
                                  }}
                                  title="Mover para baixo"
                                >
                                  <ArrowDown size={14} strokeWidth={2.5} />
                                </motion.button>
                              )}
                            </div>
                          )}

                          {/* Delete Button */}
                          {formData.priceTable.length > 1 && (
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 5, backgroundColor: '#e5e7eb' }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => removePriceTableItem(index)}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: tokens.radii.md,
                                backgroundColor: tokens.colors.bg,
                                border: `1px solid ${tokens.colors.border}`,
                                color: tokens.colors.textMuted,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'none'
                              }}
                              title="Remover"
                            >
                              <Trash2 size={14} strokeWidth={2.5} />
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Fields */}
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: tokens.space.lg }}>
                        <div>
                          <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: tokens.space.sm,
                            fontSize: 13,
                            fontWeight: 700,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            <Briefcase size={14} color={tokens.colors.primary} />
                            Nome do Serviço *
                          </label>
                          <input
                            type="text"
                            value={item.service}
                            onChange={(e) => updatePriceTableItem(index, 'service', e.target.value)}
                            placeholder="Ex: Consulta Inicial"
                            style={{
                              width: '100%',
                              padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                              border: `2px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.lg,
                              fontSize: 15,
                              color: tokens.colors.text,
                              fontWeight: 500,
                              transition: 'all 0.2s'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: tokens.space.sm,
                            fontSize: 13,
                            fontWeight: 700,
                            marginBottom: tokens.space.sm,
                            color: tokens.colors.text,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            <DollarSign size={14} color="#10b981" />
                            Preço *
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e) => updatePriceTableItem(index, 'price', e.target.value)}
                              placeholder="R$ 200"
                              style={{
                                width: '100%',
                                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                                paddingLeft: 42,
                                border: `2px solid ${tokens.colors.border}`,
                                borderRadius: tokens.radii.lg,
                                fontSize: 15,
                                color: tokens.colors.text,
                                fontWeight: 700,
                                transition: 'all 0.2s'
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              left: 14,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              fontSize: 15,
                              fontWeight: 700,
                              color: tokens.colors.textMuted
                            }}>
                              R$
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ marginTop: tokens.space.lg }}>
                        <label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: tokens.space.sm,
                          fontSize: 13,
                          fontWeight: 700,
                          marginBottom: tokens.space.sm,
                          color: tokens.colors.text,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          <MessageCircle size={14} color="#3b82f6" />
                          Descrição (Opcional)
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updatePriceTableItem(index, 'description', e.target.value)}
                          placeholder="Ex: Avaliação completa (60 min)"
                          style={{
                            width: '100%',
                            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                            border: `2px solid ${tokens.colors.border}`,
                            borderRadius: tokens.radii.lg,
                            fontSize: 14,
                            color: tokens.colors.text,
                            transition: 'all 0.2s'
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add Button */}
            {formData.priceTable.length < 10 && (
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={addPriceTableItem}
                style={{
                  width: '100%',
                  padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
                  background: `linear-gradient(135deg, ${tokens.colors.primaryLighter} 0%, ${tokens.colors.primaryLight} 100%)`,
                  color: tokens.colors.primary,
                  border: `2px dashed ${tokens.colors.primary}`,
                  borderRadius: tokens.radii.lg,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: tokens.space.sm,
                  transition: 'all 0.2s'
                }}
              >
                <Plus size={20} strokeWidth={3} />
                Adicionar Novo Serviço
              </motion.button>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: tokens.space.xxl,
          paddingTop: tokens.space.xl,
          borderTop: `1px solid ${tokens.colors.border}`
        }}>
          {currentStep > 1 ? (
            <motion.button
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              style={{
                padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                backgroundColor: tokens.colors.bg,
                color: tokens.colors.text,
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.md,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: tokens.space.sm
              }}
            >
              <ArrowLeft size={18} />
              Voltar
            </motion.button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <motion.button
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              style={{
                padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: tokens.radii.md,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: tokens.space.sm,
                boxShadow: `0 4px 12px ${tokens.colors.primary}40`
              }}
            >
              Próximo
              <ArrowRight size={18} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              style={{
                padding: `${tokens.space.md}px ${tokens.space.xxl}px`,
                background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: tokens.radii.md,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: tokens.space.sm,
                boxShadow: `0 4px 16px ${tokens.colors.primary}50`
              }}
            >
              <CheckCircle size={20} />
              Finalizar Cadastro
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <div style={{ maxWidth: 900, margin: '0 auto', marginTop: tokens.space.xl, textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: tokens.colors.textMuted }}>
          Passo {currentStep} de {totalSteps}
        </p>
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
          border-color: ${tokens.colors.primary};
        }
      `}</style>
    </div>
  );
}
