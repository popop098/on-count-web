/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nng-phinf.pstatic.net',
            },
        ],
        qualities: [100]
    },
    webpack: (config, { isServer }) => {
        // Add a rule to handle .lottie files as raw assets (like file-loader)
        config.module.rules.push({
            test: /\.lottie$/,
            type: 'asset/resource', // Use Next.js built-in asset/resource type
            generator: {
                filename: 'static/media/[name].[hash][ext]',
            },
        });

        return config;
    },
};

export default nextConfig;
