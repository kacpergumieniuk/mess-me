import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AddFriend } from "../components/dashboard/addFriend/AddFriend";
import { AddNamePage } from "../components/dashboard/AddNamePage";
import { BottomNavbar } from "../components/dashboard/BottomNavbar/BottomNavbar";
import { Friends } from "../components/dashboard/friends/Friends";
import { Settings } from "../components/dashboard/settings/Settings";
import { LoadingFullPage } from "../components/LoadingFullPage";
import { Navbar } from "../components/navbar/Navbar";
import { api } from "../utils/api";

export type DashboardSection = "main" | "settings" | "friends" | "add";

const dashboard = () => {
  const { data, status } = useSession();

  const [userEmail, setUserEmail] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentDashboardSection, setCurrentDasboardSection] =
    useState<DashboardSection>("main");

  const [addNameState, setAddNameState] = useState<boolean>(false);

  const isArrow = currentDashboardSection !== "main";
  const { data: getUserData, refetch: refetchUser } =
    api.user.getUserByEmail.useQuery(
      { email: userEmail },
      {
        enabled: !!userEmail,
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

  const handleBackToMain = () => {
    setCurrentDasboardSection("main");
  };

  useEffect(() => {
    if (
      data &&
      typeof data.user?.email === "string" &&
      userEmail !== data.user.email
    ) {
      setUserEmail(data.user.email);
    }
  }, [status]);

  return (
    <>
      {!addNameState ? (
        <>
          {!isLoading ? (
            <div
              className="relative flex h-screen w-screen flex-col text-black"
              onClick={() => console.log(getUserData)}
            >
              <Navbar isArrow={isArrow} handleBackToMain={handleBackToMain} />
              {currentDashboardSection === "settings" && (
                <Settings
                  name={getUserData!.name}
                  email={userEmail}
                  refetchUser={refetchUser}
                />
              )}
              {currentDashboardSection === "add" && (
                <AddFriend
                  invitedUsers={getUserData!.invitedUsers}
                  refetchUser={refetchUser}
                  invitationsFromUsers={getUserData!.invitationsFromUsers}
                />
              )}
              {currentDashboardSection === "friends" && <Friends />}
              {currentDashboardSection === "main" && (
                <div className="flex-1 overflow-auto"></div>
              )}
              <BottomNavbar
                setCurrentDashboardSection={setCurrentDasboardSection}
                currentDashboardSection={currentDashboardSection}
              />
            </div>
          ) : (
            <LoadingFullPage />
          )}
        </>
      ) : (
        <AddNamePage
          setAddNameState={handleSetAddNameState}
          refetchUser={refetchUser}
        />
      )}
    </>
  );
};

export default dashboard;
