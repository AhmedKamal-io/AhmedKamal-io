import dynamic from "next/dynamic";
import Landing from "../../Components/Home/Sections/Landing";
import NavBar from "@/Components/Home/Navigation/NavBar";
import NavBottom from "@/Components/Home/Navigation/NavBottom";
import About from "@/Components/Home/Sections/About";
import SliderFreeLeft from "@/Components/Home/Marquee/SliderFreeLeft";
import HomeBlog from "@/Components/Home/Sections/HomeBlog";
import { Suspense } from "react";
import Loading from "../loading";
import { HomeBlogSkeleton } from "@/Components/Skeletons/home-blog";
// import Testimonials from "@/Components/Home/Sections/Testimonials";
const Services = dynamic(() => import("@/Components/Home/Sections/Services"));
const Technology = dynamic(
  () => import("@/Components/Home/Sections/Technology"),
);
const SliderFreeRight = dynamic(
  () => import("@/Components/Home/Marquee/SliderFreeRight"),
);
const Projects = dynamic(() => import("@/Components/Home/Sections/Projects"));
const Contact = dynamic(() => import("@/Components/Home/Sections/Contact"));
const Footer = dynamic(() => import("@/Components/Home/Sections/Footer"));

//========================={Fetching all data Home Start}================================//

//========================={Fetching all data Home End}================================//

const page = () => {
  return (
    <div>
      {/* المكونات دي تظهر فوراً وتفضل ثابتة */}
      <NavBar />
      <NavBottom />
      <Landing />
      <SliderFreeLeft />
      <About />

      {/* المكونات التقيلة اللي تحت هي اللي تدخل في Suspense */}
      <Suspense fallback={<Loading />}>
        <Services />
        <Technology />
        <Projects />
        <Suspense fallback={<HomeBlogSkeleton />}>
          <HomeBlog />
        </Suspense>
        <SliderFreeRight />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default page;
