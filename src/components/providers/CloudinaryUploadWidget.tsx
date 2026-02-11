/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { X, UploadCloud, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react"; // أضفنا useState لمتابعة الحالة

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface CloudinaryUploadWidgetProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export default function CloudinaryUploadWidget({
  value,
  onChange,
  onRemove,
}: CloudinaryUploadWidgetProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera", "google_drive"],
        multiple: false,
        resourceType: "auto",
        clientAllowedFormats: ["webp", "jpg", "png", "mp4", "mov"],
        maxFileSize: 100000000,
        folder: "blog_uploads",
        styles: {
          // ستايلاتك كما هي...
        },
      },
      (error: any, result: any) => {
        // حالة بدء الرفع
        if (result.event === "uploading") {
          setIsUploading(true);
          toast.loading("Uploading your file to the cloud...", {
            id: "upload-toast",
          });
        }

        // حالة النجاح
        if (!error && result && result.event === "success") {
          setIsUploading(false);
          let finalUrl = result.info.secure_url;

          if (result.info.resource_type === "image") {
            finalUrl = finalUrl.replace("/upload/", "/upload/f_auto,q_auto/");
          } else if (result.info.resource_type === "video") {
            finalUrl = finalUrl.replace(
              "/upload/",
              "/upload/f_auto,q_auto,vc_auto/"
            );
          }

          onChange(finalUrl);
          toast.success("Media optimized and uploaded!", {
            id: "upload-toast",
          });
        }

        // حالة الخطأ
        else if (error || result.event === "abort") {
          setIsUploading(false);
          toast.error("Upload failed or cancelled", { id: "upload-toast" });
        }
      }
    );
    widget.open();
  };

  return (
    <div className="w-full h-full min-h-[150px] flex flex-col gap-3">
      {/* Header: يتكيف مع العرض */}
      <div className="flex items-center justify-between gap-2 px-1">
        <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold truncate">
          Featured Media
        </label>
        {value && (
          <Button
            type="button"
            onClick={onRemove}
            variant="destructive"
            className="h-6 px-2 rounded-full text-[9px] hover:bg-red-600 transition-colors"
          >
            <X size={10} className="mr-1" /> REMOVE
          </Button>
        )}
      </div>

      {/* Main Container: يأخذ كامل مساحة الأب */}
      <div className="flex-1 w-full min-h-0 relative">
        {value ? (
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 group relative">
            {value.includes("/video/") ? (
              <video
                src={value}
                controls
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <Image
                src={value}
                fill
                alt="Uploaded preview"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={onUpload}
            disabled={isUploading}
            // أزلنا aspect-video وأضفنا h-full ليملاً الحاوية
            className="w-full h-full min-h-[150px] flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-white/60" size={28} />
                <span className="text-[10px] text-white/40 tracking-widest animate-pulse">
                  UPLOADING...
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                  <UploadCloud
                    className="text-white/20 group-hover:text-white/60"
                    size={28}
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-[11px] text-white/30 font-bold uppercase tracking-tight group-hover:text-white/60">
                    Click to upload
                  </p>
                  <p className="text-[9px] text-white/10 italic mt-1 hidden sm:block">
                    Images or Videos (Max 100MB)
                  </p>
                </div>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
