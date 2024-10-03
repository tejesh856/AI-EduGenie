"use client";
import { GrSun } from "react-icons/gr";
import { RxMoon } from "react-icons/rx";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
//import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Norican } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useMode } from "@/context/DayNight";
const norican = Norican({ subsets: ["latin"], weight: "400" });

export default function Beforeloginheader() {
  const router = useRouter();
  const { mode, setmode } = useMode();
  const { status } = useSession();
  const { setTheme } = useTheme();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleThemeChange = () => {
    const newTheme = mode === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setmode(newTheme);
    //localStorage.setItem("theme", newTheme);
  };
  /*if (status === "loading") {
    return (
      <div className="text-gray-600 dark:text-white w-full h-screen flex items-center justify-center overflow-y-hidden">
        Loading...
      </div>
    );
  }*/
  return (
    <div className="flex dark:bg-[#131215] bg-stone-100 justify-between items-center px-6 py-4 shadow-md border-b-2">
      <h1
        onClick={() => router.push("/")}
        className={`text-indigo-800 text-3xl cursor-pointer dark:text-indigo-800 ${norican.className}`}
      >
        EduGenie
      </h1>
      <div className="flex items-center gap-6">
        <Button
          onClick={handleThemeChange}
          /*className=" 
            dark:border dark:border-gray-600 dark:bg-transparent dark:hover:bg-zinc-800
            border border-gray-300 hover:bg-gray-200 bg-transparent
        "*/
          className=" 
           hover:bg-transparent m-0 p-0 shadow-none dark:shadow-none dark:hover:bg-transparent dark:bg-transparent bg-transparent border-none outline-none
        "
        >
          {mode === "dark" ? (
            <GrSun className="text-white" size={20} />
          ) : (
            <RxMoon className="text-gray-900" size={20} />
          )}
        </Button>
        <div className="flex items-center gap-4">
          <Button
            className="text-sm text-white dark:text-slate-100 m-0 bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-600 hover:bg-orange-500"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            className="text-sm text-white dark:text-slate-100 m-0 bg-indigo-800 dark:bg-indigo-800 dark:hover:bg-indigo-700 hover:bg-indigo-700"
            onClick={() => router.push("/register")}
          >
            {currentPath === "/" ? "Get Started" : "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
}
