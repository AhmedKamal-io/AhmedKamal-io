"use client";
import Image from "next/image";
import OSWindow from "./components/DraggWindow";
import React from "react";
import TaskBar from "./components/TaskBar";
// import Contact from "@/Components/Home/Sections/Contact";

import { WindowsContact } from "./components/WindowsContact";
import { RecycleBinContent } from "./components/RecycleBinContant";
import { ProjectsContent } from "./components/ProjectsView";
import { ImagesContent } from "./components/PhotosContent";
import { LinksContent } from "./components/SocialMediaWindows";

const Projects = () => {
  const [showProjects, setShowProjects] = React.useState(false);
  const [showTrash, setShowTrash] = React.useState(false);
  const [showContact, setShowContact] = React.useState(false);
  const [showImages, setShowImages] = React.useState(false);
  const [showLinks, setShowLinks] = React.useState(false);

  return (
    <section
      id="projects"
      onDragStart={(e) => e.preventDefault()}
      // أضفنا relative هنا ليكون مرجعاً للصورة والأيقونات
      className="relative overflow-hidden h-screen w-screen"
    >
      {/* 1. صورة الخلفية: نعطيها z-0 لتبقى في الخلف تماماً */}
      <Image
        src="/image/Windows.jpg"
        alt="Projects"
        fill
        // unoptimized
        className="object-cover absolute z-0 optimize-gpu"
      />

      {/* 2. حاوية المحتوى: نعطيها z-10 و position relative لتظهر فوق الصورة */}
      <div className="relative flex flex-col items-start p-4 z-10 h-full w-full">
        {/* أيقونة فتح النافذة */}
        <div
          className="flex flex-col items-center w-20 m-4 cursor-pointer group select-none"
          onClick={() => setShowProjects(true)}
        >
          <div className="p-2 group-hover:bg-blue-500/30 rounded transition-colors">
            <Image
              src="/icons/this-pc/this-pc.png"
              width={45}
              height={45}
              alt="this PC"
              className="pointer-events-none optimize-gpu" // لمنع سحب الصورة نفسها بالخطأ
            />
          </div>
          <span className="text-white text-xs text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            My Projects
          </span>
        </div>

        <div
          className="p-2 group-hover:bg-blue-500/30 rounded transition-colors flex flex-col items-center w-20 m-4 cursor-pointer group select-none"
          onClick={() => setShowTrash(true)}
        >
          <div className="p-2 group-hover:bg-blue-500/30 rounded transition-colors">
            <Image
              src={`/icons/trash/trash_full.png`}
              alt="Trash"
              width={64}
              height={64}
              className="optimize-gpu"
            />
          </div>
          <span className="text-white text-xs text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Recycle Bin
          </span>
        </div>

        <div
          className="flex flex-col items-center w-20 m-4 cursor-pointer group select-none"
          onClick={() => setShowContact(true)}
        >
          <div className="p-2 group-hover:bg-blue-500/30 rounded transition-colors">
            <Image
              src="/icons/gmail/gmail-logo.png"
              width={45}
              height={45}
              alt="this PC"
              className="pointer-events-none optimize-gpu" // لمنع سحب الصورة نفسها بالخطأ
            />
          </div>
          <span className="text-white text-xs text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Contact
          </span>
        </div>
        <div
          onClick={() => setShowLinks(true)}
          className="flex flex-col items-center w-20 m-4 cursor-pointer group select-none"
        >
          <div className="p-2 group-hover:bg-blue-500/30 rounded transition-colors">
            <Image
              src="/icons/links/links.png"
              width={45}
              height={45}
              alt="Links"
              className="optimize-gpu pointer-events-none"
            />
          </div>
          <span className="text-white text-xs text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Links
          </span>
        </div>

        <div
          onClick={() => setShowImages(true)}
          className="flex flex-col items-center w-20 m-4 cursor-pointer group select-none"
        >
          <div className="p-2 group-hover:bg-blue-500/30 rounded transition-colors">
            <Image
              src="/icons/pictures/pictures.png"
              width={45}
              height={45}
              alt="Images"
              className="pointer-events-none optimize-gpu"
            />
          </div>
          <span className="text-white text-xs text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Images
          </span>
        </div>
        {/* النافذة القابلة للسحب */}

        {/*========================={ My Projects }===================*/}

        <OSWindow
          title="My Projects - Ahmed Kamal"
          isOpen={showProjects}
          onClose={() => setShowProjects(false)}
        >
          <ProjectsContent />
        </OSWindow>

        {/*========================={ Recycle Bin }===================*/}

        <OSWindow
          title="Recycle Bin"
          isOpen={showTrash}
          onClose={() => setShowTrash(false)}
        >
          <RecycleBinContent />
        </OSWindow>

        {/*========================={ Contact Gmail }===================*/}
        <OSWindow
          title="Contact Me"
          isOpen={showContact}
          onClose={() => setShowContact(false)}
        >
          <WindowsContact />
        </OSWindow>

        {/*========================={ Images }===================*/}

        <OSWindow
          title="Images"
          isOpen={showImages}
          onClose={() => setShowImages(false)}
        >
          <ImagesContent />
        </OSWindow>

        {/*========================={ Links }===================*/}

        <OSWindow
          title="Links"
          isOpen={showLinks}
          onClose={() => setShowLinks(false)}
        >
          <LinksContent />
        </OSWindow>
      </div>

      <TaskBar />
    </section>
  );
};

export default Projects;
