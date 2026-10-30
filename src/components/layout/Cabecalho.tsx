"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { MENSAGEM_AGENDAR_REUNIAO, linkWhatsapp } from "@/lib/contato";

const itensMenu = [
  { rotulo: "Projetos", href: "#projetos" },
  { rotulo: "Processo", href: "#processo" },
  { rotulo: "Contato", href: "#contato" },
];

export default function Cabecalho() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    function verificarRolagem() {
      setRolou(window.scrollY > 8);
    }
    verificarRolagem();
    window.addEventListener("scroll", verificarRolagem);
    return () => window.removeEventListener("scroll", verificarRolagem);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        rolou ? "bg-nevoa/95 border-b border-linho py-5" : "bg-transparent py-6"
      }`}
    >
      <Container className="flex items-center justify-between">
        <a href="#inicio">
          <Image
            src="/images/logo/logo-horizontal.svg"
            alt="Estúdio Vazio"
            width={770}
            height={145}
            priority
            className="h-7 w-auto md:h-8"
          />
        </a>

        <nav className="hidden items-center gap-8 font-rotulo text-xs uppercase tracking-wide text-carvao md:flex">
          {itensMenu.map((item) => (
            <a key={item.href} href={item.href}>
              {item.rotulo}
            </a>
          ))}
        </nav>

        <a
          href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[4px] bg-carvao px-5 py-2.5 text-sm font-medium text-nevoa"
        >
          <span className="md:hidden">Agendar</span>
          <span className="hidden md:inline">Agendar reunião</span>
        </a>
      </Container>
    </header>
  );
}
