import React from "react";
import CompanySlider from "../Marquee/CompanySlider1";
import CompanySlider2 from "../Marquee/CompanySlider2";
import CompanySlider3 from "../Marquee/CompanySlider3";
import CardsTech from "../TecnologyParts/CardsTech";

const Technology = () => {
  return (
    <section
      id="technologies"
      className="bg-BlueyFade  p-2 pt-12 pb-6 flex flex-col justify-center items-center"
    >
      <h2 className="text-3xl font-bold text-center py-4  bg-gradient-to-l from-Blacky via-Blacky to-Assend text-Whitey bg-clip-text sm:text-4xl sm:max-w-sm md:text-5xl md:max-w-lg mx-auto Bigshadow z-10">
        <span className="strokeSecound text-[110%]">Tech</span>nology &{" "}
        <span className="strokeSecound text-[110%]">Skills</span>
      </h2>
      <p className="text-center text-lg my-4 z-10">
        All Technologies i learned & use in projects
      </p>
      <div className="my-3 flex justify-center items-center flex-col">
        <p className="p-3">Big tech Companies using it right now!</p>
        <CompanySlider />
        <CompanySlider2 />
        <CompanySlider3 />
      </div>
      <CardsTech />
    </section>
  );
};

export default Technology;
