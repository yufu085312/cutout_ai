import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cutout AI - AIで背景を自動削除",
    template: "%s | Cutout AI",
  },
  description:
    "画像をアップロードするだけでAIが自動で背景を削除。登録不要・無料・高速処理。ブラウザで完結する背景透過ツール。",
  keywords: ["背景削除", "AI", "背景透過", "画像編集", "PNG透過", "remove background"],
  openGraph: {
    title: "Cutout AI - AIで背景を自動削除",
    description: "画像をアップロードするだけでAIが自動で背景を削除。登録不要・無料・高速処理。",
    url: "https://cutoutai.yu-fu.site",
    siteName: "Cutout AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
