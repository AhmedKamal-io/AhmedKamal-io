"use client";
import React from "react";
import Image from "next/image";
import { cardsData } from "./cardsData";

const CardsSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {cardsData.map((card, index) => {
        const CardIcon = card.icon;
        return (
          <div
            key={index}
            className="relative w-[320px] h-[480px] rounded-2xl border-2 border-Whitey overflow-hidden transform hover:scale-105 duration-500 Bigshadow Clip-modern"
          >
            {/* الخلفية */}
            <Image
              src="/Image/dark-background1.png"
              alt="Background"
              fill
              className="object-cover z-0"
              // quality={100}
              loading="lazy"
            />

            {/* المحتوى */}
            <div className="relative z-10 p-6 h-full w-full text-white">
              <h3 className="text-2xl border-b-2 border-Whitey my-[20px] flex justify-center items-center gap-1">
                {card.title} <CardIcon />
              </h3>

              <ul className="flex flex-col gap-1.5 text-2xl font-light">
                {card.items.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <li
                      key={idx}
                      className="flex items-center gap-2 bg-BlackyFade p-1 rounded-lg hover:bg-Blacky transition-all duration-500 my-1 hover:shadow-lg"
                      style={{ boxShadow: `0 0 10px 0 ${item.color}70` }}
                    >
                      <span
                        className="transition-all duration-500 bg-Blacky p-3 rounded-full transform hover:scale-110 text-4xl flex justify-center items-center"
                        style={{ color: item.color }}
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        ) : (
                          ItemIcon && <ItemIcon />
                        )}
                      </span>
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardsSection;
