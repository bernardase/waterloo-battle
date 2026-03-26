import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Battle of Waterloo — Interactive Map",
  description:
    "An interactive timeline and map of the Battle of Waterloo, June 18 1815.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="antialiased"
      >
        <TooltipProvider delay={200}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
