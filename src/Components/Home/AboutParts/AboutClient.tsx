"use client";

import dynamic from "next/dynamic";
import AboutSecound from "../AboutParts/AboutSecound";
import Introduce from "../AboutParts/Introduce";
import AboutSocial from "../AboutParts/AboutSocial";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

// dynamic import مع ssr:false للمكون الثقيل Threads
const Threads = dynamic(() => import("../../Outside/Threads"), { ssr: false });

export default function AboutClient() {
  return (
    <>
      <Introduce />
      <AboutSecound />
      <Link
        href={`/AboutMe`}
        className="bg-Prime text-xl flex justify-center items-center p-1.5 px-2.5  rounded-full mt-3 border-2 border-Whitey gap-2.5 hover:bg-Whitey hover:text-Blacky hover:border-Secound transition-all duration-500 hover:scale-110"
      >
        Show More <FaArrowRightLong />
      </Link>
      <AboutSocial />
      <div className=" w-full h-[150px] lg:h-[220px] absolute top-[95%] sm:top-[92.5%] md:top-[93%] lg:top-[89%]">
        <Threads
          amplitude={1.5}
          distance={0.35}
          enableMouseInteraction={true}
          color={[1, 1, 1]}
        />
      </div>
    </>
  );
}
