import { useSession } from "next-auth/react";
import React from "react";
import { api } from "../../../utils/api";
import { AddFriendTab } from "./AddFriendTab";

interface IAddFriend {}

export const AddFriend = () => {
  const { data, status } = useSession();

  const { data: allUsers } = api.user.getAllUsers.useQuery();
  return (
    <div className="flex-1" onClick={() => console.log(allUsers)}>
      <div className="mt-[24px] px-[24px]">
        <h1 className="mb-[24px] text-2xl font-black">Add new friend</h1>
        {allUsers?.map(
          (user) =>
            data?.user?.email !== user.email && (
              <AddFriendTab name={user.name} email={user.email} key={user.id} />
            )
        )}
      </div>
    </div>
  );
};
