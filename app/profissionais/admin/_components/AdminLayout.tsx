"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { colors } from "../../src/design/colors";
import { space } from "../../src/design/space";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: colors.surface_alt }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 280 }}>
        <TopBar title={title} subtitle={subtitle} />
        <main style={{ padding: space.xl }}>
          {children}
        </main>
      </div>
    </div>
  );
};
