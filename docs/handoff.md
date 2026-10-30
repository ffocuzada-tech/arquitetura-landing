# Handoff — Estúdio Vazio

> Estado atual do projeto. Reescrito por inteiro ao final de cada etapa.
> Histórico → PRs no GitHub. Decisões → docs/decisoes.md.

## 1. Onde estamos
Etapa: Melhoria – Layout das seções 01 a 04 | Status: aguardando revisão
Link do PR: https://github.com/ffocuzada-tech/arquitetura-landing/pull/5

## 2. Última entrega
Melhoria de layout concluída na branch `fix/layout-secoes-01-a-04`, a partir da prévia aprovada em `docs/referencia-layout.html`: novo visual para as seções 01 a 04 (textos e paleta mantidos, exceto os textos novos da seção 02). As seções 05, 06, hero, cabeçalho e rodapé não mudaram (D56).
- **01 Manifesto** — texto, números e foto reunidos num card Linho único (cantos 28px, foto como "janela" com 12px de respiro e cantos 16px). Números maiores (40px, Madeira) com traço Âmbar e contagem na entrada. "vazio" em itálico no título. Com mouse, o card inclina na direção do cursor com um brilho suave (D46–D49); celular e reduced motion ficam parados.
- **02 Projetos** — três cards iguais só de foto (cantos 24px, 4:4,6/4:5), que abrem um painel Névoa com texto e etiquetas ao clicar, tocar ou usar o teclado (`aria-expanded`, `Esc` fecha e devolve o foco). Painel no fluxo do card, sem barra de rolagem (D50–D52). Textos novos dos painéis, ligados aos depoimentos dos mesmos clientes.
- **03 Por que nós** — diferenciais em cards Linho com selo redondo colorido (Araucária/Madeira/Carvão); no hover a cor do selo preenche o card (D53, D54).
- **04 Processo** — trilho tracejado com progresso Âmbar de 2px; etapas em cartões (tracejado apagado, sólido e com sombra quando aceso); números 01–05 em 44px (D55). Lógica do `ScrollTrigger` mantida.
- Regra nova em `globals.css`: `@media (prefers-reduced-motion: reduce)` zera a duração de toda transição/animação CSS — necessária porque os cards de Projetos e Processo agora usam transições puras em CSS (abrir/fechar, acender), além dos efeitos já tratados via `gsap.matchMedia()`.
- Durante os testes, um bug real foi encontrado e corrigido: os `id`/`aria-controls` dos painéis de Projetos usavam o nome do projeto direto (ex.: `painel-Casa Araucária`, com espaço e acento). Passou a usar um `slug` sem espaços/acentos (ex.: `painel-casa-araucaria`), mais robusto.

## 3. Próximo passo
Revisão e merge desta melhoria pelo usuário. Depois, retomar o PR 5 – Ajustes finais e publicação, na branch `etapa/5-ajustes-publicacao`.

## 4. Pendências abertas
- Número de WhatsApp do projeto (`src/lib/contato.ts`, `NUMERO_WHATSAPP`, e rodapé).
- Testar o envio real pelo Gmail do projeto: cadastrar `GMAIL_USUARIO`, `GMAIL_SENHA_APP` (senha de app, com verificação em duas etapas) e `EMAIL_DESTINO` (local e na Vercel) e enviar um contato de teste de ponta a ponta.
- Avaliação final da miniatura no teste do site.
- Teste do pôr do sol em outro lugar do site (fora do escopo até aqui).
- Vídeo mais leve do hero para celular.
- Conferir a prévia de link no WhatsApp (imagem `hero-poster.webp`).
- README com prints de desktop e celular (fica para o PR 5).

## 5. Atenção
- Paleta, fontes, layout e textos já estão aprovados: não trocar (ver `docs/regras.md`, Parte 2). As seções 01 a 04 têm exceções de cantos registradas em D46–D55 (ver `docs/spec.md`, parte 5).
- A paleta não tem cor de erro/alerta nem branco puro: sombras e brilhos usam Carvão/Névoa com transparência, nunca uma cor nova.
- Next.js 16: consultar `node_modules/next/dist/docs/` antes de escrever código (ver `AGENTS.md`). O projeto tem Cache Components ativado: não usar `export const runtime` em rotas.
- Skills instaladas como pastas reais em `.claude/skills/` (frontend-design, webapp-testing, ui-ux-pro-max), sem `.agents/`, sem links e sem `skills-lock.json` (D31, D32).
- Efeitos de scroll usam `gsap.matchMedia()`: o markup/CSS já nasce visível; a animação só esconde e revela quando `prefers-reduced-motion: no-preference`. Para transições puras em CSS (hover, abrir/fechar), o `globals.css` agora zera a duração sob reduced motion.
- O carrossel de depoimentos calcula a largura da trilha por JavaScript (`getBoundingClientRect`) em vez de `calc(50vw - 50%)`: dentro de uma coluna de grid, a porcentagem do CSS resolve contra a largura da coluna, não do container inteiro.
- IDs/`aria-controls` gerados a partir de conteúdo (nomes de projetos etc.) devem usar um `slug` sem espaços/acentos, não o texto direto.
- `NUNCA` abrir, ler ou mostrar o conteúdo do `.env.local` (S1): só confirmar se existe.
- O próximo passo vem sempre do prompt atual; o handoff é só contexto.

## 6. Verificado em
30/10/2026 — `npm run lint` e `npm run build` sem erros na `fix/layout-secoes-01-a-04`. Testado com a skill webapp-testing (Playwright) em 390px e 1440px, rolando a página inteira: nenhuma rolagem horizontal e nenhum erro de console. 01 Manifesto: card com cantos e foto corretos, números contam na entrada, inclinação com o mouse confirmada pelo `transform` computado (1440px) e card parado com `prefers-reduced-motion: reduce`. 02 Projetos: os três cards abrem e fecham por clique, por teclado (Enter e `Esc`, com o foco voltando ao botão) e por toque; painel conferido em 390px e 1440px sem barra de rolagem (`scrollHeight` igual a `clientHeight` nos três cards) e com o texto aprovado completo; sem animação com reduced motion. 03 Por que nós: hover preenche o card com a cor do selo (cor do título confirmada mudando de Carvão para Névoa em 1440px); em 390px os cards ficam claros, sem hover. 04 Processo: etapas acendem com a rolagem e todas aparecem acesas com reduced motion (como antes, D4/PR2). Seções 05 e 06 conferidas visualmente sem alteração.
