import React from "react";
import { DashboardSection } from "../../pages/dashboard";

interface BottomNavbarButton {
  label: string;
  setCurrentDashboardSection: (section: DashboardSection) => void;
  value: DashboardSection;
}

export const BottomNavbarButton = ({
  label,
  setCurrentDashboardSection,
  value,
}: BottomNavbarButton) => {
  return (
    <button onClick={() => setCurrentDashboardSection(value)}>{label}</button>
  );
};
