import { motion } from "framer-motion";
import Image from "next/image";
import { MoreVertical, ShieldCheck, HardDrive } from "lucide-react";

export function LinksContent() {
  // البيانات مدمجة وكأنها تطبيقات حقيقية مثبتة
  const INSTALLED_APPS = [
    {
      id: 1,
      name: "LinkedIn Messenger",
      image: "/icons/social/linkedin.png",
      url: "https://linkedin.com/in/your-profile",
      size: "42.5 MB",
      version: "2.1.0",
      installDate: "1/20/2026",
    },
    {
      id: 2,
      name: "Facebook Mobile",
      image: "/icons/social/facebook.png",
      url: "https://facebook.com/your-profile",
      size: "156 MB",
      version: "442.0.1",
      installDate: "1/15/2026",
    },
    {
      id: 3,
      name: "Instagram Pro",
      image: "/icons/social/instagram.png",
      url: "https://instagram.com/your-profile",
      size: "98.2 MB",
      version: "315.0.0",
      installDate: "1/18/2026",
    },
    {
      id: 4,
      name: "X (formerly Twitter)",
      image: "/icons/social/x.png",
      url: "https://x.com/your-profile",
      size: "64.1 MB",
      version: "10.21.0",
      installDate: "1/22/2026",
    },
    {
      id: 5,
      name: "WhatsApp Desktop",
      image: "/icons/social/whatsapp.png",
      url: "https://wa.me/201XXXXXXXXX",
      size: "112 MB",
      version: "2.24.2",
      installDate: "1/25/2026",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1c1c1c] text-white select-none">
      {/* 1. Top Header - يشبه شريط بحث الإعدادات */}
      <div className="p-5 border-b border-[#333] bg-[#202020]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold tracking-tight">
            Installed apps
          </h1>
          <div className="flex gap-2">
            <div className="bg-[#2d2d2d] px-3 py-1 rounded text-xs border border-[#3f3f3f] text-gray-400">
              Sort by: Name
            </div>
          </div>
        </div>
        <div className="relative no-drag">
          <input
            type="text"
            placeholder="Search apps"
            className="w-full bg-[#1c1c1c] border border-[#3f3f3f] border-b-blue-500 border-b-2 rounded-t-sm px-4 py-1.5 text-sm outline-none placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* 2. Apps List Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-[#1c1c1c] scrollbar-thin scrollbar-thumb-[#333]">
        {INSTALLED_APPS.map((app) => (
          <motion.div
            key={app.id}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            className="no-drag flex items-center p-3 rounded-md transition-colors group relative"
          >
            {/* App Icon */}
            <div className="relative w-10 h-10 flex-shrink-0 mr-4">
              <Image
                src={app.image}
                alt={app.name}
                fill
                className="object-contain"
              />
            </div>

            {/* App Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col">
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-blue-400 hover:underline w-fit transition-colors"
                >
                  {app.name}
                </a>
                <div className="flex items-center gap-2 mt-0.5">
                  <ShieldCheck size={12} className="text-blue-500" />
                  <span className="text-[11px] text-gray-500">
                    Verified Publisher • {app.version}
                  </span>
                </div>
              </div>
            </div>

            {/* App Metadata (Size & Date) */}
            <div className="hidden md:flex flex-col items-end mr-6 text-right">
              <span className="text-xs text-gray-300 font-medium">
                {app.size}
              </span>
              <span className="text-[10px] text-gray-600">
                {app.installDate}
              </span>
            </div>

            {/* Options Button */}
            <button className="p-2 hover:bg-[#333] rounded-md transition-colors">
              <MoreVertical size={16} className="text-gray-400" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* 3. Footer Bar - System Info */}
      <div className="px-5 py-3 bg-[#202020] border-t border-[#333] flex items-center justify-between text-[11px] text-gray-500 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <HardDrive size={12} />
          <span>System Storage: 472 GB Free</span>
        </div>
        <span>{INSTALLED_APPS.length} Apps Installed</span>
      </div>
    </div>
  );
}
