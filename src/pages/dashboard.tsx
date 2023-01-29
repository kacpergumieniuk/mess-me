import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AddNamePage } from "../components/dashboard/AddNamePage";
import { BottomNavbar } from "../components/dashboard/BottomNavbar/BottomNavbar";
import { Settings } from "../components/dashboard/settings/Settings";
import { LoadingFullPage } from "../components/LoadingFullPage";
import { Navbar } from "../components/navbar/Navbar";
import { api } from "../utils/api";

export type DashboardSection = "main" | "settings" | "friends" | "add";

const dashboard = () => {
  const { data, status } = useSession();

  const [user, setUser] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentDashboardSection, setCurrentDasboardSection] =
    useState<DashboardSection>("main");

  const [addNameState, setAddNameState] = useState<boolean>(false);

  const { data: getUserData } = api.user.getUserByEmail.useQuery(
    { email: user },
    {
      enabled: !!user,
      onSuccess: (data) => {
        setIsLoading(false);
        handleCheckIfNameIsSet(data.name);
      },
    }
  );

  const handleSetAddNameState = (value: boolean) => {
    setAddNameState(value);
  };

  const handleCheckIfNameIsSet = (name: string) => {
    if (name.length === 0) {
      setAddNameState(true);
    }
  };

  useEffect(() => {
    if (
      data &&
      typeof data.user?.email === "string" &&
      user !== data.user.email
    ) {
      setUser(data.user.email);
    }
  }, [status]);

  return (
    <>
      {!addNameState ? (
        <>
          {!isLoading ? (
            <div className="relative flex h-screen w-screen flex-col text-black">
              <Navbar />
              {getUserData && getUserData.name}
              {currentDashboardSection === "settings" && <Settings />}
              <BottomNavbar
                setCurrentDashboardSection={setCurrentDasboardSection}
              />
            </div>
          ) : (
            <LoadingFullPage />
          )}
        </>
      ) : (
        <AddNamePage setAddNameState={handleSetAddNameState} />
      )}
    </>
  );
};

export default dashboard;
