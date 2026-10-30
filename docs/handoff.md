# Handoff — Estúdio Vazio

> Estado atual do projeto. Reescrito por inteiro ao final de cada etapa.
> Histórico → PRs no GitHub. Decisões → docs/decisoes.md.

## 1. Onde estamos
Etapa: PR 4 – Integrações | Status: aguardando revisão

## 2. Última entrega
PR 4 concluído na branch `etapa/4-integracoes`: envio do formulário por e-mail, política de privacidade e e-mail real no rodapé.
- **Envio por e-mail** — `src/lib/validacao.ts` concentra as regras do formulário (valores aceitos nas 3 escolhas, nome obrigatório, WhatsApp com 10 ou 11 dígitos), usadas tanto pelo formulário quanto pela rota. `src/lib/email.ts` envia pelo Gmail com `nodemailer` (D41), lendo `GMAIL_USUARIO`, `GMAIL_SENHA_APP` e `EMAIL_DESTINO`; lança erro sem mostrar valores se alguma faltar. `src/app/api/contato/route.ts` (POST) valida no servidor, verifica o campo honeypot (D42) e envia o e-mail com assunto "Novo contato pelo site: {nome}" e um link para responder pelo WhatsApp (D43): sucesso → 200, dados inválidos → 400, falha no envio ou variável ausente → 500. Nada é guardado nem registrado em log (S4). O formulário ganhou o campo honeypot (escondido de quem vê e de leitores de tela, fora da ordem do Tab, autocomplete desligado).
- **Política de privacidade** — `src/app/politica-de-privacidade/page.tsx` com o texto final aprovado (D45), reaproveitando `Secao` e `Rotulo`; título corrigido para não ficar colado na borda no celular (faltava `Container`) nem atrás do cabeçalho fixo. O e-mail do escritório é um link `mailto`.
- **Rodapé** — e-mail `estudiovazio.contato@gmail.com` como link `mailto` na coluna Contato; WhatsApp continua reservado.
- `export const runtime = "nodejs"` não foi usado na rota: o projeto tem Cache Components ativado (`next.config.ts`), que já usa Node.js como runtime padrão e não aceita essa configuração explícita (confirmado em `node_modules/next/dist/docs`).
- `.env.example` (sem valores) adicionado e liberado no `.gitignore` com `!.env.example`, já que o padrão `.env*` também bloquearia esse arquivo.

## 3. Próximo passo
PR 5 – Ajustes finais e publicação, na branch `etapa/5-ajustes-publicacao`.

## 4. Pendências abertas
- Número de WhatsApp do projeto (`src/lib/contato.ts`, `NUMERO_WHATSAPP`, e rodapé).
- Testar o envio real pelo Gmail do projeto: o `.env.local` não existe neste ambiente, então o envio real não foi testado nesta etapa — só a validação, o honeypot e a resposta de erro (500) por variáveis ausentes. Antes de publicar, cadastrar `GMAIL_USUARIO`, `GMAIL_SENHA_APP` (senha de app, com verificação em duas etapas) e `EMAIL_DESTINO` (local e na Vercel) e testar um envio de ponta a ponta.
- Avaliação final da miniatura no teste do site.
- Teste do pôr do sol em outro lugar do site (fora do escopo até aqui).
- Vídeo mais leve do hero para celular.
- Conferir a prévia de link no WhatsApp (imagem `hero-poster.webp`).
- README com prints de desktop e celular (fica para o PR 5).

## 5. Atenção
- Paleta, fontes, layout e textos já estão aprovados: não trocar (ver `docs/regras.md`, Parte 2).
- A paleta não tem uma cor de erro/alerta dedicada: os avisos de validação do formulário usam Carvão (texto forte), e a mensagem de sucesso usa Araucária — sem introduzir cores novas.
- Next.js 16: consultar `node_modules/next/dist/docs/` antes de escrever código (ver `AGENTS.md`). O projeto tem Cache Components ativado: não usar `export const runtime` em rotas (ver item 2 acima).
- Skills instaladas como pastas reais em `.claude/skills/` (frontend-design, webapp-testing, ui-ux-pro-max), sem `.agents/`, sem links e sem `skills-lock.json` (D31, D32).
- Efeitos de scroll usam `gsap.matchMedia()`: o markup/CSS já nasce visível (sem JS ou com reduced motion ativo, nada fica escondido); a animação só esconde e revela quando `prefers-reduced-motion: no-preference`.
- O carrossel de depoimentos calcula a largura da trilha por JavaScript (`getBoundingClientRect`) em vez de `calc(50vw - 50%)`: dentro de uma coluna de grid, a porcentagem do CSS resolve contra a largura da coluna, não do container inteiro.
- `NUNCA` abrir, ler ou mostrar o conteúdo do `.env.local` (S1): só confirmar se existe.
- O próximo passo vem sempre do prompt atual; o handoff é só contexto.

## 6. Verificado em
30/10/2026 — `npm run lint` e `npm run build` sem erros na `etapa/4-integracoes`. Testes da rota `/api/contato` com o servidor local: dados vazios → 400 com os avisos de cada campo; honeypot preenchido → 200 sem tentar enviar e-mail; dados válidos sem `.env.local` → 500 ("Não foi possível enviar o e-mail."), confirmando que a validação e o honeypot rodam antes do envio. `.env.local` não existe neste ambiente, então o envio real não foi testado (ver pendências). Testado com a skill webapp-testing (Playwright) em 390px e 1440px: política de privacidade legível, com margens corretas e título abaixo do cabeçalho fixo nos dois tamanhos; link `mailto` do rodapé correto; formulário com os avisos exatos quando vazio, mensagem do WhatsApp conferida (combinação "Outro" + "Projeto + Obra" + "mais de 200 m²"), "Prefiro que me liguem" mostrando a mensagem de erro aprovada; campo honeypot fora da tela, com `tabindex="-1"` e `aria-hidden="true"` (confirmado que o Tab pula direto do campo WhatsApp para o botão); sem vazamento lateral e sem erros de console além do 500 esperado no teste do honeypot/envio.
