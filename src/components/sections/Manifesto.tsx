"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Secao from "@/components/ui/Secao";
import { gsap } from "@/lib/gsap";
import { useTextoSobe } from "@/hooks/useAnimacoesScroll";

const numeros = [
  { alvo: 12, sufixo: "anos", legenda: "projetando na serra" },
  { alvo: 38, sufixo: "casas", legenda: "entregues" },
  { alvo: 100, sufixo: "%", legenda: "das obras acompanhadas por nós" },
];

export default function Manifesto() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const brilhoRef = useRef<HTMLDivElement>(null);
  const tracoRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const numeroRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useTextoSobe(tituloRef);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(card, { y: 24 });
      tracoRefs.current.forEach((traco) => traco && gsap.set(traco, { scaleX: 0 }));
      numeroRefs.current.forEach((numero) => numero && (numero.textContent = "0"));

      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 80%" },
      });

      tl.to(card, { y: 0, duration: 0.8, ease: "power3.out" }, 0);

      tracoRefs.current.forEach((traco, i) => {
        if (!traco) return;
        tl.to(traco, { scaleX: 1, duration: 0.8, ease: "power3.out" }, i * 0.15);
      });

      numeroRefs.current.forEach((numero, i) => {
        if (!numero) return;
        const contador = { valor: 0 };
        tl.to(
          contador,
          {
            valor: numeros[i].alvo,
            duration: 1.3,
            ease: "power3.out",
            onUpdate: () => {
              numero.textContent = String(Math.round(contador.valor));
            },
          },
          0.2 + i * 0.15,
        );
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const brilho = brilhoRef.current;
    if (!card || !brilho) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function mover(evento: PointerEvent) {
      const rect = card!.getBoundingClientRect();
      const x = (evento.clientX - rect.left) / rect.width;
      const y = (evento.clientY - rect.top) / rect.height;
      const px = x - 0.5;
      const py = y - 0.5;
      card!.style.transform = `perspective(1400px) rotateX(${(py * -4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
      brilho!.style.background = `radial-gradient(600px circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(244,238,230,.35), rgba(244,238,230,0) 55%)`;
    }

    function entrar(evento: PointerEvent) {
      brilho!.style.opacity = "1";
      mover(evento);
    }

    function sair() {
      card!.style.transform = "";
      brilho!.style.opacity = "0";
    }

    card.addEventListener("pointerenter", entrar);
    card.addEventListener("pointermove", mover);
    card.addEventListener("pointerleave", sair);

    return () => {
      card.removeEventListener("pointerenter", entrar);
      card.removeEventListener("pointermove", mover);
      card.removeEventListener("pointerleave", sair);
    };
  }, []);

  return (
    <Secao id="manifesto" fundo="nevoa" rotulo="01 · Manifesto">
      <div
        ref={cardRef}
        className="relative grid overflow-hidden rounded-[28px] border border-pedra/[.28] bg-linho shadow-[0_1px_0_rgba(244,238,230,.6)_inset,0_30px_60px_-40px_rgba(33,26,18,.35)] transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] min-[900px]:grid-cols-[7fr_5fr]"
      >
        <div
          ref={brilhoRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
        />

        <div className="relative z-10 flex min-w-0 flex-col justify-between gap-12 px-6 pt-8 pb-7 min-[900px]:pt-14 min-[900px]:pr-12 min-[900px]:pb-12 min-[900px]:pl-14">
          <div>
            <h2
              ref={tituloRef}
              className="font-titulo text-[36px] font-light leading-[1.08] text-carvao min-[768px]:text-[54px]"
            >
              O <em className="font-light italic">vazio</em> é onde a vida acontece.
            </h2>

            <div className="mt-6 flex max-w-[50ch] flex-col gap-4 font-texto text-base text-carvao min-[768px]:text-[17px]">
              <p>
                Queríamos transformar nosso lar num lugar de paz: silêncio, luz
                natural e a mata por perto. Foi desenhando essa casa que
                entendemos o que mais importa nela, o espaço livre entre as
                coisas, por onde passam a luz, o ar e a paisagem.
              </p>
              <p>
                Daí vem o nosso nome. Hoje levamos esse mesmo cuidado para quem
                tem um pedaço de serra e quer viver nele com conforto e
                segurança.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-pedra/45 pt-7">
            {numeros.map((numero, i) => (
              <div key={numero.legenda} className="flex min-w-0 flex-col gap-1.5">
                <span
                  ref={(el) => {
                    tracoRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  className="block h-0.5 w-6 origin-left rounded-full bg-ambar"
                />
                <span className="mt-1.5 font-titulo text-[32px] leading-none font-light tabular-nums text-madeira min-[768px]:text-[40px]">
                  <span
                    ref={(el) => {
                      numeroRefs.current[i] = el;
                    }}
                  >
                    {numero.alvo}
                  </span>
                  <small className="ml-[.15em] text-[0.55em]">{numero.sufixo}</small>
                </span>
                <span className="text-[13px] leading-snug text-terra min-[768px]:text-sm">
                  {numero.legenda}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 min-w-0 pt-0 pr-3 pb-3 pl-3 min-[900px]:pt-3 min-[900px]:pl-0">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-carvao min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:min-h-[560px]">
            <Image
              src="/images/geral/manifesto-interior.webp"
              alt="Sala de uma casa de madeira com parede de vidro do chão ao teto, uma poltrona e uma mesa baixa com café, de frente para as araucárias e a Pedra Azul."
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Secao>
  );
}
