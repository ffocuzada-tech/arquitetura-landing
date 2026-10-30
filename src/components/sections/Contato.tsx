"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Secao from "@/components/ui/Secao";
import { gsap } from "@/lib/gsap";
import { formatarWhatsapp, linkWhatsapp, montarMensagemContato } from "@/lib/contato";
import {
  VALORES_LOCAL,
  VALORES_NECESSIDADE,
  VALORES_TAMANHO,
  validarContato,
  type ErrosContato,
} from "@/lib/validacao";

type Pergunta = {
  id: "necessidade" | "local" | "tamanho";
  pergunta: string;
  opcoes: { valor: string; rotulo: string }[];
};

const rotulosNecessidade: Record<string, string> = {
  projeto: "Projeto",
  "projeto e obra": "Projeto + Obra",
};

const perguntas: Pergunta[] = [
  {
    id: "necessidade",
    pergunta: "O que você precisa?",
    opcoes: VALORES_NECESSIDADE.map((valor) => ({ valor, rotulo: rotulosNecessidade[valor] })),
  },
  {
    id: "local",
    pergunta: "Onde fica o terreno?",
    opcoes: VALORES_LOCAL.map((valor) => ({ valor, rotulo: valor })),
  },
  {
    id: "tamanho",
    pergunta: "Tamanho aproximado da casa",
    opcoes: VALORES_TAMANHO.map((valor) => ({ valor, rotulo: valor })),
  },
];

type Escolhas = Record<Pergunta["id"], string>;
type Erros = ErrosContato;

function GrupoEscolha({
  pergunta,
  valorSelecionado,
  onSelecionar,
  erro,
  primeiroRadioRef,
}: {
  pergunta: Pergunta;
  valorSelecionado: string;
  onSelecionar: (valor: string) => void;
  erro?: string;
  primeiroRadioRef: (el: HTMLInputElement | null) => void;
}) {
  const erroId = `erro-${pergunta.id}`;

  return (
    <fieldset aria-describedby={erro ? erroId : undefined}>
      <legend className="font-texto text-sm font-medium text-carvao">{pergunta.pergunta}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {pergunta.opcoes.map((opcao, i) => (
          <label key={opcao.valor} className="cursor-pointer">
            <input
              ref={i === 0 ? primeiroRadioRef : undefined}
              type="radio"
              name={pergunta.id}
              value={opcao.valor}
              checked={valorSelecionado === opcao.valor}
              onChange={() => onSelecionar(opcao.valor)}
              className="peer sr-only"
            />
            <span className="inline-flex items-center rounded-[4px] border border-terra px-4 py-2 font-texto text-sm text-carvao transition-colors peer-checked:border-araucaria peer-checked:bg-araucaria peer-checked:text-nevoa peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ambar">
              {opcao.rotulo}
            </span>
          </label>
        ))}
      </div>
      {erro && (
        <p id={erroId} className="mt-2 font-texto text-sm text-carvao">
          {erro}
        </p>
      )}
    </fieldset>
  );
}

export default function Contato() {
  const miniaturaRef = useRef<HTMLDivElement>(null);
  const sombraRef = useRef<HTMLDivElement>(null);

  const [escolhas, setEscolhas] = useState<Escolhas>({
    necessidade: "",
    local: "",
    tamanho: "",
  });
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [site, setSite] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [mensagemEnvio, setMensagemEnvio] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(
    null,
  );

  const refNecessidade = useRef<HTMLInputElement>(null);
  const refLocal = useRef<HTMLInputElement>(null);
  const refTamanho = useRef<HTMLInputElement>(null);
  const refNome = useRef<HTMLInputElement>(null);
  const refWhatsapp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const miniatura = miniaturaRef.current;
    const sombra = sombraRef.current;
    if (!miniatura || !sombra) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(miniatura, { transformOrigin: "50% 85%" });

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { duration: 2.6, ease: "sine.inOut" },
      });
      tl.to(miniatura, { y: -14, rotate: -2 }, 0);
      tl.to(sombra, { scaleX: 0.82, opacity: 0.55 }, 0);

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  function handleWhatsappChange(evento: ChangeEvent<HTMLInputElement>) {
    setWhatsapp(formatarWhatsapp(evento.target.value));
  }

  function validar(): boolean {
    const novosErros = validarContato({
      necessidade: escolhas.necessidade,
      local: escolhas.local,
      tamanho: escolhas.tamanho,
      nome,
      whatsapp,
    });

    setErros(novosErros);

    const refsPorCampo: Record<keyof Erros, React.RefObject<HTMLInputElement | null>> = {
      necessidade: refNecessidade,
      local: refLocal,
      tamanho: refTamanho,
      nome: refNome,
      whatsapp: refWhatsapp,
    };
    const ordem: (keyof Erros)[] = ["necessidade", "local", "tamanho", "nome", "whatsapp"];
    const primeiroCampo = ordem.find((campo) => novosErros[campo]);
    if (primeiroCampo) refsPorCampo[primeiroCampo].current?.focus();

    return Object.keys(novosErros).length === 0;
  }

  function handleAgendarWhatsapp() {
    setMensagemEnvio(null);
    if (!validar()) return;
    const mensagem = montarMensagemContato({
      nome: nome.trim(),
      necessidade: escolhas.necessidade,
      local: escolhas.local,
      tamanho: escolhas.tamanho,
    });
    window.open(linkWhatsapp(mensagem), "_blank", "noopener,noreferrer");
  }

  async function handlePrefiroLigacao() {
    setMensagemEnvio(null);
    if (!validar()) return;

    setEnviando(true);
    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          whatsapp,
          necessidade: escolhas.necessidade,
          local: escolhas.local,
          tamanho: escolhas.tamanho,
          site,
        }),
      });
      if (!resposta.ok) throw new Error("Falha no envio");
      setMensagemEnvio({
        tipo: "sucesso",
        texto: "Recebemos seu contato. Retornamos em até 1 dia útil.",
      });
    } catch {
      setMensagemEnvio({
        tipo: "erro",
        texto: "Não foi possível enviar agora. Tente de novo ou fale com a gente pelo WhatsApp.",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Secao id="contato" escuro rotulo="06 · Contato">
      <div className="max-w-xl">
        <h2 className="font-titulo text-3xl font-light leading-tight md:text-5xl">
          Conte sobre seu terreno
        </h2>
        <p className="mt-6 font-texto text-base text-nevoa/75 md:text-lg">
          Três perguntas rápidas. Montamos a mensagem e você fala direto com o escritório pelo
          WhatsApp.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-12 md:items-center md:gap-10">
        <div className="md:col-span-6">
          <div className="relative mx-auto w-full max-w-[280px] md:max-w-[360px]">
            <div
              ref={sombraRef}
              className="absolute inset-x-10 bottom-4 h-6 rounded-[50%] bg-carvao/15 blur-md"
            />
            <div ref={miniaturaRef} className="relative aspect-square w-full">
              <Image
                src="/images/geral/miniatura-terreno.webp"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6">
          <form
            onSubmit={(evento) => evento.preventDefault()}
            className="rounded-[6px] border border-linho bg-nevoa p-6 shadow-xl shadow-carvao/10 md:p-8"
          >
            <div className="flex flex-col gap-6">
              {perguntas.map((pergunta) => (
                <GrupoEscolha
                  key={pergunta.id}
                  pergunta={pergunta}
                  valorSelecionado={escolhas[pergunta.id]}
                  onSelecionar={(valor) =>
                    setEscolhas((anterior) => ({ ...anterior, [pergunta.id]: valor }))
                  }
                  erro={erros[pergunta.id]}
                  primeiroRadioRef={(el) => {
                    if (pergunta.id === "necessidade") refNecessidade.current = el;
                    if (pergunta.id === "local") refLocal.current = el;
                    if (pergunta.id === "tamanho") refTamanho.current = el;
                  }}
                />
              ))}

              <div>
                <label htmlFor="nome" className="block font-texto text-sm font-medium text-carvao">
                  Nome
                </label>
                <input
                  ref={refNome}
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  aria-invalid={Boolean(erros.nome)}
                  aria-describedby={erros.nome ? "erro-nome" : undefined}
                  className="mt-2 w-full rounded-[4px] border border-terra px-4 py-3 font-texto text-base text-carvao placeholder:text-terra/60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar"
                />
                {erros.nome && (
                  <p id="erro-nome" className="mt-2 font-texto text-sm text-carvao">
                    {erros.nome}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="whatsapp"
                  className="block font-texto text-sm font-medium text-carvao"
                >
                  WhatsApp
                </label>
                <input
                  ref={refWhatsapp}
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(27) 9 0000-0000"
                  value={whatsapp}
                  onChange={handleWhatsappChange}
                  aria-invalid={Boolean(erros.whatsapp)}
                  aria-describedby={erros.whatsapp ? "erro-whatsapp" : undefined}
                  className="mt-2 w-full rounded-[4px] border border-terra px-4 py-3 font-texto text-base text-carvao placeholder:text-terra/60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar"
                />
                {erros.whatsapp && (
                  <p id="erro-whatsapp" className="mt-2 font-texto text-sm text-carvao">
                    {erros.whatsapp}
                  </p>
                )}
              </div>
            </div>

            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="site">Não preencha este campo</label>
              <input
                id="site"
                name="site"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={site}
                onChange={(evento) => setSite(evento.target.value)}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAgendarWhatsapp}
                className="rounded-[4px] bg-ambar px-6 py-3.5 text-center font-texto text-sm font-medium text-carvao transition-colors hover:bg-ambar-escuro"
              >
                Agendar reunião pelo WhatsApp
              </button>
              <button
                type="button"
                onClick={handlePrefiroLigacao}
                disabled={enviando}
                className="rounded-[4px] border border-terra px-6 py-3.5 text-center font-texto text-sm font-medium text-carvao transition-colors disabled:opacity-50"
              >
                Prefiro que me liguem
              </button>
            </div>

            <p role="status" aria-live="polite" className="mt-3 min-h-5 font-texto text-sm">
              {mensagemEnvio && (
                <span className={mensagemEnvio.tipo === "sucesso" ? "text-araucaria" : "text-carvao"}>
                  {mensagemEnvio.texto}
                </span>
              )}
            </p>

            <p className="mt-6 font-texto text-xs text-terra">
              Usamos seus dados só para responder ao seu contato.{" "}
              <Link href="/politica-de-privacidade" className="underline hover:text-madeira">
                Política de privacidade
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Secao>
  );
}
