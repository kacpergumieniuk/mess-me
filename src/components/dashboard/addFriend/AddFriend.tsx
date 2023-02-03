import { User } from ".prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { api } from "../../../utils/api";
import { AddFriendTab } from "./AddFriendTab";

interface IAddFriend {
  friends: User[];
  refetchUser: Function;
}

export const AddFriend = ({ friends, refetchUser }: IAddFriend) => {
  const { data, status } = useSession();

  const friendsEmails = friends.map((friend) => {
    return friend.email;
  });

  const { data: allUsers } = api.user.getAllUsers.useQuery();
  return (
    <div className="flex-1">
      <div className="mt-[24px] px-[24px]">
        <h1 className="mb-[24px] text-2xl font-black">Add new friend</h1>
        {allUsers?.map(
          (user) =>
            data?.user?.email !== user.email && (
              <AddFriendTab
                name={user.name}
                email={user.email}
                key={user.id}
                disabled={friendsEmails.includes(user.email)}
                refetchUser={refetchUser}
              />
            )
        )}
      </div>
    </div>
  );
};
