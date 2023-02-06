import React from "react";
import { MessagesInput } from "./MessagesInput";
import { MessagesMainContent } from "./MessagesMainContent";
import { MessagesUpperComponent } from "./MessagesUpperComponent";

export const MessageView = () => {
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <MessagesUpperComponent />
      <MessagesMainContent />
      <MessagesInput />
    </div>
  );
};
