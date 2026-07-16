/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    disableStaticImages: true,
  },
  turbopack: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|svg|mp4|webm|mov)$/i,
      type: "asset/resource",
      generator: {
        // Sanitize filename: replace spaces/special chars with hyphens so
        // the emitted URL never contains characters that need encoding.
        filename(pathData) {
          const raw = (pathData.filename || "").split(/[\\/]/).pop() || "asset";
          const dot = raw.lastIndexOf(".");
          const name = dot !== -1 ? raw.slice(0, dot) : raw;
          const ext  = dot !== -1 ? raw.slice(dot) : "";
          const safe = name.replace(/\s+/g, "-").replace(/[^\w-]/g, "-").replace(/-+/g, "-");
          return `static/media/${safe}.[contenthash:8]${ext}`;
        },
      },
    });

    return config;
  },
};

export default nextConfig;
