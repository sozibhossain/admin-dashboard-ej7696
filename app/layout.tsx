import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lipsnlashesbypre - Admin Dashboard",
  description: "Manage users, subscriptions lipsnlashesbypre",
  generator: "lipsnlashesbypre.app",
  icons: {
    icon: [{ url: "/icon-logo.png", type: "image/png" }],
    shortcut: "/icon-logo.png",
    apple: "/icon-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
