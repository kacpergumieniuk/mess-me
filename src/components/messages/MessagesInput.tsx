import React, { useState } from "react";
import { AiOutlineArrowRight as SendArrow } from "react-icons/ai";

interface IMessagesInput {
  handleSendMessage: (value: string) => void;
}

export const MessagesInput = ({ handleSendMessage }: IMessagesInput) => {
  const [messageValue, setMessageValue] = useState<string>("");
  const isButtonVisable = messageValue.length;

  const handleClickButton = () => {
    handleSendMessage(messageValue);
    setMessageValue("");
  };

  return (
    <div className="flex gap-[4px] px-[24px] pb-[17px]">
      <input
        type="text"
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        placeholder="Your message..."
        className="w-full rounded-2xl border pb-[28px] pl-[16px] pr-[12px] pt-[8px] text-xs outline-none focus:border-black"
      />
      {isButtonVisable ? (
        <button
          className="flex h-full items-center justify-center rounded-2xl bg-yellow-400 p-[16px]"
          onClick={handleClickButton}
        >
          <SendArrow />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
