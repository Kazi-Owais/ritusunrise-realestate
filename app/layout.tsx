import type { Metadata } from 'next';
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { generateHreflangTags } from './HreflangTags';
import PerformanceOptimizer from './_components/PerformanceOptimizer';

export const metadata: Metadata = {
  title: {
    default: 'Ritusunrise Real Estate | Luxury Properties in Abu Dhabi',
    template: '%s | Ritusunrise Real Estate'
  },
  description: 'Discover luxury properties in Abu Dhabi with Ritusunrise Real Estate. Expert agents, exclusive listings, and personalized service for buying, selling, and renting premium properties across the UAE.',
  keywords: [
    'Abu Dhabi real estate', 'UAE properties', 'luxury homes Abu Dhabi', 'property for sale Abu Dhabi',
    'real estate agents UAE', 'buy property Abu Dhabi', 'villas for sale Abu Dhabi', 'apartments for rent Abu Dhabi',
    'investment properties UAE', 'off plan properties Abu Dhabi', 'prime location properties', 'expat housing Abu Dhabi',
    'luxury apartments UAE', 'real estate investment', 'property management Abu Dhabi', 'best real estate company UAE'
  ],
  authors: [{ name: 'Ritusunrise Real Estate', url: 'https://ritusunriserealestate.ae' }],
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
    languages: {
      'en-AE': '/',
      'ar-AE': '/ar',
      'x-default': '/'
    }
  },
  icons: {
    icon: [
      { url: '/favicon-optimized.png?v=1', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: 'Luxury Properties in Abu Dhabi | Ritusunrise Real Estate Experts',
    description: '🏡 Discover exclusive luxury properties in Abu Dhabi with Ritusunrise Real Estate. Browse our curated selection of villas, apartments, and investment opportunities in prime locations across the UAE.',
    url: 'https://ritusunriserealestate.ae',
    siteName: 'Ritusunrise Real Estate',
    images: [
      {
        url: 'https://ritusunriserealestate.ae/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Properties in Abu Dhabi - Ritusunrise Real Estate',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Properties in Abu Dhabi | Ritusunrise Real Estate',
    description: 'Discover exclusive luxury properties in Abu Dhabi with Ritusunrise Real Estate. Your trusted partner for premium real estate services in the UAE.',
    images: ['https://ritusunriserealestate.ae/twitter-card.jpg'],
    site: '@ritusunrisere',
    creator: '@ritusunrisere',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
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
        {generateHreflangTags()}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Add resource hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="geo.region" content="AE-AZ" />
        <meta name="geo.placename" content="Abu Dhabi" />
        <meta name="geo.position" content="24.4539;54.3773" />
        <meta name="ICBM" content="24.4539, 54.3773" />
        
        {/* Add performance budget warning */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__perf = window.__perf || {};
              window.__perf.budget = {
                fcp: 1800,
                lcp: 2500,
                cls: 0.1,
                inp: 200,
              };
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
{/* <PerformanceOptimizer /> */}
        {children}
        <Toaster position="top-right" />
        <Analytics />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3309935086775911" crossOrigin="anonymous"></script>
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
            })
          }}
        />
      </body>
    </html>
  );
}
