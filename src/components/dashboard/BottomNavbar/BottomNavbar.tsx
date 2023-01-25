import React from "react";
import { DashboardSection } from "../../../pages/dashboard";
import { BottomNavbarButton } from "../BottomNavbarButton";

interface BottomNavOption {
  label: string;
  value: DashboardSection;
}

interface BottomNavbar {
  setCurrentDashboardSection: (section: DashboardSection) => void;
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

export const BottomNavbar = ({ setCurrentDashboardSection }: BottomNavbar) => {
  return (
    <div className="absolute bottom-0 flex w-full justify-around py-[13px] px-[24px]">
      {bottomNavOptions.map((option) => (
        <BottomNavbarButton
          label={option.label}
          key={option.value}
          setCurrentDashboardSection={setCurrentDashboardSection}
          value={option.value}
        />
      ))}
    </div>
  );
};
