"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema } from "@/schema";

export default function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const [success, setsuccess] = useState("");
  const [err, setErr] = useState("");
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: onSubmit,
    shouldFocusError: true,
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(data) {
    setErr("");
    setsuccess("");
    setIsPending(true);
    console.log(data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/forgot-password-link-generate`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // Specifies the type of content being sent
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (res.error) {
        setIsPending(false);
        setErr(res.error.message);
      } else {
        setIsPending(false);
        setsuccess(res.message);
      }
    } catch (error) {
      setIsPending(false);
      setErr(error.message);
    }
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
        {!isPending ? (
          <Button
            disabled={isPending}
            type="submit"
            className="bg-indigo-800 dark:bg-indigo-800 hover:bg-indigo-900 dark:hover:bg-indigo-900 dark:text-white"
          >
            Reset Password
          </Button>
        ) : (
          <Button
            disabled
            className="bg-indigo-800 dark:bg-indigo-800 hover:bg-indigo-900 dark:hover:bg-indigo-900 dark:text-white"
          >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        )}
      </form>
    </Form>
  );
}
