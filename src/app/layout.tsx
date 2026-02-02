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
  title: "EditPDFs.app - Free PDF Tools | No Signup, No Limits",
  description: "Edit, sign, merge, split, and compress PDFs for free. No signup required. Your files never leave your browser.",
  keywords: "pdf editor, sign pdf, merge pdf, split pdf, compress pdf, free pdf tools",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-2930855156227557" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NL8LQ2FFM1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NL8LQ2FFM1');
            `,
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2930855156227557"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "EditPDFs.app",
              "url": "https://editpdfs.app",
              "description": "Free online PDF editor. Edit, sign, merge, split, and compress PDFs. No signup required. 100% private - files never leave your browser.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Edit PDF text and images",
                "Sign PDF documents",
                "Merge multiple PDFs",
                "Split PDF pages",
                "Compress PDF files",
                "Rotate PDF pages",
                "Add annotations and shapes"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
