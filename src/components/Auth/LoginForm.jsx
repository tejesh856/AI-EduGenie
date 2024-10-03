"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsExclamationTriangle } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";

import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { usetheme } from "@/context/DayNight";
import { LoginSchema } from "@/schema";
import { useData } from "@/context/Datacontext";
export default function LoginForm() {
  const router = useRouter();
  const { mode } = usetheme();
  const [isPending, setIsPending] = useState(false);
  const [success, setsuccess] = useState("");
  const { data: session } = useSession();
  const [err, setErr] = useState("");
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    mode: onSubmit,
    shouldFocusError: true,
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data) {
    setErr("");
    setsuccess("");
    setIsPending(true);
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (res.error) {
        if (res.code === "user not verified") {
          setIsPending(false);
          setsuccess("Verification link sent to your email");
          return;
        }
        setIsPending(false);
        setErr(res.code); // Display error from backend
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setIsPending(false);
      setErr(error.code);
      console.log("something else", error);
    }
    /*startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
          callbackUrl: "/dashboard",
        });
        console.log(res);
        if (res.error) {
          setErr(res.code); // Display error from backend
          if (res.code === "user not verified") {
            setstoredEmail(data.email);
            setstoredPass(data.password);
            router.replace("/auth/verify-email");
          }
        } else {
          router.replace("/dashboard"); // Verified users go to dashboard
        }
      } catch (error) {
        setErr(error.code);
        console.log("something else", error);
      }
    });*/
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter Email"
                  {...field}
                  className={`${
                    form.formState.errors.email
                      ? "border border-red-500 dark:border-red-600 dark:focus-visible:ring-transparent"
                      : "dark:border-zinc-800 dark:focus-visible:ring-zinc-400"
                  } `}
                />
              </FormControl>
              <FormMessage className="dark:text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter Password"
                  {...field}
                  className={`${
                    form.formState.errors.password
                      ? "dark:border-red-600 border border-red-500 dark:focus-visible:ring-transparent"
                      : "dark:border-zinc-800 dark:focus-visible:ring-zinc-400"
                  } `}
                />
              </FormControl>
              <FormMessage className="dark:text-red-700" />
            </FormItem>
          )}
        />
        {err && (
          <p className="text-center bg-red-500/15 dark:bg-red-500/20 text-sm flex justify-center items-center text-red-500 dark:text-red-500 mb-0 mt-2 p-2 rounded">
            <span className="flex gap-2 items-center">
              <BsExclamationTriangle size={16} />
              {err}
            </span>
          </p>
        )}
        {success && (
          <p className="text-center bg-green-500/15 dark:bg-green-500/20 text-sm flex justify-center items-center text-green-500 dark:text-green-500 mb-0 mt-2 p-2 rounded">
            <span className="flex gap-2 items-center">
              <CiCircleCheck size={20} />
              {success}
            </span>
          </p>
        )}
        <p className="flex justify-between items-center text-gray-600 text-sm gap-2 dark:text-zinc-400 mt-0 mb-3">
          Forgot your Password?{" "}
          <Link
            disabled={isPending}
            href="/forgot-password"
            className="hover:underline hover:underline-offset-2 dark:text-indigo-600 dark:hover:text-indigo-500 transition-all ml-2 text-indigo-600 hover:text-indigo-500"
          >
            Reset Password
          </Link>
        </p>

        {!isPending ? (
          <Button
            disabled={isPending}
            type="submit"
            className="bg-orange-700 dark:bg-orange-700 hover:bg-orange-600 dark:hover:bg-orange-600 dark:text-white"
          >
            Login
          </Button>
        ) : (
          <Button
            disabled
            className="bg-orange-700 dark:bg-orange-700 hover:bg-orange-600 dark:hover:bg-orange-600 dark:text-white"
          >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        )}
      </form>
    </Form>
  );
}
