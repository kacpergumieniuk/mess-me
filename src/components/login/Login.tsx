import React, { useState } from "react";
import { Button } from "../Button";
import { Navbar } from "../navbar/Navbar";
import { signIn, useSession } from "next-auth/react";

export const Login = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const { status, data } = useSession();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailValue(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    e.target.value.length < 8
      ? setIsPasswordValid(false)
      : setIsPasswordValid(true);
  };

  const handleSubmit = () => {
    try {
      signIn("credentials", {
        email: emailValue,
        password: passwordValue,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="relative h-screen w-screen bg-bg-color text-white">
      <Navbar />
      <div className=" px-[46px] text-center">
        <h1 className=" mb-[24px] text-2xl font-black">Sign up</h1>
        <div className="gap-[8px] text-center">
          <form>
            <input
              onChange={handleEmailChange}
              value={emailValue}
              type="email"
              className={` mb-3 w-full rounded-[100px] border border-[#585858] bg-bg-color px-[20px] py-[8px] text-[#585858] placeholder-[#585858] outline-none ${
                !isEmailValid && "border-red-700"
              }`}
              placeholder="E-mail"
            />
            <input
              onChange={handlePasswordChange}
              value={passwordValue}
              type="password"
              className="mb-6 w-full rounded-[100px] border border-[#585858] bg-bg-color px-[20px] py-[8px] text-[#585858] placeholder-[#585858]"
              placeholder="Password"
            />
          </form>
          <Button
            onClick={handleSubmit}
            style={"mb-3"}
            disabled={
              !isEmailValid ||
              !emailValue.length ||
              !isPasswordValid ||
              !passwordValue.length
            }
          >
            Sign up
          </Button>
        </div>
      </div>
      <img src="/signInImage.png" alt="" className="absolute bottom-0 w-full" />
    </main>
  );
};
