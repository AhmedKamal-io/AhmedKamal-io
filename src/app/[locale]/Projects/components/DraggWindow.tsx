"use client";
import React, { useRef } from "react";
import Draggable from "react-draggable";
import {
  X,
  Minus,
  Square,
  ChevronRight,
  Home,
  Star,
  Clock,
  HardDrive,
} from "lucide-react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function OSWindow({ title, children, isOpen, onClose }: any) {
  const nodeRef = useRef(null);

  if (!isOpen) return null;

  // قائمة الـ Sidebar الجانبية
  const navItems = [
    {
      icon: <Star size={16} className="text-yellow-500" />,
      label: "Favorites",
    },
    { icon: <Clock size={16} className="text-blue-400" />, label: "Recent" },
    { icon: <Home size={16} className="text-blue-500" />, label: "Desktop" },
    {
      icon: <HardDrive size={16} className="text-gray-400" />,
      label: "This PC",
    },
  ];

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      cancel=".no-drag"
      bounds="parent"
    >
      <div
        ref={nodeRef}
        style={{ position: "absolute", top: "50px", left: "100px" }}
        className="z-50 min-w-[370px] md:min-w-[700px] flex flex-col h-[430px] md:h-[500px] bg-[#1f1f1f] border-[1px] border-[#454545] shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none overflow-hidden rounded-sm"
      >
        {/* 1. Header */}
        <div className="window-header h-[32px] flex justify-between items-center bg-[#1f1f1f] text-white">
          <div className="flex items-center pl-3 gap-2">
            <Image
              src="/icons/folder/folder.png"
              alt="icon"
              width={16}
              height={16}
              className="pointer-events-none"
            />
            <span className="text-[12px] font-normal tracking-wide opacity-90">
              {title}
            </span>
          </div>
          <div className="flex h-full">
            <button className="no-drag w-[46px] h-full flex items-center justify-center hover:bg-[#333333] transition-colors">
              <Minus size={16} />
            </button>
            <button className="no-drag w-[46px] h-full flex items-center justify-center hover:bg-[#333333] transition-colors">
              <Square size={12} />
            </button>
            <button
              className="no-drag w-[46px] h-full flex items-center justify-center hover:bg-[#e81123] hover:text-white"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2. الـ Layout الأساسي (Sidebar + Content) */}
        <div className="flex flex-1 min-h-[400px]">
          {/* Sidebar: يظهر فقط في md فأكبر */}
          <aside className="hidden md:flex w-[130px] bg-[#1a1a1a] border-r border-[#333333] flex-col py-4 px-2 gap-1">
            <div className="text-[11px] font-bold text-gray-500 px-2 mb-2 flex items-center gap-1">
              <Image
                src={`/icons/quickaccess/quickaccess.png`}
                alt="Quick access"
                width={16}
                height={16}
              />
              Quick access
            </div>

            {navItems.map((item, index) => (
              <div
                key={index}
                className="no-drag flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#333333] cursor-pointer text-gray-300 hover:text-white transition-all"
              >
                {item.icon}
                <span className="text-[12px]">{item.label}</span>
              </div>
            ))}

            <div className="mt-6 text-[11px] font-bold text-gray-500 px-2 mb-2 flex items-center gap-1">
              <ChevronRight size={12} /> Cloud Storage
            </div>
            <div className="no-drag flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#333333] cursor-pointer text-gray-300">
              <Image
                src={`/icons/this-pc/this-pc.png`}
                alt="OneDrive"
                width={16}
                height={16}
                className="w-4 h-4  rounded-sm"
              />
              <span className="text-[12px]">OneDrive</span>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow bg-[#000000] flex flex-col">
            {/* Toolbar العلوي داخل النافذة */}
            <div className="h-8 border-b border-[#333333] flex items-center px-4 gap-4 text-gray-400">
              <div className="flex gap-4 text-[12px]">
                <span className="text-white border-b-2 border-blue-500 pb-1">
                  View
                </span>
                <span className="hover:text-white cursor-pointer">Sort</span>
                <span className="hover:text-white cursor-pointer">Group</span>
              </div>
            </div>

            {/* المحتوى الفعلي */}
            <div className="p-[16px] text-[#ffffff] text-[13px] flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </Draggable>
  );
}
