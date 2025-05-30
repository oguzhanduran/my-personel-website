import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import NetworkAnimation from "@/components/background/NetworkAnimation";
import IntroVideo from "@/components/home/IntroVideo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oguzhan Duran | AI & Web Developer",
  description: "Personal website showcasing AI-powered solutions and web development projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-[rgb(10,10,20)] text-white overflow-x-hidden min-h-screen`}
      >
        <div className="relative min-h-screen">
          <div className="fixed inset-0 z-0">
            <NetworkAnimation />
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
