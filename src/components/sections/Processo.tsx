"use client";

import { useEffect, useRef } from "react";
import Secao from "@/components/ui/Secao";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTextoSobe } from "@/hooks/useAnimacoesScroll";

const etapas = [
  {
    titulo: "Visita ao terreno",
    texto: "Vamos até o terreno entender o sol, o vento, o desnível e a vista.",
  },
  {
    titulo: "Conceito",
    texto: "Primeiros croquis e uma conversa sobre como você quer viver na casa.",
  },
  {
    titulo: "Projeto",
    texto:
      "Plantas, cortes e detalhes de madeira e vidro, prontos para aprovação na prefeitura.",
  },
  {
    titulo: "Visualização 3D",
    texto: "Você percorre a casa antes de ela existir e ajusta o que quiser.",
  },
  {
    titulo: "Obra",
    texto: "Acompanhamos a construção de perto até a entrega das chaves.",
  },
];

export default function Processo() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const linhaBaseRef = useRef<HTMLDivElement>(null);
  const linhaProgressoRef = useRef<HTMLDivElement>(null);
  const pontoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cartaoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numeroRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const etapaTituloRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useTextoSobe(tituloRef);

  useEffect(() => {
    const base = linhaBaseRef.current;
    const linha = linhaProgressoRef.current;
    if (!base || !linha) return;

    function ativar(indice: number, ativo: boolean) {
      const ponto = pontoRefs.current[indice];
      const cartao = cartaoRefs.current[indice];
      const numero = numeroRefs.current[indice];
      const titulo = etapaTituloRefs.current[indice];

      ponto?.classList.toggle("bg-ambar", ativo);
      ponto?.classList.toggle("border-ambar", ativo);
      ponto?.classList.toggle("bg-linho", !ativo);
      ponto?.classList.toggle("border-pedra", !ativo);

      cartao?.classList.toggle("border-dashed", !ativo);
      cartao?.classList.toggle("border-pedra", !ativo);
      cartao?.classList.toggle("border-solid", ativo);
      cartao?.classList.toggle("border-madeira/30", ativo);
      cartao?.classList.toggle("bg-nevoa", ativo);
      cartao?.classList.toggle("shadow-[0_14px_32px_-24px_rgba(33,26,18,.5)]", ativo);
      cartao?.classList.toggle("min-[900px]:-translate-y-1", ativo);

      numero?.classList.toggle("text-madeira", ativo);
      numero?.classList.toggle("text-terra", !ativo);

      titulo?.classList.toggle("text-carvao", ativo);
      titulo?.classList.toggle("text-terra", !ativo);
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(linha, { scaleX: 0, scaleY: 0 });
      etapas.forEach((_, indice) => ativar(indice, false));

      const trigger = ScrollTrigger.create({
        trigger: base,
        start: "top 65%",
        end: "bottom 55%",
        scrub: true,
        onUpdate(self) {
          gsap.set(linha, { scaleX: self.progress, scaleY: self.progress });
          etapas.forEach((_, indice) => {
            const limite = indice / etapas.length;
            ativar(indice, self.progress >= limite);
          });
        },
      });

      return () => trigger.kill();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(linha, { scaleX: 1, scaleY: 1 });
      etapas.forEach((_, indice) => ativar(indice, true));
    });

    return () => mm.revert();
  }, []);

  return (
    <Secao id="processo" rotulo="04 · Processo">
      <div className="max-w-xl">
        <h2
          ref={tituloRef}
          className="font-titulo text-3xl font-light leading-tight text-carvao md:text-5xl"
        >
          Do terreno à chave, em cinco passos
        </h2>
        <p className="mt-6 font-texto text-base text-terra md:text-lg">
          Você sabe desde o começo o que acontece em cada etapa.
        </p>
      </div>

      <div className="relative mt-16 pl-9 min-[900px]:mt-[88px] min-[900px]:pl-0">
        <div
          ref={linhaBaseRef}
          className="absolute left-[7px] top-0 bottom-0 w-0 border-l border-dashed border-pedra min-[900px]:left-0 min-[900px]:right-0 min-[900px]:top-[7px] min-[900px]:bottom-auto min-[900px]:h-0 min-[900px]:w-auto min-[900px]:border-l-0 min-[900px]:border-t"
        >
          <div
            ref={linhaProgressoRef}
            className="absolute -left-px top-0 h-full w-[2px] origin-top bg-ambar min-[900px]:left-0 min-[900px]:-top-px min-[900px]:h-[2px] min-[900px]:w-full min-[900px]:origin-left"
          />
        </div>

        <ol className="grid list-none gap-5 p-0 min-[900px]:grid-cols-5 min-[900px]:gap-4">
          {etapas.map((etapa, indice) => (
            <li key={etapa.titulo} className="relative min-w-0">
              <div
                ref={(el) => {
                  pontoRefs.current[indice] = el;
                }}
                className="absolute left-[-36px] top-[18px] h-[15px] w-[15px] rounded-full border border-pedra bg-linho transition-colors duration-[400ms] min-[900px]:left-0 min-[900px]:top-0"
              />
              <div
                ref={(el) => {
                  cartaoRefs.current[indice] = el;
                }}
                className="grid h-full content-start gap-2.5 rounded-[18px] border border-dashed border-pedra p-5 transition-[background-color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] min-[900px]:mt-9 min-[900px]:h-auto min-[900px]:min-h-[230px]"
              >
                <span
                  ref={(el) => {
                    numeroRefs.current[indice] = el;
                  }}
                  className="font-titulo text-[44px] leading-none font-light tabular-nums text-terra transition-colors duration-[400ms]"
                >
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <h3
                  ref={(el) => {
                    etapaTituloRefs.current[indice] = el;
                  }}
                  className="font-titulo text-xl font-normal text-terra transition-colors duration-[400ms]"
                >
                  {etapa.titulo}
                </h3>
                <p className="text-[15px] leading-[1.55] text-terra">{etapa.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Secao>
  );
}
