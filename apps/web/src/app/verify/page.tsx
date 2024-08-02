"use client";

import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


function Verify() {

  const [token,setToken]=useState('')

  const router=useRouter()
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setToken(e.target.value)
    };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try{
      const response = await fetch(`${apiBaseUrl}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email,token})
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Verification successful", data);
        router.push("/login")

      } else {
        console.error("Verification failed", data);
      }
    } catch (error) {
      console.error("Error verifying email", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Verify your email
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="token">Verification code</Label>
            <Input
              id="token"
              name="token"
              placeholder="••••••••"
              type="text"
              value={token}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          >
          Verify &rarr;
          <BottomGradient />
        </button>
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

export default Verify;
