// import dynamic from "next/dynamic";
import Landing from "@/components/Home/Sections/Landing";
import NavBar from "@/components/Home/Navigation/NavBar";
import NavBottom from "@/components/Home/Navigation/NavBottom";
import About from "@/components/Home/Sections/About";
// import SliderFreeLeft from "@/components/Home/Marquee/SliderFreeLeft";
import HomeBlog from "@/components/Home/Sections/HomeBlog";
import { Suspense } from "react";
import Loading from "./loading";
import { HomeBlogSkeleton } from "@/components/skeletons/home-blog";
import ShareButton from "@/components/QR-generator";
import Services from "@/components/Home/Sections/Services";
import Technology from "@/components/Home/Sections/Technology";
import Projects from "@/components/Home/Sections/Projects";
import Footer from "@/components/Home/Sections/Footer";
import Contact from "@/components/Home/Sections/Contact";
// import Testimonials from "@/Components/Home/Sections/Testimonials";
// const Services = dynamic(() => import("@/components/Home/Sections/Services"));
// const Technology = dynamic(
//   () => import("@/components/Home/Sections/Technology")
// );
// const SliderFreeRight = dynamic(
//   () => import("@/components/Home/Marquee/SliderFreeRight")
// );
// const Projects = dynamic(() => import("@/components/Home/Sections/Projects"));
// const Contact = dynamic(() => import("@/components/Home/Sections/Contact"));
// const Footer = dynamic(() => import("@/components/Home/Sections/Footer"));

//========================={Fetching all data Home Start}================================//

//========================={Fetching all data Home End}================================//

const page = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <NavBar />
        </div>
        <NavBottom />
        <Landing />
        {/* <SliderFreeLeft /> */}
        <About />
        <Services />
        <Technology />
        <Projects />
        {/* <Testimonials /> */}
        <Suspense fallback={<HomeBlogSkeleton />}>
          <HomeBlog />
        </Suspense>
        {/* <SliderFreeRight /> */}
        <Contact />
        <ShareButton />
        <Footer />
      </Suspense>
    </div>
  );
};

export default page;
