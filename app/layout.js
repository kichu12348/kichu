import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Mahadevan Reji",
  description: "Full Stack Developer specializing in React, Node.js, Next.js and modern web technologies with experience building scalable applications",
  keywords: ["full stack developer", "web developer", "React", "Next.js", "Node.js", "JavaScript", "TypeScript", "web engineering"],
  authors: [{ name: "Mahadevan Reji" }],
  creator: "Mahadevan Reji",
  publisher: "Mahadevan Reji",
  icons: {
    favicon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Mahadevan Reji | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    url: "https://kichu.space",
    siteName: "Mahadevan Reji",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mahadevan Reji - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahadevan Reji | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    creator: "@yourtwitterhandle", // Replace with your actual Twitter handle
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://kichu.space",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: 'rgb(248, 250, 252)',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
