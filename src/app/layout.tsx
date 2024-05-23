import type { Metadata } from "next";
import "./globals.css";
import MyHeader from "@/components/myHeader.components";

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
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="h-screen w-full m-auto bg-gray-200">
          <MyHeader />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
