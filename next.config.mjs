/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|svg|mp4|webm)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[contenthash:8][ext]",
      },
    });

    return config;
  },
};

export default nextConfig;
