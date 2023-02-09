import React, { useState } from "react";
import { IMessage, Message } from "./Message";

interface IMessagesMainContent {
  messages: IMessage[];
}

export const MessagesMainContent = ({ messages }: IMessagesMainContent) => {
  return (
    <div className="flex-1 overflow-auto px-[24px] pb-[16px]">
      <div className=" flex flex-col first:mt-[16px]">
        {messages.map((message, key) => (
          <Message author={message.author} key={key} value={message.value} />
        ))}
      </div>
    </div>
  );
};
