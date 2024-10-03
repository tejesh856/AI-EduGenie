"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useData } from "@/context/Datacontext";

export default function Backbutton({ label, href }) {
  //const [loading, setloading] = useState(false);
  const router = useRouter();
  const { isLoading, err } = useData();
  console.log("loading", isLoading);
  console.log("err", err);
  return (
    <div className="w-full">
      {label !== "Back to" ? (
        <div className="mx-auto text-stone-600 dark:text-stone-400 mb-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-500 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-500">
          or
        </div>
      ) : (
        ""
      )}
      {label !== "Back to" ? (
        <div className="flex justify-center">
          <span className="text-gray-600 text-md dark:text-zinc-400">
            {label}
          </span>
          <Link
            href={href}
            className="hover:underline hover:underline-offset-2 dark:text-indigo-600 dark:hover:text-indigo-500 transition-all ml-2 text-indigo-600 hover:text-indigo-500"
          >
            {href === "/login" ? "Login" : "Create an Account"}
          </Link>
        </div>
      ) : !isLoading ? (
        !err ? (
          <div className="flex items-center justify-center">
            <span className="text-gray-600 text-md dark:text-zinc-400">
              {label}
            </span>
            <Button
              onClick={() => router.push("/login")}
              variant="link"
              className=" dark:text-indigo-700 p-0 m-2 cursor-pointer dark:hover:text-indigo-600 text-indigo-500 hover:text-indigo-700 text-md"
            >
              Login
            </Button>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}
