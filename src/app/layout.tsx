import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/src/lib/utils";
import Sidebar from "@/src/components/Sidebar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-gray-500",
          fontSans.variable
        )}
      >
        <div className="flex gap-12 items-start">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
