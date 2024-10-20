"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
  });
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const { firstName, lastName, ...rest } = formData;
      const name = `${firstName} ${lastName}`;
      const dataToSend = { ...rest, name };

      console.log(dataToSend);

      const response = await fetch(`${apiBaseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log("Form submitted", data);

      if (response.ok) {
        router.push(`/auth/verify?email=${formData.email}`);
      } else {
        console.error("Error fetching api");
      }
    } catch (error) {
      console.error("Error submitting form", error);
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
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                name="firstName"
                placeholder="noter"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                name="lastName"
                placeholder="Ai"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="noterAi@xyz.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="userName"
              placeholder="Username"
              type="text"
              value={formData.userName}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
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
