"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { MailIcon } from "@/components/ui/MailIcon";
import Link from "next/link";

export function ForgotForm() {
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const a = (
    <Link
      href="/auth/register"
      className="text-blue-700 font-semibold text-xs "
    >
      Register
    </Link>
  );
  const text =
    "Check your credentials. We couldn't find entered email in our data.";
  const text2 = "If you dont have a account ";
  const errorMessage = (
    <>
      {text}
      <br />
      {text2}
      {a}
    </>
  );

  const [visible, setvisibility] = useState(false);
  const [email, setEmail] = useState("");

  const validateEmail = (value: string) =>
    value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setvisibility(false);
    try {
      const response = await fetch(
        `${apiBaseUrl}/auth/password/forgot?email=${email}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        router.push(`/auth/password/forgot/change?email=${email}`);
      } else {
        console.error("Email not found");
        setvisibility(true);
      }
    } catch (error) {
      console.error("Error fetching api", error);
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Recover your password
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        to continue to your NoterAi account.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            isClearable
            type="email"
            variant="bordered"
            size="md"
            label="Email"
            value={email}
            placeholder="Enter your email"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "success"}
            onValueChange={setEmail}
            errorMessage="Please enter a valid email"
            startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            className="w-96"
          />
          {visible && (
            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
          )}
        </LabelInputContainer>

        <div></div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Send Verification code &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
