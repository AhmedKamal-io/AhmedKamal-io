import React from "react";

import NavLinks from "./NavLinks";
import Image from "next/image";
// import LanguageToggle from "@/Components/LanguageToggle";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full lg:w-[80%] z-[2000] flex justify-between items-center px-6 py-[12px] md:px-[35px] lg:mt-3.5 border-WhiteyFade border-b-2 lg:rounded-4xl lg:bg-AssendFade shadow-Prime shadow-md backdrop-blur-[5px] Bigshadow lg:border-1 lg:outline-3 lg:outline-SecoundFade">
      {/* Logo Icon */}
      <div>
        <a href="#home">
          <Image
            src="/image/personal-logo-png.png"
            alt="Logo Of Ahmed Kamal"
            width={50}
            height={50}
            className="focus:outline-none"
          />
        </a>
      </div>
      {/* Nav Links */}
      <NavLinks />

      {/* download cv botton */}
      {/* <LanguageToggle /> */}
    </nav>
  );
};

export default NavBar;
