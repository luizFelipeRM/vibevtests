import { useState, useEffect, useCallback } from "react";
import { CardioEntry, StrengthEntry, ActivityEntry, ACTIVITY_TYPES } from "../types";

const STORAGE_KEY_CARDIO = "nutriveg_cardio_v1";
const STORAGE_KEY_STRENGTH = "nutriveg_strength_v1";
const STORAGE_KEY_ACTIVITIES = "nutriveg_activities_v1";

// ─── Calorie calculation helpers ────────────────────────────────────────────

/**
 * HR-based calorie formula (Keytel et al., 2005)
 * gender: "male" | "female"
 * age: years | weight: kg | hr: bpm | duration: minutes
 */
export function calcCaloriesFromHR(
  gender: "male" | "female",
  age: number,
  weight: number,
  hr: number,
  durationMinutes: number
): number {
  const t = durationMinutes / 60;
  let kcalPerHour: number;
  if (gender === "male") {
    kcalPerHour = (age * 0.2017 + weight * 0.09036 + hr * 0.6309 - 55.0969) / 4.184;
  } else {
    kcalPerHour = (age * 0.074 - weight * 0.05741 + hr * 0.4472 - 20.4022) / 4.184;
  }
  return Math.round(Math.max(0, kcalPerHour * t));
}

/**
 * MET-based calorie calculation (fallback when no HR data)
 * Calories = MET × weight(kg) × duration(hours)
 */
export function calcCaloriesFromMET(met: number, weight: number, durationMinutes: number): number {
  return Math.round(met * weight * (durationMinutes / 60));
}

export const useWorkouts = () => {
  const [cardioLogs, setCardioLogs] = useState<CardioEntry[]>([]);
  const [strengthLogs, setStrengthLogs] = useState<StrengthEntry[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCardio = localStorage.getItem(STORAGE_KEY_CARDIO);
      if (storedCardio) setCardioLogs(JSON.parse(storedCardio));

      const storedStrength = localStorage.getItem(STORAGE_KEY_STRENGTH);
      if (storedStrength) setStrengthLogs(JSON.parse(storedStrength));

      const storedActivities = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
      if (storedActivities) setActivityLogs(JSON.parse(storedActivities));
    } catch (error) {
      console.error("Error loading workouts", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY_CARDIO, JSON.stringify(cardioLogs));
      localStorage.setItem(STORAGE_KEY_STRENGTH, JSON.stringify(strengthLogs));
      localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activityLogs));
    }
  }, [cardioLogs, strengthLogs, activityLogs, isLoaded]);

  // ── Cardio ──
  const addCardioLog = useCallback((
    entry: Omit<CardioEntry, "id" | "pace">,
    profile?: { gender: "male" | "female"; age: number; weight: number }
  ) => {
    const paceMinutes = entry.durationMinutes / entry.distanceKm;
    const mins = Math.floor(paceMinutes);
    const secs = Math.round((paceMinutes - mins) * 60);
    const paceStr = `${mins}:${secs.toString().padStart(2, "0")} /km`;

    let caloriesBurned = entry.caloriesBurned;
    if (!caloriesBurned && profile && entry.heartRateActive) {
      caloriesBurned = calcCaloriesFromHR(
        profile.gender, profile.age, profile.weight,
        entry.heartRateActive, entry.durationMinutes
      );
    } else if (!caloriesBurned) {
      // Fallback MET corrida ~9.8
      const weight = profile?.weight ?? 70;
      caloriesBurned = calcCaloriesFromMET(9.8, weight, entry.durationMinutes);
    }

    const newEntry: CardioEntry = {
      ...entry,
      caloriesBurned,
      id: `cardio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pace: paceStr,
    };

    setCardioLogs((prev) =>
      [...prev, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  }, []);

  const removeCardioLog = useCallback((id: string) => {
    setCardioLogs((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ── Strength ──
  const addStrengthLog = useCallback((entry: Omit<StrengthEntry, "id">) => {
    const newEntry: StrengthEntry = {
      ...entry,
      id: `strength_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    setStrengthLogs((prev) =>
      [...prev, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  }, []);

  const removeStrengthLog = useCallback((id: string) => {
    setStrengthLogs((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ── Activities ──
  const addActivityLog = useCallback((
    entry: Omit<ActivityEntry, "id" | "caloriesBurned">,
    profile?: { gender: "male" | "female"; age: number; weight: number }
  ) => {
    const activityDef = ACTIVITY_TYPES.find((a) => a.id === entry.activityId);
    const met = activityDef?.met ?? 5.0;
    const weight = profile?.weight ?? 70;

    let caloriesBurned: number;
    if (profile && entry.heartRateActive && entry.heartRateResting) {
      // Use HR formula when both HR values are available
      caloriesBurned = calcCaloriesFromHR(
        profile.gender, profile.age, weight,
        entry.heartRateActive, entry.durationMinutes
      );
    } else {
      // Fallback to MET
      caloriesBurned = calcCaloriesFromMET(met, weight, entry.durationMinutes);
    }

    const newEntry: ActivityEntry = {
      ...entry,
      caloriesBurned,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    setActivityLogs((prev) =>
      [...prev, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  }, []);

  const removeActivityLog = useCallback((id: string) => {
    setActivityLogs((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return {
    cardioLogs, addCardioLog, removeCardioLog,
    strengthLogs, addStrengthLog, removeStrengthLog,
    activityLogs, addActivityLog, removeActivityLog,
    isLoaded,
  };
};
