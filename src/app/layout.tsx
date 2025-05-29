import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import NetworkAnimation from "@/components/background/NetworkAnimation";

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
    <html lang="en" className="antialiased">
      <body className={`${inter.className} min-h-screen overflow-x-hidden`}>
        <NetworkAnimation />
        <Header />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
