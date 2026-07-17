/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  outputFileTracingRoot: process.cwd(),
  // Keep Next.js default static image handling OFF so our custom rule owns it.
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    // Walk every rule (including nested oneOf arrays) and neutralise any
    // existing handler for the asset types we want to own.  We guard every
    // property access so a malformed rule never throws.
    const mediaRe = /\.(png|jpe?g|gif|webp|avif|svg|mp4|m4v|webm|mov)$/i;

    function stripMediaRules(rules) {
      return rules
        .filter((r) => {
          if (!r || typeof r !== "object") return true;
          const t = r.test;
          if (!t) return true;
          const str = t instanceof RegExp ? t.source : String(t);
          return !mediaRe.test(str.replace(/\\/g, ""));
        })
        .map((r) => {
          if (r && r.oneOf) return { ...r, oneOf: stripMediaRules(r.oneOf) };
          return r;
        });
    }

    config.module.rules = stripMediaRules(config.module.rules);

    // Our rule: emit every media file as a hashed static asset and export
    // the public URL string.  Filenames with spaces / special chars are
    // sanitised so the emitted URL is always valid without encoding.
    config.module.rules.unshift({
      test: mediaRe,
      type: "asset/resource",
      generator: {
        filename(pathData) {
          const raw = String(pathData.filename || "").split(/[\\/]/).pop() || "asset";
          const dot = raw.lastIndexOf(".");
          const name = dot !== -1 ? raw.slice(0, dot) : raw;
          const ext  = dot !== -1 ? raw.slice(dot)  : "";
          const safe = name
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "-")
            .replace(/-{2,}/g, "-")
            .replace(/^-|-$/g, "");
          return `static/media/${safe || "asset"}.[contenthash:8]${ext}`;
        },
      },
    });

    return config;
  },
};

export default nextConfig;
