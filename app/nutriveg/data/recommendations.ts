import { Dumbbell, Droplet, Heart, Award } from "lucide-react";

export const nutritionRecommendations = [
  {
    icon: Dumbbell,
    title: "Aumente a Proteína",
    desc: "Adicione tofu, tempeh ou seitan nas refeições principais",
    color: "#ef4444",
    priority: "alta" as const,
  },
  {
    icon: Droplet,
    title: "Ômega 3",
    desc: "Inclua sementes de chia, linhaça ou nozes diariamente",
    color: "#3b82f6",
    priority: "média" as const,
  },
  {
    icon: Heart,
    title: "Ferro Vegetal",
    desc: "Combine folhas verdes com vitamina C para melhor absorção",
    color: "#048003",
    priority: "média" as const,
  },
  {
    icon: Award,
    title: "Variedade",
    desc: "Experimente novos alimentos para ampliar os nutrientes",
    color: "#a855f7",
    priority: "baixa" as const,
  },
];
