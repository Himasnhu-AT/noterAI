"use client";

import Navigationbar from "@/components/Navigationbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigationbar />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
