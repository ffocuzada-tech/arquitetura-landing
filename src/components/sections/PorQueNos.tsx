"use client";

import { useRef, type ReactNode } from "react";
import Secao from "@/components/ui/Secao";
import { useTextoSobe } from "@/hooks/useAnimacoesScroll";

function IconeTerreno() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-7 w-7 shrink-0 text-araucaria"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
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
      className="h-7 w-7 shrink-0 text-araucaria"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
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
      className="h-7 w-7 shrink-0 text-araucaria"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="20" height="20" />
      <path d="M11 17 L15 21 L22 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const itens: { icone: ReactNode; titulo: string; texto: string }[] = [
  {
    icone: <IconeTerreno />,
    titulo: "Projeto para terreno de serra",
    texto:
      "Desnível, sol da manhã, vento e neblina entram no desenho desde a primeira visita. A casa se encaixa no terreno, em vez de brigar com ele.",
  },
  {
    icone: <IconeVidro />,
    titulo: "Madeira e vidro, com conforto no frio",
    texto:
      "Vidro duplo, madeira tratada e isolamento pensados para as noites frias da serra. Muita luz durante o dia, casa quente à noite.",
  },
  {
    icone: <IconeMoldura />,
    titulo: "Acompanhamos a obra até as chaves",
    texto:
      "Visitamos a obra com frequência e tiramos as dúvidas do construtor. O que foi desenhado é o que você recebe.",
  },
];

export default function PorQueNos() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  useTextoSobe(tituloRef);

  return (
    <Secao id="por-que-nos" fundo="nevoa" rotulo="03 · Por que nós">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2
            ref={tituloRef}
            className="font-titulo text-3xl font-light leading-tight text-carvao md:text-5xl"
          >
            Uma casa pensada para a serra, não adaptada a ela.
          </h2>
          <p className="mt-6 font-texto text-base text-terra md:text-lg">
            Para quem já tem o terreno e quer ter certeza de que a casa vai
            funcionar ali.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="flex flex-col divide-y divide-pedra/40">
            {itens.map((item) => (
              <div key={item.titulo} className="flex gap-5 py-8 first:pt-0 md:py-10">
                {item.icone}
                <div>
                  <h3 className="font-titulo text-xl text-carvao md:text-2xl">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 font-texto text-base text-terra">{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Secao>
  );
}
