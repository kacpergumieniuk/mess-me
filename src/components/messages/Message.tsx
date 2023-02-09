import React from "react";

export interface IMessage {
  author: TMessageAuthor;
  value: string;
}

export type TMessageAuthor = "user" | "interlocutor";

export const Message = ({ author, value }: IMessage) => {
  return (
    <div
      className={`flex w-full ${author === "user" && "justify-start"} ${
        author === "interlocutor" && "justify-end"
      }`}
    >
      <div
        className={`w-2/3 break-normal px-[16px] py-[8px] ${
          author === "interlocutor" && "bg-yellow-400"
        } ${author === "user" && "bg-[#FAFAFA]"} mb-[16px] rounded-2xl`}
      >
        <p className="break-words">{value}</p>
      </div>
    </div>
  );
};
