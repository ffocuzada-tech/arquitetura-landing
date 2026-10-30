"use client";

import { useRef } from "react";
import Image from "next/image";
import Secao from "@/components/ui/Secao";
import Rotulo from "@/components/ui/Rotulo";
import { useImagemRecorte, useTextoSobe } from "@/hooks/useAnimacoesScroll";
import { MENSAGEM_AGENDAR_REUNIAO, linkWhatsapp } from "@/lib/contato";

const projetoDestaque = {
  nome: "Casa Araucária",
  local: "Domingos Martins · Pedra Azul · 180 m²",
  foto: "/images/projetos/casa-araucaria.webp",
  alt: "Casa de madeira com fachada de vidro do chão ao telhado e base de pedra, entre araucárias, com a Pedra Azul ao fundo.",
};

const outrosProjetos = [
  {
    nome: "Casa do Vale",
    local: "Venda Nova do Imigrante · 140 m²",
    foto: "/images/projetos/casa-do-vale.webp",
    alt: "Casa térrea e comprida de madeira e vidro, com varanda corrida, na borda de um vale com neblina ao entardecer.",
  },
  {
    nome: "Refúgio da Neblina",
    local: "Marechal Floriano · 95 m²",
    foto: "/images/projetos/refugio-da-neblina.webp",
    alt: "Casa pequena de madeira escura com varanda e janelas acesas, ao lado de uma horta, numa clareira com neblina.",
  },
];

type Projeto = { nome: string; local: string; foto: string; alt: string };

function FotoProjeto({ projeto }: { projeto: Projeto }) {
  const ref = useRef<HTMLDivElement>(null);
  useImagemRecorte(ref);

  return (
    <figure>
      <div ref={ref} className="relative aspect-[4/3] w-full">
        <Image src={projeto.foto} alt={projeto.alt} fill className="object-cover" />
      </div>
      <figcaption className="mt-4">
        <p className="font-titulo text-xl text-carvao">{projeto.nome}</p>
        <Rotulo className="mt-1 block text-terra">{projeto.local}</Rotulo>
      </figcaption>
    </figure>
  );
}

export default function Projetos() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  useTextoSobe(tituloRef);

  return (
    <Secao id="projetos" fundo="linho" rotulo="02 · Projetos">
      <div className="flex items-end justify-between gap-6">
        <h2
          ref={tituloRef}
          className="max-w-xl font-titulo text-3xl font-light leading-tight text-carvao md:text-5xl"
        >
          Casas que já nasceram na serra
        </h2>
        <a
          href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 font-texto text-sm font-medium text-madeira hover:underline md:inline"
        >
          Agendar reunião →
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
        <div className="md:col-span-7">
          <FotoProjeto projeto={projetoDestaque} />
        </div>
        <div className="flex flex-col gap-10 md:col-span-5">
          {outrosProjetos.map((projeto) => (
            <FotoProjeto key={projeto.nome} projeto={projeto} />
          ))}
        </div>
      </div>

      <a
        href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block font-texto text-sm font-medium text-madeira hover:underline md:hidden"
      >
        Agendar reunião →
      </a>
    </Secao>
  );
}
