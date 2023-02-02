import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "../../../utils/api";

interface IAddFriendTab {
  name: string;
  email: string;
}

export const AddFriendTab = ({ name, email }: IAddFriendTab) => {
  const addUserToFriendMutation = api.user.addUserToFriend.useMutation();

  const { data } = useSession();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleAddFriend = () => {
    if (typeof data?.user?.email === "string") {
      addUserToFriendMutation.mutate(
        {
          userInvitingEmail: data?.user?.email,
          invitedUserEmail: email,
        },
        {
          onSuccess: () => {
            setButtonDisabled(true);
          },
        }
      );
    }
  };
  return (
    <div className="mb-[32px] flex w-full items-center justify-between">
      <div className="flex items-center  gap-[16px]">
        {/* Avatar */}
        <div className="h-[64px] w-[64px]  rounded-full bg-yellow-300"></div>
        {/* Base item */}
        <div className="font-medium">{name}</div>
      </div>
      <button
        className={`rounded-[20px]  bg-yellow-500 px-[20px] py-[10px] ${
          buttonDisabled && "bg-gray-300"
        }`}
        onClick={handleAddFriend}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Invited" : "Add friend"}
      </button>
    </div>
  );
};
