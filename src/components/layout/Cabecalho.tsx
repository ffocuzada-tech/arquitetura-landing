"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { MENSAGEM_AGENDAR_REUNIAO, linkWhatsapp } from "@/lib/contato";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const itensMenu = [
  { rotulo: "Projetos", href: "#projetos" },
  { rotulo: "Processo", href: "#processo" },
  { rotulo: "Contato", href: "#contato" },
];

export default function Cabecalho() {
  const [solido, setSolido] = useState(false);
  const [escuro, setEscuro] = useState(false);
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    // refreshPriority negativo: recalcula depois dos ScrollTriggers com pin (Manifesto),
    // que crescem a altura da página e por isso precisam ser medidos primeiro (D71)
    const gatilhoSolido = ScrollTrigger.create({
      start: 60,
      end: "max",
      refreshPriority: -1,
      onToggle: (self) => setSolido(self.isActive),
    });

    const gatilhoEscuro = ScrollTrigger.create({
      trigger: "#depoimentos",
      start: "top 72px",
      endTrigger: "footer",
      end: "bottom top",
      refreshPriority: -1,
      onToggle: (self) => setEscuro(self.isActive),
    });

    const mm = gsap.matchMedia();
    mm.add({ todos: "all", desk: "(min-width: 900px)" }, (contexto) => {
      const { desk } = contexto.conditions as { desk: boolean };
      if (desk) {
        setOculto(false);
        return;
      }

      let ultimoScroll = window.scrollY;
      function aoRolar() {
        const atual = window.scrollY;
        if (atual > ultimoScroll && atual > 240) setOculto(true);
        else if (atual < ultimoScroll) setOculto(false);
        ultimoScroll = atual;
      }
      window.addEventListener("scroll", aoRolar, { passive: true });

      return () => {
        window.removeEventListener("scroll", aoRolar);
        setOculto(false);
      };
    });

    return () => {
      gatilhoSolido.kill();
      gatilhoEscuro.kill();
      mm.revert();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,box-shadow,translate] duration-500 ${
        oculto ? "-translate-y-[120%]" : "translate-y-0"
      } ${
        escuro
          ? "bg-crepusculo/[.82] shadow-[0_1px_0_rgba(244,238,230,.08)]"
          : solido
            ? "bg-nevoa/[.86] shadow-[0_1px_0_rgba(154,148,147,.25)] backdrop-blur-[14px]"
            : "bg-transparent"
      }`}
    >
      <Container
        className={`flex items-center justify-between gap-4 transition-[padding] duration-500 ${
          solido ? "py-3.5" : "py-5 md:py-6"
        }`}
      >
        <a href="#inicio" aria-label="Estúdio Vazio, voltar ao início" className="relative block h-7 md:h-8">
          <Image
            src="/images/logo/logo-horizontal.svg"
            alt=""
            width={770}
            height={145}
            priority
            className={`h-full w-auto transition-opacity duration-400 ${escuro ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src="/images/logo/logo-horizontal-claro.svg"
            alt=""
            width={770}
            height={145}
            className={`absolute inset-0 h-full w-auto transition-opacity duration-400 ${
              escuro ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 min-[900px]:flex">
          {itensMenu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative py-1.5 font-rotulo text-xs uppercase tracking-wide after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100 ${
                escuro ? "text-nevoa" : "text-carvao"
              }`}
            >
              {item.rotulo}
            </a>
          ))}
        </nav>

        <a
          href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center rounded-full px-[22px] py-3 font-texto text-sm font-medium transition-colors ${
            escuro ? "bg-ambar text-carvao hover:bg-ambar-escuro" : "bg-carvao text-nevoa"
          }`}
        >
          <span className="min-[768px]:hidden">Agendar</span>
          <span className="hidden min-[768px]:inline">Agendar reunião</span>
        </a>
      </Container>
    </header>
  );
}
