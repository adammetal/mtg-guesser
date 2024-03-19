import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProvider from "@/trpc/ClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MTG Guesser Game",
  description: "MTG Card Guesser Game.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
