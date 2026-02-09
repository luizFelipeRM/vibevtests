export default function OK() {
  return (
    <html>
      <body style={{ margin: 0, padding: 50, fontFamily: "monospace", backgroundColor: "#e8f9e8" }}>
        <h1 style={{ color: "#048003" }}>✅ SERVIDOR FUNCIONANDO!</h1>
        <p>Se você está vendo isto, o Next.js está OK.</p>
        <hr />
        <p><a href="/profissionais/login">→ Ir para Login</a></p>
        <p><a href="/profissionais/dashboard">→ Ir para Dashboard</a></p>
        <hr />
        <p style={{ fontSize: 12, color: "#666" }}>
          Data: {new Date().toLocaleString('pt-BR')}
        </p>
      </body>
    </html>
  );
}
