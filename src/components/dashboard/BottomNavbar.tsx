import React from "react";

interface BottomNavOption {
  label: string;
  value: string;
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

export const BottomNavbar = () => {
  return (
    <div className="absolute bottom-0 flex w-full justify-around">
      {bottomNavOptions.map((option) => (
        <div key={option.value}>{option.label}</div>
      ))}
    </div>
  );
};
