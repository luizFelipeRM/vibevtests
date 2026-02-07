import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Share2, Camera, Users, Sparkles, Instagram, ExternalLink } from "lucide-react";
import { tokens } from "../../styles/tokens";

export const SocialHypeSection: React.FC = () => {
    const [progressImage, setProgressImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProgressImage(url);
        }
    };

    const communityHighlights = [
        {
            id: 1,
            user: "@fitness_marcela",
            time: "5m",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=533&fit=crop",
            label: "Meta Batida! 🏆"
        },
        {
            id: 2,
            user: "@veg_pedro",
            time: "1h",
            image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=533&fit=crop",
            label: "Evolução Constante"
        },
        {
            id: 3,
            user: "@clara_move",
            time: "3h",
            image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=533&fit=crop",
            label: "Novo Recorde ⚡"
        },
        {
            id: 4,
            user: "@joao_vegan",
            time: "5h",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=533&fit=crop",
            label: "Foco Total"
        },
    ];

    return (
        <div style={{ marginTop: tokens.space.xxl, display: "grid", gridTemplateColumns: "1.2fr 1.3fr", gap: tokens.space.xl }}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {/* My Snapshot Section */}
            <div
                style={{
                    background: "white",
                    padding: tokens.space.xxl,
                    borderRadius: tokens.radii.xl,
                    border: `1px solid ${tokens.colors.border}`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.02)",
                    display: "flex",
                    flexDirection: "column",
                    gap: tokens.space.xl,
                    position: "relative"
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", minHeight: 40 }}>
                    <div>
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>
                            📸 Meu Snapshot
                        </h3>
                        <p style={{ fontSize: 13, color: tokens.colors.textMuted, margin: 0, marginTop: 4 }}>
                            Registre seu progresso de hoje.
                        </p>
                    </div>
                </div>

                <motion.div
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.005, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
                    whileTap={{ scale: 0.995 }}
                    style={{
                        position: "relative",
                        cursor: "pointer",
                        padding: tokens.space.sm,
                        background: "white",
                        borderRadius: tokens.radii.xl,
                        border: `1px solid ${tokens.colors.border}80`, // more subtle border
                        transition: "all 0.3s ease",
                        overflow: "hidden"
                    }}
                >
                    <div style={{
                        aspectRatio: "1/1",
                        backgroundImage: progressImage ? `url(${progressImage})` : "none",
                        backgroundColor: progressImage ? "transparent" : tokens.colors.bg + "40",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: tokens.radii.lg,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease"
                    }}>
                        {!progressImage && (
                            <div style={{
                                width: "50%", // smaller focused square
                                height: "50%",
                                border: `2px dashed ${tokens.colors.border}`,
                                borderRadius: tokens.radii.md,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: tokens.space.sm,
                                background: "white" // clear white inner square
                            }}>
                                <div style={{
                                    color: tokens.colors.primary,
                                    opacity: 0.6
                                }}>
                                    <Camera size={28} />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <span style={{
                                        display: "block",
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: tokens.colors.text
                                    }}>
                                        Subir Foto
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {progressImage && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, background: tokens.colors.primaryDark }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: "100%",
                                padding: tokens.space.md,
                                background: tokens.colors.primary,
                                color: "white",
                                border: "none",
                                borderRadius: tokens.radii.lg,
                                fontSize: 15,
                                fontWeight: 800,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: tokens.space.md,
                                boxShadow: "0 8px 24px " + tokens.colors.primary + "30",
                                transition: "background 0.2s ease"
                            }}
                        >
                            <Share2 size={20} /> Compartilhar Progresso
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Community Gallery Section */}
            <div
                style={{
                    background: tokens.colors.bg,
                    padding: tokens.space.xxl,
                    borderRadius: tokens.radii.xl,
                    border: `1px solid ${tokens.colors.border}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: tokens.space.xl
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm }}>
                    <Users size={20} color={tokens.colors.text} />
                    <h4 style={{ fontSize: 16, fontWeight: 800, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em", color: tokens.colors.text }}>
                        Inspire-se na Galeria
                    </h4>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: tokens.space.md,
                    maxHeight: "480px",
                    overflowY: "auto",
                    paddingRight: tokens.space.xs
                }}>
                    {communityHighlights.map((post) => (
                        <motion.div
                            key={post.id}
                            whileHover={{ y: -4 }}
                            style={{
                                background: "white",
                                padding: 8,
                                borderRadius: tokens.radii.lg,
                                border: `1px solid ${tokens.colors.border}`,
                                cursor: "pointer",
                                position: "relative"
                            }}
                        >
                            <div style={{
                                aspectRatio: "3/4",
                                borderRadius: tokens.radii.md,
                                backgroundImage: `url(${post.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                marginBottom: 8
                            }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 11, fontWeight: 800, color: tokens.colors.text }}>{post.user}</span>
                                <ExternalLink size={12} color={tokens.colors.textMuted} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <button
                    style={{
                        width: "100%",
                        marginTop: "auto",
                        padding: tokens.space.md,
                        background: "white",
                        color: tokens.colors.text,
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: tokens.radii.lg,
                        fontSize: 13,
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: tokens.space.sm,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                    }}
                >
                    <Instagram size={16} /> Ver Tudo no Feed
                </button>
            </div>
        </div>
    );
};
