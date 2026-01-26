import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, LayoutGrid, Rows, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function ImagesContent() {
  const [selectedImg, setSelectedImg] = useState<{
    id: number;
    name: string;
    src: string;
    size: string;
  } | null>(null);
  const [viewMode, setViewMode] = useState("grid");

  // الداتا مدمجة مباشرة هنا
  const IMAGES_DATA = [
    {
      id: 1,
      name: "Project_Alpha.png",
      src: "/image/gallery/1.jpg",
      size: "1.2 MB",
    },
    {
      id: 2,
      name: "Design_System.jpg",
      src: "/image/gallery/2.jpg",
      size: "2.5 MB",
    },
    {
      id: 3,
      name: "Mobile_Mockup.png",
      src: "/image/gallery/3.jpg",
      size: "800 KB",
    },
    {
      id: 4,
      name: "Landing_Page.jpg",
      src: "/image/gallery/4.jpg",
      size: "3.1 MB",
    },
    {
      id: 5,
      name: "Database_Schema.png",
      src: "/image/gallery/5.jpg",
      size: "450 KB",
    },
    {
      id: 6,
      name: "Client_Feedback.jpg",
      src: "/image/gallery/6.jpg",
      size: "1.8 MB",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white select-none relative overflow-hidden">
      {/* 1. Toolbar - شريط الأدوات العلوي */}
      <div className="h-10 border-b border-[#333] bg-[#202020] flex items-center px-3 justify-between">
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <ImageIcon size={14} />
          <span>{IMAGES_DATA.length} Photos</span>
        </div>

        <div className="flex items-center gap-1 bg-[#2d2d2d] p-1 rounded-md">
          <button
            className={`no-drag p-1 rounded transition-colors ${viewMode === "grid" ? "bg-[#404040] text-blue-400 shadow-sm" : "hover:bg-[#333] text-gray-500"}`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            className={`no-drag p-1 rounded transition-colors ${viewMode === "list" ? "bg-[#404040] text-blue-400 shadow-sm" : "hover:bg-[#333] text-gray-500"}`}
            onClick={() => setViewMode("list")}
          >
            <Rows size={14} />
          </button>
        </div>
      </div>

      {/* 2. Content Area - منطقة الصور */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333]">
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            /* --- Grid View --- */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4"
            >
              {IMAGES_DATA.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImg(img)}
                  className="no-drag group flex flex-col gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <div className="relative aspect-square rounded-lg bg-[#252525] overflow-hidden border border-[#333] group-hover:border-blue-500/50 shadow-md">
                    <Image
                      src={img.src}
                      alt={img.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <ZoomIn size={20} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="px-1 flex flex-col">
                    <span className="text-[10px] truncate font-medium group-hover:text-blue-400 transition-colors">
                      {img.name}
                    </span>
                    <span className="text-[8px] text-gray-500">{img.size}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            /* --- List View --- */
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col border border-[#333] rounded-md overflow-hidden bg-[#1f1f1f]"
            >
              {IMAGES_DATA.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImg(img)}
                  className="no-drag flex items-center gap-4 p-2 hover:bg-blue-500/10 border-b border-[#333] last:border-0 cursor-pointer transition-colors"
                >
                  <div className="relative w-12 h-8 rounded bg-[#333] overflow-hidden flex-shrink-0">
                    <Image
                      src={img.src}
                      alt={img.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] flex-1 truncate">
                    {img.name}
                  </span>
                  <span className="text-[10px] text-gray-500 w-16 text-right">
                    {img.size}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Global Fullscreen Lightbox (The Fixed Modal) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // تم رفع z-index لأقصى درجة وضمان أن pointer-events فعالة
            className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImg(null);
            }}
          >
            {/* زر الإغلاق العلوي */}
            <button
              className="no-drag absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/20 text-white rounded-full transition-all z-[1000000]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg(null);
              }}
            >
              <X size={32} />
            </button>

            {/* الصورة الكبيرة */}
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="relative w-[85vw] h-[75vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg.src}
                alt={selectedImg.name}
                fill
                className="object-contain pointer-events-none drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* شريط المعلومات السفلي في المودال */}
            <div className="mt-8 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md animate-bounce-subtle">
              <span className="text-white/70 text-sm font-light tracking-widest">
                {selectedImg.name} • {selectedImg.size}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
