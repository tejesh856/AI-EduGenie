"use client";
export default function Authheader({ label, title }) {
  return (
    <div className="w-full h-full text-center">
      <h2 className="text-gray-700 text-3xl dark:text-zinc-100 ">{title}</h2>
      <span className="text-gray-500 text-md dark:text-zinc-500">{label}</span>
    </div>
  );
}
