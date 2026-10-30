# Handoff — Estúdio Vazio

> Estado atual do projeto. Reescrito por inteiro ao final de cada etapa.
> Histórico → PRs no GitHub. Decisões → docs/decisoes.md.

## 1. Onde estamos
Etapa: PR 3 – Seções de conversão | Status: aguardando revisão

## 2. Última entrega
PR 3 concluído na branch `etapa/3-secoes-conversao`: seções 05 · Depoimentos e 06 · Contato, com conteúdo final do `docs/spec.md`.
- **Depoimentos** — os 5 depoimentos em cartões (foto redonda com anel Âmbar, nome, "casa · local", depoimento em itálico, detalhe no rodapé do cartão), com rolagem horizontal nativa (scroll-snap, sem biblioteca — D37). Componente cliente cuida das setas ("Depoimento anterior"/"Próximo depoimento", desativadas nas pontas), do contador "01 / 05" e da barra Âmbar de posição; navegação por teclado funcionando. No celular, cartão com ~82% da largura e dica "Arraste para o lado →". Título e frase sobem com `useTextoSobe`.
- **Contato** — miniatura (`miniatura-terreno.webp`) que flutua e inclina de leve em loop via GSAP, com sombra elíptica que acompanha o movimento (parada em reduced motion). Formulário com 3 perguntas em botões de escolha (fieldset + radio acessível), campos Nome e WhatsApp, validação dos dois botões exigindo as 3 escolhas + nome + WhatsApp (D39), avisos exatos do spec ligados por `aria-describedby`, foco no primeiro erro. WhatsApp formatado ao digitar, válido com 10 ou 11 dígitos, sem biblioteca (D40). Botão principal monta a mensagem do WhatsApp (`montarMensagemContato` em `src/lib/contato.ts`) e abre em nova aba. Botão "Prefiro que me liguem" envia POST para `/api/contato` (D38): hoje mostra sempre a mensagem de erro aprovada, pois a rota só é criada no PR 4.
- `body { overflow-x: hidden }` acrescentado ao `globals.css` como proteção contra vazamento lateral, necessário por causa do efeito de "vazar pela borda da tela" dos cartões de depoimentos.

## 3. Próximo passo
PR 4 – Integrações, na branch `etapa/4-integracoes`: rota `/api/contato` com envio por e-mail, página `/politica-de-privacidade` com o texto final, número de WhatsApp e e-mail reais do projeto.

## 4. Pendências abertas
- Número de WhatsApp do projeto (espaço reservado até lá).
- Gmail do projeto com verificação em duas etapas (necessário no PR 4).
- "Prefiro que me liguem" funciona de fato só no PR 4, quando a rota `/api/contato` existir.
- Avaliação final da miniatura no teste do site.

## 5. Atenção
- Paleta, fontes, layout e textos já estão aprovados: não trocar (ver `docs/regras.md`, Parte 2).
- A paleta não tem uma cor de erro/alerta dedicada: os avisos de validação do formulário usam Carvão (texto forte), e a mensagem de sucesso usa Araucária — sem introduzir cores novas.
- Next.js 16: consultar `node_modules/next/dist/docs/` antes de escrever código (ver `AGENTS.md`).
- Skills instaladas como pastas reais em `.claude/skills/` (frontend-design, webapp-testing, ui-ux-pro-max), sem `.agents/`, sem links e sem `skills-lock.json` (D31, D32).
- Efeitos de scroll usam `gsap.matchMedia()`: o markup/CSS já nasce visível (sem JS ou com reduced motion ativo, nada fica escondido); a animação só esconde e revela quando `prefers-reduced-motion: no-preference`.
- O carrossel de depoimentos calcula a largura da trilha por JavaScript (`getBoundingClientRect`) em vez de `calc(50vw - 50%)`: dentro de uma coluna de grid, a porcentagem do CSS resolve contra a largura da coluna, não do container inteiro, o que causava vazamento horizontal real da página.
- O próximo passo vem sempre do prompt atual; o handoff é só contexto.

## 6. Verificado em
30/10/2026 — `npm run lint` e `npm run build` sem erros na `etapa/3-secoes-conversao`. Testado com a skill webapp-testing (Playwright) em 390px (celular) e 1440px (computador): rolagem e snap dos depoimentos, setas e contador funcionando (inclusive teclado), sem passagem automática; no celular, arrastar e dica de rolagem visíveis. Formulário de contato: avisos exatos aparecem nos 3 grupos de escolha e nos 2 campos quando vazio, foco vai para o primeiro erro; WhatsApp formata corretamente para 10 e 11 dígitos; mensagem do WhatsApp conferida com a combinação "Outro" + "Projeto + Obra" + "mais de 200 m²", resultado idêntico ao spec; "Prefiro que me liguem" mostra a mensagem de erro aprovada (rota ainda não existe). Com `prefers-reduced-motion: reduce` emulado, a miniatura fica com `transform: none` (confirmado comparando dois instantes) e sem reduced motion ela anima continuamente. Rolagem por toda a página nos dois tamanhos sem erros no console e sem `scrollWidth` maior que `clientWidth` (nada vazando para os lados).
