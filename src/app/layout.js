"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "@/context/Authcontext";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DayNight, useMode } from "@/context/DayNight";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen h-auto max-w-screen flex flex-col dark:bg-[#121212] bg-[#e7eaf6]`}
      >
        {" "}
        <DayNight>
          <ThemeProvider
            attribute="class"
            defaultTheme={theme}
            enableSystem
            disableTransitionOnChange
          >
            <AuthContext>
              <MainContent>{children}</MainContent>
            </AuthContext>
          </ThemeProvider>
        </DayNight>
      </body>
    </html>
  );
}

function MainContent({ children }) {
  const { mode, setmode } = useMode();

  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme={mode}
      />
    </>
  );
}
