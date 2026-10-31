"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Rotulo from "@/components/ui/Rotulo";
import { gsap } from "@/lib/gsap";
import { vibrar } from "@/lib/vibrar";

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

function IconeSeta({ direcao }: { direcao: "esquerda" | "direita" }) {
  const caminho = direcao === "esquerda" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19";
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d={caminho} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Depoimentos() {
  const [indiceExibido, setIndiceExibido] = useState(0);

  const blockquoteRef = useRef<HTMLQuoteElement>(null);
  const figcaptionRef = useRef<HTMLElement>(null);
  const pilhaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const brumaSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const topoRef = useRef<HTMLDivElement>(null);
  const secaoRef = useRef<HTMLElement>(null);

  const movRef = useRef(true);
  const indiceRef = useRef(0);
  const pilhaApiRef = useRef<{ ir: (i: number) => void } | null>(null);

  useEffect(() => {
    indiceRef.current = indiceExibido;
  }, [indiceExibido]);

  function mostrar(alvo: number) {
    const i = ((alvo % depoimentos.length) + depoimentos.length) % depoimentos.length;
    if (pilhaApiRef.current) {
      pilhaApiRef.current.ir(i);
      return;
    }
    if (i === indiceRef.current) return;
    if (!movRef.current) {
      setIndiceExibido(i);
      return;
    }
    const alvos = [blockquoteRef.current, figcaptionRef.current];
    gsap.to(alvos, {
      opacity: 0,
      y: -16,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIndiceExibido(i);
        requestAnimationFrame(() => {
          gsap.fromTo(alvos, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 });
        });
      },
    });
  }

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;

    const mm = gsap.matchMedia();

    mm.add(
      { todos: "all", desk: "(min-width: 900px)", reduz: "(prefers-reduced-motion: reduce)" },
      (contexto) => {
        const { desk, reduz } = contexto.conditions as { desk: boolean; reduz: boolean };
        const mov = !reduz;
        movRef.current = mov;

        if (mov) {
          gsap.to(brumaSpanRefs.current, {
            xPercent: (k) => (k % 2 ? -30 : 30),
            ease: "none",
            scrollTrigger: { trigger: secao, start: "top bottom", end: "bottom top", scrub: true },
          });
          gsap.from(Array.from(topoRef.current?.children ?? []), {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: secao, start: "top 60%" },
          });
        }

        if (!desk) {
          const pilha = pilhaRef.current;
          if (!pilha) return;

          const ordem = depoimentos.map((_, i) => i);

          function arrumar(anima: boolean) {
            ordem.forEach((idx, k) => {
              const valores = { x: 0, y: k * 14, scale: 1 - k * 0.05, rotate: 0, opacity: k > 2 ? 0 : 1, zIndex: 10 - k };
              const cartao = cardRefs.current[idx];
              if (!cartao) return;
              if (anima && mov) gsap.to(cartao, { duration: 0.5, ease: "power3.out", ...valores });
              else gsap.set(cartao, valores);
            });
            setIndiceExibido(ordem[0]);
          }

          function lancar(dir: number) {
            const topo = cardRefs.current[ordem[0]];
            vibrar(12);
            const fim = () => {
              ordem.push(ordem.shift() as number);
              if (topo) gsap.set(topo, { x: 0, rotate: 0, opacity: 0 });
              arrumar(true);
            };
            if (mov && topo) {
              gsap.to(topo, { x: dir * window.innerWidth * 1.1, rotate: dir * 16, duration: 0.4, ease: "power2.in", onComplete: fim });
            } else {
              fim();
            }
          }

          function voltar() {
            ordem.unshift(ordem.pop() as number);
            const cartao = cardRefs.current[ordem[0]];
            if (mov && cartao) gsap.set(cartao, { x: -window.innerWidth, rotate: -14, opacity: 1, zIndex: 11 });
            arrumar(true);
            vibrar(8);
          }

          pilhaApiRef.current = {
            ir: (i) => {
              if (i === ordem[1]) return lancar(-1);
              if (i === ordem[ordem.length - 1]) return voltar();
              while (ordem[0] !== i) ordem.push(ordem.shift() as number);
              arrumar(true);
            },
          };
          arrumar(false);

          let px: number | null = null;
          let py = 0;
          let dx = 0;
          let horiz = false;

          function aoPointerDown(e: PointerEvent) {
            const alvo = (e.target as HTMLElement).closest(".dp-card");
            if (!alvo || alvo !== cardRefs.current[ordem[0]]) return;
            px = e.clientX;
            py = e.clientY;
            dx = 0;
            horiz = false;
          }
          function aoPointerMove(e: PointerEvent) {
            if (px === null) return;
            dx = e.clientX - px;
            if (!horiz && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - py)) horiz = true;
            if (horiz) {
              const cartao = cardRefs.current[ordem[0]];
              if (cartao) gsap.set(cartao, { x: dx, rotate: dx * 0.05 });
            }
          }
          function soltar() {
            if (px === null) return;
            px = null;
            if (!horiz) return;
            if (Math.abs(dx) > 90) {
              lancar(dx > 0 ? 1 : -1);
            } else {
              const cartao = cardRefs.current[ordem[0]];
              if (cartao) gsap.to(cartao, { x: 0, rotate: 0, duration: 0.5, ease: "back.out(1.6)" });
            }
          }

          pilha.addEventListener("pointerdown", aoPointerDown);
          window.addEventListener("pointermove", aoPointerMove);
          window.addEventListener("pointerup", soltar);
          window.addEventListener("pointercancel", soltar);

          return () => {
            pilhaApiRef.current = null;
            pilha.removeEventListener("pointerdown", aoPointerDown);
            window.removeEventListener("pointermove", aoPointerMove);
            window.removeEventListener("pointerup", soltar);
            window.removeEventListener("pointercancel", soltar);
          };
        }
      },
    );

    return () => mm.revert();
  }, []);

  const atual = depoimentos[indiceExibido];

  return (
    <section
      id="depoimentos"
      ref={secaoRef}
      aria-labelledby="titulo-depoimentos"
      className="relative overflow-x-hidden px-5 pt-[200px] pb-[140px] text-nevoa md:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-10%] top-[-120px] h-[320px] opacity-55 blur-[30px] [html.movel_&]:opacity-[0.22]"
      >
        {[
          { left: "2%", top: "30%", width: "40%", height: "60%" },
          { left: "34%", top: "10%", width: "44%", height: "70%" },
          { left: "70%", top: "34%", width: "36%", height: "56%" },
        ].map((estilo, i) => (
          <span
            key={i}
            ref={(el) => {
              brumaSpanRefs.current[i] = el;
            }}
            className="absolute rounded-full bg-nevoa/50"
            style={estilo}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        <div ref={topoRef} className="flex flex-wrap items-end justify-between gap-5 gap-x-10">
          <div>
            <Rotulo className="text-ambar">05 · Depoimentos</Rotulo>
            <h2
              id="titulo-depoimentos"
              className="mt-5 font-titulo font-light leading-[1.04]"
              style={{ fontSize: "clamp(34px, 4.4vw, 68px)" }}
            >
              Quem já mora na serra
            </h2>
          </div>
          <p className="text-[17px] text-nevoa/70">Cinco casas, cinco terrenos diferentes.</p>
        </div>

        <div className="mt-[72px] hidden gap-16 min-[900px]:grid min-[900px]:grid-cols-[3fr_9fr] min-[900px]:items-start">
          <div aria-hidden="true" className="font-titulo leading-[.6] text-ambar" style={{ fontSize: "140px", height: "60px" }}>
            &ldquo;
          </div>
          <figure aria-live="polite">
            <blockquote
              ref={blockquoteRef}
              className="min-h-[4.9em] font-titulo leading-[1.22] font-light text-nevoa italic"
              style={{ fontSize: "clamp(26px, 3.3vw, 50px)" }}
            >
              {atual.texto}
            </blockquote>
            <figcaption ref={figcaptionRef} className="mt-9 flex items-center gap-4">
              <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full shadow-[0_0_0_2px_var(--color-crepusculo),0_0_0_4px_var(--color-ambar)]">
                <Image src={atual.foto} alt={atual.alt} fill className="object-cover" />
              </div>
              <div>
                <b className="block text-base font-medium">{atual.cliente}</b>
                <span className="mt-1 block font-rotulo text-xs tracking-[.08em] text-ambar uppercase">{atual.casaLocal}</span>
                <small className="mt-1 block font-rotulo text-xs text-nevoa/55">{atual.detalhe}</small>
              </div>
            </figcaption>
          </figure>
        </div>

        <div
          ref={pilhaRef}
          aria-hidden="true"
          className="relative mt-12 hidden h-[400px] [html.movel_&]:block"
        >
          {depoimentos.map((d, i) => (
            <figure
              key={d.cliente}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="dp-card absolute inset-0 flex touch-pan-y cursor-grab flex-col justify-between rounded-[26px] bg-nevoa p-[26px_24px] text-carvao shadow-[0_24px_50px_-24px_rgba(0,0,0,.6)] select-none will-change-transform"
            >
              <blockquote
                className="font-titulo text-[23px] leading-[1.32] font-light italic before:block before:h-[30px] before:text-[64px] before:leading-[.6] before:text-madeira before:content-['“']"
              >
                {d.texto}
              </blockquote>
              <figcaption className="flex items-center gap-3.5">
                <div className="pointer-events-none relative h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-[0_0_0_2px_var(--color-nevoa),0_0_0_4px_var(--color-ambar)]">
                  <Image src={d.foto} alt="" fill className="object-cover" />
                </div>
                <div>
                  <b className="block text-[15px] font-semibold">{d.cliente}</b>
                  <span className="mt-0.5 block font-rotulo text-[11px] tracking-[.06em] text-madeira uppercase">{d.casaLocal}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-[22px] hidden font-rotulo text-xs tracking-wide text-nevoa/55 uppercase [html.movel_&]:block">
          Arraste para o lado →
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-5 [html.movel_&]:mt-6">
          <ul className="flex list-none gap-2.5 p-0">
            {depoimentos.map((d, i) => (
              <li key={d.cliente}>
                <button
                  type="button"
                  onClick={() => mostrar(i)}
                  aria-current={indiceExibido === i}
                  aria-label={`Depoimento de ${d.cliente}`}
                  className="relative h-12 w-12 overflow-hidden rounded-full p-0 opacity-45 grayscale transition-[opacity,filter,transform,box-shadow] duration-400 hover:opacity-90 aria-[current=true]:scale-[1.08] aria-[current=true]:opacity-100 aria-[current=true]:shadow-[0_0_0_2px_var(--color-crepusculo),0_0_0_3px_var(--color-ambar)] aria-[current=true]:grayscale-0 [html.movel_&]:h-10 [html.movel_&]:w-10"
                >
                  <Image src={d.foto} alt="" fill className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
          <span className="font-rotulo text-xs tracking-[.1em] text-ambar tabular-nums">
            {String(indiceExibido + 1).padStart(2, "0")} / {String(depoimentos.length).padStart(2, "0")}
          </span>
          <div className="ml-auto flex gap-2.5">
            <button
              type="button"
              onClick={() => mostrar(indiceExibido - 1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-nevoa/30 text-nevoa transition-colors hover:bg-nevoa hover:text-crepusculo"
            >
              <span className="sr-only">Depoimento anterior</span>
              <IconeSeta direcao="esquerda" />
            </button>
            <button
              type="button"
              onClick={() => mostrar(indiceExibido + 1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-nevoa/30 text-nevoa transition-colors hover:bg-nevoa hover:text-crepusculo"
            >
              <span className="sr-only">Próximo depoimento</span>
              <IconeSeta direcao="direita" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
