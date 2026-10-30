"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Ceu() {
  const ceuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ceu = ceuRef.current;
    if (!ceu) return;

    const mm = gsap.matchMedia();

    mm.add({ todos: "all" }, () => {
      let corAtual = "#F4EEE6";
      gsap.set(ceu, { backgroundColor: corAtual });

      function ceuPara(gatilho: string, cor: string, inicio: string, fim: string) {
        gsap.fromTo(
          ceu,
          { backgroundColor: corAtual },
          {
            backgroundColor: cor,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: gatilho, start: inicio, end: fim, scrub: true },
          },
        );
        corAtual = cor;
      }

      ceuPara("#projetos", "#E8DED0", "top 90%", "top 30%");
      ceuPara("#processo", "#EAD6BC", "top 80%", "top 20%");
      ceuPara("#depoimentos", "#1C1724", "top 85%", "top 25%");
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <div ref={ceuRef} aria-hidden="true" className="fixed inset-0 -z-20 bg-nevoa" />
      <div aria-hidden="true" className="grao pointer-events-none fixed inset-0 z-[80] opacity-[0.07]" />
    </>
  );
}
