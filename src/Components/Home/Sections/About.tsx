import { FaArrowRightLong } from "react-icons/fa6";
import AboutSecound from "../AboutParts/AboutSecound";
import Introduce from "../AboutParts/Introduce";
import Link from "next/link";
import AboutSocial from "../AboutParts/AboutSocial";
import Threads from "@/components/Outside/Threads";

export default function About() {
  return (
    <section
      id="about"
      className="bg-Blacky text-white py-20 px-4 md:px-20 relative flex flex-col justify-center items-center pt-23 lg:pt-28"
    >
      <h2
        className="text-5xl md:text-6xl absolute top-[64px] md:top-[55px] 
        lg:top-[73px]  text-center font-bold z-1 border-b-1 border-Whitey GlueSecound"
      >
        About <span className="strokePrime">Me</span>
      </h2>

        <>
      <Introduce />
      <AboutSecound />
      <Link
        href={`/AboutMe`}
        className="bg-Prime text-xl flex justify-center items-center p-1.5 px-2.5  rounded-full mt-3 border-2 border-Whitey gap-2.5 hover:bg-Whitey hover:text-Blacky hover:border-Secound transition-all duration-500 hover:scale-110"
      >
        Show More <FaArrowRightLong />
      </Link>
      <AboutSocial />
      <div className=" w-full h-[150px] lg:h-[220px] absolute top-[95%] sm:top-[92.5%] md:top-[93%] lg:top-[89%]">
        <Threads
          amplitude={1.5}
          distance={0.35}
          enableMouseInteraction={true}
          color={[1, 1, 1]}
        />
      </div>
    </>
 
    </section>
  );
}
