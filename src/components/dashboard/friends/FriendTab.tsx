import React from "react";

export interface IFRiendTab {
  name: string;
}

export const FriendTab = ({ name }: IFRiendTab) => {
  return (
    <div className="mb-[32px] flex w-full items-center justify-between">
      <div className="flex items-center  gap-[16px]">
        {/* Avatar */}
        <div className="h-[64px] w-[64px]  rounded-full bg-yellow-300"></div>
        {/* Base item */}
        <div className="font-medium">{name}</div>
      </div>
      <p className="text-red-400">Remove</p>
    </div>
  );
};
