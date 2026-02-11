import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Folder,
  X,
  ZoomIn,
  HardDrive,
  FileImage,
} from "lucide-react";
import Image from "next/image";
import { PROJECTS_DATABASE } from "./ProjectsData"; // استيراد الداتا
import { Button } from "@/components/ui/button";

export function ProjectsContent() {
  const [currentFolder, setCurrentFolder] = useState<
    (typeof PROJECTS_DATABASE)[0] | null
  >(null);
  const [selectedImg, setSelectedImg] = useState<
    (typeof PROJECTS_DATABASE)[0]["images"][0] | null
  >(null);

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white select-none relative overflow-hidden">
      {/* 1. Navigation Bar */}
      <div className="h-10 border-b border-[#333] bg-[#202020] flex items-center px-3 gap-2">
        <Button
          onClick={() => setCurrentFolder(null)}
          className={`no-drag p-1 rounded transition-all ${currentFolder ? "hover:bg-[#444] text-white opacity-100" : "text-gray-600 opacity-30 cursor-default"}`}
        >
          <ChevronLeft size={18} />
        </Button>

        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium tracking-tight">
          <div className="flex items-center gap-1.5 px-2 py-0.5 hover:bg-[#333] rounded cursor-pointer transition-colors">
            <HardDrive size={12} className="text-blue-400" />
            <span>My Projects</span>
          </div>
          {currentFolder && (
            <>
              <span className="text-gray-600">/</span>
              <div className="bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded text-blue-300 animate-in fade-in slide-in-from-left-2">
                {currentFolder.name}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Scrollable Content Area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        <AnimatePresence mode="wait">
          {!currentFolder ? (
            /* --- Folder Grid View --- */
            <motion.div
              key="folders-grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2 gap-y-6"
            >
              {PROJECTS_DATABASE.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setCurrentFolder(project)}
                  className="no-drag group flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <div className="relative">
                    <Folder
                      size={52}
                      className="text-yellow-500 fill-yellow-500/10 group-hover:fill-yellow-500/30 transition-all duration-300"
                    />
                    <div className="absolute bottom-1 right-1 bg-[#1a1a1a] rounded-full p-0.5 border border-[#333]">
                      <FileImage size={10} className="text-gray-400" />
                    </div>
                  </div>
                  <span className="text-[11px] text-center font-medium opacity-80 group-hover:opacity-100 line-clamp-2 px-1">
                    {project.name}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : (
            /* --- Images Grid View --- */
            <motion.div
              key="images-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4"
            >
              {currentFolder.images.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImg(img)}
                  className="no-drag group flex flex-col gap-2 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-md bg-[#252525] overflow-hidden border border-[#333] group-hover:border-blue-500/50 shadow-lg transition-all duration-300">
                    <Image
                      src={img.src}
                      alt={img.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 optimize-gpu"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <ZoomIn size={16} className="text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] truncate px-1 text-gray-400 group-hover:text-white transition-colors">
                    {img.name}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Global Fullscreen Modal (Lightbox) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // استخدام z-index عالي جداً لضمان أنه فوق الـ Draggable window
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-xl pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation(); // منع انتقال الحدث للنافذة اللي تحت
              setSelectedImg(null); // غلق المودال
            }}
          >
            {/* زر الإغلاق - أضفنا له no-drag عشان مكتبة السحب ما تعكسوش */}
            <Button
              className="no-drag absolute top-6 right-6 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[100000]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg(null);
              }}
            >
              <X size={40} />
            </Button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-[90vw] h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // عشان لو دوست على الصورة نفسها ما يقفلش
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImg.src}
                  alt={selectedImg.name}
                  fill
                  className="object-contain pointer-events-none"
                  priority
                />
              </div>
            </motion.div>

            {/* اسم الصورة تحت */}
            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
              <span className="text-white/80 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 text-sm">
                {selectedImg.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
