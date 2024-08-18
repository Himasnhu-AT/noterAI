"use client";

import { usePathname } from "next/navigation";
import PublicLayout from "@/components/layouts/PublicLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const Layout = pathname?.startsWith("/dashboard") ? DashboardLayout : PublicLayout;

  return <Layout>{children}</Layout>;
}
