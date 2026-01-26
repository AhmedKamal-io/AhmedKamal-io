import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar"], // اللغات المدعومة
  defaultLocale: "en", // اللغة الافتراضية
});

export const config = {
  // استثناء المسارات التي لا تحتاج ترجمة مثل الصور والـ API
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
