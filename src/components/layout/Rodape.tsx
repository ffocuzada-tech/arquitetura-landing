"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Rotulo from "@/components/ui/Rotulo";
import { gsap } from "@/lib/gsap";

export default function Rodape() {
  const marcaRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const marca = marcaRef.current;
    if (!marca) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.from(marca, {
        yPercent: 100,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: marca, start: "top 95%" },
      });
      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <footer className="bg-crepusculo px-5 pt-10 text-nevoa md:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap justify-between gap-10 border-b border-nevoa/[.14] pb-12 md:gap-16">
          <p className="max-w-[24ch] font-titulo text-xl">
            Casas de madeira e vidro para quem escolheu viver na serra capixaba.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16">
            <div>
              <Rotulo className="text-ambar">Contato</Rotulo>
              <ul className="mt-3.5 grid gap-1.5 text-nevoa/85">
                {/* Número do WhatsApp entra aqui quando o usuário criar (pendência) */}
                <li>WhatsApp</li>
                <li>
                  <a href="mailto:estudiovazio.contato@gmail.com" className="hover:text-ambar">
                    estudiovazio.contato@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Rotulo className="text-ambar">Escritório</Rotulo>
              <ul className="mt-3.5 grid gap-1.5 text-nevoa/85">
                <li>Vitória · ES</li>
                <li>Atendimento com hora marcada</li>
                <li>Seg. a sex., das 9h às 18h</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="overflow-hidden pt-6"
          style={{ containerType: "inline-size", paddingRight: "0.08em" }}
        >
          <p
            ref={marcaRef}
            className="font-titulo leading-[.88] font-light tracking-[-0.035em] whitespace-nowrap text-nevoa"
            style={{ fontSize: "clamp(64px, 14.5cqi, 250px)" }}
          >
            Estúdio <em className="font-light text-ambar italic">Vazio</em>
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-3 py-7 font-rotulo text-xs text-nevoa/60">
          <span>© 2026 Estúdio Vazio · CAU A000000-0</span>
          <Link href="/politica-de-privacidade" className="hover:text-ambar">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
