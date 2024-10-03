"use client";
import { useState, useEffect, Suspense } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { CiCircleCheck } from "react-icons/ci";
import { useData } from "@/context/Datacontext";
import { useMode } from "@/context/DayNight";

function VerifyAccountForm() {
  const { mode } = useMode();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { setIsLoading, isLoading, err, setErr } = useData(); // State to manage button/link clickability
  const [success, setsuccess] = useState("");
  async function Verify() {
    setErr("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-link?token=${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();

      if (res.error) {
        setIsLoading(false);
        setErr(res.error.message);
      } else {
        // Disable the form after successful verification

        setsuccess(res.message);
      }
    } catch (error) {
      setIsLoading(false);
      setErr(error.message);
    }
  }
  useEffect(() => {
    if (token) {
      Verify();
    } else {
      setIsLoading(true);
    }
  }, []);
  return (
    <div className="flex items-center justify-center">
      {!isLoading ? (
        <div>
          <p
            className={`text-green-500 flex gap-2 items-center bg-green-500/15 ${
              success ? "px-4 py-2" : ""
            } rounded`}
          >
            {success ? <CiCircleCheck size={20} /> : ""}
            {success}
          </p>

          <p className="text-red-500 flex gap-2 items-center bg-red-500/15 px-4 py-2 rounded">
            {err ? <BsExclamationTriangle size={18} /> : ""}
            {err}
          </p>
        </div>
      ) : (
        <BeatLoader
          size={20}
          color={`${mode === "dark" ? "#ffffff" : "#000000"}`}
        />
      )}
    </div>
  );
}
// Wrap the VerifyAccountForm component with Suspense in the parent component

export default function VerifyAccountFormPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyAccountForm />
      </Suspense>
    </div>
  );
}
