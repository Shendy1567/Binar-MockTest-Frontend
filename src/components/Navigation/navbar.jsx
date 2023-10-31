"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction, LogoutAction } from "@/redux/features/AuthReducer";
import { useRouter } from "next/navigation";

export default function NavbarSimple() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.authreducer.isLoggedIn);

  let token = Cookies.get("token");

  useEffect(() => {
    authCheck();
  }, [token, dispatch]);

  const authCheck = () => {
    if (token) {
      dispatch(LoginAction());
    }
  };

  const logout = async () => {
    await axios.delete("/api/auth/logout");
    dispatch(LogoutAction());
    router.push("/auth/login");
  };

  return (
    <main>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 "
        >
          TO DO LIST
        </a>
        <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 text-center">
            The art of accomplishment begins with a simple to-do list
          </a>
        </div>

        {isLoggedIn ? (
          <a>
            <button
              onClick={logout}
              className="inline-flex items-center bg-[#1960EA] text-white rounded-lg border-0 py-2 px-4 mt-4 md:mt-0"
            >
              Logout
            </button>
          </a>
        ) : (
          <div>
            <a href="/auth/login">
              <button className="inline-flex items-center bg-[#1960EA] text-white rounded-lg border-0 py-2 px-4 mt-4 md:mt-0">
                Login
              </button>
            </a>
            <a href="/auth/register">
              <button className="inline-flex items-center bg-[#1960EA] text-white rounded-lg border-0 py-2 px-4 mt-4 mx-3 md:mt-0">
                Register
              </button>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
