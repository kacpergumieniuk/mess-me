import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/api";

interface IAddFriendTab {
  name: string;
  email: string;
  disabled: boolean;
  refetchUser: Function;
  variant: "invitation" | "add";
}

export const AddFriendTab = ({
  name,
  email,
  disabled,
  refetchUser,
  variant,
}: IAddFriendTab) => {
  const addUserToFriendMutation = api.user.addUserToFriend.use();
  const acceptInvitationMutation =
    api.user.acceptFriendsInvitation.useMutation();

  const { data } = useSession();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(disabled);

  useEffect(() => {});

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
            refetchUser();
          },
        }
      );
    }
  };

  const handleAcceptInvitation = () => {
    if (typeof data?.user?.email === "string") {
      acceptInvitationMutation.mutate(
        {
          userInvitingEmail: email,
          invitedUserEmail: data?.user?.email,
        },
        {
          onSuccess: (data) => {
            refetchUser();
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
      {variant === "add" && (
        <button
          className={`rounded-[20px]  bg-yellow-500 px-[20px] py-[10px] ${
            buttonDisabled && "bg-gray-300"
          }`}
          onClick={handleAddFriend}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Invited" : "Add friend"}
        </button>
      )}
      {variant === "invitation" && (
        <button
          className={`rounded-[20px]  bg-yellow-500 px-[20px] py-[10px]
          `}
          onClick={handleAcceptInvitation}
        >
          Accept
        </button>
      )}
    </div>
  );
};
