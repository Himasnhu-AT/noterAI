import { SignupForm } from "@/app/auth/register/Signup";
import React from "react";

function registerpage() {
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <SignupForm />
    </div>
  );
}

export default registerpage;
