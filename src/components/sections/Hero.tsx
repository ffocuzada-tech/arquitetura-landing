"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { MENSAGEM_AGENDAR_REUNIAO, linkWhatsapp } from "@/lib/contato";
import { gsap, SplitText } from "@/lib/gsap";

export default function Hero() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const subtituloRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const linhasTitulo = new SplitText(tituloRef.current, {
        type: "lines",
        linesClass: "overflow-hidden",
      });
      const linhasSubtitulo = new SplitText(subtituloRef.current, {
        type: "lines",
        linesClass: "overflow-hidden",
      });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(linhasTitulo.lines, {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      }).from(
        linhasSubtitulo.lines,
        { yPercent: 110, duration: 0.7, ease: "power3.out", stagger: 0.08 },
        "-=0.45",
      );

      return () => {
        linhasTitulo.revert();
        linhasSubtitulo.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex items-center overflow-hidden bg-carvao"
      style={{ minHeight: "max(100vh, 600px)" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover [object-position:74%_center] motion-reduce:hidden md:[object-position:50%_center]"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/hero-poster.webp"
        aria-hidden="true"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      <Image
        src="/images/hero/hero-poster.webp"
        alt=""
        fill
        priority
        className="hidden object-cover [object-position:74%_center] motion-reduce:block md:[object-position:50%_center]"
      />

      <div className="absolute inset-0 hidden bg-gradient-to-r from-nevoa via-nevoa/35 to-transparent md:block" />
      <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-carvao/50 to-transparent md:block" />
      <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-nevoa via-nevoa/55 to-transparent md:hidden" />

      <Container className="relative z-10 flex h-full flex-col justify-between py-28 md:justify-center md:py-0">
        <div className="max-w-xl">
          <h1
            ref={tituloRef}
            className="font-titulo text-4xl font-light leading-[1.1] text-carvao md:text-7xl"
          >
            A casa que a serra estava esperando.
          </h1>
          <p
            ref={subtituloRef}
            className="mt-6 max-w-md font-texto text-base text-carvao md:text-lg"
          >
            Projetamos casas de madeira e vidro para quem já tem um terreno na
            região de Pedra Azul e quer viver em meio à natureza.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[4px] bg-ambar px-6 py-3.5 font-texto text-sm font-medium text-carvao transition-colors hover:bg-ambar-escuro"
            >
              Agendar reunião
            </a>
            <a
              href="#projetos"
              className="font-texto text-sm font-medium text-carvao underline-offset-4 hover:underline"
            >
              Ver projetos →
            </a>
          </div>
        </div>

        <div className="font-rotulo text-xs uppercase tracking-wide text-carvao md:absolute md:bottom-10 md:left-0">
          Role para conhecer
        </div>
      </Container>
    </section>
  );
}
