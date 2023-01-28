import React from "react";
import ReactLoading from "react-loading";

export const LoadingFullPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-bg-color">
      <ReactLoading color={"white"} type={"spinningBubbles"} />
    </div>
  );
};
