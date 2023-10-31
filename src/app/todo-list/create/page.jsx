"use client";

import React from "react";
import Navbar from "@/components/Navigation/navbar";
import CreateList from "@/components/CreateList/CreateList";

export default function home() {
  return (
    <main>
      <Navbar />
      <CreateList />
    </main>
  );
}
