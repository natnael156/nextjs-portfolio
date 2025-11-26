import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProfileProvider } from "@/lib/ProfileContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natnael Tefera | Front-End Developer Portfolio",
  description: "Professional front-end developer specializing in React, Next.js, and modern web technologies. View my projects, skills, and experience.",
  keywords: ["Front-End Developer", "React Developer", "Next.js", "Web Developer", "Portfolio", "JavaScript", "TypeScript"],
  authors: [{ name: "Natnael Tefera" }],
  creator: "Natnael Tefera",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Natnael Tefera | Front-End Developer",
    description: "Professional front-end developer portfolio showcasing modern web applications",
    siteName: "Natnael Tefera Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natnael Tefera | Front-End Developer",
    description: "Professional front-end developer portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={inter.className}>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
