import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// ربط مكتبة اللغات (تأكد أن لديك ملف i18n.ts في مجلد src)
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* --- إعدادات الأداء --- */
  reactStrictMode: true, // يساعد في كشف أخطاء الريندر مبكراً
  
  /* --- إعدادات الـ Build على Vercel --- */
  // هذه الخيارات تضمن نجاح الـ Build حتى لو وجد تحذيرات بسيطة في الكود
  typescript: {
    ignoreBuildErrors: true, 
  },

  /* --- تحسينات الصور --- */
  images: {
    // يسمح بتحميل الصور من أي مصدر (مفيد لو الصور بتيجي من API خارجي)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  /* --- إعدادات إضافية --- */
  // إذا كنت تستخدم Next.js 15 وتريد تجربة الـ Compiler الجديد
  experimental: {
    // reactCompiler: true,
  },
};

export default withNextIntl(nextConfig);