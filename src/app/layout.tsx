import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { church, isDemo, leaders, siteUrl, TZ, weekly } from "@/lib/site";
import "./globals.css";

// Dated things (the Nov 21 giveaway, events) switch over on their own; re-render hourly.
export const revalidate = 3600;

// Fonts are self-hosted so the build never depends on reaching Google.
// Archivo (variable width) for everything, squeezed to 68% for headlines; Instrument Serif italic for the warm lines.
const archivo = localFont({
  src: [
    { path: "../fonts/archivo.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/archivo-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = localFont({
  src: [
    { path: "../fonts/instrument.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

const description = `${church.name} at ${church.street} (${church.corner}), ${church.city}, ${church.stateCode}. ${leaders.apostle.title} ${leaders.apostle.name} and ${leaders.lady.title} ${leaders.lady.name}. Sunday Worship 11:30 AM, Thursday Night Service 6 PM. ${church.welcome}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${church.name} · ${church.street} · St. Louis`,
    template: `%s · ${church.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: church.name,
    title: `${church.name} · No Uber Needed`,
    description,
    images: [{ url: "/photos/van-team.webp", width: 1350, height: 1800 }],
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { capable: true, title: church.short },
  robots: isDemo ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a1430",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: church.name,
  url: siteUrl,
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress: church.street,
    addressLocality: church.city,
    addressRegion: church.stateCode,
    postalCode: church.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: church.geo.lat, longitude: church.geo.lng },
  sameAs: [church.facebook],
  event: weekly.map((s) => ({
    "@type": "Event",
    name: s.name,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventSchedule: { "@type": "Schedule", byDay: `https://schema.org/${s.byDay}`, startTime: s.start, scheduleTimezone: TZ },
    location: { "@type": "Place", name: church.name, address: `${church.street}, ${church.city}, ${church.stateCode} ${church.zip}` },
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Scroll reveals only hide content once we know JavaScript is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-amber focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
