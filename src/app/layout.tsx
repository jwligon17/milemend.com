import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milemend.com"),
  title: {
    default: "Milemend | Street Maintenance Operations Platform",
    template: "%s | Milemend",
  },
  description:
    "Milemend helps public works teams streamline intake, dispatch, repair tracking, and resident communication.",
  openGraph: {
    title: "Milemend | Street Maintenance Operations Platform",
    description:
      "Milemend helps public works teams streamline intake, dispatch, repair tracking, and resident communication.",
    url: "https://www.example.com",
    siteName: "Milemend",
    type: "website",
    images: [
      {
        url: "/favicon.ico",
        width: 256,
        height: 256,
        alt: "Milemend placeholder Open Graph image",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppins.className}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans">
        <a
          href="#main-content"
          className="sr-only rounded-md bg-slate-900 px-3 py-2 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
