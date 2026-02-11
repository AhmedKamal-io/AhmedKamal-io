"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // مهم جداً تربطيهم ببعض

type LenisContextType = Lenis | null;
const LenisContext = createContext<LenisContextType>(null);

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. تعريف Lenis
    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.04,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: true,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // 2. مزامنة GSAP مع Lenis (الحل السحري للتعليق)
    // بنخلي GSAP هي اللي تدير التوقيت بدلاً من requestAnimationFrame اليدوية
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    // منع GSAP من القفز عند حدوث lag بسيط
    gsap.ticker.lagSmoothing(0);

    // ربط ScrollTrigger بـ Lenis عشان الأنميشن ما يقطعش
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 3. ميزة تعطيل الـ Hover أثناء السكرول
    let scrollTimeout: NodeJS.Timeout;
    const onScroll = () => {
      if (!document.body.classList.contains("is-scrolling")) {
        document.body.classList.add("is-scrolling");
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 150);
    };

    lenis.on("scroll", onScroll);

    // 4. التنظيف (Cleanup)
    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      clearTimeout(scrollTimeout);
    };
  }, []);

  // ملاحظة: بما أن lenisRef.current بيتغير بعد أول ريندر، الـ useMemo كدة صح
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => lenisRef.current, [lenisRef.current]);

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
};

export const useLenis = () => useContext(LenisContext);
