"use client";
import Afterloginheader from "@/components/Auth/Afterloginheader";
export default function AuthLayout({ children }) {
  return (
    <>
      {" "}
      <Afterloginheader />
      {children}
    </>
  );
}
