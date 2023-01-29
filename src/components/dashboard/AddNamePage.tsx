import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import { Button } from "../Button";
import { Navbar } from "../navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";

interface AddNamePage {
  setAddNameState: (value: boolean) => void;
}

export const AddNamePage = ({ setAddNameState }: AddNamePage) => {
  const addNameMutation = api.user.addNameToUser.useMutation();
  const { data } = useSession();

  const [nameValue, setNameValue] = useState<string>();

  const handleSubmit = () => {
    if (typeof data!.user!.email === "string" && nameValue) {
      addNameMutation.mutate(
        {
          email: data!.user!.email,
          name: nameValue,
        },
        {
          onSuccess: () => {
            toast.success("Name added succesfuly!! 🦄", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: "light",
            });
            setAddNameState(false);
          },
        }
      );
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  return (
    <div className="relative h-screen w-screen bg-bg-color text-white">
      <Navbar />
      <div className=" px-[46px] text-center">
        <h1 className=" mb-[24px] text-2xl font-black">
          You don't have name yet!
        </h1>
        <form>
          <input
            onChange={handleNameChange}
            type="text"
            className={` mb-6 w-full rounded-[100px] border border-[#585858] bg-bg-color px-[20px] py-[8px] text-[#585858] placeholder-[#585858] outline-none`}
            placeholder="Name"
          />
        </form>
        <Button onClick={handleSubmit} style={"mb-3"}>
          Create account
        </Button>
      </div>
      <img
        src="/createAccountImage.png"
        alt=""
        className="absolute bottom-0 w-full"
      />
    </div>
  );
};
