import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const platforms = [
  {
    src: "/image/Freelance/Freelancer.png",
    alt: "Freelancer",
    link: "https://www.freelancer.com/u/AhmedKamal5050",
  },
  { src: "/image/Freelance/Mustaqel.png", alt: "Mustaqel", link: "" },
  { src: "/image/Freelance/Khamsat.png", alt: "Khamsat", link: "" },
  {
    src: "/image/Freelance/Upwork.png",
    alt: "Upwork",
    link: "https://www.upwork.com/freelancers/~01fa8cb5afaf2d1ca5",
  },
  { src: "/image/Freelance/Toptal.png", alt: "Toptal", link: "" },
];

const Slider = () => {
  return (
    <div className="bg-Blacky my-2 Masked w-full">
      <Marquee
        direction="left"
        speed={20}
        pauseOnHover
        autoFill
        className="py-2"
      >
        {platforms.map((platform, index) => (
          <a href={platform.link} key={index} target="_blank">
            <Image
              src={platform.src}
              alt={platform.alt}
              width={120}
              height={120}
              priority
              className="mx-1 sm:mx-2 bg-Bluey px-2 py-1 GlueSecound rounded-2xl grayscale-100 transition-all shadow-Secound border-1 duration-700 hover:grayscale-0 hover:shadow-md Bigshadow mas w-[120px] h-auto"
            />
          </a>
        ))}
      </Marquee>
    </div>
  );
};

export default Slider;
