"use client";

import { useRef } from "react";
import Image from "next/image";
import Secao from "@/components/ui/Secao";
import { useImagemRecorte, useTextoSobe } from "@/hooks/useAnimacoesScroll";

const numeros = [
  { valor: "12 anos", legenda: "projetando na serra" },
  { valor: "38 casas", legenda: "entregues" },
  { valor: "100%", legenda: "das obras acompanhadas por nós" },
];

export default function Manifesto() {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);

  useTextoSobe(tituloRef);
  useImagemRecorte(fotoRef);

  return (
    <Secao id="manifesto" fundo="nevoa" rotulo="01 · Manifesto">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2
            ref={tituloRef}
            className="font-titulo text-3xl font-light leading-tight text-carvao md:text-5xl"
          >
            O vazio é onde a vida acontece.
          </h2>

          <div className="mt-6 flex flex-col gap-4 font-texto text-base text-carvao md:text-lg">
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

        <div className="md:col-span-5 md:col-start-8">
          <div ref={fotoRef} className="relative aspect-[4/5] w-full">
            <Image
              src="/images/geral/manifesto-interior.webp"
              alt="Sala de uma casa de madeira com parede de vidro do chão ao teto, uma poltrona e uma mesa baixa com café, de frente para as araucárias e a Pedra Azul."
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col divide-y divide-pedra/40 md:mt-20 md:flex-row md:divide-y-0 md:divide-x">
        {numeros.map((numero) => (
          <div
            key={numero.valor}
            className="flex flex-1 flex-col gap-1 py-6 first:pt-0 md:px-10 md:py-0 md:first:pl-0"
          >
            <span className="font-titulo text-5xl font-light text-carvao md:text-6xl">
              {numero.valor}
            </span>
            <span className="font-texto text-sm text-terra">{numero.legenda}</span>
          </div>
        ))}
      </div>
    </Secao>
  );
}
