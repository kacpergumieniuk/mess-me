import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { BottomNavbar } from "../components/dashboard/BottomNavbar";
import { Navbar } from "../components/navbar/Navbar";

const dashboard = () => {
  const { data, status } = useSession();

  useEffect(() => {
    console.log(data, status);
  }, [status]);
  return (
    <div className="relative h-screen w-screen bg-bg-color text-white">
      <Navbar />
      <BottomNavbar />
    </div>
  );
};

export default dashboard;
