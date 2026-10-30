"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useModo() {
  useEffect(() => {
    const raiz = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(
      {
        todos: "all",
        desk: "(min-width: 900px)",
        reduz: "(prefers-reduced-motion: reduce)",
      },
      (contexto) => {
        const { desk, reduz } = contexto.conditions as { desk: boolean; reduz: boolean };
        const mov = !reduz;
        const pino = desk && mov;

        raiz.classList.toggle("anima", mov);
        raiz.classList.toggle("pino", pino);
        raiz.classList.toggle("movel", !desk);

        return () => {
          raiz.classList.remove("anima", "pino", "movel");
        };
      },
    );

    function atualizar() {
      ScrollTrigger.refresh();
    }
    // duplo rAF: espera o commit de todos os ScrollTriggers com pin (D71) antes do primeiro refresh
    const quadro = requestAnimationFrame(() => requestAnimationFrame(atualizar));
    window.addEventListener("load", atualizar);
    document.fonts?.ready.then(atualizar);

    return () => {
      mm.revert();
      cancelAnimationFrame(quadro);
      window.removeEventListener("load", atualizar);
    };
  }, []);
}
