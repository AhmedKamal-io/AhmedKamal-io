// /* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Code2,
  Cpu,
  Image as ImageIcon,
  Link2,
  Mail,
  Plus,
  Search,
  BarChart3,
  RotateCw,
  X,
} from "lucide-react";
import { cn } from "@/utils/cn"; // تأكد من المسار الصحيح للـ utils
import { Button } from "@/components/ui/button";
// import { Toaster } from "sonner"; // استيراد التوست

// 1. Global Navigation Links
const globalLinks = [
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: Code2 },
  { name: "Tech", href: "/admin/technologies", icon: Cpu },
  { name: "Mail", href: "/admin/messages", icon: Mail },
];

// 2. Contextual Actions
const getContextActions = (pathname: string) => {
  if (pathname.includes("/admin/blog")) {
    return [
      { name: "New Post", href: "/admin/blog/new", icon: Plus },
      { name: "Search", href: "/admin/blog/search", icon: Search },
      { name: "Stats", href: "/admin/blog/stats", icon: BarChart3 },
    ];
  }
  return [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Links", href: "/admin/links", icon: Link2 },
  ];
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showContext, setShowContext] = useState(false);
  const contextActions = getContextActions(pathname);

  return (
    <div className="flex min-h-screen bg-Blacky text-Whitey">
      {/* إضافة مكون التوست هنا. 
          theme="dark" ليتماشى مع تصميمك الأسود 
      */}
      {/* <Toaster theme="dark" position="top-center" richColors /> */}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 border-r border-white/5 p-6 bg-Blacky">
        <div className="font-black text-2xl tracking-tighter italic mb-10">
          <Image
            src={`/image/personal-logo-png.png`}
            alt="Logo"
            width={40}
            height={40}
          />
        </div>
        <nav className="space-y-2">
          {globalLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-full text-sm transition-all",
                pathname.includes(link.href)
                  ? "bg-Whitey text-Blacky font-bold"
                  : "text-Whitey/40 hover:text-Whitey hover:bg-white/5"
              )}
            >
              <link.icon size={20} /> {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 pb-24 lg:pb-0">{children}</main>

      {/* MOBILE/TABLET BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-lg p-2 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-1.5 flex-1 justify-center px-2">
            <AnimatePresence mode="wait">
              {!showContext ? (
                <motion.div
                  key="global"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="flex justify-evenly w-full"
                >
                  {globalLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "p-1.5 rounded-full transition-all",
                        pathname.includes(link.href)
                          ? "text-Whitey"
                          : "text-Whitey/30"
                      )}
                    >
                      <link.icon size={20} />
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="context"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="flex justify-around w-full"
                >
                  {contextActions.map(action => (
                    <Link
                      key={action.name}
                      href={action.href}
                      className="p-1.5 text-blue-400 bg-blue-500/10 rounded-full"
                    >
                      <action.icon size={20} />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            onClick={() => setShowContext(!showContext)}
            className="relative w-12 h-12 bg-Whitey text-Blacky rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform overflow-hidden"
          >
            <motion.div
              animate={{ rotate: showContext ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {showContext ? <X size={24} /> : <RotateCw size={24} />}
            </motion.div>
          </Button>
        </div>
      </div>
    </div>
  );
}
