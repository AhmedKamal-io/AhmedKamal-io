import dynamic from "next/dynamic";
import HeroText from "../HeroParts/HeroText";

// تحميل RippleGrid بعد الصفحة مع شاشة انتظار
const RippleGrid = dynamic(() => import("../../Outside/RippleGrid"));
// import RippleGrid from "../../Outside/RippleGrid";
const Landing = () => {
  return (
    <div id="home" className="relative">
      <div className="absolute inset-0 z-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#4e26aa"
          rippleIntensity={0.015}
          gridSize={9}
          gridThickness={30}
          fadeDistance={1}
          glowIntensity={8}
          opacity={0.8}
          vignetteStrength={6}
          gridRotation={65}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center h-screen">
        <HeroText />
      </div>
    </div>
  );
};

export default Landing;
