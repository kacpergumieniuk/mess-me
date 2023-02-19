import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { IConversation, IUser } from "../../../types/apiTypes";
import { api } from "../../../utils/api";
import { FriendTab } from "./FriendTab";

interface IFriends {
  userEmail: string;
  conversations: IConversation[];
}

export const Friends = ({ userEmail, conversations }: IFriends) => {
  const { data: friendsData } = api.user.getUserFriends.useQuery({
    userEmail: userEmail,
  });
  const { data } = useSession();

  const initializeConversationMutation =
    api.conversation.initializeConversation.useMutation();

  const handleInitializeConversation = (participantEmail: string) => {
    if (typeof data?.user!.email === "string") {
      initializeConversationMutation.mutate({
        creatorEmail: data?.user?.email,
        participantEmail: participantEmail,
      });
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="mt-[24px] px-[24px]">
        <h1
          className="mb-[24px] text-2xl font-black"
          onClick={() => console.log(conversations)}
        >
          My friends
        </h1>
        {friendsData?.map((friend) => (
          <FriendTab name={friend.name} key={friend.id} />
        ))}
      </div>
    </div>
  );
};
