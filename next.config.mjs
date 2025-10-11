import withPWAInit from "@ducanh2912/next-pwa";
import bundleAnalyzer from "@next/bundle-analyzer";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nng-phinf.pstatic.net",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
  },
  webpack: (config, { isServer: _isServer }) => {
    // Add a rule to handle .lottie files as raw assets (like file-loader)
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource", // Use Next.js built-in asset/resource type
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });

    return config;
  },
  experimental: {
    optimizePackageImports: [
      "@heroui/react",
      "react-toastify",
      "firebase/app",
      "firebase/messaging",
    ],
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
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
export default withBundleAnalyzer(withPWA(nextConfig));
