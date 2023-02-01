import React from "react";
import { api } from "../../../utils/api";
import { AddFriendTab } from "./AddFriendTab";

interface IAddFriend {}

export const AddFriend = () => {
  const { data: allUsers } = api.user.getAllUsers.useQuery();
  return (
    <div className="flex-1" onClick={() => console.log(allUsers)}>
      <div className="mt-[24px] px-[24px]">
        <h1 className="mb-[24px] text-2xl font-black">Add new friend</h1>
        {allUsers?.map((user) => (
          <AddFriendTab name={user.name} />
        ))}
      </div>
    </div>
  );
};
