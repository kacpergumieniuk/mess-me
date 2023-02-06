import React from "react";
import { MessagesInput } from "./MessagesInput";
import { MessagesUpperComponent } from "./MessagesUpperComponent";

export const MessageView = () => {
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <MessagesUpperComponent />
      <div className="flex-1 overflow-auto"></div>
      <MessagesInput />
    </div>
  );
};
