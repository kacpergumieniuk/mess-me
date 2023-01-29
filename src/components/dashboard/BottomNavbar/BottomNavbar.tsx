import React from "react";
import { DashboardSection } from "../../../pages/dashboard";
import { BottomNavbarButton } from "../BottomNavbarButton";

interface BottomNavbar {
  setCurrentDashboardSection: (section: DashboardSection) => void;
  currentDashboardSection: DashboardSection;
}
interface BottomNavOption {
  label: string;
  value: DashboardSection;
}

const bottomNavOptions: BottomNavOption[] = [
  {
    label: "Add",
    value: "add",
  },
  {
    label: "Friends",
    value: "friends",
  },
  {
    label: "Settings",
    value: "settings",
  },
];

export const BottomNavbar = ({
  setCurrentDashboardSection,
  currentDashboardSection,
}: BottomNavbar) => {
  return (
    <div className="absolute bottom-0 z-50 flex w-full justify-around bg-bg-color py-[13px] px-[24px] ">
      {bottomNavOptions.map((option) => (
        <BottomNavbarButton
          label={option.label}
          key={option.value}
          setCurrentDashboardSection={setCurrentDashboardSection}
          currentDashboardSection={currentDashboardSection}
          value={option.value}
        />
      ))}
    </div>
  );
};
