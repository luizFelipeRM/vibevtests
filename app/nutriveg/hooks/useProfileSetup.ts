import { useState, useCallback } from "react";
import { Profile } from "../types";

const initialProfile: Profile = {
  height: "",
  weight: "",
  age: "",
  gender: "male",
  goal: "maintain",
  activityLevel: "moderate",
  workoutType: "strength",
};

export const useProfileSetup = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(initialProfile);
  }, []);

  const isProfileComplete = useCallback(() => {
    return !!(profile.height && profile.weight && profile.age);
  }, [profile]);

  return {
    profile,
    updateProfile,
    resetProfile,
    isProfileComplete,
  };
};
