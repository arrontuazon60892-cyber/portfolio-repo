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
    // Remove any existing rules that handle these image/video types so our
    // rule (which sanitises filenames with spaces) is the only one that runs.
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.oneOf) {
        rule.oneOf = rule.oneOf.filter(
          (r) => !(r.test && r.test.toString().match(/png|jpe?g|gif|webp|avif|svg|mp4|webm|mov/))
        );
      }
      return rule;
    });

    // Prepend so this rule wins before any Next.js catch-all.
    config.module.rules.unshift({
      test: /\.(png|jpe?g|gif|webp|avif|svg|mp4|webm|mov)$/i,
      type: "asset/resource",
      generator: {
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
