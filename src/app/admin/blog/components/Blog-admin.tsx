/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Edit3, Trash2, Eye, BarChart3, Star, Inbox } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function ArticlesGridClient({
  initialData,
}: {
  initialData: any[];
}) {
  const queryClient = useQueryClient();

  // جلب البيانات مع إعدادات الحماية من تكرار الطلبات
  const {
    data: articles,
    isError,
    // isLoading,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axios.get("/api/blog");
      return data;
    },
    initialData: initialData,
    staleTime: 1000 * 60 * 10, // البيانات تعتبر "طازجة" لمدة 10 دقائق
    refetchOnWindowFocus: false, // لا تطلب بيانات عند العودة للنافذة
    refetchOnMount: false, // لا تطلب بيانات عند فتح الصفحة لو الـ initialData موجودة
  });

  // إظهار التوست في حالة الخطأ أو عدم وجود بيانات
  useEffect(() => {
    if (isError) {
      toast.error("حدث خطأ أثناء مزامنة البيانات");
    } else if (articles && articles.length === 0) {
      toast.info("لا توجد مقالات حالياً في قاعدة البيانات");
    }
  }, [articles, isError]);

  const { mutate: deleteArticle, isPending: isDeleting } = useMutation({
    mutationFn: async (slug: string) => axios.delete(`/api/blog/${slug}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("تم حذف المقال بنجاح");
    },
    onError: () => {
      toast.error("فشل حذف المقال، حاول مرة أخرى");
    },
  });

  // حالة التحميل أو عدم وجود بيانات (نفس الـ UI الخاص بك)
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-Whitey/20">
        <Inbox size={48} strokeWidth={1} />
        <p className="mt-4 text-sm font-medium tracking-widest uppercase">
          No content available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-Blacky min-h-screen p-2 sm:p-4 md:p-6 text-Whitey font-sans">
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        {articles.map((article: any) => (
          <Card
            key={article._id}
            className="bg-Blacky border-white/5 group rounded-2xl flex flex-col transition-all hover:border-white/20 hover:bg-white/[0.02] shadow-none overflow-hidden relative"
          >
            {/* Featured Indicator */}
            {article.isFeatured && (
              <div className="absolute top-3 right-3 z-10 bg-yellow-500/10 text-yellow-500 p-1.5 rounded-full backdrop-blur-md border border-yellow-500/20 shadow-xl">
                <Star size={12} fill="currentColor" />
              </div>
            )}

            {/* Image Section */}
            <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden">
              <Image
                src={article.mainImage}
                alt={article.title?.en || "Article Image"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-3 left-3 flex gap-2">
                <Badge className="bg-black/60 backdrop-blur-md text-white border-white/10 rounded-full text-[9px] px-2 py-0.5 uppercase tracking-wider">
                  {article.category || "General"}
                </Badge>
                {/* Status Badge */}
                <Badge
                  className={cn(
                    "rounded-full text-[9px] px-2 py-0.5 uppercase tracking-wider border-none",
                    article.status === "published"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/10 text-white/40"
                  )}
                >
                  {article.status || "draft"}
                </Badge>
              </div>
            </div>

            <CardHeader className="p-4 flex-grow space-y-1">
              <CardTitle className="text-Whitey text-sm md:text-base font-semibold leading-snug line-clamp-2">
                {article.title?.en || article.title?.ar}
              </CardTitle>

              {/* Tags Display */}
              <div className="flex flex-wrap gap-1 mt-1">
                {article.tags?.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] text-Whitey/20 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="px-4 py-2">
              <div className="flex items-center gap-4 text-[10px] md:text-[11px] text-Whitey/20 border-t border-white/5 pt-3">
                <span className="flex items-center gap-1.5">
                  <Eye size={13} /> {article.stats?.views || 0}
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 size={13} /> {article.stats?.shares || 0}
                </span>
              </div>
            </CardContent>

            <CardFooter className="p-4 flex items-center justify-between gap-2">
              <Button
                asChild
                variant="outline"
                className="flex-1 border-white/10 text-Whitey/70 rounded-full hover:bg-Whitey hover:text-Blacky text-[11px] font-medium h-8 transition-all"
              >
                <Link href={`/admin/blog/edit/${article.slug}`}>
                  <Edit3 size={13} className="mr-2" /> Edit
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-8 h-8 p-0 text-Whitey/20 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                    disabled={isDeleting}
                  >
                    <Trash2 size={14} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-Blacky border-white/10 text-Whitey rounded-3xl max-w-[90vw] sm:max-w-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-bold">
                      Delete Article?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-Whitey/50 text-xs">
                      This action is permanent. This post will be wiped from the
                      database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-4 gap-2">
                    <AlertDialogCancel className="bg-transparent border-white/10 text-Whitey rounded-full hover:bg-white/5 font-medium px-6">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteArticle(article.slug)}
                      className="bg-red-600 text-Whitey hover:bg-red-700 rounded-full font-bold px-6"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
