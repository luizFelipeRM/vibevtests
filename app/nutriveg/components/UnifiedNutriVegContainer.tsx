import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNutriVegMode } from "../hooks/useNutriVegMode";
import { useFitnessTracking } from "../hooks/useFitnessTracking";
import { useDateNavigation } from "../hooks/useDateNavigation";
import { tokens } from "../styles/tokens";
import { FoodInputSection } from "./unified/FoodInputSection";
import { MacroSummarySection } from "./unified/MacroSummarySection";
import { ChartsSection } from "./unified/ChartsSection";
import { RecommendationsSection } from "./unified/RecommendationsSection";
import { ProfileSetup } from "./fitness/ProfileSetup";
import { useProfileSetup } from "../hooks/useProfileSetup";
import { DashboardHeader } from "./unified/DashboardHeader";

export const UnifiedNutriVegContainer: React.FC = () => {
  const { mode, toggleMode, isBasic, isFitness } = useNutriVegMode();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const { profile, updateProfile } = useProfileSetup();

  const {
    currentMacros,
    dailyLogs,
    addFoodToDate,
    loadDateData,
  } = useFitnessTracking();

  const {
    selectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    dateLabel,
  } = useDateNavigation();

  // Load data when date changes (only for fitness mode)
  useEffect(() => {
    if (isFitness) {
      loadDateData(selectedDate);
    }
  }, [selectedDate, isFitness, loadDateData]);

  const weekdayLabel = selectedDate.toLocaleDateString("pt-BR", {
    weekday: "short",
  });

  // Show profile setup on first time in fitness mode
  useEffect(() => {
    if (isFitness && !profile.height) {
      setShowProfileSetup(true);
    } else {
      setShowProfileSetup(false);
    }
  }, [isFitness, profile.height]);

  if (showProfileSetup) {
    return (
      <ProfileSetup
        profile={profile}
        onChange={updateProfile}
        onComplete={() => setShowProfileSetup(false)}
      />
    );
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: `${tokens.space.xxl}px ${tokens.space.xl}px`,
      }}
    >
      {/* Header */}
      <DashboardHeader
        mode={mode}
        isFitness={isFitness}
        onModeChange={toggleMode}
        selectedDate={selectedDate}
        dateLabel={dateLabel}
        weekdayLabel={weekdayLabel}
        onPreviousDay={goToPreviousDay}
        onNextDay={goToNextDay}
        onToday={goToToday}
        onSettingsClick={() => setShowProfileSetup(true)}
      />

      {/* Macro Summary Cards */}
      <MacroSummarySection currentMacros={currentMacros} />

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: tokens.space.xl,
          marginBottom: tokens.space.xxl,
        }}
      >
        {/* Left: Food Input */}
        <FoodInputSection
          mode={mode}
          selectedDate={selectedDate}
          onAddFood={addFoodToDate}
        />

        {/* Right: Charts */}
        <ChartsSection
          currentMacros={currentMacros}
          dailyLogs={dailyLogs}
          currentDate={selectedDate}
        />
      </div>

      {/* Recommendations */}
      {isBasic && <RecommendationsSection />}
    </div>
  );
};
