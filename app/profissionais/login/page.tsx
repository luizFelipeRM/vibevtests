"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Leaf,
  ArrowRight
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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: tokens.colors.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: 'flex'
    }}>
      {/* Left Side - Image/Branding */}
      <div style={{
        flex: 1,
        background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
        padding: tokens.space.xxl,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          top: -100,
          right: -100
        }} />
        <div style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
          bottom: -50,
          left: -50
        }} />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: tokens.radii.md,
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <Leaf size={32} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>GuiaVegano</h1>
              <p style={{ fontSize: 14, opacity: 0.9, margin: 0 }}>Conectando profissionais veganos</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h2 style={{ fontSize: 42, fontWeight: 700, marginBottom: tokens.space.lg, lineHeight: 1.2 }}>
            Bem-vindo de volta! 👋
          </h2>
          <p style={{ fontSize: 18, opacity: 0.9, lineHeight: 1.6, maxWidth: 500 }}>
            Faça login para acessar sua conta, avaliar profissionais e conectar-se com a comunidade vegana.
          </p>

          <div style={{ marginTop: tokens.space.xxl, display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
            {[
              "🌱 Encontre profissionais veganos",
              "⭐ Avalie e comente",
              "💚 Salve seus favoritos",
              "📱 Acompanhe suas consultas"
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md }}
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'white'
                }} />
                <span style={{ fontSize: 16, opacity: 0.9 }}>{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontSize: 13,
            opacity: 0.7,
            position: 'relative',
            zIndex: 1
          }}
        >
          © 2024 GuiaVegano. Todos os direitos reservados.
        </motion.p>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        flex: 1,
        padding: tokens.space.xxl,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tokens.colors.surface
      }}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            width: '100%',
            maxWidth: 440
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: tokens.space.xxl }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: tokens.colors.text,
              marginBottom: tokens.space.sm
            }}>
              Login
            </h2>
            <p style={{
              fontSize: 15,
              color: tokens.colors.textMuted
            }}>
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>


          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: tokens.space.sm,
                color: tokens.colors.text
              }}>
                E-mail
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color={tokens.colors.textMuted} style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  style={{
                    width: '100%',
                    padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 46px`,
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 15,
                    color: tokens.colors.text,
                    transition: 'all 0.2s'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.space.sm }}>
                <label style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: tokens.colors.text
                }}>
                  Senha
                </label>
                <a href="#" style={{
                  fontSize: 13,
                  color: tokens.colors.primary,
                  textDecoration: 'none',
                  fontWeight: 600
                }}>
                  Esqueceu a senha?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={20} color={tokens.colors.textMuted} style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: `${tokens.space.md}px 46px`,
                    border: `2px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radii.md,
                    fontSize: 15,
                    color: tokens.colors.text,
                    transition: 'all 0.2s'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={tokens.colors.textMuted} />
                  ) : (
                    <Eye size={20} color={tokens.colors.textMuted} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.sm }}>
              <input
                type="checkbox"
                id="remember"
                style={{
                  width: 18,
                  height: 18,
                  cursor: 'pointer',
                  accentColor: tokens.colors.primary
                }}
              />
              <label htmlFor="remember" style={{
                fontSize: 14,
                color: tokens.colors.text,
                cursor: 'pointer'
              }}>
                Lembrar de mim
              </label>
            </div>

            {/* Submit Button */}
            <motion.a
              href="/profissionais/dashboard"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: `${tokens.space.lg}px`,
                background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: tokens.radii.md,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.space.sm,
                boxShadow: `0 4px 16px ${tokens.colors.primary}40`,
                marginTop: tokens.space.md,
                textDecoration: 'none'
              }}
            >
              Entrar
              <ArrowRight size={20} />
            </motion.a>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.space.md,
            marginTop: tokens.space.xxl,
            marginBottom: tokens.space.xxl
          }}>
            <div style={{ flex: 1, height: 1, backgroundColor: tokens.colors.border }} />
            <span style={{ fontSize: 13, color: tokens.colors.textMuted }}>ou</span>
            <div style={{ flex: 1, height: 1, backgroundColor: tokens.colors.border }} />
          </div>

          {/* Sign Up Link */}
          <div style={{
            padding: tokens.space.lg,
            backgroundColor: tokens.colors.bg,
            borderRadius: tokens.radii.md,
            textAlign: 'center'
          }}>
            <p style={{ fontSize: 14, color: tokens.colors.text, margin: 0 }}>
              Não tem uma conta?{' '}
              <a
                href="/profissionais/cadastro"
                style={{
                  color: tokens.colors.primary,
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Cadastre-se gratuitamente
              </a>
            </p>
          </div>

          {/* Back Link */}
          <div style={{ marginTop: tokens.space.lg, textAlign: 'center' }}>
            <a
              href="/profissionais"
              style={{
                fontSize: 14,
                color: tokens.colors.textMuted,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: tokens.space.xs
              }}
            >
              ← Voltar para início
            </a>
          </div>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        input::placeholder {
          color: #9ca3af !important;
        }

        input {
          color: #111827 !important;
        }

        input:focus {
          outline: 2px solid ${tokens.colors.primary};
          outline-offset: 2px;
          border-color: ${tokens.colors.primary} !important;
        }
      `}</style>
    </div>
  );
}
