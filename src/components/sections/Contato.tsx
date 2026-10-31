"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { formatarWhatsapp, linkWhatsapp, montarMensagemContato } from "@/lib/contato";
import { vibrar } from "@/lib/vibrar";
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

const TOTAL_PASSOS = 4;
const passoPorCampo: Record<keyof ErrosContato, number> = {
  necessidade: 0,
  local: 1,
  tamanho: 2,
  nome: 3,
  whatsapp: 3,
};

type Escolhas = Record<Pergunta["id"], string>;
type Erros = ErrosContato;

function ehMovel() {
  return !window.matchMedia("(min-width: 900px)").matches;
}

function GrupoEscolha({
  pergunta,
  passo,
  valorSelecionado,
  onSelecionar,
  onAvancar,
  erro,
  primeiroRadioRef,
}: {
  pergunta: Pergunta;
  passo: number;
  valorSelecionado: string;
  onSelecionar: (valor: string) => void;
  onAvancar: (passo: number) => void;
  erro?: string;
  primeiroRadioRef: (el: HTMLInputElement | null) => void;
}) {
  const erroId = `erro-${pergunta.id}`;

  function aoClicarOpcao(valor: string) {
    onSelecionar(valor);
    if (!ehMovel()) return;
    vibrar(8);
    setTimeout(() => onAvancar(passo + 1), 320);
  }

  return (
    <fieldset aria-describedby={erro ? erroId : undefined}>
      <legend className="font-texto text-sm font-semibold text-carvao [html.movel_&]:font-titulo [html.movel_&]:text-[28px] [html.movel_&]:leading-[1.1] [html.movel_&]:font-normal">
        {pergunta.pergunta}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2 [html.movel_&]:mt-4 [html.movel_&]:gap-2.5">
        {pergunta.opcoes.map((opcao, i) => (
          <label key={opcao.valor} className="cursor-pointer [html.movel_&]:flex-1">
            <input
              ref={i === 0 ? primeiroRadioRef : undefined}
              type="radio"
              name={pergunta.id}
              value={opcao.valor}
              checked={valorSelecionado === opcao.valor}
              onChange={() => onSelecionar(opcao.valor)}
              onClick={() => aoClicarOpcao(opcao.valor)}
              className="peer sr-only"
            />
            <span className="inline-flex items-center rounded-full border border-terra/50 px-4 py-[9px] font-texto text-sm text-carvao transition-colors peer-checked:border-araucaria peer-checked:bg-araucaria peer-checked:text-nevoa peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ambar [html.movel_&]:w-full [html.movel_&]:justify-center [html.movel_&]:px-5 [html.movel_&]:py-[15px] [html.movel_&]:text-base">
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
  const [passoAtual, setPassoAtual] = useState(0);

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

  function irPasso(k: number) {
    setPassoAtual(Math.max(0, Math.min(TOTAL_PASSOS - 1, k)));
  }

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
    if (primeiroCampo) {
      const passoDoCampo = passoPorCampo[primeiroCampo];
      if (passoDoCampo !== passoAtual) {
        irPasso(passoDoCampo);
        requestAnimationFrame(() => requestAnimationFrame(() => refsPorCampo[primeiroCampo].current?.focus()));
      } else {
        refsPorCampo[primeiroCampo].current?.focus();
      }
    }

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

  const ultimoPasso = passoAtual === TOTAL_PASSOS - 1;

  return (
    <section id="contato" aria-labelledby="titulo-contato" className="relative px-5 pt-[120px] pb-[160px] text-nevoa md:px-12">
      <div className="mx-auto grid max-w-[1200px] gap-14 min-[900px]:grid-cols-[5fr_6fr] min-[900px]:items-center min-[900px]:gap-[72px]">
        <div>
          <span className="font-rotulo text-xs tracking-wide text-ambar uppercase">06 · Contato</span>
          <h2
            id="titulo-contato"
            className="mt-5 font-titulo font-light leading-[.98] tracking-[-0.015em]"
            style={{ fontSize: "clamp(40px, 5.4vw, 88px)" }}
          >
            Conte sobre seu <em className="font-light text-ambar italic">terreno</em>
          </h2>
          <p className="mt-6 max-w-[36ch] text-[17px] text-nevoa/75">
            Três perguntas rápidas. Montamos a mensagem e você fala direto com o escritório pelo
            WhatsApp.
          </p>

          <div className="relative mx-auto mt-12 max-w-[380px] [html.movel_&]:max-w-[260px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-[10%] -top-[20%] bottom-0"
              style={{ background: "radial-gradient(closest-side, rgba(240,170,96,.32), rgba(240,170,96,0))" }}
            />
            <div
              ref={sombraRef}
              aria-hidden="true"
              className="absolute inset-x-[18%] bottom-[6%] h-[22px] rounded-[50%] bg-black/45 blur-[10px]"
            />
            <div ref={miniaturaRef} className="relative aspect-square w-full">
              <Image src="/images/geral/miniatura-terreno.webp" alt="" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div>
          <form
            onSubmit={(evento) => evento.preventDefault()}
            className="relative rounded-[28px] bg-nevoa p-[22px] text-carvao shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] min-[768px]:p-10"
          >
            <div className="mb-[22px] grid gap-3 [html.movel_&]:grid">
              <div className="hidden items-center justify-between gap-3 [html.movel_&]:flex">
                <span className="font-rotulo text-[11px] tracking-[.1em] text-terra uppercase">
                  Passo {passoAtual + 1} de {TOTAL_PASSOS}
                </span>
                <button
                  type="button"
                  onClick={() => irPasso(passoAtual - 1)}
                  disabled={passoAtual === 0}
                  className="font-texto text-sm font-medium text-madeira disabled:invisible"
                >
                  ← Voltar
                </button>
              </div>
              <div className="hidden h-[3px] overflow-hidden rounded-full bg-linho [html.movel_&]:block">
                <span
                  className="block h-full origin-left bg-araucaria transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  style={{ transform: `scaleX(${(passoAtual + 1) / TOTAL_PASSOS})` }}
                />
              </div>
            </div>

            <div className="grid gap-6">
              <div
                key={`passo-${passoAtual}-0`}
                className={`[html.movel_&]:animate-[entra_0.5s_cubic-bezier(0.22,0.61,0.36,1)] ${passoAtual === 0 ? "" : "[html.movel_&]:hidden"}`}
              >
                <GrupoEscolha
                  pergunta={perguntas[0]}
                  passo={0}
                  valorSelecionado={escolhas.necessidade}
                  onSelecionar={(valor) => setEscolhas((anterior) => ({ ...anterior, necessidade: valor }))}
                  onAvancar={irPasso}
                  erro={erros.necessidade}
                  primeiroRadioRef={(el) => {
                    refNecessidade.current = el;
                  }}
                />
              </div>

              <div
                key={`passo-${passoAtual}-1`}
                className={`[html.movel_&]:animate-[entra_0.5s_cubic-bezier(0.22,0.61,0.36,1)] ${passoAtual === 1 ? "" : "[html.movel_&]:hidden"}`}
              >
                <GrupoEscolha
                  pergunta={perguntas[1]}
                  passo={1}
                  valorSelecionado={escolhas.local}
                  onSelecionar={(valor) => setEscolhas((anterior) => ({ ...anterior, local: valor }))}
                  onAvancar={irPasso}
                  erro={erros.local}
                  primeiroRadioRef={(el) => {
                    refLocal.current = el;
                  }}
                />
              </div>

              <div
                key={`passo-${passoAtual}-2`}
                className={`[html.movel_&]:animate-[entra_0.5s_cubic-bezier(0.22,0.61,0.36,1)] ${passoAtual === 2 ? "" : "[html.movel_&]:hidden"}`}
              >
                <GrupoEscolha
                  pergunta={perguntas[2]}
                  passo={2}
                  valorSelecionado={escolhas.tamanho}
                  onSelecionar={(valor) => setEscolhas((anterior) => ({ ...anterior, tamanho: valor }))}
                  onAvancar={irPasso}
                  erro={erros.tamanho}
                  primeiroRadioRef={(el) => {
                    refTamanho.current = el;
                  }}
                />
              </div>

              <div
                key={`passo-${passoAtual}-3`}
                className={`grid gap-4 min-[600px]:grid-cols-2 [html.movel_&]:animate-[entra_0.5s_cubic-bezier(0.22,0.61,0.36,1)] ${passoAtual === 3 ? "" : "[html.movel_&]:hidden"}`}
              >
                <div>
                  <label
                    htmlFor="nome"
                    className="block font-texto text-sm font-semibold text-carvao [html.movel_&]:font-titulo [html.movel_&]:text-[28px] [html.movel_&]:font-normal"
                  >
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
                    className="mt-2 w-full rounded-[14px] border border-terra/50 bg-transparent px-4 py-[13px] font-texto text-base text-carvao placeholder:text-terra/65 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar [html.movel_&]:px-4 [html.movel_&]:py-4 [html.movel_&]:text-[17px]"
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
                    className="block font-texto text-sm font-semibold text-carvao [html.movel_&]:font-titulo [html.movel_&]:text-[28px] [html.movel_&]:font-normal"
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
                    className="mt-2 w-full rounded-[14px] border border-terra/50 bg-transparent px-4 py-[13px] font-texto text-base text-carvao placeholder:text-terra/65 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar [html.movel_&]:px-4 [html.movel_&]:py-4 [html.movel_&]:text-[17px]"
                  />
                  {erros.whatsapp && (
                    <p id="erro-whatsapp" className="mt-2 font-texto text-sm text-carvao">
                      {erros.whatsapp}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
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

            <div className={`mt-8 flex flex-col gap-3 ${ultimoPasso ? "" : "[html.movel_&]:hidden"}`}>
              <button
                type="button"
                onClick={handleAgendarWhatsapp}
                className="rounded-full bg-ambar px-6 py-[15px] text-center font-texto text-sm font-medium text-carvao transition-colors hover:bg-ambar-escuro"
              >
                Agendar reunião pelo WhatsApp
              </button>
              <button
                type="button"
                onClick={handlePrefiroLigacao}
                disabled={enviando}
                className="rounded-full border border-terra/50 px-6 py-[15px] text-center font-texto text-sm font-medium text-carvao transition-colors disabled:opacity-50"
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

            <p className={`mt-6 font-texto text-xs text-terra ${ultimoPasso ? "" : "[html.movel_&]:hidden"}`}>
              Usamos seus dados só para responder ao seu contato.{" "}
              <Link href="/politica-de-privacidade" className="underline hover:text-madeira">
                Política de privacidade
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
