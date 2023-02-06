import React from "react";

export const MessagesUpperComponent = () => {
  return (
    <div className="border-b-1 flex border border-[#F4F4F4] px-[24px] py-[11px] ">
      <div className="flex gap-[12px]">
        {/* avatar */}
        <div className="h-[48px] w-[48px] rounded-full bg-yellow-400"></div>
        {/* user info */}
        <div>
          <div className="flex flex-col py-[6px]">
            <p className=" font-black">Dianne Rusell</p>
            <div className="flex items-center gap-[4px]">
              <div className="h-[6px] w-[6px] rounded-full bg-yellow-600"></div>
              <p className="text-xs font-normal text-[#8A8A8A]">
                Active 7 minutes ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
