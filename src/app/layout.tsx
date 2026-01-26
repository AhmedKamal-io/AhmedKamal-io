import type { Metadata } from "next";
// تم استيراد الخطوط بشكل صحيح
import { Goldman, Rubik } from "next/font/google";

import "../Styles/globals.css";

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
  metadataBase: new URL("https://ahmed-kamal-io.vercel.app"),
  title: "Ahmed Kamal io",
  description:
    "I'm Ahmed Kamal, a Full Stack Web Developer. View my portfolio, projects, and contact information.",
  keywords: [
    // المسميات الوظيفية (Job Titles)
    "Ahmed Kamal",
    "Full Stack Web Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "JavaScript Developer",
    "أحمد كمال",
    "مطور ويب كامل",
    "مهندس برمجيات",
    "مطور واجهات أمامي",
    "مطور باك إند",

    // التقنيات الأساسية (Core Tech Stack)
    "Next.js",
    "React.js",
    "MERN Stack",
    "MongoDB",
    "Express.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Redux Toolkit",
    "TanStack Query",

    // مهارات وأدوات إضافية (Additional Skills)
    "RESTful APIs",
    "GraphQL",
    "PostgreSQL",
    "Prisma",
    "Vercel",
    "Git",
    "GitHub",
    "Docker",
    "Responsive Design",
    "Web Performance",
    "SEO Optimization",
    "تطوير مواقع responsive",
    "تحسين أداء المواقع",

    // كلمات بحثية عامة (General Search Terms)
    "Portfolio",
    "Projects",
    "Hire Full Stack Developer",
    "Web Development Services",
    "Personal Website",
    "بناء مواقع إلكترونية",
    "خدمات تطوير ويب",
    "برمجة تطبيقات الويب",
    // أضف هذه إلى قائمة الـ keywords السابقة
    "Linux",
    "Linux Mint",
    "Ubuntu",
    "Bash Scripting",
    "Command Line (CLI)",
    "Terminal",
    "DevOps",
    "Docker",
    "CI/CD",
    "Nginx",
    "Server Management",
    "Deployment",
    "Vercel",
    "Cloud Computing",
    "System Administration",
    "لينكس",
    "لينكس مينت",
    "أدوات المطورين",
    "إدارة السيرفرات",
    "أتمتة العمليات",
  ],

  authors: [{ name: "Ahmed Kamal" }],
  openGraph: {
    title: "Ahmed Kamal",
    description:
      "Full Stack Web Developer crafting modern web experiences with Next.js and the MERN Stack. Dive into my projects and see what I build.",
    url: "https://ahmed-kamal-io.vercel.app/",
    siteName: "Ahmed Kamal-io",
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
