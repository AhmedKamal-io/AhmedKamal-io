import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function RecycleBinContent() {
  const [selectedImg, setSelectedImg] = useState<{
    id: number;
    name: string;
    src: string;
  } | null>(null); // لتخزين الصورة المختارة

  const deletedImages = [
    { id: 1, name: "old_portfolio.png", src: "/image/E-Commers.jpg" },
    { id: 2, name: "broken_asset.jpg", src: "/image/asset2.jpg" },
    { id: 3, name: "draft_design.png", src: "/image/bg3.jpg" },
    { id: 4, name: "temp_file.png", src: "/image/bg3.jpg" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white select-none relative">
      {/* 1. Toolbar */}
      <div className="h-10 border-b border-[#333] bg-[#202020] flex items-center px-3 justify-between">
        <div className="flex items-center gap-2">
          <button className="no-drag flex items-center gap-1.5 px-2 py-1 text-[11px] hover:bg-[#333] rounded transition-colors text-red-400">
            <Trash2 size={13} /> Empty
          </button>
        </div>
      </div>

      {/* 2. Main Grid */}
      <div className="flex-1 p-3 grid grid-cols-[repeat(auto-fill,minmax(85px,1fr))] content-start gap-2 overflow-y-auto">
        {deletedImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImg(img)} // عند الضغط يفتح المودال
            className="no-drag group flex flex-col items-center p-1.5 rounded hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            <div className="relative w-12 h-12 mb-1 group-active:scale-90 transition-transform">
              <div className="absolute inset-0 z-10 bg-gray-900/40 grayscale rounded group-hover:grayscale-0 transition-all" />
              <div className="w-full h-full bg-[#333] rounded overflow-hidden relative">
                <Image
                  src={img.src}
                  alt={img.name}
                  fill
                  className="object-cover optimize-gpu"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                  <ZoomIn size={16} />
                </div>
              </div>
            </div>
            <span className="text-[10px] text-center truncate w-full opacity-80">
              {img.name}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Image Modal (The Lightbox) */}
      {/* AnimatePresence تسمح للمكون بعمل أنيميشن عند الاختفاء */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-20"
            onClick={() => setSelectedImg(null)} // غلق عند الضغط في أي مكان في الخلفية
          >
            {/* زر الإغلاق */}
            <Button className="absolute top-10 right-10 text-white hover:bg-white/10 p-2 rounded-full transition-colors z-[1000]">
              <X size={30} />
            </Button>

            {/* حاوية الصورة مع أنيميشن الدخول */}
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="relative w-full h-full max-w-4xl max-h-[80vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()} // منع الغلق عند الضغط على الصورة نفسها
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={selectedImg.src}
                  alt={selectedImg.name}
                  fill
                  className="object-contain optimize-gpu" // لضمان ظهور الصورة كاملة دون قص
                  priority
                />
              </div>
              <div className="bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <p className="text-sm font-medium">{selectedImg.name}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
