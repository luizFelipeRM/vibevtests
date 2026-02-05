import React from "react";
import { Macros } from "../../types";
import { targetMacros } from "../../data/constants";
import { MacroSummaryCards } from "../fitness/MacroSummaryCards";

interface MacroSummarySectionProps {
  currentMacros: Macros;
}

export const MacroSummarySection: React.FC<MacroSummarySectionProps> = ({
  currentMacros,
}) => {
  return <MacroSummaryCards macros={currentMacros} targets={targetMacros} />;
};
