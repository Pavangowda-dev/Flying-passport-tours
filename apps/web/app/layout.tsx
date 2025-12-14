import { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleTagManager from "@/components/GoogleTagManager";
import ScrollReset from "@/components/ScrollReset";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  fallback: ["serif"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1e2e21",
};

export const metadata: Metadata = {
  title: {
    default: "Flying Passport | Best Travel Agency in Karnataka for Group Tours & Holiday Packages",
    template: "%s | Flying Passport",
  },
  description:
    "Plan unforgettable international holidays with Flying Passport – India’s trusted travel agency for Europe, Kenya, Japan, and more. Affordable packages, expert guidance, and 24/7 support.",
  keywords: "best travel agency in Bangalore, group tours from Karnataka under 1 lakh, international group tours from Bangalore, affordable holiday packages from Karnataka, Kannada-guided group tours",
  authors: [{ name: "Flying Passport" }],
  robots: "index, follow",
  openGraph: {
    title: "Flying Passport | Best Travel Agency in Bangalore",
    description: "Join affordable group tours from Bangalore to Japan, Europe, Kenya, and more with Flying Passport.",
    type: "website",
    url: "https://flyingpassports.com",
    siteName: "Flying Passport",
    images: [
      {
        url: "https://flyingpassports.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flying Passport - Best travel agency in Bangalore",
      },
    ],
  },
  other: {
    "format-detection": "telephone=no",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  icons: {
    icon: "/images/logo-updated.png",
    apple: "/images/logo-updated.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ysf3wph.css" />
        <link rel="icon" href="/images/logo-updated.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo-updated.png" />
        {/* JSON-LD Schema for LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Flying Passport",
            "description": "Best travel agency in Bangalore offering affordable group tours and family holiday packages from Karnataka.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1st Floor, MD Plaza, Ganganagar",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "postalCode": "560024",
              "addressCountry": "IN",
            },
            "telephone": "+91-7795538639",
            "url": "https://flyingpassports.com",
            "sameAs": ["https://youtube.com/@flyingpassport"],
          })}
        </script>
        {/* JSON-LD Schema for Tours */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Group Tours by Flying Passport",
            "description": "Affordable international group tours from Bangalore, including Kenya safari and European highlights.",
            "offers": [
              {
                "@type": "Offer",
                "name": "6-Day Kenyan Safari",
                "price": "196000",
                "priceCurrency": "INR",
                "availability": "http://schema.org/InStock",
                "url": "https://flyingpassports.com/tours/4",
              },
              {
                "@type": "Offer",
                "name": "13-Day European Highlights",
                "price": "337000",
                "priceCurrency": "INR",
                "availability": "http://schema.org/InStock",
                "url": "https://flyingpassports.com/tours/6",
              },
            ],
          })}
        </script>
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}>
        <GoogleTagManager />
        <ScrollReset />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}