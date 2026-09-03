## 1. Nomenclatura de botões

Aqui existem dois eixos que quase toda biblioteca confunde, e vale separar desde o início porque a confusão vaza para a API dos seus componentes.

**Eixo 1: hierarquia (prioridade).** Primário, secundário, terciário. Isso descreve _importância relativa dentro de uma tela_, não aparência. É uma propriedade da composição.

**Eixo 2: tratamento (aparência).** Preenchido, tonal, contornado, texto. Isso descreve _como o pigmento é aplicado_. É uma propriedade do componente.

Um mesmo tratamento pode servir hierarquias diferentes em telas diferentes. Um botão contornado é secundário ao lado de um sólido e é primário numa tela onde ele é o único botão.

O mercado se divide justamente aí:

| Sistema      | Nome da prop       | Valores                                                  |
| ------------ | ------------------ | -------------------------------------------------------- |
| Carbon (IBM) | `kind`             | primary, secondary, tertiary, ghost, danger              |
| Ant Design   | `type`             | primary, default, dashed, text, link                     |
| Material 3   | tipo de componente | filled, filled tonal, elevated, outlined, text           |
| Radix Themes | `variant`          | solid, soft, surface, outline, ghost                     |
| Bootstrap    | classe             | btn-primary, btn-secondary... (mistura cor e hierarquia) |

Carbon nomeia por hierarquia, Radix e Material nomeiam por tratamento. Bootstrap faz a pior escolha das três: `btn-secondary` é ao mesmo tempo uma hierarquia e uma cor, e é por isso que quase todo projeto Bootstrap acaba com um botão cinza que também é o item selecionado do menu.

**Minha recomendação para uma fundação independente de framework:** exponha hierarquia na API e resolva tratamento no tema. `<Button priority="secondary">` sobrevive a uma troca de escola de cor; `<Button variant="soft">` não. E mantenha `intent` (neutral, danger) como um terceiro eixo cruzado, porque "excluir" existe em qualquer hierarquia.

Na escola monocromática, o mapeamento fica assim:

| Hierarquia | Tratamento                       | Tokens                               |
| ---------- | -------------------------------- | ------------------------------------ |
| Primária   | accent sólido                    | accent 9 + on-accent                 |
| Secundária | neutro preenchido, ou contornado | neutro 3 + neutro 12, borda neutro 7 |
| Terciária  | fantasma (só texto)              | neutro 11, fundo transparente        |
| Destrutiva | mesma escada, pigmento `danger`  | danger 9 / danger 3 / danger 11      |

O botão secundário em `monochrome` é sempre **neutro**, nunca uma versão lavada do accent. Isso importa: em `brand`, o secundário lavado é o padrão porque a cor da marca já está em tudo. Em `monochrome`, um secundário lavado com accent rouba a escassez do primário, que é a única coisa que a escola tem. Reserve o lavado do accent para `selected`, e você acaba com uma separação limpa: **preenchido cromático = ação primária, lavado cromático = estado, preenchido neutro = ação secundária, fantasma = terciária.**

Um detalhe de composição que economiza discussão: uma tela tem no máximo um primário, mas pode ter vários terciários. Se você tem três botões visualmente equivalentes numa barra de ações, provavelmente dois deveriam estar num menu.

## 2. A diferença de fundos: como se chama e como funciona

O nome canônico é **escala de superfícies** (surface scale), e a variação entre elas é **elevação tonal** (tonal elevation). Material 3 chama de `surface`, `surface-container-low/high/highest`. A Apple chama de `systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`. Você já tem `--app-bg-page`, `--app-bg-surface`, `--app-bg-raised`, `--app-bg-sunken`, que é a mesma ideia com melhores nomes, porque os seus dizem o papel e não a ordem.

A física é simples e vale internalizar: **luz vem de cima.** O que está mais perto do observador recebe mais luz. Daí "mais claro é mais perto".

**Elevação** (o objeto está sobre a página) e **escavação** (a região está dentro da página) são a mesma escada percorrida em direções opostas, e a escolha entre elas não é estética, é semântica:

**Use elevação quando o elemento é um objeto autônomo sobre o canvas.** Card de conteúdo, painel, modal, popover. A pergunta que decide: se você pudesse arrastar esse elemento para fora da tela, ele continuaria fazendo sentido sozinho? Um card de receita sim. Um campo de busca não.

**Use escavação quando a região é um recipiente, um buraco que recebe algo.** Campo de input, textarea, trilho de slider, bloco de código, área de drop, o slot vazio onde uma imagem vai carregar, uma "well" que segura conteúdo de terceiros. A escavação comunica "aqui cabe coisa", e é por isso que campos de formulário escavados são lidos como preenchíveis mesmo sem borda.

Existe também escavação em nível de página, que é uma decisão diferente: fundo claro com a camada inteira de containers mais escura. iOS faz exatamente isso e é o melhor exemplo para estudar, porque a Apple **inverte a escada entre contextos**: em listas agrupadas no modo claro, o fundo é cinza e as células são brancas (elevação); no modo escuro, o fundo é preto e as células são cinza (também elevação, mas com valores invertidos). Ou seja, o modelo de superfície é preservado e os valores são recalculados. É exatamente isso que o seu `derive.dark()` precisa fazer: preservar a _relação_, não os números.

Duas restrições práticas:

- **A escavação tem piso.** No modo escuro você chega no preto rápido, e "mais escuro que o fundo" deixa de existir. Sistemas que dependem de escavação no claro precisam trocar para elevação ou para borda no escuro. Elevação não tem esse problema, porque sempre dá para clarear mais.
- **Você não pode alternar.** Escolher elevação para cards e escavação para o container que segura os cards, na mesma tela, produz uma tela onde o olho não consegue estabelecer qual plano é o chão. Escolha um modelo de página e use o outro só para os recipientes locais (inputs, wells), que são reconhecidos como exceção justamente por serem pequenos e interativos.

## 3. Cada superfície precisa recalcular seus próprios valores?

Sim, e essa é a parte da arquitetura que separa um sistema de tokens de uma lista de cores. Mas o "sim" é mais restrito do que parece, e a economia importa.

**O que precisa recalcular sempre:**

- **Bordas.** Uma hairline de `#00000014` sobre branco e sobre um cinza escuro não é a mesma linha. Ou você define bordas em alpha (e elas se adaptam sozinhas), ou você redeclara por contexto.
- **Sombras.** Uma sombra sobre uma superfície já escura é invisível. Sobre uma superfície acesa, precisa ser mais suave.
- **Fundos de elementos internos.** Um badge no degrau 3 sobre uma página no degrau 1 funciona. O mesmo badge dentro de um card no degrau 3 desaparece. O elemento interno precisa recalcular a partir da superfície pai, não da página.

**O que na maioria das vezes NÃO precisa recalcular:** a cor do texto. Se as suas superfícies estão dentro da faixa saudável de 1.05:1 a 1.3:1 entre si, o mesmo `--app-fg-default` passa em todas. Redeclarar texto por superfície é trabalho desperdiçado e uma fonte de bug. A exceção é quando você cruza uma inversão: superfície invertida, superfície accent, painel escuro dentro de um tema claro. Aí o contexto inteiro vira, e é para isso que existe o par `bg-X` / `fg-on-X`.

Sobre os dois mecanismos possíveis:

**Alpha** (`--app-border-color: rgb(0 0 0 / 0.08)`) se adapta automaticamente a qualquer superfície e custa um token só. O preço é que sobre superfícies cromáticas ou escuras ele fica sujo, e você perde a capacidade de auditar o contraste em compile time, porque o valor final depende do que estiver embaixo.

**Contexto explícito** (`[data-surface="raised"] { --app-border-color: ...; }`) é auditável, funciona em qualquer fundo, e é o que a sua arquitetura de subtemas já suporta. O preço é mais tokens e a obrigação de manter as combinações válidas.

O híbrido que eu recomendaria: **alpha para o que é decorativo** (divisores, hairlines, sombras) e **contexto explícito para o que tem requisito de contraste** (texto, bordas interativas, foco, accent). Assim o build consegue auditar exatamente o que precisa ser auditado, e o resto se adapta de graça.

## 4. O exercício da página de receitas

Vale começar pelo diagnóstico: cada um desses cinco elementos tem uma necessidade _diferente_, e três deles não precisam de nada.**O header que rola com a página não gasta nada.** Isso é o ponto mais contraintuitivo da lista. Um header que rola faz parte do documento; ele não flutua sobre nada, então não tem justificativa física para sombra nem para borda. Ele se separa do conteúdo abaixo por espaço e por escala tipográfica, e só. A pergunta a fazer é: e se ele virar sticky depois? Aí a fronteira aparece _no scroll_, como estado, não em repouso. Essa é a regra correta e vale codificar: a sombra ou linha do header é um token de estado (`--app-header-border-scrolled`), não um valor fixo.

**A barra de navegação gasta uma linha.** Ela é chrome, ou seja, não é conteúdo, e é a única fronteira da página que separa duas naturezas diferentes de coisa. Uma hairline no degrau 6 resolve. Não use tom aqui: dar fundo próprio à nav consome o seu único degrau de superfície num elemento que já é distinguível por posição, densidade e tipografia.

**O grid de receitas não gasta nada, e essa é a melhor notícia do exercício.** Um card de receita tem uma foto. **Uma imagem já é uma superfície.** Ela tem borda própria, densidade visual própria, e cria a fronteira do card de graça. Adicionar borda, fundo e sombra em volta de uma foto é o exemplo mais puro de mecanismos redundantes. Cards de receita precisam de espaço entre eles, de um raio de canto consistente com a foto, e de nada mais. Se o card ficar frouxo, o problema é a distância entre título e metadados, não a falta de moldura.

Isso generaliza: **antes de gastar um recurso, verifique se o conteúdo já resolveu.** Fotos, gráficos, avatares e blocos de código trazem superfície embutida.

**O aside gasta o degrau de tom, escavado.** Duas razões. Primeiro, semântica: publicidade e controles não são conteúdo da página, são coisa encaixada nela, e escavação diz exatamente isso. Segundo, e mais importante: **um anúncio é uma região de pixels que você não controla.** Ele vai trazer cor saturada, contraste alto e provavelmente um CTA. Se você elevar essa região, você amplifica um competidor do seu accent. Escavar rebaixa. Some a isso um rótulo tipográfico pequeno e caixa alta, que é o que separa publicidade de conteúdo editorial sem precisar de mais nenhum recurso.

Os controles de filtro dentro do aside gastam um recurso diferente, e isso não conta no mesmo orçamento: eles usam `--app-border-interactive`, que é afordância e não separação. Campos e selects podem e devem ter borda, mesmo num sistema que evita bordas, porque ali a borda está dizendo "clicável", não "aqui termina uma seção".

**A sombra fica guardada** para o menu de conta, o dropdown de filtro no mobile e qualquer modal. Zero sombras em repouso.

Um efeito colateral que vale registrar: com o aside escavado e o anúncio dentro dele, o seu accent sólido está livre para ser gasto onde importa, provavelmente em "salvar receita" ou no CTA de assinatura no fim do conteúdo. Um por viewport.

## 5. Espaço

Espaço é o mecanismo mais barato e o mais mal usado. Três regras carregam quase tudo.

**A regra da proximidade relativa.** O espaço _dentro_ de um grupo tem que ser menor que o espaço _em volta_ dele, com folga. Uma proporção de 1.5x a 2x é o mínimo para o olho ler o agrupamento sem ambiguidade. Título e subtítulo a 4px, o par a 24px do próximo bloco: legível. Título e subtítulo a 12px, blocos a 16px: o olho não sabe o que pertence a quê, e nenhuma borda conserta isso. Quando alguém diz que uma tela está "confusa" e a resposta é adicionar linhas, quase sempre o erro real é essa proporção.

**Espaço é direcional.** Um título pertence ao que vem _depois_ dele, então a margem acima deve ser maior que a margem abaixo, tipicamente 2x ou 3x. Isso é uma das coisas que mais rapidamente faz uma página parecer projetada em vez de montada. `margin-top` maior que `margin-bottom` em todos os headings, e você resolve metade do ritmo vertical de um site de conteúdo.

**A escala é geométrica, não linear.** 4, 8, 12, 16, 24, 32, 48, 64. Passos linearmente espaçados (4, 8, 12, 16, 20, 24, 28) produzem degraus indistinguíveis no topo da escala, e o desenvolvedor acaba escolhendo por sorteio. Poucos degraus, bem separados, e cada um com um cargo. Os seus nomes de intenção (`--app-pad-surface`, `--app-gap-stack`) são a forma certa de expor isso: quem consome não escolhe um número, escolhe uma situação.

Sobre densidade: ela é espaçamento, altura de controle e leading juntos, como o seu doc já registra. Um modo compacto que só reduz padding e mantém `line-height: 1.6` produz uma tela apertada com texto solto, que é pior que qualquer um dos dois extremos.

Uma última: **espaço assimétrico é uma ferramenta de hierarquia.** Um bloco que ganha o dobro de respiro dos vizinhos é lido como mais importante sem qualquer outra pista. Isso é hierarquia de graça, e é o principal recurso do arquétipo Editorial.

## 6. Tipografia

Na escola monocromática a tipografia carrega o que a cor carregaria. Você tem quatro alavancas: **tamanho, peso, cor neutra (degraus 11 e 12) e espaço.** A regra de composição é usar no máximo duas por nível de hierarquia. Título maior _e_ mais pesado _e_ mais escuro _e_ mais espaçado é o mesmo erro de redundância das bordas, só que em tipografia.

**Escala: poucos degraus, bem separados.** Uma razão entre 1.2 (terça menor) e 1.25 (terça maior) para produtos, 1.333 ou mais para editorial. Cinco a sete degraus bastam. E a regra prática que resolve mais briga de revisão do que qualquer outra: **dois níveis hierárquicos vizinhos precisam estar a dois degraus de distância na escala, não a um.** Degraus adjacentes numa escala de 1.2 diferem em 20%, o que o olho lê como "erro" e não como "hierarquia".

**Peso: dois, no máximo três.** Regular e medium resolvem quase tudo. Bold e semibold juntos na mesma tela são indistinguíveis à distância e você acabou de gastar uma alavanca sem ganhar hierarquia. Se você precisa de mais separação, suba de tamanho ou desça de degrau de cor.

**Line-height é inversamente proporcional ao tamanho.** Corpo em 1.5 a 1.6, títulos grandes em 1.2 ou menos. Um h1 com 1.5 de leading parece que as linhas não se conhecem. E a medida (largura da linha) fica entre 45 e 75 caracteres para leitura contínua; acima disso o olho perde o retorno de linha. Num grid de receitas com aside, isso é o argumento real para a largura da coluna central, mais do que qualquer preferência de layout.

**Cor tipográfica é uma escada, não dois valores.** Degrau 12 para títulos, 11 para corpo, 11 mais claro ou 10 para metadados e legendas. Nunca use `opacity` para isso: opacidade multiplica contra o fundo, então o mesmo texto "secundário" tem contraste diferente em cada superfície e você perde a auditoria. Use degraus declarados.

**Detalhes que rendem muito:**

- **Numerais tabulares** (`font-variant-numeric: tabular-nums`) em qualquer coisa que empilhe números: tempo de preparo, porções, tabelas, preços. Sem isso, colunas de números tremem.
- **Caixa alta com letter-spacing** para rótulos pequenos (`PUBLICIDADE`, `INGREDIENTES`). É a única situação onde caixa alta ajuda, e ela precisa de tracking positivo, entre 0.04em e 0.08em, porque as maiúsculas foram desenhadas para espaçamento de minúsculas.
- **Tracking negativo em títulos grandes.** Fontes são desenhadas para tamanho de corpo; a partir de uns 32px elas parecem soltas. Um `-0.01em` a `-0.02em` conserta.
- **Uma família só, com uma segunda opcional para títulos.** Duas famílias de texto num produto é uma decisão que precisa de justificativa; três é sempre erro.

O teste final da escola inteira: tire toda a cor da tela, deixe tudo em cinza. Se a hierarquia continua legível e você ainda sabe qual é a ação principal pela posição, pelo tamanho e pelo espaço, o sistema está certo e o accent é um bônus. Se a tela desmonta, a cor estava fazendo um trabalho que não era dela.
