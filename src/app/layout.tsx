import type { Metadata, Viewport } from "next"; // Added for type safety
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto-slab",
});

// 1. Rename to 'metadata' and export it
export const metadata: Metadata = {
  title: "Langata Islamic Center",
  description: "Langata Mosque - Building Faith, Serving Humanity",
  keywords:
    "Islamic Center, Mosque, Langata, Nairobi, Kenya, Prayers, Madrasa, Community Services",
  authors: [
    { name: "Langata Islamic Center", url: "https://langataislamiccenter.org" },
  ],
  creator: "Langata Islamic Center",
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://langataislamiccenter.org"
      : "http://localhost:3000"
  ),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  // Note: themeColor and viewport are now handled separately in newer Next.js versions
  openGraph: {
    title: "Langata Islamic Center",
    description: "Building Faith, Serving Humanity",
    images: ["/logo.png"],
  },
};

// 2. Handle viewport and theme separately (Best practice for Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10B981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoSlab.variable} suppressHydrationWarning>
      <body
        className="font-serif antialiased bg-white text-gray-900"
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
