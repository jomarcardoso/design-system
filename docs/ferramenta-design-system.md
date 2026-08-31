<!-- docs/ferramenta-design-system.md -->

# A ferramenta: visão geral para orientar outros agentes

Este arquivo é um resumo de referência sobre o que este repositório constrói.
Ele existe para dar contexto rápido a um agente (ou pessoa) que ainda não leu
os skills inteiros — não substitui `skills/*/SKILL.md` e suas `references/`,
que são a fonte de verdade e têm muito mais nuance do que cabe aqui. Onde este
arquivo resume uma regra, o arquivo original decide em caso de dúvida.

Nomes de tokens, chaves de front matter e identificadores de código ficam em
inglês, como no resto do projeto.

---

## 1. O que é isto, em uma frase

Um **framework-independent CSS token foundation** com três skills que rodam em
sequência: a primeira decide *por que* o produto parece e soa do jeito que é
(uma entrevista), a segunda transforma essas decisões em **tokens** (CSS custom
properties + Sass), a terceira fecha o **vocabulário de componentes** que o
projeto tem permissão de usar. O objetivo final é que um botão verde, um card
com sombra, um badge — qualquer coisa — tenha uma razão registrada em vez de
ser "o que a biblioteca trouxe por padrão".

## 2. A cadeia de artefatos

```
DESIGN_LANGUAGE.md   as respostas da entrevista, e por quê
      ↓
DERIVED.md           o que essas respostas produziram, e qual resposta produziu cada coisa
      ↓
theme.scss → ds.css  os valores (tokens), mais os arquivos de report do build
      ↓
patterns.json        quais componentes existem, em que forma, para onde vão
      ↓
a marcação (markup)  que o ledger verifica
```

Cada elo referencia o anterior. `npm run verify:chain` checa a metade
mecânica disso (toda resposta produziu algo, toda derivação nomeia um token
real, todo binding de composição resolve, todo pattern promovido tem sua
classe) — mas não checa se a derivação é a *certa* para a resposta; isso é
julgamento humano, feito nos checklists de review de cada skill.

## 3. As três skills, em ordem

| # | Skill | Produz | Pergunta que responde |
|---|---|---|---|
| 1 | `design-language` | `DESIGN_LANGUAGE.md` (+ `DERIVED.md`) | por que o produto parece e soa assim |
| 2 | `design-system` | `src/`, o theme, `dist/theme-*.css` | quais são os valores |
| 3 | `design-patterns` | `patterns.json` | quais componentes podem ser construídos |

Rodar fora de ordem produz um sistema sem fundamento: começar em 2 dá uma
paleta que ninguém consegue defender em seis meses; começar em 3 dá um
vocabulário sem base para suas recusas. Nenhuma das três roda "tudo de uma
vez" — cada skill entrega seu artefato, o cliente confirma, só então a
próxima começa.

---

## 4. Skill 1 — `design-language`: a entrevista

Fica em [`skills/design-language/`](../skills/design-language/). Entrevista
curta (22 perguntas, 6 blocos — 4 delas só se aplicam a uma escola de cor, uma
é pulada quando o produto é novo) que produz `DESIGN_LANGUAGE.md` na raiz do
projeto: front matter YAML que um agente lê antes de gerar qualquer coisa, e
prosa que uma pessoa lê para entender por que o sistema é do jeito que é.

**Mecânica central: o bloco 1 escolhe um arquétipo, e o arquétipo ilumina um
caminho.** A partir daí, toda pergunta seguinte tem uma resposta recomendada
(✅), uma que funciona mas muda a sensação (⚠️), e uma que contradiz o
arquétipo (❌). ❌ não é proibido — é uma decisão de design real, registrada em
`deviations` com motivo e data. Três ou mais ❌ é o sinal para revisitar o
bloco 1.

### Os seis blocos

| Bloco | Decide | Perguntas |
|---|---|---|
| 1 — Posicionamento e arquétipo | o preset para tudo abaixo | 1–4 |
| 2 — Contexto de uso e ergonomia | `size-control`, `line-height`, densidade | 5–6 |
| 3 — Fundamentos visuais e geometria | raio, sombra, ícones, quanto "gritar" | 7–10 |
| 4 — Cor e acessibilidade | escola de cor, cor da marca, nível WCAG, status | 11–16 |
| 5 — Voz e microcopy | como o sistema fala | 17–18 |
| 6 — Composição e guardrails | regras verificáveis pelo build | 19–22 |

Detalhe de cada pergunta em
[`references/questionnaire.md`](../skills/design-language/references/questionnaire.md).
Pontos que valem a pena guardar de cabeça:

- **Pergunta 4** ("é uma ruptura ou uma evolução do produto atual?") só é
  feita quando já existe um produto. Sem essa resposta, um agente olhando para
  o produto existente trata o que vê como restrição — e o resultado é a
  paleta nova aplicada ao contraste antigo. `(A)` autoriza ignorar todo
  comportamento legado; sem isso, não pode.
- **Pergunta 10** ("o produto levanta a própria voz ou abaixa a de todo
  mundo?" — quiet / balanced / loud) é a pergunta de maior alavancagem da
  entrevista: decide oito coisas (fill/ink de badges, tratamento de ação
  secundária, chip selecionado, peso de divisor, borda interativa, peso de
  fonte de controle, alcance do "orçamento" de accent, e `accentContrast`).
  As tabelas ficam derivadas, não perguntadas uma a uma — ver
  [`references/derivations.md`](../skills/design-language/references/derivations.md).
- **Pergunta 11** (escola de cor) é a mais carregada de consequência do bloco
  4 — ver seção 6 abaixo.
- **Mobile-first (pergunta 6) sobrepõe o arquétipo**: eleva `size-control`
  para no mínimo 44px, registrado como `override` (o sistema funcionando),
  não como `deviation`.
- **A cor da marca nunca é inferida.** É a única coisa que o cliente já sabe;
  adivinhar é o jeito mais rápido de perder a confiança em tudo o mais que a
  entrevista produziu.

### O portão de leitura de volta (read-back)

Antes de escrever o arquivo, as respostas são lidas de volta como uma tabela
— uma linha por chave do front matter, com a origem de cada uma (qual
pergunta, ou "derivado de"). Contradições são resolvidas ali, em voz alta,
antes de qualquer coisa ser emitida. A tabela aprovada é um contrato: o que é
emitido tem que ser exatamente o que foi aprovado.

### Dois documentos, não um

- **`DESIGN_LANGUAGE.md`** — as decisões e por quê.
- **`DERIVED.md`** — o que essas decisões produziram e qual resposta produziu
  cada coisa: os defaults de componente, as formas escolhidas, as regras em
  vigor, e **o que NÃO foi decidido** (um índice reverso: "badge mais chamativo?
  mude `posture`, não o badge").

---

## 5. Os cinco arquétipos

Um arquétipo é um **preset, não uma jaula** — semeia o theme e as escalas
estruturais, cada valor é um ponto de partida que a entrevista depois ajusta.
Matriz completa em
[`references/archetypes.md`](../skills/design-language/references/archetypes.md).

| | Tech Minimalist | Enterprise Solid | Playful & Expressive | Editorial & Premium | Utilitarian & Technical |
|---|---|---|---|---|---|
| **Personalidade** | direto, inventivo, produtividade primeiro | conservador, institucional, seguro | caloroso, encorajador, humano | elegante, contido, ponderado | preciso, denso, orientado a dados |
| **`radius-control`** | 6px | 4px | 16px | 4px | 2px |
| **`radius-surface`** | 8px | 6px | 24px | 6px | 2px |
| **Elevação** | bordas finas carregam hierarquia | sombras carregam hierarquia | sombras também são decorativas | espaço em branco carrega hierarquia | só bordas |
| **Face de título** | sans geométrica/neo-grotesca | sans humanista | arredondada ou display | **serifada** | sans condensada |
| **`line-height`** | 1.5 | 1.5 | 1.6–1.7 | 1.7 | 1.4 |
| **`size-control`** | 36px | 36px | 44px | 40px | 28px |
| **Ícones** | outline, ou preenchido no selecionado | outline, preenchido no selecionado | **preenchido** | outline | outline |
| **Produtos de referência** | Vercel, Linear, Raycast | IBM Carbon, Salesforce, SAP Fiori | Duolingo, Headspace, Mailchimp | Stripe Press, Notion, Medium | GitHub, AWS Console, Grafana |

Notas importantes:

- **Raio é o sinal mais reconhecível e o mais barato de mudar** (dois
  tokens) — não vale a pena debater por horas.
- **"Flat" não é ausência de decisão** — move a decisão para `border-color`.
  Um sistema flat com borda fraca produz superfícies que ninguém distingue, e
  isso **passa** no checador de contraste, porque esse checador mede texto
  contra fundo, não uma superfície contra outra. O que carrega hierarquia tem
  que ser o que é forte — essa resposta vai para `elevationCarrier`.
- **Densidade é espaçamento + altura de controle + leading juntos.** Subir
  `size-control` e deixar `line-height` em 1.4 dá botões altos com texto
  apertado.
- **Editorial é o arquétipo a observar no contraste** — "contraste sutil" é
  também como um tema falha no gate de WCAG em build time. A saída é mudar
  *chroma*, não distância de *lightness*.
- **Cor não está na lista do arquétipo.** O arquétipo sugere um clima (azuis
  sóbrios para Enterprise, vibrante para Playful); a cor da marca vem da
  entrevista, nunca do arquétipo.
- **Um híbrido é uma resposta legítima** quando nenhum dos cinco encaixa —
  "tipografia Editorial numa densidade Utilitarian" é o que a maioria dos
  produtos de analytics realmente é.

---

## 6. As escolas de cor (colour strategies)

Duas perguntas do bloco 4 decidem mais do sistema gerado do que qualquer
outra coisa: **a escola** (algo escolhido pega a cor da marca?) e **o
tratamento da ação secundária**. Ambas em
[`references/colour-strategies.md`](../skills/design-language/references/colour-strategies.md).
São **três padrões de atribuição sobre um único vocabulário**, não três
vocabulários.

| | `functional` | `brand` | `monochrome` |
|---|---|---|---|
| **quem** | Atlassian, Shopify Polaris | Material, Bootstrap, Tailwind UI, **Itaú** | Apple HIG, Vercel, Radix |
| **a ideia** | uma cor por TRABALHO | a cor da marca faz vários trabalhos | um accent, todo o resto cinza |
| `action` | sua própria cor | a cor da marca | o accent |
| `selected` | sua própria cor | **a mesma cor da marca** | o accent |
| `link` | sua própria cor | geralmente uma segunda cor | o accent |
| **lê-se por** | cor | cor + hierarquia | peso, forma e espaço |

**A pergunta decisória** (11b): *"quando algo é ESCOLHIDO — uma aba
selecionada, um checkbox marcado — pega a cor principal da marca, ou uma
diferente?"* → diferente = `functional`; a mesma = `brand`; só existe uma
cor e o resto é cinza = `monochrome`. Nenhum arquétipo responde essa pergunta
— os dois eixos são independentes (um produto Editorial pode ser tanto
monochrome quanto não).

**O que a escolha muda de verdade:** os NOMES dos tokens de papel
interativo. Superfícies, tinta, bordas, sombras e toda a família de status são
comuns às três e mantêm uma grafia só. `check-roles()` também muda quais
colapsos trata como erro por escola (ver seção 7).

### O tratamento da ação secundária (pergunta 14)

Sete tratamentos em uso; seis são os mesmos dois ou três tokens apontando
para valores diferentes (nunca tocam a camada de produto); só o sétimo
("segunda cor de marca preenchida") usa um hook de layer 3.

| escola | default | por quê |
|---|---|---|
| `functional` | contornado (outline) | a paleta já gasta cor em papéis |
| `brand` | tom suave da cor principal | a cor da marca já está presente de qualquer forma |
| `monochrome` | cinza puro | há um accent só, e a ação secundária não é ele |

### `monochrome`: a única escola que gera sua própria camada 1

```scss
@use 'ds/src/ramp';

$paper: ramp.neutral(#8a7355, $pigment: 0.7);   // a escada de neutros
$pen:   ramp.chromatic(#005bac);                // a única cor viva
```

O mapeamento é posicional (por posição na escada), não por decisão
independente — é isso que torna a promessa de "white-label" real: mudar um
pigmento move o sistema todo sem editar um token semântico.

**A escada tem trabalhos, e cada degrau importa** (rung table completa em
`colour-strategies.md`): degrau 3 é o "elemento em repouso" (badge, chip,
tag, botão secundário em repouso) e é o degrau que mais frequentemente é
esquecido — um build que só toca as pontas e o meio "tecnicamente é
monochrome" mas parece qualquer outra escola sem cor.

Quatro follow-ups (perguntas 13a–13d) só existem para `monochrome`:
`neutralPigment` (quanto de tinta tem o cinza), `surfaceSeparation`
(linha/tom/sombra — derivado da pergunta 8), quanto da escada o LAYOUT pode
gastar, e a direção da escada (mais claro conforme sobe / mais escuro
conforme agrupa).

**O que a escola NÃO muda:** a família de status (`success`/`warning`/
`danger`/`info`). Uma confirmação destrutiva é vermelha em qualquer escola.

---

## 7. Skill 2 — `design-system`: os tokens

Fica em [`skills/design-system/`](../skills/design-system/). Fundação CSS de
quatro camadas, framework-independent, com adapters para Bootstrap, CoreUI,
daisyUI, shadcn, Bulma, Pico, Flowbite, Preline, NES.css, water.css e
MVP.css, mais uma ponte opcional para Tailwind. Vocabulário completo (126
nomes) em
[`references/tokens.md`](../skills/design-system/references/tokens.md).

### As quatro camadas

| Camada | O que é | Emite como |
|---|---|---|
| 1 — base | primitivos (pigmentos, escadas) | **só Sass, zero bytes** — nada pode ler `--app-base-*` |
| 2 — semântica | o contrato público (105 CSS custom properties) | **custom properties** — o que temas e contexts trocam em runtime |
| 3 — componente | nomes reservados | emissão desligada por default; existe como fallback chain |
| 3.5 — adapter | tradução para bibliotecas de terceiros | Sass para o fixo, custom properties só para o que o tema troca |

### A regra de ouro

**Código de aplicação e de componente lê a camada 2 e nada mais.**

```css
/* sim */
color: var(--app-fg-default);
background: var(--app-bg-surface);

/* não — cada uma dessas é uma violação de camada */
color: #1e1e2e;
background: var(--app-base-indigo-600);   /* camada 1 é privada */
border-color: var(--bs-border-color);      /* namespace do Bootstrap */
```

Quando a camada 2 não tem um token para o que você precisa, a correção é
**adicionar um token semântico**, nunca contornar a camada. `stylelint`
falha o build numa violação.

### A política de emissão

> Um valor vira uma CSS custom property **apenas** se muda em runtime (troca
> de tema, um contexto, um override por instância) ou é um ponto de extensão
> público. Todo o resto resolve em compile time e sai como literal, custando
> zero bytes.

### Gramática dos nomes

```
--app-{property}-{role}[-{prominence}][-{state}]
```

`role` carrega **intenção, nunca aparência** — `bg-danger`, nunca `bg-red`.
Teste: se renomear uma família de cor forçaria renomear o token, o token está
mal nomeado.

### Os quatro papéis interativos — o erro mais comum do sistema

| papel | significa | fica em |
|---|---|---|
| `action` | um CONVITE — algo acontece se você apertar | botões primários, CTAs |
| `selected` | um ESTADO em que a interface está agora | chips, checkboxes, item de nav ativo, aba atual |
| `link` | NAVEGAÇÃO — você vai para outro lugar | âncoras |
| `neutral` | um controle preenchido sem opinião | cancelar, botão secundário cinza |

**Nunca usar `selected` só porque nada mais estava disponível.** Quatro
adapters (Bootstrap, CoreUI, Pico, Preline) faziam exatamente isso com o
botão secundário cinza de suas bibliotecas — um botão "cancelar" saía na
mesma cor de um item de menu ativo. `check-roles()` avisa em build time
quando dois papéis colapsam no mesmo valor (mas o aviso muda por escola —
ver seção 6).

### Tokens mais usados (tabela de bolso)

| Precisa de | Token |
|---|---|
| Fundo de página / card / elevado / afundado | `--app-bg-page` `--app-bg-surface` `--app-bg-raised` `--app-bg-sunken` |
| Texto corpo / secundário / título | `--app-fg-default` `--app-fg-muted` `--app-fg-heading` |
| Ação primária, e texto sobre ela | `--app-bg-action` `--app-fg-on-action` |
| Status | `--app-bg-{success,warning,danger,info}` + `--app-fg-on-*` + `--app-bg-*-subtle` |
| Linhas | `--app-border-color` `--app-border` |
| Espaçamento | `--app-space-{2xs..2xl}`, ou nomes de intenção `--app-pad-surface` `--app-gap-stack` |
| Forma | `--app-radius-control` `--app-radius-surface` `--app-radius-pill` |
| Altura de controle | `--app-size-control` |

**O invariante do par:** todo `bg-X` tem um `fg-on-X` correspondente. Um
contexto que muda um fundo sem seu texto falha a compilar.

### Modo escuro

Um tema escuro é um TEMA — uma segunda chamada `emit-theme()`, não uma
classe `.dark` nem um switch na fundação. Nomeie os dois temas `light` e
`dark`. `derive.dark()` pode gerar o escuro a partir do claro, trabalhando em
OKLCH e transformando por PAPEL (não por cor individual) — é o que evita o
"bug do 2.39:1" (inverter lightness sem inverter a direção do estado de
hover).

### O que autoria x o que é vendorizado

| Arquivo | Quem escreve |
|---|---|
| `palette.scss` | o projeto — pigmentos e escadas |
| `theme.scss` | o projeto — qual posição da escada joga qual papel |
| `ds.scss` (entry) | o projeto — `@use … with (…)` + chamadas `emit-*` |
| `<library>-entry.scss`, `stylelint.config.cjs` | o projeto copia e depois mescla |
| `src/_base`, `_core`, `_semantic`, `_component`, `_roles`, `_ramp`, `_config`, `adapters/*` | **vendorizado, copiado sem alteração** |

### Adapters

Guia completo em
[`references/adapters.md`](../skills/design-system/references/adapters.md).
Regra central: **nunca sobrescrever uma biblioteca de terceiros com CSS**.
Ordem de resolução: (1) as variáveis Sass `!default` da biblioteca no
`<library>-entry.scss`, (2) as custom properties da biblioteca reatribuídas
em `src/adapters/_<library>.scss`, (3) só se nenhuma das duas alcançar, é um
limite real da biblioteca — recusar em `patterns.json` com motivo. Um
`!important` no CSS compilado não é prova de que um valor é inalcançável —
geralmente é uma variável Sass não configurada.

---

## 8. Skill 3 — `design-patterns`: o ledger de padrões

Fica em [`skills/design-patterns/`](../skills/design-patterns/). Decide
quais variantes de componente um projeto tem permissão de usar, e qual
marcação emitir para cada uma. Vive em `patterns/patterns.json` **no
projeto** (não neste plugin, que só fornece schema + template vazio +
verificador).

### Os estados

| `state` | Emitir |
|---|---|
| `raw` | as classes da biblioteca listadas em `raw.<library>` |
| `styled` | a única classe em `styled` — nunca as classes da biblioteca junto |
| `wrapped` | o componente em `wrapped`, com suas props |
| `forbidden` | nada. Recusar, dar `reason`, oferecer `instead` |

Modificadores combinam com qualquer pattern via
`modifiers.<axis>.options.<option>.libraries.<library>`. **Nunca compor uma
variante que o ledger não lista** — `btn-outline-danger` não é "danger com
outline", é uma combinação que ninguém decidiu.

### `trajectory` — o presente adequado e um futuro mapeado

Um `raw` sem plano e um `raw` com plano parecem idênticos no JSON, mas
significam coisas diferentes: o primeiro é um ponto de partida, o segundo é
um ponto de descanso. `trajectory` registra `to` (destino), `when` (um
GATILHO reconhecível, nunca uma data), `why` (o que o estado atual CUSTA),
`form` e `blocked`.

### Promoção — quando sai de `raw`

- o pattern compõe **três ou mais** classes da biblioteca no call site;
- o projeto precisa que ele divirja da biblioteca **estruturalmente**, não só
  de cor;
- um agente ou desenvolvedor errou mais de uma vez.

Ordem obrigatória: **SCSS primeiro, wrapper depois** — `.app-btn-secondary`
antes de um `<Button variant="secondary" />` que consome essa classe. Um
wrapper que emite as classes da biblioteca direto só moveu o acoplamento, não
o removeu.

### O bloco `composition`

Para telas sem um componente no ledger. `typeRoles`, `rhythm`, `surfaces`,
`accentBudget`. A divisão importante:

| | guarda | exemplo |
|---|---|---|
| `DESIGN_LANGUAGE.md` §6 | relações, que sobrevivem a uma troca de tema | "um título de seção fica dois degraus acima do corpo" |
| `composition` (patterns.json) | valores concretos, verdadeiros só para ESTE tema | `sectionTitle: text-2xl` |

### Recusando

Uma recusa só é útil com uma alternativa — todo `forbidden` exige `instead`
no schema. Citar o `reason` registrado no ledger, nunca inventar um. Se o
usuário reafirma o pedido depois de ouvir o motivo, essa é a decisão dele:
não recusar duas vezes — em vez disso, mover a entrada para fora de
`forbidden` no `patterns.json`, para que código e ledger fiquem de acordo.

### Formas de componente

[`references/component-forms.md`](../skills/design-patterns/references/component-forms.md)
guarda a FORMA (não só a variante permitida) de ~30 componentes — botão,
input, card, card com imagem, card selecionável, badge/tag/chip, tabs,
linhas de lista/tabela, divisor, alerta, checkbox/radio/switch, cabeçalho de
página, hero, tabela, empty state, loading, erro/sucesso, formulário
(posição de label, agrupamento), paginação, breadcrumb, stepper/timeline,
avatar, gráfico, carrossel, rodapé, grid/lista/tabela para o mesmo dado,
overlay (sheet/modal/painel), tooltip/popover, navegação/cabeçalho. Nada ali
é banido — as condições descrevem encaixe, não permissão.

---

## 9. Regras que nenhum agente deve violar

1. **Nunca gerar código sem antes ter `DESIGN_LANGUAGE.md`** (ou dizer
   explicitamente o que está sendo assumido no lugar dele).
2. **Nunca reescrever um arquivo vendorizado** (`src/_semantic.scss` e
   companhia) — é copiado, não reconstruído de memória.
3. **Nunca sobrescrever uma biblioteca de terceiros com CSS** — achar a
   variável Sass ou a custom property que ela já expõe.
4. **Nunca usar `selected` como "a outra cor de marca"** quando na verdade é
   só um botão neutro.
5. **Nunca compor uma variante de componente que o ledger não lista.**
6. **Nunca inventar a cor da marca** — perguntar, ou gerar e registrar que
   foi gerada.
7. **Todo `bg-X` tem que ter seu `fg-on-X`**, e os dois se movem juntos.
8. **Cada arquivo gerado abre com um comentário do próprio caminho** (exceto
   JSON, que não tem sintaxe de comentário).
9. **Recomputar em vez de repetir de memória** ao escrever `DESIGN_LANGUAGE.md`
   ou `patterns.json` — sempre abrir o template/schema e trabalhar a partir
   dele.

---

## 10. Verificação

```bash
npm run verify         # build:tokens → lint → verify:examples → audit:contrast
npm run verify:chain   # os 5 elos da cadeia (seção 2) se referenciam corretamente
npm run verify:patterns <path> --ledger <path-to-patterns.json>
npm run demo           # compila cada biblioteca para as páginas em example/
```

| comando | pega | não vê |
|---|---|---|
| `build:tokens` | todo par bg/fg abaixo de AA em todo tema; chave de tema faltando; colisão de variável entre adapters | qualquer coisa sobre marcação renderizada |
| `lint` | cor literal em CSS de produto; código alcançando `--app-base-*`/`--bs-*` direto | um token usado com o SIGNIFICADO errado |
| `verify:examples` | combinação de classe que o ledger do produto não permite | qualquer coisa fora do ledger |
| `audit:contrast` | o que o navegador realmente pinta — texto embutido pela biblioteca, `outline` clobbered pelo adapter | uma página não listada no script |

Abrir `example/coexistence.html` sempre via HTTP, nunca `file://` — leituras
de estilo computado no mesmo turno de uma troca de tema reportam o valor
antigo.

---

## 11. Glossário rápido

| termo | significado |
|---|---|
| **arquétipo** | preset de personalidade (5 opções) que semeia raio, sombra, tipografia, densidade e ícones |
| **escola de cor** | `functional` \| `brand` \| `monochrome` — como o produto atribui cor a papéis interativos |
| **token de camada 2** | uma CSS custom property pública, ex. `--app-bg-action` |
| **papel (role)** | `action` \| `selected` \| `link` \| `neutral` — o que um elemento interativo FAZ, não como parece |
| **contexto** | override parcial de um tema (`data-surface="inverted"`, `data-density="compact"`) que herda tudo que não menciona |
| **ledger** | `patterns/patterns.json` — o vocabulário de componentes permitido, por estado |
| **desvio (deviation)** | resposta que contraria o arquétipo, aceita de propósito e registrada com motivo |
| **override** | uma regra (ex. mobile-first) que sobrepõe o arquétipo por necessidade ergonômica, não por preferência |
| **trajetória (trajectory)** | para onde um pattern `raw` está indo, e o gatilho que dispara a promoção |

---

## 12. Onde ler mais

| pergunta | arquivo |
|---|---|
| Como rodar a entrevista inteira? | [`skills/design-language/SKILL.md`](../skills/design-language/SKILL.md) |
| Todas as 22 perguntas, com as tabelas ✅/⚠️/❌? | [`skills/design-language/references/questionnaire.md`](../skills/design-language/references/questionnaire.md) |
| A matriz completa dos 5 arquétipos? | [`skills/design-language/references/archetypes.md`](../skills/design-language/references/archetypes.md) |
| As 3 escolas de cor em detalhe? | [`skills/design-language/references/colour-strategies.md`](../skills/design-language/references/colour-strategies.md) |
| As ~100 decisões derivadas das 22 respostas? | [`skills/design-language/references/derivations.md`](../skills/design-language/references/derivations.md) |
| Respostas que se contradizem, e como suavizar? | [`skills/design-language/references/conflicts.md`](../skills/design-language/references/conflicts.md) |
| Os 126 nomes de token, completos? | [`skills/design-system/references/tokens.md`](../skills/design-system/references/tokens.md) |
| Como escrever/ligar um adapter de biblioteca? | [`skills/design-system/references/adapters.md`](../skills/design-system/references/adapters.md) |
| Como instalar isto num projeto real? | [`skills/design-system/references/install.md`](../skills/design-system/references/install.md) |
| As formas de ~30 componentes? | [`skills/design-patterns/references/component-forms.md`](../skills/design-patterns/references/component-forms.md) |
| Um ledger real, comentado? | [`skills/design-patterns/references/worked-example.md`](../skills/design-patterns/references/worked-example.md) |
| Convenções deste repositório (não do produto)? | [`AGENTS.md`](../AGENTS.md) |
