"use client";
import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { ReactTyped } from "react-typed"; // المكتبة الجديدة

const Introduce = () => {
  return (
    <div className="bg-AssendFade backdrop-blur-[3px] rounded-lg border border-WhiteyFade w-[95%] p-4 my-1 shadow-SecoundFade shadow-xl flex flex-row flex-wrap sm:flex-nowrap justify-between items-center gap-4 z-10 mb-[20px]">
      {/* About Photo */}
      <div className="w-full sm:w-1/3 flex justify-center">
        <div className="relative w-[300px] sm:w-[500px] lg:w-[98%] aspect-square rounded-lg overflow-hidden shadow-lg shadow-WhiteyFade">
          <Image
            src="/image/Img1.webp"
            alt="Ahmed Image"
            fill
            priority
            className="object-cover optimize-gpu"
          />
        </div>
      </div>

      {/* About Text */}
      <div className="w-full sm:w-2/3">
        <div className="mt-4 flex flex-col justify-between items-baseline">
          <p className="leading-6 mb-4">
            I&apos;m Dr. Ahmed Kamal, a veterinarian from Cairo University in
            Egypt and a passionate Full Stack Web Developer. I combine
            scientific precision with modern web technologies to craft robust,
            scalable applications, with High SEO And Performance.
          </p>

          {/* Typing Effect Section */}
          <div className="text-[20px] font-semibold text-Secound my-5 w-full tracking-[1px]">
            <ReactTyped
              strings={[
                "Front-End Developer",
                "Back-End Developer",
                "Full Stack Developer",
                "N8N Automation Expert",
                "DevOps Enthusiast",
              ]}
              typeSpeed={100} // سرعة الكتابة
              backSpeed={50} // سرعة المسح
              backDelay={2000} // مدة الانتظار قبل المسح
              loop // تكرار الأنميشن
              cursorChar="_" // شكل المؤشر اللي اخترته
              showCursor={true}
            />
          </div>
        </div>

        {/* Social Links - كما هي */}
        <div className="flex items-center md:gap-7 gap-4 text-Whitey stroke-Whitey bg-BlackyFade rounded-full px-4 py-2 w-full justify-around sm:justify-center sm:w-fit Bigshadow shadow-SecoundFade shadow-lg text-[22px] sm:text-2xl">
          {/* الروابط الخاصة بك هنا... */}
          <SocialLink
            href="https://www.facebook.com/ahmed.kamsl.5"
            icon={<FaFacebook />}
            label="Facebook"
          />
          <SocialLink
            href="https://github.com/AhmedKamal-io"
            icon={<FaYoutube />}
            label="Youtube"
          />
          <SocialLink
            href="https://www.instagram.com/a7med_kamal_ak"
            icon={<FaInstagram />}
            label="Instagram"
          />
          <SocialLink
            href="https://www.linkedin.com/in/ahmed-kamal-63496837a/"
            icon={<FaLinkedin />}
            label="Linkedin"
          />
          <SocialLink
            href="https://x.com/AhmedKamal_io"
            icon={<FaXTwitter />}
            label="X"
          />
        </div>
      </div>
    </div>
  );
};

// مكون فرعي للروابط لتقليل تكرار الكود وزيادة السرعة
const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit my ${label} profile`}
    className="hover:text-Secound transition-all duration-500 outline-none hover:outline-3 hover:outline-Prime bg-AssendFade rounded-full p-1.5 border-2 border-PrimeFade flex items-center justify-center"
  >
    {icon}
  </a>
);

export default Introduce;
