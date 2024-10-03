"use client";

import Afterloginheader from "@/components/Auth/Afterloginheader";
import Beforeloginheader from "@/components/Auth/Beforeloginheader";
import { useSession } from "next-auth/react";

function Home() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? <Afterloginheader /> : <Beforeloginheader />}
      <div className="w-full">hello world</div>
    </div>
  );
}
export default Home;
