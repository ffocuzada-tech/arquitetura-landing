"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Rotulo from "@/components/ui/Rotulo";
import { MENSAGEM_AGENDAR_REUNIAO, linkWhatsapp } from "@/lib/contato";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { vibrar } from "@/lib/vibrar";

type Casa = {
  slug: string;
  nomePrincipal: string;
  nomeItalico: string;
  local: string;
  foto: string;
  alt: string;
  area: string;
  descricao: string;
  etiquetas: [string, string];
};

const casas: Casa[] = [
  {
    slug: "casa-araucaria",
    nomePrincipal: "Casa",
    nomeItalico: "Araucária",
    local: "Domingos Martins · Pedra Azul",
    foto: "/images/projetos/casa-araucaria.webp",
    alt: "Casa de madeira com fachada de vidro do chão ao telhado e base de pedra, entre araucárias, com a Pedra Azul ao fundo.",
    area: "180",
    descricao:
      "Dois pavimentos com fachada de vidro do chão ao telhado, de frente para a Pedra Azul. A base de pedra vence o desnível do terreno, e a sala vira mirante nas manhãs de neblina.",
    etiquetas: ["2 pavimentos", "Base de pedra"],
  },
  {
    slug: "casa-do-vale",
    nomePrincipal: "Casa do",
    nomeItalico: "Vale",
    local: "Venda Nova do Imigrante",
    foto: "/images/projetos/casa-do-vale.webp",
    alt: "Casa térrea e comprida de madeira e vidro, com varanda corrida, na borda de um vale com neblina ao entardecer.",
    area: "140",
    descricao:
      "Térrea e comprida, com varanda corrida na borda do vale. Feita para quem trabalha de casa: luz natural o dia inteiro e vidro duplo para as noites frias.",
    etiquetas: ["Térrea", "Varanda corrida"],
  },
  {
    slug: "refugio-da-neblina",
    nomePrincipal: "Refúgio da",
    nomeItalico: "Neblina",
    local: "Marechal Floriano",
    foto: "/images/projetos/refugio-da-neblina.webp",
    alt: "Casa pequena de madeira escura com varanda e janelas acesas, ao lado de uma horta, numa clareira com neblina.",
    area: "95",
    descricao:
      "Pequena e num andar só, do jeito que os moradores pediram: madeira escura, varanda para ver a chuva chegar e a horta a poucos passos da porta.",
    etiquetas: ["1 pavimento", "Horta"],
  },
];

export default function Projetos() {
  const secaoRef = useRef<HTMLElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const casasElRef = useRef<HTMLDivElement>(null);
  const casaRefs = useRef<(HTMLElement | null)[]>([]);
  const fotoWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nomeRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const segRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contadorRef = useRef<HTMLSpanElement>(null);
  const linhaRef = useRef<HTMLSpanElement>(null);

  const semCliqueRef = useRef(false);
  const ultimoFocoRef = useRef<HTMLElement | null>(null);
  const movRef = useRef(true);
  const painelRef = useRef<HTMLDivElement>(null);
  const folhaXRef = useRef<HTMLButtonElement>(null);

  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);
  const [montada, setMontada] = useState(false);
  const [aberta, setAberta] = useState(false);

  function abrirFolha(indice: number) {
    ultimoFocoRef.current = document.activeElement as HTMLElement | null;
    setIndiceAberto(indice);
    setMontada(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setAberta(true)));
    document.documentElement.style.overflow = "hidden";
    vibrar(10);
  }

  function fecharFolha() {
    setAberta(false);
    document.documentElement.style.overflow = "";
    if (painelRef.current) painelRef.current.style.transform = "";
    const atraso = movRef.current ? 520 : 0;
    setTimeout(() => setMontada(false), atraso);
    ultimoFocoRef.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!aberta) return;
    const tempo = setTimeout(() => folhaXRef.current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(tempo);
  }, [aberta]);

  useEffect(() => {
    if (!montada) return;
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") fecharFolha();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [montada]);

  useEffect(() => {
    if (!painelRef.current || !montada) return;
    const painel = painelRef.current as HTMLDivElement;

    let y0: number | null = null;
    let dy = 0;

    function aoTocarInicio(e: TouchEvent) {
      if (painel.scrollTop > 0) {
        y0 = null;
        return;
      }
      y0 = e.touches[0].clientY;
      dy = 0;
    }
    function aoTocarMover(e: TouchEvent) {
      if (y0 === null) return;
      dy = Math.max(0, e.touches[0].clientY - y0);
      if (dy > 0) {
        painel.style.transition = "none";
        painel.style.transform = `translateY(${dy}px)`;
      }
    }
    function aoTocarFim() {
      if (y0 === null) return;
      painel.style.transition = "";
      if (dy > 110) fecharFolha();
      else painel.style.transform = "";
      y0 = null;
    }

    painel.addEventListener("touchstart", aoTocarInicio, { passive: true });
    painel.addEventListener("touchmove", aoTocarMover, { passive: true });
    painel.addEventListener("touchend", aoTocarFim);
    return () => {
      painel.removeEventListener("touchstart", aoTocarInicio);
      painel.removeEventListener("touchmove", aoTocarMover);
      painel.removeEventListener("touchend", aoTocarFim);
    };
  }, [montada]);

  useEffect(() => {
    const secao = secaoRef.current;
    const trilho = trilhoRef.current;
    const casasEl = casasElRef.current;
    if (!secao || !trilho || !casasEl) return;
    const casasElNaoNulo = casasEl as HTMLDivElement;

    const mm = gsap.matchMedia();

    mm.add(
      { todos: "all", desk: "(min-width: 900px)", reduz: "(prefers-reduced-motion: reduce)" },
      (contexto) => {
        const { desk, reduz } = contexto.conditions as { desk: boolean; reduz: boolean };
        const mov = !reduz;
        const pino = desk && mov;
        movRef.current = mov;

        if (pino) {
          const dist = () => trilho.scrollWidth - window.innerWidth;
          const tw = gsap.to(trilho, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: secao,
              start: "top top",
              end: () => "+=" + dist(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (linhaRef.current) gsap.set(linhaRef.current, { scaleX: self.progress });
              },
            },
          });

          casaRefs.current.forEach((casa, i) => {
            if (!casa) return;
            gsap.fromTo(
              fotoWrapRefs.current[i],
              { xPercent: -6 },
              {
                xPercent: 6,
                ease: "none",
                scrollTrigger: { trigger: casa, containerAnimation: tw, start: "left right", end: "right left", scrub: true },
              },
            );
            gsap.from(nomeRefs.current[i], {
              yPercent: 40,
              opacity: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: casa, containerAnimation: tw, start: "left 85%", end: "left 45%", scrub: true },
            });
            ScrollTrigger.create({
              trigger: casa,
              containerAnimation: tw,
              start: "left center",
              end: "right center",
              onToggle: (self) => {
                if (self.isActive && contadorRef.current) {
                  contadorRef.current.textContent = `0${i + 1} / 03`;
                }
              },
            });
          });
        }

        if (!desk) {
          const segs = segRefs.current;
          const casasArr = casaRefs.current;
          let segAtual = 0;

          function atualizarSegmentos() {
            const max = casasElNaoNulo.scrollWidth - casasElNaoNulo.clientWidth;
            const p = max > 0 ? (casasElNaoNulo.scrollLeft / max) * (casasArr.length - 1) : 0;
            segs.forEach((seg, i) => {
              seg?.style.setProperty("--f", String(Math.max(0, Math.min(1, p + 1 - i))));
            });
            const r = Math.round(p);
            if (r !== segAtual) {
              segAtual = r;
              vibrar(6);
            }
          }
          casasElNaoNulo.addEventListener("scroll", atualizarSegmentos, { passive: true });
          atualizarSegmentos();

          let arrastando: { x: number; s: number; moveu: boolean } | null = null;

          function aoPointerDown(e: PointerEvent) {
            if (e.pointerType !== "mouse") return;
            arrastando = { x: e.clientX, s: casasElNaoNulo.scrollLeft, moveu: false };
            casasElNaoNulo.style.scrollSnapType = "none";
          }
          function aoPointerMove(e: PointerEvent) {
            if (!arrastando) return;
            const d = e.clientX - arrastando.x;
            if (Math.abs(d) > 5) arrastando.moveu = true;
            casasElNaoNulo.scrollLeft = arrastando.s - d;
          }
          function aoPointerUp() {
            if (!arrastando) return;
            const moveu = arrastando.moveu;
            arrastando = null;
            let alvo: HTMLElement | null = null;
            let melhor = Infinity;
            const base = casasElNaoNulo.getBoundingClientRect().left;
            casasArr.forEach((casa) => {
              if (!casa) return;
              const d = Math.abs(casa.getBoundingClientRect().left - base - 20);
              if (d < melhor) {
                melhor = d;
                alvo = casa;
              }
            });
            const max = casasElNaoNulo.scrollWidth - casasElNaoNulo.clientWidth;
            if (alvo) {
              const alvoEl: HTMLElement = alvo;
              casasElNaoNulo.scrollTo({
                left: Math.min(max, casasElNaoNulo.scrollLeft + alvoEl.getBoundingClientRect().left - base - 20),
                behavior: mov ? "smooth" : "auto",
              });
            }
            setTimeout(() => {
              casasElNaoNulo.style.scrollSnapType = "";
            }, 450);
            if (moveu) {
              semCliqueRef.current = true;
              setTimeout(() => {
                semCliqueRef.current = false;
              }, 60);
            }
          }

          casasElNaoNulo.addEventListener("pointerdown", aoPointerDown);
          window.addEventListener("pointermove", aoPointerMove);
          window.addEventListener("pointerup", aoPointerUp);

          return () => {
            casasElNaoNulo.removeEventListener("scroll", atualizarSegmentos);
            casasElNaoNulo.removeEventListener("pointerdown", aoPointerDown);
            window.removeEventListener("pointermove", aoPointerMove);
            window.removeEventListener("pointerup", aoPointerUp);
          };
        }
      },
    );

    return () => mm.revert();
  }, []);

  const casaAberta = indiceAberto !== null ? casas[indiceAberto] : null;

  return (
    <>
      <section
        id="projetos"
        ref={secaoRef}
        aria-labelledby="titulo-projetos"
        className="relative py-[120px] pb-10 [html.movel_&]:pb-12 [html.pino_&]:flex [html.pino_&]:h-[100svh] [html.pino_&]:items-center [html.pino_&]:overflow-hidden [html.pino_&]:py-0"
      >
        <div
          ref={trilhoRef}
          className="grid gap-[72px] [html.pino_&]:flex [html.pino_&]:w-max [html.pino_&]:items-stretch [html.pino_&]:gap-[5vw] [html.pino_&]:pr-[10vw] [html.pino_&]:will-change-transform"
        >
          <div className="grid content-center gap-7 px-5 md:px-12 [html.movel_&]:gap-5 [html.pino_&]:w-[min(36vw,520px)] [html.pino_&]:px-0 [html:not(.pino)_&]:mx-auto [html:not(.pino)_&]:w-full [html:not(.pino)_&]:max-w-[1376px]">
            <Rotulo className="text-terra">02 · Projetos</Rotulo>
            <h2
              id="titulo-projetos"
              className="leading-[.98] tracking-[-0.015em] text-carvao"
              style={{ fontSize: "clamp(44px, 5.8vw, 96px)" }}
            >
              Casas que já nasceram <em className="italic text-madeira">na serra</em>
            </h2>
            <a
              href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-self-start border-b border-current pb-0.5 font-texto text-[15px] font-medium text-madeira hover:text-carvao"
            >
              Agendar reunião →
            </a>
            <span className="hidden items-center gap-3 font-rotulo text-xs uppercase tracking-wide text-terra [html.pino_&]:flex">
              <i aria-hidden="true" className="block h-px w-12 origin-left bg-terra [animation:dica_2.2s_ease-in-out_infinite]" />
              Continue rolando
            </span>
          </div>

          <div
            aria-hidden="true"
            className="hidden gap-1.5 px-5 pb-3.5 [html.movel_&]:mt-5 [html.movel_&]:flex md:px-12"
          >
            {casas.map((casa, i) => (
              <span
                key={casa.slug}
                ref={(el) => {
                  segRefs.current[i] = el;
                }}
                style={{ "--f": i === 0 ? 1 : 0 } as React.CSSProperties}
                className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-[rgba(92,82,68,.2)]"
              >
                <span
                  className="absolute inset-0 origin-left bg-carvao"
                  style={{ transform: "scaleX(var(--f,0))" }}
                />
              </span>
            ))}
          </div>

          <div
            ref={casasElRef}
            className="grid gap-[72px] [html.movel_&]:flex [html.movel_&]:cursor-grab [html.movel_&]:gap-3 [html.movel_&]:overflow-x-auto [html.movel_&]:overscroll-x-contain [html.movel_&]:[scrollbar-width:none] [html.movel_&]:snap-x [html.movel_&]:snap-mandatory [html.movel_&]:pl-5 [html.movel_&]:[scroll-padding-inline:20px] md:[html.movel_&]:pl-12 [html.pino_&]:contents"
          >
            {casas.map((casa, i) => (
              <article
                key={casa.slug}
                ref={(el) => {
                  casaRefs.current[i] = el;
                }}
                className={`grid min-w-0 gap-5 px-5 md:px-12 [html.movel_&]:w-[84%] [html.movel_&]:max-w-none [html.movel_&]:shrink-0 [html.movel_&]:gap-0 [html.movel_&]:px-0 ${
                  i === casas.length - 1 ? "[html.movel_&]:snap-end" : "[html.movel_&]:snap-start"
                } [html.pino_&]:mt-[70px] [html.pino_&]:h-[calc(100svh-190px)] [html.pino_&]:w-[min(62vw,1100px)] [html.pino_&]:grid-rows-[1fr_auto] [html.pino_&]:self-center [html.pino_&]:px-0 [html:not(.pino)_&]:mx-auto [html:not(.pino)_&]:w-full [html:not(.pino)_&]:max-w-[1376px]`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-crepusculo min-[600px]:aspect-[4/3] [html.movel_&]:aspect-auto [html.movel_&]:h-[60svh] [html.movel_&]:max-h-[640px] [html.movel_&]:min-h-[420px] [html.movel_&]:transition-transform [html.movel_&]:duration-300 [html.movel_&]:active:scale-[0.98] [html.pino_&]:aspect-auto [html.pino_&]:h-full [html.pino_&]:min-h-0">
                  <div
                    ref={(el) => {
                      fotoWrapRefs.current[i] = el;
                    }}
                    className="absolute inset-0 [html.pino_&]:-left-[8%] [html.pino_&]:w-[116%] [html.pino_&]:max-w-none"
                  >
                    <Image
                      src={casa.foto}
                      alt={casa.alt}
                      fill
                      sizes="(min-width: 900px) 62vw, 84vw"
                      className="object-cover select-none"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(28,23,36,0) 50%, rgba(28,23,36,.62))" }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      if (!semCliqueRef.current) abrirFolha(i);
                    }}
                    aria-label={`Ver detalhes de ${casa.nomePrincipal} ${casa.nomeItalico}`}
                    className="absolute inset-0 hidden rounded-[24px] border-0 bg-transparent p-0 [html.movel_&]:z-[2] [html.movel_&]:block"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 z-[1] hidden rounded-full bg-nevoa/90 px-3 py-2 font-rotulo text-[11px] uppercase tracking-[.08em] text-carvao backdrop-blur-[6px] [html.movel_&]:block"
                  >
                    Toque para ver +
                  </span>

                  <div className="absolute inset-x-6 bottom-[22px] z-[1] text-nevoa min-[900px]:inset-x-9 min-[900px]:bottom-[30px]">
                    <h3
                      ref={(el) => {
                        nomeRefs.current[i] = el;
                      }}
                      className="leading-[.95] tracking-[-0.015em]"
                      style={{ fontSize: "clamp(38px, 5.6vw, 100px)" }}
                    >
                      {casa.nomePrincipal} <em className="italic">{casa.nomeItalico}</em>
                    </h3>
                    <span className="mt-3 block font-rotulo text-[11px] uppercase tracking-[.1em] text-nevoa/85">
                      {casa.local}
                    </span>
                  </div>
                </div>

                <div className="grid gap-3.5 [html.movel_&]:hidden min-[900px]:grid-cols-[auto_1fr] min-[900px]:items-start min-[900px]:gap-x-10 min-[900px]:gap-y-3">
                  <span className="font-titulo text-[44px] leading-none font-light tabular-nums text-madeira">
                    {casa.area}
                    <small className="ml-[0.1em] text-[0.5em]">m²</small>
                  </span>
                  <div>
                    <p className="max-w-[58ch] text-base text-terra">{casa.descricao}</p>
                    <ul className="mt-2.5 flex list-none flex-wrap gap-1.5 p-0">
                      {casa.etiquetas.map((etiqueta) => (
                        <li
                          key={etiqueta}
                          className="rounded-full border border-araucaria/35 px-[11px] py-[5px] font-rotulo text-[11px] uppercase tracking-[.06em] text-araucaria"
                        >
                          {etiqueta}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
            <div aria-hidden="true" className="hidden [html.movel_&]:block [html.movel_&]:w-2 [html.movel_&]:shrink-0 md:[html.movel_&]:w-9" />
          </div>
        </div>

        <div className="absolute inset-x-5 bottom-7 hidden items-center gap-5 md:inset-x-12 [html.pino_&]:flex">
          <span ref={contadorRef} className="font-rotulo text-xs tracking-[.1em] text-carvao tabular-nums">
            01 / 03
          </span>
          <span className="relative h-px flex-1 bg-[rgba(92,82,68,.25)]">
            <span ref={linhaRef} className="absolute inset-0 origin-left scale-x-0 bg-carvao" />
          </span>
          <Rotulo className="text-terra">Pedra Azul → Marechal Floriano</Rotulo>
        </div>
      </section>

      <div hidden={!montada} className="fixed inset-0 z-[95]">
        <div
          onClick={fecharFolha}
          className={`absolute inset-0 bg-crepusculo/55 transition-opacity duration-450 ${aberta ? "opacity-100" : "opacity-0"}`}
        />
        <div
          ref={painelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="folha-titulo"
          className={`absolute inset-x-0 bottom-0 max-h-[92svh] overflow-y-auto overscroll-contain rounded-t-[28px] bg-nevoa pt-[22px] pb-6 text-carvao transition-transform duration-550 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            aberta ? "translate-y-0" : "translate-y-[105%]"
          }`}
        >
          <div aria-hidden="true" className="mx-auto mb-3.5 h-[5px] w-11 rounded-full bg-[rgba(92,82,68,.3)]" />
          <button
            ref={folhaXRef}
            type="button"
            onClick={fecharFolha}
            aria-label="Fechar detalhes"
            className="absolute top-3.5 right-3.5 grid h-11 w-11 place-items-center rounded-full bg-linho text-carvao"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {casaAberta && (
            <>
              <div className="mx-3 aspect-[4/3] overflow-hidden rounded-[20px]">
                <div className="relative h-full w-full">
                  <Image src={casaAberta.foto} alt={casaAberta.alt} fill className="object-cover" />
                </div>
              </div>
              <div className="grid gap-3 px-5 pt-[22px]">
                <Rotulo className="text-terra">{casaAberta.local}</Rotulo>
                <h3 id="folha-titulo" className="text-[38px] leading-none tracking-[-0.01em]">
                  {casaAberta.nomePrincipal} <em className="italic text-madeira">{casaAberta.nomeItalico}</em>
                </h3>
                <span className="font-titulo text-[44px] leading-none font-light tabular-nums text-madeira">
                  {casaAberta.area}
                  <small className="ml-[0.1em] text-[0.5em]">m²</small>
                </span>
                <p className="text-base text-terra">{casaAberta.descricao}</p>
                <ul className="flex list-none flex-wrap gap-1.5 p-0">
                  {casaAberta.etiquetas.map((etiqueta) => (
                    <li
                      key={etiqueta}
                      className="rounded-full border border-araucaria/35 px-[11px] py-[5px] font-rotulo text-[11px] uppercase tracking-[.06em] text-araucaria"
                    >
                      {etiqueta}
                    </li>
                  ))}
                </ul>
                <a
                  href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={fecharFolha}
                  className="mt-2.5 inline-flex items-center justify-center gap-2.5 rounded-full bg-ambar px-6 py-4 font-texto text-sm font-medium text-carvao"
                >
                  Agendar reunião <span aria-hidden="true">→</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
