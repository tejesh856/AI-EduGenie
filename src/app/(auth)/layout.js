"use client";

import Beforeloginheader from "@/components/Auth/Beforeloginheader";

export default function AuthLayout({ children }) {
  return (
    <>
      {" "}
      <Beforeloginheader />
      {children}
    </>
  );
}
