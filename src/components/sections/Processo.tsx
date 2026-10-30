"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Rotulo from "@/components/ui/Rotulo";
import DesenhoTerreno from "@/components/ui/desenhos/DesenhoTerreno";
import DesenhoPlanta from "@/components/ui/desenhos/DesenhoPlanta";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { vibrar } from "@/lib/vibrar";

const etapas = [
  {
    titulo: "Visita ao terreno",
    texto: "Vamos até o terreno entender o sol, o vento, o desnível e a vista.",
    chip: "Levantamento",
    marca: "Visita",
    figura: <DesenhoTerreno />,
  },
  {
    titulo: "Conceito",
    texto: "Primeiros croquis e uma conversa sobre como você quer viver na casa.",
    chip: "Croqui",
    marca: "Conceito",
    figura: (
      <Image
        src="/images/processo/etapa-croqui.webp"
        alt="Croqui a lápis da casa de madeira e vidro entre araucárias."
        fill
        className="object-cover"
      />
    ),
  },
  {
    titulo: "Projeto",
    texto: "Plantas, cortes e detalhes de madeira e vidro, prontos para aprovação na prefeitura.",
    chip: "Planta baixa",
    marca: "Projeto",
    figura: <DesenhoPlanta />,
  },
  {
    titulo: "Visualização 3D",
    texto: "Você percorre a casa antes de ela existir e ajusta o que quiser.",
    chip: "Maquete 3D",
    marca: "3D",
    figura: (
      <Image
        src="/images/processo/etapa-maquete.webp"
        alt="Maquete branca da casa, sem cores, no terreno."
        fill
        className="object-cover"
      />
    ),
  },
  {
    titulo: "Obra",
    texto: "Acompanhamos a construção de perto até a entrega das chaves.",
    chip: "Casa entregue",
    marca: "Obra",
    figura: (
      <Image
        src="/images/projetos/casa-araucaria.webp"
        alt="A casa pronta: madeira, fachada de vidro e base de pedra, com a Pedra Azul ao fundo."
        fill
        className="object-cover"
      />
    ),
  },
];

export default function Processo() {
  const secaoRef = useRef<HTMLElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const txtRefs = useRef<(HTMLDivElement | null)[]>([]);
  const figRefs = useRef<(HTMLDivElement | null)[]>([]);
  const figInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const marcaRefs = useRef<(HTMLLIElement | null)[]>([]);
  const marcaBarraRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const palcoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pontoRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;

    const mm = gsap.matchMedia();

    mm.add(
      { todos: "all", desk: "(min-width: 900px)", reduz: "(prefers-reduced-motion: reduce)" },
      (contexto) => {
        const { desk, reduz } = contexto.conditions as { desk: boolean; reduz: boolean };
        const mov = !reduz;
        const pino = desk && mov;

        if (pino) {
          const tp = gsap.timeline({
            scrollTrigger: {
              trigger: secao,
              start: "top top",
              end: "+=420%",
              pin: true,
              scrub: 1,
              onUpdate: (self) => {
                const t = self.animation ? self.animation.time() : 0;
                marcaRefs.current.forEach((marca, k) => {
                  const f = Math.max(0, Math.min(1, t - (k - 1) - 0.1));
                  gsap.set(marcaBarraRefs.current[k], { scaleX: k === 0 ? 1 : f });
                  if (marca) marca.dataset.on = String(k === 0 || t > k - 0.45);
                });
              },
            },
          });

          gsap.set(txtRefs.current.slice(1), { autoAlpha: 0 });

          for (let i = 1; i < etapas.length; i++) {
            const p = i - 1;
            tp.fromTo(
              figRefs.current[i],
              { clipPath: "inset(0% 100% 0% 0% round 24px)" },
              { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1, ease: "power2.inOut" },
              p,
            )
              .fromTo(figInnerRefs.current[i], { scale: 1.15 }, { scale: 1, duration: 1, ease: "power2.out" }, p)
              .to(txtRefs.current[i - 1], { autoAlpha: 0, y: -40, duration: 0.35, ease: "power2.in" }, p + 0.2)
              .fromTo(
                txtRefs.current[i],
                { autoAlpha: 0, y: 40 },
                { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
                p + 0.55,
              );
          }
          tp.to({}, { duration: 0.5 });
        }

        if (!desk && mov) {
          const palcoFigs = palcoRefs.current;
          const pontos = pontoRefs.current;
          const lis = liRefs.current;
          let atual = -1;

          function ativar(i: number) {
            if (i === atual) return;
            atual = i;
            palcoFigs.forEach((fig, k) => {
              if (fig) fig.dataset.on = String(k <= i);
            });
            pontos.forEach((ponto, k) => {
              if (ponto) ponto.dataset.on = String(k === i);
            });
            lis.forEach((li, k) => {
              if (li) li.dataset.ativa = String(k === i);
            });
            vibrar(8);
          }

          const triggers = etapas.map((_, i) => {
            const li = lis[i];
            return li
              ? ScrollTrigger.create({
                  trigger: li,
                  start: "top 72%",
                  end: "bottom 72%",
                  onToggle: (self) => {
                    if (self.isActive) ativar(i);
                  },
                })
              : null;
          });
          ativar(0);

          return () => {
            triggers.forEach((trigger) => trigger?.kill());
          };
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="processo"
      ref={secaoRef}
      className="relative px-5 py-[120px] md:px-12 [html.pino_&]:grid [html.pino_&]:h-[100svh] [html.pino_&]:grid-rows-[auto_1fr_auto] [html.pino_&]:gap-7 [html.pino_&]:py-24 [html.pino_&]:pb-8"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-4 min-[900px]:grid-cols-[auto_1fr] min-[900px]:items-end min-[900px]:gap-10">
        <div>
          <Rotulo className="text-terra">04 · Processo</Rotulo>
          <h2
            className="mt-4 font-titulo font-light leading-[1.05] tracking-[-0.01em] text-carvao"
            style={{ fontSize: "clamp(32px, 3.6vw, 56px)" }}
          >
            Do terreno à chave, <em className="font-light italic text-madeira">em cinco passos</em>
          </h2>
        </div>
        <p className="max-w-[30ch] text-base text-terra min-[900px]:justify-self-end">
          Você sabe desde o começo o que acontece em cada etapa.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="hidden [html.movel.anima_&]:mt-9 [html.movel.anima_&]:block [html.movel.anima_&]:sticky [html.movel.anima_&]:top-[76px] [html.movel.anima_&]:z-[2] [html.movel.anima_&]:h-[44svh] [html.movel.anima_&]:min-h-[260px] [html.movel.anima_&]:max-h-[420px] [html.movel.anima_&]:overflow-hidden [html.movel.anima_&]:rounded-[24px] [html.movel.anima_&]:bg-nevoa [html.movel.anima_&]:shadow-[0_30px_60px_-36px_rgba(33,26,18,.5)]"
      >
        {etapas.map((etapa, i) => (
          <div
            key={etapa.titulo}
            ref={(el) => {
              palcoRefs.current[i] = el;
            }}
            data-on={i === 0}
            className="absolute inset-0 [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] data-[on=true]:[clip-path:inset(0_0_0_0)]"
          >
            <div className="h-full w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full">{etapa.figura}</div>
          </div>
        ))}
        <div className="absolute top-4 right-3.5 flex gap-1.5">
          {etapas.map((etapa, i) => (
            <span
              key={etapa.titulo}
              ref={(el) => {
                pontoRefs.current[i] = el;
              }}
              data-on={i === 0}
              className="block h-1.5 w-1.5 rounded-full bg-nevoa/85 shadow-[0_0_0_1px_rgba(33,26,18,.15)] transition-[width,background-color] duration-400 data-[on=true]:w-5 data-[on=true]:bg-ambar"
            />
          ))}
        </div>
      </div>

      <ol className="relative mx-auto mt-14 grid w-full max-w-[1200px] list-none gap-14 p-0 [html.pino_&]:mt-0 [html.pino_&]:min-h-0">
        {etapas.map((etapa, i) => (
          <li
            key={etapa.titulo}
            ref={(el) => {
              liRefs.current[i] = el;
            }}
            data-ativa={i === 0}
            className="grid min-w-0 gap-[22px] min-[900px]:grid-cols-[4fr_7fr] min-[900px]:items-center min-[900px]:gap-14 [html.pino_&]:absolute [html.pino_&]:inset-0 [html.pino_&]:grid-cols-[4fr_7fr] [html.pino_&]:items-stretch [html.pino_&]:gap-14 [html.movel.anima_&]:min-h-[52svh] [html.movel.anima_&]:content-center [html.movel.anima_&]:opacity-[0.28] [html.movel.anima_&]:transition-opacity [html.movel.anima_&]:duration-500 [html.movel.anima_&]:data-[ativa=true]:opacity-100"
          >
            <div
              ref={(el) => {
                txtRefs.current[i] = el;
              }}
              className="grid content-center gap-3"
            >
              <span
                className="font-titulo font-light leading-[.85] tracking-[-0.03em] text-madeira tabular-nums"
                style={{ fontSize: "clamp(64px, 10vw, 168px)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-normal leading-[1.1] text-carvao" style={{ fontSize: "clamp(26px, 2.6vw, 40px)" }}>
                {etapa.titulo}
              </h3>
              <p className="max-w-[34ch] text-base text-terra">{etapa.texto}</p>
            </div>

            <div
              ref={(el) => {
                figRefs.current[i] = el;
              }}
              className="relative isolate aspect-[4/3] max-w-full overflow-hidden rounded-[24px] bg-nevoa shadow-[0_30px_60px_-40px_rgba(33,26,18,.45)] [html.pino_&]:aspect-auto [html.pino_&]:h-full [html.movel.anima_&]:hidden"
            >
              <span className="absolute top-4 left-4 z-[1] rounded-full bg-nevoa/90 px-3 py-[7px] font-rotulo text-[11px] uppercase tracking-[.1em] text-carvao backdrop-blur-[6px]">
                {etapa.chip}
              </span>
              <div
                ref={(el) => {
                  figInnerRefs.current[i] = el;
                }}
                className="absolute inset-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
              >
                {etapa.figura}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <ol
        aria-hidden="true"
        className="mx-auto hidden w-full max-w-[1200px] list-none grid-cols-5 gap-2 p-0 [html.pino_&]:grid"
      >
        {etapas.map((etapa, i) => (
          <li
            key={etapa.titulo}
            ref={(el) => {
              marcaRefs.current[i] = el;
            }}
            data-on={i === 0}
            className="grid gap-2.5 font-rotulo text-[11px] uppercase tracking-[.08em] text-pedra transition-colors duration-400 data-[on=true]:text-carvao"
          >
            <i className="relative block h-0.5 overflow-hidden rounded-full bg-[rgba(92,82,68,.2)]">
              <span
                ref={(el) => {
                  marcaBarraRefs.current[i] = el;
                }}
                className="absolute inset-0 origin-left scale-x-0 bg-madeira"
              />
            </i>
            {etapa.marca}
          </li>
        ))}
      </ol>
    </section>
  );
}
