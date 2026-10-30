"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Secao from "@/components/ui/Secao";
import { gsap } from "@/lib/gsap";

type Cor = "araucaria" | "madeira" | "carvao";

const coresFundoMovel: Record<Cor, string> = {
  araucaria: "[html.movel_&]:bg-araucaria",
  madeira: "[html.movel_&]:bg-madeira",
  carvao: "[html.movel_&]:bg-carvao",
};

const itens: { tag: string; titulo: string; texto: string; foto: string; cor: Cor }[] = [
  {
    tag: "O terreno",
    titulo: "Projeto para terreno de serra",
    texto:
      "Desnível, sol da manhã, vento e neblina entram no desenho desde a primeira visita. A casa se encaixa no terreno, em vez de brigar com ele.",
    foto: "/images/detalhes/detalhe-pedra.webp",
    cor: "araucaria",
  },
  {
    tag: "O conforto",
    titulo: "Madeira e vidro, com conforto no frio",
    texto:
      "Vidro duplo, madeira tratada e isolamento pensados para as noites frias da serra. Muita luz durante o dia, casa quente à noite.",
    foto: "/images/detalhes/detalhe-vidro.webp",
    cor: "madeira",
  },
  {
    tag: "A obra",
    titulo: "Acompanhamos a obra até as chaves",
    texto:
      "Visitamos a obra com frequência e tiramos as dúvidas do construtor. O que foi desenhado é o que você recebe.",
    foto: "/images/detalhes/detalhe-obra.webp",
    cor: "carvao",
  },
];

export default function PorQueNos() {
  const listaRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const h3Refs = useRef<(HTMLHeadingElement | null)[]>([]);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const flutuaRef = useRef<HTMLDivElement>(null);
  const flutuaImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        todos: "all",
        desk: "(min-width: 900px)",
        reduz: "(prefers-reduced-motion: reduce)",
        fino: "(hover: hover) and (pointer: fine)",
      },
      (contexto) => {
        const { desk, reduz, fino } = contexto.conditions as {
          desk: boolean;
          reduz: boolean;
          fino: boolean;
        };
        const mov = !reduz;
        const pino = desk && mov;

        if (mov) {
          itemRefs.current.forEach((item, i) => {
            if (!item) return;
            const st = { trigger: item, start: "top 85%" };
            gsap.from(h3Refs.current[i], { yPercent: 105, duration: 1, ease: "power4.out", scrollTrigger: st });
            gsap.from([tagRefs.current[i], pRefs.current[i]], {
              y: 20,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: st,
            });
          });
        }

        if (pino && fino) {
          const flutua = flutuaRef.current;
          const imgs = flutuaImgRefs.current;
          if (flutua) {
            gsap.set(flutua, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
            const xTo = gsap.quickTo(flutua, "x", { duration: 0.7, ease: "power3" });
            const yTo = gsap.quickTo(flutua, "y", { duration: 0.7, ease: "power3" });

            function mover(e: PointerEvent) {
              xTo(e.clientX + 40);
              yTo(e.clientY);
            }
            function sair() {
              gsap.to(flutua, { autoAlpha: 0, scale: 0.6, duration: 0.35, ease: "power2.in" });
            }
            lista.addEventListener("pointermove", mover);
            lista.addEventListener("pointerleave", sair);

            const entradas = itemRefs.current.map((item, i) => {
              function entrar() {
                imgs.forEach((img, k) => img?.classList.toggle("opacity-100", k === i));
                gsap.to(flutua, {
                  autoAlpha: 1,
                  scale: 1,
                  rotate: gsap.utils.random(-5, 5),
                  duration: 0.5,
                  ease: "power3.out",
                });
              }
              item?.addEventListener("pointerenter", entrar);
              return [item, entrar] as const;
            });

            return () => {
              lista.removeEventListener("pointermove", mover);
              lista.removeEventListener("pointerleave", sair);
              entradas.forEach(([item, entrar]) => item?.removeEventListener("pointerenter", entrar));
            };
          }
        }

        if (!desk && mov) {
          itemRefs.current.forEach((item, i) => {
            if (i === itemRefs.current.length - 1 || !item) return;
            const proximo = itemRefs.current[i + 1];
            if (!proximo) return;
            gsap.to(item, {
              scale: 0.93,
              filter: "brightness(.86)",
              ease: "none",
              scrollTrigger: {
                trigger: proximo,
                start: "top 62%",
                end: `top ${84 + (i + 1) * 18}px`,
                scrub: true,
              },
            });
          });
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <Secao id="por-que-nos" rotulo="03 · Por que nós">
      <div className="mt-6 grid gap-6 min-[900px]:grid-cols-[7fr_4fr] min-[900px]:items-end min-[900px]:gap-16">
        <h2
          className="font-titulo font-light leading-[1.04] tracking-[-0.01em] text-carvao"
          style={{ fontSize: "clamp(34px, 4.4vw, 68px)" }}
        >
          Uma casa pensada para a serra, <em className="font-light italic text-madeira">não adaptada a ela.</em>
        </h2>
        <p className="max-w-[34ch] text-[17px] text-terra">
          Para quem já tem o terreno e quer ter certeza de que a casa vai funcionar ali.
        </p>
      </div>

      <ul ref={listaRef} className="mt-16 list-none p-0 min-[900px]:mt-[72px] [html.movel_&]:mt-10">
        {itens.map((item, i) => (
          <li
            key={item.titulo}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            style={{ "--i": i } as CSSProperties}
            className={`group grid gap-[18px] border-t border-[rgba(92,82,68,.35)] py-9 min-[900px]:grid-cols-[7fr_4fr] min-[900px]:items-center min-[900px]:gap-16 min-[900px]:py-12 ${
              i === itens.length - 1 ? "border-b" : ""
            } [html.movel_&]:sticky [html.movel_&]:top-[calc(84px+calc(var(--i)*18px))] [html.movel_&]:mb-7 [html.movel_&]:rounded-[26px] [html.movel_&]:border-0 [html.movel_&]:p-[22px_22px_26px] [html.movel_&]:shadow-[0_-16px_40px_-24px_rgba(33,26,18,.45)] ${coresFundoMovel[item.cor]}`}
          >
            <div>
              <span
                ref={(el) => {
                  tagRefs.current[i] = el;
                }}
                className="font-rotulo text-[11px] uppercase tracking-[.1em] text-madeira [html.movel_&]:text-nevoa/75"
              >
                {item.tag}
              </span>
              <div className="overflow-hidden">
                <h3
                  ref={(el) => {
                    h3Refs.current[i] = el;
                  }}
                  className="font-titulo leading-[1.04] tracking-[-0.01em] text-carvao transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] min-[900px]:group-hover:translate-x-7 min-[900px]:group-hover:text-madeira [html.movel_&]:text-[32px] [html.movel_&]:text-nevoa"
                  style={{ fontSize: "clamp(30px, 3.9vw, 60px)" }}
                >
                  {item.titulo}
                </h3>
              </div>
            </div>

            <div className="order-[-1] aspect-[16/10] overflow-hidden rounded-[18px] min-[900px]:order-none min-[900px]:hidden min-[900px]:aspect-[5/3]">
              <div className="relative h-full w-full">
                <Image src={item.foto} alt="" fill className="object-cover" />
              </div>
            </div>

            <p
              ref={(el) => {
                pRefs.current[i] = el;
              }}
              className="max-w-[40ch] text-base text-terra transition-colors duration-500 min-[900px]:group-hover:text-carvao [html.movel_&]:text-nevoa/86"
            >
              {item.texto}
            </p>
          </li>
        ))}
      </ul>

      <div
        ref={flutuaRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 invisible aspect-[5/3] w-[320px] overflow-hidden rounded-[18px] opacity-0 shadow-[0_30px_60px_-30px_rgba(33,26,18,.6)]"
      >
        {itens.map((item, i) => (
          <Image
            key={item.titulo}
            ref={(el) => {
              flutuaImgRefs.current[i] = el;
            }}
            src={item.foto}
            alt=""
            fill
            className="object-cover opacity-0 transition-opacity duration-350"
          />
        ))}
      </div>
    </Secao>
  );
}
