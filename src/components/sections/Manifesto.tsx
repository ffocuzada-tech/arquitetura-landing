"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";
import { gsap } from "@/lib/gsap";

const paragrafos = [
  "Queríamos transformar nosso lar num lugar de paz: silêncio, luz natural e a mata por perto. Foi desenhando essa casa que entendemos o que mais importa nela, o espaço livre entre as coisas, por onde passam a luz, o ar e a paisagem.",
  "Daí vem o nosso nome. Hoje levamos esse mesmo cuidado para quem tem um pedaço de serra e quer viver nele com conforto e segurança.",
];

const numeros = [
  { valor: "12", sufixo: "anos", legenda: "projetando na serra" },
  { valor: "38", sufixo: "casas", legenda: "entregues" },
  { valor: "100", sufixo: "%", legenda: "das obras acompanhadas por nós" },
];

export default function Manifesto() {
  const textoRef = useRef<HTMLDivElement>(null);
  const expandeRef = useRef<HTMLDivElement>(null);
  const imgFundoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const veuRef = useRef<HTMLDivElement>(null);
  const numerosRef = useRef<HTMLDivElement>(null);
  const espEsqRef = useRef<HTMLSpanElement>(null);
  const espDirRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textoEl = textoRef.current;
    const expandeEl = expandeRef.current;
    if (!textoEl || !expandeEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        todos: "all",
        desk: "(min-width: 900px)",
        reduz: "(prefers-reduced-motion: reduce)",
      },
      (contexto) => {
        const { desk, reduz } = contexto.conditions as { desk: boolean; reduz: boolean };
        const mov = !reduz;
        const pino = desk && mov;
        if (!mov) return;

        const palavras = textoEl.querySelectorAll<HTMLElement>(".palavra");
        gsap.set(palavras, { opacity: 0.13 });
        gsap.to(palavras, {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: pino
            ? { trigger: textoEl, start: "top top", end: "+=130%", pin: true, scrub: true }
            : { trigger: textoEl, start: "top 80%", end: "bottom 45%", scrub: true },
        });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: expandeEl, start: "top top", end: "+=150%", pin: true, scrub: 1 },
        });
        tl.fromTo(
          imgFundoRef.current,
          {
            clipPath: desk
              ? "inset(25% 37% 25% 37% round 22px)"
              : "inset(24% 16% 30% 16% round 20px)",
          },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power1.inOut", duration: 1 },
          0,
        )
          .fromTo(imgRef.current, { scale: 1.3 }, { scale: 1, ease: "power1.inOut", duration: 1 }, 0)
          .fromTo(veuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.75)
          .fromTo(
            numerosRef.current ? Array.from(numerosRef.current.children) : [],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.08 },
            0.85,
          )
          .to({}, { duration: 0.25 });

        if (pino) {
          tl.fromTo(
            espEsqRef.current,
            { x: 0, opacity: 1 },
            { x: "-22vw", opacity: 0, ease: "power1.in", duration: 0.6 },
            0,
          ).fromTo(
            espDirRef.current,
            { x: 0, opacity: 1 },
            { x: "22vw", opacity: 0, ease: "power1.in", duration: 0.6 },
            0,
          );
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="manifesto" aria-labelledby="titulo-manifesto">
      <div
        ref={textoRef}
        className="py-28 min-[900px]:py-20 [html.pino_&]:flex [html.pino_&]:min-h-[100svh] [html.pino_&]:flex-col [html.pino_&]:justify-center [html.pino_&]:py-24"
      >
        <Container>
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
            <Rotulo className="text-terra">01 · Manifesto</Rotulo>
            <h2
              id="titulo-manifesto"
              className="font-titulo font-normal italic text-madeira"
              style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
            >
              O vazio é onde a vida acontece.
            </h2>
          </div>

          <div
            className="mt-8 grid max-w-[30em] gap-[0.7em] font-titulo font-light text-carvao"
            style={{ fontSize: "clamp(25px, min(3.05vw, 4.9vh), 46px)", lineHeight: 1.28 }}
          >
            {paragrafos.map((paragrafo, i) => (
              <p key={i}>
                {paragrafo.split(" ").map((palavra, j, arr) => (
                  <span key={j} className="palavra">
                    {palavra}
                    {j < arr.length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </Container>
      </div>

      <div ref={expandeRef} className="relative h-[100svh] min-h-[560px]">
        <div ref={imgFundoRef} className="absolute inset-0 overflow-hidden">
          <div ref={imgRef} className="relative h-full w-full">
            <Image
              src="/images/geral/manifesto-interior.webp"
              alt="Sala de uma casa de madeira com parede de vidro do chão ao teto, uma poltrona e uma mesa baixa com café, de frente para as araucárias e a Pedra Azul."
              fill
              className="object-cover [object-position:50%_60%]"
            />
          </div>
        </div>

        <span
          ref={espEsqRef}
          aria-hidden="true"
          className="absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap font-titulo font-light italic text-carvao [html.pino_&]:block"
          style={{ fontSize: "clamp(40px, 5.2vw, 84px)", right: "calc(63% + 2.4vw)" }}
        >
          o espaço
        </span>
        <span
          ref={espDirRef}
          aria-hidden="true"
          className="absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap font-titulo font-light italic text-carvao [html.pino_&]:block"
          style={{ fontSize: "clamp(40px, 5.2vw, 84px)", left: "calc(63% + 2.4vw)" }}
        >
          livre
        </span>

        <div
          ref={veuRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{ background: "linear-gradient(180deg, rgba(28,23,36,0) 45%, rgba(28,23,36,.72))" }}
        />

        <div
          ref={numerosRef}
          className="absolute inset-x-0 bottom-0 grid grid-cols-3 items-start gap-4 px-5 pb-10 md:px-12 md:pb-14"
        >
          {numeros.map((numero) => (
            <div key={numero.legenda} className="grid min-w-0 content-start gap-2">
              <span aria-hidden="true" className="block h-0.5 w-7 rounded-full bg-ambar" />
              <span
                className="font-titulo font-light leading-none tabular-nums text-nevoa"
                style={{ fontSize: "clamp(34px, 5vw, 76px)" }}
              >
                {numero.valor}
                <small className="ml-[0.15em] text-[0.45em] italic">{numero.sufixo}</small>
              </span>
              <span className="text-[13px] leading-snug text-nevoa/82 md:text-[15px]">
                {numero.legenda}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
