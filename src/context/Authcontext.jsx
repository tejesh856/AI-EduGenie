"use client";
import { SessionProvider } from "next-auth/react";
import Datacontext from "./Datacontext";

export default function AuthContext({ children }) {
  return (
    <SessionProvider>
      <Datacontext>{children}</Datacontext>
    </SessionProvider>
  );
}
