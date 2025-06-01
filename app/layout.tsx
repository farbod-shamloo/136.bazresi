// import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import { appMetadata } from "@/const/metaData";
import { FontSettingsProvider } from "@/context/FontSettingsContext";
import FontSettingsToggle from "@/components/FontSettingsToggle";
import Head from "next/head";
// import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = appMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/136.png" sizes="192x192" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-base`}
      >
        <QueryProvider>
          {/* <Header /> */}
          <FontSettingsProvider>
            <FontSettingsToggle />
            {children}
             
          </FontSettingsProvider>
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
