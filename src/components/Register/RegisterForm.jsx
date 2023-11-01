"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function Register() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    pin: "",
  });
  const [msg, setMsg] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { email, pin, firstName, lastName, username } = state;

    try {
      // eslint-disable-next-line no-unused-vars
      const postRegister = await axios.post("/api/auth/register", {
        email,
        pin,
        firstName,
        lastName,
        username,
      });
      setRegisterMsg(postRegister.data.message);
      setTimeout(() => {
        router.push("/auth/login");
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
          Register
        </div>
        <hr className="h-px my-[24px] bg-[#E5E5E5] border-0" />
        <form
          onSubmit={handleOnSubmit}
          disabled={isButtonDisabled}
          className="bg-white"
        >
          <p className="text-red-600 text-center">{msg}</p>
          <p className="text-center">{registerMsg}</p>
          <div className="container w-5/6 mx-auto mt-[25px] mb-[40px] bg-inherit">
            <div className="bg-inherit text-[#5A5A5A] mt-[12px]">
              First Name
            </div>
            <input
              className="bg-inherit border w-full p-[12px] rounded-[8px] mt-[12px]"
              id="firstName"
              name="firstName"
              type="firstName"
              value={state.firstName}
              onChange={handleChange}
              required
              placeholder="Type your first name"
            />
            <div className="bg-inherit text-[#5A5A5A] mt-[12px]">Last Name</div>
            <input
              className="bg-inherit border w-full p-[12px] rounded-[8px] mt-[12px]"
              id="lastName"
              name="lastName"
              type="lastName"
              value={state.lastName}
              onChange={handleChange}
              required
              placeholder="Type your last name"
            />
            <div className="bg-inherit text-[#5A5A5A] mt-[12px]">Username</div>
            <input
              className="bg-inherit border w-full p-[12px] rounded-[8px] mt-[12px]"
              id="username"
              name="username"
              type="username"
              value={state.username}
              onChange={handleChange}
              required
              placeholder="Type your username"
            />
            <div className="bg-inherit text-[#5A5A5A] mt-[12px]">
              Email Address
            </div>
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
            <div className="bg-inherit text-[#5A5A5A] mt-[12px]">Pin</div>
            <input
              className="bg-inherit border w-full p-[12px] rounded-[8px] mt-[12px]"
              id="pin"
              name="pin"
              type="pin"
              value={state.pin}
              onChange={handleChange}
              required
              placeholder="Type your 6 number Pin"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1960EA] w-5/6 mx-auto justify-center h-[56px] flex rounded-[12px]"
          >
            <div className="self-center bg-inherit">
              <div className="font-bold bg-inherit text-white text-[14px] leading-[20px]">
                Register
              </div>
            </div>
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login Here
          </a>
        </p>
      </div>
    </main>
  );
}
