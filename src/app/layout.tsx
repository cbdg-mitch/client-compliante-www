import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { organizationSchema } from "@/lib/schema";
import { FloatingCTA } from "@/components/floating-cta";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://compliantesolutions.com"),
  title: {
    default: "Compliante Solutions | Healthcare Compliance & Business Partnership",
    template: "%s | Compliante Solutions",
  },
  description: "Complete Privacy and Security Management for the Health, Insurance, and Financial Industries. Expert compliance, risk management, and revenue optimization.",
  keywords: ["healthcare compliance", "HIPAA compliance", "revenue optimization", "risk management", "healthcare consulting"],
  authors: [{ name: "Compliante Solutions Inc." }],
  icons: {
    icon: [
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/images/favicon/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/images/favicon/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://compliantesolutions.com",
    siteName: "Compliante Solutions",
    title: "Compliante Solutions | Healthcare Compliance & Business Partnership",
    description: "Complete Privacy and Security Management for the Health, Insurance, and Financial Industries.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compliante Solutions | Healthcare Compliance & Business Partnership",
    description: "Complete Privacy and Security Management for the Health, Insurance, and Financial Industries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lato.variable}`}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <FloatingCTA />
        <SiteFooter />
      </body>
    </html>
  );
}
