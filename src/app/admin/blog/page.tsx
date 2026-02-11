/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticlesTableClient from "./components/Blog-admin";
import Link from "next/link";
import {
  Plus,
  BarChart2,
  Search,
  LayoutDashboard,
  Star,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BiCategory } from "react-icons/bi";

async function getArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/blog`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Connection error:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const initialData = await getArticles();

  // حساب إحصائيات سريعة بناءً على السكيمة الجديدة
  const totalArticles = initialData.length;
  const publishedCount = initialData.filter(
    (a: any) => a.status === "published"
  ).length;
  const featuredCount = initialData.filter((a: any) => a.isFeatured).length;

  return (
    <main className="min-h-screen bg-Blacky text-Whitey p-6 md:p-12 font-sans selection:bg-Whitey selection:text-Blacky">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-9 pb-6 border-b border-white/10 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white/40 mb-2">
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
              System Root
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Blog Administration
          </h1>

          {/* إحصائيات سريعة متوافقة مع السكيمة الجديدة */}
          <div className="flex gap-4 mt-4 text-[11px] text-white/30 uppercase tracking-widest font-medium">
            <span className="flex items-center gap-1.5">
              <FileText size={12} /> {totalArticles} Total
            </span>
            <span className="flex items-center gap-1.5 text-green-500/60">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              {publishedCount} Live
            </span>
            <span className="flex items-center gap-1.5 text-yellow-500/60">
              <Star size={12} fill="currentColor" /> {featuredCount} Featured
            </span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Button
            variant="outline"
            asChild
            className="flex-1 lg:flex-none border-white/10 bg-transparent text-Whitey hover:bg-Whitey hover:text-Blacky rounded-full h-11 px-6 transition-all font-medium"
          >
            <Link href="/admin/blog/categories">
              <BiCategory className="mr-2 h-4 w-4" /> Categories
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="flex-1 lg:flex-none border-white/10 bg-transparent text-Whitey hover:bg-Whitey hover:text-Blacky rounded-full h-11 px-6 transition-all font-medium"
          >
            <Link href="/admin/analytics">
              <BarChart2 className="mr-2 h-4 w-4" /> Analytics
            </Link>
          </Button>

          <Button
            asChild
            className="w-full lg:w-auto bg-Whitey text-Blacky hover:bg-Whitey/90 rounded-full h-11 px-8 font-bold transition-transform active:scale-95 shadow-none border-none"
          >
            <Link href="/admin/blog/new">
              <Plus className="mr-2 h-5 w-5" /> New Post
            </Link>
          </Button>
        </nav>
      </header>

      <section className="w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* المكون الذي يعرض الـ Grid أو الـ Table */}
        <ArticlesTableClient initialData={initialData} />
      </section>
    </main>
  );
}
