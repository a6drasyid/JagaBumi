import Lenis from "lenis";
import { useEffect } from "react";

let lenis = null;

// Fungsi yang bisa dipanggil dari Hero, Navbar, dll.
export function getLenis() {
  return lenis;
}

export default function useLenis() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenis = null;
    };
  }, []);
}
