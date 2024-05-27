import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import MyHeader from "@/components/myHeader.components";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "nutrilab",
  description: "nutrilab website interface",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <div className="bg-[#DFAF2C] w-full flex justify-between">
          <MyHeader />
        </div>
        <main className="flex-grow m-auto w-full">
          {children}
        </main>
        <footer className="bg-[#DFAF2C] w-full py-2 text-center">
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
