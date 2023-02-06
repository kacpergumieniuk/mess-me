import React from "react";
import { MessagesUpperComponent } from "./MessagesUpperComponent";

export const MessageView = () => {
  return (
    <div className="flex-1 overflow-auto">
      <MessagesUpperComponent />
    </div>
  );
};
