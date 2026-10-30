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
| Crepúsculo | `#1C1724` | Fundo da seção 05 e do rodapé |

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
| Colunas | 12 | 4 |
| Margem lateral | 48px | 20px |
| Espaço entre seções | 128px | 80px |
| Título do hero | Newsreader 300, 72px | 40px |
| Títulos de seção | Newsreader 300, 48px | 32px |
| Texto | Hanken Grotesk 400, 18px | 16px |
| Rótulos | IBM Plex Mono, 12px, caixa-alta | igual |

- Espaçamentos em múltiplos de 8px; título → texto: 24px.
- Cantos: fotos retas; botões e campos 4px; cartões 6px.
- Botão principal: fundo Âmbar, texto Carvão.
- Mobile-first.

---

## 6. Seções

### Cabeçalho

- **Sobre o hero:** transparente. Logo horizontal, menu "Projetos · Processo · Contato", botão "Agendar reunião" com fundo Carvão.
- **Ao rolar:** fixo no topo, fundo Névoa quase opaco, linha fina Linho embaixo, um pouco mais baixo.
- **Celular:** sem menu sanduíche; só logo + botão "Agendar".
- **Botão "Agendar reunião"/"Agendar":** abre o WhatsApp com a mensagem: "Olá, Estúdio Vazio! Vim pelo site e gostaria de agendar uma reunião sobre o meu terreno."

### 0 · Hero

- **Título:** "A casa que a serra estava esperando."
- **Subtítulo:** "Projetamos casas de madeira e vidro para quem já tem um terreno na região de Pedra Azul e quer viver em meio à natureza."
- **Botões:** "Agendar reunião" (principal, mesma mensagem do cabeçalho) · "Ver projetos →" (leva a `#projetos`).
- **Indicação:** "Role para conhecer".
- **Computador:** altura da tela (mínimo 600px), vídeo de fundo, texto à esquerda sobre o céu, véu Névoa vindo da esquerda, leve escurecimento no pé do vídeo. "Role para conhecer" no canto inferior esquerdo.
- **Celular:** vídeo na tela toda, recortado na casa (posição horizontal ~74%). Título e subtítulo em cima, no céu, com véu Névoa de cima para baixo. Botões embaixo, ao alcance do polegar.
- **Vídeo:** `hero-loop.mp4` em loop, sem som, reprodução automática, `hero-poster.webp` enquanto carrega. Decorativo: escondido dos leitores de tela.
- **Efeito:** texto sobe linha a linha.

### 01 · Manifesto (Névoa)

- **Título:** "O vazio é onde a vida acontece."
- **Texto:**
  - "Queríamos transformar nosso lar num lugar de paz: silêncio, luz natural e a mata por perto. Foi desenhando essa casa que entendemos o que mais importa nela, o espaço livre entre as coisas, por onde passam a luz, o ar e a paisagem."
  - "Daí vem o nosso nome. Hoje levamos esse mesmo cuidado para quem tem um pedaço de serra e quer viver nele com conforto e segurança."
- **Números:** "12 anos" · "projetando na serra" / "38 casas" · "entregues" / "100%" · "das obras acompanhadas por nós".
- **Layout:** texto à esquerda (6 colunas), foto vertical 4:5 à direita (5 colunas), uma coluna de respiro. Números numa linha própria embaixo, Newsreader 300 grande, separados por linhas finas Pedra. Celular: texto, foto e números empilhados.
- **Foto:** `manifesto-interior.webp`.
- **Efeitos:** texto sobe; imagem surge de um recorte.

### 02 · Projetos (Linho)

- **Título:** "Casas que já nasceram na serra"
- **Link no alto:** "Agendar reunião →" (mesma mensagem do cabeçalho).
- **Projetos:**

| Nome | Local · área | Foto |
|---|---|---|
| Casa Araucária | Domingos Martins · Pedra Azul · 180 m² | `casa-araucaria.webp` |
| Casa do Vale | Venda Nova do Imigrante · 140 m² | `casa-do-vale.webp` |
| Refúgio da Neblina | Marechal Floriano · 95 m² | `refugio-da-neblina.webp` |

- **Layout:** composição de revista. Casa Araucária grande à esquerda (7 colunas); as outras duas empilhadas à direita (5 colunas). Fotos 4:3. Embaixo de cada foto: nome (Newsreader) e "local · área" (IBM Plex Mono). Sem página de detalhe. Celular: os três empilhados, mesmo tamanho.
- **Efeito:** imagens surgem de um recorte.

### 03 · Por que nós (Névoa)

- **Título:** "Uma casa pensada para a serra, não adaptada a ela."
- **Frase de apoio:** "Para quem já tem o terreno e quer ter certeza de que a casa vai funcionar ali."
- **Itens:**
  1. **"Projeto para terreno de serra"** — "Desnível, sol da manhã, vento e neblina entram no desenho desde a primeira visita. A casa se encaixa no terreno, em vez de brigar com ele."
  2. **"Madeira e vidro, com conforto no frio"** — "Vidro duplo, madeira tratada e isolamento pensados para as noites frias da serra. Muita luz durante o dia, casa quente à noite."
  3. **"Acompanhamos a obra até as chaves"** — "Visitamos a obra com frequência e tiramos as dúvidas do construtor. O que foi desenhado é o que você recebe."
- **Layout:** título à esquerda (5 colunas), itens à direita (6 colunas), em linhas separadas por fios Pedra. Sem numeração e sem foto. Celular: itens empilhados, ícone ao lado.
- **Ícones:** traço fino no desenho do logo, em Araucária: terreno, janela de vidro, moldura com check. Decorativos (escondidos dos leitores de tela).
- **Efeito:** texto sobe.

### 04 · Processo (Linho)

- **Título:** "Do terreno à chave, em cinco passos"
- **Frase de apoio:** "Você sabe desde o começo o que acontece em cada etapa."
- **Etapas:**
  1. **"Visita ao terreno"** — "Vamos até o terreno entender o sol, o vento, o desnível e a vista."
  2. **"Conceito"** — "Primeiros croquis e uma conversa sobre como você quer viver na casa."
  3. **"Projeto"** — "Plantas, cortes e detalhes de madeira e vidro, prontos para aprovação na prefeitura."
  4. **"Visualização 3D"** — "Você percorre a casa antes de ela existir e ajusta o que quiser."
  5. **"Obra"** — "Acompanhamos a construção de perto até a entrega das chaves."
- **Layout:** linha do tempo horizontal. Celular: linha vertical à esquerda.
- **Efeito:** com a rolagem, a linha Âmbar avança, o ponto da etapa fica Âmbar e o título passa de Terra para Carvão. Etapas apagadas continuam legíveis (Terra, nunca Pedra). No celular, acende de cima para baixo. Sem animação: todas acesas.

### 05 · Depoimentos (Crepúsculo)

- **Título:** "Quem já mora na serra"
- **Frase de apoio:** "Cinco casas, cinco terrenos diferentes."
- **Depoimentos:**

| Cliente | Casa · local | Depoimento | Detalhe | Foto |
|---|---|---|---|---|
| Helena e Rafael Moraes | Casa Araucária · Pedra Azul | "Tínhamos o terreno havia cinco anos e não sabíamos por onde começar. Hoje a gente toma café vendo a neblina passar na frente da Pedra Azul." | "Moram na casa desde 2023" | `moraes.webp` |
| Juliana Prates | Casa do Vale · Venda Nova do Imigrante | "Trabalho de casa e queria luz o dia inteiro sem passar frio à noite. Me explicaram cada escolha, e o vidro duplo fez toda a diferença." | "Home office na serra desde 2024" | `prates.webp` |
| Antônio e Cida Bertoldi | Refúgio da Neblina · Marechal Floriano | "Casa pequena, do jeito que a gente pediu: tudo num andar só, perto da horta, com uma varanda para ver a chuva chegar." | "Aposentados · 95 m²" | `bertoldi.webp` |
| Família Zanotti | Casa Bromélia · Domingos Martins | "O terreno era todo em desnível e três construtores disseram que não dava. A casa ficou em cima do morro e as crianças vivem no gramado." | "Projeto + Obra · 2022" | `zanotti.webp` |
| Marcos Lyra | Casa do Mirante · Pedra Azul | "Moro em Vitória e não podia ir à obra toda semana. Recebia fotos e relatório a cada visita. Quando peguei a chave, estava tudo como no 3D." | "Casa de fim de semana · 2025" | `lyra.webp` |

- **Cartão:** foto redonda de 64px com anel Âmbar, nome, "casa · local" em Âmbar (IBM Plex Mono), depoimento em Newsreader itálico, detalhe no rodapé do cartão. Todos os cartões com a mesma altura.
- **Computador:** título, setas e contador ("01 / 05") à esquerda; cartões correndo para a direita e vazando pela borda da tela; barra Âmbar de posição.
- **Celular:** cartão com ~82% da largura, o próximo aparecendo na borda, dica "Arraste para o lado →".
- **Sem passagem automática.**
- **Setas (texto só para leitores de tela):** "Depoimento anterior" e "Próximo depoimento".
- **Efeito:** texto sobe.

### 06 · Contato (Linho)

- **Título:** "Conte sobre seu terreno"
- **Frase de apoio:** "Três perguntas rápidas. Montamos a mensagem e você fala direto com o escritório pelo WhatsApp."
- **Perguntas (botões de escolha, opção marcada em Araucária):**
  - "O que você precisa?" — Projeto · Projeto + Obra
  - "Onde fica o terreno?" — Pedra Azul · Domingos Martins · Venda Nova do Imigrante · Marechal Floriano · Outro
  - "Tamanho aproximado da casa" — até 100 m² · 100 a 200 m² · mais de 200 m²
- **Campos:** "Nome" (exemplo: "Seu nome") · "WhatsApp" (exemplo: "(27) 9 0000-0000").
- **Botão principal:** "Agendar reunião pelo WhatsApp" — abre o WhatsApp com a mensagem:
  "Olá, Estúdio Vazio! Meu nome é {nome}. Tenho um terreno em {local} e quero {projeto / projeto e obra} para uma casa de {tamanho}. Gostaria de agendar uma reunião."
  - Quando o local for "Outro": "Tenho um terreno em outra cidade da região".
- **Botão secundário:** "Prefiro que me liguem" — envia os dados para `/api/contato`, que manda um e-mail ao escritório.
- **Aviso LGPD (abaixo dos botões):** "Usamos seus dados só para responder ao seu contato. Política de privacidade" (link para `/politica-de-privacidade`).
- **Avisos:**
  - Campo vazio: "Escolha uma opção." / "Informe seu nome." / "Informe um WhatsApp com DDD."
  - Enviado: "Recebemos seu contato. Retornamos em até 1 dia útil."
  - Erro: "Não foi possível enviar agora. Tente de novo ou fale com a gente pelo WhatsApp."
- **Layout:** título em cima; miniatura à esquerda (6 colunas) e cartão do formulário à direita (6 colunas). Cartão Névoa, borda Linho, sombra suave. Celular: miniatura menor acima do formulário.
- **Miniatura:** `miniatura-terreno.webp` sobre o fundo Linho, como uma maquete sobre a mesa, com sombra elíptica no chão.
- **Efeito:** a miniatura flutua e inclina de leve; a sombra diminui quando ela sobe e cresce quando desce.

### Rodapé (Crepúsculo)

- **Logo claro + frase:** "Casas de madeira e vidro para quem escolheu viver na serra capixaba."
- **Coluna Contato:** WhatsApp e e-mail — **espaços reservados** até o usuário criar o número e o Gmail do projeto.
- **Coluna Escritório:** "Vitória · ES" / "Atendimento com hora marcada" / "Seg. a sex., das 9h às 18h". Sem endereço.
- **Sem coluna de redes sociais.**
- **Linha final:** "© 2026 Estúdio Vazio · CAU A000000-0 · Política de privacidade" (link).
- **Celular:** uma coluna.

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

**Exceções à estrutura padrão da Base:** pasta `public/videos/` e subpasta `public/images/depoimentos/`.

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
