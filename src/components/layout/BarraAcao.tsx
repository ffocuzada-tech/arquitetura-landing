"use client";

import { useEffect, useState } from "react";
import { MENSAGEM_AGENDAR_REUNIAO, linkWhatsapp } from "@/lib/contato";
import { ScrollTrigger } from "@/lib/gsap";

export default function BarraAcao() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    // refreshPriority negativo: #contato vem depois dos pins de Manifesto/Projetos/Processo (D71)
    const gatilho = ScrollTrigger.create({
      trigger: "#manifesto",
      start: "top 40%",
      endTrigger: "#contato",
      end: "top 85%",
      refreshPriority: -1,
      onToggle: (self) => setVisivel(self.isActive),
    });

    return () => gatilho.kill();
  }, []);

  return (
    <div
      id="barra-acao"
      className={`fixed right-0 bottom-0 z-[75] hidden pt-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] pl-5 transition-[translate] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] [html.movel_&]:block ${
        visivel ? "translate-y-0" : "translate-y-[120%]"
      }`}
      style={{ paddingRight: "max(20px, env(safe-area-inset-right, 0px))" }}
    >
      <a
        href={linkWhatsapp(MENSAGEM_AGENDAR_REUNIAO)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 rounded-full bg-ambar py-[15px] pr-5 pl-6 font-texto text-[15px] font-medium text-carvao shadow-[0_18px_40px_-12px_rgba(33,26,18,.55)]"
      >
        Agendar reunião <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
