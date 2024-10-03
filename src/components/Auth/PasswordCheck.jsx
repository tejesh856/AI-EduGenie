"use client";
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";

export default function PasswordCheck({ passcheck }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        {passcheck.length ? (
          <FaCircleCheck size={20} className="text-green-500" />
        ) : (
          <FaCircleXmark size={20} className="text-red-500" />
        )}
        <span
          className={`${
            passcheck.length
              ? "dark:text-zinc-100 text-gray-950"
              : "text-gray-500 dark:text-zinc-400"
          }`}
        >
          Minimum 6 characters
        </span>
      </div>
      <div className="flex gap-2 items-center">
        {passcheck.upper ? (
          <FaCircleCheck size={20} className="text-green-500" />
        ) : (
          <FaCircleXmark size={20} className="text-red-500" />
        )}
        <span
          className={`${
            passcheck.upper
              ? "dark:text-zinc-100 text-gray-950"
              : "text-gray-500 dark:text-zinc-400"
          }`}
        >
          At least 1 uppercase letter{" "}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        {passcheck.lower ? (
          <FaCircleCheck size={20} className="text-green-500" />
        ) : (
          <FaCircleXmark size={20} className="text-red-500" />
        )}
        <span
          className={`${
            passcheck.lower
              ? "dark:text-zinc-100 text-gray-950"
              : "text-gray-500 dark:text-zinc-400"
          }`}
        >
          At least 1 lowercase letter{" "}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        {passcheck.number ? (
          <FaCircleCheck size={20} className="text-green-500" />
        ) : (
          <FaCircleXmark size={20} className="text-red-500" />
        )}
        <span
          className={`${
            passcheck.number
              ? "dark:text-zinc-100 text-gray-950"
              : "text-gray-500 dark:text-zinc-400"
          }`}
        >
          At least 1 number
        </span>
      </div>
      <div className="flex gap-2 items-center">
        {passcheck.special ? (
          <FaCircleCheck size={20} className="text-green-500" />
        ) : (
          <FaCircleXmark size={20} className="text-red-500" />
        )}
        <span
          className={`${
            passcheck.special
              ? "dark:text-zinc-100 text-gray-950"
              : "text-gray-500 dark:text-zinc-400"
          }`}
        >
          At least 1 special character
        </span>
      </div>
    </div>
  );
}
