import React, { Children } from "react";

interface Button {
  children: React.ReactNode;
  variant?: "black" | "white";
}

export const Button = ({ children, variant = "white" }: Button) => {
  return (
    <button
      className={`rounded-[100px]  px-[20px] py-[12px] ${
        variant === "white" && "bg-white text-bg-color"
      } ${variant === "black" && "border border-white bg-bg-color text-white"}`}
    >
      {children}
    </button>
  );
};
