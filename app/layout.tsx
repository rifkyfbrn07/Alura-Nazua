import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A World Made for Alura",
  description: "A personal digital world created specifically for Ghiscca Alura Nazua, by Rifky.",
  openGraph: {
    title: "A World Made for Alura",
    description: "A personal digital world created specifically for Ghiscca Alura Nazua, by Rifky.",
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
      <body className="min-h-full bg-[#070306] text-white overflow-x-hidden selection:bg-rose-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
