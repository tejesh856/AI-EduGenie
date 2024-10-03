"use client";
import { createContext, useState, useContext } from "react";
export const datacontext = createContext();
export default function Datacontext({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  return (
    <datacontext.Provider
      value={{
        isLoading,
        setIsLoading,
        err,
        setErr,
      }}
    >
      {children}
    </datacontext.Provider>
  );
}
export function useData() {
  return useContext(datacontext);
}
