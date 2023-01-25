import React, { useState } from "react";
import { CreateAccount } from "../components/login/CreateAccount";
import { Login } from "../components/login/Login";
import { MainLogin } from "../components/login/MainLogin";

export type LoginPageState = "main" | "login" | "signup";

const login = () => {
  const [loginPageState, setLoginPageState] = useState<LoginPageState>("main");
  const handleSetLoginPageState = (state: LoginPageState) => {
    setLoginPageState(state);
  };

  return (
    <>
      {loginPageState === "main" && (
        <MainLogin handleSetLoginPageState={handleSetLoginPageState} />
      )}
      {loginPageState === "signup" && (
        <CreateAccount handleSetLoginPageState={handleSetLoginPageState} />
      )}
      {loginPageState === "login" && <Login />}
    </>
  );
};

export default login;
