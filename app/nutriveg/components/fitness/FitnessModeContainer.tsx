import React, { useState, useEffect } from "react";
import { useProfileSetup } from "../../hooks/useProfileSetup";
import { useFitnessTracking } from "../../hooks/useFitnessTracking";
import { useDateNavigation } from "../../hooks/useDateNavigation";
import { foodDatabase } from "../../data/foodDatabase";
import { targetMacros } from "../../data/constants";
import { tokens } from "../../styles/tokens";
import { multiplyMacros } from "../../utils/macroCalculations";
import { ProfileSetup } from "./ProfileSetup";
import { DateNavigator } from "./DateNavigator";
import { FoodInputForm } from "./FoodInputForm";
import { QuickFoodButtons } from "./QuickFoodButtons";
import { MacroSummaryCards } from "./MacroSummaryCards";
import { MacroDistribution } from "./MacroDistribution";
import { WeeklyProgress } from "./WeeklyProgress";

type Step = "setup" | "dashboard";

export const FitnessModeContainer: React.FC = () => {
  const [step, setStep] = useState<Step>("setup");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  const { profile, updateProfile } = useProfileSetup();
  const {
    currentMacros,
    dailyLogs,
    addFoodToDate,
    loadDateData,
    setCurrentMacros,
  } = useFitnessTracking();

  const {
    selectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    dateLabel,
  } = useDateNavigation();

  // Load data when date changes
  useEffect(() => {
    loadDateData(selectedDate);
  }, [selectedDate, loadDateData]);

  const handleAddFood = () => {
    if (!foodName || !quantity) return;

    const food = foodDatabase[foodName];
    if (!food) return;

    const multiplier = parseFloat(quantity) || 1;
    const macrosToAdd = multiplyMacros(food, multiplier);

    addFoodToDate(selectedDate, macrosToAdd);
    setFoodName("");
    setQuantity("");
  };

  const handleQuickSelect = (food: string) => {
    setFoodName(food);
    setQuantity("1");
  };

  const weekdayLabel = selectedDate.toLocaleDateString("pt-BR", {
    weekday: "short",
  });

  if (step === "setup") {
    return (
      <ProfileSetup
        profile={profile}
        onChange={updateProfile}
        onComplete={() => setStep("dashboard")}
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
      {/* Header with Date Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.space.xxl,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.space.xl,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: tokens.colors.text,
                marginBottom: tokens.space.xs,
              }}
            >
              Dashboard
            </h2>
            <p style={{ fontSize: 16, color: tokens.colors.textMuted }}>
              Acompanhe seus macros em tempo real
            </p>
          </div>

          {/* Date Navigation */}
          <DateNavigator
            dateLabel={dateLabel}
            weekdayLabel={weekdayLabel}
            onPrevious={goToPreviousDay}
            onNext={goToNextDay}
            onToday={goToToday}
          />
        </div>
        <button
          onClick={() => setStep("setup")}
          style={{
            padding: `${tokens.space.md}px ${tokens.space.lg}px`,
            background: "white",
            color: tokens.colors.text,
            border: `2px solid ${tokens.colors.border}`,
            borderRadius: tokens.radii.md,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ⚙️ Configurações
        </button>
      </div>

      {/* Macro Summary Cards */}
      <MacroSummaryCards macros={currentMacros} targets={targetMacros} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: tokens.space.xl,
        }}
      >
        {/* Left: Food Input */}
        <div>
          <FoodInputForm
            foodName={foodName}
            quantity={quantity}
            onFoodNameChange={setFoodName}
            onQuantityChange={setQuantity}
            onAdd={handleAddFood}
          />

          <QuickFoodButtons
            foods={Object.keys(foodDatabase).slice(0, 6)}
            onSelect={handleQuickSelect}
          />
        </div>

        {/* Right: Charts */}
        <div>
          <MacroDistribution macros={currentMacros} targets={targetMacros} />
          <WeeklyProgress
            currentMacros={currentMacros}
            targetMacros={targetMacros}
            dailyLogs={dailyLogs}
            currentDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};
