# Spec — Estúdio Vazio

> Especificação do site: o que ele é, quais seções tem e o que cada uma diz.
> Arquivo único, sem versões no nome: o Git guarda o histórico.
> Textos entre aspas são finais: copiar exatamente, sem reescrever.

---

## 1. Visão geral

| Item | Definição |
|---|---|
| Site | Landing page de arquitetura, parte de um portfólio |
| Empresa (fictícia) | Estúdio Vazio — escritório de arquitetura em Vitória/ES |
| O que faz | Projeta casas de madeira rústica com detalhes modernos e muito vidro |
| Público | Médio a alto padrão, que já tem sítio ou chácara na região de Pedra Azul (serra capixaba) e quer construir |
| Sensação | Conforto, paz e qualidade de vida em meio à natureza |
| Ação principal | "Agendar reunião": abre o WhatsApp com mensagem pronta |
| Ação alternativa | Formulário da seção 06: monta a mensagem do WhatsApp ou pede retorno por telefone |

**Conceito do nome:** o vazio como espaço livre e respiro (ligado ao *ma* japonês). É explicado no texto do manifesto.

**Posicionamento (orientação, não vai para o site):** o Estúdio Vazio projeta casas de madeira e vidro para quem comprou um terreno na região de Pedra Azul e quer viver com conforto em meio à natureza. O cliente já tem o terreno e busca confiança para transformar o sonho em obra.

---

## 2. Stack e recursos

- Next.js com App Router, TypeScript, Tailwind CSS e pasta `src/`. Deploy na Vercel (plano gratuito).
- Fontes carregadas com `next/font/google`.
- Imagens em WebP, exibidas com `next/image`.
- Animações com GSAP + ScrollTrigger. 3D/WebGL fica fora do escopo (evolução futura).
- Quem desativa animações (`prefers-reduced-motion`): sem animações, imagem parada no lugar do vídeo do hero, todas as etapas do processo acesas, textos e imagens já visíveis.
- Formulário: validação no servidor, envio por e-mail para o Gmail do projeto, nenhum dado guardado (LGPD).
- Sem rastreamento nem analytics, portanto sem banner de cookies.
- Sem botão flutuante de WhatsApp: o cabeçalho fixo já mostra "Agendar" o tempo todo.
- Sem aviso de "projeto de demonstração".

---

## 3. Mapa da página

| # | Seção | Âncora | Rótulo | Fundo | Objetivo |
|---|---|---|---|---|---|
| — | Cabeçalho | — | — | Transparente sobre o hero; Névoa ao rolar | Navegar e converter |
| 0 | Hero | `#inicio` | — | Vídeo | Prender em 3 segundos |
| 01 | Manifesto | `#manifesto` | 01 · Manifesto | Névoa | Identidade |
| 02 | Projetos | `#projetos` | 02 · Projetos | Linho | Provar competência |
| 03 | Por que nós | `#por-que-nos` | 03 · Por que nós | Névoa | Falar com quem já tem o terreno |
| 04 | Processo | `#processo` | 04 · Processo | Linho | Tirar o medo de começar |
| 05 | Depoimentos | `#depoimentos` | 05 · Depoimentos | Crepúsculo | Prova social |
| 06 | Contato | `#contato` | 06 · Contato | Linho | Converter (chamada final) |
| — | Rodapé | — | — | Crepúsculo | Confiança e legal |

- Menu: Projetos → `#projetos` · Processo → `#processo` · Contato → `#contato`.
- "Ver projetos →" (hero) leva a `#projetos`.
- Página extra: `/politica-de-privacidade` (texto definido no PR 4).
- Ritmo de fundos: Névoa e Linho se alternam e separam as seções sem linhas; a única faixa escura no meio (Crepúsculo) destaca os depoimentos.

---

## 4. Identidade

### Paleta

| Nome | Código | Papel |
|---|---|---|
| Névoa | `#F4EEE6` | Fundo principal; texto sobre fundos escuros |
| Linho | `#E8DED0` | Fundo alternado entre seções |
| Carvão | `#211A12` | Títulos e textos; texto do botão principal |
| Terra | `#5C5244` | Texto secundário e bordas de campos |
| Madeira | `#87582B` | Links e detalhes |
| Araucária | `#3E4A32` | Opção marcada no formulário, ícones |
| Pedra | `#9A9493` | Linhas decorativas — **nunca texto** |
| Âmbar | `#F0AA60` (hover `#E0954A`) | Botão principal; rótulos e detalhes no fundo escuro |
| Tarde | `#EAD6BC` | Cor do céu sobre o Processo (D58) |
| Crepúsculo | `#1C1724` | Cor do céu dos Depoimentos ao rodapé |

Contrastes conferidos (WCAG): Carvão/Névoa 14,9 · Terra/Névoa 6,6 · Madeira/Névoa 5,3 · Carvão/Âmbar 8,7 · Névoa/Araucária 8,2 · Névoa/Crepúsculo 15,2 · Âmbar/Crepúsculo 8,9. Pedra/Névoa 2,6: só decoração.

### Fontes (Google Fonts, via `next/font/google`)

| Papel | Fonte | Uso |
|---|---|---|
| Títulos e marca | Newsreader (300 nos títulos, 400 na marca) | Hero, títulos de seção, números do manifesto, nomes de projetos, depoimentos (itálico) |
| Textos | Hanken Grotesk (400, 500, 600) | Parágrafos, menu, botões, formulário |
| Rótulos | IBM Plex Mono | Numeração das seções, "local · área", contador |

### Logo

- Símbolo "Canto aberto": quadrado de traço fino com o canto superior direito aberto.
- Nome: "Estúdio *Vazio*" em Newsreader 400, com "Vazio" em itálico.
- Versões: horizontal (cabeçalho), empilhada, só símbolo (favicon).
- Cores: Carvão sobre fundos claros; Névoa sobre fundos escuros (versões `-claro`).
- Os SVGs já têm o texto em contorno: usar os arquivos, não recriar o logo em código.

---

## 5. Regras de layout

| Item | Computador | Celular |
|---|---|---|
| Largura máxima do conteúdo | 1200px | — |
| Margem lateral | 48px | 20px |
| Título do hero | `clamp(44px, 7.4vw, 112px)` | igual (fluido) |
| Títulos de seção | fluidos, tamanho próprio por seção (ver parte 6) | iguais |
| Texto | Hanken Grotesk 400, 16–18px | 16px |
| Rótulos | IBM Plex Mono, 12px, caixa-alta | igual |

- Espaçamentos em múltiplos de 8px.
- **Cantos (D68):** botões e opções do formulário em pílula (`999px`); campos de formulário 14px; fotos e cartões de 18 a 28px, conforme a seção (ver parte 6). Substitui a regra antiga de 4px/6px/foto reta.
- Botão principal: fundo Âmbar, texto Carvão, em pílula.
- Mobile-first.

### O céu (D58)

Desde o PR "Redesenho – Um dia na serra", a página não tem mais fundos alternados por seção: um elemento fixo atrás de tudo (o céu) muda de cor com a rolagem, como a luz de um dia na serra. As seções não pintam mais o próprio fundo.

| Da seção | Até a seção | Cor do céu |
|---|---|---|
| Início da página | Antes de Projetos | Névoa `#F4EEE6` |
| Projetos | Antes de Processo | Linho `#E8DED0` |
| Processo | Antes de Depoimentos | Tarde `#EAD6BC` |
| Depoimentos | Fim da página (rodapé) | Crepúsculo `#1C1724` |

- Um grão sutil (SVG de ruído, opacidade 0,07) cobre a página inteira, por cima do céu.
- Nas seções escuras (Depoimentos, Contato, Rodapé), o texto fica Névoa.
- O cabeçalho acompanha: transparente sobre o hero, Névoa quase opaca ao rolar (`solido`), Crepúsculo quase opaca dos Depoimentos até o fim (`escuro`).

### Os modos (D71)

Toda animação usa `gsap.matchMedia()` com um objeto de condições que **sempre** inclui uma condição verdadeira (`todos: "all"`). Sem essa condição, o código de animação não roda em navegadores que não batem com nenhuma das outras condições — foi o defeito que fez as animações não ligarem em celulares de verdade durante os testes.

- **`pino`** — computador (≥900px) com animação permitida: a rolagem trava a tela (`pin`) em alguns pontos (Manifesto, Projetos, Processo) para contar a história desses trechos num só lugar.
- **`movel`** — celular (<900px): sem travar a tela; nesses lugares a interação vira carrossel, folha (painel que sobe), palco fixo ou pilha para arrastar.
- **`mov`** — animação permitida (`prefers-reduced-motion: no-preference`). Pode ser verdadeiro tanto no `pino` quanto no `movel`.
- **Sem JavaScript, ou com `prefers-reduced-motion: reduce`:** a página fica completa e legível — nada fica escondido esperando uma animação para aparecer. No celular, quem desativa animações ainda usa o carrossel e o formulário em passos (que não dependem de movimento automático), só sem as transições deslizantes.

---

## 6. Seções

### Cabeçalho

- **Sobre o hero:** transparente.
- **Ao rolar (60px):** classe `solido` — fundo Névoa 86% com desfoque; o espaço interno diminui.
- **Dos Depoimentos até o fim (rodapé incluso):** classe `escuro` — fundo Crepúsculo 82%, logo clara (`logo-horizontal-claro.svg`), menu e botão em tons claros, botão Âmbar com texto Carvão.
- **Menu:** "Projetos · Processo · Contato", com sublinhado que desliza da direita para a esquerda no hover.
- **Botão "Agendar reunião"/"Agendar":** em pílula; abre o WhatsApp com a mensagem: "Olá, Estúdio Vazio! Vim pelo site e gostaria de agendar uma reunião sobre o meu terreno."
- **Celular (D67):** some ao rolar para baixo (depois de 240px) e volta ao rolar para cima.

### 0 · Hero

- **Título:** "A casa que a serra estava *esperando.*" ("esperando." em itálico), `clamp(44px, 7.4vw, 112px)`.
- **Subtítulo:** "Projetamos casas de madeira e vidro para quem já tem um terreno na região de Pedra Azul e quer viver em meio à natureza."
- **Botões:** "Agendar reunião" (principal, em pílula, seta num círculo) · "Ver projetos →" (sublinhado, leva a `#projetos`).
- **Indicação:** "Role para conhecer", com uma linha que pulsa (só no computador).
- **Computador:** altura da tela (mínimo 600px), vídeo de fundo, texto à esquerda, véu Névoa vindo da esquerda. Ao rolar, o vídeo aproxima (`scale` até 1,12) e o texto sobe e some.
- **Celular:** vídeo na tela toda, recortado na casa (posição horizontal ~74%). Título e subtítulo em cima, com véu Névoa de cima para baixo.
- **Bruma:** faixa de 34vh na base do vídeo que dissolve a imagem na Névoa da página (D59), para o céu continuar a transição sem corte.
- **Vídeo:** `hero-loop.mp4` em loop, sem som, reprodução automática, `hero-poster.webp` enquanto carrega. Decorativo: escondido dos leitores de tela. Com `prefers-reduced-motion: reduce`, o vídeo não é baixado: fica só o pôster.
- **Efeito:** cada palavra do título sobe dentro de uma máscara, uma de cada vez.

### 01 · Manifesto

Duas partes (D60), uma depois da outra:

**Parte 1 — o texto que acende**
- Rótulo "01 · Manifesto" e o título "O vazio é onde a vida acontece." em itálico Madeira, pequeno, ao lado do rótulo.
- Os dois parágrafos aprovados em Newsreader 300, `clamp(25px, min(3.05vw, 4.9vh), 46px)`:
  - "Queríamos transformar nosso lar num lugar de paz: silêncio, luz natural e a mata por perto. Foi desenhando essa casa que entendemos o que mais importa nela, o espaço livre entre as coisas, por onde passam a luz, o ar e a paisagem."
  - "Daí vem o nosso nome. Hoje levamos esse mesmo cuidado para quem tem um pedaço de serra e quer viver nele com conforto e segurança."
- Cada palavra começa apagada (opacidade 0,13) e acende até opacidade 1 com a rolagem. No computador (`pino`), a tela trava por 130% da altura; no celular, sem travar.

**Parte 2 — a janela que se abre**
- Área de 100svh com a foto `manifesto-interior.webp` (alt na parte 8).
- A tela trava por 150% e a foto vai de recortada (`inset(25% 37% 25% 37% round 22px)`, celular `inset(24% 16% 30% 16% round 20px)`) até a tela inteira, com a imagem indo de `scale(1.3)` a `1`.
- Só no `pino`: as palavras decorativas "o espaço" e "livre" (Newsreader itálico Carvão) ficam dos dois lados da janela pequena e se afastam até sumir.
- No fim, um véu escuro na base e os três números sobre a foto, em Névoa, cada um com um traço Âmbar de 28×2px acima: "12 anos" · "projetando na serra" / "38 casas" · "entregues" / "100%" · "das obras acompanhadas por nós".
- Sem animação (`reduz`): a foto aparece inteira, com os números já visíveis.

### 02 · Projetos

- **Rótulo e título:** "02 · Projetos", "Casas que já nasceram *na serra*" ("na serra" em itálico Madeira).
- **Link:** "Agendar reunião →".
- **Casas (D61):** foto com cantos de 24px; nome grande sobre a foto com a segunda parte em itálico ("Casa *Araucária*", "Casa do *Vale*", "Refúgio da *Neblina*"); local em Plex Mono embaixo do nome; abaixo da foto, a área em Newsreader Madeira 44px, o parágrafo aprovado (D52) e duas etiquetas (D70).

| Nome | Local | Área | Etiquetas | Parágrafo |
|---|---|---|---|---|
| Casa Araucária | Domingos Martins · Pedra Azul | 180 m² | `2 pavimentos` · `Base de pedra` | "Dois pavimentos com fachada de vidro do chão ao telhado, de frente para a Pedra Azul. A base de pedra vence o desnível do terreno, e a sala vira mirante nas manhãs de neblina." |
| Casa do Vale | Venda Nova do Imigrante | 140 m² | `Térrea` · `Varanda corrida` | "Térrea e comprida, com varanda corrida na borda do vale. Feita para quem trabalha de casa: luz natural o dia inteiro e vidro duplo para as noites frias." |
| Refúgio da Neblina | Marechal Floriano | 95 m² | `1 pavimento` · `Horta` | "Pequena e num andar só, do jeito que os moradores pediram: madeira escura, varanda para ver a chuva chegar e a horta a poucos passos da porta." |

- **Computador (`pino`):** a seção trava; a trilha (introdução + casas) corre na horizontal conforme a rolagem; cada casa com `min(62vw, 1100px)` de largura; a foto se move de leve (parallax) e o nome sobe ao entrar; embaixo, contador "01 / 03", linha de progresso e "Pedra Azul → Marechal Floriano". Dica "Continue rolando".
- **Celular:** barras estilo Stories acima do carrossel; carrossel nativo com `scroll-snap`, cards de 84% de largura; chip "Toque para ver +"; toque abre uma **folha** (painel que sobe de baixo) com foto, local, nome, área, parágrafo, etiquetas e o botão "Agendar reunião" — fecha com ×, toque no fundo, `Esc` ou arrastando para baixo; o último card tem respiro igual aos outros (espaçador, não padding) e encaixe garantido no fim do carrossel; vibração de 6ms ao trocar de casa.
- **Fotos:** `casa-araucaria.webp`, `casa-do-vale.webp`, `refugio-da-neblina.webp` (textos alternativos: ver parte 8).
- **Sem animação no computador:** introdução e casas empilhadas, texto visível, largura máxima de 1376px.

### 03 · Por que nós

- **Título:** "Uma casa pensada para a serra, *não adaptada a ela.*" (itálico Madeira) e a frase de apoio: "Para quem já tem o terreno e quer ter certeza de que a casa vai funcionar ali."
- **Itens (D62, etiqueta nova entre parênteses — D70):**
  1. ("O terreno") **"Projeto para terreno de serra"** — "Desnível, sol da manhã, vento e neblina entram no desenho desde a primeira visita. A casa se encaixa no terreno, em vez de brigar com ele."
  2. ("O conforto") **"Madeira e vidro, com conforto no frio"** — "Vidro duplo, madeira tratada e isolamento pensados para as noites frias da serra. Muita luz durante o dia, casa quente à noite."
  3. ("A obra") **"Acompanhamos a obra até as chaves"** — "Visitamos a obra com frequência e tiramos as dúvidas do construtor. O que foi desenhado é o que você recebe."
- **Computador:** linhas finas entre os itens; título grande dentro de uma máscara, que sobe na entrada; no hover, o título desliza 28px e fica Madeira, o texto fica Carvão. Só com mouse fino, uma foto de detalhe (320px, 5:3, cantos de 18px) segue o cursor e troca conforme o item (`detalhe-pedra.webp`, `detalhe-vidro.webp`, `detalhe-obra.webp`; decorativa).
- **Celular:** cartões coloridos (Araucária, Madeira, Carvão) que se empilham (`sticky`), cantos de 26px; o de trás encolhe e escurece enquanto o próximo sobe; foto de detalhe em cima de cada cartão (16:10).
- **Reduced motion:** sem animações; sem a foto que segue o cursor.

### 04 · Processo

- **Título:** "Do terreno à chave, *em cinco passos*" (itálico Madeira) e a frase de apoio: "Você sabe desde o começo o que acontece em cada etapa."
- **Etapas (D63), com a figura entre parênteses:**
  1. **"Visita ao terreno"** (Levantamento, desenho SVG de curvas de nível) — "Vamos até o terreno entender o sol, o vento, o desnível e a vista."
  2. **"Conceito"** (Croqui, `etapa-croqui.webp`) — "Primeiros croquis e uma conversa sobre como você quer viver na casa."
  3. **"Projeto"** (Planta baixa, desenho SVG) — "Plantas, cortes e detalhes de madeira e vidro, prontos para aprovação na prefeitura."
  4. **"Visualização 3D"** (Maquete 3D, `etapa-maquete.webp`) — "Você percorre a casa antes de ela existir e ajusta o que quiser."
  5. **"Obra"** (Casa entregue, `casa-araucaria.webp`) — "Acompanhamos a construção de perto até a entrega das chaves."
- **Computador (`pino`):** a tela trava por 420%; as etapas ficam sobrepostas (texto à esquerda, figura à direita); cada figura nova entra por cima da anterior, da esquerda para a direita; o texto anterior sai para cima e o novo entra de baixo; embaixo, 5 marcas com barras que se preenchem.
- **Celular:** um palco fixo no alto (`sticky`) mostra as figuras sobrepostas, com pontinhos de progresso (decorativo); as figuras originais de cada etapa ficam escondidas; a etapa ativa fica em opacidade 1 e as outras em 0,28; vibração de 8ms ao trocar.
- **Desenhos:** `DesenhoTerreno` e `DesenhoPlanta` (SVG, `src/components/ui/desenhos/`), com `role="img"` e `aria-label` descrevendo o desenho.
- **Sem animação:** lista de etapas com texto e figura lado a lado (computador) ou empilhados (celular), tudo visível; no celular, sem o palco — a figura de cada etapa aparece junto do texto dela.

### 05 · Depoimentos

- **Título:** "Quem já mora na serra" e a frase de apoio: "Cinco casas, cinco terrenos diferentes."
- **Bruma:** três elipses Névoa desfocadas no topo da seção, decorativas.
- **Depoimentos:**

| Cliente | Casa · local | Depoimento | Detalhe | Foto |
|---|---|---|---|---|
| Helena e Rafael Moraes | Casa Araucária · Pedra Azul | "Tínhamos o terreno havia cinco anos e não sabíamos por onde começar. Hoje a gente toma café vendo a neblina passar na frente da Pedra Azul." | "Moram na casa desde 2023" | `moraes.webp` |
| Juliana Prates | Casa do Vale · Venda Nova do Imigrante | "Trabalho de casa e queria luz o dia inteiro sem passar frio à noite. Me explicaram cada escolha, e o vidro duplo fez toda a diferença." | "Home office na serra desde 2024" | `prates.webp` |
| Antônio e Cida Bertoldi | Refúgio da Neblina · Marechal Floriano | "Casa pequena, do jeito que a gente pediu: tudo num andar só, perto da horta, com uma varanda para ver a chuva chegar." | "Aposentados · 95 m²" | `bertoldi.webp` |
| Família Zanotti | Casa Bromélia · Domingos Martins | "O terreno era todo em desnível e três construtores disseram que não dava. A casa ficou em cima do morro e as crianças vivem no gramado." | "Projeto + Obra · 2022" | `zanotti.webp` |
| Marcos Lyra | Casa do Mirante · Pedra Azul | "Moro em Vitória e não podia ir à obra toda semana. Recebia fotos e relatório a cada visita. Quando peguei a chave, estava tudo como no 3D." | "Casa de fim de semana · 2025" | `lyra.webp` |

- **Computador (D64):** um depoimento por vez — aspas grandes em Âmbar à esquerda; à direita o texto (Newsreader itálico, `clamp(26px, 3.3vw, 50px)`), a foto de 72px com anel Âmbar, nome, "casa · local" em Âmbar e o detalhe. A troca sai para cima e entra de baixo. Embaixo: 5 rostos clicáveis (o atual com anel e `aria-current`), contador "01 / 05" e as setas.
- **Celular:** uma pilha de cartões Névoa (cantos de 26px, altura de 400px); os três de cima ficam visíveis, cada um 14px mais baixo e 5% menor. Arrastar o cartão de cima com o dedo: ele segue o dedo e gira; passando de 90px, sai voando e vai para o fim da pilha (vibração de 12ms); antes disso, volta ao lugar. Rostos, setas e contador continuam funcionando, sincronizados com a pilha. Dica "Arraste para o lado →".
- **Sem passagem automática.**
- **Setas (texto só para leitores de tela):** "Depoimento anterior" e "Próximo depoimento".

### 06 · Contato

- **Título:** "Conte sobre seu *terreno*" ("terreno" em Âmbar itálico), `clamp(40px, 5.4vw, 88px)`.
- **Frase de apoio:** "Três perguntas rápidas. Montamos a mensagem e você fala direto com o escritório pelo WhatsApp."
- **Perguntas (opções em pílula, marcada em Araucária com texto Névoa):**
  - "O que você precisa?" — Projeto · Projeto + Obra
  - "Onde fica o terreno?" — Pedra Azul · Domingos Martins · Venda Nova do Imigrante · Marechal Floriano · Outro
  - "Tamanho aproximado da casa" — até 100 m² · 100 a 200 m² · mais de 200 m²
- **Campos (cantos de 14px):** "Nome" (exemplo: "Seu nome") · "WhatsApp" (exemplo: "(27) 9 0000-0000"); lado a lado a partir de 600px.
- **Botão principal:** "Agendar reunião pelo WhatsApp" — abre o WhatsApp com a mensagem:
  "Olá, Estúdio Vazio! Meu nome é {nome}. Tenho um terreno em {local} e quero {projeto / projeto e obra} para uma casa de {tamanho}. Gostaria de agendar uma reunião."
  - Quando o local for "Outro": "Tenho um terreno em outra cidade da região".
- **Botão secundário:** "Prefiro que me liguem" — envia os dados para `/api/contato`, que manda um e-mail ao escritório.
- **Aviso LGPD (abaixo dos botões):** "Usamos seus dados só para responder ao seu contato. Política de privacidade" (link para `/politica-de-privacidade`).
- **Avisos:**
  - Campo vazio: "Escolha uma opção." / "Informe seu nome." / "Informe um WhatsApp com DDD."
  - Enviado: "Recebemos seu contato. Retornamos em até 1 dia útil."
  - Erro: "Não foi possível enviar agora. Tente de novo ou fale com a gente pelo WhatsApp."
- **Computador (D65):** 5/6 colunas — miniatura à esquerda, cartão do formulário à direita. Cartão Névoa, cantos de 28px, sombra profunda.
- **Miniatura:** `miniatura-terreno.webp`, flutua e inclina de leve sobre uma luz Âmbar radial, com sombra escura embaixo; a sombra diminui quando ela sobe e cresce quando desce.
- **Celular, formulário em passos:** 4 passos — as 3 perguntas e depois Nome + WhatsApp juntos. Topo do cartão: "Passo X de 4", "← Voltar" (escondido no passo 1) e uma barra de progresso Araucária. Cada passo entra deslizando da direita; a pergunta do passo em Newsreader 28px, opções maiores, ocupando a largura. Tocar numa opção avança sozinho depois de 320ms (vibração de 8ms), mesmo se já estava marcada. Botões e aviso LGPD só aparecem no último passo. Se a validação falhar num campo de um passo anterior, volta para esse passo antes de focar o campo.
- **Sem animação:** os passos funcionam igual, sem deslizar.

### Rodapé

- **Frase:** "Casas de madeira e vidro para quem escolheu viver na serra capixaba." (Newsreader 20px, à esquerda).
- **Coluna Contato:** WhatsApp e e-mail — **espaço reservado** até o usuário criar o número; rótulo Âmbar.
- **Coluna Escritório:** "Vitória · ES" / "Atendimento com hora marcada" / "Seg. a sex., das 9h às 18h". Sem endereço, sem coluna de redes sociais; rótulo Âmbar.
- **Marca enorme (D66):** "Estúdio *Vazio*" ("Vazio" em itálico Âmbar), `clamp(64px, 15.5vw, 250px)`, numa linha só (`white-space: nowrap`), dentro de uma máscara — sobe ao aparecer na tela. Decorativa (`aria-hidden`).
- **Linha final:** "© 2026 Estúdio Vazio · CAU A000000-0" e "Política de privacidade" (link).
- **Celular:** uma coluna.

### Barra de ação no celular (D67)

Botão "Agendar reunião →" Âmbar em pílula, fixo no canto inferior direito, respeitando a área segura (`env(safe-area-inset-bottom)`). Aparece do Manifesto (`top 40%`) até o Contato (`top 85%`) e sobe de baixo. Só no `movel`; usa o link de WhatsApp atual.

### Página `/politica-de-privacidade`

Texto definido no PR 4. Deve explicar: quais dados o formulário recebe, que são usados só para responder ao contato, que não são guardados e que o site não usa cookies de rastreamento.

---

## 7. Google e prévia de link

- **Título:** "Estúdio Vazio · Casas de madeira e vidro na serra capixaba"
- **Descrição:** "Projetos de casas de madeira e vidro para quem tem terreno na região de Pedra Azul (ES). Da visita ao terreno à entrega das chaves."
- **Imagem da prévia:** `hero-poster.webp`. Conferir no teste se o WhatsApp mostra a prévia; se não mostrar, gerar uma versão .jpg.
- **Idioma da página:** `pt-BR`.

---

## 8. Assets

Arquivos guardados pelo usuário em `C:\projetos\assets-estudio-vazio`, numa pasta que já repete a estrutura do projeto (`public\...` e `src\app\`) com os nomes finais. O usuário copia as pastas `public` e `src` para dentro do projeto (substituindo o `favicon.ico` padrão do Next.js).

| Arquivo no projeto | Texto alternativo |
|---|---|
| `public/videos/hero-loop.mp4` | decorativo |
| `public/images/hero/hero-poster.webp` | decorativo |
| `public/images/geral/manifesto-interior.webp` | "Sala de uma casa de madeira com parede de vidro do chão ao teto, uma poltrona e uma mesa baixa com café, de frente para as araucárias e a Pedra Azul." |
| `public/images/geral/miniatura-terreno.webp` (fundo transparente) | decorativo |
| `public/images/projetos/casa-araucaria.webp` | "Casa de madeira com fachada de vidro do chão ao telhado e base de pedra, entre araucárias, com a Pedra Azul ao fundo." |
| `public/images/projetos/casa-do-vale.webp` | "Casa térrea e comprida de madeira e vidro, com varanda corrida, na borda de um vale com neblina ao entardecer." |
| `public/images/projetos/refugio-da-neblina.webp` | "Casa pequena de madeira escura com varanda e janelas acesas, ao lado de uma horta, numa clareira com neblina." |
| `public/images/detalhes/detalhe-pedra.webp` (D69) | decorativa |
| `public/images/detalhes/detalhe-vidro.webp` (D69) | decorativa |
| `public/images/detalhes/detalhe-obra.webp` (D69) | decorativa |
| `public/images/processo/etapa-croqui.webp` (D69) | "Croqui a lápis da casa de madeira e vidro entre araucárias." |
| `public/images/processo/etapa-maquete.webp` (D69) | "Maquete branca da casa, sem cores, no terreno." |
| `public/images/depoimentos/moraes.webp` | "Helena e Rafael Moraes na varanda de casa." |
| `public/images/depoimentos/prates.webp` | "Juliana Prates na varanda de casa." |
| `public/images/depoimentos/bertoldi.webp` | "Antônio e Cida Bertoldi na varanda de casa." |
| `public/images/depoimentos/zanotti.webp` | "Casal Zanotti na varanda de casa." |
| `public/images/depoimentos/lyra.webp` | "Marcos Lyra na varanda de casa." |
| `public/images/logo/logo-horizontal.svg`, `logo-horizontal-claro.svg`, `logo-empilhado.svg`, `logo-empilhado-claro.svg`, `simbolo.svg` | "Estúdio Vazio" |
| `src/app/favicon.ico` | — |
| `src/app/icon.svg` | — |
| `src/app/apple-icon.png` | — |

**Ficam fora do repositório:** `hero-base-aprovada.png`, `vids-original.mp4`, `ref-miniatura-isometrica.png`, `cta-por-do-sol.jpg` (guardada para teste futuro) e os originais em alta resolução.

**Exceções à estrutura padrão da Base:** pasta `public/videos/` e subpastas `public/images/depoimentos/`, `public/images/detalhes/` e `public/images/processo/` (D69).

---

## 9. Divisão dos PRs

| PR | Branch | Entrega |
|---|---|---|
| PR 1 – Estrutura | `etapa/1-estrutura` | Projeto Next.js, skills, pastas, docs, fontes, paleta, assets no lugar, metadados, cabeçalho e rodapé, página com as seções vazias e as âncoras |
| PR 2 – Seções principais | `etapa/2-secoes-principais` | Hero, manifesto, projetos, por que nós e processo, com os efeitos |
| PR 3 – Seções de conversão | `etapa/3-secoes-conversao` | Depoimentos e seção 06 (visual + mensagem do WhatsApp) |
| PR 4 – Integrações | `etapa/4-integracoes` | Envio por e-mail (`/api/contato`), política de privacidade, número e e-mail reais |
| PR 5 – Ajustes e publicação | `etapa/5-ajustes-publicacao` | Ajustes finais, testes, README com prints, publicação |

---

## 10. Fora do escopo / evoluções futuras

- Miniatura e casa em 3D com WebGL.
- Versão mais leve do vídeo do hero para celular (decidir com o site pronto).
- Testar o pôr do sol em outro lugar (faixa antes da seção 06 ou fundo do rodapé).
- Redes sociais do estúdio.

## 11. Pendências

- Número de WhatsApp do projeto (rodapé, botões e formulário).
- Gmail do projeto com verificação em duas etapas (envio do formulário).
- Avaliação final da miniatura no teste do site.
