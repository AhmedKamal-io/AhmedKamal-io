import React from "react";
import {
  MdDesignServices,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import Grid from "../ServicesParts/Grid";

const Services = () => {
  return (
    <section className="p-2 lg:p-16 bg-AssendFade pt-14" id="services">
      <div className="min-h-screen w-full bg-AssendFade relative flex flex-col justify-center items-center text-Whitey ">
        {/* Purple Gradient Grid Left Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #f5f0ff70 0.5px, transparent 1px),
        linear-gradient(to bottom, #f5f0ff70 0.5px, transparent 1px),
        radial-gradient(circle 800px at 0% 200px, #050505, transparent)
      `,
            backgroundSize: "96px 64px, 96px 64px, 100% 100%",
          }}
        />
        {/* Your Content/Components */}
        <h2 className=" strokePrime text-5xl my-6 border-b-Whitey border-b-2 flex justify-center items-center gap-3 z-20">
          <MdDesignServices /> Services <MdOutlineMiscellaneousServices />
        </h2>
        <p className="text-center z-20">
          i provied large amount of scalabliety and reailablty
        </p>
        <Grid />
      </div>
    </section>
  );
};

export default Services;
