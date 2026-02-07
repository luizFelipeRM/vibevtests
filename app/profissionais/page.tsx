"use client";
import React, { useState, useEffect } from "react";
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
  Video,
  BadgeCheck,
  ShieldAlert,
  Calendar,
  Send,
  Info,
  Lightbulb,
  Tag,
  Briefcase,
  Flag,
  AlertTriangle,
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
  { id: "outros", name: "Outros", icon: Briefcase },
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
    price: "R$ 300-400",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    verified: true,
    bio: "Especialista em nutrição esportiva para atletas veganos. Foco em performance e ganho de massa muscular.",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    services: ["Consulta Online", "Plano Alimentar", "Suplementação", "Acompanhamento Mensal"],
    reviewsList: [
      { user: "Carlos Oliveira", date: "15 Mai 2023", rating: 5, comment: "Excelente profissional! Mudou minha performance nos treinos." },
      { user: "Fernanda Lima", date: "10 Jun 2023", rating: 4, comment: "Muito atenciosa, mas a agenda é um pouco cheia." }
    ],
    portfolio: [],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=adux", // Mock video
    contact: {
      phone: "(11) 99999-8888",
      email: "dra.ana@email.com",
      instagram: "@dra.anasilva",
      website: "www.draanasilva.com.br",
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
  {
    id: 9,
    name: "Dra. Juliana Santos",
    price: "R$ 250-350",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    verified: false,
    bio: "Dermatologista com foco em estética natural e produtos veganos. Tratamentos para acne, melasma e rejuvenescimento sem testes em animais.",
    address: "Rua Barão de Jaguara, 1234 - Centro, Campinas - SP",
    services: ["Consulta dermatológica", "Peeling natural", "Botox vegano", "Tratamento de acne"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(19) 98765-4321",
      email: "juliana.santos@email.com",
      instagram: "@dra.julianasantos",
      website: "www.julianasantos.com.br",
    },
  },
  {
    id: 10,
    name: "Dr. Marcos Vinicius",
    category: "dermatologista",
    specialty: "Tricologia Vegana",
    location: "Salvador, BA",
    rating: 4.7,
    reviews: 45,
    experience: "4 anos",
    price: "R$ 200-300",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    verified: false,
    bio: "Especialista em saúde capilar com abordagem integrativa e vegana. Tratamentos para queda, caspa e fortalecimento dos fios.",
    address: "Av. ACM, 2500 - Itaigara, Salvador - BA",
    services: ["Análise capilar", "Mesoterapia capilar", "Ledterapia", "Spa capilar vegano"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(71) 91234-5678",
      email: "marcos.vinicius@email.com",
      instagram: "@dr.marcosvinicius",
      website: "www.marcosvinicius.med.br",
    },
  },
  {
    id: 11,
    name: "Clínica Pele Vegana",
    category: "dermatologista",
    specialty: "Dermatologia Estética",
    location: "São Paulo, SP",
    rating: 4.9,
    reviews: 210,
    experience: "15 anos",
    price: "R$ 300-500",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop",
    verified: true,
    bio: "Clínica pioneira em dermatologia 100% vegana em SP. Tecnologias avançadas e equipe multidisciplinar.",
    address: "Rua Oscar Freire, 1000 - Jardins, São Paulo - SP",
    services: ["Laser Lavieen", "Ultraformer", "Bioestimuladores", "Harmonização facial"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(11) 3030-3030",
      email: "contato@pelevegana.com.br",
      instagram: "@pelevegana",
      website: "www.pelevegana.com.br",
    },
  },
  {
    id: 12,
    name: "Studio Zen Massage",
    category: "esteticista",
    specialty: "Massoterapia e Relaxamento",
    location: "Rio de Janeiro, RJ",
    rating: 4.9,
    reviews: 180,
    experience: "8 anos",
    price: "R$ 120-200",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop",
    verified: true,
    bio: "Espaço de relaxamento e bem-estar. Massagens terapêuticas com óleos essenciais orgânicos e veganos.",
    address: "Av. Atlântica, 1500 - Copacabana, Rio de Janeiro - RJ",
    services: ["Massagem relaxante", "Drenagem linfática", "Shiatsu", "Reflexologia"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(21) 99887-7665",
      email: "contato@studiozen.com.br",
      instagram: "@studiozenmassage",
      website: "www.studiozen.com.br",
    },
  },
  {
    id: 13,
    name: "Lashes by Fer",
    category: "esteticista",
    specialty: "Extensão de Cílios",
    location: "Curitiba, PR",
    rating: 4.6,
    reviews: 55,
    experience: "3 anos",
    price: "R$ 150-250",
    image: "https://images.unsplash.com/photo-1583001931096-959e9ad7b535?w=400&h=400&fit=crop",
    verified: false,
    bio: "Lash designer especialista em volume russo e fio a fio. Cílios sintéticos de alta qualidade e colas hipoalergênicas e veganas.",
    address: "Rua Comendador Araújo, 500 - Centro, Curitiba - PR",
    services: ["Fio a fio clássico", "Volume Russo", "Lash Lifting", "Design de sobrancelhas"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(41) 98877-6655",
      email: "fer.lashes@email.com",
      instagram: "@lashesbyfer",
      website: "www.lashesbyfer.com.br",
    },
  },
  {
    id: 14,
    name: "Beleza Natural",
    category: "esteticista",
    specialty: "Limpeza de Pele e Faciais",
    location: "Belo Horizonte, MG",
    rating: 4.8,
    reviews: 90,
    experience: "6 anos",
    price: "R$ 100-180",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop",
    verified: true,
    bio: "Tratamentos faciais revigorantes com cosméticos naturais e veganos. Limpeza de pele profunda, hidratação e revitalização.",
    address: "Rua da Bahia, 1000 - Lourdes, Belo Horizonte - MG",
    services: ["Limpeza de pele", "Peeling de diamante", "Máscaras faciais", "Microagulhamento"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(31) 97766-5544",
      email: "contato@belezanatural.com.br",
      instagram: "@belezanaturalestetica",
      website: "www.belezanatural.com.br",
    },
  },
  {
    id: 15,
    name: "EcoNails Studio",
    category: "esteticista",
    specialty: "Manicure e Pedicure",
    location: "Florianópolis, SC",
    rating: 4.5,
    reviews: 40,
    experience: "4 anos",
    price: "R$ 50-100",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
    verified: false,
    bio: "Cuidado completo para mãos e pés com esmaltes 7-free, veganos e hipoalergênicos. Ambiente aconchegante e sustentável.",
    address: "Av. Beira Mar Norte, 2000 - Centro, Florianópolis - SC",
    services: ["Manicure", "Pedicure", "Spa dos pés", "Esmaltação em gel"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(48) 96655-4433",
      email: "contato@econails.com.br",
      instagram: "@econails_studio",
      website: "www.econails.com.br",
    },
  },
  {
    id: 16,
    name: "VeganDev - Desenvolvimento Web",
    category: "outros",
    specialty: "Desenvolvedor Full Stack",
    location: "São Paulo, SP",
    rating: 4.9,
    reviews: 67,
    experience: "5 anos",
    price: "R$ 80-150/hora",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    verified: false,
    isRemote: true,
    bio: "Desenvolvedor vegano especializado em criar sites e aplicativos para negócios veganos. Ajudo empresas plant-based a terem presença digital profissional.",
    address: "São Paulo, SP - Atendimento 100% Remoto",
    services: ["Sites institucionais", "E-commerce", "Aplicativos mobile", "Manutenção e suporte"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(11) 98888-7777",
      email: "contato@vegandev.com.br",
      instagram: "@vegandev",
      website: "www.vegandev.com.br",
    },
  },
  {
    id: 17,
    name: "Construveg - Reformas Conscientes",
    category: "outros",
    specialty: "Pedreiro e Reformador",
    location: "Rio de Janeiro, RJ",
    rating: 4.7,
    reviews: 43,
    experience: "12 anos",
    price: "R$ 200-300/dia",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    verified: true,
    bio: "Pedreiro vegano com foco em reformas sustentáveis. Uso materiais ecológicos sempre que possível e apoio a comunidade vegana local.",
    address: "Rua das Laranjeiras, 300 - Laranjeiras, Rio de Janeiro - RJ",
    services: ["Reformas residenciais", "Acabamentos", "Pequenos reparos", "Consultoria em materiais sustentáveis"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(21) 99777-6666",
      email: "construveg@gmail.com",
      instagram: "@construveg",
      website: "",
    },
  },
  {
    id: 18,
    name: "Green Clean - Limpeza Ecológica",
    category: "outros",
    specialty: "Serviços de Limpeza",
    location: "Curitiba, PR",
    rating: 4.8,
    reviews: 89,
    experience: "3 anos",
    price: "R$ 120-200",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    verified: true,
    bio: "Empresa de limpeza 100% vegana! Usamos apenas produtos cruelty-free e biodegradáveis. Equipe treinada e comprometida com o meio ambiente.",
    address: "Curitiba, PR - Atendemos toda a região metropolitana",
    services: ["Limpeza residencial", "Limpeza pós-obra", "Limpeza de escritórios", "Faxina profunda"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(41) 98555-4444",
      email: "contato@greenclean.com.br",
      instagram: "@greenclean_cwb",
      website: "www.greenclean.com.br",
    },
  },
  {
    id: 19,
    name: "VeganLaw Advocacia",
    category: "outros",
    specialty: "Advogado",
    location: "Brasília, DF",
    rating: 5.0,
    reviews: 34,
    experience: "8 anos",
    price: "R$ 300-500/consulta",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
    verified: true,
    isRemote: true,
    bio: "Advogado vegano especializado em direito dos animais, direito do consumidor e consultoria para empresas veganas. Atendimento humanizado e comprometido com a causa.",
    address: "Brasília, DF - Atendimento presencial e remoto",
    services: ["Direito dos animais", "Direito do consumidor", "Consultoria empresarial", "Contratos"],
    reviewsList: [],
    portfolio: [],
    contact: {
      phone: "(61) 99444-3333",
      email: "contato@veganlawadv.com.br",
      instagram: "@veganlaw_adv",
      website: "www.veganlawadv.com.br",
    },
  },
];

// Notification Hook (can be extracted later)
const useNotifications = () => {
  const [notifications, setNotifications] = useState<{ id: number; msg: string; read: boolean; type: 'new_pro' | 'rating' | 'schedule' | 'system' | 'tips' | 'promo' }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Extensive mock notifications
    const msgs = [
      { msg: "Dr. Pedro (Pediatra) acabou de se cadastrar em SP", type: 'new_pro' },
      { msg: "Novo nutricionista disponível para atendimento online", type: 'new_pro' },
      { msg: "Ana Maria avaliou Dra. Ana Silva com 5 estrelas", type: 'rating' },
      { msg: "Sua agenda da próxima semana está quase cheia!", type: 'schedule' },
      { msg: "Bem-vindo ao GuiaVegano! Complete seu perfil.", type: 'system' },
      { msg: "Dica: Adicione fotos ao seu portfólio para mais visibilidade.", type: 'tips' },
      { msg: "Promoção: Destaque seu perfil com 50% de desconto.", type: 'promo' },
      { msg: "Você recebeu uma nova mensagem de contato.", type: 'schedule' },
      { msg: "Lembrete: Atualize seus horários de atendimento.", type: 'system' },
      { msg: "Parabéns! Você alcançou 5 avaliações positivas.", type: 'rating' },
      { msg: "Novo esteticista vegano em Curitiba.", type: 'new_pro' },
      { msg: "Receita nova no blog: Hambúrguer de Lentilha.", type: 'tips' }
    ];

    // Add initial notifications (show a mix)
    const initial = [
      { msg: "Bem-vindo ao GuiaVegano! Complete seu perfil.", type: 'system' },
      { msg: "Dica: Adicione um vídeo ao seu portfólio!", type: 'tips' },
      { msg: "Dr. Pedro (Pediatra) acabou de se cadastrar em SP", type: 'new_pro' }
    ].map((item, i) => ({ id: i, msg: item.msg, type: item.type as any, read: false }));

    setNotifications(initial);
    setUnreadCount(initial.length);

    // Mock incoming notifications
    const timer = setInterval(() => {
      const item = msgs[Math.floor(Math.random() * msgs.length)];
      const id = Date.now();
      setNotifications(prev => {
        const newer = [{ id, msg: item.msg, type: item.type as any, read: false }, ...prev].slice(0, 15); // keep last 15
        return newer;
      });
      setUnreadCount(prev => prev + 1);
    }, 12000); // Slightly faster for demo

    return () => clearInterval(timer);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return { notifications, unreadCount, markAllAsRead };
};

// Navbar Component
function Navbar() {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

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
          <div style={{ position: 'relative' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications && unreadCount > 0) markAllAsRead();
              }}
              style={{
                width: 44,
                height: 44,
                borderRadius: tokens.radii.full,
                backgroundColor: showNotifications ? tokens.colors.primaryLighter : tokens.colors.bg,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative"
              }}
            >
              <Bell size={20} color={tokens.colors.text} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontSize: 10,
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
                    width: 360,
                    backgroundColor: 'white',
                    borderRadius: tokens.radii.lg,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${tokens.colors.border}`,
                    zIndex: 200,
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: tokens.space.md,
                    borderBottom: `1px solid ${tokens.colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f9fafb'
                  }}>
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: tokens.colors.text }}>Notificações</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllAsRead();
                        }}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: tokens.colors.primary,
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                  </div>
                  <div style={{ maxHeight: 350, overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: tokens.space.xl, textAlign: 'center', color: tokens.colors.textMuted }}>
                        <Bell size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
                        <p style={{ margin: 0, fontSize: 14 }}>Nenhuma notificação nova</p>
                      </div>
                    ) : (
                      notifications.map(n => {
                        let Icon = Sparkles;
                        let iconColor = tokens.colors.primary;
                        let iconBg = tokens.colors.primaryLighter;

                        if (n.type === 'new_pro') {
                          Icon = UserPlus;
                          iconColor = '#059669';
                          iconBg = '#d1fae5';
                        } else if (n.type === 'rating') {
                          Icon = Star;
                          iconColor = '#d97706';
                          iconBg = '#fef3c7';
                        } else if (n.type === 'schedule') {
                          Icon = Calendar;
                          iconColor = '#2563eb';
                          iconBg = '#dbeafe';
                        } else if (n.type === 'system') {
                          Icon = Info;
                          iconColor = '#3b82f6';
                          iconBg = '#dbeafe';
                        } else if (n.type === 'tips') {
                          Icon = Lightbulb;
                          iconColor = '#8b5cf6';
                          iconBg = '#ede9fe';
                        } else if (n.type === 'promo') {
                          Icon = Tag;
                          iconColor = '#db2777';
                          iconBg = '#fce7f3';
                        }

                        return (
                          <div key={n.id} style={{
                            padding: tokens.space.md,
                            borderBottom: `1px solid ${tokens.colors.border}`,
                            backgroundColor: n.read ? 'white' : '#f0fdf4',
                            display: 'flex',
                            gap: 12,
                            transition: 'background-color 0.2s',
                            cursor: 'pointer'
                          }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = n.read ? 'white' : '#f0fdf4'}
                          >
                            <div style={{
                              width: 36, height: 36, borderRadius: '50%',
                              backgroundColor: iconBg,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <Icon size={18} color={iconColor} />
                            </div>
                            <div>
                              <p style={{ margin: 0, fontSize: 13, color: tokens.colors.text, fontWeight: n.read ? 400 : 600, lineHeight: 1.4 }}>
                                {n.msg}
                              </p>
                              <span style={{ fontSize: 11, color: tokens.colors.textMuted, marginTop: 4, display: 'block' }}>
                                há 2 minutos
                              </span>
                            </div>
                            {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: tokens.colors.primary, marginTop: 6 }} />}
                          </div>
                        )
                      })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Icon - Direct to Login */}
          <motion.button
            onClick={() => window.location.href = '/login'}
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
            title="Fazer Login"
          >
            <User size={20} color={tokens.colors.text} />
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

// Category Filter
function CategoryFilter({ selectedCategory, onSelectCategory }: { selectedCategory: string; onSelectCategory: (id: string) => void }) {
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
function ProfessionalCard({ professional, onOpenModal }: { professional: any; onOpenModal: (p: any) => void }) {
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
            objectPosition: "top center",
          }}
        />
        {professional.isRemote && (
          <div
            style={{
              position: "absolute",
              bottom: tokens.space.md,
              left: tokens.space.md,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              padding: `${tokens.space.xs}px ${tokens.space.md}px`,
              borderRadius: tokens.radii.pill,
              fontSize: 11,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: tokens.space.xs,
              backdropFilter: "blur(4px)",
            }}
          >
            <Video size={12} />
            Atendimento Online
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1, gap: 16 }}>
        {/* Header: Name & Badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text, margin: 0, lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 6 }}>
              {professional.name}
              {professional.verified && <BadgeCheck size={18} fill="#1d9bf0" color="white" />}
            </h3>
            <p style={{ fontSize: 14, color: tokens.colors.primary, fontWeight: 600, marginTop: 4 }}>
              {professional.specialty}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              color: tokens.colors.primary, backgroundColor: tokens.colors.primaryLighter,
              padding: "4px 8px", borderRadius: 4
            }}>
              {categories.find((c) => c.id === professional.category)?.name}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={14} fill={tokens.colors.primary} color={tokens.colors.primary} />
              <span style={{ fontSize: 14, fontWeight: 700, color: tokens.colors.text }}>{professional.rating}</span>
            </div>
          </div>
        </div>

        {/* Info Grid - Melhor distribuição */}
        <div style={{ display: 'grid', gap: 8, marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: '#4b5563' }}>
            <MapPin size={15} color={tokens.colors.textMuted} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{professional.location}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: '#4b5563' }}>
              <Award size={15} color={tokens.colors.textMuted} />
              <span>{professional.experience}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: '#4b5563' }}>
              <DollarSign size={15} color={tokens.colors.textMuted} />
              <span>{professional.price.split("/")[0]}</span>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div style={{ marginTop: "auto", paddingTop: 8 }}>
          <motion.button
            onClick={() => onOpenModal(professional)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "white",
              color: tokens.colors.primary,
              border: `1px solid ${tokens.colors.primary}`,
              borderRadius: tokens.radii.md,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: 'all 0.2s'
            }}
          >
            Ver Perfil Completo
            <ExternalLink size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div >
  );
}

// Report Modal Component
function ReportModal({ onClose, professionalName }: { onClose: () => void; professionalName: string }) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const reportReasons = [
    { id: 'fake', label: 'Perfil falso ou fraudulento' },
    { id: 'inappropriate', label: 'Conteúdo inapropriado' },
    { id: 'spam', label: 'Spam ou propaganda enganosa' },
    { id: 'harassment', label: 'Assédio ou comportamento abusivo' },
    { id: 'impersonation', label: 'Está se passando por outra pessoa' },
    { id: 'other', label: 'Outro motivo' },
  ];

  const toggleReason = (reasonId: string) => {
    if (selectedReasons.includes(reasonId)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reasonId));
    } else {
      setSelectedReasons([...selectedReasons, reasonId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReasons.length === 0) {
      alert('Por favor, selecione pelo menos um motivo para o reporte.');
      return;
    }
    console.log('Report submitted:', { selectedReasons, additionalInfo });
    alert('Obrigado! Seu reporte foi enviado e será analisado pela nossa equipe.');
    onClose();
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
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 1100,
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
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: tokens.space.xl }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.space.md }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>
              Reportar Perfil
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                backgroundColor: "#f3f4f6",
                color: "#6b7280",
                border: "none",
                borderRadius: tokens.radii.full,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </motion.button>
          </div>
          <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
            Você está reportando o perfil de <strong>{professionalName}</strong>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Reasons */}
          <div style={{ marginBottom: tokens.space.xl }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.md, color: tokens.colors.text }}>
              Motivo do reporte *
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.sm }}>
              {reportReasons.map((reason) => (
                <motion.div
                  key={reason.id}
                  whileHover={{ backgroundColor: tokens.colors.bg }}
                  onClick={() => toggleReason(reason.id)}
                  style={{
                    padding: tokens.space.md,
                    border: `2px solid ${selectedReasons.includes(reason.id) ? tokens.colors.primary : tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: tokens.space.md,
                    backgroundColor: selectedReasons.includes(reason.id) ? tokens.colors.primaryLighter : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: `2px solid ${selectedReasons.includes(reason.id) ? tokens.colors.primary : tokens.colors.border}`,
                    backgroundColor: selectedReasons.includes(reason.id) ? tokens.colors.primary : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {selectedReasons.includes(reason.id) && <Check size={14} color="white" />}
                  </div>
                  <span style={{ fontSize: 14, color: tokens.colors.text, fontWeight: selectedReasons.includes(reason.id) ? 600 : 400 }}>
                    {reason.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div style={{ marginBottom: tokens.space.xl }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: tokens.space.sm, color: tokens.colors.text }}>
              Informações adicionais (opcional)
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Descreva mais detalhes sobre o problema..."
              rows={4}
              style={{
                width: '100%',
                padding: tokens.space.md,
                border: `2px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.md,
                fontSize: 14,
                color: tokens.colors.text,
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: tokens.space.md }}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              style={{
                flex: 1,
                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                backgroundColor: tokens.colors.bg,
                color: tokens.colors.text,
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: tokens.radii.md,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancelar
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: tokens.radii.md,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.space.sm,
              }}
            >
              <Flag size={18} />
              Enviar Reporte
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Modal Component
function ProfessionalModal({ professional, onClose }: { professional: any; onClose: () => void }) {
  const [isReviewing, setIsReviewing] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [localReviews, setLocalReviews] = useState(professional?.reviewsList || []);
  const [showReportModal, setShowReportModal] = useState(false);

  // Update local reviews if prop changes
  useEffect(() => {
    if (professional) {
      setLocalReviews(professional.reviewsList || []);
    }
  }, [professional]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    const review = {
      user: "Você", // Mock user name
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setLocalReviews([review, ...localReviews]);
    setNewReview({ rating: 5, comment: '' });
    setIsReviewing(false);
  };

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
          {/* Action Buttons */}
          <div style={{
            position: "absolute",
            top: tokens.space.lg,
            right: tokens.space.lg,
            display: "flex",
            gap: tokens.space.sm,
            zIndex: 10,
          }}>
            {/* Report Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReportModal(true)}
              style={{
                backgroundColor: "#374151",
                color: "#ffffff",
                border: "none",
                borderRadius: tokens.radii.full,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
              title="Reportar perfil"
            >
              <Flag size={20} />
            </motion.button>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              style={{
                backgroundColor: "#374151",
                color: "#ffffff",
                border: "none",
                borderRadius: tokens.radii.full,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              <X size={22} />
            </motion.button>
          </div>

          {/* Header com Banner e Avatar */}
          <div style={{ position: "relative" }}>
            {/* Banner */}
            <div
              style={{
                height: 150,
                background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                borderRadius: `${tokens.radii.xl}px ${tokens.radii.xl}px 0 0`,
              }}
            />
            {/* Avatar */}
            <div
              style={{
                position: "absolute",
                bottom: -50,
                left: tokens.space.xl,
                width: 120,
                height: 120,
                borderRadius: tokens.radii.full,
                border: "4px solid white",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: "white"
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
          <div style={{ padding: tokens.space.xxl, paddingTop: 60 }}>
            {/* Title Section */}
            <div style={{ marginBottom: tokens.space.xl }}>
              <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: tokens.space.xs, color: tokens.colors.text, display: 'flex', alignItems: 'center', gap: 10 }}>
                {professional.name}
                {professional.verified ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: 20 }}>
                    <BadgeCheck size={18} fill="#0284c7" color="white" /> Verificado
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, background: '#f3f4f6', color: '#6b7280', padding: '4px 10px', borderRadius: 20 }}>
                    <ShieldAlert size={18} /> Não Verificado
                  </div>
                )}
              </h2>
              <p style={{ fontSize: 18, color: tokens.colors.textMuted, marginBottom: tokens.space.md }}>{professional.specialty}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.space.md }}>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, color: tokens.colors.text }}>
                  <MapPin size={18} color={tokens.colors.primary} />
                  {professional.location}
                </div>
                {professional.isRemote && (
                  <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, color: tokens.colors.text }}>
                    <div style={{ width: 1, height: 20, background: tokens.colors.border }} />
                    <Video size={18} color={tokens.colors.primary} />
                    Atendimento Remoto
                  </div>
                )}
              </div>
            </div>

            {/* Address & Map Link */}
            {professional.address && (
              <div style={{
                marginBottom: tokens.space.xl,
                padding: tokens.space.lg,
                background: tokens.colors.bg,
                borderRadius: tokens.radii.md,
                border: `1px solid ${tokens.colors.border}`
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>Endereço</h3>
                <p style={{ margin: 0, marginBottom: tokens.space.md, color: tokens.colors.text }}>{professional.address}</p>
                <div style={{
                  height: 200,
                  background: '#e5e7eb',
                  borderRadius: tokens.radii.md,
                  overflow: 'hidden'
                }}>
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
                  <span style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.text }}>{professional.rating}</span>
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 600 }}>
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
                  <span style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text }}>{professional.experience}</span>
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 600 }}>de experiência</p>
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
                  <span style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.text }}>Tabela de Preços</span>
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 500 }}>
                  Consulta: {professional.price} <br />
                  Retorno: R$ 150 (Est.)
                </p>
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
                    <Check size={18} color={tokens.colors.primary} strokeWidth={3} />
                    <span style={{ fontSize: 14, color: tokens.colors.text }}>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabela de Preços */}
            <div style={{ marginBottom: tokens.space.xxl }}>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: tokens.space.lg,
                  color: tokens.colors.text,
                }}
              >
                Tabela de Preços
              </h3>
              <div
                style={{
                  padding: tokens.space.xl,
                  backgroundColor: tokens.colors.bg,
                  borderRadius: tokens.radii.lg,
                  border: `1px solid ${tokens.colors.border}`,
                }}
              >
                {/* Exemplo de tabela de preços - pode ser personalizado por cada profissional */}
                <div style={{ display: 'grid', gap: tokens.space.lg }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: tokens.space.md, borderBottom: `1px solid ${tokens.colors.border}` }}>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.text, marginBottom: 4 }}>Consulta Inicial</p>
                      <p style={{ fontSize: 13, color: tokens.colors.textMuted }}>Primeira avaliação completa (60 min)</p>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.primary }}>{professional.price}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: tokens.space.md, borderBottom: `1px solid ${tokens.colors.border}` }}>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.text, marginBottom: 4 }}>Consulta de Retorno</p>
                      <p style={{ fontSize: 13, color: tokens.colors.textMuted }}>Acompanhamento e ajustes (40 min)</p>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.primary }}>R$ 150-200</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.text, marginBottom: 4 }}>Pacote Mensal</p>
                      <p style={{ fontSize: 13, color: tokens.colors.textMuted }}>4 consultas + acompanhamento via WhatsApp</p>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.primary }}>R$ 800-1200</span>
                  </div>
                </div>

                {/* Área para imagem da tabela de preços (se o profissional preferir usar uma imagem) */}
                {professional.priceTableImage && (
                  <div style={{ marginTop: tokens.space.xl }}>
                    <img
                      src={professional.priceTableImage}
                      alt="Tabela de preços"
                      style={{
                        width: '100%',
                        maxWidth: 600,
                        height: 'auto',
                        borderRadius: tokens.radii.md,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Portfólio ou Vídeo */}
            {(professional.portfolio.length > 0 || professional.video) && (
              <div style={{ marginBottom: tokens.space.xxl }}>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: tokens.space.lg,
                    color: tokens.colors.text,
                  }}
                >
                  {professional.video ? 'Vídeo de Apresentação' : 'Portfólio'}
                </h3>

                {professional.video ? (
                  <div style={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 Aspect Ratio
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: tokens.radii.lg,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}>
                    <iframe
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0
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
                      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
                )}
              </div>
            )}

            {/* Avaliações */}
            {/* Avaliações */}
            <div style={{ marginBottom: tokens.space.xxl }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.space.lg }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text }}>
                  Avaliações
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={16} fill={tokens.colors.primary} color={tokens.colors.primary} />
                  <span style={{ fontWeight: 700, color: tokens.colors.text }}>{professional.rating}</span>
                  <span style={{ color: tokens.colors.text }}>({professional.reviews})</span>
                </div>
              </div>

              {/* Botão Avaliar */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  marginBottom: tokens.space.lg,
                  borderRadius: tokens.radii.md,
                  border: `1px solid ${tokens.colors.primary}`,
                  backgroundColor: 'transparent',
                  color: tokens.colors.primary,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s'
                }}
                onClick={() => setIsReviewing(!isReviewing)}
              >
                <Star size={16} fill='none' />
                Avaliar este profissional
              </motion.button>

              {/* Review Form */}
              <AnimatePresence>
                {isReviewing && (
                  <motion.form
                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginBottom: tokens.space.xl }}
                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                    style={{ overflow: 'hidden' }}
                    onSubmit={handleSubmitReview}
                  >
                    <div style={{
                      padding: tokens.space.lg,
                      backgroundColor: '#f9fafb',
                      borderRadius: tokens.radii.md,
                      border: `1px solid ${tokens.colors.border}`
                    }}>
                      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: tokens.colors.text }}>Sua nota:</p>
                      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <motion.button
                            key={s}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setNewReview({ ...newReview, rating: s })}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2 }}
                          >
                            <Star size={24} fill={s <= newReview.rating ? '#eab308' : '#e5e7eb'} color={s <= newReview.rating ? '#eab308' : '#9ca3af'} />
                          </motion.button>
                        ))}
                      </div>

                      <textarea
                        placeholder="Conte sua experiência com este profissional..."
                        rows={3}
                        value={newReview.comment}
                        onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                        style={{
                          width: '100%',
                          padding: 12,
                          borderRadius: tokens.radii.md,
                          border: `1px solid ${tokens.colors.border}`,
                          fontSize: 14,
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          marginBottom: 12,
                          color: tokens.colors.text
                        }}
                        className="textarea-placeholder"
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
                        <button
                          type="button"
                          onClick={() => setIsReviewing(false)}
                          style={{
                            backgroundColor: 'transparent',
                            color: '#4b5563',
                            border: 'none',
                            padding: 0,
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: 'pointer'
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          style={{
                            backgroundColor: tokens.colors.primary,
                            color: 'white',
                            border: 'none',
                            padding: '8px 20px',
                            borderRadius: tokens.radii.md,
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 6
                          }}
                        >
                          <Send size={14} /> Enviar Avaliação
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div style={{ display: "grid", gap: tokens.space.md }}>
                {localReviews.length === 0 ? (
                  <p style={{ color: tokens.colors.textMuted, fontStyle: 'italic' }}>Este profissional ainda não possui avaliações. Seja o primeiro!</p>
                ) : (
                  localReviews.map((review: any, index: number) => (
                    <div key={index} style={{ padding: tokens.space.md, borderBottom: `1px solid ${tokens.colors.border}`, display: 'flex', gap: 16 }}>
                      {/* Avatar Placeholder */}
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e0f2fe',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: tokens.colors.primary, fontWeight: 700, fontSize: 16, flexShrink: 0
                      }}>
                        {review.user ? review.user.charAt(0).toUpperCase() : 'A'}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, color: tokens.colors.text, fontSize: 15 }}>{review.user}</span>
                          <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>{review.date}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12}
                              fill={i < review.rating ? '#eab308' : 'transparent'}
                              color={i < review.rating ? '#eab308' : '#d1d5db'}
                            />
                          ))}
                        </div>
                        <p style={{ fontSize: 14, color: tokens.colors.text, lineHeight: 1.5 }}>
                          {review.comment}
                        </p>
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
                  <span style={{ fontSize: 15, color: tokens.colors.text }}>{professional.contact.phone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Mail size={18} color={tokens.colors.primary} />
                  <span style={{ fontSize: 15, color: tokens.colors.text }}>{professional.contact.email}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Instagram size={18} color={tokens.colors.primary} />
                  <span style={{ fontSize: 15, color: tokens.colors.text }}>{professional.contact.instagram}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                  <Globe size={18} color={tokens.colors.primary} />
                  <span style={{ fontSize: 15, color: tokens.colors.text }}>{professional.contact.website}</span>
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

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          professionalName={professional.name}
        />
      )}
    </AnimatePresence>
  );
}

// ============================================================
// MODAIS LEGADOS REMOVIDOS
// ============================================================
// AuthModal e RegisterModal foram substituídos por rotas dedicadas:
// - Cadastro: /profissionais/cadastro (wizard step-by-step)
// - Dashboard: /profissionais/dashboard (painel do profissional)
// ============================================================

// Main Component
export default function ProfessionalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredProfessionals = React.useMemo(() => {
    let filtered = selectedCategory === "todos"
      ? professionalsData
      : professionalsData.filter((p) => p.category === selectedCategory);

    if (showVerifiedOnly) {
      filtered = filtered.filter(p => p.verified);
    }
    return filtered;
  }, [selectedCategory, showVerifiedOnly]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: tokens.colors.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <Navbar />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Resultados e Filtro */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: `${tokens.space.xl}px ${tokens.space.xl}px 0`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 600, color: tokens.colors.text }}>
          {filteredProfessionals.length} profissionais encontrados
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label htmlFor="verifiedFilter" style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.text }}>Filtrar:</label>
          <select
            value={showVerifiedOnly ? "verified" : "all"}
            onChange={(e) => setShowVerifiedOnly(e.target.value === "verified")}
            style={{
              padding: "8px 12px",
              borderRadius: tokens.radii.md,
              border: `1px solid ${tokens.colors.border}`,
              backgroundColor: "white",
              fontSize: 14,
              fontWeight: 500,
              color: tokens.colors.text,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">Todos os Profissionais</option>
            <option value="verified">Somente Verificados</option>
          </select>
        </div>
      </div>

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

      {/* Modals removidos - usando rotas dedicadas:
          - Cadastro: /profissionais/cadastro
          - Dashboard: /profissionais/dashboard
      */}

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

        .textarea-placeholder::placeholder {
          color: #6b7280;
          opacity: 1;
        }

        input:focus,
        textarea:focus,
        select:focus {
          outline: 2px solid ${tokens.colors.primary};
          outline-offset: 2px;
        }

        input::placeholder,
        textarea::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
