import { useState, useCallback, useEffect } from "react";
import { Profile } from "../types";

const initialProfile: Profile = {
  height: "",
  weight: "",
  age: "",
  gender: "male",
  goal: "maintain",
  activityLevel: "moderate",
  workoutType: "strength",
  workoutStartTime: "18:00",
  workoutEndTime: "19:30",
  meals: [
    { id: "breakfast", name: "Café da Manhã", time: "08:00" },
    { id: "lunch", name: "Almoço", time: "12:30" },
    { id: "dinner", name: "Jantar", time: "19:30" },
    { id: "supper", name: "Ceia", time: "22:00" },
  ],
  tmb: "",
  tdee: "",
  calorieGoal: "",
  proteinPerKg: "",
  carbsPerKg: "",
  fatsPerKg: "",
};

export const useProfileSetup = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [lastCalcHash, setLastCalcHash] = useState("");

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(initialProfile);
    setLastCalcHash("");
  }, []);

  const isProfileComplete = useCallback(() => {
    return !!(profile.height && profile.weight && profile.age);
  }, [profile]);

  useEffect(() => {
    if (!profile.weight || !profile.height || !profile.age) return;

    const w = parseFloat(profile.weight);
    const h = parseFloat(profile.height);
    const a = parseFloat(profile.age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) return;

    const currentHash = `${w}-${h}-${a}-${profile.gender}-${profile.activityLevel}-${profile.goal}`;
    if (currentHash === lastCalcHash) return;

    let tmb = (10 * w) + (6.25 * h) - (5 * a) + (profile.gender === "male" ? 5 : -161);
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    const tdee = tmb * activityMultipliers[profile.activityLevel];

    let calorieGoal = tdee;
    if (profile.goal === "lose") calorieGoal -= 500;
    if (profile.goal === "gain") calorieGoal += 500;

    let proteinPerKg = 2.0; 
    if (profile.goal === "lose") proteinPerKg = 2.2;
    if (profile.goal === "gain") proteinPerKg = 1.8; 
    
    let fatsPerKg = 1.0;
    
    const proteinCals = (proteinPerKg * w) * 4;
    const fatCals = (fatsPerKg * w) * 9;
    const remainingCals = calorieGoal - proteinCals - fatCals;
    let carbsPerKg = (remainingCals / 4) / w;

    if (carbsPerKg < 1) {
       fatsPerKg = 0.8;
       const adjFatCals = (fatsPerKg * w) * 9;
       carbsPerKg = (calorieGoal - proteinCals - adjFatCals) / 4 / w;
       if (carbsPerKg < 0) carbsPerKg = 0.5; 
    }

    setProfile(prev => ({
      ...prev,
      tmb: Math.round(tmb).toString(),
      tdee: Math.round(tdee).toString(),
      calorieGoal: Math.round(calorieGoal).toString(),
      proteinPerKg: proteinPerKg.toFixed(1),
      fatsPerKg: fatsPerKg.toFixed(1),
      carbsPerKg: carbsPerKg.toFixed(1)
    }));
    
    setLastCalcHash(currentHash);
  }, [profile.weight, profile.height, profile.age, profile.gender, profile.activityLevel, profile.goal, lastCalcHash]);

  return {
    profile,
    updateProfile,
    resetProfile,
    isProfileComplete,
  };
};
