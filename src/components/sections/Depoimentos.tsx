"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Secao from "@/components/ui/Secao";
import Rotulo from "@/components/ui/Rotulo";
import { useTextoSobe } from "@/hooks/useAnimacoesScroll";

type Depoimento = {
  cliente: string;
  casaLocal: string;
  texto: string;
  detalhe: string;
  foto: string;
  alt: string;
};

const depoimentos: Depoimento[] = [
  {
    cliente: "Helena e Rafael Moraes",
    casaLocal: "Casa Araucária · Pedra Azul",
    texto:
      "Tínhamos o terreno havia cinco anos e não sabíamos por onde começar. Hoje a gente toma café vendo a neblina passar na frente da Pedra Azul.",
    detalhe: "Moram na casa desde 2023",
    foto: "/images/depoimentos/moraes.webp",
    alt: "Helena e Rafael Moraes na varanda de casa.",
  },
  {
    cliente: "Juliana Prates",
    casaLocal: "Casa do Vale · Venda Nova do Imigrante",
    texto:
      "Trabalho de casa e queria luz o dia inteiro sem passar frio à noite. Me explicaram cada escolha, e o vidro duplo fez toda a diferença.",
    detalhe: "Home office na serra desde 2024",
    foto: "/images/depoimentos/prates.webp",
    alt: "Juliana Prates na varanda de casa.",
  },
  {
    cliente: "Antônio e Cida Bertoldi",
    casaLocal: "Refúgio da Neblina · Marechal Floriano",
    texto:
      "Casa pequena, do jeito que a gente pediu: tudo num andar só, perto da horta, com uma varanda para ver a chuva chegar.",
    detalhe: "Aposentados · 95 m²",
    foto: "/images/depoimentos/bertoldi.webp",
    alt: "Antônio e Cida Bertoldi na varanda de casa.",
  },
  {
    cliente: "Família Zanotti",
    casaLocal: "Casa Bromélia · Domingos Martins",
    texto:
      "O terreno era todo em desnível e três construtores disseram que não dava. A casa ficou em cima do morro e as crianças vivem no gramado.",
    detalhe: "Projeto + Obra · 2022",
    foto: "/images/depoimentos/zanotti.webp",
    alt: "Casal Zanotti na varanda de casa.",
  },
  {
    cliente: "Marcos Lyra",
    casaLocal: "Casa do Mirante · Pedra Azul",
    texto:
      "Moro em Vitória e não podia ir à obra toda semana. Recebia fotos e relatório a cada visita. Quando peguei a chave, estava tudo como no 3D.",
    detalhe: "Casa de fim de semana · 2025",
    foto: "/images/depoimentos/lyra.webp",
    alt: "Marcos Lyra na varanda de casa.",
  },
];

function posicaoRelativa(cartao: HTMLElement, trilho: HTMLElement) {
  return cartao.getBoundingClientRect().left - trilho.getBoundingClientRect().left + trilho.scrollLeft;
}

function IconeSeta({ direcao }: { direcao: "esquerda" | "direita" }) {
  const caminho = direcao === "esquerda" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19";
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={caminho} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Depoimentos() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const fraseRef = useRef<HTMLParagraphElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const cartaoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indice, setIndice] = useState(0);
  const [barra, setBarra] = useState({ largura: 100, posicao: 0 });

  useTextoSobe(tituloRef);
  useTextoSobe(fraseRef);

  useLayoutEffect(() => {
    function ajustarLargura() {
      const trilho = trilhoRef.current;
      if (!trilho) return;
      const borda = trilho.getBoundingClientRect().left;
      trilho.style.width = `${window.innerWidth - borda}px`;
    }

    ajustarLargura();
    window.addEventListener("resize", ajustarLargura);
    return () => window.removeEventListener("resize", ajustarLargura);
  }, []);

  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;

    function atualizar() {
      if (!trilho) return;
      const maximo = trilho.scrollWidth - trilho.clientWidth;
      const progresso = maximo > 0 ? trilho.scrollLeft / maximo : 0;
      const largura = Math.max((trilho.clientWidth / trilho.scrollWidth) * 100, 8);
      setBarra({ largura, posicao: progresso * (100 - largura) });

      let maisProximo = 0;
      let menorDistancia = Infinity;
      cartaoRefs.current.forEach((cartao, i) => {
        if (!cartao) return;
        const distancia = Math.abs(posicaoRelativa(cartao, trilho) - trilho.scrollLeft);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          maisProximo = i;
        }
      });

      if (maximo > 0 && maximo - trilho.scrollLeft < 4) {
        maisProximo = depoimentos.length - 1;
      }

      setIndice(maisProximo);
    }

    atualizar();
    trilho.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      trilho.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  function irPara(i: number) {
    const trilho = trilhoRef.current;
    const cartao = cartaoRefs.current[i];
    if (!trilho || !cartao) return;
    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trilho.scrollTo({
      left: posicaoRelativa(cartao, trilho),
      behavior: movimentoReduzido ? "auto" : "smooth",
    });
  }

  return (
    <Secao id="depoimentos" fundo="crepusculo" rotulo="05 · Depoimentos">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2
            ref={tituloRef}
            className="font-titulo text-3xl font-light leading-tight md:text-5xl"
          >
            Quem já mora na serra
          </h2>
          <p ref={fraseRef} className="mt-6 font-texto text-base text-nevoa/70 md:text-lg">
            Cinco casas, cinco terrenos diferentes.
          </p>

          <div className="mt-10 hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => irPara(indice - 1)}
              disabled={indice === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-nevoa/30 text-nevoa transition-opacity disabled:opacity-30"
            >
              <span className="sr-only">Depoimento anterior</span>
              <IconeSeta direcao="esquerda" />
            </button>
            <button
              type="button"
              onClick={() => irPara(indice + 1)}
              disabled={indice === depoimentos.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-nevoa/30 text-nevoa transition-opacity disabled:opacity-30"
            >
              <span className="sr-only">Próximo depoimento</span>
              <IconeSeta direcao="direita" />
            </button>
            <Rotulo className="text-ambar">
              {String(indice + 1).padStart(2, "0")} / {String(depoimentos.length).padStart(2, "0")}
            </Rotulo>
          </div>
        </div>

        <div className="md:col-span-8">
          <div
            ref={trilhoRef}
            tabIndex={0}
            role="region"
            aria-label="Depoimentos de clientes"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {depoimentos.map((depoimento, i) => (
              <div
                key={depoimento.cliente}
                ref={(el) => {
                  cartaoRefs.current[i] = el;
                }}
                className="flex w-[82%] shrink-0 snap-start flex-col justify-between rounded-[6px] border border-nevoa/10 bg-nevoa/5 p-6 md:w-[380px] md:p-8"
              >
                <p className="font-titulo text-lg italic leading-relaxed text-nevoa md:text-xl">
                  {depoimento.texto}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-ambar">
                    <Image
                      src={depoimento.foto}
                      alt={depoimento.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-texto text-sm font-medium text-nevoa">
                      {depoimento.cliente}
                    </p>
                    <Rotulo className="mt-1 block text-ambar">{depoimento.casaLocal}</Rotulo>
                  </div>
                </div>
                <p className="mt-4 font-rotulo text-xs text-nevoa/50">{depoimento.detalhe}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 hidden h-px w-full bg-nevoa/15 md:block">
            <div
              className="h-px bg-ambar"
              style={{ width: `${barra.largura}%`, marginLeft: `${barra.posicao}%` }}
            />
          </div>

          <p className="mt-6 font-rotulo text-xs uppercase tracking-wide text-nevoa/50 md:hidden">
            Arraste para o lado →
          </p>
        </div>
      </div>
    </Secao>
  );
}
