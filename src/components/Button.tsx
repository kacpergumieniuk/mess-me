import React, { Children } from "react";

interface Button {
  children: React.ReactNode;
  variant?: "black" | "white";
  onClick?: () => void;
  style?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "white",
  onClick,
  style,
  disabled,
}: Button) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-[100px]  px-[20px] py-[12px] ${
        variant === "white" && "bg-white text-bg-color disabled:bg-gray-500"
      } ${
        variant === "black" &&
        "border border-white bg-bg-color text-white disabled:bg-gray-500"
      } ${style}`}
    >
      {children}
    </button>
  );
};
