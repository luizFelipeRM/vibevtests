"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Search,
  MapPin,
  Star,
  Phone,
  Mail,
  Instagram,
  Globe,
  X,
  Award,
  DollarSign,
  Stethoscope,
  Brain,
  Baby,
  Sparkles,
  Heart,
  Scissors,
  Dumbbell,
  ChefHat,
  PawPrint,
  Palette,
  Check,
  MessageCircle,
  Bell,
  User,
  Menu,
  ExternalLink,
  UserPlus,
  Upload,
  Plus,
} from "lucide-react";

// Design Tokens com nova cor primária
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
    pill: 50,
    full: 9999,
  },
};

// Categorias de profissionais
const categories = [
  { id: "todos", name: "Todos", icon: Sparkles },
  { id: "nutricionista", name: "Nutricionistas", icon: Heart },
  { id: "medico", name: "Médicos", icon: Stethoscope },
  { id: "psicologo", name: "Psicólogos", icon: Brain },
  { id: "pediatra", name: "Pediatras", icon: Baby },
  { id: "dermatologista", name: "Dermatologistas", icon: Sparkles },
  { id: "tatuador", name: "Tatuadores", icon: Palette },
  { id: "veterinario", name: "Veterinários", icon: PawPrint },
  { id: "personal", name: "Personal Trainers", icon: Dumbbell },
  { id: "chef", name: "Chefs", icon: ChefHat },
  { id: "esteticista", name: "Esteticistas", icon: Scissors },
];

// Dados mockados de profissionais
const professionalsData = [
  {
    id: 1,
    name: "Dra. Ana Silva",
    category: "nutricionista",
    specialty: "Nutrição Clínica Vegana",
    location: "São Paulo, SP",
    rating: 4.9,
    reviews: 127,
    experience: "8 anos",
    price: "R$ 200-300",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    verified: true,
    bio: "Especialista em nutrição vegana para atletas e gestantes. Ajudo pessoas a alcançarem seus objetivos de saúde com alimentação 100% vegetal.",
    services: ["Consulta inicial", "Plano alimentar personalizado", "Acompanhamento mensal", "Suplementação adequada"],
    portfolio: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    ],
    contact: {
      phone: "(11) 98765-4321",
      email: "ana.silva@email.com",
      instagram: "@dra.anasilva",
      website: "www.anasilva.com.br",
    },
  },
  {
    id: 2,
    name: "Dr. Carlos Mendes",
    category: "medico",
    specialty: "Clínico Geral",
    location: "Rio de Janeiro, RJ",
    rating: 4.8,
    reviews: 203,
    experience: "12 anos",
    price: "R$ 250-350",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    verified: true,
    bio: "Médico vegano há 10 anos. Atendimento humanizado com foco em medicina preventiva e lifestyle vegano. Experiência em orientação nutricional e acompanhamento de pacientes em transição.",
    services: ["Consulta geral", "Check-up completo", "Orientação nutricional", "Medicina preventiva"],
    portfolio: [],
    contact: {
      phone: "(21) 97654-3210",
      email: "carlos.mendes@email.com",
      instagram: "@dr.carlosmendes",
      website: "www.drcarlosmendes.com.br",
    },
  },
  {
    id: 3,
    name: "Dra. Mariana Costa",
    category: "psicologo",
    specialty: "Psicologia Clínica",
    location: "Belo Horizonte, MG",
    rating: 5.0,
    reviews: 89,
    experience: "6 anos",
    price: "R$ 150-200",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    verified: true,
    bio: "Psicóloga especializada em ansiedade e transição para o veganismo. Atendimento online e presencial com abordagem acolhedora e humanizada.",
    services: ["Terapia individual", "Terapia de casal", "Orientação familiar", "Atendimento online"],
    portfolio: [],
    contact: {
      phone: "(31) 96543-2109",
      email: "mariana.costa@email.com",
      instagram: "@psi.marianacosta",
      website: "www.marianacosta.psi.br",
    },
  },
  {
    id: 4,
    name: "Ink Vegan Tattoo - Rafael",
    category: "tatuador",
    specialty: "Tatuagem Vegana",
    location: "Curitiba, PR",
    rating: 4.9,
    reviews: 156,
    experience: "10 anos",
    price: "R$ 300-800",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    verified: true,
    bio: "Estúdio 100% vegano. Tintas veganas, luvas sem látex, aftercare cruelty-free. Especialidade em blackwork e minimalismo.",
    services: ["Tatuagem personalizada", "Cover up", "Restauração", "Consultoria de design"],
    portfolio: [
      "https://images.unsplash.com/photo-1590246814883-57c511a83d6b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&h=400&fit=crop",
    ],
    contact: {
      phone: "(41) 95432-1098",
      email: "inkvegan@email.com",
      instagram: "@inkvegantattoo",
      website: "www.inkvegantattoo.com.br",
    },
  },
  {
    id: 5,
    name: "Dra. Paula Oliveira",
    category: "pediatra",
    specialty: "Pediatria Vegana",
    location: "Porto Alegre, RS",
    rating: 4.9,
    reviews: 142,
    experience: "9 anos",
    price: "R$ 280-380",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    verified: true,
    bio: "Pediatra especializada em nutrição infantil vegana. Mãe vegana e apoiadora da criação consciente. Acompanhamento completo do desenvolvimento infantil.",
    services: ["Consulta pediátrica", "Orientação nutricional infantil", "Acompanhamento do desenvolvimento", "Puericultura"],
    portfolio: [],
    contact: {
      phone: "(51) 94321-0987",
      email: "paula.oliveira@email.com",
      instagram: "@dra.paulaoliveira",
      website: "www.paulaoliveira.med.br",
    },
  },
  {
    id: 6,
    name: "Lucas Fitness Vegan",
    category: "personal",
    specialty: "Personal Trainer Vegano",
    location: "Florianópolis, SC",
    rating: 4.8,
    reviews: 98,
    experience: "7 anos",
    price: "R$ 120-180/aula",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    verified: true,
    bio: "Personal trainer vegano há 7 anos. Especialista em ganho de massa muscular e performance com dieta plant-based.",
    services: ["Treino personalizado", "Consultoria nutricional esportiva", "Treino online", "Acompanhamento mensal"],
    portfolio: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop",
    ],
    contact: {
      phone: "(48) 93210-9876",
      email: "lucas.fitness@email.com",
      instagram: "@lucasfitnessvegan",
      website: "www.lucasfitnessvegan.com.br",
    },
  },
  {
    id: 7,
    name: "Chef Bianca Almeida",
    category: "chef",
    specialty: "Gastronomia Vegana",
    location: "São Paulo, SP",
    rating: 5.0,
    reviews: 167,
    experience: "11 anos",
    price: "R$ 500-1500/evento",
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop",
    verified: true,
    bio: "Chef vegana especializada em alta gastronomia plant-based. Eventos, aulas de culinária e consultoria para restaurantes.",
    services: ["Eventos privados", "Aulas de culinária", "Consultoria gastronômica", "Menu personalizado"],
    portfolio: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    ],
    contact: {
      phone: "(11) 92109-8765",
      email: "chef.bianca@email.com",
      instagram: "@chefbiancaalmeida",
      website: "www.chefbiancaalmeida.com.br",
    },
  },
  {
    id: 8,
    name: "Dr. Vegan Pet - Ricardo",
    category: "veterinario",
    specialty: "Veterinária Vegana",
    location: "Brasília, DF",
    rating: 4.9,
    reviews: 134,
    experience: "8 anos",
    price: "R$ 180-280",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    verified: true,
    bio: "Veterinário especializado em dietas plant-based para cães. Atendimento ético e compassivo para todos os animais.",
    services: ["Consulta veterinária", "Orientação nutricional pet", "Emergências", "Vacinas e exames"],
    portfolio: [],
    contact: {
      phone: "(61) 91098-7654",
      email: "dr.veganpet@email.com",
      instagram: "@drveganpet",
      website: "www.drveganpet.com.br",
    },
  },
];

// Navbar Component
function Navbar({ onOpenRegister }) {
  return (
    <nav
      style={{
        backgroundColor: "white",
        borderBottom: `1px solid ${tokens.colors.border}`,
        padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
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
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.md,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: tokens.radii.md,
              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={28} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
              GuiaVegano
            </h1>
            <p style={{ fontSize: 12, color: tokens.colors.textMuted, margin: 0 }}>
              Profissionais
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div
          style={{
            flex: 1,
            maxWidth: 600,
            backgroundColor: tokens.colors.bg,
            borderRadius: tokens.radii.pill,
            border: `1px solid ${tokens.colors.border}`,
            display: "flex",
            alignItems: "center",
            padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
            gap: tokens.space.md,
          }}
        >
          <Search size={20} color={tokens.colors.textMuted} />
          <input
            type="text"
            placeholder="Buscar profissionais..."
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: 14,
              flex: 1,
              fontFamily: "inherit",
              color: tokens.colors.text,
            }}
          />
        </div>

        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 44,
              height: 44,
              borderRadius: tokens.radii.full,
              backgroundColor: tokens.colors.bg,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Bell size={20} color={tokens.colors.text} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 44,
              height: 44,
              borderRadius: tokens.radii.full,
              backgroundColor: tokens.colors.bg,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <User size={20} color={tokens.colors.text} />
          </motion.button>

          <motion.button
            onClick={onOpenRegister}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: `${tokens.space.md}px ${tokens.space.lg}px`,
              borderRadius: tokens.radii.pill,
              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: tokens.space.sm,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              boxShadow: `0 2px 8px ${tokens.colors.primary}40`,
            }}
          >
            <UserPlus size={18} strokeWidth={2.5} />
            Cadastrar-se
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

// Category Filter
function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div
      style={{
        padding: `${tokens.space.lg}px`,
        backgroundColor: "white",
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          overflowX: "auto",
          display: "flex",
          gap: tokens.space.md,
          paddingBottom: tokens.space.sm,
        }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                borderRadius: tokens.radii.pill,
                border: `2px solid ${isSelected ? tokens.colors.primary : tokens.colors.border}`,
                backgroundColor: isSelected ? tokens.colors.primary : "white",
                color: isSelected ? "white" : tokens.colors.text,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: tokens.space.sm,
                whiteSpace: "nowrap",
                boxShadow: isSelected ? `0 4px 12px ${tokens.colors.primary}40` : "none",
              }}
            >
              <Icon size={18} strokeWidth={2.5} />
              {category.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Professional Card (tamanho fixo)
function ProfessionalCard({ professional, onOpenModal }) {
  const CategoryIcon = categories.find((c) => c.id === professional.category)?.icon || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      style={{
        backgroundColor: "white",
        borderRadius: tokens.radii.lg,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        border: `1px solid ${tokens.colors.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Imagem - altura fixa */}
      <div
        style={{
          position: "relative",
          height: 220,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={professional.image}
          alt={professional.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {professional.verified && (
          <div
            style={{
              position: "absolute",
              top: tokens.space.md,
              right: tokens.space.md,
              backgroundColor: tokens.colors.primary,
              color: "white",
              padding: `${tokens.space.xs}px ${tokens.space.md}px`,
              borderRadius: tokens.radii.pill,
              fontSize: 11,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: tokens.space.xs,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Check size={12} strokeWidth={3} />
            Verificado
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: tokens.space.md,
            left: tokens.space.md,
            backgroundColor: "white",
            padding: `${tokens.space.sm}px ${tokens.space.md}px`,
            borderRadius: tokens.radii.md,
            display: "flex",
            alignItems: "center",
            gap: tokens.space.xs,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <CategoryIcon size={14} color={tokens.colors.primary} strokeWidth={2.5} />
          <span style={{ fontSize: 11, fontWeight: 600, color: tokens.colors.text }}>
            {categories.find((c) => c.id === professional.category)?.name}
          </span>
        </div>
      </div>

      {/* Conteúdo - flex grow para preencher espaço */}
      <div style={{ padding: tokens.space.lg, display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: tokens.space.md }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: tokens.colors.text,
              marginBottom: tokens.space.xs,
              lineHeight: 1.3,
            }}
          >
            {professional.name}
          </h3>
          <p
            style={{
              fontSize: 14,
              color: tokens.colors.primary,
              fontWeight: 600,
              marginBottom: tokens.space.sm,
            }}
          >
            {professional.specialty}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: tokens.space.xs,
              fontSize: 13,
              color: tokens.colors.textMuted,
            }}
          >
            <MapPin size={14} />
            {professional.location}
          </div>
        </div>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.md,
            marginBottom: tokens.space.md,
            padding: tokens.space.sm,
            backgroundColor: tokens.colors.primaryLighter,
            borderRadius: tokens.radii.sm,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xs }}>
            <Star size={16} fill={tokens.colors.primary} color={tokens.colors.primary} />
            <span style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.text }}>
              {professional.rating}
            </span>
          </div>
          <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>
            ({professional.reviews})
          </span>
        </div>

        {/* Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: tokens.space.lg,
            fontSize: 13,
            color: tokens.colors.textMuted,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xs }}>
            <Award size={14} color={tokens.colors.primary} />
            {professional.experience}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xs }}>
            <DollarSign size={14} color={tokens.colors.primary} />
            {professional.price.split("/")[0]}
          </div>
        </div>

        {/* Botão - sempre no final */}
        <div style={{ marginTop: "auto" }}>
          <motion.button
            onClick={() => onOpenModal(professional)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: `${tokens.space.md}px`,
              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
              color: "white",
              border: "none",
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
            Ver Perfil Completo
            <ExternalLink size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Modal Component
function ProfessionalModal({ professional, onClose }) {
  if (!professional) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: tokens.space.xl,
          overflowY: "auto",
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "white",
            borderRadius: tokens.radii.xl,
            maxWidth: 900,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: tokens.space.lg,
              right: tokens.space.lg,
              backgroundColor: tokens.colors.primary,
              color: "white",
              border: "none",
              borderRadius: tokens.radii.full,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <X size={24} />
          </button>

          {/* Header com imagem */}
          <div
            style={{
              position: "relative",
              height: 300,
              overflow: "hidden",
              borderRadius: `${tokens.radii.xl}px ${tokens.radii.xl}px 0 0`,
            }}
          >
            <img
              src={professional.image}
              alt={professional.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                padding: tokens.space.xl,
                color: "white",
              }}
            >
              <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: tokens.space.sm }}>
                {professional.name}
              </h2>
              <p style={{ fontSize: 18, marginBottom: tokens.space.sm }}>{professional.specialty}</p>
              <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
                <MapPin size={16} />
                {professional.location}
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: tokens.space.xxl }}>
            {/* Rating e Info */}
            <div
              style={{
                display: "flex",
                gap: tokens.space.xl,
                marginBottom: tokens.space.xxl,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: tokens.space.lg,
                  backgroundColor: tokens.colors.primaryLighter,
                  borderRadius: tokens.radii.md,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, marginBottom: tokens.space.xs }}>
                  <Star size={20} fill={tokens.colors.primary} color={tokens.colors.primary} />
                  <span style={{ fontSize: 24, fontWeight: 700 }}>{professional.rating}</span>
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.textMuted }}>
                  {professional.reviews} avaliações
                </p>
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: tokens.space.lg,
                  backgroundColor: tokens.colors.primaryLighter,
                  borderRadius: tokens.radii.md,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, marginBottom: tokens.space.xs }}>
                  <Award size={20} color={tokens.colors.primary} />
                  <span style={{ fontSize: 18, fontWeight: 700 }}>{professional.experience}</span>
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.textMuted }}>de experiência</p>
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: tokens.space.lg,
                  backgroundColor: tokens.colors.primaryLighter,
                  borderRadius: tokens.radii.md,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, marginBottom: tokens.space.xs }}>
                  <DollarSign size={20} color={tokens.colors.primary} />
                  <span style={{ fontSize: 18, fontWeight: 700 }}>{professional.price.split("-")[0]}</span>
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.textMuted }}>valor médio</p>
              </div>
            </div>

            {/* Sobre */}
            <div style={{ marginBottom: tokens.space.xxl }}>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Sobre
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: tokens.colors.textMuted }}>
                {professional.bio}
              </p>
            </div>

            {/* Serviços */}
            <div style={{ marginBottom: tokens.space.xxl }}>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Serviços
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: tokens.space.md,
                }}
              >
                {professional.services.map((service, index) => (
                  <div
                    key={index}
                    style={{
                      padding: tokens.space.lg,
                      backgroundColor: tokens.colors.bg,
                      borderRadius: tokens.radii.md,
                      border: `1px solid ${tokens.colors.border}`,
                      display: "flex",
                      alignItems: "center",
                      gap: tokens.space.md,
                    }}
                  >
                    <Check size={18} color={tokens.colors.primary} strokeWidth={3} />
                    <span style={{ fontSize: 14, color: tokens.colors.text }}>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfólio */}
            {professional.portfolio.length > 0 && (
              <div style={{ marginBottom: tokens.space.xxl }}>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: tokens.space.lg,
                    color: tokens.colors.text,
                  }}
                >
                  Portfólio
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: tokens.space.lg,
                  }}
                >
                  {professional.portfolio.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        borderRadius: tokens.radii.md,
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        style={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Contato */}
            <div
              style={{
                padding: tokens.space.xxl,
                backgroundColor: tokens.colors.primaryLighter,
                borderRadius: tokens.radii.lg,
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: tokens.space.xl,
                  color: tokens.colors.text,
                }}
              >
                Entre em contato
              </h3>

              <div style={{ display: "grid", gap: tokens.space.md, marginBottom: tokens.space.xl }}>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Phone size={18} color={tokens.colors.primary} />
                  <span style={{ fontSize: 15 }}>{professional.contact.phone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Mail size={18} color={tokens.colors.primary} />
                  <span style={{ fontSize: 15 }}>{professional.contact.email}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Instagram size={18} color={tokens.colors.primary} />
                  <span style={{ fontSize: 15 }}>{professional.contact.instagram}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Globe size={18} color={tokens.colors.primary} />
                  <span style={{ fontSize: 15 }}>{professional.contact.website}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: `${tokens.space.lg}px`,
                  background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                  color: "white",
                  border: "none",
                  borderRadius: tokens.radii.md,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: tokens.space.md,
                  boxShadow: `0 4px 12px ${tokens.colors.primary}40`,
                }}
              >
                <MessageCircle size={20} />
                Entrar em Contato
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Register Modal Component
function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    specialty: "",
    location: "",
    experience: "",
    price: "",
    bio: "",
    services: ["", "", "", ""],
    phone: "",
    email: "",
    instagram: "",
    website: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    alert("Cadastro enviado com sucesso! Em breve entraremos em contato.");
    onClose();
  };

  const updateService = (index, value) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    setFormData({ ...formData, services: newServices });
  };

  const addService = () => {
    setFormData({ ...formData, services: [...formData.services, ""] });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: tokens.space.xl,
          overflowY: "auto",
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "white",
            borderRadius: tokens.radii.xl,
            maxWidth: 800,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: tokens.space.lg,
              right: tokens.space.lg,
              backgroundColor: tokens.colors.primary,
              color: "white",
              border: "none",
              borderRadius: tokens.radii.full,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div
            style={{
              padding: tokens.space.xxl,
              borderBottom: `1px solid ${tokens.colors.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: tokens.space.md,
                marginBottom: tokens.space.md,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: tokens.radii.md,
                  background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UserPlus size={28} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: tokens.space.xs }}>
                  Cadastro de Profissional
                </h2>
                <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
                  Faça parte da nossa rede de profissionais veganos
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: tokens.space.xxl }}>
            {/* Informações Básicas */}
            <div style={{ marginBottom: tokens.space.xxl }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Informações Básicas
              </h3>

              <div style={{ display: "grid", gap: tokens.space.lg }}>
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
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 14,
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                    placeholder="Ex: Dra. Ana Silva"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.lg }}>
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
                      Categoria *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                    >
                      <option value="">Selecione...</option>
                      {categories.filter((c) => c.id !== "todos").map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
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
                      Especialidade *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                      placeholder="Ex: Nutrição Clínica Vegana"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: tokens.space.lg }}>
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
                      Localização *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                      placeholder="São Paulo, SP"
                    />
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
                      Experiência *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                      placeholder="8 anos"
                    />
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
                      Preço *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                      placeholder="R$ 200-300"
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
                    Bio / Apresentação *
                  </label>
                  <textarea
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    style={{
                      width: "100%",
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 14,
                      fontFamily: "inherit",
                      outline: "none",
                      resize: "vertical",
                    }}
                    placeholder="Conte um pouco sobre você e sua atuação profissional..."
                  />
                </div>
              </div>
            </div>

            {/* Serviços */}
            <div style={{ marginBottom: tokens.space.xxl }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Serviços Oferecidos
              </h3>

              <div style={{ display: "grid", gap: tokens.space.md }}>
                {formData.services.map((service, index) => (
                  <input
                    key={index}
                    type="text"
                    value={service}
                    onChange={(e) => updateService(index, e.target.value)}
                    style={{
                      width: "100%",
                      padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                      border: `1px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 14,
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                    placeholder={`Serviço ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                type="button"
                onClick={addService}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: tokens.space.md,
                  padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
                  backgroundColor: tokens.colors.primaryLighter,
                  color: tokens.colors.primary,
                  border: `1px solid ${tokens.colors.primary}`,
                  borderRadius: tokens.radii.md,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.sm,
                }}
              >
                <Plus size={16} />
                Adicionar Serviço
              </motion.button>
            </div>

            {/* Contato */}
            <div style={{ marginBottom: tokens.space.xxl }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Informações de Contato
              </h3>

              <div style={{ display: "grid", gap: tokens.space.lg }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.lg }}>
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
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                      placeholder="(11) 98765-4321"
                    />
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
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                      placeholder="seuemail@exemplo.com"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.lg }}>
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
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                      placeholder="@seuperfil"
                    />
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
                      Website
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      style={{
                        width: "100%",
                        padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 14,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                      placeholder="www.seusite.com.br"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Foto e Portfólio */}
            <div style={{ marginBottom: tokens.space.xxl }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Imagens
              </h3>

              <div style={{ display: "grid", gap: tokens.space.lg }}>
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
                    Foto de Perfil *
                  </label>
                  <div
                    style={{
                      border: `2px dashed ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      padding: tokens.space.xl,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Upload size={32} color={tokens.colors.textMuted} style={{ marginBottom: tokens.space.md }} />
                    <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
                      Clique para fazer upload da sua foto
                    </p>
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
                    Portfólio (opcional)
                  </label>
                  <div
                    style={{
                      border: `2px dashed ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      padding: tokens.space.xl,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Upload size={32} color={tokens.colors.textMuted} style={{ marginBottom: tokens.space.md }} />
                    <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
                      Adicione fotos do seu trabalho (até 6 imagens)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: `${tokens.space.lg}px`,
                background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                color: "white",
                border: "none",
                borderRadius: tokens.radii.md,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: tokens.space.md,
                boxShadow: `0 4px 12px ${tokens.colors.primary}40`,
              }}
            >
              <Check size={20} />
              Enviar Cadastro
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Main Component
export default function ProfessionalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const filteredProfessionals =
    selectedCategory === "todos"
      ? professionalsData
      : professionalsData.filter((p) => p.category === selectedCategory);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: tokens.colors.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <Navbar onOpenRegister={() => setShowRegister(true)} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Professionals Grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: `${tokens.space.xxl}px ${tokens.space.xl}px`,
        }}
      >
        <div style={{ marginBottom: tokens.space.xl }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: tokens.colors.text,
              marginBottom: tokens.space.sm,
            }}
          >
            {filteredProfessionals.length} profissionais
          </h2>
          <p style={{ fontSize: 16, color: tokens.colors.textMuted }}>
            {selectedCategory === "todos"
              ? "Mostrando todos os profissionais veganos"
              : `Categoria: ${categories.find((c) => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: tokens.space.xl,
          }}
        >
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              onOpenModal={setSelectedProfessional}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProfessional && (
        <ProfessionalModal
          professional={selectedProfessional}
          onClose={() => setSelectedProfessional(null)}
        />
      )}

      {/* Register Modal */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

      {/* Global Styles */}
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
        }

        button {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
