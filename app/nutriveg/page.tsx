"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Search,
  Bell,
  User,
  Apple,
  Coffee,
  Utensils,
  Moon,
  Plus,
  Check,
  AlertCircle,
  Activity,
  Target,
  Calendar,
  ChevronRight,
  Dumbbell,
  Scale,
  Ruler,
  Flame,
  BarChart3,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  Users,
  Info,
  Award,
  Zap,
  Heart,
  Droplet,
  Wheat,
} from "lucide-react";

const tokens = {
  colors: {
    primary: "#048003",
    primaryDark: "#036002",
    primaryLight: "#86efac",
    bg: "#f8fafc",
    surface: "#ffffff",
    text: "#0f172a",
    textMuted: "#64748b",
    border: "#e2e8f0",
    blue: "#3b82f6",
    purple: "#a855f7",
    orange: "#f97316",
    yellow: "#facc15",
    red: "#ef4444",
    pink: "#ec4899",
  },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radii: { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 },
};

// Header
function Header() {
  return (
    <header style={{ background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`, color: "white", padding: `${tokens.space.lg}px ${tokens.space.xl}px`, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: tokens.space.xl }}>
        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
          <div style={{ width: 56, height: 56, borderRadius: tokens.radii.lg, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Leaf size={32} fill="white" color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>NutriVeg</h1>
            <p style={{ fontSize: 12, margin: 0, opacity: 0.9 }}>Nutrição Vegana Inteligente</p>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: 600 }}>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: tokens.radii.full, padding: `${tokens.space.sm}px ${tokens.space.lg}px`, display: "flex", alignItems: "center", gap: tokens.space.md }}>
            <Search size={20} />
            <input type="text" placeholder="Buscar alimentos..." style={{ background: "transparent", border: "none", outline: "none", color: "white", fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: tokens.space.md }}>
          <button style={{ width: 48, height: 48, borderRadius: tokens.radii.full, background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Bell size={20} color="white" /></button>
          <button style={{ width: 48, height: 48, borderRadius: tokens.radii.full, background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={20} color="white" /></button>
        </div>
      </div>
    </header>
  );
}

// Mode Selection
function ModeSelection({ onSelectMode }) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: `${tokens.space.xxl * 2}px ${tokens.space.xl}px` }}>
      <div style={{ textAlign: "center", marginBottom: tokens.space.xxl * 2 }}>
        <h2 style={{ fontSize: 48, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.lg }}>Escolha Seu Modo</h2>
        <p style={{ fontSize: 20, color: tokens.colors.textMuted }}>Como você prefere acompanhar sua nutrição?</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.xxl }}>
        {[
          { id: "generico", title: "Modo Rápido", desc: "Análise simples e prática", icon: Apple, color: tokens.colors.primary, gradient: "linear-gradient(135deg, #10b981, #059669)" },
          { id: "fitness", title: "Modo Fitness", desc: "Controle total de macros", icon: Dumbbell, color: tokens.colors.blue, gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)" },
        ].map((mode) => {
          const Icon = mode.icon;
          return (
            <motion.div key={mode.id} whileHover={{ y: -12, scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onSelectMode(mode.id)} style={{ background: "white", borderRadius: tokens.radii.xl, padding: tokens.space.xxl * 1.5, cursor: "pointer", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: "2px solid transparent", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: mode.gradient, opacity: 0.1, borderRadius: "50%", filter: "blur(40px)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: 80, height: 80, borderRadius: tokens.radii.lg, background: mode.gradient, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: tokens.space.xl, boxShadow: `0 8px 24px ${mode.color}40` }}>
                  <Icon size={40} color="white" strokeWidth={2} />
                </div>
                <h3 style={{ fontSize: 32, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.sm }}>{mode.title}</h3>
                <p style={{ fontSize: 18, color: tokens.colors.textMuted, marginBottom: tokens.space.xxl }}>{mode.desc}</p>
                <div style={{ padding: `${tokens.space.lg}px`, background: mode.gradient, borderRadius: tokens.radii.md, color: "white", fontSize: 16, fontWeight: 700, textAlign: "center" }}>Começar →</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Generic Mode
function GenericMode({ onBack }) {
  const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [], snacks: [] });
  const [showResults, setShowResults] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedMealForSearch, setSelectedMealForSearch] = useState(null);

  // Main clickable options
  const commonFoods = {
    breakfast: ["Aveia", "Banana", "Pasta de amendoim", "Leite vegetal", "Granola"],
    lunch: ["Arroz integral", "Feijão", "Tofu", "Batata doce", "Salada"],
    dinner: ["Massas integrais", "Legumes assados", "Sopa de legumes", "Hambúrguer vegetal"],
    snacks: ["Castanhas", "Frutas secas", "Hummus", "Barra de cereal"],
  };

  // Complete food database for autocomplete
  const fullFoodDatabase = [
    // Grains & Cereals
    "Arroz integral", "Arroz branco", "Aveia", "Quinoa", "Cevada", "Centeio", "Trigo sarraceno", "Milho", "Painço",
    // Legumes
    "Feijão preto", "Feijão carioca", "Feijão branco", "Feijão azuki", "Grão de bico", "Lentilha vermelha", "Lentilha verde", "Ervilha", "Soja", "Edamame",
    // Proteins
    "Tofu", "Tempeh", "Seitan", "Proteína de soja texturizada (PTS)", "Hambúrguer vegetal", "Salsicha vegetal", "Nuggets vegetais",
    // Vegetables
    "Brócolis", "Couve", "Couve-flor", "Espinafre", "Rúcula", "Alface", "Repolho", "Acelga", "Agrião",
    "Tomate", "Cenoura", "Beterraba", "Abóbora", "Abobrinha", "Berinjela", "Pimentão", "Pepino", "Chuchu",
    "Batata", "Batata doce", "Mandioca", "Inhame", "Cará",
    // Fruits
    "Banana", "Maçã", "Laranja", "Mamão", "Manga", "Abacaxi", "Melancia", "Melão", "Uva", "Morango",
    "Pera", "Pêssego", "Ameixa", "Kiwi", "Abacate", "Coco", "Açaí", "Pitaya", "Goiaba", "Caqui",
    "Limão", "Tangerina", "Framboesa", "Mirtilo", "Amora", "Cereja",
    // Nuts & Seeds
    "Castanha de caju", "Castanha do Pará", "Amendoim", "Amêndoas", "Nozes", "Avelã", "Pistache", "Macadâmia",
    "Sementes de girassol", "Sementes de abóbora", "Sementes de gergelim", "Sementes de chia", "Sementes de linhaça", "Sementes de hemp",
    // Pasta & Bread
    "Massas integrais", "Macarrão", "Espaguete", "Penne", "Fusilli", "Lasanha",
    "Pão integral", "Pão de centeio", "Pão sírio", "Pão de forma", "Pão francês", "Torradas", "Biscoitos integrais",
    // Spreads & Sauces
    "Pasta de amendoim", "Pasta de amêndoas", "Tahini", "Hummus", "Guacamole", "Molho de tomate", "Pesto vegano",
    // Milk & Alternatives
    "Leite de soja", "Leite de aveia", "Leite de amêndoas", "Leite de coco", "Leite de arroz", "Leite de castanhas",
    "Iogurte de soja", "Iogurte de coco", "Iogurte vegetal",
    // Snacks & Treats
    "Granola", "Barra de cereal", "Chips de batata doce", "Pipoca", "Mix de castanhas", "Frutas secas",
    "Tâmaras", "Damasco seco", "Uva passa", "Banana chips",
    // Beverages
    "Café", "Chá verde", "Chá preto", "Chá de hibisco", "Chá de camomila", "Suco natural", "Smoothie", "Vitamina",
    // Others
    "Salada", "Sopa de legumes", "Curry", "Wrap", "Pizza vegana", "Risoto", "Strogonoff vegano", "Feijoada vegana",
    "Cogumelos", "Azeitonas", "Alcaparras", "Algas", "Spirulina", "Nutritional yeast", "Levedo nutricional",
  ];

  const mealInfo = {
    breakfast: { label: "Café da Manhã", icon: Coffee, color: tokens.colors.orange },
    lunch: { label: "Almoço", icon: Utensils, color: tokens.colors.primary },
    dinner: { label: "Janta", icon: Moon, color: tokens.colors.purple },
    snacks: { label: "Lanches", icon: Apple, color: tokens.colors.pink },
  };

  const addFood = (meal, food) => {
    if (!meals[meal].includes(food)) {
      setMeals({ ...meals, [meal]: [...meals[meal], food] });
    }
  };

  const removeFood = (meal, food) => {
    setMeals({ ...meals, [meal]: meals[meal].filter((f) => f !== food) });
  };

  const addFromAutocomplete = (food) => {
    if (selectedMealForSearch && !meals[selectedMealForSearch].includes(food)) {
      setMeals({ ...meals, [selectedMealForSearch]: [...meals[selectedMealForSearch], food] });
      setSearchInput("");
      setShowAutocomplete(false);
    }
  };

  const filteredFoods = searchInput.length >= 2
    ? fullFoodDatabase.filter(food =>
        food.toLowerCase().includes(searchInput.toLowerCase()) &&
        !meals[selectedMealForSearch || "breakfast"].includes(food)
      ).slice(0, 8)
    : [];

  if (showResults) {
    const macrosData = [
      { name: "Carboidratos", current: 245, percentage: 54, ideal: "50-60%", color: tokens.colors.blue, icon: Wheat },
      { name: "Proteínas", current: 65, percentage: 18, ideal: "15-25%", color: tokens.colors.red, icon: Dumbbell },
      { name: "Lipídios", current: 55, percentage: 28, ideal: "20-30%", color: tokens.colors.yellow, icon: Droplet },
    ];

    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: `${tokens.space.xxl}px ${tokens.space.xl}px` }}>
        <button onClick={() => setShowResults(false)} style={{ background: "none", border: "none", color: tokens.colors.primary, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: tokens.space.xl }}>← Voltar</button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: tokens.space.lg, color: tokens.colors.text }}>📊 Sua Análise Nutricional</h2>
          <p style={{ fontSize: 18, color: tokens.colors.textMuted, marginBottom: tokens.space.xxl }}>Baseada nos alimentos que você selecionou</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.xxl, marginBottom: tokens.space.xxl }}>
            {/* Left: Pie Chart */}
            <div style={{ background: "white", borderRadius: tokens.radii.xl, padding: tokens.space.xxl, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: tokens.space.xxl, color: tokens.colors.text, textAlign: "center" }}>Distribuição de Macronutrientes</h3>

              {/* Donut Chart */}
              <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto", marginBottom: tokens.space.xxl }}>
                <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke={tokens.colors.bg} strokeWidth="20" />

                  {/* Animated segments */}
                  {(() => {
                    let offset = 0;
                    return macrosData.map((macro) => {
                      const circumference = 2 * Math.PI * 40;
                      const segmentLength = (macro.percentage / 100) * circumference;
                      const currentOffset = offset;
                      offset += segmentLength;

                      return (
                        <motion.circle
                          key={macro.name}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={macro.color}
                          strokeWidth="20"
                          strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                          strokeDashoffset={-currentOffset}
                          initial={{ strokeDasharray: `0 ${circumference}` }}
                          animate={{ strokeDasharray: `${segmentLength} ${circumference - segmentLength}` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                        />
                      );
                    });
                  })()}
                </svg>

                {/* Center text */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: 4 }}>TOTAL</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: tokens.colors.text }}>365g</div>
                  <div style={{ fontSize: 13, color: tokens.colors.textMuted }}>macros</div>
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.md }}>
                {macrosData.map((macro) => {
                  const Icon = macro.icon;
                  return (
                    <div key={macro.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: tokens.space.md, background: `${macro.color}08`, borderRadius: tokens.radii.md, border: `1px solid ${macro.color}20` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md }}>
                        <div style={{ width: 40, height: 40, borderRadius: tokens.radii.sm, background: macro.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={20} color="white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: tokens.colors.text }}>{macro.name}</div>
                          <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>Ideal: {macro.ideal}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: macro.color }}>{macro.percentage}%</div>
                        <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>{macro.current}g</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Status Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: tokens.space.lg }}>
              <div style={{ background: "white", borderRadius: tokens.radii.xl, padding: tokens.space.xxl, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: tokens.space.xl, color: tokens.colors.text }}>Status Geral</h3>

                <div style={{ display: "flex", gap: tokens.space.lg, marginBottom: tokens.space.xl }}>
                  <div style={{ flex: 1, background: `linear-gradient(135deg, ${tokens.colors.primary}15, ${tokens.colors.primary}05)`, padding: tokens.space.lg, borderRadius: tokens.radii.lg, border: `2px solid ${tokens.colors.primary}30` }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.sm }}>EQUILÍBRIO</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: tokens.colors.primary }}>82%</div>
                    <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>Muito bom!</div>
                  </div>
                  <div style={{ flex: 1, background: `linear-gradient(135deg, ${tokens.colors.blue}15, ${tokens.colors.blue}05)`, padding: tokens.space.lg, borderRadius: tokens.radii.lg, border: `2px solid ${tokens.colors.blue}30` }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.sm }}>CALORIAS</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: tokens.colors.blue }}>2100</div>
                    <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>kcal estimadas</div>
                  </div>
                </div>

                <div style={{ padding: tokens.space.lg, background: `linear-gradient(135deg, ${tokens.colors.primary}08, ${tokens.colors.blue}08)`, borderRadius: tokens.radii.lg, border: `2px dashed ${tokens.colors.primary}40` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.sm }}>
                    <Check size={20} color={tokens.colors.primary} strokeWidth={3} />
                    <span style={{ fontSize: 15, fontWeight: 700, color: tokens.colors.text }}>Dieta Equilibrada</span>
                  </div>
                  <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>Sua alimentação está dentro dos padrões recomendados para uma dieta vegana saudável</p>
                </div>
              </div>

              <div style={{ background: `linear-gradient(135deg, ${tokens.colors.orange}15, ${tokens.colors.red}15)`, borderRadius: tokens.radii.xl, padding: tokens.space.xl, border: `2px solid ${tokens.colors.orange}30` }}>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.lg }}>
                  <div style={{ width: 48, height: 48, borderRadius: tokens.radii.full, background: tokens.colors.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AlertCircle size={24} color="white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: tokens.colors.text }}>Ponto de Atenção</div>
                    <div style={{ fontSize: 13, color: tokens.colors.textMuted }}>Vitamina B12</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.text, marginBottom: tokens.space.lg }}>A suplementação de B12 é <strong>essencial</strong> para veganos. Alimentos fortificados não são suficientes.</p>
                <button style={{ width: "100%", padding: `${tokens.space.md}px`, background: tokens.colors.red, color: "white", border: "none", borderRadius: tokens.radii.md, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Saber Mais sobre B12</button>
              </div>
            </div>
          </div>

          {/* Suggestions - New Design */}
          <div style={{ background: "white", borderRadius: tokens.radii.xl, padding: tokens.space.xxl, marginBottom: tokens.space.xxl, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.xxl }}>
              <div style={{ width: 48, height: 48, borderRadius: tokens.radii.lg, background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={24} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>Recomendações para Você</h3>
                <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0 }}>Baseadas na sua análise nutricional</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.lg }}>
              {[
                {
                  icon: Dumbbell,
                  title: "Aumente a Proteína",
                  desc: "Adicione tofu, tempeh ou seitan nas refeições principais",
                  color: tokens.colors.red,
                  priority: "alta"
                },
                {
                  icon: Droplet,
                  title: "Ômega 3",
                  desc: "Inclua sementes de chia, linhaça ou nozes diariamente",
                  color: tokens.colors.blue,
                  priority: "média"
                },
                {
                  icon: Heart,
                  title: "Ferro Vegetal",
                  desc: "Combine folhas verdes com vitamina C para melhor absorção",
                  color: tokens.colors.primary,
                  priority: "média"
                },
                {
                  icon: Award,
                  title: "Variedade",
                  desc: "Experimente novos alimentos para ampliar os nutrientes",
                  color: tokens.colors.purple,
                  priority: "baixa"
                },
              ].map((suggestion, i) => {
                const Icon = suggestion.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: `linear-gradient(135deg, ${suggestion.color}08, ${suggestion.color}03)`,
                      padding: tokens.space.xl,
                      borderRadius: tokens.radii.lg,
                      border: `2px solid ${suggestion.color}20`,
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <div style={{ position: "absolute", top: tokens.space.md, right: tokens.space.md }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: suggestion.color,
                        background: `${suggestion.color}20`,
                        padding: `${tokens.space.xs}px ${tokens.space.sm}px`,
                        borderRadius: tokens.radii.pill,
                        textTransform: "uppercase"
                      }}>
                        {suggestion.priority}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.lg }}>
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: tokens.radii.md,
                        background: suggestion.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 16px ${suggestion.color}40`
                      }}>
                        <Icon size={28} color="white" strokeWidth={2.5} />
                      </div>
                      <h4 style={{ fontSize: 18, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>{suggestion.title}</h4>
                    </div>

                    <p style={{ fontSize: 14, color: tokens.colors.textMuted, margin: 0, lineHeight: 1.6 }}>{suggestion.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Nutritionists */}
          <div style={{ background: `linear-gradient(135deg, ${tokens.colors.blue}15, ${tokens.colors.purple}15)`, padding: tokens.space.xxl, borderRadius: tokens.radii.xl, border: `2px solid ${tokens.colors.blue}30` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.md }}>
                  <Users size={28} color={tokens.colors.blue} />
                  <h3 style={{ fontSize: 24, fontWeight: 800, color: tokens.colors.text, margin: 0 }}>Quer um Plano Personalizado?</h3>
                </div>
                <p style={{ fontSize: 16, color: tokens.colors.textMuted, marginBottom: 0 }}>Consulte um nutricionista vegano para um acompanhamento profissional completo</p>
              </div>
              <button style={{
                padding: `${tokens.space.lg}px ${tokens.space.xxl}px`,
                background: tokens.colors.blue,
                color: "white",
                border: "none",
                borderRadius: tokens.radii.lg,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 8px 24px ${tokens.colors.blue}40`,
                whiteSpace: "nowrap"
              }}>
                Ver Profissionais →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: `${tokens.space.xxl}px ${tokens.space.xl}px` }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: tokens.colors.primary, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: tokens.space.xl }}>← Voltar</button>

      <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: tokens.space.sm, color: tokens.colors.text }}>O que você costuma comer?</h2>
      <p style={{ fontSize: 18, color: tokens.colors.textMuted, marginBottom: tokens.space.xxl }}>Selecione os alimentos de cada refeição</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.xl, marginBottom: tokens.space.xxl }}>
        {Object.keys(mealInfo).map((mealKey) => {
          const meal = mealInfo[mealKey];
          const Icon = meal.icon;
          return (
            <div key={mealKey} style={{ background: "white", borderRadius: tokens.radii.xl, padding: tokens.space.xl, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `2px solid ${tokens.colors.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, marginBottom: tokens.space.lg }}>
                <div style={{ width: 48, height: 48, borderRadius: tokens.radii.md, background: `${meal.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={24} color={meal.color} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.text, margin: 0 }}>{meal.label}</h3>
              </div>

              {/* Selected Foods */}
              {meals[mealKey].length > 0 && (
                <div style={{ marginBottom: tokens.space.lg, display: "flex", flexWrap: "wrap", gap: tokens.space.sm }}>
                  {meals[mealKey].map((food) => (
                    <div key={food} style={{ background: meal.color, color: "white", padding: `${tokens.space.sm}px ${tokens.space.md}px`, borderRadius: tokens.radii.pill, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: tokens.space.sm }}>
                      {food}
                      <button onClick={() => removeFood(mealKey, food)} style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <X size={12} color="white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Autocomplete Input */}
              <div style={{ marginBottom: tokens.space.md, position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={selectedMealForSearch === mealKey ? searchInput : ""}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setSelectedMealForSearch(mealKey);
                      setShowAutocomplete(e.target.value.length >= 2);
                    }}
                    onFocus={() => {
                      setSelectedMealForSearch(mealKey);
                      if (searchInput.length >= 2) setShowAutocomplete(true);
                    }}
                    onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                    placeholder="Digite para buscar mais alimentos..."
                    style={{ width: "100%", padding: `${tokens.space.md}px ${tokens.space.lg}px ${tokens.space.md}px ${tokens.space.xl + tokens.space.md}px`, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 14, fontWeight: 600, outline: "none", background: "white" }}
                  />
                  <Search size={18} color={tokens.colors.textMuted} style={{ position: "absolute", left: tokens.space.md, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                </div>

                {/* Autocomplete Dropdown */}
                {showAutocomplete && selectedMealForSearch === mealKey && filteredFoods.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, marginTop: tokens.space.xs, maxHeight: 240, overflowY: "auto", zIndex: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                    {filteredFoods.map((food) => (
                      <button
                        key={food}
                        onClick={() => addFromAutocomplete(food)}
                        style={{ width: "100%", padding: `${tokens.space.md}px ${tokens.space.lg}px`, border: "none", background: "white", textAlign: "left", fontSize: 14, fontWeight: 600, color: tokens.colors.text, cursor: "pointer", display: "flex", alignItems: "center", gap: tokens.space.md, transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = `${meal.color}15`}
                        onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                      >
                        <Plus size={16} color={meal.color} />
                        {food}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Quick Add Options */}
              <div style={{ fontSize: 12, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.sm }}>ADICIONAR RÁPIDO:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.space.sm }}>
                {commonFoods[mealKey].map((food) => (
                  <button key={food} onClick={() => addFood(mealKey, food)} disabled={meals[mealKey].includes(food)} style={{ padding: `${tokens.space.sm}px ${tokens.space.md}px`, background: meals[mealKey].includes(food) ? tokens.colors.bg : "white", color: meals[mealKey].includes(food) ? tokens.colors.textMuted : tokens.colors.text, border: `2px solid ${meals[mealKey].includes(food) ? tokens.colors.border : meal.color}`, borderRadius: tokens.radii.pill, fontSize: 13, fontWeight: 600, cursor: meals[mealKey].includes(food) ? "not-allowed" : "pointer", opacity: meals[mealKey].includes(food) ? 0.5 : 1 }}>
                    + {food}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={() => setShowResults(true)} style={{ width: "100%", padding: `${tokens.space.xl}px`, background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`, color: "white", border: "none", borderRadius: tokens.radii.lg, fontSize: 18, fontWeight: 800, cursor: "pointer", boxShadow: `0 8px 24px ${tokens.colors.primary}40` }}>
        Analisar Minha Alimentação →
      </button>
    </div>
  );
}

// Fitness Mode
function FitnessMode({ onBack }) {
  const [step, setStep] = useState("setup"); // setup, dashboard
  const [profile, setProfile] = useState({ height: "", weight: "", age: "", gender: "male", goal: "maintain", activityLevel: "moderate", workoutType: "strength" });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyLogs, setDailyLogs] = useState({}); // Store logs by date
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0, calories: 0 });
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const foodDatabase = {
    "Arroz integral": { protein: 2.6, carbs: 23, fats: 0.9, calories: 111, unit: "100g" },
    "Feijão preto": { protein: 8.9, carbs: 23.7, fats: 0.5, calories: 132, unit: "100g" },
    "Tofu": { protein: 8, carbs: 1.9, fats: 4.8, calories: 76, unit: "100g" },
    "Batata doce": { protein: 1.6, carbs: 20.1, fats: 0.1, calories: 86, unit: "100g" },
    "Brócolis": { protein: 2.8, carbs: 7, fats: 0.4, calories: 34, unit: "100g" },
    "Banana": { protein: 1.3, carbs: 27, fats: 0.3, calories: 105, unit: "unidade" },
    "Aveia": { protein: 6.9, carbs: 33.8, fats: 3.5, calories: 194, unit: "50g" },
    "Pasta de amendoim": { protein: 5, carbs: 4, fats: 10, calories: 120, unit: "20g" },
    "Grão de bico": { protein: 8.9, carbs: 27.4, fats: 2.6, calories: 164, unit: "100g" },
    "Quinoa": { protein: 4.4, carbs: 21.3, fats: 1.9, calories: 120, unit: "100g" },
    "Lentilha": { protein: 9, carbs: 20, fats: 0.4, calories: 116, unit: "100g" },
    "Tempeh": { protein: 19, carbs: 9, fats: 11, calories: 193, unit: "100g" },
    "Abacate": { protein: 2, carbs: 9, fats: 15, calories: 160, unit: "100g" },
    "Castanhas": { protein: 15, carbs: 30, fats: 54, calories: 607, unit: "100g" },
  };

  const targetMacros = { protein: 150, carbs: 250, fats: 65, calories: 2100 };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
    loadDateData(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    loadDateData(today);
  };

  const loadDateData = (date) => {
    const dateKey = formatDate(date);
    if (dailyLogs[dateKey]) {
      setMacros(dailyLogs[dateKey]);
    } else {
      setMacros({ protein: 0, carbs: 0, fats: 0, calories: 0 });
    }
  };

  const saveDateData = (newMacros) => {
    const dateKey = formatDate(selectedDate);
    setDailyLogs({ ...dailyLogs, [dateKey]: newMacros });
  };

  const addFood = () => {
    if (!foodName || !quantity) return;

    const food = foodDatabase[foodName];
    if (!food) return;

    const multiplier = parseFloat(quantity) || 1;
    const newMacros = {
      protein: parseFloat((macros.protein + food.protein * multiplier).toFixed(1)),
      carbs: parseFloat((macros.carbs + food.carbs * multiplier).toFixed(1)),
      fats: parseFloat((macros.fats + food.fats * multiplier).toFixed(1)),
      calories: Math.round(macros.calories + food.calories * multiplier),
    };

    setMacros(newMacros);
    saveDateData(newMacros);
    setFoodName("");
    setQuantity("");
  };

  const getDateLabel = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (formatDate(selectedDate) === formatDate(today)) return "Hoje";
    if (formatDate(selectedDate) === formatDate(yesterday)) return "Ontem";
    return selectedDate.toLocaleDateString("pt-BR");
  };

  if (step === "setup") {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: `${tokens.space.xxl}px ${tokens.space.xl}px` }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: tokens.colors.primary, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: tokens.space.xxl }}>← Voltar</button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: "white", borderRadius: tokens.radii.xl, padding: tokens.space.xxl * 2, boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: tokens.space.lg, color: tokens.colors.text }}>⚙️ Configure Seu Perfil</h2>
          <p style={{ fontSize: 16, color: tokens.colors.textMuted, marginBottom: tokens.space.xxl }}>Vamos personalizar seus objetivos nutricionais</p>

          <div style={{ display: "grid", gap: tokens.space.xl }}>
            {/* Measurements */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: tokens.space.lg }}>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>Altura (cm)</label>
                <input type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: e.target.value })} style={{ width: "100%", padding: `${tokens.space.md}px`, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 16, fontWeight: 600, outline: "none", background: "white" }} placeholder="175" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>Peso (kg)</label>
                <input type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: e.target.value })} style={{ width: "100%", padding: `${tokens.space.md}px`, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 16, fontWeight: 600, outline: "none", background: "white" }} placeholder="70" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.text }}>Idade</label>
                <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} style={{ width: "100%", padding: `${tokens.space.md}px`, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 16, fontWeight: 600, outline: "none", background: "white" }} placeholder="25" />
              </div>
            </div>

            {/* Goal */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>Objetivo</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: tokens.space.md }}>
                {[
                  { value: "lose", label: "Perder Peso", icon: TrendingDown, color: tokens.colors.red },
                  { value: "maintain", label: "Manter", icon: Target, color: tokens.colors.blue },
                  { value: "gain", label: "Ganhar Massa", icon: TrendingUp, color: tokens.colors.primary },
                ].map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <button key={goal.value} onClick={() => setProfile({ ...profile, goal: goal.value })} style={{ padding: tokens.space.lg, background: profile.goal === goal.value ? goal.color : "white", color: profile.goal === goal.value ? "white" : tokens.colors.text, border: `2px solid ${profile.goal === goal.value ? goal.color : tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: tokens.space.sm, transition: "all 0.2s" }}>
                      <Icon size={24} />
                      {goal.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>Nível de Atividade</label>
              <select value={profile.activityLevel} onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value })} style={{ width: "100%", padding: `${tokens.space.md}px`, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 15, fontWeight: 600, outline: "none", background: "white", cursor: "pointer" }}>
                <option value="sedentary">Sedentário (pouco/nenhum exercício)</option>
                <option value="light">Leve (1-3 dias/semana)</option>
                <option value="moderate">Moderado (3-5 dias/semana)</option>
                <option value="active">Ativo (6-7 dias/semana)</option>
                <option value="very_active">Muito Ativo (2x por dia)</option>
              </select>
            </div>

            {/* Workout Type */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: tokens.space.md, color: tokens.colors.text }}>Tipo de Treino</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.space.md }}>
                {[
                  { value: "strength", label: "Musculação", icon: Dumbbell },
                  { value: "cardio", label: "Cardio", icon: Activity },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button key={type.value} onClick={() => setProfile({ ...profile, workoutType: type.value })} style={{ padding: tokens.space.lg, background: profile.workoutType === type.value ? tokens.colors.primary : "white", color: profile.workoutType === type.value ? "white" : tokens.colors.text, border: `2px solid ${profile.workoutType === type.value ? tokens.colors.primary : tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: tokens.space.md }}>
                      <Icon size={20} />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button onClick={() => setStep("dashboard")} style={{ width: "100%", marginTop: tokens.space.xxl, padding: `${tokens.space.xl}px`, background: `linear-gradient(135deg, ${tokens.colors.blue}, #1d4ed8)`, color: "white", border: "none", borderRadius: tokens.radii.lg, fontSize: 18, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)" }}>
            Começar Tracking →
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: `${tokens.space.xxl}px ${tokens.space.xl}px` }}>
      {/* Header with Date Selector */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.space.xxl }}>
        <div style={{ display: "flex", alignItems: "center", gap: tokens.space.xl }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.xs }}>Dashboard</h2>
            <p style={{ fontSize: 16, color: tokens.colors.textMuted }}>Acompanhe seus macros em tempo real</p>
          </div>

          {/* Date Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: tokens.space.md, background: "white", padding: tokens.space.md, borderRadius: tokens.radii.lg, border: `2px solid ${tokens.colors.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <button onClick={() => changeDate(-1)} style={{ width: 36, height: 36, borderRadius: tokens.radii.sm, background: tokens.colors.bg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: tokens.colors.text }}>‹</button>
            <div style={{ minWidth: 140, textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: tokens.colors.text }}>{getDateLabel()}</div>
              <div style={{ fontSize: 12, color: tokens.colors.textMuted }}>{selectedDate.toLocaleDateString("pt-BR", { weekday: "short" })}</div>
            </div>
            <button onClick={() => changeDate(1)} style={{ width: 36, height: 36, borderRadius: tokens.radii.sm, background: tokens.colors.bg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: tokens.colors.text }}>›</button>
            <div style={{ width: 1, height: 32, background: tokens.colors.border, margin: `0 ${tokens.space.sm}px` }} />
            <button onClick={goToToday} style={{ padding: `${tokens.space.sm}px ${tokens.space.md}px`, background: tokens.colors.primary, color: "white", border: "none", borderRadius: tokens.radii.sm, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Hoje</button>
          </div>
        </div>
        <button onClick={() => setStep("setup")} style={{ padding: `${tokens.space.md}px ${tokens.space.lg}px`, background: "white", color: tokens.colors.text, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>⚙️ Configurações</button>
      </div>

      {/* Macro Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: tokens.space.md, marginBottom: tokens.space.xl }}>
        {[
          { label: "Calorias", current: macros.calories, target: targetMacros.calories, unit: "kcal", color: tokens.colors.orange, icon: Flame },
          { label: "Proteína", current: macros.protein, target: targetMacros.protein, unit: "g", color: tokens.colors.red, icon: Dumbbell },
          { label: "Carbos", current: macros.carbs, target: targetMacros.carbs, unit: "g", color: tokens.colors.blue, icon: Wheat },
          { label: "Gorduras", current: macros.fats, target: targetMacros.fats, unit: "g", color: tokens.colors.yellow, icon: Droplet },
        ].map((macro) => {
          const Icon = macro.icon;
          const percentage = Math.min((macro.current / macro.target) * 100, 100);
          const remaining = Math.max(macro.target - macro.current, 0);
          return (
            <div key={macro.label} style={{ background: "white", padding: tokens.space.lg, borderRadius: tokens.radii.lg, border: `2px solid ${tokens.colors.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: tokens.space.sm, marginBottom: tokens.space.md }}>
                <Icon size={18} color={macro.color} />
                <span style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.textMuted }}>{macro.label}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: tokens.colors.text, marginBottom: tokens.space.xs }}>
                {macro.unit === "kcal" ? macro.current : parseFloat(macro.current.toFixed(1))}
              </div>
              <div style={{ fontSize: 12, color: tokens.colors.textMuted, marginBottom: tokens.space.sm }}>
                de {macro.target} {macro.unit} • Falta: {macro.unit === "kcal" ? remaining : parseFloat(remaining.toFixed(1))} {macro.unit}
              </div>
              <div style={{ height: 6, background: tokens.colors.bg, borderRadius: tokens.radii.full, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} style={{ height: "100%", background: macro.color, borderRadius: tokens.radii.full, transition: "width 0.5s ease" }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: tokens.space.xl }}>
        {/* Left: Food Input */}
        <div>
          {/* Add Food Form */}
          <div style={{ background: "white", padding: tokens.space.xl, borderRadius: tokens.radii.lg, marginBottom: tokens.space.xl, border: `2px solid ${tokens.colors.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: tokens.space.lg, color: tokens.colors.text }}>✍️ Adicionar Alimento</h3>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto", gap: tokens.space.md }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.textMuted }}>ALIMENTO</label>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="Ex: Arroz integral, Tofu, Banana..."
                  list="food-options"
                  style={{ width: "100%", padding: `${tokens.space.md}px ${tokens.space.lg}px`, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 15, fontWeight: 600, outline: "none", background: "white" }}
                />
                <datalist id="food-options">
                  {Object.keys(foodDatabase).map(food => <option key={food} value={food} />)}
                </datalist>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: tokens.space.sm, color: tokens.colors.textMuted }}>PORÇÕES</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="1"
                  step="0.5"
                  min="0"
                  style={{ width: "100%", padding: `${tokens.space.md}px ${tokens.space.lg}px`, border: `2px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, fontSize: 15, fontWeight: 600, outline: "none", background: "white" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button onClick={addFood} style={{ padding: `${tokens.space.md}px ${tokens.space.xl}px`, background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryDark})`, color: "white", border: "none", borderRadius: tokens.radii.md, fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: `0 4px 12px ${tokens.colors.primary}40`, whiteSpace: "nowrap" }}>
                  + Adicionar
                </button>
              </div>
            </div>

            {foodName && foodDatabase[foodName] && (
              <div style={{ marginTop: tokens.space.lg, padding: tokens.space.md, background: `${tokens.colors.blue}10`, borderRadius: tokens.radii.md, border: `1px solid ${tokens.colors.blue}30` }}>
                <div style={{ fontSize: 13, color: tokens.colors.textMuted, marginBottom: tokens.space.xs }}>
                  Informação nutricional por {foodDatabase[foodName].unit}:
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: tokens.colors.text }}>
                  {foodDatabase[foodName].protein}g proteína • {foodDatabase[foodName].carbs}g carbos • {foodDatabase[foodName].fats}g gordura • {foodDatabase[foodName].calories} kcal
                </div>
              </div>
            )}
          </div>

          {/* Quick Add Suggestions */}
          <div style={{ background: "white", padding: tokens.space.xl, borderRadius: tokens.radii.lg, border: `2px solid ${tokens.colors.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: tokens.space.lg, color: tokens.colors.text }}>⚡ Alimentos Populares</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: tokens.space.sm }}>
              {Object.keys(foodDatabase).slice(0, 6).map((food) => (
                <button
                  key={food}
                  onClick={() => {
                    setFoodName(food);
                    setQuantity("1");
                  }}
                  style={{ padding: `${tokens.space.md}px`, background: tokens.colors.bg, border: "none", borderRadius: tokens.radii.md, fontSize: 13, fontWeight: 600, color: tokens.colors.text, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = `${tokens.colors.primary}20`}
                  onMouseLeave={(e) => e.currentTarget.style.background = tokens.colors.bg}
                >
                  {food}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Charts */}
        <div>
          {/* Macro Distribution Chart */}
          <div style={{ background: "white", padding: tokens.space.xl, borderRadius: tokens.radii.lg, border: `2px solid ${tokens.colors.border}`, marginBottom: tokens.space.xl, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: tokens.space.xl, color: tokens.colors.text, textAlign: "center" }}>Distribuição de Macros</h3>

            <div style={{ marginBottom: tokens.space.xxl }}>
              {[
                { label: "Proteína", value: macros.protein, target: targetMacros.protein, color: tokens.colors.red },
                { label: "Carboidratos", value: macros.carbs, target: targetMacros.carbs, color: tokens.colors.blue },
                { label: "Gorduras", value: macros.fats, target: targetMacros.fats, color: tokens.colors.yellow },
              ].map((macro) => {
                const percentage = Math.min((macro.value / macro.target) * 100, 100);
                return (
                  <div key={macro.label} style={{ marginBottom: tokens.space.lg }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: tokens.space.sm }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.text }}>{macro.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: macro.color }}>
                        {parseFloat(macro.value.toFixed(1))}g / {macro.target}g
                      </span>
                    </div>
                    <div style={{ height: 10, background: tokens.colors.bg, borderRadius: tokens.radii.full, overflow: "hidden" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} style={{ height: "100%", background: macro.color, borderRadius: tokens.radii.full, transition: "width 0.5s ease", boxShadow: `inset 0 0 8px ${macro.color}80` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calorie Chart */}
            <div style={{ background: `linear-gradient(135deg, ${tokens.colors.orange}15, ${tokens.colors.orange}05)`, padding: tokens.space.lg, borderRadius: tokens.radii.md, border: `2px solid ${tokens.colors.orange}30` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: tokens.colors.textMuted, marginBottom: tokens.space.sm }}>TOTAL DE CALORIAS</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: tokens.colors.orange, marginBottom: tokens.space.xs }}>{macros.calories}</div>
              <div style={{ fontSize: 14, color: tokens.colors.textMuted }}>Meta: {targetMacros.calories} kcal</div>
              <div style={{ marginTop: tokens.space.md, height: 8, background: "rgba(0,0,0,0.1)", borderRadius: tokens.radii.full, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((macros.calories / targetMacros.calories) * 100, 100)}%` }} style={{ height: "100%", background: tokens.colors.orange, borderRadius: tokens.radii.full }} />
              </div>
            </div>
          </div>

          {/* Weekly Overview Chart */}
          <div style={{ background: "white", padding: tokens.space.xl, borderRadius: tokens.radii.lg, border: `2px solid ${tokens.colors.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: tokens.space.xl, color: tokens.colors.text }}>📊 Progresso Semanal</h3>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: tokens.space.sm, height: 120 }}>
              {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => {
                const height = i === 6 ? (macros.calories / targetMacros.calories) * 100 : Math.random() * 100;
                const isToday = i === 6;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: tokens.space.sm }}>
                    <div style={{ width: "100%", background: tokens.colors.bg, borderRadius: tokens.radii.sm, height: "100%", position: "relative", overflow: "hidden" }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        style={{ position: "absolute", bottom: 0, width: "100%", background: isToday ? `linear-gradient(to top, ${tokens.colors.primary}, ${tokens.colors.primaryLight})` : tokens.colors.border, borderRadius: tokens.radii.sm }}
                      />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: isToday ? 800 : 600, color: isToday ? tokens.colors.primary : tokens.colors.textMuted }}>{day}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main
export default function NutriVegPage() {
  const [selectedMode, setSelectedMode] = useState(null);
  return (
    <div style={{ minHeight: "100vh", background: tokens.colors.bg, fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <AnimatePresence mode="wait">
        {!selectedMode && <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ModeSelection onSelectMode={setSelectedMode} /></motion.div>}
        {selectedMode === "generico" && <motion.div key="generico" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><GenericMode onBack={() => setSelectedMode(null)} /></motion.div>}
        {selectedMode === "fitness" && <motion.div key="fitness" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FitnessMode onBack={() => setSelectedMode(null)} /></motion.div>}
      </AnimatePresence>
      <style jsx global>{`@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");*{box-sizing:border-box;margin:0;padding:0}body{margin:0;padding:0;font-family:"Inter",sans-serif;-webkit-font-smoothing:antialiased}button,input,select,textarea{font-family:inherit}input,select,textarea{color:#0f172a!important}input::placeholder,textarea::placeholder{color:#94a3b8!important;opacity:1}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:#94a3b8!important;opacity:1}input::-moz-placeholder,textarea::-moz-placeholder{color:#94a3b8!important;opacity:1}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#94a3b8!important;opacity:1}`}</style>
    </div>
  );
}
