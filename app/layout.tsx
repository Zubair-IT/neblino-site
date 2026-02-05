import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neblino Labs - Software Development Company",
  description: "Leading software development company delivering innovative solutions",
  icons: {
    icon: '/neblino-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
