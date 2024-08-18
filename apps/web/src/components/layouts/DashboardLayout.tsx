"use client";

import { Sidebarlayout } from "../sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="hidden md:block flex-1">
        <Sidebarlayout>
          <main className="flex-1 w-full">{children}</main>
        </Sidebarlayout>
      </div>

      <div className="md:hidden flex">
        <Sidebarlayout></Sidebarlayout>
        <main className="flex-1 w-full p-2 border  border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex-col gap-2 h-screen">{children}</main>
      </div>
  </div>
  );
};

export default DashboardLayout;
