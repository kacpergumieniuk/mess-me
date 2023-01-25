import React from "react";
import { LoginPageState } from "../../pages/login";
import { Button } from "../Button";
import { Navbar } from "../navbar/Navbar";

interface MainLogin {
  handleSetLoginPageState: (state: LoginPageState) => void;
}

export const MainLogin = ({ handleSetLoginPageState }: MainLogin) => {
  return (
    <main className="relative h-screen w-screen bg-bg-color text-white">
      <Navbar />
      <div className=" px-[46px] text-center">
        <h1 className=" mb-[24px] text-2xl font-black">
          Keep friends close to each other
        </h1>
        <p className="mb-[24px] text-xs font-normal">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
        <div className="flex justify-center gap-[8px]">
          <Button onClick={() => handleSetLoginPageState("login")}>
            Sign in
          </Button>
          <Button
            variant="black"
            onClick={() => handleSetLoginPageState("signup")}
          >
            Create account
          </Button>
        </div>
      </div>
      <img
        src="/mainLoginImage.png"
        alt=""
        className="absolute bottom-0 w-full"
      />
    </main>
  );
};
