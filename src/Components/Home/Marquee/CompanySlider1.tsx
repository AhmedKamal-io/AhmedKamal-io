import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const companies = [
  { src: "/image/Companies/Amazon.png", alt: "Amazon", bg: "bg-AssendFade" },
  { src: "/image/Companies/BBC.png", alt: "BBC", bg: "bg-Blacky" },
  { src: "/image/Companies/Canva.png", alt: "Canva", bg: "bg-Blacky" },
  { src: "/image/Companies/Coursera.png", alt: "Coursera", bg: "bg-Blacky" },
  { src: "/image/Companies/Discord.png", alt: "Discord", bg: "bg-Blacky" },
  { src: "/image/Companies/Ebay.png", alt: "Ebay", bg: "bg-Blacky" },
  { src: "/image/Companies/Instegram.png", alt: "Instegram", bg: "bg-Blacky" },
  { src: "/image/Companies/Microsoft.png", alt: "Microsoft", bg: "bg-Blacky" },
];

const CompanySlider = () => {
  return (
    <div className="">
      <Marquee
        pauseOnHover
        speed={20}
        autoFill
        direction="left"
        className="Masked"
      >
        {companies.map((company, index) => (
          <Image
            key={index}
            src={company.src}
            alt={company.alt}
            width={120}
            height={80}
            loading="lazy"
            className={`grayscale-100 optimize-gpu  hover:grayscale-0 transition-all duration-600 Bigshadow p-1 ${company.bg} rounded-2xl mx-1`}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default CompanySlider;
