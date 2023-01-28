import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BottomNavbar } from "../components/dashboard/BottomNavbar/BottomNavbar";
import { Settings } from "../components/dashboard/settings/Settings";
import { LoadingFullPage } from "../components/LoadingFullPage";
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
    <>
      {status === "authenticated" ? (
        <div
          className="relative flex h-screen w-screen flex-col text-white"
          onClick={() => console.log(data, status)}
        >
          <Navbar />
          {currentDashboardSection === "settings" && <Settings />}
          <BottomNavbar
            setCurrentDashboardSection={setCurrentDasboardSection}
          />
        </div>
      ) : (
        <LoadingFullPage />
      )}
    </>
  );
};

export default dashboard;
