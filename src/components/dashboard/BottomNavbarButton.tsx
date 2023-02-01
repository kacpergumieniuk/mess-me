import React from "react";
import { DashboardSection } from "../../pages/dashboard";

interface BottomNavbarButton {
  label: string;
  setCurrentDashboardSection: (section: DashboardSection) => void;
  value: DashboardSection;
  currentDashboardSection: DashboardSection;
}

export const BottomNavbarButton = ({
  label,
  setCurrentDashboardSection,
  value,
  currentDashboardSection,
}: BottomNavbarButton) => {
  const isSectionActive = currentDashboardSection === value;

  return (
    <button
      className={`${isSectionActive ? "text-white" : "text-grayish"}`}
      onClick={() => setCurrentDashboardSection(value)}
    >
      <div className="flex gap-1">
        <img src={`${value}.svg`} alt="" />
        <p>{label}</p>
      </div>
    </button>
  );
};
