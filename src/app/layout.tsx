import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import MyHeader from "@/components/myHeader.components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nutrilab",
  description: "nutrilab website interface",
  icons: {
    icon: ["./favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col ${inter.className}`} suppressHydrationWarning={true}>
        <div className="m-auto w-full">
          <MyHeader />
        </div>
        <main className="flex-grow m-auto w-full min-w-60">
          {children}
        </main>
      </body>
    </html>
  );
}
