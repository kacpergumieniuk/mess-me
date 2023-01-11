import React from "react";
import { Button } from "../components/Button";

const login = () => {
  return (
    <main className="h-screen w-screen bg-bg-color text-white">
      <nav className="mb-[70px] flex w-full items-center justify-center gap-1 pt-[1.5rem]">
        <div className="border-rounded h-[25px] w-[25px] rounded-full bg-yellow-300"></div>
        <p className="text-xl font-black">Mess.me</p>
      </nav>
      <div className="px-[46px] text-center">
        <h1 className=" mb-[24px] text-2xl font-black">
          Keep friends close to each other
        </h1>
        <p className="mb-[24px] text-xs font-normal">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
        <div className="flex justify-center gap-[8px]">
          <Button>Sign in</Button>
          <Button variant="black">Create account</Button>
        </div>
      </div>
    </main>
  );
};

export default login;
