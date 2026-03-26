import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Problem Extractor | AI SaaS Engine",
  description: "Automated B2B/B2C SaaS Validation Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050505] text-neutral-200 min-h-screen flex selection:bg-white/20">
        {children}
      </body>
    </html>
  );
}
