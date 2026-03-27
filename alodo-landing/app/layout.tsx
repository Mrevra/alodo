import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alodo Platform",
  description: "Infrastructure produit du SaaS Alodo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
