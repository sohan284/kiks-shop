import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// wrap the entire app with the redux store provider
import StoreProvider from "@/providers/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kiks Shop",
  description: "Kiks Shop — RTK Query powered Next.js store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* store provider must wrap all pages and components */}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
