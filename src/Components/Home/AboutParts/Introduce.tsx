import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
const TextType = dynamic(() => import("../../Outside/TextType"));

const Introduce = () => {
  return (
    <div className="bg-AssendFade backdrop-blur-[3px] rounded-lg border border-WhiteyFade w-[95%] p-4 my-1  shadow-SecoundFade shadow-xl flex flex-row flex-wrap sm:flex-nowrap justify-between items-center gap-4 z-10 mb-[20px]">
      {/* About Photo */}
      <div className="w-full sm:w-1/3  flex justify-center ">
        <div className="relative w-[300px] sm:w-[500px] lg:w-[98%] aspect-square rounded-lg overflow-hidden shadow-lg shadow-WhiteyFade">
          <Image
            src="/image/Img1.webp"
            alt="Ahmed Image"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
      {/* About Text */}
      <div className="w-full  sm:w-2/3  ">
        <div className="mt-4 flex flex-col justify-between items-baseline">
          <p className=" leading-6 mb-4">
            I&apos;m Dr. Ahmed Kamal, a veterinarian from Cairo University in
            Egypt and a passionate Full Stack Web Developer. I combine
            scientific precision with modern web technologies to craft robust,
            scalable applications , with High SEO And Performance.
          </p>
          <div className="text-[20px] font-semibold text-Secound my-5 w-full tracking-[3px]">
            <TextType
              text={[
                "Front - End Develober ",
                "Back - End Develober ",
                "Full Stack Develober ",
              ]}
              typingSpeed={200}
              deletingSpeed={50}
              pauseDuration={2500}
              cursorBlinkDuration={0.7}
              showCursor={true}
              cursorCharacter="_"
              variableSpeed={{ min: 30, max: 200 }}
              startOnVisible={true}
              textColors={["#7405d4"]}
            />
          </div>
        </div>
        <div className="flex  items-center md:gap-7 gap-4 text-Whitey stroke-Whitey bg-BlackyFade rounded-full px-4 py-2 w-full justify-around sm:justify-center sm:w-fit Bigshadow shadow-SecoundFade  shadow-lg text-[22px] sm:text-2xl ">
          <a
            href="https://www.facebook.com/ahmed.kamsl.5"
            target="_blank"
            aria-label="Visit my Facebook profile"
            className="hover:text-Secound transition-all duration-500 outline-none hover:outline-3 hover:outline-Prime bg-AssendFade rounded-full p-1.5 border-2 border-PrimeFade "
          >
            <FaFacebook />
          </a>
          <a
            href="https://github.com/AhmedKamal-io"
            target="_blank"
            aria-label="Visit my Youtube Channel"
            className="hover:text-Secound transition-all duration-500 outline-none hover:outline-3 hover:outline-Prime bg-AssendFade rounded-full p-1.5 border-2 border-PrimeFade "
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/a7med_kamal_ak"
            target="_blank"
            aria-label="Visit instagram profile"
            className="hover:text-Secound transition-all duration-500 outline-none hover:outline-3 hover:outline-Prime bg-AssendFade rounded-full p-1.5 border-2 border-PrimeFade "
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-kamal-63496837a/"
            target="_blank"
            aria-label="Visit my Linkedin profile"
            className="hover:text-Secound transition-all duration-500 outline-none hover:outline-3 hover:outline-Prime bg-AssendFade rounded-full p-1.5 border-2 border-PrimeFade "
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/AhmedKamal_io"
            target="_blank"
            aria-label="Visit my X Twitter profile"
            className="hover:text-Secound transition-all duration-500 outline-none hover:outline-3 hover:outline-Prime bg-AssendFade rounded-full p-1.5 border-2 border-PrimeFade "
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
