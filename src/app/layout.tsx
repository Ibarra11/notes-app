import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/src/lib/utils";

import Sidebar from "../components/Sidebar";
import SidebarFolders from "../components/SidebarFolders";
import SidebarRecentFolders from "../components/SidebarRecentFolders";
import SidebarMoreActions from "../components/SidebarMoreActions";

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
          "min-h-screen bg-background bg-gray-100 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="flex">
          <Sidebar>
            <SidebarRecentFolders />
            <SidebarFolders />
            <SidebarMoreActions />
          </Sidebar>
          <main className="flex h-screen min-h-full flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
