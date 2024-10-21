"use client";

import Navigationbar from "@/components/Navigationbar";
import Footer from "../Footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigationbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
