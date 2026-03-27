import { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleTagManager from "@/components/GoogleTagManager";
import ScrollReset from "@/components/ScrollReset";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LayoutWrapper from "@/components/layout-wrapper"; // ✅ NEW

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
    default:
      "Flying Passport | Best Travel Agency in Karnataka for Group Tours & Holiday Packages",
    template: "%s | Flying Passport",
  },
  description:
    "Plan unforgettable international holidays with Flying Passport – India’s trusted travel agency for Europe, Kenya, Japan, and more.",
  keywords:
    "best travel agency in Bangalore, group tours from Karnataka under 1 lakh",
  authors: [{ name: "Flying Passport" }],
  robots: "index, follow",
  openGraph: {
    title: "Flying Passport | Best Travel Agency in Karnataka",
    description:
      "Join affordable group tours from Bangalore to Japan, Europe, Kenya, and more.",
    type: "website",
    url: "https://flyingpassports.com",
    siteName: "Flying Passport",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ysf3wph.css" />
        <link rel="icon" href="/images/logo-updated.png" />
        <link rel="apple-touch-icon" href="/images/logo-updated.png" />
      </head>

      <body
        className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}
      >
        <GoogleTagManager />
        <ScrollReset />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* ✅ ONLY CHANGE HERE */}
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>

        <SpeedInsights />
      </body>
    </html>
  );
}