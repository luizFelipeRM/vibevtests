import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { tokens } from "../../styles/tokens";

interface NutritionalStatusBannerProps {
    daysInStreak: number;
    isPositive: boolean;
}

export const NutritionalStatusBanner: React.FC<NutritionalStatusBannerProps> = ({
    daysInStreak,
    isPositive,
}) => {
    const Icon = isPositive ? CheckCircle2 : AlertTriangle;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: isPositive ? tokens.colors.primaryLight : "#fff7ed",
                border: `1px solid ${isPositive ? tokens.colors.primary + "20" : tokens.colors.orange + "20"}`,
                padding: `${tokens.space.md}px ${tokens.space.xl}px`,
                borderRadius: tokens.radii.lg,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: tokens.space.xl,
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}>
                    <Icon size={18} color={isPositive ? tokens.colors.primary : tokens.colors.orange} />
                </div>
                <div>
                    <span style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: tokens.colors.text
                    }}>
                        {isPositive
                            ? `Você está no caminho certo há ${daysInStreak} dias! 🚀`
                            : `Atenção: Seu balanço de macros saiu do planejado nos últimos ${daysInStreak} dias. ⚠️`}
                    </span>
                    <p style={{
                        fontSize: 12,
                        color: tokens.colors.textMuted,
                        margin: 0,
                        marginTop: 2
                    }}>
                        {isPositive
                            ? "Continue assim para atingir seus objetivos mais rápido."
                            : "Tente ajustar suas próximas refeições para voltar à meta."}
                    </p>
                </div>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: tokens.space.sm,
                padding: "4px 12px",
                background: "white",
                borderRadius: tokens.radii.full,
                fontSize: 12,
                fontWeight: 800,
                color: isPositive ? tokens.colors.primary : tokens.colors.orange,
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}>
                <TrendIcon size={14} />
                {isPositive ? "ALTA PERFORMANCE" : "AJUSTE NECESSÁRIO"}
            </div>
        </motion.div>
    );
};
