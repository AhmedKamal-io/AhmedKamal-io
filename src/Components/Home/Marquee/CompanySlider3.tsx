import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const company = [
  { src: "/image/Companies/Target.png", alt: "Target", bg: "bg-Whitey" },
  { src: "/image/Companies/Tesla.png", alt: "Tesla", bg: "bg-Blacky" },
  { src: "/image/Companies/Tiktok.png", alt: "Tiktok", bg: "bg-Whitey" },
  { src: "/image/Companies/Twitch.png", alt: "Twitch", bg: "bg-Blacky" },
  { src: "/image/Companies/Uber.png", alt: "Uber", bg: "bg-Whitey" },
  { src: "/image/Companies/Walmart.png", alt: "Walmart", bg: "bg-Blacky" },
  { src: "/image/Companies/Whatsapp.png", alt: "Whatsapp", bg: "bg-Blacky" },
  { src: "/image/Companies/Yahoo.png", alt: "Yahoo", bg: "bg-Blacky" },
];

const CompanySlider3 = () => {
  return (
    <div className="">
      <Marquee
        pauseOnHover
        speed={20}
        autoFill
        direction="left"
        className="Masked"
      >
        {company.map((company, index) => (
          <Image
            src={company.src}
            alt={company.alt}
            width={120}
            height={80}
            key={index}
            className={`grayscale-100 optimize-gpu hover:grayscale-0 transition-all duration-600 Bigshadow p-1 ${company.bg} rounded-2xl mx-1`}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default CompanySlider3;
