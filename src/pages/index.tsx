import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { api } from "../utils/api";
import { useEffect } from "react";
import Router from "next/router";

const Home = () => {
  /*  const hello = api.example.hello.useQuery({ text: "from tRPC" }); */
  const { status } = useSession();

  useEffect(() => {
    status === "unauthenticated" && Router.push("/login");
    status === "authenticated" && Router.push("/dashboard");
  }, [status]);
};

export default Home;

/* const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}; */
