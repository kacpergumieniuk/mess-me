import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-center gap-1 bg-bg-color py-[1.5rem]">
      <div className="border-rounded h-[25px] w-[25px] rounded-full bg-yellow-300"></div>
      <p className="text-xl font-black text-white">Mess.me</p>
    </nav>
  );
};
