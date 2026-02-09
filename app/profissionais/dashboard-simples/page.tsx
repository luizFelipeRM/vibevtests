export default function DashboardSimples() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fafafa",
      padding: 50,
      fontFamily: "system-ui, sans-serif",
    }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
        Dashboard do Profissional
      </h1>

      <p style={{ fontSize: 18, color: "#666", marginBottom: 32 }}>
        Bem-vindo ao seu painel! Esta é uma versão simplificada.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
        marginBottom: 32,
      }}>
        <div style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
        }}>
          <h3 style={{ margin: 0, marginBottom: 8 }}>Visualizações</h3>
          <p style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>1,234</p>
        </div>

        <div style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
        }}>
          <h3 style={{ margin: 0, marginBottom: 8 }}>Avaliação</h3>
          <p style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>4.9 ⭐</p>
        </div>

        <div style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
        }}>
          <h3 style={{ margin: 0, marginBottom: 8 }}>Mensagens</h3>
          <p style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>23</p>
        </div>
      </div>

      <a
        href="/profissionais/login"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#048003",
          color: "white",
          textDecoration: "none",
          borderRadius: 8,
          fontWeight: 600,
        }}
      >
        Voltar para Login
      </a>
    </div>
  );
}
