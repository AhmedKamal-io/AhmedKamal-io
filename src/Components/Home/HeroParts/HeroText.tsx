"use client";

import React from "react";
import { useTranslations } from "next-intl";

const HeroText = () => {
  // const t = useTranslations("HeroText");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-Whitey mb-4 Bigshadow max-w-2xl">
        Hello I'm
        <span className="text-Whitey strokeSecound text-[52px] md:text-[65px] font-bold">
          Ahmed Kamal
        </span>
      </h1>
      <p className="text-md md:text-xl text-Whitey max-w-md Bigshadow my-3 mx-2 font-semibold">
        Full Stack Web Developer turns your dream into a money machine.
      </p>
    </div>
  );
};

export default HeroText;
