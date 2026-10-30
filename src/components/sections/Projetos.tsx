"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Secao from "@/components/ui/Secao";
import { useTextoSobe } from "@/hooks/useAnimacoesScroll";
import { MENSAGEM_AGENDAR_REUNIAO, linkWhatsapp } from "@/lib/contato";

type Projeto = {
  slug: string;
  nome: string;
  localCurto: string;
  foto: string;
  alt: string;
  objectPosition: string;
  descricao: string;
  etiquetas: string[];
};

const projetos: Projeto[] = [
  {
    slug: "casa-araucaria",
    nome: "Casa Araucária",
    localCurto: "Pedra Azul · 180 m²",
    foto: "/images/projetos/casa-araucaria.webp",
    alt: "Casa de madeira com fachada de vidro do chão ao telhado e base de pedra, entre araucárias, com a Pedra Azul ao fundo.",
    objectPosition: "42% 50%",
    descricao:
      "Dois pavimentos com fachada de vidro do chão ao telhado, de frente para a Pedra Azul. A base de pedra vence o desnível do terreno, e a sala vira mirante nas manhãs de neblina.",
    etiquetas: ["180 m²", "Domingos Martins · Pedra Azul", "2 pavimentos"],
  },
  {
    slug: "casa-do-vale",
    nome: "Casa do Vale",
    localCurto: "Venda Nova do Imigrante · 140 m²",
    foto: "/images/projetos/casa-do-vale.webp",
    alt: "Casa térrea e comprida de madeira e vidro, com varanda corrida, na borda de um vale com neblina ao entardecer.",
    objectPosition: "62% 50%",
    descricao:
      "Térrea e comprida, com varanda corrida na borda do vale. Feita para quem trabalha de casa: luz natural o dia inteiro e vidro duplo para as noites frias.",
    etiquetas: ["140 m²", "Venda Nova do Imigrante", "Térrea"],
  },
  {
    slug: "refugio-da-neblina",
    nome: "Refúgio da Neblina",
    localCurto: "Marechal Floriano · 95 m²",
    foto: "/images/projetos/refugio-da-neblina.webp",
    alt: "Casa pequena de madeira escura com varanda e janelas acesas, ao lado de uma horta, numa clareira com neblina.",
    objectPosition: "62% 50%",
    descricao:
      "Pequena e num andar só, do jeito que os moradores pediram: madeira escura, varanda para ver a chuva chegar e a horta a poucos passos da porta.",
    etiquetas: ["95 m²", "Marechal Floriano", "1 pavimento"],
  },
];

function CardProjeto({ projeto }: { projeto: Projeto }) {
  const [aberto, setAberto] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus();
      }
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <li
      data-aberto={aberto}
      className="group relative isolate grid aspect-[4/5] max-w-full cursor-pointer rounded-[24px] bg-crepusculo p-[10px] shadow-[0_24px_48px_-32px_rgba(33,26,18,.55)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] min-[760px]:aspect-[4/4.6] hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-34px_rgba(33,26,18,.6)] data-[aberto=true]:hover:translate-y-0"
    >
      <Image
        src={projeto.foto}
        alt={projeto.alt}
        fill
        style={{ objectPosition: projeto.objectPosition }}
        className="-z-20 object-cover transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105 group-data-[aberto=true]:scale-[1.08] group-data-[aberto=true]:saturate-[.85] group-data-[aberto=true]:brightness-90"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-100 transition-opacity duration-500 group-data-[aberto=true]:opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(28,23,36,0) 45%, rgba(28,23,36,.78) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 grid gap-1 p-[22px] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.6,1)] group-data-[aberto=true]:translate-y-2.5 group-data-[aberto=true]:opacity-0">
        <h3 className="font-titulo text-[26px] leading-[1.15] font-normal text-nevoa">
          {projeto.nome}
        </h3>
        <span className="font-rotulo text-[11px] tracking-[.08em] uppercase text-nevoa/85">
          {projeto.localCurto}
        </span>
      </div>

      <button
        ref={botaoRef}
        type="button"
        aria-expanded={aberto}
        aria-controls={`painel-${projeto.slug}`}
        aria-label={`${aberto ? "Fechar" : "Ver"} detalhes de ${projeto.nome}`}
        onClick={() => setAberto((valor) => !valor)}
        className="absolute inset-0 z-[3] cursor-pointer rounded-[24px] border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ambar"
      >
        <span
          aria-hidden="true"
          className="absolute top-5 right-5 grid h-10 w-10 scale-[.6] place-items-center rounded-full bg-carvao opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-data-[aberto=true]:scale-100 group-data-[aberto=true]:rotate-45 group-data-[aberto=true]:opacity-100 group-data-[aberto=true]:delay-[250ms]"
        >
          <span className="absolute h-[1.5px] w-3.5 rounded-full bg-nevoa" />
          <span className="absolute h-[1.5px] w-3.5 rotate-90 rounded-full bg-nevoa" />
        </span>
      </button>

      <div
        id={`painel-${projeto.slug}`}
        className="relative z-[2] grid translate-y-[calc(100%+14px)] content-start gap-3.5 self-end rounded-[14px] bg-nevoa p-[22px_22px_20px] opacity-0 transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.4,0,0.6,1)] [grid-area:1/1] group-data-[aberto=true]:translate-y-0 group-data-[aberto=true]:opacity-100 group-data-[aberto=true]:duration-[600ms] group-data-[aberto=true]:ease-[cubic-bezier(0.22,0.61,0.36,1)]"
      >
        <h3 className="pr-12 font-titulo text-[26px] leading-[1.15] font-normal text-carvao">
          {projeto.nome}
        </h3>
        <p className="text-[15px] leading-[1.55] text-terra">{projeto.descricao}</p>
        <ul className="flex flex-wrap gap-1.5">
          {projeto.etiquetas.map((etiqueta, i) => (
            <li
              key={etiqueta}
              className={
                i === 0
                  ? "rounded-full border border-araucaria bg-araucaria px-2.5 py-[5px] font-rotulo text-[11px] tracking-[.06em] uppercase text-nevoa"
                  : "rounded-full border border-araucaria/35 bg-linho/50 px-2.5 py-[5px] font-rotulo text-[11px] tracking-[.06em] uppercase text-araucaria"
              }
            >
              {etiqueta}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Projetos() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  useTextoSobe(tituloRef);

  return (
    <Secao id="projetos" fundo="linho" rotulo="02 · Projetos">
      <div className="mt-6 flex flex-wrap items-end justify-between gap-5 gap-x-8">
        <h2
          ref={tituloRef}
          className="max-w-[14ch] font-titulo text-3xl font-light leading-tight text-carvao md:text-5xl"
        >
          Casas que já nasceram na serra
        </h2>
        <a
          href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 border-b border-current pb-0.5 font-texto text-[15px] font-medium text-madeira hover:text-carvao md:inline"
        >
          Agendar reunião →
        </a>
      </div>

      <ul className="mt-12 grid list-none gap-5 p-0 min-[760px]:mt-16 min-[760px]:grid-cols-3 min-[760px]:gap-6">
        {projetos.map((projeto) => (
          <CardProjeto key={projeto.slug} projeto={projeto} />
        ))}
      </ul>

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
