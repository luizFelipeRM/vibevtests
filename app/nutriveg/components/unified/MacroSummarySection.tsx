import React from "react";
import { Macros, Mode } from "../../types";
import { targetMacros } from "../../data/constants";
import { MacroSummaryCards } from "../fitness/MacroSummaryCards";

interface MacroSummarySectionProps {
  mode: Mode;
  currentMacros: Macros;
}

export const MacroSummarySection: React.FC<MacroSummarySectionProps> = ({
  mode,
  currentMacros,
}) => {
  return <MacroSummaryCards mode={mode} macros={currentMacros} targets={targetMacros} />;
};
