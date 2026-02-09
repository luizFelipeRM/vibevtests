"use client";
import { useState } from "react";

export default function DashboardCompleto() {
  const [userType] = useState<"professional" | "client">("professional");
  const [activeTab, setActiveTab] = useState("perfil");
  const [editMode, setEditMode] = useState(false);

  // DADOS COMPLETOS DO PROFISSIONAL (todos os campos do cadastro)
  const [professionalData, setProfessionalData] = useState({
    // Básico
    name: "Dra. Ana Silva",
    username: "dra-ana-silva",
    email: "dra.ana@email.com",

    // Categoria e especialização
    category: "Nutricionista",
    customCategory: "",
    specialty: "Nutrição Clínica Vegana",

    // Localização
    city: "São Paulo, SP",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    remote: true,

    // Experiência e valores
    experience: "8 anos",
    priceRange: "R$ 300-400",

    // Bio
    bio: "Especialista em nutrição esportiva para atletas veganos. Foco em performance e ganho de massa muscular. Atendimento personalizado com acompanhamento completo.",

    // Contatos
    phone: "(11) 99999-8888",
    contactEmail: "dra.ana@email.com",
    instagram: "@dra.anasilva",
    website: "www.draanasilva.com.br",

    // Mídia
    profilePicture: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    coverPicture: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200",
    portfolio: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600",
    ],

    // Serviços
    services: ["Consulta Online", "Plano Alimentar", "Suplementação", "Acompanhamento Mensal"],

    // Tabela de preços
    priceTable: [
      { service: "Consulta inicial", price: "R$ 350", description: "Primeira avaliação completa" },
      { service: "Retorno", price: "R$ 250", description: "Consultas de acompanhamento" },
      { service: "Plano alimentar", price: "R$ 400", description: "Plano personalizado com receitas" },
    ],

    // Status
    verified: true,
    rating: 4.9,
    totalReviews: 127,
    profileViews: 2847,
    messagesCount: 23,
    consultasAgendadas: 18,
    memberSince: "Janeiro 2024",

    // Avaliações recebidas
    receivedReviews: [
      {
        id: 1,
        clientName: "Carlos Oliveira",
        clientImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        rating: 5,
        comment: "Excelente profissional! Mudou minha performance nos treinos. Plano alimentar muito bem estruturado.",
        date: "15 Mai 2024",
      },
      {
        id: 2,
        clientName: "Fernanda Lima",
        clientImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda",
        rating: 5,
        comment: "Muito atenciosa e profissional. Me ajudou muito na transição para o veganismo.",
        date: "10 Jun 2024",
      },
      {
        id: 3,
        clientName: "João Silva",
        clientImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
        rating: 4,
        comment: "Ótima consulta, mas a agenda é um pouco cheia. Recomendo!",
        date: "05 Jul 2024",
      },
    ],

    // Mensagens
    messages: [
      {
        id: 1,
        senderName: "Carlos Oliveira",
        senderImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        message: "Olá Dra. Ana! Gostaria de agendar uma consulta para a próxima semana. Você tem disponibilidade?",
        time: "Há 2 horas",
        unread: true,
      },
      {
        id: 2,
        senderName: "Fernanda Lima",
        senderImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda",
        message: "Obrigada pelo plano alimentar! Já estou vendo resultados incríveis!",
        time: "Há 5 horas",
        unread: true,
      },
      {
        id: 3,
        senderName: "João Silva",
        senderImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
        message: "Oi! Preciso fazer uma pequena alteração no meu plano. Podemos conversar?",
        time: "Ontem",
        unread: false,
      },
    ],
  });

  const [clientData, setClientData] = useState({
    name: "João Silva",
    username: "joao-silva",
    email: "joao@email.com",
    phone: "(11) 98888-7777",
    city: "São Paulo, SP",
    instagram: "@joaosilva",
    memberSince: "Janeiro 2024",
    favoriteProfessionals: 12,
    totalReviews: 5,
    consultationsCompleted: 8,
    messagesCount: 3,
    favorites: [
      {
        id: 1,
        name: "Dra. Ana Silva",
        username: "dra-ana-silva",
        specialty: "Nutrição Clínica Vegana",
        location: "São Paulo, SP",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
        verified: true,
      },
      {
        id: 2,
        name: "Dr. Carlos Mendes",
        username: "dr-carlos-mendes",
        specialty: "Clínico Geral",
        location: "Rio de Janeiro, RJ",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
        verified: true,
      },
    ],
    myReviews: [
      {
        id: 1,
        professionalName: "Dra. Ana Silva",
        professionalUsername: "dra-ana-silva",
        rating: 5,
        comment: "Excelente profissional! Mudou completamente minha relação com a alimentação vegana.",
        date: "15 Mai 2024",
        professionalImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
      },
      {
        id: 2,
        professionalName: "Dr. Carlos Mendes",
        professionalUsername: "dr-carlos-mendes",
        rating: 4,
        comment: "Muito atencioso e bem informado sobre nutrição vegana. Recomendo!",
        date: "10 Jun 2024",
        professionalImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
      },
    ],
    messages: [
      {
        id: 1,
        senderName: "Dra. Ana Silva",
        senderImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
        message: "Olá João! Seu plano alimentar está pronto. Vamos agendar um retorno para avaliar os resultados?",
        time: "Há 1 hora",
        unread: true,
      },
      {
        id: 2,
        senderName: "Dr. Carlos Mendes",
        senderImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
        message: "Parabéns pelos resultados dos seus exames! Continue assim.",
        time: "Há 3 horas",
        unread: false,
      },
      {
        id: 3,
        senderName: "GuiaVegano",
        senderImage: "https://api.dicebear.com/7.x/shapes/svg?seed=guiavegano",
        message: "Você tem uma consulta agendada para amanhã às 14h com Dra. Ana Silva.",
        time: "Ontem",
        unread: false,
      },
    ],
  });

  const currentData = userType === "professional" ? professionalData : clientData;
  const setCurrentData = userType === "professional" ? setProfessionalData : setClientData;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      display: "flex",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: 280,
        backgroundColor: "white",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}>🌱</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>GuiaVegano</div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>
                {userType === "professional" ? "PAINEL PROFISSIONAL" : "PAINEL CLIENTE"}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: 20, borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <img
                src={userType === "professional" ? professionalData.profilePicture : "https://api.dicebear.com/7.x/avataaars/svg?seed=client"}
                alt={currentData.name}
                style={{ width: 56, height: 56, borderRadius: "50%", border: "3px solid #10b981", objectFit: "cover" }}
              />
              {userType === "professional" && professionalData.verified && (
                <div style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 20,
                  height: 20,
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                  border: "2px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                }}>✓</div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {currentData.name}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                @{currentData.username}
              </div>
            </div>
          </div>
        </div>

        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {(userType === "professional" ? [
            { id: "overview", label: "Visão Geral", icon: "📊" },
            { id: "perfil", label: "Editar Perfil", icon: "✏️" },
            { id: "midia", label: "Fotos & Mídia", icon: "📸" },
            { id: "servicos", label: "Serviços & Preços", icon: "💼" },
            { id: "consultas", label: "Consultas", icon: "📅", badge: professionalData.consultasAgendadas },
            { id: "avaliacoes", label: "Avaliações", icon: "⭐", badge: professionalData.totalReviews },
            { id: "mensagens", label: "Mensagens", icon: "💬", badge: professionalData.messagesCount },
            { id: "financeiro", label: "Financeiro", icon: "💰" },
            { id: "configuracoes", label: "Configurações", icon: "⚙️" },
          ] : [
            { id: "overview", label: "Visão Geral", icon: "📊" },
            { id: "perfil", label: "Meu Perfil", icon: "👤" },
            { id: "favoritos", label: "Profissionais Favoritos", icon: "❤️", badge: clientData.favoriteProfessionals },
            { id: "minhas-avaliacoes", label: "Minhas Avaliações", icon: "⭐", badge: clientData.totalReviews },
            { id: "consultas", label: "Minhas Consultas", icon: "📅", badge: clientData.consultationsCompleted },
            { id: "mensagens", label: "Mensagens", icon: "💬" },
            { id: "configuracoes", label: "Configurações", icon: "⚙️" },
          ]).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: "100%",
                padding: "12px 16px",
                marginBottom: 4,
                backgroundColor: activeTab === item.id ? "#f0fdf4" : "transparent",
                border: "none",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: activeTab === item.id ? 600 : 500,
                color: activeTab === item.id ? "#10b981" : "#475569",
                fontSize: 14,
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 12,
                  minWidth: 20,
                  textAlign: "center",
                }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "1px solid #e2e8f0" }}>
          <a
            href="/profissionais/login"
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              color: "#dc2626",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            🚪 Sair da Conta
          </a>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main style={{ flex: 1, overflowY: "auto", backgroundColor: "#f8fafc" }}>
        {/* SEPARADOR DE MODO */}
        <div style={{
          backgroundColor: userType === "professional" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          background: userType === "professional" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          padding: "16px 32px",
          borderBottom: "3px solid " + (userType === "professional" ? "#059669" : "#2563eb"),
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}>
              {userType === "professional" ? "💼" : "👤"}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: 1 }}>
                {userType === "professional" ? "🌟 MODO PROFISSIONAL" : "👥 MODO CLIENTE"}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>
                {userType === "professional"
                  ? "Gerencie seu perfil, consultas e avaliações recebidas"
                  : "Acesse seus favoritos, avaliações e consultas agendadas"}
              </div>
            </div>
          </div>
        </div>

        <header style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
          padding: "20px 32px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", margin: 0, marginBottom: 4 }}>
                {activeTab === "overview" && "Visão Geral"}
                {activeTab === "perfil" && (userType === "professional" ? "Editar Perfil" : "Meu Perfil")}
                {activeTab === "midia" && "Fotos & Mídia"}
                {activeTab === "servicos" && "Serviços & Preços"}
                {activeTab === "consultas" && "Consultas"}
                {activeTab === "avaliacoes" && "Avaliações Recebidas"}
                {activeTab === "mensagens" && "Mensagens"}
                {activeTab === "financeiro" && "Financeiro"}
                {activeTab === "configuracoes" && "Configurações"}
                {activeTab === "favoritos" && "Profissionais Favoritos"}
                {activeTab === "minhas-avaliacoes" && "Minhas Avaliações"}
              </h1>
              <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                {activeTab === "perfil" && "Mantenha suas informações sempre atualizadas"}
                {activeTab === "overview" && "Resumo das suas atividades"}
                {activeTab === "avaliacoes" && "Veja o que seus clientes estão dizendo sobre você"}
                {activeTab === "mensagens" && "Converse com seus clientes e profissionais"}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href={`/profissionais/${professionalData.username}`}
                target="_blank"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f1f5f9",
                  color: "#0f172a",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                👁️ Ver Perfil Público
              </a>
              {activeTab === "perfil" && (
                <button
                  onClick={() => setEditMode(!editMode)}
                  style={{
                    padding: "10px 20px",
                    background: editMode ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "#f1f5f9",
                    color: editMode ? "white" : "#0f172a",
                    border: editMode ? "none" : "1px solid #e2e8f0",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: editMode ? "0 4px 12px rgba(16, 185, 129, 0.3)" : "none",
                  }}
                >
                  {editMode ? "✓ Salvar Alterações" : "✏️ Editar"}
                </button>
              )}
            </div>
          </div>
        </header>

        <div style={{ padding: 32 }}>
          {activeTab === "overview" && <OverviewTab data={userType === "professional" ? professionalData : clientData} userType={userType} />}
          {activeTab === "perfil" && userType === "professional" && <PerfilTab data={professionalData} setData={setProfessionalData} editMode={editMode} />}
          {activeTab === "perfil" && userType === "client" && <PerfilClienteTab data={clientData} setData={setClientData} />}
          {activeTab === "midia" && <MidiaTab data={professionalData} setData={setProfessionalData} />}
          {activeTab === "servicos" && <ServicosTab data={professionalData} setData={setProfessionalData} />}
          {activeTab === "avaliacoes" && <AvaliacoesRecebidasTab data={professionalData} />}
          {activeTab === "mensagens" && <MensagensTab data={userType === "professional" ? professionalData : clientData} userType={userType} />}
          {activeTab === "favoritos" && <FavoritosTab data={clientData} />}
          {activeTab === "minhas-avaliacoes" && <MinhasAvaliacoesTab data={clientData} />}
        </div>
      </main>
    </div>
  );
}

// ABA: Visão Geral
function OverviewTab({ data, userType }: any) {
  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20,
        marginBottom: 32,
      }}>
        {userType === "professional" ? (
          <>
            <StatCard icon="👁️" title="Visualizações (30d)" value={data.profileViews?.toLocaleString() || "0"} change="+23%" color="#3b82f6" />
            <StatCard icon="⭐" title="Avaliação Média" value={data.rating || "0"} subtitle={`${data.totalReviews || 0} avaliações`} color="#f59e0b" />
            <StatCard icon="📅" title="Consultas Agendadas" value={data.consultasAgendadas || 0} change="+12%" color="#8b5cf6" />
            <StatCard icon="💬" title="Mensagens" value={data.messagesCount || 0} subtitle="Responde em 2h" color="#10b981" />
          </>
        ) : (
          <>
            <StatCard icon="❤️" title="Profissionais Favoritos" value={data.favoriteProfessionals || 0} color="#ef4444" />
            <StatCard icon="⭐" title="Avaliações Feitas" value={data.totalReviews || 0} color="#f59e0b" />
            <StatCard icon="📅" title="Consultas Realizadas" value={data.consultationsCompleted || 0} color="#8b5cf6" />
            <StatCard icon="💬" title="Mensagens" value={data.messagesCount || 0} color="#10b981" />
          </>
        )}
      </div>

      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>🎯 Ações Rápidas</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {(userType === "professional"
            ? ["Editar Perfil", "Atualizar Fotos", "Gerenciar Serviços", "Ver Mensagens"]
            : ["Buscar Profissionais", "Meus Favoritos", "Minhas Avaliações", "Ver Mensagens"]
          ).map((action, idx) => (
            <button
              key={idx}
              style={{
                padding: "16px 20px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ABA: Editar Perfil (TODOS OS CAMPOS)
function PerfilTab({ data, setData, editMode }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Informações Básicas */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>📝 Informações Básicas</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="Nome Completo" value={data.name} editMode={editMode} onChange={(v) => setData({...data, name: v})} />
          <Field label="Username" value={data.username} editMode={editMode} onChange={(v) => setData({...data, username: v})} prefix="@" />
          <Field label="E-mail" value={data.email} editMode={editMode} type="email" disabled />
          <Field label="Categoria" value={data.category} editMode={editMode} onChange={(v) => setData({...data, category: v})} />
          <Field label="Especialidade" value={data.specialty} editMode={editMode} onChange={(v) => setData({...data, specialty: v})} fullWidth />
        </div>
      </div>

      {/* Localização */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>📍 Localização</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="Cidade/Estado" value={data.city} editMode={editMode} onChange={(v) => setData({...data, city: v})} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 28 }}>
            <input
              type="checkbox"
              checked={data.remote}
              disabled={!editMode}
              onChange={(e) => setData({...data, remote: e.target.checked})}
              style={{ width: 20, height: 20 }}
            />
            <label style={{ fontSize: 14, fontWeight: 500, color: "#0f172a" }}>Atendimento remoto</label>
          </div>
          <Field label="Endereço Completo" value={data.address} editMode={editMode} onChange={(v) => setData({...data, address: v})} fullWidth style={{ gridColumn: "1 / -1" }} />
        </div>
      </div>

      {/* Experiência e Valores */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>💼 Experiência & Valores</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="Tempo de Experiência" value={data.experience} editMode={editMode} onChange={(v) => setData({...data, experience: v})} placeholder="Ex: 8 anos" />
          <Field label="Faixa de Preço" value={data.priceRange} editMode={editMode} onChange={(v) => setData({...data, priceRange: v})} placeholder="Ex: R$ 300-400" />
        </div>
      </div>

      {/* Bio */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>✍️ Sobre Você</h2>
        <textarea
          value={data.bio}
          disabled={!editMode}
          onChange={(e) => setData({...data, bio: e.target.value})}
          placeholder="Conte sobre sua experiência, especialidades e diferenciais..."
          rows={5}
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "2px solid #e2e8f0",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
            resize: "vertical",
            backgroundColor: editMode ? "white" : "#f8fafc",
          }}
        />
      </div>

      {/* Contatos */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>📞 Contatos</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="Telefone/WhatsApp" value={data.phone} editMode={editMode} onChange={(v) => setData({...data, phone: v})} placeholder="(11) 99999-9999" />
          <Field label="E-mail de Contato" value={data.contactEmail} editMode={editMode} onChange={(v) => setData({...data, contactEmail: v})} />
          <Field label="Instagram" value={data.instagram} editMode={editMode} onChange={(v) => setData({...data, instagram: v})} placeholder="@seu_usuario" />
          <Field label="Website" value={data.website} editMode={editMode} onChange={(v) => setData({...data, website: v})} placeholder="www.seusite.com" />
        </div>
      </div>

      {/* Status */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>🎖️ Status da Conta</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <InfoBox label="Status" value={data.verified ? "✅ Verificado" : "⏳ Pendente"} color={data.verified ? "#10b981" : "#f59e0b"} />
          <InfoBox label="Avaliação" value={`⭐ ${data.rating}`} color="#f59e0b" />
          <InfoBox label="Membro desde" value={data.memberSince} color="#64748b" />
        </div>
      </div>
    </div>
  );
}

// ABA: Fotos & Mídia
function MidiaTab({ data, setData }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Foto de Perfil */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>📸 Foto de Perfil</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={data.profilePicture} alt="Perfil" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: "4px solid #e2e8f0" }} />
          <div>
            <button style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 12,
            }}>
              📤 Upload Nova Foto
            </button>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Recomendado: 400x400px, JPG ou PNG</p>
          </div>
        </div>
      </div>

      {/* Foto de Capa */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🖼️ Foto de Capa</h2>
        <div style={{ marginBottom: 16 }}>
          <img src={data.coverPicture} alt="Capa" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12 }} />
        </div>
        <button style={{
          padding: "12px 24px",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontWeight: 600,
          cursor: "pointer",
        }}>
          📤 Upload Nova Capa
        </button>
        <p style={{ fontSize: 13, color: "#64748b", marginTop: 12 }}>Recomendado: 1200x400px, JPG ou PNG</p>
      </div>

      {/* Portfólio */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>🎨 Portfólio</h2>
          <button style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 14,
          }}>
            ➕ Adicionar Fotos
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {data.portfolio.map((img: string, idx: number) => (
            <div key={idx} style={{ position: "relative", paddingTop: "75%", borderRadius: 12, overflow: "hidden" }}>
              <img src={img} alt={`Portfolio ${idx + 1}`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <button style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
              }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ABA: Serviços & Preços
function ServicosTab({ data, setData }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Serviços */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>💼 Serviços Oferecidos</h2>
          <button style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 14,
          }}>
            ➕ Adicionar Serviço
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.services.map((service: string, idx: number) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", backgroundColor: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{service}</span>
              <button style={{ padding: "6px 12px", backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>✏️</button>
              <button style={{ padding: "6px 12px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela de Preços */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>💰 Tabela de Preços</h2>
          <button style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 14,
          }}>
            ➕ Adicionar Preço
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {data.priceTable.map((item: any, idx: number) => (
            <div key={idx} style={{ padding: 20, backgroundColor: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>{item.service}</div>
                  <div style={{ fontSize: 14, color: "#64748b" }}>{item.description}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#10b981", marginLeft: 20 }}>{item.price}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button style={{ padding: "6px 16px", backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>✏️ Editar</button>
                <button style={{ padding: "6px 16px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>🗑️ Remover</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function StatCard({ icon, title, value, subtitle, change, color }: any) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: `${color}20`, borderRadius: "50%", opacity: 0.5 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontSize: 14, color: "#64748b", marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{value}</div>
        {change && <div style={{ fontSize: 13, color: "#10b981", fontWeight: 600 }}>↑ {change} vs mês anterior</div>}
        {subtitle && <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

function Field({ label, value, editMode, onChange, type = "text", disabled = false, placeholder = "", prefix = "", fullWidth = false, style = {} }: any) {
  return (
    <div style={{ ...style, ...(fullWidth ? { gridColumn: "1 / -1" } : {}) }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748b", marginBottom: 8, textTransform: "uppercase" }}>{label}</label>
      <div style={{ position: "relative" }}>
        {prefix && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: 14 }}>{prefix}</span>}
        <input
          type={type}
          value={value}
          disabled={disabled || !editMode}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: prefix ? "12px 14px 12px 32px" : "12px 14px",
            border: "2px solid #e2e8f0",
            borderRadius: 10,
            fontSize: 14,
            backgroundColor: (disabled || !editMode) ? "#f8fafc" : "white",
            color: "#0f172a",
            fontWeight: 500,
          }}
        />
      </div>
    </div>
  );
}

function InfoBox({ label, value, color }: any) {
  return (
    <div style={{ padding: 16, backgroundColor: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

// ABA: Favoritos (Cliente)
function FavoritosTab({ data }: any) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#0f172a" }}>
        ❤️ Meus Profissionais Favoritos
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.favorites.map((prof: any) => (
          <a
            key={prof.id}
            href={`/profissionais/${prof.username}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: 20,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#10b981";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={prof.image}
                alt={prof.name}
                style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid #10b981" }}
              />
              {prof.verified && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 24,
                  height: 24,
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                  border: "2px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                }}>✓</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                {prof.name}
              </div>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>
                {prof.specialty}
              </div>
              <div style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 8 }}>
                <span>📍 {prof.location}</span>
                <span>⭐ {prof.rating}</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                alert("Remover dos favoritos");
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              🗑️ Remover
            </button>
          </a>
        ))}
      </div>
    </div>
  );
}

// ABA: Minhas Avaliações (Cliente)
function MinhasAvaliacoesTab({ data }: any) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#0f172a" }}>
        ⭐ Minhas Avaliações
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {data.myReviews.map((review: any) => (
          <div
            key={review.id}
            style={{
              padding: 24,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <img
                src={review.professionalImage}
                alt={review.professionalName}
                style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <a
                  href={`/profissionais/${review.professionalUsername}`}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0f172a",
                    textDecoration: "none",
                    marginBottom: 4,
                    display: "block",
                  }}
                >
                  {review.professionalName}
                </a>
                <div style={{ fontSize: 13, color: "#64748b" }}>{review.date}</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ fontSize: 20, color: i < review.rating ? "#f59e0b" : "#e5e7eb" }}>
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <p style={{ fontSize: 15, color: "#0f172a", lineHeight: 1.6, margin: 0, marginBottom: 16 }}>
              {review.comment}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                ✏️ Editar
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ABA: Avaliações Recebidas (Profissional)
function AvaliacoesRecebidasTab({ data }: any) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, marginBottom: 4, color: "#0f172a" }}>
            ⭐ Avaliações Recebidas
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
            Avaliação média: <strong style={{ color: "#f59e0b" }}>{data.rating} estrelas</strong> ({data.totalReviews} avaliações)
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {data.receivedReviews?.map((review: any) => (
          <div
            key={review.id}
            style={{
              padding: 24,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <img
                src={review.clientImage}
                alt={review.clientName}
                style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: "3px solid #e2e8f0" }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                  {review.clientName}
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{review.date}</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ fontSize: 20, color: i < review.rating ? "#f59e0b" : "#e5e7eb" }}>
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <p style={{ fontSize: 15, color: "#0f172a", lineHeight: 1.6, margin: 0 }}>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ABA: Mensagens (Ambos os modos)
function MensagensTab({ data, userType }: any) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#0f172a" }}>
          💬 Mensagens
        </h2>
        <button style={{
          padding: "10px 20px",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontWeight: 600,
          cursor: "pointer",
          fontSize: 14,
        }}>
          ✉️ Nova Mensagem
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.messages?.map((message: any) => (
          <div
            key={message.id}
            style={{
              padding: 20,
              backgroundColor: message.unread ? "#f0fdf4" : "#f8fafc",
              borderRadius: 12,
              border: message.unread ? "2px solid #10b981" : "1px solid #e2e8f0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#10b981";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = message.unread ? "#10b981" : "#e2e8f0";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative" }}>
                <img
                  src={message.senderImage}
                  alt={message.senderName}
                  style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }}
                />
                {message.unread && (
                  <div style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 16,
                    height: 16,
                    backgroundColor: "#ef4444",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                    {message.senderName}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>{message.time}</div>
                </div>
                <p style={{ fontSize: 14, color: "#475569", margin: 0, lineHeight: 1.5 }}>
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ABA: Perfil Cliente
function PerfilClienteTab({ data, setData }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Informações Básicas */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>📝 Informações Básicas</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="Nome Completo" value={data.name} editMode={false} />
          <Field label="Username" value={data.username} editMode={false} prefix="@" />
          <Field label="E-mail" value={data.email} editMode={false} type="email" disabled />
          <Field label="Telefone" value={data.phone} editMode={false} />
          <Field label="Cidade/Estado" value={data.city} editMode={false} />
          <Field label="Instagram" value={data.instagram} editMode={false} />
        </div>
      </div>

      {/* Status */}
      <div style={{ backgroundColor: "white", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>📊 Estatísticas</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <InfoBox label="Membro desde" value={data.memberSince} color="#64748b" />
          <InfoBox label="Profissionais Favoritos" value={data.favoriteProfessionals} color="#ef4444" />
          <InfoBox label="Consultas Realizadas" value={data.consultationsCompleted} color="#8b5cf6" />
        </div>
      </div>
    </div>
  );
}
