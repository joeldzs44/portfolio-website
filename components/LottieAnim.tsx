'use client'

import { useRef, useEffect, useState } from "react";
import heroAnim from "@/app/assets/hero-anim.json";

export default function HeroAnim() {
  const container = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let anim: any;
    if (isMounted && container.current) {
      import('lottie-web').then((lottie) => {
        const current = container.current;
        if (current) {
          anim = lottie.default.loadAnimation({
            container: current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: heroAnim,
          });
        }
      });
    }
    return () => anim?.destroy();
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="top-0 right-0" ref={container}></div>
  );
}