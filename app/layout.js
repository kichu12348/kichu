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
  title: "Mahadevan Reji | Full Stack Developer",
  description: "Full Stack Developer specializing in modern web technologies",
  icons: {
    favicon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Mahadevan Reji | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    url: "https://kichu.space",
    siteName: "Mahadevan Reji",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahadevan Reji | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    images: "/og-image.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export const viewport={
  themeColor: 'rgb(248, 250, 252)',
  viewport: 'width=device-width, initial-scale=1.0',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black-translucent'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
