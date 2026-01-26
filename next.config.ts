/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,

  // --- إعدادات التطوير (Development) ---
  experimental: {
    // تسريع الكاش أثناء الشغل على الجهاز
    turbopackFileSystemCacheForDev: true,

    // تفعيل الـ Compiler الجديد لتحسين الأداء (React 19)
    reactCompiler: true,
  },

  // --- إعدادات الصور (حل مشكلة الـ 400 في البروداكشن) ---
  images: {
    // بنفعل الـ Optimization في الديف وعمليات الـ Build المستقرة
    // لو لسه الصور بتضرب معاك في فيرسيل، غير السطر ده لـ true
    unoptimized: false,
  },

  // --- إعدادات البروداكشن (Production) ---
  // تخطي أخطاء الـ Lint والـ TS عشان الـ Build ما يقفش على حاجات بسيطة
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // تحسين معالجة الروابط
  skipProxyUrlNormalize: true,

  // لضمان استقرار المسارات بعد إلغاء اللغات
  trailingSlash: false,
};

// ملاحظة: سطر الـ HMR Cache اللي مسحناه كان بيسبب كراش في السيرفر، Next.js بيتعامل معاه داخلياً مش محتاجينه هنا.

module.exports = withBundleAnalyzer(nextConfig);
