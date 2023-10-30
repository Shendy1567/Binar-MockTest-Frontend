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
      setLoginMsg(postLogin.data.Message);
      setIsButtonDisabled(true);
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  return <main>todo list</main>;
}
