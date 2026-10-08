import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Ghiscca — A Little Universe",
  description: "A little universe, made with love for Ghiscca Alura Nazua.",
  openGraph: {
    title: "For Ghiscca — A Little Universe",
    description: "A digital love letter, made with love by Rifky.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
