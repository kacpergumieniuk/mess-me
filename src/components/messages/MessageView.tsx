import React, { useState } from "react";
import { IMessage } from "./Message";
import { MessagesInput } from "./MessagesInput";
import { MessagesMainContent } from "./MessagesMainContent";
import { MessagesUpperComponent } from "./MessagesUpperComponent";

export const MessageView = () => {
  const exampleMessages: IMessage[] = [
    { author: "user", value: "siema" },
    { author: "interlocutor", value: "bodziorno" },
  ];

  const [messages, setMessages] = useState<IMessage[]>(exampleMessages);

  const handleSendMessage = (value: string) => {
    const message: IMessage = { author: "user", value: value };
    const newArr = [...messages, message];
    setMessages(newArr);
  };
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <MessagesUpperComponent />
      <MessagesMainContent messages={messages} />
      <MessagesInput handleSendMessage={handleSendMessage} />
    </div>
  );
};
