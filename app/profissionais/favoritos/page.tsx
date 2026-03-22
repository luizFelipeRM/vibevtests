"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Star, MapPin, Heart, Search, Leaf, Bell,
  Sparkles, Stethoscope, Brain, Baby, Palette, PawPrint, 
  Dumbbell, ChefHat, Scissors, Briefcase 
} from "lucide-react";

import { colors } from "@/src/design/colors";
import { space } from "@/src/design/space";
import { fontSizes } from "@/src/design/fontSizes";
import { radius } from "@/src/design/radius";
import { sizes } from "@/src/design/sizes";

// Categorias do GuiaVegano
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
  { id: "outros", name: "Outros", icon: Briefcase },
];

// Mock para a página de favoritos
const favoriteProfessionals = [
  {
    id: 1,
    username: "dra-ana-silva",
    name: "Dra. Ana Silva",
    category: "nutricionista",
    specialty: "Nutrição Clínica Vegana",
    location: "São Paulo, SP",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    userReview: { rating: 5, comment: "Excelente profissional! Mudou minha percepção sobre nutrição." }
  },
  {
    id: 2,
    username: "dr-carlos-mendes",
    name: "Dr. Carlos Mendes",
    category: "medico",
    specialty: "Clínico Geral Vegano",
    location: "Rio de Janeiro, RJ",
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    userReview: { rating: 4, comment: "Muito atencioso, recomendo." }
  },
  {
    id: 3,
    username: "chef-bianca-almeida",
    name: "Chef Bianca Almeida",
    category: "chef",
    specialty: "Alta Gastronomia",
    location: "São Paulo, SP",
    rating: 5.0,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop",
    userReview: null
  }
];

// Notification Hook mockado
const useNotifications = () => {
  const [notifications, setNotifications] = useState<{ id: number; msg: string; read: boolean; type: string }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const msgs = [
      { msg: "Dr. Pedro (Pediatra) acabou de se cadastrar em SP", type: 'new_pro' },
      { msg: "Novo nutricionista disponível para atendimento online", type: 'new_pro' },
      { msg: "Ana Maria avaliou Dra. Ana Silva com 5 estrelas", type: 'rating' },
      { msg: "Você recebeu uma nova mensagem de contato.", type: 'schedule' },
    ];

    const initial = [
      { msg: "Bem-vindo aos Favoritos do GuiaVegano!", type: 'system' },
      { msg: "Um dos seus profissionais favoritados abriu nova agenda.", type: 'schedule' }
    ].map((item, i) => ({ id: i, msg: item.msg, type: item.type, read: false }));

    setNotifications(initial);
    setUnreadCount(initial.length);

    const timer = setInterval(() => {
      const item = msgs[Math.floor(Math.random() * msgs.length)];
      const id = Date.now();
      setNotifications(prev => {
        const newer = [{ id, msg: item.msg, type: item.type, read: false }, ...prev].slice(0, 5);
        return newer;
      });
      setUnreadCount(prev => prev + 1);
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return { notifications, unreadCount, markAllAsRead };
};

export default function FavoritosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todos");

  const filteredProfessionals = favoriteProfessionals.filter(pro => 
    (activeCategory === "todos" || pro.category === activeCategory) &&
    (
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categories.find(c => c.id === pro.category)?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      {/* Navbar Header */}
      <header
        style={{
          backgroundColor: colors.surface,
          padding: `${space.lg}px ${space.xl}px`,
          borderBottom: `1px solid ${colors.border}`,
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: sizes.pagecontainer,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: space.xl,
          }}
        >
          {/* Logo e Voltar */}
          <div style={{ display: "flex", alignItems: "center", gap: space.xl }}>
            <Link href="/profissionais" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: sizes.xl,
                  height: sizes.xl,
                  borderRadius: radius.full,
                  backgroundColor: colors.primary_lighter,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.primary,
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                title="Voltar"
              >
                <ArrowLeft size={sizes.icon_sm} />
              </div>
            </Link>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ display: "flex", alignItems: "center", gap: space.md, cursor: "pointer" }}
            >
              <div
                style={{
                  width: sizes["3xl"],
                  height: sizes["3xl"],
                  borderRadius: radius.md,
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary_dark} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={sizes.icon_md} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 style={{ fontSize: fontSizes.lg, fontWeight: 700, color: colors.text_primary, margin: 0 }}>
                  Meus Favoritos
                </h1>
                <p style={{ fontSize: fontSizes.xs, color: colors.text_secondary, margin: 0 }}>
                  GuiaVegano Profissionais
                </p>
              </div>
            </motion.div>
          </div>

          {/* Barra de Pesquisa Integrada */}
          <div
            style={{
              flex: 1,
              maxWidth: 600,
              backgroundColor: colors.background,
              borderRadius: radius.pill,
              border: `1px solid ${colors.border}`,
              display: "flex",
              alignItems: "center",
              padding: `${space.sm}px ${space.lg}px`,
              gap: space.md,
            }}
          >
            <Search size={sizes.icon_sm} color={colors.text_secondary} />
            <input
              type="text"
              placeholder="Buscar profissionais favoritados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                fontSize: fontSizes.sm,
                flex: 1,
                fontFamily: "inherit",
                color: colors.text_primary,
              }}
            />
          </div>

          {/* Notificações */}
          <div style={{ display: "flex", alignItems: "center", gap: space.md, position: "relative" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications && unreadCount > 0) markAllAsRead();
              }}
              style={{
                width: sizes["2xl"],
                height: sizes["2xl"],
                borderRadius: radius.full,
                backgroundColor: showNotifications ? colors.primary_lighter : colors.surface,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative"
              }}
            >
              <Bell size={sizes.icon_sm} color={colors.text_primary} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: sizes.sm,
                    height: sizes.sm,
                    borderRadius: radius.full,
                    backgroundColor: colors.error,
                    color: colors.surface,
                    fontSize: fontSizes.micro,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: 340,
                    backgroundColor: colors.surface,
                    borderRadius: radius.lg,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${colors.border}`,
                    zIndex: 200,
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: space.md,
                    borderBottom: `1px solid ${colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: colors.grays[100]
                  }}>
                    <h3 style={{ margin: 0, fontSize: fontSizes.sm, fontWeight: 700, color: colors.text_primary }}>Notificações</h3>
                    {unreadCount > 0 && (
                      <span style={{ fontSize: fontSizes.xs, color: colors.primary, cursor: 'pointer', fontWeight: 600 }} onClick={markAllAsRead}>
                        Marcar lidas
                      </span>
                    )}
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: space.xl, textAlign: 'center', color: colors.text_secondary, fontSize: fontSizes.sm }}>
                        Nenhuma notificação no momento.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} style={{
                          padding: space.md,
                          borderBottom: `1px solid ${colors.border}`,
                          backgroundColor: n.read ? colors.surface : colors.primary_lighter + '33',
                          display: 'flex',
                          gap: space.md,
                          alignItems: "flex-start"
                        }}>
                          <div style={{
                            width: sizes.micro, height: sizes.micro, borderRadius: radius.full,
                            backgroundColor: n.read ? colors.grays[300] : colors.primary,
                            flexShrink: 0, marginTop: 6
                          }} />
                          <p style={{ margin: 0, fontSize: fontSizes.xs, color: colors.text_primary, lineHeight: 1.5 }}>
                            {n.msg}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Categorias (Logo abaio do Header, ocupando toda largura) */}
      <div
        style={{
          padding: `${space.lg}px`,
          backgroundColor: colors.surface,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            maxWidth: sizes.pagecontainer,
            margin: "0 auto",
            overflowX: "auto",
            display: "flex",
            gap: space.md,
            paddingBottom: space.sm,
            scrollbarWidth: "none" // Opcional, para Firefox
          }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: `${space.sm}px ${space.lg}px`,
                  borderRadius: radius.pill,
                  border: `2px solid ${isSelected ? colors.primary : colors.border}`,
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  color: isSelected ? colors.surface : colors.text_primary,
                  fontSize: fontSizes.sm,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: space.sm,
                  whiteSpace: "nowrap",
                  boxShadow: isSelected ? `0 4px 12px ${colors.primary}40` : "none",
                }}
              >
                <Icon size={sizes.md} strokeWidth={2.5} />
                {category.name}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main
        style={{
          maxWidth: sizes.pagecontainer,
          margin: "0 auto",
          padding: `${space.xl}px`,
        }}
      >
        {filteredProfessionals.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: `${space["3xl"]}px ${space.lg}px`,
              color: colors.text_secondary,
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              border: `1px solid ${colors.border}`,
            }}
          >
            {searchTerm || activeCategory !== "todos" ? (
              <>
                <Search size={sizes["3xl"]} color={colors.grays[300]} style={{ marginBottom: space.md }} />
                <h2 style={{ fontSize: fontSizes.xl, color: colors.text_primary, margin: `0 0 ${space.sm}px` }}>
                  Nenhum profissional encontrado
                </h2>
                <p style={{ fontSize: fontSizes.md, margin: 0 }}>
                  Não encontramos nenhum favorito que corresponda à sua busca ou filtro.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("todos");
                  }}
                  style={{
                    marginTop: space.md,
                    padding: `${space.sm}px ${space.md}px`,
                    backgroundColor: colors.primary_lighter,
                    color: colors.primary_dark,
                    border: "none",
                    borderRadius: radius.md,
                    cursor: "pointer",
                    fontSize: fontSizes.sm,
                    fontWeight: 600
                  }}
                >
                  Limpar Filtros
                </button>
              </>
            ) : (
              <>
                <Heart size={sizes["3xl"]} color={colors.grays[300]} style={{ marginBottom: space.md }} />
                <h2 style={{ fontSize: fontSizes.xl, color: colors.text_primary, margin: `0 0 ${space.sm}px` }}>
                  Nenhum favorito ainda
                </h2>
                <p style={{ fontSize: fontSizes.md, margin: 0 }}>
                  Explore nossa lista de profissionais e favorite os que você mais gostar.
                </p>
              </>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: space.lg,
            }}
          >
            {filteredProfessionals.map((pro) => (
              <Link 
                href={`/profissionais/${pro.username}`} 
                key={pro.id}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: radius.lg,
                    border: `1px solid ${colors.border}`,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  {/* Image Section */}
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                    <img
                      src={pro.image}
                      alt={pro.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        // Lógica de favoritar/desfavoritar aqui
                      }}
                      style={{
                        position: "absolute",
                        top: space.sm,
                        right: space.sm,
                        backgroundColor: colors.surface,
                        borderRadius: radius.full,
                        padding: space.xs,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: colors.primary,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                      title="Remover dos favoritos"
                    >
                      <Heart size={sizes.md} fill={colors.primary} color={colors.primary} />
                    </div>
                  </div>

                {/* Info Section */}
                <div style={{ padding: space.md, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: space.xs }}>
                    <h3 style={{ margin: 0, fontSize: fontSizes.lg, color: colors.text_primary, fontWeight: 600 }}>
                      {pro.name}
                    </h3>
                  </div>
                  <p style={{ margin: `0 0 ${space.sm}px`, fontSize: fontSizes.sm, color: colors.primary, fontWeight: 500 }}>
                    {categories.find(c => c.id === pro.category)?.name || pro.category}
                  </p>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: space.xs, color: colors.text_secondary, fontSize: fontSizes.sm, marginBottom: space.md }}>
                    <MapPin size={sizes.xs} />
                    <span>{pro.location}</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: space.xs, color: colors.text_secondary, fontSize: fontSizes.sm, marginBottom: space.md }}>
                    <Star size={sizes.xs} fill={colors.grays[300]} color={colors.grays[300]} />
                    <span style={{ fontWeight: 600, color: colors.text_primary }}>{pro.rating}</span>
                    <span>({pro.reviews} avaliações gerais)</span>
                  </div>

                  {/* Minha Avaliação Placeholder ou Real */}
                  {pro.userReview ? (
                    <div style={{
                      marginTop: "auto",
                      padding: space.md,
                      backgroundColor: colors.primary_lighter,
                      borderRadius: radius.md,
                      border: `1px solid ${colors.primary}33`
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: space.xs, marginBottom: space.xs }}>
                        <span style={{ fontSize: fontSizes.xs, fontWeight: 700, color: colors.primary_dark }}>Sua Avaliação:</span>
                        <div style={{ display: "flex" }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={sizes.xs}
                              fill={i < pro.userReview!.rating ? colors.primary : "transparent"}
                              color={i < pro.userReview!.rating ? colors.primary : colors.primary_light}
                            />
                          ))}
                        </div>
                      </div>
                      {pro.userReview.comment && (
                        <p style={{ margin: 0, fontSize: fontSizes.xs, color: colors.primary_dark, fontStyle: "italic", lineHeight: 1.4 }}>
                          "{pro.userReview.comment}"
                        </p>
                      )}
                    </div>
                  ) : (
                    <div style={{
                      marginTop: "auto",
                      padding: space.md,
                      backgroundColor: colors.grays[100],
                      borderRadius: radius.md,
                      border: `1px dashed ${colors.border}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: space.xs
                    }}>
                      <span style={{ fontSize: fontSizes.xs, color: colors.text_secondary, fontWeight: 500 }}>
                        Você ainda não avaliou
                      </span>
                      <button style={{
                        background: "none",
                        border: "none",
                        color: colors.primary,
                        fontSize: fontSizes.xs,
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: 0,
                        textDecoration: "underline"
                      }}>
                        Deixar avaliação
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
