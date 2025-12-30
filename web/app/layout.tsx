import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Fraunces, Space_Grotesk } from "next/font/google";

import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "RestApi Dashboard",
  description: "Operations dashboard for the RestApi services.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className="page">
          <header className="site-header">
            <div className="brand">
              <span className="brand-badge">R</span>
              <span>Expenses Tracker</span>
            </div>
            <nav className="nav-links">
              <Link href="/">Overview</Link>
              <Link href="/items">Items</Link>
              <Link href="/expenses">Expenses</Link>
              <Link href="/categories">Categories</Link>
            </nav>
          </header>
          <main>{children}</main>

        </div>
      </body>
    </html>
  );
}
