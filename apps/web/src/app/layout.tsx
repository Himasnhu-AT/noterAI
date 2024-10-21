import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
// import Navigationbar from "@/components/Navigationbar";
import { Providers } from "./providers";
import ClientLayout from "@/components/ClientLayout"; // Import the new client component
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoterAI",
  description: "Turn Your Ideas and Notes into Actionable Insights",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.png",
        sizes: "64x64",
        type: "image/x-icon",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.png",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientLayout>{children}</ClientLayout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
