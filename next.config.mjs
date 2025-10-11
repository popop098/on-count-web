import withPWAInit from "@ducanh2912/next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nng-phinf.pstatic.net",
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 90, 100], // Add supported qualities
  },
  experimental: {
    optimizePackageImports: ['@heroui/react', 'framer-motion', 'gsap'],
  },
  webpack: (config, { isServer, dev }) => {
    // Add a rule to handle .lottie files as raw assets (like file-loader)
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource", // Use Next.js built-in asset/resource type
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });

    // Optimize bundle splitting
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          heroui: {
            test: /[\\/]node_modules[\\/]@heroui[\\/]/,
            name: 'heroui',
            priority: 10,
            chunks: 'all',
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 10,
            chunks: 'all',
          },
          gsap: {
            test: /[\\/]node_modules[\\/]gsap[\\/]/,
            name: 'gsap',
            priority: 10,
            chunks: 'all',
          },
          webgl: {
            test: /[\\/]node_modules[\\/]ogl[\\/]/,
            name: 'webgl',
            priority: 10,
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },
};

const withPWA = withPWAInit({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
        document: '/_offline', // will be created later
    },
});
export default withPWA(nextConfig);
