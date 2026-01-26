import React from "react";
import Image from "next/image";

const AboutSecound = () => {
  return (
    <div className="bg-AssendFade backdrop-blur-[3px] rounded-lg border border-WhiteyFade w-[95%] p-4 my-1   shadow-SecoundFade shadow-xl flex flex-row flex-wrap sm:flex-nowrap justify-between items-center gap-4 z-10 mb-[10px]">
      <div className="sm:hidden relative w-full sm:w-1/3  flex justify-center">
        <div className="relative w-[300px] sm:w-[500px] lg:w-[98%] aspect-square rounded-lg overflow-hidden shadow-lg shadow-WhiteyFade">
          <Image src="/image/Img2.webp" alt="Profile photo" fill priority />
        </div>
      </div>
      <div className="w-full  sm:w-2/3 mt-4">
        <p className="text-md leading-6 mb-4">
          I mainly build with
          <span className="text-Secound font-semibold bg-BlackyFade p-0.5 rounded-2xl">
            Next.js
          </span>
          due to its performance and flexibility, but I also utilize the
          <span className="p-0.5 rounded-2xl text-Secound font-semibold bg-BlackyFade">
            MERN stack
          </span>
          when projects require it.
        </p>
        <p className="text-md leading-6 mb-6">
          I enjoy transforming ideas into powerful web experiences, always
          striving to deliver clean, efficient, and user-focused solutions.
        </p>
        <p className="mb-2.5">
          You can call me :
          <span className="text-[125%] text-Secound p-0.5 rounded-2xl font-bold bg-BlackyFade">
            Dr.Error
          </span>
        </p>
        <a
          href="#projects"
          className="inline-block bg-AssendFade outline-2 border-1 border-Secound outline-Prime text-Whitey font-semibold px-6 py-2.5 rounded-xl hover:bg-Secound transition duration-500 hover:text-Blacky hover:shadow-xl shadow-SecoundFade shadow-lg ml-[20px] text-center"
        >
          View My Work
        </a>
      </div>
      <div className="hidden relative w-full sm:w-1/3  sm:flex justify-center">
        <div className="hidden  relative w-[300px] sm:w-[500px] lg:w-[98%] aspect-square rounded-lg overflow-hidden shadow-lg shadow-WhiteyFade sm:flex">
          <Image src="/image/Img2.webp" alt="Profile photo" fill priority />
        </div>
      </div>
    </div>
  );
};

export default AboutSecound;
