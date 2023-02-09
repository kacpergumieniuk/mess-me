import React from "react";
import { Message } from "./Message";

export const MessagesMainContent = () => {
  return (
    <div className="flex-1 overflow-auto px-[24px] pb-[16px]">
      <div className=" flex flex-col first:mt-[16px]">
        <Message author={"interlocutor"} value={"edsddd"} />
        <Message author={"user"} value={"siemasss"} />
      </div>
    </div>
  );
};
