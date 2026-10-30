# Decisões — Estúdio Vazio

> Uma linha por decisão. Nunca apagar. Se uma decisão mudar,
> adicionar uma nova linha indicando qual ela substitui.
> Decisões tomadas no planejamento (28 e 29/10/2026); detalhes em `docs/spec.md`.

| # | Data | Decisão | Motivo |
|---|---|---|---|
| D1 | 28/10/2026 | Estúdio Vazio: casas de madeira e vidro para quem já tem terreno na região de Pedra Azul; escritório em Vitória | Público médio/alto padrão que busca confiança para construir |
| D2 | 28/10/2026 | Ação principal "Agendar reunião" abre o WhatsApp com mensagem pronta; formulário como alternativa | Caminho mais curto até a conversa |
| D3 | 29/10/2026 | Hero com vídeo em loop (`public/videos/hero-loop.mp4`) e imagem parada enquanto carrega e para quem desativa animações | Prender a atenção sem pesar para quem não quer movimento |
| D4 | 29/10/2026 | Efeitos com GSAP + ScrollTrigger; 3D/WebGL fica para o futuro | Bom resultado com custo e risco baixos |
| D5 | 29/10/2026 | Pasta `public/videos/` como exceção à estrutura padrão | Separar vídeo de imagens |
| D6 | 29/10/2026 | Paleta de 9 cores tirada das imagens aprovadas; Pedra nunca como texto | Coerência com as fotos; contraste (WCAG) |
| D7 | 29/10/2026 | Fontes Newsreader + Hanken Grotesk + IBM Plex Mono | Serifa leve traz o calor da madeira e o tom de casa |
| D8 | 29/10/2026 | Logo "Canto aberto" + "Estúdio *Vazio*"; SVGs com texto em contorno | Lido como planta de arquitetura e funciona no favicon |
| D9 | 29/10/2026 | Ritmo de fundos Névoa/Linho com faixa Crepúsculo só nos depoimentos | Separar seções sem linhas e destacar a prova social |
| D10 | 29/10/2026 | Celular sem menu sanduíche: só logo + "Agendar" | Página curta, três links |
| D11 | 29/10/2026 | 5 depoimentos em cartões deslizantes, sem passagem automática (substitui "1 ou 2 depoimentos") | Mais prova social sem alongar a página |
| D12 | 29/10/2026 | Subpasta `public/images/depoimentos/` | Retratos são de clientes, não da equipe |
| D13 | 29/10/2026 | Seção 06 com fundo Linho liso e miniatura como maquete com sombra (substitui o fundo de pôr do sol) | Fundo mais calmo, reforça a ideia de maquete |
| D14 | 29/10/2026 | Miniatura flutua e inclina de leve (substitui "flutua e gira") | Imagem 2D não gira de verdade |
| D15 | 29/10/2026 | Imagem do pôr do sol fora do site por enquanto | Será testada em outro local com o site rodando |
| D16 | 29/10/2026 | Sem botão flutuante de WhatsApp | O cabeçalho fixo já mostra "Agendar" |
| D17 | 29/10/2026 | Sem banner de cookies, desde que o site não use rastreamento | Não há cookies a autorizar |
| D18 | 29/10/2026 | Formulário: "Prefiro que me liguem" envia por e-mail ao escritório (substitui "Prefiro enviar por e-mail") | A pessoa não informa e-mail; o escritório retorna por telefone |
| D19 | 29/10/2026 | Rodapé sem endereço e sem coluna de redes sociais | Endereço fictício pode coincidir com um real; não existe Instagram do estúdio |
| D20 | 29/10/2026 | CAU em formato fictício: "CAU A000000-0" | Portfólio com empresa fictícia |
| D21 | 29/10/2026 | Âncoras `#inicio`, `#manifesto`, `#projetos`, `#por-que-nos`, `#processo`, `#depoimentos`, `#contato` | Navegação do menu e do "Ver projetos →" |
| D22 | 29/10/2026 | `favicon.svg` vira `src/app/icon.svg`; `favicon.ico` e `apple-icon.png` em `src/app/` | O Next.js reconhece esses arquivos sozinho |
| D23 | 29/10/2026 | Divisão dos PRs conforme `docs/spec.md`, parte 9 | Uma etapa por PR, do esqueleto à publicação |
| D24 | 29/10/2026 | Exceção à regra G1: só o projeto recém-criado pelo `create-next-app` (Next.js 16.4.3), sem alterações, foi direto para a `main` | O PR 1 mostra só o trabalho real e a Vercel já sobe com um site funcionando |
| D25 | 29/10/2026 | PR 1 dividido em 3 prompts (1A projeto · 1B docs e leitura das skills · 1C estrutura e PR) | Paradas obrigatórias: conexão da Vercel e leitura das skills (S5) |
| D26 | 29/10/2026 | `AGENTS.md` criado pelo Next.js é mantido e citado no `CLAUDE.md` (item 5) | O Next.js 16 é mais novo que o conhecimento do Claude Code; a documentação instalada evita código desatualizado |
| D27 | 29/10/2026 | frontend-design e webapp-testing instaladas pelo `npx skills add` | Lidas antes (S5); a primeira é só texto, a segunda roda só comandos locais |
| D28 | 29/10/2026 | UI/UX Pro Max pelo `npx ui-ux-pro-max-cli init --ai claude`, dentro do repositório, sem token e sem usar o gerador de design system (substitui o `uipro-cli` da Base) | O `uipro-cli` está desatualizado; paleta e fontes já aprovadas |
| D29 | 29/10/2026 | Coleta de dados de uso do pacote `skills` desligada; `.claude/settings.local.json` fora do GitHub | Projeto sem rastreamento; configuração pessoal não vai para o repositório |
| D30 | 29/10/2026 | Site sem modo escuro automático | Cada seção tem o fundo definido na identidade aprovada |
| D31 | 29/10/2026 | Skills como pastas reais só em `.claude/skills/`, sem `.agents/`, sem links e sem `skills-lock.json` | Atalhos não funcionam bem no Git do Windows; as skills são só para o Claude Code |
| D32 | 29/10/2026 | Das 7 skills instaladas pelo `ui-ux-pro-max-cli`, fica só a `ui-ux-pro-max`; as 6 extras (banner-design, brand, design, design-system, slides, ui-styling) foram removidas | O Claude Code escolhe skills pela descrição; skills de marca e design system poderiam propor mudanças na identidade já aprovada |
| D33 | 29/10/2026 | PR 2 feito em um prompt só (seções e efeitos juntos), em vez dos 2 prompts aprovados | Após uma falha de conexão, o Claude Code retomou pelo handoff e executou tudo de uma vez; o resultado foi revisado e aceito |
| D34 | 29/10/2026 | GSAP só pelo pacote `gsap` (ScrollTrigger e SplitText incluídos); limpeza das animações com `gsap.matchMedia()` e `revert()` no `useEffect`, sem `@gsap/react` | Mesmo resultado com um pacote a menos; o `matchMedia` também cuida do reduced motion |
| D35 | 29/10/2026 | Ícones do "Por que nós" desenhados em SVG próprio, sem biblioteca | Traço fino no estilo do logo |
| D36 | 29/10/2026 | No celular, escurecimento no pé do vídeo do hero e "Ver projetos →" / "Role para conhecer" em Névoa | Legibilidade sobre a parte escura da foto (Q2) |
| D37 | 29/10/2026 | Depoimentos com rolagem horizontal nativa (scroll-snap) e um componente para setas, contador e barra, sem biblioteca | Nenhum pacote novo; arrastar no celular funciona naturalmente |
| D38 | 29/10/2026 | "Prefiro que me liguem" envia para `/api/contato`, rota criada só no PR 4; até lá mostra a mensagem de erro aprovada | O envio depende do Gmail do projeto (PR 4) |
| D39 | 29/10/2026 | Os dois botões do formulário exigem as 3 escolhas, o nome e o WhatsApp | Mensagem sempre completa; mesmas regras nos dois caminhos |
| D40 | 29/10/2026 | Campo WhatsApp formatado ao digitar como (27) 9 0000-0000, válido com 10 ou 11 dígitos, sem biblioteca | Facilita o preenchimento e garante o DDD |
| D41 | 30/10/2026 | Envio do formulário pelo Gmail do projeto com o pacote `nodemailer` e senha de app | Padrão para Gmail, sem serviço pago |
| D42 | 30/10/2026 | Proteção contra robôs com campo invisível (honeypot), sem captcha | Sem serviço de terceiros e sem atrapalhar quem preenche |
| D43 | 30/10/2026 | E-mail com assunto "Novo contato pelo site: {nome}", as respostas e um link para responder pelo WhatsApp; nada guardado no site | Resposta rápida pelo escritório; LGPD (S4) |
| D44 | 30/10/2026 | Projeto duplicado `arquitetura-landing-f9pt` apagado na Vercel; fica só `arquitetura-landing` | Uma prévia por PR e variáveis de ambiente cadastradas uma vez só |
| D45 | 30/10/2026 | Texto da política de privacidade aprovado (linguagem simples, LGPD) | Transparência sobre os dados do formulário |
| D46 | 30/10/2026 | 01 Manifesto: texto, números e foto num card Linho com cantos de 28px; foto dentro como janela, 12px de respiro e cantos de 16px | Unir texto e foto e acabar com o vão embaixo do texto |
| D47 | 30/10/2026 | 01 Manifesto: card inclina na direção do cursor (até ~4° e 5°), com brilho que acompanha o mouse; celular parado; reduced motion parado | Animação interativa escolhida entre três testadas (Janela e Raio de sol descartadas) |
| D48 | 30/10/2026 | 01 Manifesto: números dentro do card, 40px em Madeira, com traço Âmbar e contagem na entrada | Números menores e com destaque de cor; Âmbar não serve como texto em fundo claro |
| D49 | 30/10/2026 | 01 Manifesto: "vazio" em itálico no título | Eco do logo |
| D50 | 30/10/2026 | 02 Projetos: três cards iguais só de foto, cantos de 24px, 4:4,6 (celular 4:5), nome e "local · área" sobre degradê; substitui a composição 7 + 5 | Fotos maiores, mesmo padrão e sem o vão embaixo da foto grande |
| D51 | 30/10/2026 | 02 Projetos: card inteiro é botão; abre um painel Névoa com texto e etiquetas, sem barra de rolagem (painel no fluxo); × só aberto; Esc fecha | Cards interativos com informação dentro, acessíveis por teclado e toque |
| D52 | 30/10/2026 | 02 Projetos: textos novos dos painéis e etiquetas de pavimentos (ver spec) | Cada casa ligada ao depoimento do mesmo cliente |
| D53 | 30/10/2026 | 03 Por que nós: título fixo à esquerda; diferenciais em cards Linho com cantos de 24px e selo redondo Araucária / Madeira / Carvão | Sair da lista simples mantendo o layout antigo |
| D54 | 30/10/2026 | 03 Por que nós: no hover a cor do selo preenche o card e o texto fica claro; celular sem hover | Interação discreta; versão sempre colorida descartada por pesar |
| D55 | 30/10/2026 | 04 Processo: trilho tracejado com progresso Âmbar de 2px; etapas em cartões de 18px (tracejado apagado, sólido aceso); números 01–05 em 44px; texto 15px | Combinar com os cards arredondados e mostrar "projeto → obra" |
| D56 | 30/10/2026 | 05 Depoimentos e 06 Contato sem mudança nesta melhoria | Escopo aprovado pelo usuário |
| D57 | 30/10/2026 | Melhoria feita num PR só, branch `fix/layout-secoes-01-a-04`; HTML da prévia em `docs/referencia-layout.html` como referência | Revisar tudo junto na prévia da Vercel |
