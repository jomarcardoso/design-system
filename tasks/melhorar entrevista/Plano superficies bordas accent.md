<!-- claude/plano-superficies-bordas-accent.md -->

# Plano de melhoria: superfícies, bordas, fundo invertido e accent

Este documento analisa a conversa "Hierarquia de Superfícies no Design" (chat
com um agente Gemini, anexado em 2026-08-31) como **fonte de informação, não
de verdade**, e propõe como incorporar o que há de aproveitável nela à
entrevista da ferramenta (`skills/design-language/`), hoje descrita em
[`ferramenta-design-system.md`](ferramenta-design-system.md).

O objetivo declarado é: melhorar as perguntas para que a entrevista consiga
gerar uma interface com identidade própria mesmo quando a implementação usa
Bootstrap ou outra biblioteca de terceiros — e sem excluir layouts pouco
prováveis (editores de imagem, ferramentas 3D) que hoje não têm um lugar
claro no questionário.

---

## 1. Análise de coerência da conversa

### 1.1 O que se sustenta e já tem lugar natural na ferramenta

A conversa produz três ideias com embasamento sólido e reaproveitáveis quase
diretamente:

**A taxonomia de duas bordas.** Border de divisão (hairline estrutural, um
único degrau neutro sutil) separa conteúdo no mesmo plano sem implicar
elevação; borda de interatividade (affordance/estado) sinaliza que algo é
acionável, selecionado ou focado. A conversa já chega a essa distinção de
forma consistente ao longo de várias respostas (é anunciada de forma implícita
na primeira resposta e nomeada explicitamente na segunda), e ela bate com
como sistemas maduros tratam o problema — Primer separa `border.default` de
`border.emphasis`; Material separa outline de divider. Hoje a ferramenta só
lista `--app-border-color` / `--app-border` de forma genérica na tabela de
bolso (seção 7 do doc de referência); não há dois papéis nomeados. Isso é uma
lacuna real de vocabulário, não só de pergunta.

**O teto de níveis de elevação.** "Um nível permanente (cards) + um nível
temporário (modais/menus suspensos); sidebar e header não flutuam" é uma
regra prática, verificável e generalizável — o mesmo espírito da disciplina
de elevação do Material Design. Hoje isso não aparece como guardrail
explícito nos blocos 3 ou 6 da entrevista.

**A herança de cor por superfície.** Título no topo da escala (12), texto
secundário um degrau abaixo (11), ícones acompanhando o secundário, bordas
internas adaptando ao tom do container, componentes internos recalculando seu
próprio fundo (3) — isso é uma regra de derivação limpa e mecânica, do tipo
que já vive em `DERIVED.md`/`derivations.md`, não em pergunta de entrevista.

**A separação entre "escola" (motor de tokens) e "modelo de superfície"
(física visual).** Esta é a ideia mais valiosa da conversa inteira. Ela
argumenta que a escolha entre `functional`/`brand`/`monochrome` é um eixo
independente de como a luz é simulada na tela (plano único com borda, fundo
atenuado com cards claros, ou fundo claro com containers escavados). Isso
bate exatamente com a arquitetura que a ferramenta já separa em "escola de
cor" (seção 6) e "arquétipo" (seção 5) — mas hoje o arquétipo mistura
personalidade (raio, tipografia, densidade) com uma pista solta de elevação
("bordas finas carregam hierarquia" / "sombras carregam hierarquia" /
"espaço em branco carrega hierarquia"). A conversa sugere que isso devia ser
um terceiro eixo explícito, não uma linha dentro da tabela de arquétipos.

**A regra de ferramentas de criação (chrome neutro ao redor de um viewport
aceso).** Fisicamente correta — é por isso que Lightroom, Premiere e Resolve
usam cinza neutro na interface: qualquer branco competindo com a imagem
distorce a percepção de cor do usuário. Hoje nenhum dos cinco arquétipos
cobre esse caso de uso de forma explícita; "Utilitarian & Technical" é o mais
próximo, mas foi desenhado pensando em dashboards densos (GitHub, AWS
Console), não em ferramentas de calibração visual.

### 1.2 Deriva terminológica — nomes demais para os mesmos conceitos

A conversa não é internamente contraditória em essência, mas acumula
sinônimos ao longo do tempo sem nunca declarar qual é o nome final. Isso
importa porque **é exatamente o tipo de ambiguidade que vaza para uma
pergunta de entrevista mal formulada.**

| Conceito                                        | Nomes usados na conversa                                                                                                    |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Fundo mais escuro/atenuado, cards mais claros   | "Inverted Surface Layout" (resp. 6) → "Lighter = Closer" (resp. 8, 9)                                                       |
| Fundo claro, containers rebaixados mais escuros | "Modelo Cavado" (resp. 1–2) → "Subdued Container" (resp. 6) → "Darker = Carved" (resp. 8) → "Entalhe Progressivo" (resp. 9) |
| Escola de marca (`brand`)                       | "escola de marca" (prompt do usuário) → "Hierárquica" (resp. 5, 8, 9)                                                       |

O nome "Inverted Surface" é particularmente arriscado de herdar como está:
sugere inversão de tema (light/dark), que é um conceito completamente
diferente e já resolvido pela ferramenta via `derive.dark()`. Se a pergunta
nova usar essa palavra sem cuidado, um cliente ou um agente lendo
`DESIGN_LANGUAGE.md` depois vai confundir "fundo invertido" (a pergunta de
hoje) com "tema invertido" (dark mode). Isso precisa de nome próprio, sem a
palavra "invertido".

"Hierárquica" também não deveria sobreviver como um quarto nome solto: a
tabela de combinações da resposta 9 lista três pares Escola+Modelo completos
(Accent-Driven + Lighter=Closer, Accent-Driven + Flat Boundary, Funcional +
Darker=Carved) e uma quarta linha, "Hierárquica + Pares de Container", que
quebra o padrão da própria tabela por não dizer qual modelo de superfície ela
usa. Isso não é uma quarta escola — é a escola `brand` da ferramenta, com um
nome diferente colado por cima. Vale canonizar de volta para `brand` e
verificar se ela também precisa de um modelo de superfície associado
(provavelmente `Darker = Carved` ou um modelo próprio de "par de cores
sólidas", já que bancos/e-commerces tendem a usar blocos de cor cheia, não
neutros).

### 1.3 Confusão de escala — "cavado" muda de tamanho ao longo da conversa

Este é o ponto mais importante a resolver antes de escrever qualquer
pergunta nova. Na resposta 1, "cavado" (recessed) é uma técnica de
**componente**: um badge, uma tag, um campo de input pode ser cavado
independente de qualquer coisa acontecendo no resto da tela. Na resposta 6,
"cavado" vira o nome de um **modelo de página inteira** (Subdued Container):
fundo branco, e a camada inteira de cards/containers mais escura. A resposta
9 usa "Entalhe Progressivo" no mesmo sentido de página inteira.

São duas coisas de granularidade diferente que a conversa trata como se
fossem a mesma palavra em escalas diferentes — o que até faz sentido
fisicamente (um recesso local é o mesmo princípio de luz que um recesso
global), mas **operacionalmente são decisões separadas**: um produto pode
usar o modelo de página `Flat Boundary` (fundo e cards no mesmo tom) e ainda
assim cavar localmente um input de busca ou uma tag, sem que isso implique
adotar `Darker = Carved` como modelo de página. Se a ferramenta perguntar só
uma vez "seu produto é cavado?" ela vai colapsar duas decisões independentes
em uma. A pergunta nova precisa necessariamente separar **modelo de
superfície da página** de **uso local de cavidade em componentes**.

### 1.4 Pontos a tratar com cautela, não a herdar como regra

A régua "60-30-10" adaptada (resp. 8) é uma analogia esticada: a regra
clássica descreve blocos de cor de fundo, não uma mistura de espaço,
tipografia e borda somados em "30% de estrutura". É útil como mnemônico para
explicar a um cliente por que o accent deve ser raro, mas não deveria virar
um checker automático de proporção de tela — não há como medir "30% de
tipografia" de forma que signifique algo.

As referências a produtos reais (Spotify = accent de alto contraste, Gemini
= accent de baixo contraste, Vercel = flat boundary) são ilustrativas, não
verificadas nesta conversa — interfaces mudam. Servem para dar um exemplo
mental ao cliente na entrevista, não como afirmação de fato sobre o estado
atual desses produtos.

Por fim, a conversa nunca aborda como um modelo de superfície se comporta
sob o tema escuro. Isso é relevante porque `derive.dark()` já tem uma regra
específica contra inversão ingênua de lightness (o "bug do 2.39:1"
documentado na seção 7). Um modelo `Lighter = Closer` no claro pode não
significar a mesma relação de contraste no escuro — precisa de uma regra de
derivação própria, não herdada por analogia direta.

---

## 2. O que isso revela sobre a necessidade real

Cruzando a conversa com a estrutura atual da entrevista (22 perguntas, 6
blocos), três lacunas concretas aparecem:

1. **Não existe um eixo explícito de modelo de superfície.** Ele está
   escondido dentro da linha "Elevação" da tabela de arquétipos (seção 5),
   tratado como consequência de personalidade em vez de decisão própria e
   combinável livremente com qualquer escola de cor — que é exatamente o
   argumento mais forte da conversa.
2. **A taxonomia de borda (divisão vs. interatividade) não tem dois nomes de
   token próprios.** Hoje há um token genérico de borda; a régua de
   camada 2 precisa de dois papéis nomeados, do mesmo jeito que já existem
   quatro papéis interativos (`action`/`selected`/`link`/`neutral`).
3. **Nenhum arquétipo cobre ferramentas de criação/calibração visual**
   (editores de imagem, 3D, vídeo), onde o motivo de reduzir contraste do
   chrome é fisiológico, não estético.

---

## 3. Plano de execução

A regra geral da ferramenta é: **prefira derivação a pergunta nova.** Cada
item abaixo diz explicitamente se deve virar pergunta na entrevista ou regra
de derivação silenciosa — e por quê.

### Fase 0 — Canonizar vocabulário (pré-requisito, sem código)

Fixar três nomes finais antes de tocar em `questionnaire.md`:

| Conceito                         | Nome a abandonar                                  | Nome canônico proposto                                |
| -------------------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Fundo atenuado + cards claros    | "Inverted Surface"                                | **`surfaceModel: elevated`** ("elevação por luz")     |
| Fundo claro + containers escuros | "Subdued Container" / "Darker=Carved" / "Entalhe" | **`surfaceModel: recessed`** ("entalhe")              |
| Fundo e cards no mesmo tom       | "Flat Boundary"                                   | **`surfaceModel: flat`** (mantém o nome — já é claro) |
| Escola de marca                  | "Hierárquica"                                     | **`brand`** (já existe — só aposentar o sinônimo)     |

Atualizar o glossário (seção 11 de `ferramenta-design-system.md`) com esses
três valores assim que a Fase 1 confirmar o formato da pergunta.

### Fase 1 — Nova pergunta de entrevista: modelo de superfície

Adicionar ao **Bloco 3** (fundamentos visuais e geometria, hoje perguntas
7–10) uma pergunta nova, na mesma família das 7–10, com tabela ✅/⚠️/❌ por
arquétipo:

> _"Quando um card de conteúdo se destaca da página, ele deve parecer que
> flutua sobre um fundo mais escuro (like papel iluminado sobre uma mesa),
> parecer talhado dentro de um fundo mais claro (like um nicho rebaixado), ou
> a página inteira deve ficar no mesmo tom, com a separação feita só por
> linhas finas?"_

Três opções: `flat` / `elevated` / `recessed`. Isso é deliberadamente
desacoplado da pergunta de escola de cor (11) — os dois eixos devem poder
combinar livremente, replicando o argumento central da seção 1.1.

Recomendações por arquétipo (a calibrar durante a escrita, mas os sinais da
conversa apontam): Editorial & Premium → `elevated` ✅; Utilitarian &
Technical → `recessed` ✅ ou `flat` ⚠️; Tech Minimalist → `flat` ✅; Enterprise
Solid → `recessed` ✅; Playful & Expressive → `elevated` ✅ (sombra também
decorativa).

Derivações que essa resposta precisa alimentar em `derivations.md`:
direção de `--app-bg-page` vs. `--app-bg-surface`/`--app-bg-raised`/
`--app-bg-sunken` (qual é mais claro que qual), se `--app-border-divider`
some quando o contraste de fundo já faz o trabalho (regra explícita da
resp. 2: "se o card já é mais claro que a página, a borda de divisão é
redundante"), e uma nota específica de como esse valor se comporta sob
`derive.dark()` (ver seção 1.4).

### Fase 2 — Dois tokens de borda, sem pergunta nova

Não criar uma pergunta separada para isso — é inteiramente derivável de
`posture` (pergunta 10, já existe) cruzada com `surfaceModel` (Fase 1).
Adicionar aos 126 nomes de `tokens.md`:

- `--app-border-divider` (papel: separar conteúdo no mesmo plano, nunca
  implica clicável) — mapeia para o degrau de hairline mais fraco disponível
  na escala.
- `--app-border-interactive` (papel: affordance/estado — repouso, hover,
  seleção) — mapeia para o degrau mais forte, com escalonamento explícito de
  estado (repouso → hover → accent em foco/seleção), resolvendo a ambiguidade
  do degrau 7 vs. 8 apontada na seção 1.2.

Regra de emissão: quando `surfaceModel = flat`, `--app-border-divider` some
de containers estáticos e some por completo se o elemento for interativo (aí
só `--app-border-interactive` existe) — implementando a regra "se já há
diferença de tom, a borda de divisão é redundante" como comportamento do
build, não como instrução manual para quem for montar o tema.

### Fase 3 — Teto de elevação como guardrail, pergunta condicional

Não vale a pena perguntar isso para todo produto — a resposta é quase sempre
"um nível permanente, um temporário". Em vez de uma pergunta no fluxo
principal, adicionar ao **Bloco 6** (composição e guardrails, 19–22) uma
pergunta condicional que só aparece quando o produto é sinalizado como denso
(dashboards, ferramentas B2B — provavelmente detectável pela resposta de
densidade do bloco 2): _"quantas superfícies podem estar visivelmente
elevadas ao mesmo tempo na tela principal?"_, com 1 como default e qualquer
valor maior registrado como `deviation`, não como erro.

### Fase 4 — Arquétipo ou flag para ferramentas de criação

Duas opções, a decidir com o usuário antes de implementar: (a) acrescentar
um sexto arquétipo "Creative Tool / Calibração Visual", ou (b) um booleano
`colorCriticalWorkspace` que qualquer arquétipo pode carregar, forçando
`surfaceModel = flat` ou `recessed` com pigmentação neutra reduzida no chrome
e liberando o viewport de edição para ser a única superfície "acesa" da
tela. A opção (b) parece mais barata e mais alinhada ao espírito de "preset,
não jaula" da seção 5 — evita inflar de 5 para 6 arquétipos por um caso de
uso relativamente raro, que é exatamente o tipo de "layout pouco provável"
que o usuário não quer excluir, mas também não quer tratar como categoria de
primeira classe.

### Fase 5 — Atualizar `conflicts.md`

Registrar pelo menos duas combinações que merecem aviso de contradição em
vez de bloqueio: `surfaceModel = elevated` com `posture = loud` (fundo
atenuado tende a brigar com um accent de alto contraste simultâneo — mais
provável gerar cansaço visual, o argumento central da resp. 5 da conversa);
e `colorCriticalWorkspace = true` com `archetype = Playful & Expressive`
(sombras decorativas e cores vibrantes de chrome conflitam diretamente com o
motivo fisiológico da Fase 4).

### Fase 6 — Validação

Antes de considerar a pergunta pronta, rodar o read-back mental em três
perfis: um caderno de receitas (`elevated` + `monochrome` + accent subtle),
um dashboard B2B denso (`recessed` + `functional` + accent alto contraste
restrito a CTA), e um editor de imagem (`colorCriticalWorkspace` + `flat` ou
`recessed` + accent quase ausente fora do viewport). Se os três produzirem
combinações de token visivelmente diferentes e defensáveis, a pergunta está
calibrada; se dois deles convergirem no mesmo resultado, a pergunta ainda
não está discriminando o suficiente.

---

## 4. Riscos e próximos passos

O maior risco não é técnico, é de escopo da entrevista: cada pergunta nova
tem custo de fadiga do cliente. Este plano tenta pagar esse custo só uma vez
(Fase 1) e resolver o resto por derivação (Fases 2, 3 parcialmente, 5) —
mas vale revisar com o usuário se `colorCriticalWorkspace` (Fase 4) deveria
mesmo ser uma pergunta explícita do bloco 1/3, em vez de um flag que só
aparece quando o produto se descreve como ferramenta de edição visual.

Este documento não teve acesso a `questionnaire.md`, `derivations.md`,
`archetypes.md`, `colour-strategies.md` nem `conflicts.md` originais — só ao
resumo em `ferramenta-design-system.md`. As referências de pergunta/bloco
acima são propostas de encaixe, não edições diretas; antes de implementar,
os arquivos reais precisam ser abertos para confirmar numeração exata de
pergunta e não colidir com algo já existente.
