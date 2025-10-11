import withPWAInit from "@ducanh2912/next-pwa";

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
    qualities: [75, 90],
    formats: ["image/webp"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
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
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/_offline", // will be created later
  },
});
export default withPWA(nextConfig);
