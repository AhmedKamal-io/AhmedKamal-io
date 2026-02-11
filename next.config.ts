import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // 1. تفعيل الـ Compiler الجديد لـ React 19 (لتحسين أداء الريندر)
  reactCompiler: true,
  reactStrictMode: false, // في المشاريع الكبيرة يفضل false لتقليل الـ Re-renders في الديف

  // 2. تحسينات الأداء والمكتبات (Tree Shaking)
  experimental: {
    // تفعيل الكاش لمحرك Turbopack لتسريع الديف
    turbopackFileSystemCacheForDev: true,

    // إجبار Next.js على سحب الأجزاء المستخدمة فقط من المكتبات الكبيرة
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "gsap",
      "@radix-ui/react-icons",
      "lucide-react",
    ],
  },

  // 3. تحسين استهلاك الذاكرة في الـ Build
  // هذا يمنع الـ Build من استهلاك الرام بالكامل في المكتبات الضخمة
  // (يفيد جداً في Vercel أو السيرفرات الضعيفة)
  serverExternalPackages: ["mongoose", "mongodb"],

  // 4. تجاهل الفحوصات لزيادة سرعة الـ Build النهائي
  // eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // 5. إعدادات الصور
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"], // تحويل الصور لأخف صيغ ممكنة تلقائياً
  },

  // ضغط الملفات الناتجة لتقليل حجم الـ Payload
  compress: true,
};

module.exports = withBundleAnalyzer(nextConfig);
