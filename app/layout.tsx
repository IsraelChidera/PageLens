import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Page Lens | Free Website UX & SEO Audit Tool",
  description: "Get a free, instant audit of your website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Get a free, instant audit of your website's UX, SEO, accessibility, and performance. Just enter a link and get actionable feedback to improve your site." />
        <meta name="keywords" content="website audit, UX audit, SEO checker, accessibility check, performance audit, site analyzer, frontend analysis tool" />
        <meta name="author" content="Page Lens" />
        <meta property="og:title" content="Page Lens - Free Website Audit Tool" />
        <meta property="og:description" content="Analyze any website for UX, SEO, accessibility and performance in seconds." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://page-lens.netlify.app" />
      </head>
      <body
        className={` antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
