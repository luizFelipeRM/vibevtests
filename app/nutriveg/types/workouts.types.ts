export interface CardioEntry {
  id: string;
  date: string;
  distanceKm: number;
  durationMinutes: number;
  pace: string; // Calculated field (e.g. "5:30 /km")
  heartRateResting?: number;   // FC repouso (bpm)
  heartRateActive?: number;    // FC ativa durante o treino (bpm)
  caloriesBurned?: number;     // Calculado via HR ou MET
  notes?: string;
}

export interface StrengthSet {
  id: string;
  reps: number;
  weight: number;
}

export interface StrengthExercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: StrengthSet[];
  notes?: string;
}

export interface StrengthEntry {
  id: string;
  date: string;
  exercises: StrengthExercise[];
  notes?: string;
}

// ─── Atividades gerais (esportes, artes marciais, etc.) ─────────────────────

export interface ActivityType {
  id: string;
  label: string;
  category: "esporte" | "luta" | "academia" | "aquatico" | "outdoor" | "danca" | "outro";
  met: number; // Metabolic Equivalent of Task
  emoji: string;
}

export const ACTIVITY_TYPES: ActivityType[] = [
  // Esportes coletivos
  { id: "futebol", label: "Futebol", category: "esporte", met: 7.0, emoji: "⚽" },
  { id: "futsal", label: "Futsal", category: "esporte", met: 8.0, emoji: "⚽" },
  { id: "basquete", label: "Basquete", category: "esporte", met: 6.5, emoji: "🏀" },
  { id: "volei", label: "Vôlei", category: "esporte", met: 4.0, emoji: "🏐" },
  { id: "tenis", label: "Tênis", category: "esporte", met: 7.3, emoji: "🎾" },
  { id: "handball", label: "Handebol", category: "esporte", met: 8.0, emoji: "🤾" },

  // Artes marciais / Lutas
  { id: "boxe", label: "Boxe", category: "luta", met: 9.8, emoji: "🥊" },
  { id: "muay_thai", label: "Muay Thai", category: "luta", met: 10.0, emoji: "🥋" },
  { id: "jiu_jitsu", label: "Jiu-Jitsu", category: "luta", met: 8.0, emoji: "🥋" },
  { id: "mma", label: "MMA", category: "luta", met: 10.5, emoji: "🥊" },
  { id: "judo", label: "Judô", category: "luta", met: 7.8, emoji: "🥋" },
  { id: "karate", label: "Karatê", category: "luta", met: 7.5, emoji: "🥋" },
  { id: "wrestling", label: "Wrestling / Luta", category: "luta", met: 8.5, emoji: "🤼" },

  // Academia / Funcional
  { id: "musculacao", label: "Musculação", category: "academia", met: 5.0, emoji: "🏋️" },
  { id: "crossfit", label: "CrossFit", category: "academia", met: 9.0, emoji: "💪" },
  { id: "funcional", label: "Treino Funcional", category: "academia", met: 7.0, emoji: "🏃" },
  { id: "pilates", label: "Pilates", category: "academia", met: 3.0, emoji: "🧘" },
  { id: "yoga", label: "Yoga", category: "academia", met: 2.5, emoji: "🧘" },
  { id: "hiit", label: "HIIT", category: "academia", met: 10.0, emoji: "🔥" },

  // Aquático
  { id: "natacao", label: "Natação", category: "aquatico", met: 8.0, emoji: "🏊" },
  { id: "polo_aquatico", label: "Polo Aquático", category: "aquatico", met: 10.0, emoji: "🤽" },

  // Outdoor / Cardio
  { id: "corrida", label: "Corrida", category: "outdoor", met: 9.8, emoji: "🏃" },
  { id: "caminhada", label: "Caminhada", category: "outdoor", met: 3.5, emoji: "🚶" },
  { id: "ciclismo", label: "Ciclismo", category: "outdoor", met: 8.0, emoji: "🚴" },
  { id: "trilha", label: "Trilha / Hiking", category: "outdoor", met: 6.0, emoji: "🥾" },
  { id: "escalada", label: "Escalada", category: "outdoor", met: 8.0, emoji: "🧗" },
  { id: "skate", label: "Skate", category: "outdoor", met: 5.0, emoji: "🛹" },
  { id: "surf", label: "Surf", category: "outdoor", met: 5.5, emoji: "🏄" },

  // Dança
  { id: "danca", label: "Dança", category: "danca", met: 5.0, emoji: "💃" },
  { id: "zumba", label: "Zumba", category: "danca", met: 7.0, emoji: "💃" },
  { id: "forró", label: "Forró", category: "danca", met: 4.5, emoji: "🕺" },

  // Outro
  { id: "outro", label: "Outro", category: "outro", met: 5.0, emoji: "🏅" },
];

export interface ActivityEntry {
  id: string;
  date: string;
  activityId: string;           // ref para ACTIVITY_TYPES
  activityLabel: string;        // snapshot do nome
  durationMinutes: number;
  heartRateResting?: number;    // FC repouso (bpm)
  heartRateActive?: number;     // FC ativa média (bpm)
  caloriesBurned: number;       // calculado
  notes?: string;
}
