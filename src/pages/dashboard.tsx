import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BottomNavbar } from "../components/dashboard/BottomNavbar/BottomNavbar";
import { Navbar } from "../components/navbar/Navbar";

export type DashboardSection = "main" | "settings" | "friends" | "add";

const dashboard = () => {
  const { data, status } = useSession();

  const [currentDashboardSection, setCurrentDasboardSection] =
    useState<DashboardSection>("main");

  useEffect(() => {
    console.log(data, status);
  }, [status]);
  return (
    <div
      className="relative h-screen w-screen bg-bg-color text-white"
      onClick={() => console.log(data, status)}
    >
      <Navbar />
      <p>hello {data?.user?.email}</p>
      <BottomNavbar setCurrentDashboardSection={setCurrentDasboardSection} />
    </div>
  );
};

export default dashboard;
