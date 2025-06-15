import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import AnalyticsProvider from "../components/AnalyticsProvider";
import CookieConsent from "../components/CookieConsent";
import GDPRComplianceWidget from "../components/GDPRComplianceWidget";
import ClientDevTools from "../components/ClientDevTools";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Shakti Singh Chundawat | Full Stack Developer",
  icons: "/favicon.png",
  metadataBase: new URL("https://www.shaktisinghchundawat.online"),
  description:
    "Professional portfolio showcasing my experience, projects, and skills in web development.",
  keywords:
    "developer, portfolio, web development, react, nextjs, typescript, Shakti Singh Chundawat",
  authors: [{ name: "Shakti Singh Chundawat" }],
  creator: "Shakti Singh Chundawat",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.shaktisinghchundawat.online",
    title: "Shakti Singh Chundawat | Full Stack Developer",
    description:
      "Professional portfolio showcasing my experience, projects, and skills in web development.",
    siteName: "Shakti Singh Chundawat Portfolio",
    images: [
      {
        url: "/favicon.png", // Your PNG favicon used as social preview image
        width: 1200,
        height: 630,
        alt: "Shakti Singh Chundawat | Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakti Singh Chundawat | Full Stack Developer",
    description:
      "Professional portfolio showcasing my experience, projects, and skills in web development.",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set favicon */}
        <link rel="icon" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <Suspense fallback={null}>
              {children}
              <CookieConsent />
              <GDPRComplianceWidget />
              <ClientDevTools />
            </Suspense>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
