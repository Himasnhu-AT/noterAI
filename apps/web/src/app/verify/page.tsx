"use client";

import React from "react";
import { useSearchParams } from 'next/navigation';

function Verify() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
      <div className='h-screen flex justify-center items-center'>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Email: {email}
      </h2>
    </div>
  );
}

export default Verify;
