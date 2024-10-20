"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const a = (
    <Link
      href="password/forgot"
      className="text-blue-700 font-semibold text-xs "
    >
      Forgot password?
    </Link>
  );
  const text =
    "Check your credentials. We couldn't match your email or password.";
  const errormessage = (
    <>
      {text}
      <br />
      {a}
    </>
  );
  const [visible, setvisibility] = useState(false);

  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

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
      const response = await fetch(`${apiBaseUrl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/auth/verify?email=${email}`);
      } else {
        console.error("Verification failed", data);
        setvisibility(true);
      }
    } catch (error) {
      console.error("Error verifying email", error);
    }
  };
  return (
    <div className="max md:w-[986px]">
      <div className="max-w-md w-full mx-auto rounded-2xl p-6 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to NoterAi
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Register to NoterAi for better services
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col  space-y-2  mb-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                placeholder="noterAi@xyz.com"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
            </LabelInputContainer>
            <br />
            <button
              className=" bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign in &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </div>
        </form>
      </div>
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
