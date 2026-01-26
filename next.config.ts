import { getServerComponentsHmrCache } from "next/dist/server/app-render/work-unit-async-storage.external";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  skipProxyUrlNormalize: true,
};

module.exports = withBundleAnalyzer(nextConfig);
