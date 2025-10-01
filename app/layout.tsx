import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph & Twitter Cards */}
        <meta property="og:title" content="Ritusunrise Real Estate" />
        <meta property="og:description" content="Your trusted UAE property partner" />
        <meta property="og:url" content="https://ritusunriserealestate.ae" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ritusunriserealestate.ae/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ritusunrise Real Estate" />
        <meta name="twitter:description" content="Your trusted UAE property partner" />
        <meta name="twitter:image" content="https://ritusunriserealestate.ae/og-image.png" />

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Ritusunrise",
              "url": "https://ritusunriserealestate.ae",
              "logo": "https://ritusunriserealestate.ae/logo.png",
              "sameAs": [
                "https://www.facebook.com/ritusunrise",
                "https://www.instagram.com/ritusunrise"
              ]
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
