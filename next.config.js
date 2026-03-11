/** @type {import('next').NextConfig} */
// Check if we're in production environment
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  transpilePackages: ['framer-motion'],
  experimental: {
    esmExternals: 'loose',
    optimizeCss: false,
    scrollRestoration: true,
  },
  // Configure CDN in production
  assetPrefix: isProduction ? 'https://your-cdn-domain.com' : '',
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 100],
    minimumCacheTTL: 60,
    // Enable CDN for images in production
    domains: isProduction ? ['your-cdn-domain.com'] : [],
  },
  async rewrites() {
    return []
  },
  async headers() {
    if (!isProduction) {
      return [];
    }
    return [
      // HTML pages - cache for 1 hour, revalidate on client
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Static assets - cache for 1 year
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Images - cache for 1 month
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, must-revalidate',
          },
        ],
      },
      // Media files - cache for 1 month
      {
        source: '/(.*)\.(jpg|jpeg|png|webp|gif|ico|svg|avif|jfif|bmp|tiff)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, must-revalidate',
          },
        ],
      },
      // Fonts - cache for 1 year
      {
        source: '/(.*)\.(woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
