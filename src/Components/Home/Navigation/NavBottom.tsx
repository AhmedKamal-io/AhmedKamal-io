"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  User,
  LayoutGrid,
  Cpu,
  FolderRoot,
  FileText,
  // Mail,
  PhoneCall,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NavBottom = () => {
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef(null);
  const iconSize = 20;
  const links = useMemo(
    () => [
      { label: "About", href: "#about", icon: <User size={iconSize} /> },
      {
        label: "Service",
        href: "#services",
        icon: <LayoutGrid size={iconSize} />,
      },
      { label: "Technos", href: "#tech", icon: <Cpu size={iconSize} /> },
      {
        label: "Projects",
        href: "#projects",
        icon: <FolderRoot size={iconSize} />,
      },
      { label: "Blog", href: "#blog", icon: <FileText size={iconSize} /> },
      {
        label: "Contact",
        href: "#contact",
        icon: <PhoneCall size={iconSize} />,
      },
    ],
    [],
  );

  useEffect(() => {
    links.forEach((link) => {
      ScrollTrigger.create({
        trigger: link.href,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(link.href),
        onEnterBack: () => setActiveSection(link.href),
      });
    });
  }, [links]);

  return (
    <div className="fixed bottom-0 w-full z-[2000] lg:hidden flex justify-center px-2 mb-4">
      <div
        ref={navRef}
        className="flex justify-between items-center px-2 md:px-8 py-1.5 bg-Blacky rounded-lg border-[1px] border-WhiteyFade shadow-2xl  w-fit max-w-[97%] gap-1 md:gap-2"
      >
        {links.map((link) => {
          const isActive = activeSection === link.href;

          return (
            <a
              key={link.label}
              href={link.href}
              className={`flex items-center gap-1 md:gap-2 px-2.5 py-2 rounded-md transition-all duration-500 overflow-hidden  ${
                isActive ? "bg-Secound text-Blacky" : "text-Whitey"
              }`}
              style={{ minWidth: isActive ? "fit-content" : "36px" }}
            >
              <span
                className={`${isActive ? "scale-110" : "scale-100"} transition-transform`}
              >
                {link.icon}
              </span>

              {/* النص يظهر فقط عندما يكون السيكشن نشط */}
              <div
                className={`overflow-hidden transition-all duration-500 flex items-center ${
                  isActive
                    ? "max-w-[100px] opacity-100 ml-1"
                    : "max-w-0 opacity-0"
                }`}
              >
                <span className="font-bold text-[12px] md:text-sm uppercase tracking-wider">
                  {link.label}
                </span>
              </div>
            </a>
          );
        })}

        {/* زر Contact منفصل لشكله المميز */}
      </div>
    </div>
  );
};

export default NavBottom;
