"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usetheme } from "@/context/DayNight";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/schema";
import { CiCircleCheck } from "react-icons/ci";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PasswordCheck from "./PasswordCheck";
import { BsExclamationTriangle } from "react-icons/bs";
const lengthPattern = /^.{6,}$/;
const upperCasePattern = /[A-Z]/;
const lowerCasePattern = /[a-z]/;
const numberPattern = /\d/;
const specialCharPattern = /[@$!%*?&]/;

export default function RegisterForm() {
  const [passcheck, setpasscheck] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setsuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: onSubmit,
    shouldFocusError: true,
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    setloading(true);
    setErr("");
    setsuccess("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
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
        setloading(false);
        setErr(res.error.message);
      } else {
        setloading(false);
        setsuccess(res.message);
      }
    } catch (error) {
      setloading(false);
      setErr(error.message);
    }
    //const id = toast.loading("Creating your EduGenie Account...");
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setpasscheck({
      length: lengthPattern.test(value),
      upper: upperCasePattern.test(value),
      lower: lowerCasePattern.test(value),
      number: numberPattern.test(value),
      special: specialCharPattern.test(value),
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Enter Name"
                  className={`${
                    form.formState.errors.name
                      ? "dark:border-red-600 border-red-600 dark:focus-visible:ring-transparent focus-visible:ring-transparent"
                      : "dark:border-zinc-800 dark:focus-visible:ring-zinc-400"
                  } `}
                  {...field}
                />
              </FormControl>
              <FormMessage className="dark:text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Enter Email"
                  {...field}
                  className={`${
                    form.formState.errors.email
                      ? "dark:border-red-600 border-red-600 dark:focus-visible:ring-transparent focus-visible:ring-transparent"
                      : "dark:border-zinc-800 dark:focus-visible:ring-zinc-400"
                  } `}
                />
              </FormControl>
              <FormMessage className="dark:text-red-600" />
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
                  disabled={loading}
                  placeholder="Enter Password"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    handleChange(event);
                  }}
                  className={`${
                    form.formState.errors.password
                      ? "dark:border-red-600 border-red-600 dark:focus-visible:ring-transparent focus-visible:ring-transparent"
                      : "dark:border-zinc-800 dark:focus-visible:ring-zinc-400"
                  } `}
                />
              </FormControl>
              <FormMessage
                className={`${
                  form.formState.errors.password?.message !==
                  "Password is required"
                    ? "hidden"
                    : "block"
                } dark:text-red-600`}
              />
            </FormItem>
          )}
        />
        <PasswordCheck passcheck={passcheck} />
        {err && (
          <p className="text-center bg-red-500/15 dark:bg-red-500/20 text-sm flex justify-center items-center text-red-500 dark:text-red-500 mb-0 mt-2 p-2 rounded">
            <div className="flex gap-2 items-center">
              <BsExclamationTriangle size={16} />
              {err}
            </div>
          </p>
        )}
        {success && (
          <p className="text-center bg-green-500/15 dark:bg-green-500/20 text-sm flex justify-center items-center text-green-500 dark:text-green-500 mb-0 mt-2 p-2 rounded">
            <div className="flex gap-2 items-center">
              <CiCircleCheck size={20} />
              {success}
            </div>
          </p>
        )}
        {!loading ? (
          <Button
            type="submit"
            className="bg-indigo-800 dark:bg-indigo-800 hover:bg-indigo-900 dark:hover:bg-indigo-900 dark:text-white"
          >
            Submit
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
