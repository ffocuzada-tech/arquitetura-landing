"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Secao from "@/components/ui/Secao";
import { gsap } from "@/lib/gsap";
import { useTextoSobe } from "@/hooks/useAnimacoesScroll";

function IconeTerreno() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-7 w-7 shrink-0 text-nevoa"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 22 L12 12 L17 17 L22 10 L28 22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 25 H28" strokeLinecap="round" />
    </svg>
  );
}

function IconeVidro() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-7 w-7 shrink-0 text-nevoa"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="20" height="20" />
      <path d="M16 6 V26 M6 16 H26" />
    </svg>
  );
}

function IconeMoldura() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-7 w-7 shrink-0 text-nevoa"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="20" height="20" />
      <path d="M11 17 L15 21 L22 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cores = {
  araucaria: "bg-araucaria",
  madeira: "bg-madeira",
  carvao: "bg-carvao",
} as const;

const itens: { icone: ReactNode; titulo: string; texto: string; cor: keyof typeof cores }[] = [
  {
    icone: <IconeTerreno />,
    titulo: "Projeto para terreno de serra",
    texto:
      "Desnível, sol da manhã, vento e neblina entram no desenho desde a primeira visita. A casa se encaixa no terreno, em vez de brigar com ele.",
    cor: "araucaria",
  },
  {
    icone: <IconeVidro />,
    titulo: "Madeira e vidro, com conforto no frio",
    texto:
      "Vidro duplo, madeira tratada e isolamento pensados para as noites frias da serra. Muita luz durante o dia, casa quente à noite.",
    cor: "madeira",
  },
  {
    icone: <IconeMoldura />,
    titulo: "Acompanhamos a obra até as chaves",
    texto:
      "Visitamos a obra com frequência e tiramos as dúvidas do construtor. O que foi desenhado é o que você recebe.",
    cor: "carvao",
  },
];

export default function PorQueNos() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  useTextoSobe(tituloRef);

  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(cardRefs.current, { y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: lista, start: "top 85%" },
      });
      tl.to(cardRefs.current, { y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <Secao id="por-que-nos" rotulo="03 · Por que nós">
      <div className="mt-6 flex flex-col gap-10 min-[900px]:grid min-[900px]:grid-cols-[5fr_1fr_6fr] min-[900px]:items-start min-[900px]:gap-0">
        <div className="min-[900px]:sticky min-[900px]:top-[120px]">
          <h2
            ref={tituloRef}
            className="font-titulo text-3xl font-light leading-tight text-carvao md:text-5xl"
          >
            Uma casa pensada para a serra, não adaptada a ela.
          </h2>
          <p className="mt-6 max-w-[42ch] font-texto text-base text-terra md:text-lg">
            Para quem já tem o terreno e quer ter certeza de que a casa vai
            funcionar ali.
          </p>
        </div>

        <ul
          ref={listaRef}
          className="flex list-none flex-col gap-4 p-0 min-[900px]:col-start-3"
        >
          {itens.map((item, i) => (
            <li
              key={item.titulo}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative isolate grid grid-cols-[auto_1fr] items-start gap-5 overflow-hidden rounded-[24px] border border-pedra/30 bg-linho p-[28px_24px] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] md:gap-6 md:p-[36px_36px_36px_32px] hover:-translate-x-1.5 hover:shadow-[0_24px_48px_-32px_rgba(33,26,18,.5)]"
            >
              <span
                aria-hidden="true"
                className={`absolute left-[52px] top-[56px] -z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[30] md:left-[60px] md:top-[64px] ${cores[item.cor]}`}
              />
              <span
                className={`grid h-14 w-14 place-items-center rounded-full ${cores[item.cor]}`}
              >
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.12]">
                  {item.icone}
                </span>
              </span>
              <div className="min-w-0 pt-1">
                <h3 className="font-titulo text-2xl leading-[1.2] font-normal text-carvao transition-colors duration-[400ms] group-hover:text-nevoa md:text-[28px]">
                  {item.titulo}
                </h3>
                <p className="mt-2.5 max-w-[46ch] font-texto text-base text-terra transition-colors duration-[400ms] group-hover:text-nevoa/88">
                  {item.texto}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
