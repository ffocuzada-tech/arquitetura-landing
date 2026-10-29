# Handoff — Estúdio Vazio

> Estado atual do projeto. Reescrito por inteiro ao final de cada etapa.
> Histórico → PRs no GitHub. Decisões → docs/decisoes.md.

## 1. Onde estamos
Etapa: PR 1 – Estrutura | Status: aguardando revisão

## 2. Última entrega
Prompt 1C concluído na branch `etapa/1-estrutura`: assets copiados, skills de design e testes instaladas (D27–D32), fontes/cores/metadados e componentes base (Container, Secao, Rotulo), `src/lib/contato.ts`, cabeçalho, rodapé, página da política de privacidade e a página inicial com as 7 seções vazias e as âncoras. PR aberto para revisão.

## 3. Próximo passo
PR 2 – Seções principais, na branch `etapa/2-secoes-principais`: Hero, Manifesto, Projetos, Por que nós e Processo, com os efeitos (GSAP + ScrollTrigger).

## 4. Pendências abertas
- Número de WhatsApp do projeto (espaço reservado até lá).
- Gmail do projeto com verificação em duas etapas (necessário no PR 4).
- Avaliação final da miniatura no teste do site.

## 5. Atenção
- Paleta, fontes, layout e textos já estão aprovados: não trocar (ver `docs/regras.md`, Parte 2).
- Next.js 16: consultar `node_modules/next/dist/docs/` antes de escrever código (ver `AGENTS.md`).
- Skills instaladas como pastas reais em `.claude/skills/` (frontend-design, webapp-testing, ui-ux-pro-max), sem `.agents/`, sem links e sem `skills-lock.json` (D31, D32).

## 6. Verificado em
29/10/2026 — `npm run lint` e `npm run build` sem erros na `etapa/1-estrutura`. Testado com a skill webapp-testing em 390px (celular) e 1440px (computador): os 3 links do menu levam às seções certas, o cabeçalho muda ao rolar sem cobrir o rótulo das seções, o botão abre o wa.me com a mensagem certa, sem erros no console, favicon do Estúdio Vazio na aba, navegação por Tab com foco visível.
