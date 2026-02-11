"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaBatteryFull, FaSoundcloud } from "react-icons/fa6";
import {
  Search,
  Power,
  User,
  Home,
  Laptop,
  BookOpen,
  UserCircle,
  Mic2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskBar = () => {
  const [isStartOpen, setIsStartOpen] = useState(false);

  // روابط الصفحات داخل قائمة Start
  const NAV_LINKS = [
    {
      name: "Home",
      icon: <Home size={28} className="text-blue-400" />,
      url: "/",
    },
    {
      name: "Services",
      icon: <Laptop size={28} className="text-purple-400" />,
      url: "/services",
    },
    {
      name: "Blog",
      icon: <BookOpen size={28} className="text-emerald-400" />,
      url: "/blog",
    },
    {
      name: "About Me",
      icon: <UserCircle size={28} className="text-orange-400" />,
      url: "/about",
    },
    {
      name: "Podcast",
      icon: <Mic2 size={28} className="text-red-400" />,
      url: "/podcast",
    },
  ];

  return (
    <>
      {/* 1. مكون قائمة ابدأ (Start Menu) المحدث */}
      <AnimatePresence>
        {isStartOpen && (
          <>
            <div
              className="fixed inset-0 z-[90]"
              onClick={() => setIsStartOpen(false)}
            />
            <motion.div
              initial={{ y: 300, opacity: 0, x: "-50%" }}
              animate={{ y: 0, opacity: 1, x: "-50%" }}
              exit={{ y: 300, opacity: 0, x: "-50%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-[60px] left-1/2 z-[101] w-[95vw] max-w-[540px] h-[500px] bg-[#1c1c1c]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Search Bar */}
              <div className="p-6">
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder="Search for pages..."
                    className="w-full bg-black/30 border border-white/5 rounded-full py-2 pl-10 pr-4 text-[11px] outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* Navigation Grid */}
              <div className="flex-1 px-10">
                <div className="mb-6 px-2 text-xs font-semibold text-gray-400 tracking-wider uppercase">
                  Navigation
                </div>
                <div className="grid grid-cols-3 gap-y-8">
                  {NAV_LINKS.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      onClick={() => setIsStartOpen(false)}
                      className="flex flex-col items-center gap-3 group transition-all active:scale-90"
                    >
                      <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 border border-white/5 transition-all">
                        {link.icon}
                      </div>
                      <span className="text-[12px] font-medium text-gray-300 group-hover:text-white uppercase tracking-tighter">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between px-8">
                <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-inner text-white">
                    <User size={18} />
                  </div>
                  <span className="text-[12px] font-medium uppercase">
                    Ahmed Kamal
                  </span>
                </div>
                <Button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400">
                  <Power size={18} />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. التاسك بار (الشكل القديم الذي طلبته) */}
      <nav className="absolute bottom-0 w-full h-[48px] bg-[#1c1c1c]/80 backdrop-blur-xl z-[100] border-t border-white/10 flex items-center justify-between px-2 md:px-4">
        {/* الجانب الأيسر: الـ Widgets (مخفي في الموبايل) */}
        <div className="hidden md:flex items-center w-1/4 h-full">
          <div className="hover:bg-white/10 p-2 rounded-md transition-all cursor-pointer">
            <div className="flex flex-col text-[10px] text-white/80 leading-tight">
              <span>24°C</span>
              <span>Cloudy</span>
            </div>
          </div>
        </div>

        {/* المنتصف: الأيقونات الأساسية (Center Aligned) */}
        <div className="flex items-center justify-center gap-1 md:gap-2 absolute left-1/2 -translate-x-1/2 h-full">
          {/* زر Start (أيقونة ويندوز 11) */}
          <div
            onClick={() => setIsStartOpen(!isStartOpen)}
            className="group relative h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-all cursor-pointer"
          >
            <Image
              src="/icons/windows/windows.png"
              alt="Start"
              width={24}
              height={24}
              className={`transition-transform active:scale-90 optimize-gpu ${isStartOpen ? "scale-90" : ""}`}
            />
            {/* Dot تحت الأيقونة المفتوحة */}
            {isStartOpen && (
              <div className="absolute bottom-1 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </div>

          {/* أيقونه ال Terminal */}
          <div className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-all cursor-pointer">
            <Image
              src="/icons/terminal/terminal.png"
              alt="Terminal"
              width={24}
              height={24}
              className="optimize-gpu"
            />
          </div>

          {/* أيقونة الـ firefox */}
          <div className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-all cursor-pointer">
            <Image
              src="/icons/firefox/firefox.png"
              alt="firefox"
              width={24}
              height={24}
              className="optimize-gpu"
            />
          </div>

          {/* أيقونة الـ VScode */}
          <div className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-all cursor-pointer">
            <Image
              src="/icons/vscode/vscode.png"
              alt="VScode"
              width={24}
              className="optimize-gpu"
              height={24}
            />
          </div>
        </div>

        {/* الجانب الأيمن: الساعة والـ System Tray */}
        <div className="flex items-center justify-end w-1/4 h-full gap-1">
          <div className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-md transition-all cursor-pointer">
            <Image
              src={`/image/Windows/WiFi.png`}
              alt="WIFI"
              className="w-4 h-4 bg-Whitey/20 optimize-gpu rounded-full md:block hidden"
              width={16}
              height={16}
            />
            <FaBatteryFull className="w-4 h-4 text-white md:block hidden" />
            <FaSoundcloud className="w-4 h-4 text-white md:block hidden" />
          </div>

          <div className="hover:bg-white/10 px-2 py-1 rounded-md transition-all cursor-pointer text-right select-none">
            <div className="text-[11px] text-white font-medium">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-[10px] text-white/70 md:block hidden">
              {new Date().toLocaleDateString([], {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          <div className="w-[4px] h-3/5 border-l border-white/20 ml-1" />
        </div>
      </nav>
    </>
  );
};

export default TaskBar;
