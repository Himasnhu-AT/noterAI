import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-gray-800 dark:text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="mt-2">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default Custom404;
