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
  const etapaTituloRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useTextoSobe(tituloRef);

  useEffect(() => {
    const base = linhaBaseRef.current;
    const linha = linhaProgressoRef.current;
    if (!base || !linha) return;

    function ativar(indice: number, ativo: boolean) {
      const ponto = pontoRefs.current[indice];
      const titulo = etapaTituloRefs.current[indice];
      ponto?.classList.toggle("bg-ambar", ativo);
      ponto?.classList.toggle("bg-pedra", !ativo);
      titulo?.classList.toggle("text-carvao", ativo);
      titulo?.classList.toggle("text-terra", !ativo);
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(linha, { scaleX: 0, scaleY: 0, transformOrigin: "top left" });
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
    <Secao id="processo" fundo="linho" rotulo="04 · Processo">
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

      <div className="relative mt-16 pl-8 md:mt-24 md:pl-0">
        <div
          ref={linhaBaseRef}
          className="absolute left-[3px] top-1 bottom-1 w-px bg-pedra/40 md:left-0 md:right-0 md:top-1 md:bottom-auto md:h-px md:w-auto"
        >
          <div ref={linhaProgressoRef} className="absolute inset-0 bg-ambar" />
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:gap-6">
          {etapas.map((etapa, indice) => (
            <div key={etapa.titulo} className="relative flex-1 md:pt-8">
              <div
                ref={(el) => {
                  pontoRefs.current[indice] = el;
                }}
                className="absolute -left-8 top-1 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-pedra md:-left-0 md:left-0 md:top-0"
              />
              <h3
                ref={(el) => {
                  etapaTituloRefs.current[indice] = el;
                }}
                className="font-titulo text-lg text-terra"
              >
                {etapa.titulo}
              </h3>
              <p className="mt-2 font-texto text-sm text-terra">{etapa.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </Secao>
  );
}
