"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Leaf,
  MapPin,
  Star,
  Phone,
  Mail,
  Instagram,
  Globe,
  Award,
  DollarSign,
  Check,
  MessageCircle,
  Video,
  BadgeCheck,
  ShieldAlert,
  Send,
  Flag,
  ArrowLeft,
  Heart,
} from "lucide-react";

// Design Tokens
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

// Dados mockados (mesmo do arquivo principal)
const professionalsData = [
  {
    id: 1,
    username: "dra-ana-silva",
    name: "Dra. Ana Silva",
    category: "nutricionista",
    specialty: "Nutrição Clínica Vegana",
    location: "São Paulo, SP",
    rating: 4.9,
    reviews: 127,
    experience: "8 anos",
    price: "R$ 300-400",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=400&fit=crop",
    verified: true,
    bio: "Especialista em nutrição esportiva para atletas veganos. Foco em performance e ganho de massa muscular.",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    services: ["Consulta Online", "Plano Alimentar", "Suplementação", "Acompanhamento Mensal"],
    reviewsList: [
      { user: "Carlos Oliveira", date: "15 Mai 2023", rating: 5, comment: "Excelente profissional! Mudou minha performance nos treinos." },
      { user: "Fernanda Lima", date: "10 Jun 2023", rating: 4, comment: "Muito atenciosa, mas a agenda é um pouco cheia." }
    ],
    portfolio: [],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=adux",
    contact: {
      phone: "(11) 99999-8888",
      email: "dra.ana@email.com",
      instagram: "@dra.anasilva",
      website: "www.draanasilva.com.br",
    },
  },
  {
    id: 2,
    username: "dr-carlos-mendes",
    name: "Dr. Carlos Mendes",
    category: "medico",
    specialty: "Clínico Geral",
    location: "Rio de Janeiro, RJ",
    rating: 4.8,
    reviews: 203,
    experience: "12 anos",
    price: "R$ 250-350",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=400&fit=crop",
    verified: true,
    bio: "Médico vegano há 10 anos. Atendimento humanizado com foco em medicina preventiva e lifestyle vegano. Experiência em orientação nutricional e acompanhamento de pacientes em transição.",
    address: "Rua Visconde de Pirajá, 550 - Ipanema, Rio de Janeiro - RJ",
    services: ["Consulta geral", "Check-up completo", "Orientação nutricional", "Medicina preventiva"],
    reviewsList: [
      { user: "Carla Diaz", rating: 5, date: "20/10/2023", comment: "Médico incrível, super atualizado e vegano de verdade." }
    ],
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
    username: "dra-mariana-costa",
    name: "Dra. Mariana Costa",
    category: "psicologo",
    specialty: "Psicologia Clínica",
    location: "Belo Horizonte, MG",
    rating: 5.0,
    reviews: 89,
    experience: "6 anos",
    price: "R$ 150-200",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=400&fit=crop",
    verified: true,
    isRemote: true,
    bio: "Psicóloga especializada em ansiedade e transição para o veganismo. Atendimento online e presencial com abordagem acolhedora e humanizada.",
    address: "Av. do Contorno, 6500 - Savassi, Belo Horizonte - MG",
    services: ["Terapia individual", "Terapia de casal", "Orientação familiar", "Atendimento online"],
    reviewsList: [],
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
    username: "ink-vegan-tattoo",
    name: "Ink Vegan Tattoo - Rafael",
    category: "tatuador",
    specialty: "Tatuagem Vegana",
    location: "Curitiba, PR",
    rating: 4.9,
    reviews: 156,
    experience: "10 anos",
    price: "R$ 300-800",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1590246814883-57c511a83d6b?w=1200&h=400&fit=crop",
    verified: true,
    bio: "Estúdio 100% vegano. Tintas veganas, luvas sem látex, aftercare cruelty-free. Especialidade em blackwork e minimalismo.",
    address: "Rua XV de Novembro, 123 - Centro, Curitiba - PR",
    services: ["Tatuagem personalizada", "Cover up", "Restauração", "Consultoria de design"],
    reviewsList: [],
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
    username: "dra-paula-oliveira",
    name: "Dra. Paula Oliveira",
    category: "pediatra",
    specialty: "Pediatria Vegana",
    location: "Porto Alegre, RS",
    rating: 4.9,
    reviews: 142,
    experience: "9 anos",
    price: "R$ 280-380",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=400&fit=crop",
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
    username: "lucas-fitness-vegan",
    name: "Lucas Fitness Vegan",
    category: "personal",
    specialty: "Personal Trainer Vegano",
    location: "Florianópolis, SC",
    rating: 4.8,
    reviews: 98,
    experience: "7 anos",
    price: "R$ 120-180/aula",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=400&fit=crop",
    verified: true,
    isRemote: true,
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
    username: "chef-bianca-almeida",
    name: "Chef Bianca Almeida",
    category: "chef",
    specialty: "Gastronomia Vegana",
    location: "São Paulo, SP",
    rating: 5.0,
    reviews: 167,
    experience: "11 anos",
    price: "R$ 500-1500/evento",
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=400&fit=crop",
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
    username: "dr-vegan-pet",
    name: "Dr. Vegan Pet - Ricardo",
    category: "veterinario",
    specialty: "Veterinária Vegana",
    location: "Brasília, DF",
    rating: 4.9,
    reviews: 134,
    experience: "8 anos",
    price: "R$ 180-280",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=400&fit=crop",
    verified: true,
    isRemote: true,
    bio: "Veterinário especializado em dietas plant-based para cães. Atendimento ético e compassivo para todos os animais.",
    address: "SQN 312 Bloco D, Loja 15 - Asa Norte, Brasília - DF",
    services: ["Consulta veterinária", "Orientação nutricional pet", "Emergências", "Vacinas e exames"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(61) 91098-7654",
      email: "dr.veganpet@email.com",
      instagram: "@drveganpet",
      website: "www.drveganpet.com.br",
    },
  },
];

// Report Modal Component
function ReportModal({ onClose, professionalName }: { onClose: () => void; professionalName: string }) {
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reportReasons = [
    "Informações incorretas ou desatualizadas",
    "Comportamento inadequado ou antiético",
    "Perfil falso ou fraudulento",
    "Violação de direitos autorais",
    "Conteúdo inapropriado",
    "Outro",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason) return;
    // Aqui faria a integração com o backend
    console.log("Report submitted:", { professionalName, reportReason, reportDetails });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
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
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: tokens.space.xl,
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
          maxWidth: 500,
          width: "100%",
          padding: tokens.space.xxl,
          position: "relative",
        }}
      >
        {submitted ? (
          <div style={{ textAlign: "center", padding: tokens.space.xl }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: tokens.colors.primaryLighter,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                marginBottom: tokens.space.lg,
              }}
            >
              <Check size={32} color={tokens.colors.primary} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
              Denúncia Enviada
            </h3>
            <p style={{ fontSize: 14, color: tokens.colors.textMuted }}>
              Obrigado por nos ajudar a manter a qualidade da plataforma.
            </p>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
              Reportar perfil de {professionalName}
            </h3>
            <p style={{ fontSize: 14, color: tokens.colors.textMuted, marginBottom: tokens.space.xl }}>
              Sua denúncia será analisada pela nossa equipe. Todas as informações são confidenciais.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: tokens.space.lg }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: tokens.space.sm,
                    color: tokens.colors.text,
                  }}
                >
                  Motivo da denúncia *
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: tokens.radii.md,
                    border: `1px solid ${tokens.colors.border}`,
                    fontSize: 14,
                    fontFamily: "inherit",
                    color: tokens.colors.text,
                  }}
                  required
                >
                  <option value="">Selecione um motivo</option>
                  {reportReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: tokens.space.xl }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: tokens.space.sm,
                    color: tokens.colors.text,
                  }}
                >
                  Detalhes (opcional)
                </label>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Forneça mais informações sobre sua denúncia..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: tokens.radii.md,
                    border: `1px solid ${tokens.colors.border}`,
                    fontSize: 14,
                    fontFamily: "inherit",
                    resize: "vertical",
                    color: tokens.colors.text,
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: tokens.space.md }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: `${tokens.space.md}px`,
                    backgroundColor: tokens.colors.bg,
                    color: tokens.colors.text,
                    border: `1px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: `${tokens.space.md}px`,
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: tokens.radii.md,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Enviar Denúncia
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ProfessionalPage() {
  const params = useParams();
  const router = useRouter();
  const [isReviewing, setIsReviewing] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [localReviews, setLocalReviews] = useState<any[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const professional = professionalsData.find((p) => p.username === params.username);

  useEffect(() => {
    if (professional) {
      setLocalReviews(professional.reviewsList || []);
    }
  }, [professional]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    const review = {
      user: "Você",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }),
    };

    setLocalReviews([review, ...localReviews]);
    setNewReview({ rating: 5, comment: "" });
    setIsReviewing(false);
  };

  if (!professional) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: tokens.space.xl }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
            Profissional não encontrado
          </h1>
          <Link href="/profissionais">
            <button
              style={{
                padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                backgroundColor: tokens.colors.primary,
                color: "white",
                border: "none",
                borderRadius: tokens.radii.md,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Voltar para profissionais
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: tokens.colors.bg }}>

        {/* Conteúdo principal */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: `${tokens.space.xxl}px ${tokens.space.xl}px` }}>
          {/* Header com Banner e Avatar */}
          <div style={{ position: "relative", marginBottom: tokens.space.xxl }}>
            {/* Banner */}
            <div
              style={{
                height: 300,
                background: professional.coverImage
                  ? `url(${professional.coverImage}) center/cover`
                  : `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                borderRadius: tokens.radii.xl,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              {/* Botões sobre a imagem */}
              <div style={{
                position: "absolute",
                top: 20,
                left: 20,
                right: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 10,
              }}>
                {/* Botão Voltar */}
                <Link href="/profissionais">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <ArrowLeft size={22} color="white" />
                  </motion.button>
                </Link>

                {/* Botões de ação */}
                <div style={{ display: "flex", gap: 12 }}>
                  {/* Botão Reportar */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowReportModal(true)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Flag size={20} color="white" />
                  </motion.button>

                  {/* Botão Favoritar (DESTAQUE) */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const newFavoriteState = !isFavorite;
                      setIsFavorite(newFavoriteState);
                      if (newFavoriteState) {
                        setShowLikeAnimation(true);
                        setTimeout(() => setShowLikeAnimation(false), 2000);
                      }
                    }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: isFavorite ? "rgba(4, 128, 3, 0.9)" : "rgba(0, 0, 0, 0.5)",
                      border: isFavorite ? "3px solid #048003" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: isFavorite ? "0 8px 24px rgba(4, 128, 3, 0.5)" : "0 4px 16px rgba(0, 0, 0, 0.3)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s",
                    }}
                  >
                    <Heart
                      size={28}
                      color={isFavorite ? "white" : "white"}
                      fill={isFavorite ? "white" : "none"}
                      strokeWidth={2.5}
                    />
                  </motion.button>
                </div>
              </div>
            </div>
            {/* Avatar */}
            <div
              style={{
                position: "absolute",
                bottom: -60,
                left: tokens.space.xl,
                width: 150,
                height: 150,
                borderRadius: tokens.radii.full,
                border: "6px solid white",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: "white",
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
            </div>
          </div>

          {/* Content */}
          <div style={{ paddingTop: 80 }}>
            {/* Title Section */}
            <div style={{ marginBottom: tokens.space.xl }}>
              <h2
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  marginBottom: tokens.space.xs,
                  color: tokens.colors.text,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {professional.name}
                {professional.verified ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 16,
                      background: "#e0f2fe",
                      color: "#0284c7",
                      padding: "6px 14px",
                      borderRadius: 20,
                    }}
                  >
                    <BadgeCheck size={20} fill="#0284c7" color="white" /> Verificado
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 16,
                      background: "#f3f4f6",
                      color: "#6b7280",
                      padding: "6px 14px",
                      borderRadius: 20,
                    }}
                  >
                    <ShieldAlert size={20} /> Não Verificado
                  </div>
                )}
              </h2>
              <p style={{ fontSize: 20, color: tokens.colors.textMuted, marginBottom: tokens.space.md }}>
                {professional.specialty}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.space.md }}>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, color: tokens.colors.text }}>
                  <MapPin size={20} color={tokens.colors.primary} />
                  {professional.location}
                </div>
                {professional.isRemote && (
                  <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, color: tokens.colors.text }}>
                    <div style={{ width: 1, height: 24, background: tokens.colors.border }} />
                    <Video size={20} color={tokens.colors.primary} />
                    Atendimento Remoto
                  </div>
                )}
              </div>
            </div>

            {/* Address & Map Link */}
            {professional.address && (
              <div
                style={{
                  marginBottom: tokens.space.xxl,
                  padding: tokens.space.xl,
                  background: tokens.colors.surface,
                  borderRadius: tokens.radii.lg,
                  border: `1px solid ${tokens.colors.border}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>
                  Endereço
                </h3>
                <p style={{ margin: 0, marginBottom: tokens.space.md, color: tokens.colors.text }}>{professional.address}</p>
                <div
                  style={{
                    height: 250,
                    background: "#e5e7eb",
                    borderRadius: tokens.radii.md,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(professional.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
              </div>
            )}

            {/* Rating e Info */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: tokens.space.lg,
                marginBottom: tokens.space.xxl,
              }}
            >
              <div
                style={{
                  padding: tokens.space.xl,
                  backgroundColor: tokens.colors.primaryLighter,
                  borderRadius: tokens.radii.lg,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, marginBottom: tokens.space.xs }}>
                  <Star size={24} fill={tokens.colors.primary} color={tokens.colors.primary} />
                  <span style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.text }}>{professional.rating}</span>
                </div>
                <p style={{ fontSize: 16, color: tokens.colors.text, fontWeight: 600 }}>{professional.reviews} avaliações</p>
              </div>

              <div
                style={{
                  padding: tokens.space.xl,
                  backgroundColor: tokens.colors.primaryLighter,
                  borderRadius: tokens.radii.lg,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, marginBottom: tokens.space.xs }}>
                  <Award size={24} color={tokens.colors.primary} />
                  <span style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.text }}>{professional.experience}</span>
                </div>
                <p style={{ fontSize: 16, color: tokens.colors.text, fontWeight: 600 }}>de experiência</p>
              </div>

              <div
                style={{
                  padding: tokens.space.xl,
                  backgroundColor: tokens.colors.primaryLighter,
                  borderRadius: tokens.radii.lg,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, marginBottom: tokens.space.xs }}>
                  <DollarSign size={24} color={tokens.colors.primary} />
                  <span style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text }}>Tabela de Preços</span>
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 500 }}>
                  Consulta: {professional.price} <br />
                  Retorno: R$ 150 (Est.)
                </p>
              </div>
            </div>

            {/* Sobre */}
            <div
              style={{
                marginBottom: tokens.space.xxl,
                padding: tokens.space.xl,
                background: tokens.colors.surface,
                borderRadius: tokens.radii.lg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Sobre
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: tokens.colors.textMuted }}>{professional.bio}</p>
            </div>

            {/* Serviços */}
            <div
              style={{
                marginBottom: tokens.space.xxl,
                padding: tokens.space.xl,
                background: tokens.colors.surface,
                borderRadius: tokens.radii.lg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: 24,
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
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: tokens.space.md,
                }}
              >
                {professional.services.map((service: string, index: number) => (
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
                    <Check size={20} color={tokens.colors.primary} strokeWidth={3} />
                    <span style={{ fontSize: 15, color: tokens.colors.text }}>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabela de Preços */}
            <div
              style={{
                marginBottom: tokens.space.xxl,
                padding: tokens.space.xl,
                background: tokens.colors.surface,
                borderRadius: tokens.radii.lg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Tabela de Preços
              </h3>
              <div style={{ display: "grid", gap: tokens.space.lg }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: tokens.space.md,
                    borderBottom: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 600, color: tokens.colors.text, marginBottom: 4 }}>
                      Consulta Inicial
                    </p>
                    <p style={{ fontSize: 14, color: tokens.colors.textMuted }}>Primeira avaliação completa (60 min)</p>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.primary }}>{professional.price}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: tokens.space.md,
                    borderBottom: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 600, color: tokens.colors.text, marginBottom: 4 }}>
                      Consulta de Retorno
                    </p>
                    <p style={{ fontSize: 14, color: tokens.colors.textMuted }}>Acompanhamento e ajustes (40 min)</p>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.primary }}>R$ 150-200</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 600, color: tokens.colors.text, marginBottom: 4 }}>Pacote Mensal</p>
                    <p style={{ fontSize: 14, color: tokens.colors.textMuted }}>4 consultas + acompanhamento via WhatsApp</p>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.primary }}>R$ 800-1200</span>
                </div>
              </div>
            </div>

            {/* Portfólio ou Vídeo */}
            {(professional.portfolio.length > 0 || professional.video) && (
              <div
                style={{
                  marginBottom: tokens.space.xxl,
                  padding: tokens.space.xl,
                  background: tokens.colors.surface,
                  borderRadius: tokens.radii.lg,
                  border: `1px solid ${tokens.colors.border}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    marginBottom: tokens.space.lg,
                    color: tokens.colors.text,
                  }}
                >
                  {professional.video ? "Vídeo de Apresentação" : "Portfólio"}
                </h3>

                {professional.video ? (
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      overflow: "hidden",
                      borderRadius: tokens.radii.lg,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <iframe
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                      src={professional.video}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: tokens.space.lg,
                    }}
                  >
                    {professional.portfolio.map((image: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          borderRadius: tokens.radii.lg,
                          overflow: "hidden",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <img
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          style={{
                            width: "100%",
                            height: 250,
                            objectFit: "cover",
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Avaliações */}
            <div
              style={{
                marginBottom: tokens.space.xxl,
                padding: tokens.space.xl,
                background: tokens.colors.surface,
                borderRadius: tokens.radii.lg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: tokens.space.lg,
                }}
              >
                <h3 style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.text }}>Avaliações</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Star size={20} fill={tokens.colors.primary} color={tokens.colors.primary} />
                  <span style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text }}>{professional.rating}</span>
                  <span style={{ fontSize: 16, color: tokens.colors.textMuted }}>({professional.reviews})</span>
                </div>
              </div>

              {/* Botão Avaliar */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  marginBottom: tokens.space.lg,
                  borderRadius: tokens.radii.md,
                  border: `2px solid ${tokens.colors.primary}`,
                  backgroundColor: "transparent",
                  color: tokens.colors.primary,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "all 0.2s",
                }}
                onClick={() => setIsReviewing(!isReviewing)}
              >
                <Star size={18} fill="none" />
                Avaliar este profissional
              </motion.button>

              {/* Review Form */}
              <AnimatePresence>
                {isReviewing && (
                  <motion.form
                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                    animate={{ height: "auto", opacity: 1, marginBottom: tokens.space.xl }}
                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                    style={{ overflow: "hidden" }}
                    onSubmit={handleSubmitReview}
                  >
                    <div
                      style={{
                        padding: tokens.space.xl,
                        backgroundColor: "#f9fafb",
                        borderRadius: tokens.radii.md,
                        border: `1px solid ${tokens.colors.border}`,
                      }}
                    >
                      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: tokens.colors.text }}>Sua nota:</p>
                      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <motion.button
                            key={s}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setNewReview({ ...newReview, rating: s })}
                            style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4 }}
                          >
                            <Star
                              size={32}
                              fill={s <= newReview.rating ? "#eab308" : "#e5e7eb"}
                              color={s <= newReview.rating ? "#eab308" : "#9ca3af"}
                            />
                          </motion.button>
                        ))}
                      </div>

                      <textarea
                        placeholder="Conte sua experiência com este profissional..."
                        rows={4}
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        style={{
                          width: "100%",
                          padding: 14,
                          borderRadius: tokens.radii.md,
                          border: `1px solid ${tokens.colors.border}`,
                          fontSize: 15,
                          fontFamily: "inherit",
                          resize: "vertical",
                          marginBottom: 16,
                          color: tokens.colors.text,
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16 }}>
                        <button
                          type="button"
                          onClick={() => setIsReviewing(false)}
                          style={{
                            backgroundColor: "transparent",
                            color: "#4b5563",
                            border: "none",
                            padding: 0,
                            fontWeight: 500,
                            fontSize: 15,
                            cursor: "pointer",
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          style={{
                            backgroundColor: tokens.colors.primary,
                            color: "white",
                            border: "none",
                            padding: "10px 24px",
                            borderRadius: tokens.radii.md,
                            fontWeight: 600,
                            fontSize: 15,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <Send size={16} /> Enviar Avaliação
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div style={{ display: "grid", gap: tokens.space.lg }}>
                {localReviews.length === 0 ? (
                  <p style={{ color: tokens.colors.textMuted, fontStyle: "italic", textAlign: "center", padding: tokens.space.xl }}>
                    Este profissional ainda não possui avaliações. Seja o primeiro!
                  </p>
                ) : (
                  localReviews.map((review: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        padding: tokens.space.lg,
                        borderBottom: index !== localReviews.length - 1 ? `1px solid ${tokens.colors.border}` : "none",
                        display: "flex",
                        gap: tokens.space.md,
                      }}
                    >
                      {/* Avatar Placeholder */}
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "#e0f2fe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: tokens.colors.primary,
                          fontWeight: 700,
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        {review.user ? review.user.charAt(0).toUpperCase() : "A"}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, color: tokens.colors.text, fontSize: 16 }}>{review.user}</span>
                          <span style={{ fontSize: 13, color: tokens.colors.textMuted }}>{review.date}</span>
                        </div>
                        <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < review.rating ? "#eab308" : "transparent"}
                              color={i < review.rating ? "#eab308" : "#d1d5db"}
                            />
                          ))}
                        </div>
                        <p style={{ fontSize: 15, color: tokens.colors.text, lineHeight: 1.6 }}>{review.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

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
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: tokens.space.xl,
                  color: tokens.colors.text,
                }}
              >
                Entre em contato
              </h3>

              <div style={{ display: "grid", gap: tokens.space.lg, marginBottom: tokens.space.xl }}>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Phone size={22} color={tokens.colors.primary} />
                  <span style={{ fontSize: 16, color: tokens.colors.text }}>{professional.contact.phone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Mail size={22} color={tokens.colors.primary} />
                  <span style={{ fontSize: 16, color: tokens.colors.text }}>{professional.contact.email}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Instagram size={22} color={tokens.colors.primary} />
                  <span style={{ fontSize: 16, color: tokens.colors.text }}>{professional.contact.instagram}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Globe size={22} color={tokens.colors.primary} />
                  <span style={{ fontSize: 16, color: tokens.colors.text }}>{professional.contact.website}</span>
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
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: tokens.space.md,
                  boxShadow: `0 4px 12px ${tokens.colors.primary}40`,
                }}
              >
                <MessageCircle size={22} />
                Entrar em Contato
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} professionalName={professional.name} />}

      {/* Animação de Like estilo Facebook */}
      <AnimatePresence>
        {showLikeAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", duration: 0.6 }}
              style={{
                textAlign: "center",
                color: "white",
                position: "relative",
              }}
            >
              {/* Coração gigante */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.4,
                  repeat: 2,
                  ease: "easeInOut",
                }}
                style={{
                  fontSize: 120,
                  marginBottom: 24,
                  filter: "drop-shadow(0 8px 32px rgba(4, 128, 3, 0.5))",
                }}
              >
                💚
              </motion.div>

              {/* Mensagem */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 800,
                  marginBottom: 12,
                  color: "white",
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}>
                  Profissional Favoritado!
                </h2>
                <p style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: 400,
                  margin: "0 auto",
                  lineHeight: 1.5,
                }}>
                  {professional.name} foi adicionado aos seus favoritos. Você pode encontrá-lo facilmente no seu painel.
                </p>
              </motion.div>

              {/* Partículas de coração */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: 0,
                    scale: 1.5,
                    x: Math.cos((i * Math.PI * 2) / 12) * 200,
                    y: Math.sin((i * Math.PI * 2) / 12) * 200,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.05,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    fontSize: 32,
                    top: "50%",
                    left: "50%",
                    marginLeft: -16,
                    marginTop: -60,
                  }}
                >
                  💚
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}
