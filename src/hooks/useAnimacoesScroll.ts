"use client";

import { useEffect, type RefObject } from "react";
import { gsap, SplitText } from "@/lib/gsap";

export function useTextoSobe(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const linhas = new SplitText(elemento, {
        type: "lines",
        linesClass: "overflow-hidden",
      });

      gsap.from(linhas.lines, {
        yPercent: 110,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: elemento, start: "top 85%" },
      });

      return () => linhas.revert();
    });

    return () => mm.revert();
  }, [ref]);
}
