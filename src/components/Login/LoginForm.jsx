"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function Login() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const [state, setState] = React.useState({
    email: "",
    pin: "",
  });
  const [msg, setMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { email, pin } = state;

    try {
      // eslint-disable-next-line no-unused-vars
      const postLogin = await axios.post("/api/auth/login", {
        email: email,
        pin: pin,
      });
      setLoginMsg(postLogin.data.message);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  return (
    <main>
      <div className="ms-[50px] mt-[25px] flex">
        <a className="bg-inherit self-center flex" href="/">
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
          Login
        </div>
        <hr className="h-px my-[24px] bg-[#E5E5E5] border-0" />
        <form
          onSubmit={handleOnSubmit}
          disabled={isButtonDisabled}
          className="bg-white"
        >
          <p className="text-red-600 text-center">{msg}</p>
          <p className="text-center">{loginMsg}</p>
          <div className="container w-5/6 mx-auto mt-[25px] mb-[40px] bg-inherit">
            <label
              htmlFor="email"
              className="bg-inherit text-[#5A5A5A] text-[16px] leading-[20px]"
            >
              Email adress
            </label>
            <input
              className="bg-inherit border w-full p-[12px] rounded-[8px] mt-[12px]"
              id="email"
              name="email"
              type="email"
              value={state.email}
              onChange={handleChange}
              required
              placeholder="Type your Email"
            />
            <div className="bg-inherit text-[#5A5A5A] mt-[24px]">Pin</div>
            <input
              className="bg-inherit border w-full p-[12px] rounded-[8px] mt-[12px]"
              id="pin"
              name="pin"
              type="pin"
              value={state.pin}
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
                LOGIN
              </div>
            </div>
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/auth/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register Here
          </a>
        </p>
      </div>
    </main>
  );
}
