# Regras — Estúdio Vazio

> Regras obrigatórias. Em caso de conflito, as específicas deste site
> prevalecem sobre as gerais. Na dúvida, pergunte (C2).

## Parte 1 — Regras gerais (iguais nos 4 sites, não alterar aqui)

### A – Autorização
- **A1.** Fazer só o que o prompt atual pede. Nada de "aproveitar e melhorar" outras partes.
- **A2.** Antes de qualquer mudança estrutural (novo pacote, nova pasta, mudança de configuração), parar e pedir autorização.
- **A3.** Nunca apagar arquivos sem autorização explícita.
- **A4.** Se encontrar um problema fora do escopo, relatar e não corrigir por conta própria.

### S – Segurança
- **S1.** Senhas e chaves nunca ficam no código. Vão no `.env.local`, que nunca é enviado ao GitHub.
- **S2.** Antes de cada commit, conferir que nenhum arquivo com dados sensíveis vai junto.
- **S3.** Instalar só pacotes necessários e conhecidos, justificando cada um.
- **S4.** Dados dos formulários são validados no servidor e não são guardados, apenas enviados por e-mail (LGPD).
- **S5.** Skills de terceiros só são instaladas depois de lidas.

### G – Git
- **G1.** Nunca trabalhar direto na `main`. Toda etapa tem sua branch.
- **G2.** O Claude Code abre o PR, mas nunca faz o merge. Quem aprova é o usuário.
- **G3.** Proibido usar comandos destrutivos (`push --force`, `reset --hard`) sem autorização.
- **G4.** Commits pequenos, no formato `feat: descrição em português`.

**Branches** (sem acentos e sem espaços):
- `etapa/1-estrutura`
- `etapa/2-secoes-principais`
- `etapa/3-secoes-conversao`
- `etapa/4-integracoes`
- `etapa/5-ajustes-publicacao`
- `fix/descricao-curta` (correções depois de uma etapa aprovada)

**Tipos de commit:**
- `feat`: algo novo
- `fix`: correção de erro
- `style`: ajuste só visual
- `refactor`: reorganização sem mudar o resultado
- `docs`: arquivos .md
- `chore`: configuração e pacotes

**Pull Request:**
- Título: `PR 1 – Estrutura do projeto`
- Descrição: O que foi feito / Por que / Como testar (com link da prévia da Vercel) / Checklist (compila sem erros, funciona no celular, acessibilidade básica, nenhum dado sensível) / Pendências.
- Prints não entram nos PRs; a prévia da Vercel substitui. Prints de desktop e celular entram no README, no PR 5.
- Merge: Squash and merge (feito pelo usuário). A branch é apagada após o merge.

### Q – Qualidade
- **Q1.** Mobile-first e funcionamento em qualquer tamanho de tela.
- **Q2.** Acessibilidade básica: contraste adequado, texto alternativo nas imagens, navegação por teclado.
- **Q3.** Usar as skills de design antes de criar qualquer parte visual.
- **Q4.** Componentes reutilizáveis, sem código duplicado.
- **Q5.** Antes de abrir o PR, o projeto precisa compilar sem erros e passar no teste em navegador.

**Regras de imagens:**
- Nomes em minúsculas, sem acentos, com hífen (`hero-fachada.webp`).
- WebP sempre que possível.
- Originais em alta resolução ficam fora do repositório; só versões finais otimizadas entram.
- Exibição com o componente de imagem do Next.js.

### C – Comunicação
- **C1.** Seguir a ordem dos PRs, sem adiantar etapas.
- **C2.** Na dúvida, perguntar em vez de supor.
- **C3.** Ao terminar cada tarefa, entregar um resumo padrão: o que foi feito, arquivos alterados, como testar e o que ficou pendente.
- **C4.** Atualizar o `docs/handoff.md` ao final de cada etapa.
- **C5.** O Claude Code executa; quem decide é o Claude (desktop) com o usuário. O Claude Code não registra decisões por conta própria: decisões chegam prontas no prompt. Se surgir uma escolha não prevista, ele para e relata (C2).

## Parte 2 — Regras específicas deste site

### Identidade visual
- **Paleta:** Névoa `#F4EEE6` · Linho `#E8DED0` · Carvão `#211A12` · Terra `#5C5244` · Madeira `#87582B` · Araucária `#3E4A32` · Pedra `#9A9493` · Âmbar `#F0AA60` (hover `#E0954A`) · Tarde `#EAD6BC` · Crepúsculo `#1C1724`. Papéis de cada cor: `docs/spec.md`, parte 4.
- **Cores definidas uma única vez** (tokens do Tailwind/CSS) e usadas pelo nome. Nada de códigos de cor soltos nos componentes.
- **Pedra nunca é cor de texto** (contraste 2,6): só linhas decorativas.
- **Fontes:** Newsreader (títulos e marca) · Hanken Grotesk (textos) · IBM Plex Mono (rótulos). Só via `next/font/google`.
- **Estilo:** calmo, muito respiro, fotos grandes; a página é um percurso com um céu fixo que muda de cor, não mais fundos alternados por seção (D58).

### Componentes
- **Cantos (D68):** botões e opções do formulário em pílula; campos de formulário 14px; fotos e cartões de 18 a 28px, conforme a seção — ver spec, parte 5 e parte 6. Substitui a regra antiga de 4px/6px/foto reta.
- Botão principal: fundo Âmbar, texto Carvão, em pílula.
- Botão do cabeçalho: fundo Carvão sobre o hero e ao rolar; Âmbar quando o cabeçalho está no estado escuro (Depoimentos em diante).
- Espaçamentos em múltiplos de 8px.
- Logo: usar os SVGs de `public/images/logo/`; nunca recriar o logo em código ou com fonte.
- Todo efeito de animação respeita `prefers-reduced-motion` (ver `docs/spec.md`, parte 5).
- Textos entre aspas no `docs/spec.md` são finais: copiar exatamente.
- **Animações (D71):** todo `gsap.matchMedia()` usa um objeto de condições que inclui sempre `todos: "all"`. Sem essa condição verdadeira, o código de animação não roda em navegadores que não batem com nenhuma das outras condições — é assim que as animações deixam de ligar em celulares de verdade. Teste sempre com o perfil de dispositivo do navegador e toque emulado, nunca só redimensionando a janela.

### Estrutura de pastas (exceções à estrutura padrão)
- `public/videos/` — vídeo do hero.
- `public/images/depoimentos/` — retratos dos clientes.
- `public/images/detalhes/` — fotos de detalhe (Por que nós).
- `public/images/processo/` — fotos das etapas do Processo.
- `src/components/ui/desenhos/` — desenhos SVG (Processo).

### Pode alterar
- Detalhes de implementação que não mudam o resultado visual (organização interna dos componentes, nomes de funções).
- Ajustes finos de animação (duração, atraso) dentro do efeito aprovado.

### Não pode alterar sem autorização
- Paleta, fontes, tamanhos e grade aprovados.
- Logo e seus arquivos.
- Textos do site (copy final).
- Ordem, fundo e layout das seções.
- Nomes e pastas dos assets.
- Lista de pacotes (só os autorizados no prompt).

### Normas do nicho
- Registro profissional em formato fictício: "CAU A000000-0".
- Sem endereço do escritório (um endereço fictício pode coincidir com o de alguém real).
- Depoimentos, clientes e retratos são fictícios, aceitos só por ser portfólio.
- Sem rastreamento nem analytics; por isso, sem banner de cookies.
