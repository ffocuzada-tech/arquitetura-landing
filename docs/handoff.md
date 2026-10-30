# Handoff — Estúdio Vazio

> Estado atual do projeto. Reescrito por inteiro ao final de cada etapa.
> Histórico → PRs no GitHub. Decisões → docs/decisoes.md.

## 1. Onde estamos
Etapa: PR 2 – Seções principais | Status: aguardando revisão

## 2. Última entrega
PR 2 concluído na branch `etapa/2-secoes-principais`: pacote `gsap` instalado (D33), utilitário `src/lib/gsap.ts` (registra ScrollTrigger e SplitText) e hooks `src/hooks/useAnimacoesScroll.ts` (`useTextoSobe`, `useImagemRecorte`) que respeitam `prefers-reduced-motion` via `gsap.matchMedia`. Seções implementadas com conteúdo final do `docs/spec.md`:
- **Hero** — vídeo `hero-loop.mp4` com `hero-poster.webp` como alternativa parada em reduced motion, título/subtítulo com efeito de texto subindo linha a linha (SplitText), véu Névoa e recorte ~74% no celular.
- **Manifesto** — texto + foto 4:5 + números, texto sobe e foto surge de um recorte.
- **Projetos** — composição de revista (Casa Araucária grande + duas empilhadas), link "Agendar reunião →", fotos surgem de um recorte.
- **Por que nós** — título + 3 itens com ícones de traço fino (criados em SVG inline, no estilo do logo) em Araucária.
- **Processo** — linha do tempo (horizontal no computador, vertical no celular) com progresso Âmbar sincronizado ao scroll (`ScrollTrigger` com `scrub`); em reduced motion todas as etapas já aparecem acesas.

## 3. Próximo passo
PR 3 – Seções de conversão, na branch `etapa/3-secoes-conversao`: Depoimentos e seção 06 · Contato (visual + mensagem do WhatsApp).

## 4. Pendências abertas
- Número de WhatsApp do projeto (espaço reservado até lá).
- Gmail do projeto com verificação em duas etapas (necessário no PR 4).
- Avaliação final da miniatura no teste do site.

## 5. Atenção
- Paleta, fontes, layout e textos já estão aprovados: não trocar (ver `docs/regras.md`, Parte 2).
- Next.js 16: consultar `node_modules/next/dist/docs/` antes de escrever código (ver `AGENTS.md`).
- Skills instaladas como pastas reais em `.claude/skills/` (frontend-design, webapp-testing, ui-ux-pro-max), sem `.agents/`, sem links e sem `skills-lock.json` (D31, D32).
- Efeitos de scroll usam `gsap.matchMedia()`: o markup/CSS já nasce visível (sem JS ou com reduced motion ativo, nada fica escondido); a animação só esconde e revela quando `prefers-reduced-motion: no-preference`.
- O próximo passo vem sempre do prompt atual; o handoff é só contexto.

## 6. Verificado em
29/10/2026 — `npm run lint` e `npm run build` sem erros na `etapa/2-secoes-principais`. Testado com a skill webapp-testing em 390px (celular) e 1440px (computador): as 5 seções novas renderizam com os textos finais do spec, sem erros no console ao rolar a página inteira; com `prefers-reduced-motion: reduce` emulado, as 5 etapas do Processo aparecem todas acesas (Âmbar) sem animação.
