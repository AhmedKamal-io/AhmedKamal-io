"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 1. وقت الصلاحية (Stale Time)
            staleTime: 5 * 60 * 1000,

            // 2. تقليل إعادة الطلب عند فشل الشبكة (للمستخدمين بإنترنت ضعيف)
            retry: 2, // يحاول مرتين فقط بدل 3 لتقليل الحمل
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),

            // 3. التحديث في الخلفية (Polling)
            // نصيحة: للمستخدمين الكثيرين، يفضل تقليل الـ Background Polling
            refetchInterval: 5 * 60 * 1000,
            refetchIntervalInBackground: false, // عطلها لو عدد المستخدمين ضخم جداً لتوفير موارد السيرفر

            // 4. عدم تكرار الطلبات المتطابقة
            refetchOnWindowFocus: false, // لا تطلب البيانات لمجرد أن المستخدم حرك الماوس أو فتح التبويب
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
