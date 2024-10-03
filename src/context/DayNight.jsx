// context/ThemeContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const DayNightContext = createContext();

export function DayNight({ children }) {
  const [mode, setmode] = useState("light"); // Initially set to null
  //const [isLoaded, setIsLoaded] = useState(false); // To check if the theme is loaded

  useEffect(() => {
    // Check if running in the browser
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setmode(storedTheme);
    } else {
      localStorage.setItem("theme", mode);
    }
  }, [mode]);

  return (
    <DayNightContext.Provider value={{ mode, setmode }}>
      {children}
    </DayNightContext.Provider>
  );
}

export function useMode() {
  return useContext(DayNightContext);
}
