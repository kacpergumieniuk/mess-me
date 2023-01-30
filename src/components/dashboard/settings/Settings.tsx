import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../utils/api";

interface ISettings {
  name: string;
  email: string;
  refetchUser: Function;
}

export const Settings = ({ name, email, refetchUser }: ISettings) => {
  const changeNameMutation = api.user.changeUsername.useMutation();

  const [nameValue, setNameValue] = useState<string>("");

  const handleSubmitName = () => {
    changeNameMutation.mutate(
      {
        email: email,
        name: nameValue,
      },
      {
        onSuccess: () => {
          refetchUser();
          toast.success("Name changed succesfuly 🦄", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
          });
        },
      }
    );
  };
  return (
    <div className="flex-1">
      <div className="mt-[24px] px-[24px]">
        <h1 className="mb-[24px] text-2xl font-black">Settings</h1>
        {/* <h2 className="mb-[24px]">Private</h2> */}
        <div>
          <div className="flex flex-col">
            <label
              className="text-xs font-normal text-[#8A8A8A]"
              htmlFor="name-and-surename-edit"
            >
              Name and surname
            </label>
            <div className="flex justify-between">
              <input
                type="text"
                id="name-and-surname-edit"
                className="text-[#8A8A8A]"
                placeholder={name}
                onChange={(e) => setNameValue(e.target.value)}
              />
              <button
                className="text-[#387BFE] underline"
                onClick={handleSubmitName}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
