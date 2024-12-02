import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import StoreProvider from "@/store/provider";
import { Toaster } from "@/components/shadcn-ui/toaster";

export const metadata: Metadata = {
  title: "LikeHome",
  description: "Feel like home!",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          <main className="container py-10">{children}</main>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
