"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function CreateList() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const [state, setState] = React.useState({
    list: "",
    dueDate: "",
  });
  const token = Cookies.get("token");
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState(null);

  const authCheck = async () => {
    if (token) {
      const decode = await jwtDecode(token);
      await setUserId(decode.id);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  useEffect(() => {
    authCheck();
  });
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { list, dueDate } = state;

    try {
      await axios.post(`/api/list/${userId}`, {
        list,
        dueDate,
      });
      router.push("/todo-list");
    } catch (error) {
      if (error.response) {
        setMsg("enter your data correctly");
      }
    }
  };
  return (
    <main>
      <div className="ms-[50px] mt-[25px] flex">
        <a className="bg-inherit self-center flex" href="/todo-list">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#1960EA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8L8 12L12 16"
              stroke="#1960EA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 12H8"
              stroke="#1960EA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="ms-[25px]">Back</div>
        </a>
      </div>
      <div className="container flex flex-col w-[450px] mx-auto mt-[100px] bg-white rounded-[14px] py-[24px]">
        <div className="bg-inherit font-bold self-center text-[20px] leading-[28px]">
          Create Your New List
        </div>
        <hr className="h-px my-[24px] bg-[#E5E5E5] border-0" />
        <form
          onSubmit={handleOnSubmit}
          disabled={isButtonDisabled}
          className="bg-white"
        >
          <p className="text-red-600 text-center">{msg}</p>
          <div className="container w-5/6 mx-auto mt-[25px] mb-[40px] bg-inherit">
            <label
              htmlFor="list"
              className="bg-inherit text-[#5A5A5A] text-[16px] leading-[20px]"
            >
              List
            </label>
            <input
              className="bg-inherit border w-full p-[12px] rounded-[8px] mt-[12px]"
              id="list"
              name="list"
              type="list"
              value={state.list}
              onChange={handleChange}
              required
              placeholder="Type your New List"
            />
            <div className="bg-inherit text-[#5A5A5A] mt-[24px]">Due Date</div>
            <input
              className="bg-inherit border w-full p-[12px] rounded-[8px] mt-[12px]"
              id="dueDate"
              name="dueDate"
              type="datetime-local"
              value={state.dueDate}
              onChange={handleChange}
              required
              placeholder="Type your Pin"
            />
          </div>

          <button
            type="submit"
            className="bg-[#1960EA] w-5/6 mx-auto justify-center h-[56px] flex rounded-[12px]"
          >
            <div className="self-center bg-inherit">
              <div className="font-bold bg-inherit text-white text-[14px] leading-[20px]">
                Confirm
              </div>
            </div>
          </button>
        </form>
      </div>
    </main>
  );
}
