/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { Copy, Instagram, Share2, Facebook } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function UltimateShare({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  // 1. ميزة المشاركة الأصلية (للموبايل - تفتح ستوري إنستجرام وفيس بوك مباشرة)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `شاهد هذا المقال الممتع: ${title}`,
          url: url,
        });
      } catch (err) {
        console.log("Share failed or cancelled");
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto">
      <h3 className="text-lg font-bold text-center mb-6 text-gray-800">
        انشر المعرفة 🚀
      </h3>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* فيسبوك */}
        <div className="flex flex-col items-center gap-2">
          <FacebookShareButton url={url} hashtag={`#${title}`}>
            <FacebookIcon size={45} round />
          </FacebookShareButton>
          <span className="text-xs text-gray-500">فيسبوك</span>
        </div>

        {/* واتساب */}
        <div className="flex flex-col items-center gap-2">
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={45} round />
          </WhatsappShareButton>
          <span className="text-xs text-gray-500">واتساب</span>
        </div>

        {/* تيليجرام */}
        <div className="flex flex-col items-center gap-2">
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={45} round />
          </TelegramShareButton>
          <span className="text-xs text-gray-500">تيليجرام</span>
        </div>

        {/* إنستجرام / ستوري (عبر Web Share API) */}
        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={handleNativeShare}
            className="w-[45px] h-[45px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:rotate-12 transition-all"
          >
            <Instagram size={24} />
          </Button>
          <span className="text-xs text-gray-500">ستوري</span>
        </div>
      </div>

      {/* زر نسخ الرابط السريع */}
      <button
        onClick={copyToClipboard}
        className="w-full py-3 px-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm text-gray-600 truncate mr-2">{url}</span>
        {copied ? (
          <span className="text-green-600 text-sm font-bold">تم النسخ!</span>
        ) : (
          <Copy size={18} className="text-gray-400" />
        )}
      </button>
    </div>
  );
}
