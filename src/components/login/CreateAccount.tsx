import React, { useState } from "react";
import { api } from "../../utils/api";
import { Button } from "../Button";
import { Navbar } from "../navbar/Navbar";
import { useSession } from "next-auth/react";
import { LoginPageState } from "../../pages/login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreateAccount {
  handleSetLoginPageState: (state: LoginPageState) => void;
}

export const CreateAccount = ({ handleSetLoginPageState }: CreateAccount) => {
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

  const mutation = api.user.registerUser.useMutation();

  const handleSubmit = () => {
    mutation.mutate(
      { email: emailValue, password: passwordValue },
      {
        onSuccess: () => {
          handleSetLoginPageState("login");
          toast.success("Account created succesfuly!! 🦄", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
          });
        },
      }
    );
  };

  return (
    <main
      className="relative h-screen w-screen bg-bg-color text-white"
      onClick={() => console.log(status, data)}
    >
      <Navbar />
      <div className=" px-[46px] text-center">
        <h1 className=" mb-[24px] text-2xl font-black">Create account</h1>
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
            Create account
          </Button>
          {mutation.error && (
            <p className="text-xs text-red-700">{mutation.error.message}</p>
          )}
        </div>
      </div>
      <img
        src="/createAccountImage.png"
        alt=""
        className="absolute bottom-0 w-full"
      />
    </main>
  );
};
