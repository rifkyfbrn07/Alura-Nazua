import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alura's Little Lily World 🌷",
  description:
    "A cute romantic scrapbook, memory constellation, and personal love story made with all my heart by Rifky for Alura.",
  openGraph: {
    title: "Alura's Little Lily World 🌷",
    description:
      "A cute romantic scrapbook, memory constellation, and personal love story made with all my heart by Rifky for Alura.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#FFF7F5] text-[#702C43] overflow-x-hidden selection:bg-[#F4D1D5] selection:text-[#702C43]">
        {children}
      </body>
    </html>
  );
}
