import React, { useState, useEffect } from "react";
import { useNutriVegMode } from "../hooks/useNutriVegMode";
import { useFitnessTracking } from "../hooks/useFitnessTracking";
import { useDateNavigation } from "../hooks/useDateNavigation";
import { tokens } from "../styles/tokens";
import { FoodInputSection } from "./unified/FoodInputSection";
import { MacroSummarySection } from "./unified/MacroSummarySection";
import { ChartsSection } from "./unified/ChartsSection";
import { RecommendationsSection } from "./unified/RecommendationsSection";
import { SocialHypeSection } from "./unified/SocialHypeSection";
import { ProfileSetup } from "./fitness/ProfileSetup";
import { useProfileSetup } from "../hooks/useProfileSetup";
import { NutritionalStatusBanner } from "./unified/NutritionalStatusBanner";
import { DashboardHeader } from "./unified/DashboardHeader";

export const UnifiedNutriVegContainer: React.FC = () => {
  const { mode, toggleMode, isBasic, isFitness } = useNutriVegMode();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const { profile, updateProfile } = useProfileSetup();

  const {
    currentMacros,
    currentItems,
    dailyLogs,
    addFoodToDate,
    removeFoodFromDate,
    updateFoodQuantity,
    loadDateData,
  } = useFitnessTracking();

  const {
    selectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    dateLabel,
  } = useDateNavigation();

  // Load data when date or mode changes
  useEffect(() => {
    if (isFitness) {
      loadDateData(selectedDate);
    } else {
      // Basic mode: load a special "typical routine" data
      loadDateData(new Date(1970, 0, 1));
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

      {/* Nutritional Status Feedback */}
      {isFitness && (
        <NutritionalStatusBanner
          daysInStreak={5}
          isPositive={true}
        />
      )}

      {/* Macro Summary Cards */}
      <MacroSummarySection mode={mode} currentMacros={currentMacros} />

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: tokens.space.xl,
          marginBottom: tokens.space.xxl,
        }}
      >
        {/* Left: Food Input */}
        <FoodInputSection
          mode={mode}
          selectedDate={isBasic ? new Date(1970, 0, 1) : selectedDate}
          onAddFood={addFoodToDate}
          foodItems={currentItems}
          onRemoveFood={removeFoodFromDate}
          onUpdateQuantity={updateFoodQuantity}
        />

        {/* Right: Charts */}
        <ChartsSection
          mode={mode}
          currentMacros={currentMacros}
          dailyLogs={dailyLogs}
          currentDate={selectedDate}
        />
      </div>

      {/* Social & Gamification */}
      {isFitness && <SocialHypeSection />}

      {/* Recommendations */}
      {isBasic && <RecommendationsSection />}
    </div>
  );
};
