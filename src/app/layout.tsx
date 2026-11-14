import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NOVA | Quantitative Alpha & Aladdin Risk Terminal",
  description: "Project NOVA — Autonomous Algorithmic Trading Architecture, Two-Stage XGBoost Alpha Pipeline, and BlackRock Aladdin Risk Governance. Interactive Candidate Showcase for Admissions & Quantitative Finance Committees.",
  keywords: ["Quantitative Finance", "Algorithmic Trading", "BlackRock Aladdin", "Machine Learning", "XGBoost", "SEBI Compliance", "Order Book Microstructure"],
  authors: [{ name: "Arnab Das" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05020a] text-purple-50 min-h-screen selection:bg-purple-600/30 selection:text-purple-200`}
      >
        {children}
      </body>
    </html>
  );
}
