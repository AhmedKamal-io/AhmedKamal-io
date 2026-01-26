import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// هنا الـ default export اللي لازم Next.js يلاقيه
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
