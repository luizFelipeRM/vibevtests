"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Check,
  ArrowLeft,
  Sparkles,
  Instagram,
  Heart
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

export default function ClientRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    instagram: "",
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      // Validar dados básicos
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem');
        return;
      }

      setStep(2);
    } else {
      console.log("Cadastro de cliente:", formData);
      alert("Cadastro realizado com sucesso! Bem-vindo ao GuiaVegano! 🌱");
      window.location.href = '/profissionais';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: tokens.colors.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: tokens.space.xl
    }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          backgroundColor: tokens.colors.surface,
          padding: tokens.space.xxl,
          borderRadius: tokens.radii.xl,
          maxWidth: 500,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: `1px solid ${tokens.colors.border}`
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: tokens.space.xxl }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: 80,
              height: 80,
              margin: '0 auto',
              marginBottom: tokens.space.lg,
              borderRadius: tokens.radii.full,
              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 24px ${tokens.colors.primary}40`
            }}
          >
            <Heart size={40} color="white" />
          </motion.div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.text, marginBottom: tokens.space.sm, margin: 0 }}>
            Junte-se à Comunidade
          </h1>
          <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
            Crie sua conta e conecte-se com profissionais veganos
          </p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: tokens.space.sm, marginBottom: tokens.space.xl }}>
          <div style={{
            flex: 1,
            height: 4,
            borderRadius: tokens.radii.full,
            backgroundColor: tokens.colors.primary
          }} />
          <div style={{
            flex: 1,
            height: 4,
            borderRadius: tokens.radii.full,
            backgroundColor: step === 2 ? tokens.colors.primary : tokens.colors.border
          }} />
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text
                }}>
                  Nome Completo *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color={tokens.colors.textMuted} style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      color: tokens.colors.text
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text
                }}>
                  E-mail *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color={tokens.colors.textMuted} style={{
                    position: 'absolute',
                    left: 12,
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
                      padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      color: tokens.colors.text
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text
                }}>
                  Senha *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color={tokens.colors.textMuted} style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }} />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      color: tokens.colors.text
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text
                }}>
                  Confirmar Senha *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color={tokens.colors.textMuted} style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }} />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Digite a senha novamente"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      color: tokens.colors.text
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.lg }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text
                }}>
                  Telefone (Opcional)
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} color={tokens.colors.textMuted} style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 98765-4321"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      color: tokens.colors.text
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text
                }}>
                  Cidade (Opcional)
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} color={tokens.colors.textMuted} style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }} />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="São Paulo, SP"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      color: tokens.colors.text
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: tokens.space.sm,
                  color: tokens.colors.text
                }}>
                  Instagram (Opcional)
                </label>
                <div style={{ position: 'relative' }}>
                  <Instagram size={18} color={tokens.colors.textMuted} style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }} />
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@seuperfil"
                    style={{
                      width: '100%',
                      padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px 40px`,
                      border: `2px solid ${tokens.colors.border}`,
                      borderRadius: tokens.radii.md,
                      fontSize: 15,
                      color: tokens.colors.text
                    }}
                  />
                </div>
              </div>

              <div style={{
                padding: tokens.space.lg,
                backgroundColor: tokens.colors.primaryLighter,
                borderRadius: tokens.radii.md,
                border: `1px solid ${tokens.colors.primary}30`
              }}>
                <p style={{
                  fontSize: 13,
                  color: tokens.colors.text,
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  💚 <strong>Benefícios:</strong> Avalie profissionais, salve seus favoritos e receba recomendações personalizadas!
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: tokens.space.md,
            marginTop: tokens.space.xl
          }}>
            {step === 2 && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(1)}
                style={{
                  padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                  backgroundColor: tokens.colors.bg,
                  color: tokens.colors.text,
                  border: `1px solid ${tokens.colors.border}`,
                  borderRadius: tokens.radii.md,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.space.sm
                }}
              >
                <ArrowLeft size={16} />
                Voltar
              </motion.button>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                padding: `${tokens.space.md}px ${tokens.space.lg}px`,
                background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primaryDark} 100%)`,
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
                boxShadow: `0 4px 16px ${tokens.colors.primary}40`
              }}
            >
              {step === 1 ? (
                <>
                  Continuar
                  <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                </>
              ) : (
                <>
                  <Check size={18} />
                  Criar Conta
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Footer */}
        <div style={{
          marginTop: tokens.space.xl,
          paddingTop: tokens.space.lg,
          borderTop: `1px solid ${tokens.colors.border}`,
          textAlign: 'center'
        }}>
          <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>
            Já tem uma conta?{' '}
            <a
              href="/profissionais"
              style={{
                color: tokens.colors.primary,
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Fazer login
            </a>
          </p>
          <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0, marginTop: tokens.space.sm }}>
            É profissional?{' '}
            <a
              href="/profissionais/cadastro"
              style={{
                color: tokens.colors.primary,
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Cadastre-se como profissional
            </a>
          </p>
        </div>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        input::placeholder {
          color: #9ca3af !important;
          opacity: 1;
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
