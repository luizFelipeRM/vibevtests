"use client";

import React from "react";
import { tokens } from "./styles/tokens";
import { Header } from "./components/shared/Header";
import { UnifiedNutriVegContainer } from "./components/UnifiedNutriVegContainer";

export default function NutriVegPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.colors.bg,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Header />
      <UnifiedNutriVegContainer />

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
        }
        button,
        input,
        select,
        textarea {
          font-family: inherit;
        }
        input,
        select,
        textarea {
          color: #0f172a !important;
        }
        input::placeholder,
        textarea::placeholder {
          color: #94a3b8 !important;
          opacity: 1;
        }
        input::-webkit-input-placeholder,
        textarea::-webkit-input-placeholder {
          color: #94a3b8 !important;
          opacity: 1;
        }
        input::-moz-placeholder,
        textarea::-moz-placeholder {
          color: #94a3b8 !important;
          opacity: 1;
        }
        input:-ms-input-placeholder,
        textarea:-ms-input-placeholder {
          color: #94a3b8 !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
