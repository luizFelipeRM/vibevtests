"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Search,
  MapPin,
  Calendar,
  MessageCircle,
  Users,
  X,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  PartyPopper,
  Home,
  Stethoscope,
  AlertCircle,
  DollarSign,
  Car,
  Shield,
  PawPrint,
  ChevronRight,
  User,
  Bell,
  Send,
  Image,
  ThumbsUp,
  Share2,
} from "lucide-react";

// Tokens de Design
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

// Configuração dos tipos de casos
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

// Dados mockados de casos
const mockCases = [
  {
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
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    comments: 12,
    followers: 45,
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), text: "Caso criado - Rex foi resgatado das ruas", author: "Maria Silva" },
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), text: "Rex passou por consulta veterinária. Está saudável!", author: "Dra. Paula" },
      { date: new Date(Date.now() - 12 * 60 * 60 * 1000), text: "Procurando lar temporário urgente!", author: "Maria Silva" },
    ],
    userComments: [
      { author: "João Pedro", text: "Que lindo! Compartilhei com amigos.", date: new Date(Date.now() - 5 * 60 * 60 * 1000) },
      { author: "Ana Clara", text: "Posso ajudar com ração!", date: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 2,
    animalName: "Mimi",
    animalType: "Gato",
    type: "adocao",
    location: "Jardim Paulista, São Paulo - SP",
    story: "Mimi foi resgatada há 3 meses de uma situação de abandono. Passou por todos os tratamentos e agora está pronta para um lar definitivo!",
    description: "Gatinha super carinhosa, adora colo e brincadeiras. Já está vacinada, castrada e vermifugada.",
    urgency: "baixa",
    status: "novo",
    responsible: "João Santos",
    contact: "(11) 91234-5678",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    comments: 8,
    followers: 23,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), text: "Mimi disponível para adoção!", author: "João Santos" },
      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), text: "Mimi adora brincar com outros gatos!", author: "João Santos" },
    ],
    userComments: [
      { author: "Mariana", text: "Ela é perfeita! Gostaria de conhecê-la.", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 3,
    animalName: "Totó",
    animalType: "Cachorro",
    type: "perdido",
    location: "Vila Mariana, São Paulo - SP",
    story: "Totó fugiu durante os fogos de artifício no ano novo. A família está desesperada procurando por ele.",
    description: "Cachorro pequeno, da raça Poodle, cor branca, usa coleira azul com plaquinha. Atende pelo nome Totó.",
    urgency: "alta",
    status: "em-andamento",
    responsible: "Família Oliveira",
    contact: "(11) 99876-5432",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    comments: 15,
    followers: 67,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), text: "Totó fugiu durante fogos de artifício", author: "Família Oliveira" },
      { date: new Date(Date.now() - 12 * 60 * 60 * 1000), text: "Cartazes espalhados pela região", author: "Família Oliveira" },
      { date: new Date(Date.now() - 4 * 60 * 60 * 1000), text: "Possível avistamento na Praça da Vila Mariana", author: "Vizinho" },
    ],
    userComments: [
      { author: "Carlos", text: "Vi um cachorro parecido perto do mercado!", date: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 4,
    animalName: "Thor",
    animalType: "Cachorro",
    type: "finais-felizes",
    location: "Santo Amaro, São Paulo - SP",
    story: "Thor estava preso com corrente curta há anos no quintal de uma casa abandonada. Vizinhos denunciaram e conseguimos resgatá-lo!",
    description: "Cachorro de grande porte, desnutrido mas muito dócil. Em recuperação e precisa de um lar amoroso.",
    urgency: "baixa",
    status: "final-feliz",
    responsible: "ONG Amor Animal",
    contact: "(11) 92222-1111",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    comments: 42,
    followers: 156,
    happyEnding: "Thor foi adotado por uma família maravilhosa que tem um sítio! Agora ele corre livre, recebe todo amor do mundo e está irreconhecível de tão saudável e feliz!",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), text: "Thor resgatado!", author: "ONG Amor Animal" },
      { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), text: "Tratamento veterinário iniciado", author: "ONG Amor Animal" },
      { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), text: "Thor foi adotado! Final feliz! 🎉", author: "ONG Amor Animal" },
    ],
    userComments: [],
  },
  {
    id: 5,
    animalName: "Luna",
    animalType: "Gato",
    type: "veterinario",
    location: "Mooca, São Paulo - SP",
    story: "Luna foi atropelada e está com a patinha fraturada. A tutora não tem condições de pagar o tratamento completo.",
    description: "Gatinha de 3 anos precisa de cirurgia na pata traseira. Orçamento: R$ 1.200,00",
    urgency: "alta",
    status: "em-andamento",
    responsible: "Ana Costa",
    contact: "(11) 98888-7777",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    comments: 18,
    followers: 89,
    image: "https://images.unsplash.com/photo-1573865526739-10c1de0a6f39?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), text: "Luna precisa de cirurgia urgente", author: "Ana Costa" },
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), text: "Orçamento da clínica: R$ 1.200", author: "Ana Costa" },
    ],
    userComments: [
      { author: "Pedro", text: "Vou compartilhar para ajudar!", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 6,
    animalName: "Mel",
    animalType: "Gato",
    type: "doacao",
    location: "Lapa, São Paulo - SP",
    story: "Mel precisa de uma cirurgia de emergência e estamos arrecadando fundos para custear o procedimento.",
    description: "Gatinha de 5 anos diagnosticada com problema renal. Precisa de cirurgia urgente.",
    urgency: "critica",
    status: "em-andamento",
    responsible: "Carla Mendes",
    contact: "(11) 96666-5555",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    comments: 34,
    followers: 120,
    donationGoal: 2500,
    donationCurrent: 850,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), text: "Campanha iniciada para cirurgia da Mel", author: "Carla Mendes" },
      { date: new Date(Date.now() - 12 * 60 * 60 * 1000), text: "Já arrecadamos R$ 850! Obrigada a todos!", author: "Carla Mendes" },
    ],
    userComments: [
      { author: "Julia", text: "Acabei de doar R$ 100! Força Mel!", date: new Date(Date.now() - 6 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 7,
    animalName: "Bob",
    animalType: "Cachorro",
    type: "lar-temporario",
    location: "Pinheiros, São Paulo - SP",
    story: "Bob foi resgatado das ruas e precisa de um lar temporário enquanto aguarda adoção definitiva.",
    description: "Cachorro dócil, de porte grande, precisa de espaço para correr. Lar temporário por 2-3 meses.",
    urgency: "alta",
    status: "novo",
    responsible: "ONG Patinhas Felizes",
    contact: "(11) 97777-6666",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    comments: 9,
    followers: 34,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), text: "Bob resgatado e precisa de lar temporário", author: "ONG Patinhas Felizes" },
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), text: "Bob é super carinhoso e brincalhão!", author: "ONG Patinhas Felizes" },
    ],
    userComments: [
      { author: "Ricardo", text: "Tenho quintal, posso ajudar!", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 8,
    animalName: "Buddy",
    animalType: "Cachorro",
    type: "transporte",
    location: "De Guarulhos para Campinas",
    story: "Buddy foi adotado por uma família em Campinas mas precisa de transporte de Guarulhos até lá.",
    description: "Cachorro de porte médio, precisa de transporte seguro para sua nova casa. Viagem de 100km.",
    urgency: "media",
    status: "novo",
    responsible: "Pedro Almeida",
    contact: "(11) 95555-4444",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    comments: 6,
    followers: 18,
    image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), text: "Buddy foi adotado! Precisa de transporte", author: "Pedro Almeida" },
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), text: "Viagem programada para o dia 15/01", author: "Pedro Almeida" },
    ],
    userComments: [
      { author: "Camila", text: "Conheço um serviço de transporte pet!", date: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 9,
    animalName: "Animais em situação crítica",
    animalType: "Vários",
    type: "denuncia",
    location: "Zona Leste, São Paulo - SP",
    story: "Vários animais foram encontrados em condições deploráveis em um terreno abandonado.",
    description: "Denúncia de maus-tratos. Aproximadamente 10 animais sem água, comida e em péssimo estado de saúde.",
    urgency: "critica",
    status: "em-andamento",
    responsible: "Denúncia Anônima",
    contact: "190 (Polícia)",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    comments: 28,
    followers: 95,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop",
    updates: [
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), text: "Denúncia registrada na polícia", author: "Denúncia Anônima" },
      { date: new Date(Date.now() - 12 * 60 * 60 * 1000), text: "Autoridades foram ao local e confirmaram a situação", author: "Policial" },
      { date: new Date(Date.now() - 4 * 60 * 60 * 1000), text: "Resgate em andamento com ONG local", author: "ONG Vida Animal" },
    ],
    userComments: [
      { author: "Fernanda", text: "Isso é absurdo! Como ajudar?", date: new Date(Date.now() - 8 * 60 * 60 * 1000) },
      { author: "Roberto", text: "Compartilhando para dar visibilidade!", date: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    ],
  },
];

// Header Component
function Header({ onOpenNewCase, selectedCategory, setSelectedCategory }) {
  return (
    <header
      style={{
        background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
        color: "white",
        padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: tokens.space.lg,
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
                width: 56,
                height: 56,
                borderRadius: tokens.radii.lg,
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Heart size={32} fill="white" color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Salva-Vidas</h1>
              <p style={{ fontSize: 12, margin: 0, opacity: 0.9 }}>
                Salvando vidas, criando finais felizes
              </p>
            </div>
          </motion.div>

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
                placeholder="Buscar casos, cidades ou tipo de ajuda..."
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
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
              }}
            >
              <Bell size={20} color="white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
              }}
            >
              <User size={20} color="white" />
            </motion.button>

            <motion.button
              onClick={onOpenNewCase}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                borderRadius: tokens.radii.full,
                background: "white",
                color: tokens.colors.primary,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: tokens.space.sm,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <Plus size={18} strokeWidth={3} />
              Novo Caso
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: tokens.space.sm,
            overflowX: "auto",
            paddingBottom: tokens.space.sm,
          }}
        >
          <motion.button
            onClick={() => setSelectedCategory("todos")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
              borderRadius: tokens.radii.full,
              background: selectedCategory === "todos" ? "white" : "rgba(255,255,255,0.1)",
              color: selectedCategory === "todos" ? tokens.colors.primary : "white",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: selectedCategory === "todos" ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
            }}
          >
            🏠 Início
          </motion.button>

          {caseTypes.map((type) => {
            const Icon = type.icon;
            return (
              <motion.button
                key={type.id}
                onClick={() => setSelectedCategory(type.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
                  borderRadius: tokens.radii.full,
                  background: selectedCategory === type.id ? "white" : "rgba(255,255,255,0.1)",
                  color: selectedCategory === type.id ? tokens.colors.primary : "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.xs,
                  boxShadow: selectedCategory === type.id ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
                }}
              >
                <Icon size={14} strokeWidth={2.5} />
                {type.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

// Case Card Component
function CaseCard({ caseData, onClick }) {
  const typeConfig = caseTypes.find((t) => t.id === caseData.type);
  const Icon = typeConfig?.icon || PawPrint;

  const getUrgencyBadge = () => {
    if (caseData.urgency === "critica") {
      return (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: "absolute",
            top: tokens.space.md,
            left: tokens.space.md,
            background: tokens.colors.red,
            color: "white",
            padding: `${tokens.space.xs}px ${tokens.space.md}px`,
            borderRadius: tokens.radii.full,
            fontSize: 11,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: tokens.space.xs,
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.5)",
          }}
        >
          <AlertCircle size={12} />
          URGENTE
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        backgroundColor: "white",
        borderRadius: tokens.radii.xl,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: `1px solid ${tokens.colors.border}`,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img
          src={caseData.image}
          alt={caseData.animalName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {getUrgencyBadge()}
        <div
          style={{
            position: "absolute",
            top: tokens.space.md,
            right: tokens.space.md,
            background: "white",
            padding: `${tokens.space.xs}px ${tokens.space.md}px`,
            borderRadius: tokens.radii.full,
            fontSize: 11,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: tokens.space.xs,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <Icon size={12} color={typeConfig?.color} strokeWidth={2.5} />
          {typeConfig?.name}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: tokens.space.lg }}>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: tokens.colors.text,
            marginBottom: tokens.space.sm,
          }}
        >
          {caseData.animalName}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.xs,
            fontSize: 13,
            color: tokens.colors.textMuted,
            marginBottom: tokens.space.md,
          }}
        >
          <MapPin size={14} />
          {caseData.location}
        </div>

        <p
          style={{
            fontSize: 14,
            color: tokens.colors.textMuted,
            lineHeight: 1.6,
            marginBottom: tokens.space.lg,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {caseData.description}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: tokens.space.md,
            borderTop: `1px solid ${tokens.colors.border}`,
            fontSize: 12,
            color: tokens.colors.textMuted,
          }}
        >
          <div style={{ display: "flex", gap: tokens.space.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xs }}>
              <MessageCircle size={14} />
              {caseData.comments}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xs }}>
              <Heart size={14} />
              {caseData.followers}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xs }}>
            <Calendar size={14} />
            {new Date(caseData.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Happy Ending Card
function HappyCard({ caseData, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      style={{
        background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
        borderRadius: tokens.radii.xl,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(234, 179, 8, 0.3)",
        cursor: "pointer",
        border: "3px solid #fbbf24",
      }}
    >
      <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
        <img
          src={caseData.image}
          alt={caseData.animalName}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: tokens.space.lg,
            right: tokens.space.lg,
            background: "white",
            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
            borderRadius: tokens.radii.full,
            fontSize: 14,
            fontWeight: 700,
            color: tokens.colors.green,
            display: "flex",
            alignItems: "center",
            gap: tokens.space.sm,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <PartyPopper size={20} />
          Final Feliz!
        </div>
      </div>

      <div style={{ padding: tokens.space.xl, background: "white" }}>
        <h3
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: tokens.colors.text,
            marginBottom: tokens.space.md,
          }}
        >
          {caseData.animalName}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: tokens.colors.text,
            lineHeight: 1.7,
            marginBottom: tokens.space.lg,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {caseData.happyEnding}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.sm,
            fontSize: 14,
            color: tokens.colors.primary,
            fontWeight: 600,
          }}
        >
          <Heart size={16} fill={tokens.colors.primary} />
          {caseData.followers} pessoas acompanharam
        </div>
      </div>
    </motion.div>
  );
}

// Case Detail Modal
function CaseDetailModal({ caseData, onClose }: { caseData: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("detalhes");
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!caseData) return null;

  const typeConfig = caseTypes.find((t) => t.id === caseData.type);
  const Icon = typeConfig?.icon || PawPrint;

  // Ações específicas por tipo de caso
  const getActions = () => {
    switch (caseData.type) {
      case "resgate":
        return [
          { label: "Oferecer Abrigo", icon: Home, primary: true },
          { label: "Doar Ração/Suprimentos", icon: DollarSign, primary: false },
        ];
      case "adocao":
        return [
          { label: "Quero Adotar", icon: Heart, primary: true },
          { label: "Agendar Visita", icon: Calendar, primary: false },
        ];
      case "perdido":
        return [
          { label: "Eu Vi Este Animal!", icon: AlertCircle, primary: true },
          { label: "Ajudar na Busca", icon: Users, primary: false },
        ];
      case "veterinario":
        return [
          { label: "Doar para Tratamento", icon: DollarSign, primary: true },
          { label: "Indicar Clínica", icon: Stethoscope, primary: false },
        ];
      case "lar-temporario":
        return [
          { label: "Oferecer Lar Temporário", icon: Home, primary: true },
          { label: "Compartilhar Caso", icon: Users, primary: false },
        ];
      case "doacao":
        return [
          { label: "Fazer Doação", icon: DollarSign, primary: true },
          { label: "Compartilhar Campanha", icon: Users, primary: false },
        ];
      case "transporte":
        return [
          { label: "Oferecer Transporte", icon: Car, primary: true },
          { label: "Indicar Serviço", icon: MapPin, primary: false },
        ];
      case "denuncia":
        return [
          { label: "Apoiar Denúncia", icon: Shield, primary: true },
          { label: "Contatar Autoridades", icon: AlertTriangle, primary: false },
        ];
      default:
        return [
          { label: "Entrar em Contato", icon: MessageCircle, primary: true },
        ];
    }
  };

  const actions = getActions();

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
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: tokens.space.xl,
          overflowY: "auto",
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            borderRadius: tokens.radii.xl,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            display: "flex",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: tokens.space.lg,
              right: tokens.space.lg,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              border: "none",
              borderRadius: tokens.radii.full,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.8)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
          >
            <X size={20} color="white" />
          </button>

          {/* Sidebar */}
          <div
            style={{
              width: 380,
              background: tokens.colors.bg,
              borderRight: `1px solid ${tokens.colors.border}`,
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
            }}
          >
            {/* Animal Image */}
            <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
              <img
                src={caseData.image}
                alt={caseData.animalName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: tokens.space.lg,
                  left: tokens.space.lg,
                  right: tokens.space.lg,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: tokens.radii.md,
                    padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                    display: "flex",
                    alignItems: "center",
                    gap: tokens.space.sm,
                    fontSize: 13,
                    fontWeight: 700,
                    color: typeConfig?.color,
                  }}
                >
                  <Icon size={16} strokeWidth={2.5} />
                  {typeConfig?.name}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div style={{ padding: tokens.space.xl, flex: 1, overflow: "auto" }}>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: tokens.colors.text,
                  marginBottom: tokens.space.sm,
                  lineHeight: 1.2,
                }}
              >
                {caseData.animalName}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.xs,
                  fontSize: 14,
                  color: tokens.colors.textMuted,
                  marginBottom: tokens.space.xl,
                }}
              >
                <MapPin size={16} />
                {caseData.location}
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: tokens.space.md,
                  marginBottom: tokens.space.xl,
                }}
              >
                <div
                  style={{
                    background: "white",
                    padding: tokens.space.md,
                    borderRadius: tokens.radii.md,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.primary }}>
                    {caseData.followers}
                  </div>
                  <div style={{ fontSize: 11, color: tokens.colors.textMuted, marginTop: tokens.space.xs }}>
                    Seguidores
                  </div>
                </div>
                <div
                  style={{
                    background: "white",
                    padding: tokens.space.md,
                    borderRadius: tokens.radii.md,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.blue }}>
                    {caseData.comments}
                  </div>
                  <div style={{ fontSize: 11, color: tokens.colors.textMuted, marginTop: tokens.space.xs }}>
                    Comentários
                  </div>
                </div>
                <div
                  style={{
                    background: "white",
                    padding: tokens.space.md,
                    borderRadius: tokens.radii.md,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.orange }}>
                    {Math.ceil((Date.now() - caseData.createdAt.getTime()) / (1000 * 60 * 60 * 24))}d
                  </div>
                  <div style={{ fontSize: 11, color: tokens.colors.textMuted, marginTop: tokens.space.xs }}>
                    Aberto
                  </div>
                </div>
              </div>

              {/* Donation Progress (if applicable) */}
              {caseData.donationGoal && (
                <div
                  style={{
                    background: "white",
                    padding: tokens.space.lg,
                    borderRadius: tokens.radii.md,
                    marginBottom: tokens.space.xl,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
                    Meta de Arrecadação
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: tokens.space.sm,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: tokens.colors.primary }}>R$ {caseData.donationCurrent}</span>
                    <span style={{ color: tokens.colors.textMuted }}>R$ {caseData.donationGoal}</span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: "#e5e7eb",
                      borderRadius: tokens.radii.full,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(caseData.donationCurrent / caseData.donationGoal) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        background: `linear-gradient(90deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                        borderRadius: tokens.radii.full,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: tokens.colors.textMuted, marginTop: tokens.space.sm }}>
                    {Math.round((caseData.donationCurrent / caseData.donationGoal) * 100)}% arrecadado
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div
                style={{
                  background: "white",
                  padding: tokens.space.lg,
                  borderRadius: tokens.radii.md,
                  marginBottom: tokens.space.xl,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: tokens.space.md, color: tokens.colors.text }}>
                  Responsável
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.text, marginBottom: tokens.space.sm }}>
                  {caseData.responsible}
                </div>
                <div style={{ fontSize: 14, color: tokens.colors.primary, fontWeight: 600 }}>
                  {caseData.contact}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.md }}>
                {actions.map((action, index) => {
                  const ActionIcon = action.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setActiveAction(action.label);
                        setIsSubmitted(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: `${tokens.space.lg}px ${tokens.space.xl}px`,
                        background: action.primary
                          ? `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`
                          : "white",
                        color: action.primary ? "white" : tokens.colors.primary,
                        border: action.primary ? "none" : `2px solid ${tokens.colors.primary}`,
                        borderRadius: tokens.radii.md,
                        fontSize: 16,
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: tokens.space.md,
                        boxShadow: action.primary ? `0 4px 12px ${tokens.colors.primary}40` : "none",
                      }}
                    >
                      <ActionIcon size={20} strokeWidth={2.5} />
                      {action.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {activeAction ? (
              /* Action View */
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "white" }}>
                <div style={{ padding: `${tokens.space.lg}px ${tokens.space.xl}px`, borderBottom: `1px solid ${tokens.colors.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text }}>{activeAction}</h3>
                  <button
                    onClick={() => setActiveAction(null)}
                    style={{ background: tokens.colors.bg, border: `1px solid ${tokens.colors.border}`, color: tokens.colors.text, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700 }}
                  >
                    ← Voltar
                  </button>
                </div>

                <div style={{ flex: 1, overflow: "auto", padding: tokens.space.xxl }}>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: "center", padding: tokens.space.xxl }}
                    >
                      <div style={{ width: 80, height: 80, borderRadius: "50%", background: tokens.colors.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <CheckCircle size={48} color={tokens.colors.primary} />
                      </div>
                      <h2 style={{ fontSize: 28, fontWeight: 800, color: tokens.colors.text, marginBottom: 16 }}>Solicitação Enviada!</h2>
                      <p style={{ fontSize: 18, color: tokens.colors.text, lineHeight: 1.6, marginBottom: 32, fontWeight: 500 }}>
                        Sua mensagem foi enviada para o responsável. Você receberá uma notificação assim que houver um retorno.
                      </p>
                      <button
                        onClick={() => setActiveAction(null)}
                        style={{ padding: `${tokens.space.md}px ${tokens.space.xl}px`, background: tokens.colors.primary, color: "white", border: "none", borderRadius: tokens.radii.md, fontWeight: 700, cursor: "pointer" }}
                      >
                        Concluído
                      </button>
                    </motion.div>
                  ) : (
                    <div style={{ maxWidth: 500, margin: "0 auto" }}>
                      {/* Dynamic Form based on activeAction */}
                      {(activeAction.includes("Adotar") || activeAction.includes("Temporário") || activeAction.includes("Abrigo")) && (
                        <div style={{ display: "grid", gap: tokens.space.lg }}>
                          <p style={{ color: tokens.colors.text, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Preencha as informações básicas para que o responsável entre em contato.</p>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Seu Nome</label>
                            <input type="text" style={{ width: "100%", padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} placeholder="Digite seu nome" />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>WhatsApp/Telefone</label>
                            <input type="text" style={{ width: "100%", padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} placeholder="(00) 00000-0000" />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Possui outros animais?</label>
                            <select style={{ width: "100%", padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }}>
                              <option>Não</option>
                              <option>Sim, cachorro(s)</option>
                              <option>Sim, gato(s)</option>
                              <option>Sim, outros</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Mensagem (Opcional)</label>
                            <textarea style={{ width: "100%", minHeight: 100, padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} placeholder="Conte um pouco por que você quer ajudar..." />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsSubmitted(true)}
                            style={{ padding: tokens.space.lg, background: tokens.colors.primary, color: "white", border: "none", borderRadius: tokens.radii.md, fontWeight: 700, cursor: "pointer", marginTop: 16 }}
                          >
                            Enviar Solicitação
                          </motion.button>
                        </div>
                      )}

                      {(activeAction.includes("Doar") || activeAction.includes("Doação")) && (
                        <div style={{ textAlign: "center" }}>
                          <div style={{ background: tokens.colors.primaryLighter, padding: tokens.space.xl, borderRadius: tokens.radii.lg, marginBottom: 24, border: `2px dashed ${tokens.colors.primary}40` }}>
                            <DollarSign size={40} color={tokens.colors.primary} style={{ marginBottom: 16 }} />
                            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Contribua via PIX</h4>
                            <p style={{ fontSize: 15, color: tokens.colors.text, marginBottom: 20, fontWeight: 500 }}>Toda ajuda é bem-vinda para o tratamento do animal.</p>
                            <div style={{ background: "white", padding: 16, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", border: `2px solid ${tokens.colors.primary}` }}>
                              <code style={{ fontSize: 16, fontWeight: 800, color: tokens.colors.primary }}>ajuda@guiavegano.org</code>
                              <button style={{ background: tokens.colors.primary, color: "white", border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Copiar</button>
                            </div>
                          </div>
                          <p style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 500 }}>Após realizar a doação, envie o comprovante para facilitar o acompanhamento do caso.</p>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsSubmitted(true)}
                            style={{ width: "100%", padding: tokens.space.lg, background: tokens.colors.primary, color: "white", border: "none", borderRadius: tokens.radii.md, fontWeight: 700, cursor: "pointer", marginTop: 24 }}
                          >
                            Já realizei a doação
                          </motion.button>
                        </div>
                      )}

                      {(activeAction.includes("Vi Este") || activeAction.includes("Visto")) && (
                        <div style={{ display: "grid", gap: tokens.space.lg }}>
                          <p style={{ color: tokens.colors.text, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Se você viu este animal, por favor nos ajude com o máximo de detalhes possível.</p>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Onde viu?</label>
                            <input type="text" style={{ width: "100%", padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} placeholder="Ex: Av. Paulista, altura do número 1000" />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Quando viu?</label>
                            <input type="datetime-local" style={{ width: "100%", padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Detalhes do avistamento</label>
                            <textarea style={{ width: "100%", minHeight: 100, padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} placeholder="Como o animal estava? Em que direção seguiu? Estava acompanhado?" />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsSubmitted(true)}
                            style={{ padding: tokens.space.lg, background: tokens.colors.red, color: "white", border: "none", borderRadius: tokens.radii.md, fontWeight: 700, cursor: "pointer", marginTop: 16 }}
                          >
                            Informar Avistamento
                          </motion.button>
                        </div>
                      )}

                      {/* Default Form for other actions */}
                      {!activeAction.includes("Adotar") && !activeAction.includes("Temporário") && !activeAction.includes("Abrigo") && !activeAction.includes("Doar") && !activeAction.includes("Doação") && !activeAction.includes("Vi Este") && !activeAction.includes("Visto") && (
                        <div style={{ display: "grid", gap: tokens.space.lg }}>
                          <p style={{ color: tokens.colors.text, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Deixe seus dados e uma mensagem para entrar em contato com o responsável.</p>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Seu Nome</label>
                            <input type="text" style={{ width: "100%", padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} placeholder="Digite seu nome" />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>WhatsApp/Telefone</label>
                            <input type="text" style={{ width: "100%", padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} placeholder="(00) 00000-0000" />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 8, color: tokens.colors.text }}>Sua Mensagem</label>
                            <textarea style={{ width: "100%", minHeight: 150, padding: tokens.space.md, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.sm, fontSize: 15, color: tokens.colors.text, outline: "none" }} placeholder="Escreva aqui como você pode ajudar..." />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsSubmitted(true)}
                            style={{ padding: tokens.space.lg, background: tokens.colors.primary, color: "white", border: "none", borderRadius: tokens.radii.md, fontWeight: 700, cursor: "pointer", marginTop: 16 }}
                          >
                            Enviar Mensagem
                          </motion.button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Regular Tabs View */
              <>
                {/* Tabs */}
                <div
                  style={{
                    borderBottom: `1px solid ${tokens.colors.border}`,
                    padding: `0 ${tokens.space.xl}px`,
                    display: "flex",
                    gap: tokens.space.lg,
                    background: "white",
                    overflowX: "auto",
                  }}
                >
                  {[
                    { id: "detalhes", label: "Detalhes", icon: null },
                    { id: "timeline", label: "Timeline", icon: null },
                    { id: "chat", label: "Chat Grupo", icon: MessageCircle },
                    { id: "feed", label: "Publicações", icon: Image },
                    { id: "comentarios", label: "Comentários", icon: null },
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          padding: `${tokens.space.lg}px 0`,
                          background: "none",
                          border: "none",
                          borderBottom: activeTab === tab.id ? `3px solid ${tokens.colors.primary}` : "3px solid transparent",
                          color: activeTab === tab.id ? tokens.colors.primary : tokens.colors.textMuted,
                          fontSize: 15,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          whiteSpace: "nowrap",
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.space.xs,
                        }}
                      >
                        {TabIcon && <TabIcon size={16} />}
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div style={{ flex: 1, overflow: "auto", padding: tokens.space.xxl }}>
                  <AnimatePresence mode="wait">
                    {activeTab === "detalhes" && (
                      <motion.div
                        key="detalhes"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Happy Ending Banner */}
                        {caseData.happyEnding && (
                          <div
                            style={{
                              background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                              padding: tokens.space.xxl,
                              borderRadius: tokens.radii.lg,
                              border: "3px solid #fbbf24",
                              marginBottom: tokens.space.xxl,
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.lg }}>
                              <div
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: tokens.radii.md,
                                  background: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <PartyPopper size={24} color={tokens.colors.green} />
                              </div>
                              <h3 style={{ fontSize: 22, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>
                                Final Feliz!
                              </h3>
                            </div>
                            <p style={{ fontSize: 16, lineHeight: 1.7, color: tokens.colors.text, margin: 0 }}>
                              {caseData.happyEnding}
                            </p>
                          </div>
                        )}

                        {/* Story */}
                        <div style={{ marginBottom: tokens.space.xxl }}>
                          <h3
                            style={{
                              fontSize: 18,
                              fontWeight: 700,
                              marginBottom: tokens.space.lg,
                              color: tokens.colors.text,
                              display: "flex",
                              alignItems: "center",
                              gap: tokens.space.sm,
                            }}
                          >
                            📖 Como Começou
                          </h3>
                          <p style={{ fontSize: 15, lineHeight: 1.8, color: tokens.colors.textMuted, margin: 0 }}>
                            {caseData.story}
                          </p>
                        </div>

                        {/* Description */}
                        <div>
                          <h3
                            style={{
                              fontSize: 18,
                              fontWeight: 700,
                              marginBottom: tokens.space.lg,
                              color: tokens.colors.text,
                              display: "flex",
                              alignItems: "center",
                              gap: tokens.space.sm,
                            }}
                          >
                            ℹ️ Informações Detalhadas
                          </h3>
                          <p style={{ fontSize: 15, lineHeight: 1.8, color: tokens.colors.textMuted, margin: 0 }}>
                            {caseData.description}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "timeline" && (
                      <motion.div
                        key="timeline"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: tokens.space.xl,
                            color: tokens.colors.text,
                          }}
                        >
                          📅 Linha do Tempo
                        </h3>

                        <div style={{ position: "relative", paddingLeft: tokens.space.xl }}>
                          {/* Timeline Line */}
                          <div
                            style={{
                              position: "absolute",
                              left: 15,
                              top: 24,
                              bottom: 0,
                              width: 3,
                              background: `linear-gradient(to bottom, ${tokens.colors.primary}, ${tokens.colors.border})`,
                            }}
                          />

                          {/* Timeline Items */}
                          {caseData.updates?.map((update, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              style={{
                                position: "relative",
                                marginBottom: tokens.space.xl,
                              }}
                            >
                              {/* Timeline Dot */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: -29,
                                  top: 8,
                                  width: 12,
                                  height: 12,
                                  borderRadius: "50%",
                                  background: tokens.colors.primary,
                                  border: "3px solid white",
                                  boxShadow: "0 2px 8px rgba(4, 128, 3, 0.3)",
                                }}
                              />

                              <div
                                style={{
                                  background: "white",
                                  padding: tokens.space.lg,
                                  borderRadius: tokens.radii.md,
                                  border: `1px solid ${tokens.colors.border}`,
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: tokens.colors.textMuted,
                                    marginBottom: tokens.space.sm,
                                  }}
                                >
                                  {new Date(update.date).toLocaleString("pt-BR")}
                                </div>
                                <div style={{ fontSize: 15, color: tokens.colors.text, marginBottom: tokens.space.xs }}>
                                  {update.text}
                                </div>
                                <div style={{ fontSize: 13, color: tokens.colors.primary, fontWeight: 600 }}>
                                  Por {update.author}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "comentarios" && (
                      <motion.div
                        key="comentarios"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: tokens.space.xl,
                            color: tokens.colors.text,
                          }}
                        >
                          💬 Comentários ({caseData.userComments?.length || 0})
                        </h3>

                        {/* New Comment Form */}
                        <div
                          style={{
                            background: tokens.colors.bg,
                            padding: tokens.space.lg,
                            borderRadius: tokens.radii.md,
                            marginBottom: tokens.space.xl,
                          }}
                        >
                          <textarea
                            placeholder="Deixe seu comentário..."
                            style={{
                              width: "100%",
                              minHeight: 80,
                              padding: tokens.space.md,
                              border: `1px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.sm,
                              fontSize: 14,
                              fontFamily: "inherit",
                              resize: "vertical",
                              outline: "none",
                            }}
                          />
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              marginTop: tokens.space.md,
                              padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                              color: "white",
                              border: "none",
                              borderRadius: tokens.radii.md,
                              fontSize: 14,
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            Comentar
                          </motion.button>
                        </div>

                        {/* Comments List */}
                        <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                          {caseData.userComments?.map((comment, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              style={{
                                background: "white",
                                padding: tokens.space.lg,
                                borderRadius: tokens.radii.md,
                                border: `1px solid ${tokens.colors.border}`,
                                borderLeft: `4px solid ${tokens.colors.primary}`,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: tokens.space.sm,
                                }}
                              >
                                <div style={{ fontSize: 14, fontWeight: 700, color: tokens.colors.text }}>
                                  {comment.author}
                                </div>
                                <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                                  {new Date(comment.date).toLocaleString("pt-BR")}
                                </div>
                              </div>
                              <div style={{ fontSize: 14, color: tokens.colors.textMuted, lineHeight: 1.6 }}>
                                {comment.text}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "chat" && (
                      <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "calc(90vh - 300px)" }}
                      >
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: tokens.space.xl,
                            color: tokens.colors.text,
                          }}
                        >
                          💬 Chat do Grupo
                        </h3>

                        {/* Chat Messages */}
                        <div
                          style={{
                            flex: 1,
                            overflow: "auto",
                            background: tokens.colors.bg,
                            borderRadius: tokens.radii.md,
                            padding: tokens.space.lg,
                            marginBottom: tokens.space.lg,
                            display: "flex",
                            flexDirection: "column",
                            gap: tokens.space.md,
                          }}
                        >
                          {/* Mock chat messages */}
                          {[
                            { author: "Maria Silva", message: "Oi pessoal! Atualizações sobre o Rex: ele está se adaptando muito bem!", time: "10:30", isOwn: false },
                            { author: "João Pedro", message: "Que ótima notícia! Conseguiu encontrar lar temporário?", time: "10:32", isOwn: false },
                            { author: "Você", message: "Ainda procurando, mas ele está bem cuidado por enquanto", time: "10:35", isOwn: true },
                            { author: "Ana Clara", message: "Posso ajudar! Tenho um quintal grande e experiência com cachorros", time: "10:37", isOwn: false },
                            { author: "Maria Silva", message: "Que maravilha Ana! Vou te chamar no privado para conversarmos melhor", time: "10:40", isOwn: false },
                          ].map((msg, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: msg.isOwn ? 20 : -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              style={{
                                display: "flex",
                                flexDirection: msg.isOwn ? "row-reverse" : "row",
                                gap: tokens.space.sm,
                                alignItems: "flex-end",
                              }}
                            >
                              {/* Avatar */}
                              {!msg.isOwn && (
                                <div
                                  style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: tokens.radii.full,
                                    background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    flexShrink: 0,
                                  }}
                                >
                                  {msg.author.charAt(0)}
                                </div>
                              )}

                              {/* Message Bubble */}
                              <div style={{ maxWidth: "70%" }}>
                                {!msg.isOwn && (
                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 600,
                                      color: tokens.colors.primary,
                                      marginBottom: tokens.space.xs,
                                      marginLeft: tokens.space.sm,
                                    }}
                                  >
                                    {msg.author}
                                  </div>
                                )}
                                <div
                                  style={{
                                    background: msg.isOwn ? tokens.colors.primary : "white",
                                    color: msg.isOwn ? "white" : tokens.colors.text,
                                    padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                                    borderRadius: tokens.radii.md,
                                    fontSize: 14,
                                    lineHeight: 1.5,
                                    boxShadow: msg.isOwn ? "0 2px 8px rgba(4, 128, 3, 0.2)" : "0 2px 8px rgba(0,0,0,0.08)",
                                    border: msg.isOwn ? "none" : `1px solid ${tokens.colors.border}`,
                                  }}
                                >
                                  {msg.message}
                                </div>
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: tokens.colors.textMuted,
                                    marginTop: tokens.space.xs,
                                    textAlign: msg.isOwn ? "right" : "left",
                                    marginLeft: msg.isOwn ? 0 : tokens.space.sm,
                                    marginRight: msg.isOwn ? tokens.space.sm : 0,
                                  }}
                                >
                                  {msg.time}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Message Input */}
                        <div
                          style={{
                            background: "white",
                            padding: tokens.space.lg,
                            borderRadius: tokens.radii.md,
                            border: `1px solid ${tokens.colors.border}`,
                            display: "flex",
                            gap: tokens.space.md,
                            alignItems: "flex-end",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Digite sua mensagem..."
                            style={{
                              flex: 1,
                              padding: tokens.space.md,
                              border: `1px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.sm,
                              fontSize: 14,
                              fontFamily: "inherit",
                              outline: "none",
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                              }
                            }}
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              padding: tokens.space.md,
                              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                              color: "white",
                              border: "none",
                              borderRadius: tokens.radii.sm,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 44,
                              height: 44,
                            }}
                          >
                            <Send size={18} />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "feed" && (
                      <motion.div
                        key="feed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: tokens.space.xl,
                            color: tokens.colors.text,
                          }}
                        >
                          📸 Feed de Publicações
                        </h3>

                        {/* New Post Creator */}
                        <div
                          style={{
                            background: "white",
                            padding: tokens.space.lg,
                            borderRadius: tokens.radii.md,
                            border: `1px solid ${tokens.colors.border}`,
                            marginBottom: tokens.space.xl,
                          }}
                        >
                          <textarea
                            placeholder="Compartilhe uma atualização, foto ou novidade sobre o caso..."
                            style={{
                              width: "100%",
                              minHeight: 80,
                              padding: tokens.space.md,
                              border: `1px solid ${tokens.colors.border}`,
                              borderRadius: tokens.radii.sm,
                              fontSize: 14,
                              fontFamily: "inherit",
                              resize: "vertical",
                              outline: "none",
                              marginBottom: tokens.space.md,
                            }}
                          />
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                padding: `${tokens.space.sm}px ${tokens.space.md}px`,
                                background: tokens.colors.bg,
                                color: tokens.colors.text,
                                border: `1px solid ${tokens.colors.border}`,
                                borderRadius: tokens.radii.sm,
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: tokens.space.xs,
                              }}
                            >
                              <Image size={16} />
                              Adicionar Foto
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              style={{
                                padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                                background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                                color: "white",
                                border: "none",
                                borderRadius: tokens.radii.md,
                                fontSize: 14,
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              Publicar
                            </motion.button>
                          </div>
                        </div>

                        {/* Feed Posts */}
                        <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
                          {/* Mock posts */}
                          {[
                            {
                              author: "Maria Silva",
                              time: "Há 2 horas",
                              content: "Pessoal, o Rex está cada dia mais feliz! Olhem como ele está brincando no quintal 🐕❤️",
                              image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
                              likes: 24,
                              comments: 5,
                            },
                            {
                              author: "Dr. Carlos Mendes",
                              time: "Há 5 horas",
                              content: "Fiz a consulta do Rex hoje. Ele está muito saudável e pronto para adoção! Quem puder ajudar a divulgar, agradeço muito.",
                              image: null,
                              likes: 18,
                              comments: 3,
                            },
                            {
                              author: "Ana Clara",
                              time: "Há 1 dia",
                              content: "Conseguimos arrecadar R$ 500 para os cuidados! Muito obrigada a todos que contribuíram 💚",
                              image: null,
                              likes: 42,
                              comments: 8,
                            },
                          ].map((post, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              style={{
                                background: "white",
                                padding: tokens.space.lg,
                                borderRadius: tokens.radii.md,
                                border: `1px solid ${tokens.colors.border}`,
                              }}
                            >
                              {/* Post Header */}
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
                                    width: 40,
                                    height: 40,
                                    borderRadius: tokens.radii.full,
                                    background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: 700,
                                  }}
                                >
                                  {post.author.charAt(0)}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: 14, fontWeight: 700, color: tokens.colors.text }}>
                                    {post.author}
                                  </div>
                                  <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                                    {post.time}
                                  </div>
                                </div>
                              </div>

                              {/* Post Content */}
                              <p style={{ fontSize: 14, color: tokens.colors.text, lineHeight: 1.6, marginBottom: post.image ? tokens.space.md : tokens.space.lg }}>
                                {post.content}
                              </p>

                              {/* Post Image */}
                              {post.image && (
                                <img
                                  src={post.image}
                                  alt="Post"
                                  style={{
                                    width: "100%",
                                    borderRadius: tokens.radii.md,
                                    marginBottom: tokens.space.lg,
                                  }}
                                />
                              )}

                              {/* Post Actions */}
                              <div
                                style={{
                                  display: "flex",
                                  gap: tokens.space.lg,
                                  paddingTop: tokens.space.md,
                                  borderTop: `1px solid ${tokens.colors.border}`,
                                }}
                              >
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: tokens.space.xs,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: tokens.colors.textMuted,
                                  }}
                                >
                                  <ThumbsUp size={16} />
                                  {post.likes}
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: tokens.space.xs,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: tokens.colors.textMuted,
                                  }}
                                >
                                  <MessageCircle size={16} />
                                  {post.comments}
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: tokens.space.xs,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: tokens.colors.textMuted,
                                  }}
                                >
                                  <Share2 size={16} />
                                  Compartilhar
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Main Component
export default function SalvaVidasPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  const filteredCases =
    selectedCategory === "todos"
      ? mockCases
      : mockCases.filter((c) => c.type === selectedCategory);

  const happyCases = mockCases.filter((c) => c.status === "final-feliz");
  const stats = {
    total: mockCases.length,
    emAndamento: mockCases.filter((c) => c.status === "em-andamento").length,
    finaisFelizes: happyCases.length,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.colors.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <Header
        onOpenNewCase={() => setShowNewCaseModal(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: `${tokens.space.xxl}px ${tokens.space.xl}px` }}>
        {/* Stats */}
        {selectedCategory === "todos" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: tokens.space.lg, marginBottom: tokens.space.xxl }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "white",
                borderRadius: tokens.radii.lg,
                padding: tokens.space.xl,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: `2px solid ${tokens.colors.border}`,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, color: tokens.colors.primary, marginBottom: tokens.space.xs }}>
                {stats.total}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.textMuted }}>Total de Casos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: "white",
                borderRadius: tokens.radii.lg,
                padding: tokens.space.xl,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: `2px solid ${tokens.colors.blue}20`,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, color: tokens.colors.blue, marginBottom: tokens.space.xs }}>
                {stats.emAndamento}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.textMuted }}>Em Andamento</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "white",
                borderRadius: tokens.radii.lg,
                padding: tokens.space.xl,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: `2px solid ${tokens.colors.green}20`,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, color: tokens.colors.green, marginBottom: tokens.space.xs }}>
                {stats.finaisFelizes}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.textMuted }}>🎉 Finais Felizes</div>
            </motion.div>
          </div>
        )}

        {/* Happy Endings Section */}
        {selectedCategory === "finais-felizes" && (
          <>
            <div style={{ textAlign: "center", marginBottom: tokens.space.xxl }}>
              <h2 style={{ fontSize: 40, fontWeight: 800, color: tokens.colors.primary, marginBottom: tokens.space.md }}>
                🎉 Histórias de Sucesso
              </h2>
              <p style={{ fontSize: 18, color: tokens.colors.textMuted }}>
                Celebre com a gente os finais felizes que mudaram vidas!
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))", gap: tokens.space.xl }}>
              {happyCases.map((caseData) => (
                <HappyCard key={caseData.id} caseData={caseData} onClick={() => setSelectedCase(caseData)} />
              ))}
            </div>
          </>
        )}

        {/* Regular Cases */}
        {selectedCategory !== "finais-felizes" && (
          <>
            <div style={{ marginBottom: tokens.space.xl }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.sm }}>
                {selectedCategory === "todos" ? "📋 Casos Recentes" : `${caseTypes.find((t) => t.id === selectedCategory)?.name}`}
              </h2>
              <p style={{ fontSize: 16, color: tokens.colors.textMuted }}>
                {filteredCases.length} caso(s) encontrado(s)
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: tokens.space.xl }}>
              {filteredCases.map((caseData) => (
                <CaseCard key={caseData.id} caseData={caseData} onClick={() => setSelectedCase(caseData)} />
              ))}
            </div>

            {filteredCases.length === 0 && (
              <div style={{ textAlign: "center", padding: `${tokens.space.giant}px 0` }}>
                <div style={{ fontSize: 80, marginBottom: tokens.space.lg }}>🐾</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.sm }}>
                  Nenhum caso encontrado
                </h3>
                <p style={{ fontSize: 16, color: tokens.colors.textMuted }}>
                  Seja o primeiro a registrar um caso nesta categoria!
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Detail Modal */}
      {selectedCase && <CaseDetailModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />}

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
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
