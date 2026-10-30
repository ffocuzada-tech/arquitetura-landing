"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { MENSAGEM_AGENDAR_REUNIAO, linkWhatsapp } from "@/lib/contato";
import { gsap } from "@/lib/gsap";

function inscreverMovimentoReduzido(callback: () => void) {
  const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
  consulta.addEventListener("change", callback);
  return () => consulta.removeEventListener("change", callback);
}

function lerMovimentoPermitido() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function lerMovimentoPermitidoServidor() {
  return false;
}

const titulo = "A casa que a serra estava esperando.";
const palavrasTitulo = titulo.split(" ");
const ultimaPalavra = palavrasTitulo.length - 1;

export default function Hero() {
  const secaoRef = useRef<HTMLElement>(null);
  const midiaRef = useRef<HTMLDivElement>(null);
  const textoRef = useRef<HTMLDivElement>(null);
  const subtituloRef = useRef<HTMLParagraphElement>(null);
  const acoesRef = useRef<HTMLDivElement>(null);
  const palavraRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const permiteVideo = useSyncExternalStore(
    inscreverMovimentoReduzido,
    lerMovimentoPermitido,
    lerMovimentoPermitidoServidor,
  );

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;

    const mm = gsap.matchMedia();

    mm.add({ todos: "all", reduz: "(prefers-reduced-motion: reduce)" }, (contexto) => {
      const { reduz } = contexto.conditions as { reduz: boolean };
      if (reduz) return;

      gsap.from(palavraRefs.current, {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.06,
        delay: 0.15,
      });
      gsap.from([subtituloRef.current, acoesRef.current], {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.6,
      });

      gsap.to(midiaRef.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: secao, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(textoRef.current, {
        yPercent: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: secao, start: "20% top", end: "80% top", scrub: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={secaoRef}
      className="relative flex overflow-hidden bg-carvao"
      style={{ minHeight: "max(100svh, 600px)" }}
    >
      <div ref={midiaRef} className="absolute inset-0 origin-[70%_60%]">
        <Image
          src="/images/hero/hero-poster.webp"
          alt=""
          fill
          priority
          className="object-cover [object-position:74%_center] min-[900px]:[object-position:60%_center]"
        />
        {permiteVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover [object-position:74%_center] min-[900px]:[object-position:60%_center]"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero/hero-poster.webp"
            aria-hidden="true"
          >
            <source src="/videos/hero-loop.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 min-[900px]:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(244,238,230,.9) 0%, rgba(244,238,230,.55) 34%, rgba(244,238,230,0) 58%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden min-[900px]:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(244,238,230,.92) 0%, rgba(244,238,230,.6) 34%, rgba(244,238,230,0) 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[34vh]"
        style={{
          background: "linear-gradient(180deg, rgba(244,238,230,0), rgba(244,238,230,.75) 60%, var(--color-nevoa))",
        }}
      />

      <Container className="relative z-[2] flex w-full flex-col justify-between self-stretch pt-[120px] pb-10 min-[900px]:justify-center min-[900px]:pb-0">
        <div ref={textoRef}>
          <h1
            aria-label={titulo}
            className="max-w-[11ch] font-titulo font-light leading-[0.98] tracking-[-0.015em] text-carvao"
            style={{ fontSize: "clamp(44px, 7.4vw, 112px)" }}
          >
            {palavrasTitulo.map((palavra, i) => (
              <span key={i} aria-hidden="true">
                <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
                  <span
                    ref={(el) => {
                      palavraRefs.current[i] = el;
                    }}
                    className={`inline-block ${i === ultimaPalavra ? "italic" : ""}`}
                  >
                    {palavra}
                  </span>
                </span>
                {i < ultimaPalavra ? " " : ""}
              </span>
            ))}
          </h1>
          <p
            ref={subtituloRef}
            className="mt-7 max-w-[38ch] font-texto text-base text-carvao min-[900px]:text-lg"
          >
            Projetamos casas de madeira e vidro para quem já tem um terreno na
            região de Pedra Azul e quer viver em meio à natureza.
          </p>
        </div>

        <div ref={acoesRef} className="mt-9 flex flex-wrap items-center gap-5 gap-x-7">
          <a
            href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ambar px-[22px] py-3 font-texto text-sm font-medium text-carvao transition-colors hover:bg-ambar-escuro"
          >
            Agendar reunião
            <span
              aria-hidden="true"
              className="grid h-[22px] w-[22px] place-items-center rounded-full bg-carvao/10 transition-transform duration-400 group-hover:-rotate-45 group-hover:translate-x-[3px]"
            >
              →
            </span>
          </a>
          <a
            href="#projetos"
            className="border-b border-current pb-0.5 font-texto text-[15px] font-medium text-nevoa min-[900px]:text-carvao"
          >
            Ver projetos →
          </a>
        </div>
      </Container>

      <div className="absolute bottom-8 left-5 hidden items-center gap-3 font-rotulo text-xs uppercase tracking-wide text-carvao min-[900px]:left-12 min-[900px]:flex">
        <span
          aria-hidden="true"
          className="block h-10 w-px origin-top bg-carvao [animation:pulso_2.4s_ease-in-out_infinite]"
        />
        Role para conhecer
      </div>
    </section>
  );
}
