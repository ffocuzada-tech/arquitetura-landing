# Handoff — Estúdio Vazio

> Estado atual do projeto. Reescrito por inteiro ao final de cada etapa.
> Histórico → PRs no GitHub. Decisões → docs/decisoes.md.

## 1. Onde estamos
Etapa: Redesenho – Um dia na serra | Status: aguardando revisão
Link do PR: https://github.com/ffocuzada-tech/arquitetura-landing/pull/6

## 2. Última entrega
Redesenho completo do site na branch `etapa/6-dia-na-serra`, feito em 3 prompts a partir da prévia aprovada em `docs/referencia-dia-na-serra.html` (D58–D72). A página deixou de ser uma pilha de seções com fundos alternados e virou um percurso: um céu fixo atrás de tudo muda de cor com a rolagem (Névoa → Linho → Tarde → Crepúsculo), com bruma e grão. Textos aprovados mantidos, com os textos novos da D70 (etiquetas, chips, "o espaço"/"livre").

- **Base** — `useModo` (hook) marca `anima`/`pino`/`movel` no `<html>`; `Ceu.tsx` pinta o fundo fixo e muda de cor por `ScrollTrigger`; `Secao.tsx` deixou de pintar fundo próprio.
- **Cabeçalho** — estados `solido` (Névoa ao rolar) e `escuro` (Crepúsculo dos Depoimentos ao fim); some ao descer e volta ao subir no celular.
- **Hero** — título em máscara por palavra, bruma na base, vídeo que aproxima e texto que sai ao rolar.
- **01 Manifesto** — texto que acende palavra a palavra e janela que se abre revelando a foto e os números, com "o espaço"/"livre" se afastando só no `pino`.
- **02 Projetos** — trilha horizontal travada no computador; carrossel nativo com barras estilo Stories, chip "Toque para ver +" e folha (painel que sobe) no celular; arrasto com mouse e toque chegam ao último card (correção feita durante os testes: espaçador no fim + regra de meio card para o snap).
- **03 Por que nós** — foto de detalhe que segue o cursor (só mouse fino); cartões coloridos empilhados (`sticky`) no celular.
- **04 Processo** — a casa se constrói em 5 imagens (2 fotos, 2 desenhos SVG próprios, 1 foto reaproveitada); tela travada no computador, palco fixo no celular.
- **05 Depoimentos** — um depoimento por vez no computador (rostos, setas, contador); pilha de cartões para arrastar no celular, sincronizada com a mesma navegação.
- **06 Contato** — mesmo cartão e lógica de sempre (validação, WhatsApp, `/api/contato`, honeypot), com visual novo no crepúsculo e formulário em 4 passos no celular (avança sozinho ao tocar numa opção, volta ao passo certo se a validação falhar).
- **Rodapé** — marca "Estúdio Vazio" enorme, numa máscara, que sobe ao aparecer.
- **Barra de ação no celular** — botão fixo "Agendar reunião", do Manifesto ao Contato.
- Um bug real foi encontrado e corrigido durante os testes finais: a bruma dos Depoimentos (elipses desfocadas com posição negativa) não estava contida, causando rolagem horizontal no celular — corrigido com `overflow-x: hidden` na seção.
- Outro bug real, já visto no prompt A e que voltou a aparecer com os novos trechos de `pin` (Projetos e Processo): o cabeçalho e o céu mediam a posição de elementos que ainda cresceriam por causa de seções travadas mais acima na página. Corrigido com `refreshPriority: -1` nos gatilhos que dependem de posições depois dos `pin`, sem atraso fixo — reconferido em produção com os dois novos trechos de `pin` presentes.

## 3. Próximo passo
Revisão e merge deste PR pelo usuário.

## 4. Pendências abertas
- Senha de app do Gmail do projeto (`GMAIL_SENHA_APP`), com verificação em duas etapas.
- Cadastrar as variáveis de ambiente na Vercel (`GMAIL_USUARIO`, `GMAIL_SENHA_APP`, `EMAIL_DESTINO`) e testar o envio real de ponta a ponta.
- Número de WhatsApp do projeto (`src/lib/contato.ts`, `NUMERO_WHATSAPP`, e rodapé).
- Vídeo mais leve do hero para celular.
- Conferir a prévia de link no WhatsApp (imagem `hero-poster.webp`).
- README com prints de desktop e celular.
- Trocar `etapa-croqui.webp` e `etapa-maquete.webp` (derivados da Casa Araucária, D69) por imagens geradas no Gemini.

## 5. Atenção
- Paleta, fontes e textos aprovados não mudam sem autorização (ver `docs/regras.md`, Parte 2). Cantos agora seguem D68 (pílula, 14px, 18–28px), substituindo a regra antiga de 4px/6px.
- Toda animação usa `gsap.matchMedia()` com uma condição sempre verdadeira (`todos: "all"` — D71). Sem ela, o código de animação não liga em celulares de verdade, só no navegador redimensionado. Teste sempre com o perfil de dispositivo e toque emulado.
- `ScrollTrigger`s que dependem da posição de elementos **depois** de um trecho com `pin` (o cabeçalho, o céu, a barra de ação) precisam de `refreshPriority: -1`, para recalcular depois dos trechos travados. Criar o gatilho cedo demais, antes do `pin` existir, não se corrige só chamando `ScrollTrigger.refresh()` depois — é preciso essa prioridade.
- No Tailwind v4, as utilidades `translate-x/y-*` animam a propriedade CSS `translate`, não `transform`. Transições que movem elementos por essas utilidades precisam listar `translate` (ex.: `transition-[translate]`), não `transform`.
- Classes Tailwind "dinâmicas" têm que aparecer como string literal completa em algum lugar do arquivo-fonte (ex.: num objeto `Record<Chave, string>`) — strings montadas por concatenação em tempo de execução (ex.: `` `[html.movel_&]:${variavel}` ``) não são detectadas pelo Tailwind.
- Elementos decorativos posicionados fora da seção (ex.: a bruma dos Depoimentos, com `inset-x` negativo) precisam de um `overflow-x: hidden` num ancestral, ou podem causar rolagem horizontal no celular sem aparecer em nenhum teste de 1440px.
- Next.js 16: consultar `node_modules/next/dist/docs/` antes de escrever código (ver `AGENTS.md`). O projeto tem Cache Components ativado: não usar `export const runtime` em rotas.
- `NUNCA` abrir, ler ou mostrar o conteúdo do `.env.local` (S1): só confirmar se existe.
- O próximo passo vem sempre do prompt atual; o handoff é só contexto.

## 6. Verificado em
30/10/2026 — `npm run lint` e `npm run build` sem erros na `etapa/6-dia-na-serra`, testado sempre com `npm run build` + `npm run start` (produção). Testado com a skill webapp-testing (Playwright) em 1440×900 (mouse), iPhone 13 (perfil de dispositivo, com toque) e janela de 600px (mouse): céu chegando ao Crepúsculo e cabeçalho escuro nos Depoimentos e no rodapé; Projetos trava e chega à terceira casa com o contador certo, e o carrossel do celular e da janela de 600px chegam ao último card inteiro; Processo passa pelas 5 etapas com o `clip-path` revelando cada figura da esquerda para a direita; Por que nós com a foto seguindo o cursor; Depoimentos trocando por clique nos rostos e por arrasto na pilha do celular, com o contador sincronizado; Contato validando, abrindo o WhatsApp com a mensagem certa, mostrando o erro aprovado em "Prefiro que me liguem" (sem as credenciais do Gmail), e no celular avançando sozinho ao tocar numa opção (inclusive retocando a mesma opção), voltando de passo e indo para o passo certo quando a validação falha. `prefers-reduced-motion: reduce` conferido nos dois tamanhos: tudo visível e parado, carrossel e formulário em passos continuam funcionando (só sem as transições). Nenhuma rolagem horizontal em nenhum cenário, nenhum erro de console.
