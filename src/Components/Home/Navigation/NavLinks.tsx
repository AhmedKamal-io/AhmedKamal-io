import React from "react";
import { User, LayoutGrid, FolderRoot, FileText, Cpu } from "lucide-react";

const NavLinks = () => {
  const iconSize = 18;
  const links = [
    { name: "About", href: "#about", icon: <User size={iconSize} /> },
    {
      name: "Services",
      href: "#services",
      icon: <LayoutGrid size={iconSize} />,
    },
    { name: "Tech", href: "#tech", icon: <Cpu size={iconSize} /> },
    {
      name: "Projects",
      href: "#projects",
      icon: <FolderRoot size={iconSize} />,
    },
    { name: "Blog", href: "#blog", icon: <FileText size={iconSize} /> },
  ];

  return (
    <div className="hidden lg:flex lg:gap-6 xl:gap-8 font-semibold text-[17px] xl:text-[19px] items-center">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="group flex items-center lx:gap-1 gap-2 hover:text-Secound transition-all duration-500 relative py-[2px]"
        >
          {/* الأيقونة تظهر فقط في الشاشات الكبيرة وتتحرك عند الحوم */}
          <span className="hidden xl:block group-hover:scale-110 transition-transform">
            {link.icon}
          </span>
          {link.name}
          {/* خط الـ Underline الموحد */}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-Secound transition-all duration-500 group-hover:w-full rounded-full"></span>
        </a>
      ))}

      {/* زر Contact Me منفصل لأنه بتصميم مختلف (Button Style) */}
      <a
        href="#contact"
        className="flex items-center  transition-all duration-500 hover:shadow-md hover:shadow-Assend bg-Assend text-Whitey px-3 py-1.5 rounded-full outline-2 outline-offset-2 outline-Secound hover:scale-105 active:scale-95 ml-2 shadow-sm"
      >
        <span className="whitespace-nowrap">Contact Me</span>
      </a>
    </div>
  );
};

export default NavLinks;
