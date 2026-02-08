"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

// Dados de finais felizes para o carousel
const happyEndingsCarousel = [
  {
    id: 1,
    name: "Thor",
    beforeImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    story: "De acorrentado e desnutrido a livre e feliz em um sítio",
    timelineText: "Transformação em 3 meses",
    location: "São Paulo, SP",
  },
  {
    id: 2,
    name: "Luna",
    beforeImage: "https://images.unsplash.com/photo-1573865526739-10c1de0a6f39?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    story: "De pata fraturada a correndo e brincando novamente",
    timelineText: "Recuperação em 2 meses",
    location: "Campinas, SP",
  },
  {
    id: 3,
    name: "Mel",
    beforeImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    story: "De doente e sozinha a saudável com família amorosa",
    timelineText: "Adotada após 1 mês",
    location: "Santos, SP",
  },
  {
    id: 4,
    name: "Bob",
    beforeImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    story: "Das ruas ao lar dos sonhos com quintal gigante",
    timelineText: "Nova família em 2 semanas",
    location: "Guarulhos, SP",
  },
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

// Hero Carousel Component
function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const current = happyEndingsCarousel[currentIndex];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % happyEndingsCarousel.length);
    setShowVideo(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + happyEndingsCarousel.length) % happyEndingsCarousel.length);
    setShowVideo(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: "relative",
        height: 600,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      }}
    >
      {/* Antes/Depois Images */}
      <div style={{ display: "flex", height: "100%", position: "relative" }}>
        {/* Antes */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={`before-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={current.beforeImage}
              alt="Antes"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(40%) brightness(0.85)",
              }}
            />
          </AnimatePresence>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.3))",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: tokens.space.xl,
              left: tokens.space.xl,
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(10px)",
              color: "white",
              padding: `${tokens.space.xs}px ${tokens.space.md}px`,
              borderRadius: tokens.radii.md,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            ANTES
          </div>
        </div>

        {/* Depois */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={`after-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={current.afterImage}
              alt="Depois"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AnimatePresence>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to left, transparent 30%, rgba(0,0,0,0.3))",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: tokens.space.xl,
              right: tokens.space.xl,
              background: "rgba(16, 185, 129, 0.9)",
              backdropFilter: "blur(10px)",
              color: "white",
              padding: `${tokens.space.xs}px ${tokens.space.md}px`,
              borderRadius: tokens.radii.md,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            DEPOIS
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
          padding: `${tokens.space.giant}px ${tokens.space.xxl}px ${tokens.space.xxl}px`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "white",
                marginBottom: tokens.space.md,
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              {current.name}
            </h2>

            <p
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.95)",
                lineHeight: 1.6,
                marginBottom: tokens.space.lg,
                maxWidth: 800,
                textShadow: "0 1px 10px rgba(0,0,0,0.5)",
              }}
            >
              {current.story}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xl }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.sm,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                <Clock size={16} />
                {current.timelineText}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.sm,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                <MapPin size={16} />
                {current.location}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(!showVideo)}
                style={{
                  background: "white",
                  color: tokens.colors.text,
                  border: "none",
                  padding: `${tokens.space.sm}px ${tokens.space.lg}px`,
                  borderRadius: tokens.radii.md,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.space.xs,
                  marginLeft: "auto",
                }}
              >
                ▶ Ver vídeo
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        style={{
          position: "absolute",
          left: tokens.space.lg,
          top: "50%",
          transform: "translateY(-50%)",
          width: 56,
          height: 56,
          borderRadius: tokens.radii.full,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          color: "white",
          zIndex: 10,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        }}
      >
        ←
      </button>
      <button
        onClick={next}
        style={{
          position: "absolute",
          right: tokens.space.lg,
          top: "50%",
          transform: "translateY(-50%)",
          width: 56,
          height: 56,
          borderRadius: tokens.radii.full,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          color: "white",
          zIndex: 10,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        }}
      >
        →
      </button>

      {/* Dots Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: tokens.space.lg,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: tokens.space.xs,
          zIndex: 10,
        }}
      >
        {happyEndingsCarousel.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setShowVideo(false);
            }}
            style={{
              width: index === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: tokens.radii.full,
              background: index === currentIndex ? "white" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Video Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.95)",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <video
              src={current.videoUrl}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: tokens.radii.lg,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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

// Main Component
export default function SalvaVidasPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("todos");
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

      {/* Hero Carousel - Happy Endings - Full Width */}
      {selectedCategory === "todos" && <HeroCarousel />}

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: `${tokens.space.xxl}px ${tokens.space.xl}px` }}>

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
                <HappyCard key={caseData.id} caseData={caseData} onClick={() => router.push(`/salvavidas/caso/${caseData.id}`)} />
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
                <CaseCard key={caseData.id} caseData={caseData} onClick={() => router.push(`/salvavidas/caso/${caseData.id}`)} />
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
