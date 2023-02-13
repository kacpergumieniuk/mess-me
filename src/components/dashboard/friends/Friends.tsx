import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { IUser } from "../../../types/apiTypes";
import { api } from "../../../utils/api";

interface IFriends {
  userEmail: string;
}

export const Friends = ({ userEmail }: IFriends) => {
  const { data: friendsData } = api.user.getUserFriends.useQuery({
    userEmail: userEmail,
  });

  return (
    <div className="flex-1 overflow-auto">
      <div className="mt-[24px] px-[24px]">
        <h1 className="mb-[24px] text-2xl font-black">My friends</h1>
        {friendsData?.map((friend) => (
          <p>{friend.name}</p>
        ))}
      </div>
    </div>
  );
};
