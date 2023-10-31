"use client";
import Navbar from "@/components/Navigation/navbar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [username, setUsername] = useState("");
  const token = Cookies.get("token");

  const isLoggedIn = () => {
    token ? setUsername(jwtDecode(token).username) : setUsername("");
  };

  const welcomeContent = token && username ? `Welcome Back ${username}` : "";

  useEffect(() => {
    isLoggedIn();
  }, [token]);

  const linkHref = token ? "/todo-list" : "/auth/login";

  return (
    <main>
      <Navbar />

      <a className="mt-5 text-xl mx-auto text-center flex flex-col items-center justify-center">
        {welcomeContent}
      </a>

      <div className="mt-5 w-8/12 text-xl mx-auto text-center flex flex-col items-center justify-center">
        To-do lists are more than just a collection of tasks; they are a
        powerful tool for productivity and organization. They serve as a roadmap
        to guide us through our daily endeavors, ensuring that we stay on track
        and accountable. A well-structured to-do list reflects our aspirations
        and priorities, and by diligently working through it, we turn our dreams
        into accomplishments. In the midst of life's chaos, a to-do list
        provides a sanctuary of order, helping us maintain a sense of control in
        a busy world. It's not merely a list; it's a promise we make to
        ourselves, a commitment to achieving our goals. The art of
        accomplishment begins with a simple to-do list, and as we check off each
        task, we're one step closer to success. So, don't just list your to-dos,
        do your lists and watch your ambitions transform into reality.
        <Link href={linkHref} className="mt-5">
          <button className="inline-flex items-center bg-[#1960EA] text-white rounded-lg border-0 py-4 px-5 mx-3 md:mt-0">
            START NOW
          </button>
        </Link>
      </div>
    </main>
  );
}
