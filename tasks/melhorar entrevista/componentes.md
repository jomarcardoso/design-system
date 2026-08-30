# **Variações Criativas para Design System**

[https://gemini.google.com/app/07cb86ac58490aec](https://gemini.google.com/app/07cb86ac58490aec)

*User prompt: Eu estou propondo a criação de DS usando bibliotecas de mercado como Bootstrap e Bulma. Percebi que o problema de usar as libs é que os componentes tendem a ficar com a mesma cara. Falta um toque artístico. O input por exemplo tem aquele tradicional do bootstrap com label em cima e um campo com bordas arredondas e de cor suave abaixo. Já o Material design usa label flutuante que fica dentro do campo como um placeholder. Botões podem ser com fundo suave, fundo opaco saturado, apenas bordas, sem fundo sem bordas... Inclusive alguns minimalistas usam só ícones como botões. Alguns fazem links usando underline, outros com um ícone do lado, mudam a cor do texto, outros não... Os títulos mudam muito, trocam de cor, de peso da fonte, de font-family, tamanho, de ter um divisor embaixo... A cor de marcado, exemplo de um chips, as vezes é suave, outros é opaco. Campos de texto com ícones dentro. Caixas de diálogo e modais eu acho que tem muitos e não tenho exemplos para trazer. Muito disso é conduzido pelas decisões de linguagem, guideline e fundação escolhidos pelo usuário. Uma barra de navegação, pode ser mais ícones, ter menus flutantes, ter separadores, sombra ou não, cor diferente, breadcrumbs embutido, ser sticky, colapsar ao rolar a página, ser estático e rolar com a página, trazer o h1 dentro dele, ter logo... Vou querer de você um banho de ideias de como variar componentes.*

Response: Para tirar a interface da mesmice das bibliotecas tradicionais e injetar personalidade visual, a chave é manipular estrategicamente a geometria, a profundidade e a anatomia dos componentes de acordo com o arquétipo do seu produto.

**Botões & Ações**

> * **Puro Editorial (Text & Accent Offset):** Sem fundo ou borda; apenas tipografia serifada com sublinhado deslocado (text-underline-offset: 6px) que ganha a cor de destaque (*accent*) ao passar o mouse.  
> * **Neobrutalismo Gráfico:** Cantos retos (0px), bordas pretas bem marcadas (2px) e sombra sólida projetada sem desfoque (box-shadow: 4px 4px 0px \#000).  
> * **Glassmorphism Soft:** Fundo semitransparente com desfoque (backdrop-filter: blur(12px)), borda superior sutil simulando reflexo de luz e cantos em pílula (border-radius: 999px).  
> * **Micro-Interativo Icon-First:** Botões minimalistas contendo apenas ícone vazado que expande lateralmente revelando o texto da ação apenas no hover.

**Campos de Entrada (Inputs)**

> * **Inverted Surface (Efeito Folha de Papel):** O campo recebe fundo branco puro e flutua sobre uma página com tom neutro levemente aquecido (papel reciclado), sem bordas visíveis até ser focado.  
> * **Underline Minimalista:** Elimina a caixa envolvente; mantém apenas uma linha sutil na base (1px) que ganha espessura e cor ao digitar.  
> * **Floating Label em Caixa Alta:** O rótulo inicia dentro do campo como placeholder e transiciona para cima da borda em fonte *monospace* pequena e em caixa alta ao receber foco.  
> * **Slot Integrado de Prefixo/Sufixo:** Ícones ou unidades (ex: R$, kg) alojados em blocos cinza-atenuados dentro do próprio container do input.

**Superfícies & Cards**

> * **Flat Boundary (Separação por Linha):** Fundo do card idêntico ao canvas da página, utilizando exclusivamente bordas finas (1px) de baixo contraste e cantos de 4px a 6px para organizar a leitura.  
> * **Elevado por Tonus (No-Border):** Hierarquia criada sem linhas ou sombras pesadas, apenas alternando do Degrau 1 (fundo) para o Degrau 2 ou 3 da escala de neutros.  
> * **Corte Assecundário/Assimétrico:** Cantos arredondados apenas em diagonal (topo-esquerdo e baixo-direito em 16px, demais em 0px) para estéticas conceituais ou de moda.

**Navegação (Headers & Bars)**

> * **Ilha Flutuante (Floating Island):** Navbar descolada do topo da tela, centralizada com cantos arredondados, fundo de vidro desfocado e sombra suave.  
> * **Header Breadcrumb Evolutivo:** O título principal H1 repousa no topo da página e encolhe suavemente para dentro da navbar ao rolar o scroll.  
> * **Dock Vertical Retrátil:** Barra lateral fixa apenas com ícones vazados em repouso que expande lateralmente com rótulos ao passar o ponteiro.

**Modais & Dialogs**

> * **Bottom Sheet Slide:** Em telas menores, a caixa de diálogo desliza da parte inferior cobrindo \~60% da tela com cantos superiores arredondados (16px–24px).  
> * **Canvas Focado com Blur:** O modal ocupa quase a viewport inteira com uma margem sutil nas bordas, desfocando todo o fundo para leitura de artigos ou formulários extensos.

---

*User prompt: Siga dando trazendo ideias de mercado para chips, tags, badges, links e breadcrumbs.*

Response: Para transformar esses elementos utilitários em marcas registradas da sua interface, a chave é manipular o peso visual, a densidade da informação e os marcadores de interação.

**Chips & Tags (Filtros e Categorizações)**

> * **Pílula Neutra com Dot Indicador:** Fundo neutro sutil (Degrau 3), formato em pílula (999px) e um pequeno ponto colorido (*status dot*) antecedendo o texto para categorizar sem preencher a tag inteira de cor.  
> * **Monospace Outlined (Estilo Técnico):** Sem fundo, com borda sutil de 1px, cantos retos (0px ou 2px) e tipografia em caixa alta com fonte *monospace*. Excelente para sistemas de dados, logs ou metadados.  
> * **Filter Chip de Ação Dupla:** Divisão interna sutil onde o lado esquerdo aplica/ativa o filtro e a extremidade direita traz o ícone de remoção (×) que só surge ao passar o mouse ou quando a tag está em estado selecionado.  
> * **Subtle Accent Fill (Seleção Suave):** Quando ativo, o chip ganha um tom de destaque pastel/suave (accent-subtle) em vez de uma cor saturada, mantendo o texto em tom neutro de alto contraste.

**Badges (Contadores e Status)**

> * **Floating Dot Flutuante:** Ponto minúsculo sem número, posicionado no canto superior direito de avatares ou ícones de notificação, apenas indicando a existência de novidades sem ocupar espaço visual.  
> * **Soft Surface Pill para Tabelas:** Badge compacto retangular com cantos levemente arredondados (4px) e fundo neutro atenuado, usado em colunas de tabelas para exibir contagens (ex: \+3, R$ 45).  
> * **Glassmorphism para Mídias:** Fundo translúcido desfocado (backdrop-filter: blur) com borda sutil branca/clara, projetado para ficar sobreposto a fotos de pratos ou banners sem poluir a imagem.  
> * **Attached Edge Badge:** Badge sem arredondamento encaixado diretamente na borda superior ou lateral de um card (estilo aba presa), dando um aspecto de etiqueta física.

**Links & Ações Textuais**

> * **Underline Deslocado e Interativo:** Texto padrão sem decoração que ganha um sublinhado elegante com folga (text-underline-offset: 4px ou 6px) na cor do *accent* apenas no *hover*.  
> * **Contextual Arrow (Indicador de Saída):** O texto é acompanhado por uma microseta (↗ ou →) que desliza 2px para o topo/direita ao passar o mouse, sinalizando navegação externa ou abertura de painel.  
> * **Highlight Box (Ghost Link):** O link de texto ganha um container neutro sutil ao redor ao passar o mouse, comportando-se como um botão sutil sem perder o peso de leitura contínua.  
> * **Link Editorial Serifado:** Para hierarquias de artigos ou blogs, o link utiliza fonte *serif* em itálico com cor neutra mais escura que o corpo do texto, sem necessidade de ícones.

**Breadcrumbs (Navegação em Migalhas de Pão)**

> * **Header Integrated:** Posicionado diretamente acima do H1 da página em tamanho reduzido (12px) e cor atenuada (Degrau 11), servindo como contexto sutil em vez de uma barra separada.  
> * **Segmented Track (Pílula com Divisores):** Cada etapa do caminho fica dentro de uma pílula sutil neutra, conectadas por separadores gráficos minimalistas (como /, › ou um traço discreto).  
> * **Dropdown Collapsible (Caminho Truncado):** Quando o caminho possui muitos níveis (ex: Home / ... / Categoria / Item), os níveis intermediários são colapsados em um reticências (...) que abre um menu flutuante ao ser clicado.  
> * **Mobile Hybrid (Substituição por Botão Voltar):** Em telas menores, a linha completa do breadcrumb transiciona para um link único compacto apontando apenas para o pai direto (← Voltar para Receitas).

---

*User prompt: Agora sobre ícones, tipos, combinações ou não de tipos, se usa com as cores do texto ou diferencia um pouco. Onde usar. Traga também variantes para: carrossel, mensagens (erro, sucesso...), checkbox, radio button.*

Response: A iconografia define o ritmo tátil da interface: ícones funcionam como pontos de ancoragem visual que orientam a leitura rápida, enquanto o uso incorreto gera poluição e ambiguidades.

**Tipos, Combinações e Regras de Cores**

> * **Outline (Linhas):** Transmite leveza, estética editorial e funcional. Funciona melhor em interfaces limpas, telas de leitura ou componentes secundários.  
> * **Solid (Preenchidos):** Oferecem alto peso visual e fácil reconhecimento em tamanhos reduzidos. Ideal para barras de navegação principal, botões flutuantes e badges de status.  
> * **Regra de Combinação:** Evite misturar famílias de traços (ex: ícones duotone arredondados junto com ícones outline secos). O padrão de transição mais elegante no mercado é utilizar **Outline em repouso** e alternar para **Solid quando o elemento for selecionado/ativo**.  
> * **Cor do Texto vs. Cor do Ícone:**  
  * *Mesma cor do texto (color.text):* Em botões e CTAs onde o ícone faz conjunto direto com a ação textual.  
  * *Cor atenuada/sutil (color.icon.subtle / Degrau 11):* Em campos de entrada (*inputs*), breadcrumbs e metadados, permitindo que a informação textual permaneça em primeiro plano.  
  * *Cor Accent ou Semântica:* Exclusivo para sinalizar abas ativas, opções marcadas ou mensagens operacionais (erro, sucesso).  
> * **Onde usar (e evitar):** Use em navegações contextuais, ações principais e mensagens de feedback. Evite colocar ícones ao lado de cada item em listas corridas ou usar ícones abstratos em botões sem rótulo textual de apoio.

**Variantes para Carrossel**

> * **Setas Flutuantes com Blur:** Botões circulares transparentes com efeito de desfoque (backdrop-filter: blur(8px)) e borda sutil, que surgem sobrepostos às extremidades ao passar o mouse.  
> * **Indicador em Pílula Numérica:** Substitui a tradicional linha de pontos por um badge neutro e compacto posicionado no canto inferior (ex: 1 / 6).  
> * **Progress Bar Contínua:** Uma linha fina de 2px na base do container que é preenchida suavemente conforme o scroll da página desliza.  
> * **Dots com Expansão Ativa:** Pontos redondos neutros em repouso onde o item ativo se expande em formato de pílula retangular (ex: • • ── •).

**Variantes para Mensagens & Alertas**

> * **Banner com Borda Lateral Indicativa:** Fundo neutro suave (Degrau 2\) com uma borda espessa de 4px na lateral esquerda na cor do status (verde/vermelho) e o ícone funcional alinhado ao topo.  
> * **Toast Invertido Flutuante:** Fundo em tom neutro escuro/invertido (surface.inverse) que surge na base da tela contendo o ícone semântico e uma ação textual direta (ex: "Desfazer").  
> * **Inline Callout Pastel:** Caixa sem bordas com preenchimento sutil na cor do alerta (warning-subtle) e texto denso, integrada diretamente entre parágrafos de conteúdo.  
> * **Flat Border-Only:** Mantém o fundo limpo idêntico ao papel/canvas, demarcando o aviso apenas por uma borda fina (1px) na cor de status e um ícone em alto contraste.

**Variantes para Checkbox**

> * **Solid Accent Fill (Padrão):** Retângulo neutro em descanso que preenche totalmente com a cor de destaque (*Accent*) ao ser marcado, exibindo o marcador (✓) em texto claro.  
> * **Outline Checkmark:** O container permanece com fundo transparente, alterando apenas a borda para a cor de destaque e revelando a marcação de seleção.  
> * **Indeterminado com Traço (Dash):** Substitui o marcador tradicional por uma barra horizontal (-) para sinalizar que apenas parte de um grupo filho está selecionada.  
> * **Card Selecionável (Tile Checkbox):** A caixa do checkbox fica oculta; a marcação é feita ao clicar no card inteiro, que ganha borda colorida e um indicador no canto superior.

**Variantes para Radio Button**

> * **Ponto Concêntrico com Respiro:** Círculo vazado em repouso que, ao ser selecionado, exibe um ponto colorido no centro mantendo um respiro interno (gap de 2px a 3px).  
> * **Segmented Control (Toggle Bar):** Transforma o grupo de radios em uma barra horizontal contínua onde a opção ativa se torna um botão destacado em formato de pílula.  
> * **Radio Chip / Tag:** O botão ganha o formato de uma etiqueta redonda com borda fina, aplicando preenchimento neutro ou saturado ao ser ativado.  
> * **Icon-Only Choice:** Para seleções visuais (como alinhamento de texto ou modais de exibição), o rádio tradicional é substituído por um container retangular contendo apenas o ícone correspondente.

---

*User prompt: Mais componentes para você ver formas de diferentes deles: switch, cards com imagens, cards selecionáveis e listas.*

Response: Aqui estão ideias e variações para transformar **switches**, **cards com imagens**, **cards selecionáveis** e **listas**, conectando estética, funcionalidade e arquitetura visual:

### **1\. Switches / Toggles (Chaves de Alternância)**

> * **Thumb com Ícone Embutido (Contextual):** O círculo deslizante (*thumb*) traz um micro-ícone interno que muda de forma conforme o estado (ex.: ícone de lua/sol ou de marcar/desmarcar).  
> * **Track Fino Minimalista (Floating Track):** A trilha é reduzida a uma linha fina de 2px a 4px, enquanto o botão (*thumb*) é um círculo proporcionalmente maior que desliza cobrindo a linha.  
> * **Segmented Pill Slider (Toggle Duplo):** Substitui a trilha tradicional por dois rótulos visíveis lado a lado dentro de um container em formato de pílula neutra, onde um bloco deslizante destaca a opção ativa.  
> * **Accent-Fill Reativo:** O *thumb* em repouso permanece em tom neutro de apoio (Degrau 3), enquanto a trilha se preenche com a cor de destaque (*accent-solid*) apenas ao ser ativada.  
> * **Neobrutalista / Recuado:** Trilha retangular com cantos retos (0px), borda marcada de 2px e um *thumb* quadrado que desliza com transição seca.

### **2\. Cards com Imagens**

> * **Sobreposição Editorial (Paper Overlay):** A imagem ocupa a área superior ou total do card, e o bloco de texto/informações surge em um container neutro claro sobreposto, criando o efeito de uma folha de papel repousando sobre a foto.  
> * **Full-Bleed Imersivo com Gradiente:** A foto preenche 100% da área do card, enquanto o conteúdo textual repousa na base sobre um gradiente de sombra escuro ou sobre um badge de vidro desfocado (*glassmorphism*).  
> * **Moldura Offset (Aspect-Ratio Enquadrado):** A foto fica inserida dentro de um respiro neutro padronizado com proporção fixa (ex.: 4:3 ou 16:9), transmitindo o acabamento de uma foto impressa em revista ou livro.  
> * **Flat Boundary Lateral (Split Layout):** Divisão limpa em duas colunas (imagem de um lado, texto do outro), separadas exclusivamente por uma linha fina de 1px, sem o uso de sombras.  
> * **Card com Badge Flutuante:** A imagem recebe um badge neutro ou translúcido fixado no canto superior (ex.: tempo de preparo ou categoria de receita) para contextualizar o conteúdo sem poluir o texto principal.

### **3\. Cards Selecionáveis (Selectable Cards / Tiles)**

> * **Borda de Destaque Sólida (Accent Border Ring):** O card em estado neutro apresenta fundo suave e borda sutil; quando ativado, recebe uma borda destacada na cor vibrante de destaque (*accent-solid*).  
> * **Indicador de Check Embutido (Slot Badge):** Um pequeno indicador circular posicionado no canto superior direito do card preenche com a cor de destaque e exibe a marcação (✓) quando o item é selecionado.  
> * **Transição de Tom da Superfície (Tone Shift):** Em descanso o card utiliza o Degrau 1 ou 2 da escala neutra; ao ser ativado, a superfície muda suavemente para a cor de destaque sutil (*accent-subtle*).  
> * **Recuo Tátil (Elevado vs. Impresso):** O card não selecionado flutua com uma sombra sutil; ao ser clicado, a sombra desaparece e o card alinha-se à superfície por bordas, simulando um elemento pressionado.

### **4\. Listas & Itens de Lista (List Items & Rows)**

> * **Divisão por Respiro Branco (Minimalista sem Linhas):** Os itens da lista são organizados e separados exclusivamente pelo ritmo do espaçamento vertical (*rhythm*), dispensando divisores gráficos.  
> * **Divisor Fino em Degrau Neutro (Hairline Separator):** Separação clássica de linhas contínuas utilizando traços finos de 1px no Degrau 6 da régua neutra.  
> * **Linhas Alternadas por Tom (Striped Rows):** Fundos que alternam suavemente entre o Degrau 1 e o Degrau 2 da escala neutra a cada linha, facilitando a leitura de dados densos.  
> * **Cardified Rows (Linhas Flutuantes Isoladas):** Cada item da lista é transformado em um pequeno container individual com cantos sutis (4px a 8px) e espaço de respiro entre eles.  
> * **Lista com Indicador Conector (Timeline Track):** Uma linha vertical discreta conecta os ícones, números ou marcadores dos itens, ideal para organizar etapas sequenciais de instruções.

---

*User prompt: Agora padrões de mercado para: tabelas, gráficos, divisores, menus flutuantes e tooltips.*

Response: Aqui está uma imersão em soluções visuais e padrões de mercado para **tabelas, gráficos, divisores, menus flutuantes e tooltips**, conectando anatomia de componentes, comportamento e hierarquia visual:

### **1\. Tabelas (Tables & Data Grids)**

A maioria das tabelas peca pelo excesso de linhas cruzadas que criam poluição visual. As variações mais elegantes de mercado organizam os dados por alinhamento e contraste sutil:

> * **Whitespace-Driven / Borderless (Editorial & Minimalista):** Elimina completamente as linhas verticais e horizontais. A separação é feita exclusivamente pelo alinhamento rigoroso da tipografia e por espaçamentos generosos (paddings) entre as linhas.  
> * **Hairline Horizontal Only (Linhas Secas em 1px):** Mantém o fundo da tabela 100% idêntico ao canvas da página, utilizando apenas divisores horizontais ultra-finos (Degrau 6 da régua neutra) na base de cada linha.  
> * **Striped Rows por Alternância de Tom (Zebra Suave):** Em vez de usar linhas de borda, alterna suavemente o fundo das linhas entre o Degrau 1 (canvas) e o Degrau 2 (neutro atenuado). Perfeito para leitura contínua de listas longas sem cansar a vista.  
> * **Cardified / Floating Rows (Linhas Isoladas em Pílula):** Cada linha da tabela comporta-se como um card independente. As linhas possuem cantos levemente arredondados (4px a 8px) e um pequeno respiro vertical entre elas, destacando-se levemente com um fundo no Degrau 2 ou bordas finas.  
> * **Indicador de Seleção por Barra Lateral de Accent:** Ao passar o mouse (*hover*) ou selecionar uma linha, o fundo da linha muda para um tom sutil (accent-subtle ou Degrau 3\) e surge um traço vertical de 3px na cor vibrante de destaque (*Accent*) na extremidade esquerda da linha.

### **2\. Gráficos (Data Visualization)**

O maior desafio em gráficos é evitar a concorrência visual com o restante da página, mantendo os dados legíveis e elegantes:

> * **Monocromático / Accent Gradient (Área Única de Destaque):** Para gráficos de linha ou área em sistemas *Accent-Driven*, utiliza-se apenas uma cor viva (o *Accent*) para a linha principal, aplicando um gradiente suave que esmaece da cor de destaque (topo) até o tom neutro de fundo na base.  
> * **Inline Sparklines (Micro-Gráficos Embutidos):** Pequenos gráficos de linha ou barras embutidos diretamente dentro de células de tabelas ou badges. Não possuem eixos X/Y, legendas ou linhas de grade — apenas o traço visual da tendência.  
> * **Barras com Arredondamento de Canto (Soft Bar Radius):** Em gráficos de barra, as barras não utilizam retângulos secos; o topo de cada barra recebe um raio sutil de curvatura (4px a 6px), transmitindo um visual mais orgânico e moderno.  
> * **Crosshair Flutuante & Floating Card:** Ao passar o cursor pelo gráfico, surge uma linha vertical discreta (1px pontilhado) acompanhada de um pequeno card com efeito de vidro desfocado (*glassmorphism*) ou fundo neutro denso exibindo os valores exatos.  
> * **Cores de Status Adaptadas à Paleta:** Para gráficos multifacetados (ex: comparação de categorias), em vez de usar cores primárias puras saturadas que estouram na tela, utilizam-se tonalidades adaptadas e calibradas com saturação moderada para manter o equilíbrio visual.

### **3\. Divisores (Dividers & Separators)**

O divisor não precisa ser sempre uma linha cinza contínua cortando a tela de ponta a ponta:

> * **Inset / Short Hairline (Divisor Recuado):** A linha não toca as margens extremas do container; ela possui recuos laterais (*padding inset*) que acompanham o alinhamento exato do bloco de texto superior.  
> * **Divisor com Rótulo Typographic ("OU" / Categorias):** A linha horizontal é interrompida no centro (ou na ponta esquerda) para abrigar uma micro-legenda em caixa alta, fonte *monospace* ou tom atenuado (ex: "OU", "Passo 2" ou "Ingredientes").  
> * **Pontilhado / Dashed Editorial Track:** Substitui a linha contínua por um traço pontilhado fino (1px *dashed* no Degrau 6 neutro), remetendo ao acabamento visual de costuras de cadernos ou cupons destacados.  
> * **Gradient Fade Separator:** A linha do divisor começa transparente na extremidade esquerda, ganha definição no centro em tom neutro sutil e desvanece suavemente para transparente na extremidade direita.  
> * **Divisão Exclusiva por Respiro (Implicit Separation):** Elimina a linha física. A separação entre blocos é comunicada puramente pelo ritmo vertical (ex: um respiro duplo space.stack.large entre seções principais contra space.stack.small dentro do bloco).

### **4\. Menus Flutuantes (Dropdowns, Popovers & Context Menus)**

Menus suspenso funcionam como camadas flutuantes temporárias e exigem alta precisão e densidade de informação:

> * **Rich Menu Items (Título \+ Descrição \+ Atalho ⌘K):** Cada opção do menu traz o título da ação em destaque, uma breve micro-descrição em texto secundário abaixo e o atalho de teclado alinhado à direita em um mini-badge (*kbd*).  
> * **Grouped Sections com Headers em Monospace:** As opções são agrupadas por contexto (ex: "Ações", "Exportar", "Zona de Perigo") separadas por divisores sutis e encabeçadas por um pequeno título em fonte *monospace* e caixa alta.  
> * **Glassmorphism Island (Ilha Flutuante Translúcida):** O container do menu utiliza fundo semitransparente com desfoque de fundo (backdrop-filter: blur(12px)), borda sutil de 1px e sombra leve, dando a sensação de um painel de vidro sobreposto.  
> * **Floating Action Bar (Menu em Pílula Centralizado):** Em vez de uma lista vertical tradicional, o menu surge como uma barra horizontal flutuante em pílula (border-radius: 999px) contendo apenas ícones funcionais com tooltips indicativas.  
> * **Neobrutalista Invertido (Dark Popover):** O menu flutuante utiliza fundo neutro denso/escuro (surface-inverse) sobressaindo com alto contraste em relação à página clara.

### **5\. Tooltips**

Como o tooltip serve exclusivamente para esclarecimentos curtos e rápidos, seu peso visual deve ser cirúrgico:

> * **Classic Inverse Surface (Alto Contraste):** O padrão mais universal do mercado; utiliza fundo escuro neutro (Degrau 12 ou surface-inverse) com texto claro em tamanho reduzido (11px ou 12px) e cantos levemente arredondados.  
> * **Rich Tooltip de Atalho / Metadado:** Além do texto explicativo, o tooltip reserva a extremidade direita para exibir o atalho de teclado correspondente em formato destacado (ex: *"Editar receita — E"*).  
> * **Micro-Minimalist Arrowless:** Remove a tradicional seta pontiaguda de indicação (o "triângulo"). O tooltip flutua limpo centralizado acima ou abaixo do elemento, parecendo um pequeno badge flutuante.  
> * **Glassmorphism Tooltip para Fotografias:** Projetado para surgir quando o usuário passa o ponteiro sobre imagens ou banners. Usa fundo translúcido escuro desfocado para não bloquear visualmente a foto por completo.  
> * **Status Dot Tooltip:** Acompanhado de um pequeno ponto colorido (*status dot*) antecedendo o texto para dar contexto imediato de alerta ou progresso (ex: "• Conexão ativa").

---

*User prompt: Tabs, barra de botões (ou botões lado a lado), parágrafos, subtítulos, eyebrown.*

Response: Aqui estão variações visuais e anatômicas para **Tabs**, **Barras de Botões**, **Parágrafos**, **Subtítulos** e **Eyebrows**, conectando a semântica dos componentes, a geometria e o ritmo da tipografia:

### **1\. Tabs (Abas de Navegação)**

> * **Segmented Pill Track (Controle Segmentado em Pílula):** Um container em tom neutro sutil envolve todas as abas, enquanto a opção selecionada ganha destaque como uma pílula flutuante que desliza suavemente sobre o fundo.  
> * **Underline com Gap / Off-set Accent:** As abas mantêm fundo transparente com texto em tom neutro. A aba ativa recebe um sublinhado fino na cor de destaque (*Accent*) com um pequeno descolamento (*offset*) inferior em relação à linha do texto.  
> * **Editorial Minimalist (Apenas Peso e Tom):** Elimina linhas, bordas ou superfícies de fundo. A indicação de estado ativo é comunicada puramente pela variação tipográfica (transição de tom neutro atenuado em peso regular para o tom neutro denso em peso médio/bold ou na cor *Accent*).  
> * **Soft Surface Box (Cardified Tabs):** Cada aba é tratada como um pequeno container retangular com cantos sutis (4px a 8px). O item ativo recebe um preenchimento neutro claro e bordas finas de 1px, simulando o acabamento de fichas organizadoras.  
> * **Badge/Counter Integrated:** Rótulos de abas que acompanham um mini-badge numérico ao lado (ex: *"Ingredientes \[12\]"*). O badge varia de tom sutil em repouso para um contraste mais elevado quando a aba é selecionada.

### **2\. Barra de Botões & Botões Lado a Lado**

> * **Segmented Group Unificado (Bordas Compartilhadas):** Vários botões acoplados horizontalmente formando um bloco contínuo. Apenas os cantos externos possuem arredondamento, enquanto as divisões internas utilizam divisores finos em baixo contraste.  
> * **Floating Dock (Barra Flutuante de Ações):** Container suspenso e centralizado no topo ou base da página, utilizando cantos em pílula, efeito translúcido (*glassmorphism*) e sombra leve para agrupar as ações de tela.  
> * **Split Button com Separador Vertical:** Um botão de ação principal fisicamente acoplado a um acionador de menu suspenso (*dropdown*), separados por uma linha vertical sutil de 1px.  
> * **Hierarquia Assimétrica (Destacado \+ Ghost/Link):** O botão de confirmação assume preenchimento denso ou de destaque (*Accent*), enquanto o botão secundário ao lado perde fundos e bordas, apresentando-se apenas como um link ou texto interativo (*ghost*) para evitar a disputa de atenção.

### **3\. Parágrafos (Body Text / Corpo de Texto)**

> * **Editorial Lead Paragraph (Parágrafo de Abertura):** O primeiro parágrafo de uma seção ou receita surge em tamanho levemente expandido, com entrelinha generosa (line-height: 1.6) e a primeira letra em destaque (*drop cap*) ou cor de tinta diferenciada.  
> * **Bordered Callout Paragraph:** O parágrafo recebe uma borda vertical sutil de 3px na extremidade esquerda e um fundo em tom neutro atenuado (Degrau 2), sendo ideal para destacar notas de rodapé, dicas de preparo ou observações.  
> * **Technical / Monospace Footnote:** Parágrafo de apoio em fonte *monospace* ou caixa alta compacta em tom neutro atenuado, trazendo um tom instrutivo ou de metadados técnicos.  
> * **Coluna Curta Enquadrada:** O corpo de texto é configurado com uma restrição estrita de largura máxima (entre 45 e 75 caracteres por linha), garantindo um ritmo de leitura fluido e legível sem espalhar o texto pela tela.

### **4\. Subtítulos (Section Headings)**

> * **Subtítulo com Hairline Track (Linha de Extensão):** O texto do subtítulo vem acompanhado por uma linha fina (1px) que se estende horizontalmente a partir da sua base até a margem final da seção.  
> * **Pairing Tipográfico Editorial (Serif \+ Sans/Mono):** Os subtítulos utilizam uma fonte *Serif* sofisticada em contraste direto com o corpo de texto *Sans-Serif*, estabelecendo ritmo clássico de livros e revistas.  
> * **Subtítulo Indexado / Numerado:** O título da seção traz um prefixo numérico em fonte *monospace* ou tom atenuado antecedendo o texto (ex: *"01. Modo de Preparo"*), organizando a estrutura sequencial do conteúdo.  
> * **Subtítulo em Caixa Alta e Espaçado:** Títulos de seção secundários em tamanho compacto com letras em caixa alta (uppercase), espaçamento de caracteres expandido (letter-spacing) e cor neutra secundária.

### **5\. Eyebrow (Super-títulos / Pre-headers / Categorias)**

> * **Eyebrow com Dot de Contexto:** Micro-texto posicionado acima do H1, antecedido por um pequeno ponto circular colorido (*status dot*) para sinalizar a categoria ou o estado atual da página.  
> * **Kicker em Fonte Monospace com Traço:** O super-título utiliza fonte *monospace* em caixa alta antecedido por um travessão sutil (ex: — ANOTAÇÃO DA COZINHA), reforçando o aspecto de nota manual.  
> * **Mini-Badge Eyebrow (Cápsula Neutra):** O eyebrow é acomodado dentro de uma cápsula neutra atenuada com cantos sutis (4px a 8px) e texto compacto em negrito.  
> * **Accent Accentuation Eyebrow:** Micro-texto em tamanho reduzido (11px–12px) na cor vibrante de destaque (*Accent*) posicionado diretamente acima do título principal para orientar a hierarquia da informação.

---

