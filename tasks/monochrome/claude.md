Vou separar isso em duas partes: primeiro a escola em si (o que ela é, de onde vem, o que ela cobra de você), depois as duas dúvidas específicas, que na verdade são a mesma pergunta feita em escalas diferentes.

Antes de tudo, uma nota de vocabulário: "accent-driven" e "monochrome" são o mesmo padrão de atribuição. Prefira um nome só. Vou usar `monochrome` aqui porque é o nome que descreve a restrição (uma cor viva, o resto neutro), enquanto "accent-driven" descreve a consequência.

## 1. O que a escola realmente é

Não é "interface sem cor". É uma regra de economia: **existe exatamente um pigmento cromático vivo no sistema, e ele é gasto com parcimônia. Todo o resto é uma escada de neutros.**

O que isso compra:

- **Significado por escassez.** Se só uma coisa na tela é colorida, essa coisa é importante sem precisar de nenhuma outra pista. Numa escola `functional`, azul/verde/roxo/laranja competem, e o usuário precisa aprender o código antes de ler a tela.
- **White-label barato.** Trocar o pigmento troca a personalidade do produto inteiro sem tocar um token semântico. É por isso que Radix, Vercel e a HIG da Apple convergiram nisso: um sistema com uma cor é um sistema com um parâmetro.
- **Modo escuro previsível.** Menos matizes vivos, menos casos em que o contraste quebra ao inverter.

O que isso cobra, e é a parte que quase todo mundo subestima: **quando você tira a cor, hierarquia, agrupamento e estado passam a ser carregados por espaço, tom neutro, tipografia e forma.** Numa escola `brand` você pode ter uma tipografia medíocre e um espaçamento aleatório e ainda assim parecer "um produto", porque a cor da marca costura tudo. Em `monochrome` isso vira visivelmente ruim. A escola é mais barata de manter e mais cara de projetar.

Uma consequência que quase ninguém antecipa: **em `monochrome`, tratamento substitui matiz como diferenciador.** Nas outras escolas, "ação primária" é azul e "selecionado" é roxo. Aqui os dois usam o mesmo pigmento, então a diferença tem que ser expressa em _como_ o pigmento é aplicado (preenchido vs. lavado vs. contornado vs. só texto). Guarde essa frase, porque ela é a resposta direta à sua segunda pergunta.

## 2. A escada de neutros é o produto real da escola

O erro mais comum é achar que a decisão importante é qual accent escolher. Não é. É a escada neutra.

**Neutros puros (`#808080`) quase nunca são a resposta.** Um cinza com um pouco do matiz do accent misturado faz a interface parecer intencional; um cinza puro ao lado de um accent quente parece que alguém esqueceu de escolher. É por isso que sua função `ramp.neutral($pigment)` existe. Entre 2% e 8% de croma é a faixa útil; acima disso o "neutro" começa a ser lido como cor e a escassez do accent se dilui.

**Trabalhe em OKLCH, não em HSL.** Em HSL, `hsl(220 60% 50%)` e `hsl(60 60% 50%)` têm a mesma "lightness" declarada e luminâncias percebidas completamente diferentes. Isso significa que uma escada montada em HSL tem degraus que não são degraus. Em OKLCH, o L corresponde razoavelmente ao que o olho lê, então uma escada uniforme em L é uniforme na percepção. Tailwind v4 migrou a paleta inteira para OKLCH por esse motivo, e é uma boa camada 1 para você.

**Os degraus têm cargos, e é isso que você precisa formalizar.** O modelo de 12 degraus do Radix Colors é a articulação mais clara que existe disso, e é exatamente o vocabulário que os seus documentos já usam quando falam em "degrau 3" e "ambiguidade do 7 vs. 8":

| Degrau | Cargo                                                                 | Aproximação em Tailwind |
| ------ | --------------------------------------------------------------------- | ----------------------- |
| 1      | fundo da página                                                       | 50                      |
| 2      | superfície sutil, hover de linha                                      | 50/100                  |
| 3      | **fundo de elemento em repouso** (badge, chip, tag, botão secundário) | 100                     |
| 4      | o mesmo elemento em hover                                             | 200                     |
| 5      | o mesmo elemento pressionado/selecionado                              | 200                     |
| 6      | borda de divisão (hairline, decorativa)                               | 200                     |
| 7      | borda de elemento interativo em repouso                               | 300                     |
| 8      | borda em hover, anel de foco                                          | 400                     |
| 9      | **preenchimento sólido** (a cor "pura" do accent)                     | 500/600                 |
| 10     | preenchimento sólido em hover                                         | 600/700                 |
| 11     | **texto de baixo contraste** (≥4.5:1 contra 1/2)                      | 700                     |
| 12     | texto de alto contraste, títulos                                      | 900/950                 |

O mapeamento para Tailwind é aproximado, não uma equivalência. Mas a tabela vale mais do que a paleta: ela diz que 3, 6, 7, 9 e 11 são cargos _diferentes_, e que pular um deles é o que faz um build "tecnicamente monocromático" parecer genérico. O degrau 3 é o mais esquecido de todos.

A escada roda duas vezes: uma para os neutros, uma para o accent. E aí você tem literalmente 24 valores para construir um sistema inteiro.

**O que a escola não muda:** `success` / `warning` / `danger` / `info` continuam cromáticos. Uma confirmação destrutiva é vermelha em qualquer escola. Se você tentar fazer "danger monocromático", perde uma convenção universal por coerência estética. Não vale.

## 3. Espaço, superfície ou borda?

A pergunta certa não é "qual eu uso", é **"qual mecanismo carrega esta fronteira específica"**. Existem quatro, em ordem crescente de custo visual:

1. **Espaço** (proximidade). Gestalt puro. Custa zero atenção e zero bytes; custa viewport.
2. **Tom** (superfície com fundo diferente). Custa um degrau da escada, e você só tem uns três antes de ficar sem contraste.
3. **Linha** (borda/divisor). Custa muito pouco viewport, mas cada linha é um traço que o olho tem que processar. Muitas linhas = ruído.
4. **Sombra** (elevação). O mais caro. Simula física; se você mentir sobre a física, a tela fica desconfortável sem que ninguém saiba dizer por quê.

**A regra central: uma fronteira, um mecanismo.** Um card com fundo diferente _e_ borda _e_ sombra é o visual "Bootstrap default" que você provavelmente está tentando evitar. Quando você sente necessidade do segundo mecanismo, geralmente é porque o primeiro está fraco demais, e a correção é fortalecer o primeiro.

Existe uma exceção legítima: elementos interativos frequentemente precisam de tom _e_ borda, porque o tom carrega a identidade (isto é um campo) e a borda carrega o estado (repouso → hover → foco). Aí são dois mecanismos com dois trabalhos, não redundância.Os quatro comunicam a mesma coisa. A escolha entre eles é funcional, e escala assim:

**Comece com espaço. Escale só quando o espaço falhar.** Espaço falha em cinco situações reconhecíveis:

- O conteúdo é **infinito ou rolável**, e não existe um "fim" natural que o espaço possa marcar.
- Os itens são **heterogêneos** (um gráfico ao lado de um parágrafo ao lado de uma tabela). Proximidade agrupa coisas parecidas; quando são diferentes, o olho precisa de uma fronteira declarada.
- O produto é **denso** por natureza. Dashboards e ferramentas B2B ficam sem viewport antes de ficarem sem conteúdo, e é exatamente por isso que Grafana e o console da AWS são feitos de linhas enquanto Notion e Medium são feitos de espaço.
- O bloco é **clicável inteiro**. Um alvo de clique precisa de limites visíveis, senão o usuário não sabe onde ele começa.
- O agrupamento precisa **sobreviver a um fundo diferente** (o mesmo card aparece na página e dentro de um modal).

Se o espaço falhou, o próximo é **tom**, não borda. Tom é mais silencioso que linha e agrupa melhor. E aqui entra o limite que ninguém documenta: **você só tem dois, no máximo três níveis de tom** antes de ficar sem contraste utilizável. Superfícies adjacentes ficam tipicamente entre 1.05:1 e 1.3:1 de contraste. Empilhe quatro e o quarto some. Então profundidade além do nível 2 obrigatoriamente troca de mecanismo: card em tom, e dentro dele seções por espaço.

**Linha entra quando o tom não é visível o suficiente.** Isso acontece muito no modo escuro (a mesma diferença de L rende menos contraste percebido no escuro) e em produtos que precisam de fronteira em densidade alta. Regra derivada, e essa vale automatizar no build: se o card já tem fundo diferente da página, o divisor externo é redundante. Ou tom, ou linha.

**Sombra só para o que é temporário ou realmente flutua.** Modal, popover, menu suspenso, dropdown. Header e sidebar não flutuam, eles são chrome fixo. O teto saudável é um nível permanente (cards) e um temporário, com no máximo duas camadas flutuantes simultâneas. E sombra praticamente não funciona no escuro: sombra é ausência de luz, e sobre um fundo escuro não há luz para remover. No escuro, elevação vira _lightness_ (o que está mais perto é mais claro), não sombra. Se o seu `derive.dark()` não converter sombra em tom, o modo escuro fica chapado.

Sobre contraste: a WCAG 1.4.11 exige 3:1 para bordas que **identificam um controle**. Um divisor decorativo entre duas linhas de lista está fora dessa exigência, e tentar levar todo divisor a 3:1 produz uma interface listrada e agressiva. Na prática: divisor ~1.2–1.5:1 contra a superfície, borda interativa em repouso ~1.6–2:1, foco e seleção 3:1 ou mais. Isso justifica os seus dois tokens (`--app-border-divider` e `--app-border-interactive`) melhor do que estética: são dois requisitos legais diferentes.

## 4. Os três tratamentos de accent

Agora a sua segunda pergunta. Os três casos que você descreveu não são estilos alternativos, são **degraus de uma escada de proeminência**, e cada degrau tem um trabalho.**Sólido (accent saturado, texto invertido) significa convite.** Algo acontece se você apertar. É o CTA primário, e a regra de orçamento é rígida: no máximo um por viewport, e no máximo um por superfície flutuante. Dois botões sólidos lado a lado destroem a hierarquia inteira, porque o usuário não recebe nenhuma pista de qual é o caminho esperado. Se você acha que precisa de dois, um deles é secundário e ainda não sabe disso.

**Lavado com tinta accent significa estado.** A interface está _agora_ nesta condição: aba selecionada, chip marcado, item de navegação ativo, badge que informa algo ligado ao accent. É o mesmo pigmento em volume muito menor, e o recado é "mesma família do primário, prioridade menor".

Aqui está a diferença mecânica que resolve a sua dúvida, e ela já está no seu vocabulário: **`action` é preenchido, `selected` é lavado.** Preenchimento é convite, tom lavado é estado. Se um item de menu ativo e um botão "salvar" saem do mesmo jeito, você colapsou dois papéis. Essa é exatamente a colisão que o seu `check-roles()` procura, só que a solução em `monochrome` não é trocar de matiz (não tem outro matiz), é trocar de tratamento.

**Lavado com tinta neutra significa ambiente.** O tom está ali para agrupar ou destacar uma região, e não para dizer que aquela região é "sobre o accent". Callout, linha de tabela em destaque, bloco de nota, fundo de um item selecionado numa lista **cujo texto é longo**.

O critério que decide entre lavado-accent e lavado-neutro é o comprimento do texto. Uma a três palavras: tinta accent, e a cor reforça o rótulo. Uma frase ou mais: tinta neutra, porque ler um parágrafo inteiro numa cor cromática é cansativo e o contraste do degrau 11 é calibrado para rótulo, não para leitura contínua. Um callout inteiro em azul sobre azul-claro é o erro clássico.

Três detalhes técnicos que evitam retrabalho:

**A tinta sobre o lavado não pode ser a mesma cor do preenchimento sólido.** Degrau 9 sobre degrau 3 dá algo em torno de 2:1. Você precisa de um degrau dedicado (o 11), calibrado para ≥4.5:1 contra os degraus 1–3. É por isso que o seu `accentContrast` precisa existir como token próprio, e não como uma derivação preguiçosa do accent.

**Nunca use o lavado sozinho como sinal de interatividade.** Tom lavado é lido como estado ou ambiente, não como afordância. Se um chip lavado é clicável, ele precisa de uma segunda pista: borda interativa, cursor, ou posição num grupo obviamente acionável.

**No escuro, o lavado não pode ser feito com alpha sobre o fundo.** Accent a 12% de opacidade sobre um fundo escuro produz lama sem croma. Construa o lavado misturando o accent com a superfície de destino (`color-mix(in oklch, ...)`) e recalcule, e no escuro suba a lightness e baixe o croma do sólido, senão ele vibra.

## 5. Estados quando você só tem uma cor

Hover, foco, pressionado, selecionado e desabilitado precisam de cinco expressões distintas usando um pigmento. A saída é sempre a mesma: **mude de degrau, não de matiz.**

| Estado       | Onde a mudança acontece                                                            |
| ------------ | ---------------------------------------------------------------------------------- |
| repouso      | degrau 3 (fundo) ou 9 (sólido), borda 7                                            |
| hover        | um degrau acima: 3→4, 9→10, borda 7→8                                              |
| pressionado  | mais um degrau: 4→5                                                                |
| foco         | anel externo no degrau 8, sempre com offset, nunca substituindo a borda de repouso |
| selecionado  | degrau 5 + borda 8, ou o lavado com tinta accent                                   |
| desabilitado | sai da escada do accent e volta para a neutra                                      |

Duas regras de acessibilidade que economizam bug depois: foco nunca pode ser expresso apenas por mudança de fundo (é isso que o `outline: revert` do seu reset resolve), e "selecionado" nunca pode ser expresso apenas por cor, precisa de peso, marca ou borda junto, senão daltônicos perdem o estado.

## 6. Como isso encosta em Bootstrap, daisyUI e Tailwind

Você quer usar bibliotecas prontas, e essa é a parte prática. As três chegam com uma escola embutida que não é a sua:

- **Bootstrap** é `functional` de nascença: `primary`, `secondary`, `success`, `info`, `warning`, `danger` são seis matizes distintos. Ir para `monochrome` significa remapear `$primary` para o accent, `$secondary` para um degrau neutro, e aceitar que `$info` provavelmente vira o próprio accent. Faça isso nas variáveis Sass `!default` antes da compilação, não com CSS por cima.
- **daisyUI** já é quase compatível: `--p`, `--s`, `--a` e a família `base-100/200/300` são literalmente uma escada de superfícies mais três papéis. Apontar `--s` e `--a` para degraus do neutro é uma linha de tema.
- **Tailwind v4** não tem escola nenhuma, só uma camada 1 em OKLCH. É a melhor base para o seu nível 1 justamente porque não opina.

O ponto de atenção comum aos três: todos usam `secondary` para "botão cinza neutro", que no seu vocabulário é `neutral`, não `selected`. É a armadilha que os seus documentos já registram, e ela reaparece em qualquer biblioteca nova que você adaptar.

## 7. Receita inicial

Se você precisar começar hoje sem saber qual é o projeto:

1. Um pigmento cromático. Nunca invente, pergunte.
2. Uma escada neutra derivada do matiz desse pigmento, com 2–6% de croma.
3. Doze degraus em cada uma, com os cargos da tabela da seção 2.
4. Separação: espaço por padrão; tom para cards; linha só em densidade alta ou no escuro; sombra só para o que flutua e é temporário.
5. Accent: um sólido por viewport, lavado para estado, lavado neutro para blocos de texto longo, contornado quando houver muitos irmãos.
6. Status cromático e intocado.
7. Escala tipográfica com mais degraus do que você acha necessário, porque ela vai carregar parte do trabalho que a cor não faz mais.

O teste de calibração: monte a mesma tela três vezes, uma em cada escola. Se a versão `monochrome` ficar visivelmente pior que as outras duas, o problema não é a falta de cor, é que espaço e tipografia ainda não estão fazendo o trabalho delas.
