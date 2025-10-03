import type { Metadata } from 'next';
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: 'Ritusunrise Real Estate | Trusted Property Experts in Abu Dhabi',
    template: '%s | Ritusunrise Real Estate'
  },
  description: 'Find your dream property in Abu Dhabi with Ritusunrise Real Estate. Expert real estate services for buying, selling, and renting properties in the UAE.',
  keywords: ['Abu Dhabi real estate', 'UAE properties', 'luxury homes Abu Dhabi', 'property for sale Abu Dhabi', 'real estate agents UAE'],
  authors: [{ name: 'Ritusunrise Real Estate' }],
  creator: 'Ritusunrise Real Estate',
  publisher: 'Ritusunrise Real Estate',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://ritusunriserealestate.ae'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/api/favicon', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: 'Ritusunrise Real Estate | Your Trusted Property Partner in Abu Dhabi',
    description: 'Discover luxury properties and investment opportunities in Abu Dhabi with Ritusunrise Real Estate. Expert guidance for buying, selling, and renting properties in the UAE.',
    url: 'https://ritusunriserealestate.ae',
    siteName: 'Ritusunrise Real Estate',
    images: [
      {
        url: 'https://ritusunriserealestate.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ritusunrise Real Estate - Luxury Properties in Abu Dhabi',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritusunrise Real Estate | Abu Dhabi Property Experts',
    description: 'Your trusted partner for luxury real estate in Abu Dhabi. Find your dream property today.',
    images: [{
      url: 'https://ritusunriserealestate.ae/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Ritusunrise Real Estate - Luxury Properties in Abu Dhabi',
    }],
    site: '@ritusunrise',
    creator: '@ritusunrise',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "@id": "https://ritusunriserealestate.ae/#organization",
              "name": "Ritusunrise Real Estate",
              "url": "https://ritusunriserealestate.ae",
              "logo": "https://ritusunriserealestate.ae/logo.png",
              "image": "https://ritusunriserealestate.ae/og-image.png",
              "description": "Trusted real estate agency specializing in luxury properties in Abu Dhabi, UAE",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "[Your Street Address]",
                "addressLocality": "Abu Dhabi",
                "addressRegion": "Abu Dhabi",
                "postalCode": "[Your Postal Code]",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 24.4539,
                "longitude": 54.3773
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "10:00",
                  "closes": "16:00"
                }
              ],
              "priceRange": "$$-$$$",
              "sameAs": [
                "https://www.facebook.com/ritusunrise",
                "https://www.instagram.com/ritusunrise"
              ]
            }),
          }}
        />
        <meta name="geo.region" content="AE-AZ" />
        <meta name="geo.placename" content="Abu Dhabi" />
        <meta name="geo.position" content="24.4539;54.3773" />
        <meta name="ICBM" content="24.4539, 54.3773" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
