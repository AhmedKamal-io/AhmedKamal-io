import type { Metadata } from "next";
// تم استيراد الخطوط بشكل صحيح
import { Goldman, Rubik } from "next/font/google";

import "@/styles/globals.css";

const primeFont = Goldman({
  variable: "--font-prime",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const secondFont = Rubik({
  variable: "--font-second",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Kamal",
  description:
    "I'm Ahmed Kamal, a Full Stack Web Developer. View my portfolio, projects, and contact information.",
  keywords: [
    "Ahmed Kamal",
    "Full Stack Developer",
    "Next.js",
    "MERN Stack",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "أحمد كمال",
    "مطور ويب",
    "تطوير مواقع",
  ],

  authors: [{ name: "Ahmed Kamal" }],
  openGraph: {
    title: "Ahmed Kamal",
    description:
      "Full Stack Web Developer specializing in Next.js and MERN Stack. Explore my portfolio and projects.",
    url: "https://ahmed-kamal-tau.vercel.app/",
    siteName: "Ahmed Kamal",
    images: [
      {
        url: "/favicon.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Kamal Portfolio Preview",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${primeFont.variable} ${secondFont.variable} scroll-smooth`}
    >
      <body
        // 3. تطبيق الفئات الفعلية التي أنشأتها الخطوط (className)
        // هذا يسمح لـ Tailwind CSS باستخدام الخطوط في التصنيفات الافتراضية
        className={`${primeFont.className} ${secondFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
