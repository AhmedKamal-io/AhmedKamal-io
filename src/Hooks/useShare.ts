"use client";

import { toast } from "sonner";

export function useShare() {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("تم نسخ الرابط", {
      description: "جاهز للمشاركة 🚀",
    });
  };

  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const share = {
    whatsapp: () => open(`https://wa.me/?text=${encodeURIComponent(url)}`),

    facebook: () =>
      open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`
      ),

    linkedin: () =>
      open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`
      ),

    instagram: () => {
      copy();
      toast.message("إنستجرام لا يدعم المشاركة المباشرة", {
        description: "تم نسخ الرابط — الصقه يدويًا",
      });
    },
  };

  return { url, copy, share };
}
