import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProfileProvider } from "@/lib/ProfileContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Natnael Tefera — Front-End Developer",
    template: "%s | Natnael Tefera",
  },
  description: "Front-end developer specializing in React, Next.js, and modern web technologies. Building fast, beautiful, and accessible web experiences.",
  keywords: ["Front-End Developer", "React Developer", "Next.js", "Web Developer", "Portfolio", "JavaScript", "TypeScript"],
  authors: [{ name: "Natnael Tefera" }],
  creator: "Natnael Tefera",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Natnael Tefera — Front-End Developer",
    description: "Building fast, beautiful, and accessible web experiences with React and Next.js.",
    siteName: "Natnael Tefera",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natnael Tefera — Front-End Developer",
    description: "Building fast, beautiful, and accessible web experiences.",
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
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
