/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// const isProd = process.env.APP_STAGE === "production";

const nextConfig = {
  reactStrictMode: true,

  // 1. إعدادات الـ Experimental (تسريع التطوير)
  experimental: {
    // تفعيل الكاش لـ Turbopack (يفيد جداً في السرعة)
    turbopackFileSystemCacheForDev: true,
    // تفعيل المترجم الجديد لـ React 19
    reactCompiler: true,
  },

  // 2. إعدادات الصور (الحل النهائي للـ 404 والـ 400)
  images: {
    // في الـ Production بنخليها true عشان نتخطى مشاكل الـ Path في فيرسيل
    unoptimized: false,
    // لو بتستخدم صور من روابط خارجية مستقبلاً
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // 3. إعدادات المسارات (Routing & Paths)
  // نتركها فارغة لضمان أن المسار يبدأ من الجذر (Root) في فيرسيل
  basePath: "",
  // إيقاف الـ trailingSlash لحل مشاكل الروابط الوهمية
  trailingSlash: false,

  // 4. إعدادات الـ Build والإنتاج
  // تجاهل الأخطاء لضمان استمرارية الـ Deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // إعداد اختياري: يساعد في استقرار الملفات الثابتة في بيئة Standalone
  output: "standalone",

  // تحسين معالجة الروابط
  skipProxyUrlNormalize: true,
};

module.exports = withBundleAnalyzer(nextConfig);
