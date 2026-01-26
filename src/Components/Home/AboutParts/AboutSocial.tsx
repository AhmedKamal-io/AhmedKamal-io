
import dynamic from "next/dynamic";
import React from "react";
import { FaInstagram, FaUserPlus, FaFacebook, FaYoutube } from "react-icons/fa";

const DotGrid = dynamic(() => import("../../Outside/DotGrid"), { ssr: true });

const AboutSocial = () => {
  return (
    <div className="bg-PrimeFade w-[95%] rounded-3xl text-white py-5 px-4 md:px-20 relative flex flex-col justify-center items-center z-0 overflow-hidden Bigshadow my-4">
      <div className="absolute z-10 w-[100%]">
        {/* Background Dot Grid */}
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <DotGrid
            dotSize={10}
            gap={12}
            baseColor="#27004e"
            activeColor="#4e26aa"
            proximity={120}
            speedTrigger={80}
            shockRadius={200}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      </div>
      <div className="z-20">
        <h2 className="text-3xl font-bold text-center py-4 text-Whitey sm:text-4xl sm:max-w-sm md:text-5xl md:max-w-lg mx-auto GlueSecound relative">
          Social Media
        </h2>
        {/* Social cards */}
        <div className="flex justify-center items-center flex-wrap gap-4">
          {/* FaceBook Card */}
          <div className="flex justify-center items-center mt-4 w-fit flex-col p-4 bg-BlackyFade rounded-2xl border-3  border-Whitey hover:transform hover:scale-110 duration-700 transition-all mx-1.5 lg:mx-9">
            <h3 className="text-2xl my">Facebook</h3>
            <a
              href="https://www.facebook.com/ahmed.kamsl.5"
              target="_blank"
              aria-label="Visit my Facebook profile"
              className="text-5xl border-2 border-Blacky text-white mx-2  duration-700 shadow-lg shadow-WhiteyFade bg-Prime rounded-full flex justify-center items-center p-3 hover:scale-110 transform transition-all hover:shadow-2xl hover:shadow-Secound hover:bg-Whitey hover:text-Prime Bigshadow my-1 lg:my-4 "
            >
              <FaFacebook />
            </a>
            <h4 className="flex justify-center items-center text-lg mt-4 font-light">
              Add me
              <span className="text-xl ml-2 text-Whitey">
                <a
                  href="https://www.facebook.com/ahmed.kamsl.5"
                  target="_blank"
                  aria-label="Visit my Facebook profile"
                >
                  <FaUserPlus />
                </a>
              </span>
            </h4>
          </div>
          <div className="flex justify-center items-center mt-4 w-fit flex-col p-4 bg-BlackyFade rounded-2xl border-3  border-Whitey hover:transform hover:scale-110 duration-700 transition-all mx-9">
            <h3 className="text-2xl">Instegram</h3>
            <a
              href="https://www.instagram.com/a7med_kamal_ak"
              target="_blank"
              aria-label="Follow me on Instagram"
              className="text-5xl border-2 border-Blacky text-white mx-2  duration-700 shadow-lg shadow-WhiteyFade bg-Prime rounded-full flex justify-center items-center p-3 hover:scale-110 transform transition-all hover:shadow-2xl hover:shadow-Secound hover:bg-Whitey hover:text-Prime Bigshadow my-1 lg:my-4 "
            >
              <FaInstagram />
            </a>
            <h4 className="flex justify-center items-center text-lg mt-4 font-light">
              Follow Me
              <span className="text-xl ml-2 text-Whitey">
                <a
                  href="https://www.instagram.com/a7med_kamal_ak"
                  target="_blank"
                  aria-label="Follow me on Instagram"
                >
                  <FaUserPlus />
                </a>
              </span>
            </h4>
          </div>
          <div className="flex justify-center items-center mt-4 w-fit flex-col p-4 bg-BlackyFade rounded-2xl border-3  border-Whitey hover:transform hover:scale-110 duration-700 transition-all mx-9">
            <h3 className="text-2xl">Youtube</h3>
            <a
              aria-label="Visit my Youtube Channel"
              href="https://x.com/AhmedKamal_io"
              target="_blank"
              className="text-5xl border-2 border-Blacky text-white mx-2  duration-700 shadow-lg shadow-WhiteyFade bg-Prime rounded-full flex justify-center items-center p-3 hover:scale-110 transform transition-all hover:shadow-2xl hover:shadow-Secound hover:bg-Whitey hover:text-Prime Bigshadow my-1 lg:my-4 "
            >
              <FaYoutube />
            </a>
            <h4 className="flex justify-center items-center text-lg mt-4 font-light">
              Subscribe
              <span className="text-xl ml-2 text-Whitey">
                <a
                  href="https://x.com/AhmedKamal_io"
                  target="_blank"
                  aria-label="Visit my Youtube Channel"
                >
                  <FaUserPlus />
                </a>
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSocial;
