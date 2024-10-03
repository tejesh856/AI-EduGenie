"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Stopwatch } from "@/components/stopwatch";

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch user data when session is available
  useEffect(() => {
    const fetchUser = async () => {
      console.log('starting fetch user',session);
      if (!session?.user?.accessToken) {
        await signOut({ callbackUrl: "/login" });
        return;
      }
      try {
        const response = await fetch("http://localhost:8000/api/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });
        const data = await response.json();
        console.log('response data',data);
        if (!response.ok) {
          //await update();
          //return;
          throw new Error("Unauthorized");
        }
        setUser(data);
      } catch (error) {
        console.log('error dashboard',error);
        // Redirect to login if fetch fails
        //await signOut({ callbackUrl: "/login" });
      }
    };
    if (status === "authenticated") {
      fetchUser();
    }
  }, [session, status]);

  if (status === "loading") return;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
      <Stopwatch />
    </div>
  );
}
