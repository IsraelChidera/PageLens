import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Page Lens | Free Website UX & SEO Audit Tool",
  description:
    "Get a free, instant audit of your website's UX, SEO, accessibility, and performance. Just enter a link and get actionable feedback to improve your site.",
  keywords: [
    "website audit",
    "UX audit",
    "SEO checker",
    "accessibility check",
    "performance audit",
    "site analyzer",
    "frontend analysis tool",
  ],
  authors: [{ name: "Page Lens" }],
  icons: { icon: "/favico.svg" },
  openGraph: {
    title: "Page Lens - Free Website Audit Tool",
    description: "Analyze any website for UX, SEO, accessibility and performance in seconds.",
    type: "website",
    url: "https://page-lens.netlify.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
