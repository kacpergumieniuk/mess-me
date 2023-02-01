import React from "react";

interface IAddFriendTab {
  name: string;
}

export const AddFriendTab = ({ name }: IAddFriendTab) => {
  return (
    <div className="mb-[32px] flex w-full items-center justify-between">
      <div className="flex items-center  gap-[16px]">
        {/* Avatar */}
        <div className="h-[64px] w-[64px]  rounded-full bg-yellow-300"></div>
        {/* Base item */}
        <div className="font-medium">{name}</div>
      </div>
      <button className="rounded-[20px]  bg-yellow-500 px-[20px] py-[10px]">
        Add friend
      </button>
    </div>
  );
};
