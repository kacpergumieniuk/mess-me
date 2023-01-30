import React from "react";
import { AiOutlineArrowLeft as BackToMainArrow } from "react-icons/ai";

interface INavbar {
  isArrow?: boolean;
  handleBackToMain?: () => void;
}

export const Navbar = ({ isArrow = false, handleBackToMain }: INavbar) => {
  return (
    <nav className="relative flex w-full items-center justify-center gap-1 bg-bg-color py-[1.5rem]">
      {isArrow && (
        <BackToMainArrow
          className="absolute left-5 h-[25px] w-[25px] text-white"
          onClick={handleBackToMain}
        />
      )}
      <div className="border-rounded h-[24px] w-[24px] rounded-full bg-yellow-300"></div>
      <p className="text-xl font-black text-white">Mess.me</p>
    </nav>
  );
};
