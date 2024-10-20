import { LoginForm } from "@/app/auth/login/login";
import React from "react";

function loginpage() {
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <LoginForm />
    </div>
  );
}

export default loginpage;
