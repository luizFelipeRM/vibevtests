"use client";
import { useState, useRef } from "react";
import { colors } from "@/src/design/colors";
import IntroSection from "./_sections/IntroSection";
import QuestionsSection from "./_sections/QuestionsSection";

export default function GuiaVeganoPage() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);
  const questionsRef = useRef<HTMLDivElement>(null);

  const scrollToSolution = () => {
    questionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: colors.background,
        fontFamily: "'Inter', sans-serif",
        color: colors.text_primary,
      }}
    >
      <IntroSection onStartClick={scrollToSolution} />
      <QuestionsSection
        expandedIndices={expandedIndices}
        setExpandedIndices={setExpandedIndices}
        sectionRef={questionsRef}
      />
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: "Inter", sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        button {
          font-family: inherit;
          outline: none;
        }
      `}</style>
    </div>
  );
}
