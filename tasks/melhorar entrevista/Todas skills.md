# **Reestruturação da Criação do Design System**

[https://gemini.google.com/app/6e20fd5bec76392c](https://gemini.google.com/app/6e20fd5bec76392c)

*User prompt: Estou falando com o agente sobre muitas coisas erradas na condução da criação do DS. Sinto que faltou pegar o que foi respondido no design language para ser usado para entregar algo menos Bootstrap. Veja o que foi que aconteceu e porque sinto que o guideline não foi criado. Diga o que você acha que precisa de arquivos para conduzir a criação do DS. Hoje temos os arquivos DESIGN\_LANGUAGE e patterns que parece mais focado em componentes. Abaixo o texto que estou mandando para o agente: \`\`\` Agora que entendi que o tem o fundo \`var(--app-bg-surface)\`, mas isso está indo por um caminho que segue o recepta antigo. Precisa de uma pergunta se a pessoa realmente quer seguir o antigo, pois eu não queria. E isso é coisa que não vai no design language, pois o design language fala do novo. Nem sei se vai em algum lugar. Vi que usou muitos níveis dos neutros, sendo que pela recomendação eramm poucos nos background. Você colocou branco puro em alguns inputs, claro em um card e mais escuro em outro. Bom, gosto de ter as opções, mas o problema é que está muito para um caminho de ser como o outro era, com muito contraste. Olhe bem o do cumento sobre os usos dos neutros da escola, acho que você se esforçou para seguir coisa velha e isso se perdeu. Lembro de conversa que os badges/tags usam tons mais claros de fundo e texto não tão escuro, mas olhando parece que foi usado a cor mais escura, trazendo o alto contraste que talvez não deveria ser tão evidente aqui. Acho que o alto contraste pode ser também um decisão de design, algo que também o design language pode ajudar a dizer. Eu vi que tinha uma pergunta muito específica no design language sobre os botões serem saturados ou suaves. Foi muito específico, pode ser estranho isso para um leigo. Aí sim os botões vieram como especificado, mas todo o resto vem genérico. Então foi uma pergunta específica que mexe em um componente específico ao invés de mexer no todo. Preciso de um relatório seu explicando o que está acontecendo para eu passar para o Gemini para que tenhamos um plano de criação de DS, guidelines e design language para que não saia sempre com a mesma cara. Que não pulamos perguntas óbvias para fazer específicas... Quero que saia coisas personalizadas através de instruções prontas, e talvez processadas, baseadas nas respostas dos usuários. Ali vimos que o botão primário é saturado, mas e o secundário será que deve seguir o padrão? Os outros deve seguir também? Talvez está faltando mesmo algo que vem depois do design language focado em especificações de foundation e componentes. Como já conversamos temos espaço nos DESIGN\_LANGUAGE e no patterns e talvez agora falta continuar fazendo perguntas para entender onde o usuário quer chegar. Como eu disse, mostrando já os padrões, mas permitindo personalizar. Quando digo padrões, não é da lib e sim da escola e do arquétipo. \`\`\`*

Response: O que aconteceu nas imagens é o resultado direto de o agente ter saltado a camada de **Fundações (Foundations)** e **Diretrizes Globais (Guidelines)**, indo direto do *Design Language* para a estilização pontual de componentes. Como não havia regras globais para superfícies e contrastes, o agente recorreu aos estilos nativos e industriais do CoreUI/Bootstrap (fundo branco \#ffffff em inputs, bordas padrão e badges com alto contraste).

### **Diagnóstico do Problema Visuais**

> * **Branco Puro vs. Régua de Papel:** Os inputs de busca ("Nome ou ingrediente") e os cards receberam fundo branco puro (\#ffffff), quebrando a promessa de tom de papel reciclado aquecido (neutralPigment: 0.6) definida no DESIGN\_LANGUAGE.md.  
> * **Contraste Excessivo em Elementos Secundários:** As tags ("Bolos", "1 h 20", "8 porções") e o botão "Cancelar" usaram preenchimentos muito escuros/densos, competindo visualmente com a tipografia e as receitas.  
> * **Perguntas Isoladas em Vez de Regras de Sistema:** A pergunta sobre botões primários serem saturados resolveu apenas o botão principal, mas deixou o resto da interface à mercê do visual genérico da biblioteca.

### **Arquivos Necessários para Governar o DS**

Para impedir que a inteligência artificial adivinhe estilos ou aplique o "visual Bootstrap antigo", a arquitetura do projeto precisa ser organizada nos seguintes arquivos:

| Arquivo | Papel no Sistema | De Onde Vem / Função |
| :---- | :---- | :---- |
| **DESIGN-LANGUAGE.md** *(Já existe)* | A Bússola Filosofica | Traduz a visão (arquétipo editorial, tom de papel, caneta azul). |
| **FOUNDATIONS.md** *(FALTANDO)* | O Catálogo Físico de Tokens | Define a escala de 12 degraus neutros de papel e os tokens semânticos (surface-base, surface-card, surface-input, text-primary, text-secondary). Proíbe o uso de \#ffffff ou cinza frio industrial. |
| **GUIDELINES.md** *(FALTANDO / llms.txt)* | O Guardrail e Regras Globais | Manual tático de *Do's & Don'ts*. Establece que: 1\. Inputs e Cards usam no máximo o Degrau 2 ou 3 de papel. 2\. Badges usam fundo sutil (Degrau 3\) e texto em tom médio (Degrau 11). 3\. É proibido usar mais de 2 níveis de superfície por tela. |
| **patterns/patterns.json** *(Já existe)* | O Mapeamento Técnico | Conecta os contratos de intenção às classes do CoreUI. |
| **src/components/\[Component\]/README.md** *(FALTANDO)* | Especificação por Componente | Especificações locais geradas sob demanda com as regras táticas daquele elemento (ex: *Tabs só em desktop; no mobile converter para Select*). |

### **Plano de Ação**

> 1. **Gerar o FOUNDATIONS.md:** Mapear explicitamente os 12 degraus de papel para que a IA saiba qual token aplicar em cartões, campos de texto, badges e barras.  
> 2. **Injetar o GUIDELINES.md como Regra do Agente:** Configurar o arquivo de instruções para barrar o uso de seletores com branco puro (\#fff), sombras pesadas e botões com temas fixos (btn-light / btn-dark).  
> 3. **Ajustar os Adaptadores CSS:** Garantir que o adaptador do CoreUI/Bootstrap re-aponte as variáveis nativas da biblioteca (--cui-body-bg, \--cui-card-bg, \--cui-input-bg) diretamente para as variáveis semânticas do tom de papel.

---

*User prompt: O que você mudaria na skill para gerar o design language?*

Response: Analisando a versão atual do arquivo skills/design-language/SKILL.md enviada e confrontando com os problemas visuais reais que apareceram na sua interface (como o uso de fundo branco \#ffffff em inputs, badges pretos de alto contraste e a herança indesejada do layout antigo do CoreUI/Bootstrap), existem **5 alterações estratégicas** que devem ser feitas na skill do design-language.

Embora a skill fornecida já tenha corrigido o fluxo de entrevista (com a trava de *Read-Back*, a proibição de perguntas compostas e a trava de alteração de arquétipo), **ela ainda deixa brechas na definição das fundações visuais e na transição para o código/guidelines**.

### **1\. Adicionar Pergunta Explícita sobre "Ruptura vs. Legado"**

**O problema:** O agente tentou "mesclar" o visual novo com a estrutura antiga do aplicativo (recepta antigo), resultando em alto contraste e fundos genéricos da biblioteca. **O que mudar no SKILL.md:** No trecho **"When the project already has a design system"**, adicione uma pergunta obrigatória que o agente deve fazer antes de extrair as regras do código existente:

`4. **Nível de Ruptura (Redesign vs. Herança):** Pergunte explicitamente:`  
   `"Este projeto é uma ruptura total com o visual antigo (Redesign completo do zero)`   
   `ou devemos preservar os comportamentos de contraste e superfícies da interface atual?"`

**Por quê?** Se o cliente responder "ruptura total", a IA fica autorizada a ignorar os estilos legados do Bootstrap e forçar 100% das novas regras de papel e superfícies aquecidas.

### **2\. Definir a Regra de "Profundidade de Superfícies e Proibição do Branco Puro"**

**O problema:** A imagem mostra que o agente usou branco puro (\#ffffff) dentro das caixas de busca e em alguns cards, quebrando a proposta do papel reciclado (neutralPigment: 0.6). **O que mudar no SKILL.md:** Na seção **"Composition rules arrive filled in"**, acrescente no contrato do Arquétipo a regra rígida de empilhamento de superfícies:

`- **Surface Depth Limit:** No screen may use more than 3 surface levels.`  
``- **Pure White Prohibition:** When `neutralPigment > 0`, absolute white (`#ffffff` / `#fff`)``   
  `and pure industrial gray are FORBIDDEN on cards, inputs, and canvas.`   
  ``Inputs and raised cards must consume Degrau 2 or 3 of the paper ramp (`surface-subtle`).``

### **3\. Criar Regra Específica para Metadados e Badges/Tags (Além de Botões)**

**O problema:** No seu feedback ao agente, você notou que as tags ("Bolos", "1 h 20", "8 porções") e botões como "Cancelar" usaram preenchimentos muito escuros, gerando alto contraste desnecessário. A skill atual pergunta apenas sobre o botão secundário (secondaryAction em Q11), ignorando o tratamento visual de metadados. **O que mudar no SKILL.md:** Inclua no **Bloco 4 (Colour Strategy)** uma regra ou pergunta dedicada a elementos de apoio:

`- **Metadata & Badge Treatment:** Define visual density for tags, chips, and captions.`  
  `` `low-contrast` (default for Editorial/Minimalist): sutil background (Degrau 2/3) + muted text (Degrau 11). ``  
  `` `high-contrast`: solid accent or dark background. ``

### **4\. Delimitar o Mapeamento Tipográfico por Função do Componente**

**O problema:** O arquétipo Editorial definiu fonte *Serif* para títulos. Se o agente aplicar Serif sem critério, ele pode tentar colocar a fonte em botões, campos de busca ou abas de navegação. **O que mudar no SKILL.md:** Nas regras derivadas do arquétipo geradas no DESIGN\_LANGUAGE.md, force a regra de uso da tipografia:

`- **Typography Scoping:**`  
  ``- `font-family-heading` (Serif): Restricted strictly to page titles, section titles, and dish names.``  
  ``- `font-family-body` (Sans-serif): Mandatory for all controls, buttons, inputs, tabs, badges, and body text.``

### **5\. Inserir o "Bridge File" (Emitir Diretrizes Globais para o GUIDELINES.md / llms.txt)**

**O problema:** O DESIGN\_LANGUAGE.md declara intenções (ex: "papel reciclado"), mas o agente ao gerar código cai nas variáveis padrão do CoreUI/Bootstrap (--bs-body-bg, \--cui-card-bg, \--cui-input-bg) porque não há uma instrução de conexão. **O que mudar no SKILL.md:** Na seção **"Writing the file"**, instrua o agente a gerar uma seção final no documento chamada **"System Adapter Directives"**:

`### Directives for Guidelines & Adapters (llms.txt)`

`Every UI Library adapter MUST map its native background/border tokens to the semantic paper tokens:`  
`` 1. `--cui-body-bg`, `--bs-body-bg` ➔ `var(--app-bg-page)` ``  
`` 2. `--cui-card-bg`, `--bs-card-bg` ➔ `var(--app-bg-surface)` ``  
``3. `--cui-input-bg`, `--bs-input-bg` ➔ `var(--app-bg-surface-subtle)` (NEVER `#ffffff`)``  
`` 4. `--cui-badge-bg` ➔ `var(--app-bg-surface-subtle)` + `--cui-badge-color` ➔ `var(--app-fg-muted)` ``

### **Resumo do Impacto**

Com essas 5 alterações na skill, o DESIGN\_LANGUAGE.md gerado passará a conter **regras táticas de travamento**:

> 1. A IA não aplicará branco puro \#ffffff nos campos de busca.  
> 2. As tags ("Bolos", "1 h 20") virão suaves e sem poluir o olhar.  
> 3. O agente terá um mapa direto de como sobrescrever as variáveis do Bootstrap/CoreUI para que a tela não pareça genérica.

---

*User prompt: Ok. Você acha que precisa criar skill para os outros documentos? Quais perguntas deveriam ser feitas? fale do foundations, guidelines e patterns. O readme não haverá, pois queremos centralizar as documentações.*

Response: **Sim, você precisa de skills dedicadas para cada documento.**

Se tentar resolver tudo numa única conversa ou num único comando, a inteligência artificial inevitavelmente sofrerá de **perda de foco de contexto**: ela pulará cálculos matemáticos de tokens, inventará estilos genéricos do Bootstrap ou omitirá guardrails de segurança.

A arquitetura de skills do gerador de DS deve operar em um **pipeline encadeado de 4 etapas**:

`1. design-language  ➔  DESIGN_LANGUAGE.md (A Filosofia & Arquétipo)`  
`2. design-foundations ➔  FOUNDATIONS.md + Tokens SCSS/CSS (O Inventário Matemático)`  
`3. design-guidelines  ➔  GUIDELINES.md / llms.txt (As Regras Globais & Adaptador de Libs)`  
`4. design-patterns    ➔  patterns/patterns.json (O Vocabulário Mapeado por Componente)`

### **1\. Skill design-foundations**

> * **O que produz:** FOUNDATIONS.md (documentação humana) \+ src/tokens/ (arquivos CSS/SCSS).  
> * **Papel:** É o catálogo físico e matemático do sistema. Transforma as intenções da linguagem (ex: "papel reciclado" e "caneta azul") em valores exatos de OKLCH, rems e pixels.  
> * **Precisa de entrevista?** **Não (ou quase nenhuma).** Como as decisões estéticas já foram tomadas no DESIGN\_LANGUAGE.md, esta skill é puramente **computacional**.

#### **Perguntas técnicas (apenas para confirmação de build):**

> 1. **Formato de saída de código:** *"Prefere CSS Custom Properties puro (:root), SCSS privado com mixins ou Tailwind v4 @theme?"*  
> 2. **Matriz exata de cor (se não fornecida na linguagem):** *"Qual o código Hex/OKLCH exato da cor de marca, ou calculamos o valor ideal via algoritmo OKLCH?"*  
> 3. **Razão da escala tipográfica:** *"Qual a razão de crescimento da tipografia? (Ex: 1.200 Minor Third para interfaces densas ou 1.250 Major Third para leitura editorial)?"*

#### **Estrutura do FOUNDATIONS.md gerado:**

> * **Tabela de Degraus Neutros (1 a 12):** Exibição explicativa do Canvas (Degrau 1\) até o Texto Principal (Degrau 12\) com os valores OKLCH/Hex.  
> * **Tabela de Accent (1 a 4):** Degraus de destaque (Subtle, Element, Solid, Hover).  
> * **Escala Tipográfica:** Mapeamento de Display, Heading XL/L/M, Body e Caption com font-families, tamanhos, pesos e entrelinhas (line-height).  
> * **Geometria & Espaçamento:** Grade base (4px), escala de padding/margin, tabela de border-radius e elevações.

### **2\. Skill design-guidelines**

> * **O que produz:** GUIDELINES.md (para humanos) e llms.txt / .cursorrules (para o agente de IA).  
> * **Papel:** É o manual tático de regras de montagem e a ponte com a biblioteca base (CoreUI/Bootstrap). Ele impede que a IA cometa absurdos como aplicar branco puro (\#ffffff) sobre papel ou criar estilos CSS do zero em vez de usar os tokens do adaptador.  
> * **Precisa de entrevista?** **Sim (curta e focada em governança de montagem).**

#### **Perguntas a serem feitas na entrevista do Guideline:**

> 1. **Nível de Ruptura vs. Legado:** *"Este projeto é um redesign limpo (ruptura total) ou precisa manter a estrutura e o alto contraste das telas antigas?"*  
> 2. **Profundidade Média de Superfície:** *"Qual o limite de superfícies empilhadas por tela? (Recomendado: no máximo 2 níveis — Canvas e Card/Painel)."*  
> 3. **Regras de Elementos de Apoio (Badges e Tags):** *"Os metadados e tags devem ser sutis (Degrau 3 de fundo \+ Degrau 11 de texto) ou ter preenchimento saturado de alto contraste?"*  
> 4. **Mapeamento do Adaptador da Lib (ex: CoreUI/Bootstrap):** *"Quais variáveis nativas da biblioteca devem ser interceptadas obrigatoriamente para reescrever o visual genérico?"*

#### **Estrutura do GUIDELINES.md gerado:**

> * **Proibição de Branco Puro & Regras de Superfície:** Regra explícita proibindo \#ffffff e cinzas industriais quando neutralPigment \> 0\.  
> * **Escopo da Tipografia:** Regra delimitando onde a fonte Serif pode atuar (estritamente em títulos) e forçando Sans-serif em botões, campos e abas.  
> * **Diretrizes do Adaptador (System Adapter Directives):** Tabela de de-para para a IA sobrescrever \--cui-body-bg, \--cui-card-bg, \--cui-input-bg e \--cui-badge-bg.  
> * **Do's & Don'ts Globais de Layout.**

### **3\. Skill design-patterns**

> * **O que produz:** patterns/patterns.json.  
> * **Papel:** É o vocabulário de componentes e a lista de bloqueios (forbidden). Ele diz à IA exatamente quais classes da biblioteca utilizar para cada intenção e quais proibir.  
> * **Precisa de entrevista?** **Sim (focada nos componentes e suas restrições).**

#### **Perguntas a serem feitas na entrevista de Patterns:**

> 1. **Catálogo Inicial de Componentes:** *"Quais componentes da biblioteca serão catalogados nesta etapa? (Ex: Button, Card, Field/Input, Modal, Nav/Tabs, Badge, Alert)?"*  
> 2. **Identificação de Padrões Proibidos (forbidden):** *"Quais classes nativas da biblioteca devemos proibir por violarem o tema? (Ex: Bloquear btn-success e direcionar para primary; bloquear btn-light/btn-dark por quebrarem em modo noturno)?"*  
> 3. **Comportamento Responsivo por Componente:** *"O que acontece com componentes complexos no mobile? (Ex: Converter nav-tabs para form-select em telas pequenas)?"*  
> 4. **Garantia Ergonomica:** *"Confirmamos o piso de área de toque de 44px para todos os botões e inputs?"*

#### **Estrutura do patterns/patterns.json gerado:**

> * **Schema JSON Rígido.**  
> * **Objeto por Componente (button, card, field, modal, nav):**  
  * intent: O papel do componente.  
  * namespace: Regex para capturar e reivindicar as classes da biblioteca (ex: ^btn$|^btn-(?\!group)).  
  * patterns: Mapeamento de variantes (primary, secondary, danger) com raw (classes da lib) e forbidden (classes proibidas com a justificativa reason e o substituto instead).  
> * **Seção composition:** Regras para criação de layouts ad-hoc (ritmo vertical, limite de botões saturados por tela, bindings tipográficos).

### **Resumo do Fluxo no seu Gerador de DS**

Com essas 3 skills somadas à skill de design-language, a sua ferramenta elimina totalmente os "chutes" da inteligência artificial:

| Etapa / Skill | O que pergunta / calcula | O que entrega de saída |
| :---- | :---- | :---- |
| **1\. design-language** | Entrevista sobre arquétipo, voz, ergonomia e estratégia de cor. | DESIGN\_LANGUAGE.md |
| **2\. design-foundations** | Calcula a matemática de cores (OKLCH 12 degraus), fontes e espaçamentos. | FOUNDATIONS.md \+ arquivos .css/.scss |
| **3\. design-guidelines** | Pergunta sobre ruptura com legado, regras de superfície e interceptação da lib. | GUIDELINES.md \+ llms.txt |
| **4\. design-patterns** | Mapeia componentes da lib (CoreUI/Bootstrap) e cria lista de proibições. | patterns/patterns.json |

---

*User prompt: E qual sua sugestão para automatizar ou obrigar o agente que está executando a usar as informações das entrevistas e dos arquivos gerados para gerar corretamente os tokens e estilos? Estou te mandando o arquivo da skill de gerar o DS. Para mim ela foi por um caminho muito automático que não ajudou a conduzir tokens bons baseado nas respostas que dei, acabando ficando genérico.*

Response: Para obrigar o agente a respeitar rigorosamente os arquivos gerados (DESIGN\_LANGUAGE.md, FOUNDATIONS.md) em vez de gerar tokens genéricos ou recorrer a padrões do Bootstrap, você deve implementar **três travas de governança** diretamente na estrutura da skill design-system.

O problema da skill atual é que ela é **passiva**: ela ensina o agente a ler o arquivo, mas permite que ele salte direto para a geração dos arquivos .scss sem demonstrar a derivação matemática antes.

### **1\. O Portão de Mapeamento Obrigatório (Read-Back de Tokens)**

A regra mais eficaz é proibir a IA de escrever arquivos na primeira rodada após receber os dados. Exija uma etapa intermediária onde ela deve apresentar uma **Tabela de Derivação de Tokens** antes de criar palette.scss ou theme.scss.

Adicione esta trava na seção **"The sequence"** do SKILL.md:

`## STOP — Read-Back Gate Before Writing Code`

``Before emitting `palette.scss` or `theme.scss`, you MUST output a Token Derivation Table mapping``   
``how `DESIGN_LANGUAGE.md` translates to Layer 1 & Layer 2 tokens.``

`You must present this table and WAIT for confirmation before generating any SCSS/CSS:`

`| Decision in DESIGN_LANGUAGE | Derived Foundation / Ramp Step | Generated Token | Forbidden Values |`  
`|---|---|---|---|`  
``| `neutralPigment: 0.6` | Paper Ramp Step 50 / 100 | `--app-bg-surface` | `#ffffff` / `#fff` |``  
``| `elevation: borders` | Border Step 300 + zero shadow | `--app-border-color` | `shadow-lg` / `#000` |``  
``| `secondaryAction: neutral` | Paper Step 200 (subtle) | `--app-bg-neutral` | Primary Accent |``

### **2\. Regras Rígidas de Invariantes e Proibições (Hard Invariants)**

Inclua um bloco de **Regras Invioláveis** dentro da skill. O agente precisa de proibições diretas para não "adivinhar" cores da biblioteca base.

Adicione no SKILL.md:

> * **Proibição do Branco Puro:** Se neutralPigment \> 0, é **estritamente proibido** atribuir \#ffffff ou \#fff para page, surface, raised ou inputs. Todos devem consumir os degraus da rampa de papel (paper(50), paper(100)).  
> * **Mapeamento Obrigatório do Adaptador:** Se uma biblioteca for informada (ex: CoreUI/Bootstrap), o agente é **obrigado** a mapear as variáveis nativas da biblioteca (--cui-card-bg, \--cui-input-bg, \--bs-body-bg) para as variáveis semânticas do sistema em vez de deixar a biblioteca usar seus estilos padrão.  
> * **Trava de Profundidade:** Proibido usar mais de 2 níveis de superfície neutra por tela.

### **3\. Validação Automática no Compilador (Build & Lint Gates)**

A IA só levará as regras a sério se houver uma ferramenta que **falhe o build** quando ela tentar burlar o contrato.

Aproveite e reforce no SKILL.md o uso do stylelint e da verificação de contraste:

> * **Linter de Cores Hex:** O stylelint deve conter 'color-no-hex': true para bloquear qualquer CSS de produto que tente usar Hex literal em vez de var(--app-\*).  
> * **Teste de Vazamento:** O script de validação deve rodar grep \-c \-- "--app-base-" dist/ds.css para garantir que primitivos privados da Camada 1 não vazaram para o CSS público.

### **O que mudar na SKILL.md enviada**

> 1. **Remover prose teórica sobre o histórico das bibliotecas:** Elimine explicações narrativas longas sobre "por que a camada 3 não envia componentes". Substitua por regras táticas imperativas.  
> 2. **Substituir o carregamento passivo pelo Read-back obrigatório:** Em vez de pedir os arquivos e gerar o DS no mesmo turno, exija a tabela de derivação visual primeiro.  
> 3. **Injetar a tabela de variáveis nativas da biblioteca:** Garanta que a skill exija do agente o código que reescreve as variáveis do CoreUI/Bootstrap para que os campos de busca e botões antigos percam o visual industrial genérico imediatamente.

---

*User prompt: E sobre a possível última skill de criação de patterns que deve carregar o conhecimento acumulado de todos arquivos gerados antes para começar a personalizar. Acha que aqui também pode ter entrevista? Pra mim acabou gerando tudo automaticamente, sem nem me dar a possibilidade de contextar o que seria feito e no final ficou com cara de bootstrap.*

Response: **Sim, a skill design-patterns DEVE ter uma entrevista/confirmação adaptativa.**

O papel do patterns.json não é listar tudo o que a biblioteca (CoreUI/Bootstrap) oferece, mas sim **limitar e filtrar** essa biblioteca para que o produto não fique com visual genérico. Quando o agente executa a skill sem uma etapa de entrevista, ele simplesmente "despeja" todas as classes do CoreUI/Bootstrap (como btn-primary, btn-secondary, card, form-control) sem considerar a identidade criada antes.

Para garantir que a skill recupere o conhecimento acumulado e entregue um vocabulário personalizado, você deve implementar um **Portão de Entrevista e Validação** no SKILL.md do design-patterns.

**As 5 Perguntas Obrigatórias da Entrevista de Patterns**

Antes de gerar o arquivo patterns.json, o agente deve cruzar as regras do DESIGN\_LANGUAGE.md e do GUIDELINES.md e fazer as seguintes confirmações ao usuário:

| Etapa | Pergunta / Validação do Agente | Origem da Regra |
| :---- | :---- | :---- |
| **1\. Recorte de Componentes** | "Mapeei os componentes necessários para o MVP (ex: Button, Card, Field, Modal, Nav). Há mais algum elemento de tela imediato ou mantemos este catálogo enxuto?" | DESIGN\_LANGUAGE.md |
| **2\. Proibições (forbidden)** | "No DESIGN\_LANGUAGE.md, proibimos botões verdes de ação e botões com cores fixas (btn-light/btn-dark). Vou registrá-los como forbidden com as devidas justificativas. Confirma?" | DESIGN\_LANGUAGE.md (Guardrails) |
| **3\. Adaptatividade e Ergonomia** | "Identifiquei a regra multiplataforma com piso de 44px e a restrição de abas em mobile. No componente nav, vou ditar que no mobile as abas viram select ou accordion. Deseja esse comportamento?" | DESIGN\_LANGUAGE.md (Overrides) |
| **4\. Estado de Abstração (state)** | "Os componentes começarão como raw (usando classes puras da biblioteca) ou prefere promover para styled (classes semânticas próprias em SCSS)?" | Arquitetura de Adaptação |
| **5\. Bindings de Composição (composition)** | "Na composição de telas ad-hoc, vou travar o accentBudget para no máximo 1 ação saturada por tela e restringir a tipografia Serif estritamente a títulos. Está correto?" | DESIGN\_LANGUAGE.md §6 |

**Como Alterar o SKILL.md de Patterns para Travar o Agente**

Adicione uma seção **STOP — Read-Back Gate** no topo da skill para proibir que o arquivo patterns.json seja gravado sem aprovação prévia:

> * **Proibição de Emissão Automática:** A primeira resposta do agente nunca pode conter o JSON final. Ele deve obrigatoriamente apresentar a lista de componentes elegíveis e suas proibições em texto.  
> * **Leitura Obrigatória dos Guardrails:** A skill deve instruir a IA a varrer o campo guardrails do DESIGN\_LANGUAGE.md para transformá-los automaticamente em entradas forbidden com a mensagem instead no JSON.  
> * **Trava do Bloco composition:** Obrigar o agente a mapear o orçamento de destaque (accentBudget), a escala de ritmo vertical (rhythm) e o limite de superfícies neutras empilhadas diretamente a partir da linguagem de design.

Ao aplicar essa entrevista de confirmação, o agente deixa de agir como um "gerador genérico de Bootstrap" e passa a atuar como um auditor rigoroso, focado em restringir a biblioteca e garantir a personalidade do seu sistema.

---

*User prompt: E como seria a skill para gerar o foundations*

Response: A skill **design-foundations** é a camada **computacional e matemática** do pipeline. Enquanto a design-language cuida da filosofia ("o porquê") e a design-patterns cuida do vocabulário de telas ("o quê"), a design-foundations é responsável por calcular o inventário físico de tokens ("o quanto"): escalas de cores em OKLCH, rems, pixels e a matemática dos 12 degraus neutros.

Como essa etapa é essencialmente determinística, a entrevista não deve ser um formulário aberto sobre preferências estéticas, mas sim uma **validação técnica de parâmetros de compilação**.

### **A Estrutura da Skill design-foundations**

Para evitar que a IA pule o cálculo e gere estilos genéricos do Bootstrap ou cores aleatórias, a skill precisa funcionar com as seguintes travas:

> 1. **Parada Inicial (Gate de Arquivos):** Exigir a leitura obrigatoria do DESIGN\_LANGUAGE.md e das tabelas do arquétipo.  
> 2. **Entrevista Técnica Curta (Apenas 3 confirmações de Build):**  
   * Cor exata da semente do Accent (ou se deve calcular via algoritmo OKLCH).  
   * Suporte a tema escuro (Tema único ou derivado dinâmico derive.dark()).  
   * Formato de exportação do código (.scss, CSS Custom Properties :root ou @theme do Tailwind).  
> 3. **Trava de Leitura/Confirmação (Read-Back Gate):** Proibir a gravação de arquivos de código antes de apresentar uma **Tabela de Derivação Matemática** com os 12 degraus neutros calculados, os 4 degraus de accent, tamanhos de fonte, raios e contrastes.  
> 4. **Hard Invariants (Proibições Rígidas):**  
   * Se neutralPigment \> 0, proibir branco puro (\#ffffff) ou cinza neutro industrial em superfícies e inputs.  
   * Validar a taxa de contraste WCAG AA (4.5:1) ou AAA (7.0:1) em tempo de execução para cada par bg-X / fg-on-X.  
   * Aplicar o piso tátil de 44px se platform: multiplatform ou mobile-first estiver no documento.

### **Proposta Completa do Arquivo skills/design-foundations/SKILL.md**

Abaixo está o modelo completo da skill para você incluir no seu plugin do agente de IA:

`---`  
`name: design-foundations`  
`description: Translates the prose decisions from DESIGN_LANGUAGE.md into physical mathematical tokens (OKLCH color ramps, spacing scales, typography pairings, border radii) and writes FOUNDATIONS.md at the project root along with the Layer 1 and Layer 2 code tokens. Trigger it on "generate tokens", "build design foundations", "create foundations", "calculate color ramps", or after finishing design-language.`  
`license: MPL-2.0`  
`---`

`<!-- skills/design-foundations/SKILL.md -->`

`# Design Foundations`

`## STOP — your first reply is a request, not a compilation`

`**Do not generate token code on the first turn.** This skill translates prose decisions into mathematical values. Generating tokens without verifying the design language produces generic fallback values.`

`Unless every file below is in the conversation, your first reply is this and nothing else:`

`> Before I calculate and generate the design foundations, I need these files:`  
`>`  
``> 1. `DESIGN_LANGUAGE.md` — from the project root``  
``> 2. `skills/design-system/references/tokens.md` — layer 2 vocabulary``  
``> 3. `skills/design-language/references/archetypes.md` — structural numbers``  
`>`  
`> Please confirm or provide any missing files before proceeding.`

`Then **wait**.` 

`---`

`## Technical Confirmation Interview (3 Questions Max)`

``Once `DESIGN_LANGUAGE.md` is loaded, do not ask open-ended aesthetic questions. Read the front-matter keys (`archetype`, `neutralPigment`, `accentContrast`, `radius`, `elevation`, `accessibility`) and confirm only these 3 build parameters:``

`1. **Accent & Paper Seed Values:**`  
   ``- *"Based on your choice of Monochrome/Accent-Driven and warm paper pigment (`neutralPigment: 0.6`), I suggest an OKLCH seed for Cobalt Blue (`oklch(0.48 0.22 255)`) and Light Recycled Paper (`oklch(0.975 0.012 85)`). Keep these exact values or provide custom Hex/OKLCH codes?"*``  
`2. **Dark Mode Strategy:**`  
   ``- *"Do you want a single Light paper theme, or should I generate an automatic Dark mode (`night`) using OKLCH role inversion?"*``  
`3. **Code Output Format:**`  
   ``- *"How should the physical tokens be output? (Option A: SCSS Layer 1 + CSS Custom Properties `:root`; Option B: CSS variables + Tailwind v4 `@theme` bridge; Option C: W3C `tokens.json` export)."*``

`---`

`## STOP — Read-Back Gate (Mathematical Token Derivation Table)`

``**Do NOT write `FOUNDATIONS.md` or any SCSS/CSS file in the same turn the user answers the technical questions.**``

`You MUST present a **Token Derivation Table** detailing the exact calculated values and WAIT for the user to say "Yes" or approve.`

`Format of the required Read-Back:`

`| Token Category | Token Role / Step | Calculated Value (OKLCH / Rem / Px) | Derived Hex / Value | WCAG Contrast Ratio |`  
`|---|---|---|---|---|`  
``| **Neutral Ramp (Paper)** | Step 1 (`bg-page` / Canvas) | `oklch(0.975 0.012 85)` | `#fcf9f4` | Canvas Base |``  
``| **Neutral Ramp (Paper)** | Step 2 (`bg-surface` / Card) | `oklch(0.955 0.015 85)` | `#f6f1e7` | — |``  
``| **Neutral Ramp (Paper)** | Step 3 (`bg-sunken` / Input) | `oklch(0.925 0.018 85)` | `#ece5d7` | — |``  
``| **Neutral Ramp (Paper)** | Step 11 (`fg-muted` / Muted) | `oklch(0.380 0.018 85)` | `#4a443b` | 5.2:1 vs Canvas (AA Pass) |``  
``| **Neutral Ramp (Paper)** | Step 12 (`fg-default` / Text) | `oklch(0.200 0.015 85)` | `#211e19` | 12.8:1 vs Canvas (AA Pass) |``  
``| **Accent Ramp (Pen)** | `accent-solid` (`bg-action`) | `oklch(0.480 0.220 255)` | `#0059c6` | 5.8:1 vs White Label (AA Pass) |``  
``| **Geometry** | `radius-control` | Archetype default (Subtle) | `6px` | — |``  
``| **Control Sizing** | `size-control` | Multiplatform override | `44px` | Ergonomic Minimum |``

`If the user rejects or requests a change, re-calculate and show the table again.`

`---`

`## Hard Invariants & Rules`

`When emitting tokens, enforce these strict constraints:`

``1. **Pure White Prohibition:** If `neutralPigment > 0`, absolute white (`#ffffff` / `#fff`) is FORBIDDEN for `bg-page`, `bg-surface`, and `bg-sunken` inputs. Inputs and panels MUST consume Step 2 or Step 3 of the paper scale (`#f6f1e7` / `#ece5d7`).``  
``2. **Pair Contrast Invariant:** Every background token (`bg-X`) MUST have a corresponding foreground token (`fg-on-X`) meeting the accessibility threshold declared in `DESIGN_LANGUAGE.md` (AA = 4.5:1, AAA = 7.0:1).``  
``3. **Control Touch Target Floor:** If `platform: multiplatform` or `mobile-first`, `--app-size-control` MUST be set to at least `44px` (or `2.75rem`).``  
``4. **No Layer 1 Leaks:** Primitives (Layer 1 OKLCH steps) MUST remain private in SCSS or internal variables. Only Layer 2 semantic custom properties (`--app-*`) are emitted publicly.``

`---`

``## Writing `FOUNDATIONS.md` and Token Code``

``Once approved, write `FOUNDATIONS.md` at the project root and generate the corresponding token files (`src/palette.scss`, `src/theme.scss`, `src/semantic.scss`, and `dist/ds.css`).``

``Structure of `FOUNDATIONS.md`:``

```` ```markdown ````  
`<!-- FOUNDATIONS.md -->`

`# Design Foundations — [Product Name]`

``This document records the exact mathematical values, color steps, typography scales, and geometric tokens derived from `DESIGN_LANGUAGE.md`.``

`## 1. Color Foundations (OKLCH Ramps)`

`### Neutral Scale — Warm Paper Ramping (12 Steps)`  
`| Step | Token Role | OKLCH Value | Derived Hex | Usage Intent |`  
`|---|---|---|---|---|`  
``| 1 | `bg-page` | `oklch(0.975 0.012 85)` | `#fcf9f4` | Canvas document background |``  
``| 2 | `bg-surface` | `oklch(0.955 0.015 85)` | `#f6f1e7` | Cards, panels, recipe boxes |``  
``| 3 | `bg-sunken` | `oklch(0.925 0.018 85)` | `#ece5d7` | Input fields, secondary buttons, wells |``  
`| ... | ... | ... | ... | ... |`  
``| 11 | `fg-muted` | `oklch(0.380 0.018 85)` | `#4a443b` | Captions, metadata, preparation times |``  
``| 12 | `fg-default` | `oklch(0.200 0.015 85)` | `#211e19` | Body text, recipe titles, high-contrast ink |``

`### Accent Scale — Ink Accent (4 Steps)`  
`| Role | Semantic Token | OKLCH Value | Derived Hex | Contrast Ratio |`  
`|---|---|---|---|---|`  
``| Subtle | `bg-action-subtle` | `oklch(0.940 0.040 255)` | `#e5f0ff` | Active tab background, selected chip |``  
``| Border | `border-action` | `oklch(0.720 0.140 255)` | `#6fa0ff` | Focus ring, active input border |``  
``| Solid | `bg-action` | `oklch(0.480 0.220 255)` | `#0059c6` | Primary CTA, main action button |``  
``| Hover | `bg-action-hover` | `oklch(0.420 0.220 255)` | `#00459c` | Hover state on primary action |``

`---`

`## 2. Typography & Scale`

``- **Heading Font:** `ui-serif, Georgia, Garamond, serif` (Editorial & Premium)``  
`` - **Body Font:** `system-ui, -apple-system, sans-serif` ``  
``- **Base Line-Height:** `1.6` (Generous for kitchen readability)``

`| Step Token | Size (rem / px) | Line Height | Usage |`  
`|---|---|---|---|`  
``| `--app-font-size-xs` | `0.75rem` (12px) | 1.4 | Kicker, small captions |``  
``| `--app-font-size-sm` | `0.875rem` (14px) | 1.5 | Metadata, tag labels |``  
``| `--app-font-size` | `1.000rem` (16px) | 1.6 | Body text, recipe steps |``  
``| `--app-font-size-heading-sm` | `1.250rem` (20px) | 1.3 | Card headers |``  
``| `--app-font-size-heading-lg` | `1.875rem` (30px) | 1.2 | Page title, recipe name |``

`---`

`## 3. Geometry, Spacing & Elevation`

``- **Base Unit:** `0.25rem` (4px grid)``  
``- **Control Height (`--app-size-control`):** `44px` (Multiplatform touch target minimum)``  
`` - **Radii:** `--app-radius-control: 6px`, `--app-radius-surface: 8px` ``  
``- **Elevation Strategy:** `borders` (Hierarchy driven by subtle 1px lines and whitespace respiro, no heavy shadows)``

`---`

`## 4. Contract Enforcement Verification`

`- **WCAG Level:** AA (Minimum 4.5:1 for body text)`  
``- **Pure White Policy:** Strictly prohibited on inputs and surfaces (`#ffffff` replaced by paper steps 2/3)``  
`` - **Build Validation Command:** `npm run verify` ``

### **Onde essa Skill se Encaixa no Fluxo Global**

Com esse modelo, o seu fluxo de skills para o agente de IA fica completo e à prova de falhas:

> 1. **design-language** ➔ Faz a entrevista de negócio/arquétipo e grava o DESIGN\_LANGUAGE.md.  
> 2. **design-foundations** (esta skill) ➔ Pega a linguagem, calcula a matemática dos 12 degraus em OKLCH, valida os contrastes, faz o *Read-Back* da tabela e grava o FOUNDATIONS.md e os tokens CSS.  
> 3. **design-guidelines** ➔ Define as regras de montagem e intercepção do CoreUI/Bootstrap (GUIDELINES.md e llms.txt), travando o uso de branco puro e definindo a profundidade máxima de superfícies.  
> 4. **design-patterns** ➔ Define o catálogo enxuto de componentes permitidos e proibições (patterns/patterns.json), impedindo o agente de despejar estilos genéricos do Bootstrap.

---

*User prompt: Agora como seria a skill de guidelines*

Response: A skill **design-guidelines** é a ponte tática que traduz a filosofia abstrata (DESIGN\_LANGUAGE.md) e a matemática de tokens (FOUNDATIONS.md) em **regras estritas de montagem de tela e interceptação de bibliotecas** (como CoreUI ou Bootstrap).

Se o agente pular essa etapa, ele tentará criar componentes do zero ou usará os estilos padrão da biblioteca (fundo branco \#ffffff nos campos de busca, badges pretos de alto contraste e bordas industriais).

O papel do arquivo gerado (GUIDELINES.md para humanos e llms.txt / .cursorrules para IAs) é **proibir a IA de inventar CSS local** e forçá-la a sobrescrever as variáveis nativas da biblioteca (--cui-\* ou \--bs-\*) com os tokens semânticos do sistema (--app-\*).

### **Proposta Completa da Skill skills/design-guidelines/SKILL.md**

`---`  
`name: design-guidelines`  
`description: Establishes tactical assembly rules, layout guardrails, and library interception directives (llms.txt / GUIDELINES.md). It bridges DESIGN_LANGUAGE.md and FOUNDATIONS.md with component libraries like CoreUI, Bootstrap, or Tailwind to prevent generic AI UI code. Trigger it on "create guidelines", "set up agent rules", "intercept bootstrap", "generate llms.txt", or after finishing design-foundations.`  
`license: MPL-2.0`  
`---`

`<!-- skills/design-guidelines/SKILL.md -->`

`# Design Guidelines`

`## STOP — your first reply is a request, not a document build`

``Do not generate `GUIDELINES.md` or `llms.txt` on the first turn. Guidelines require reading the project's visual identity and token contracts.``

`Unless every file below is in the conversation, your first reply is this and nothing else:`

`> Before I build the design guidelines and agent rules, I need these files:`  
`>`  
``> 1. `DESIGN_LANGUAGE.md` — from the project root``  
``> 2. `FOUNDATIONS.md` (or `src/theme.scss`) — physical token contract``  
`> 3. **The target component library name** (e.g., CoreUI 5, Bootstrap 5.3, Tailwind v4, DaisyUI)`  
`>`  
`> Please send what you have or confirm the library name before proceeding.`

`Then **wait**.`

`---`

`## Tactical Assembly Interview (4 Questions Max)`

`Once the input files are loaded, do not ask open-ended design questions. Ask only these 4 tactical governance questions:`

`1. **Rupture vs. Legacy Behavior:**`  
   `- *"Is this a complete visual redesign (total rupture with old UI), or must we preserve legacy high-contrast/component behaviors?"*`  
`2. **Surface Depth Limit:**`  
   `- *"What is the maximum allowed surface depth per screen? (Recommended: 2 levels — Canvas/Page + Card/Panel)."*`  
`3. **Metadata & Badge Density:**`  
   `- *"Should metadata and tags use subtle backgrounds (Paper Step 3 + Muted Text) or high-contrast filled backgrounds?"*`  
`4. **Library Variable Interception:**`  
   ``- *"Which native library prefix are we intercepting? (e.g., `--cui-*` for CoreUI, `--bs-*` for Bootstrap)."*``

`---`

`## STOP — Read-Back Gate (Assembly & Adapter Mapping Table)`

``**Do NOT write `GUIDELINES.md` or `llms.txt` in the same turn the user answers the questions.**``

`You MUST present a **Rule & Interception Mapping Table** and WAIT for explicit approval:`

`| Category | Tactical Rule | Enforcement Target | Forbidden Pattern |`  
`|---|---|---|---|`  
``| **Pure White Policy** | Backgrounds/inputs must use Paper Step 2/3 (`#f6f1e7` / `#ece5d7`) | Inputs & Cards | `#ffffff` / `#fff` / `bg-white` |``  
`| **Surface Depth** | Max 2 nested surfaces per viewport | Page & Panels | Card inside Card inside Card |`  
`| **Typography Scoping** | Serif restricted strictly to page/recipe titles | Headings vs. Controls | Serif on buttons, tabs, or inputs |`  
``| **Library Interception** | Override native `--cui-*` / `--bs-*` variables with `--app-*` | Adapter Stylesheet | Writing local CSS `.my-button { ... }` |``  
``| **Badge Density** | Low-contrast subtle fill (`bg-surface-subtle`) + muted ink | Badges & Chips | Solid dark / high-saturation fills |``

`If the user rejects or requests a change, update the table and show it again.`

`---`

`## Hard Invariants & Guardrails`

`When generating the guideline documents, enforce these strict rules:`

``1. **Zero Local CSS Rule:** The agent is STRICTLY FORBIDDEN from writing custom CSS (`background-color`, `border-radius`, `color`) for elements supported by the library (buttons, cards, inputs, modals). It MUST use the library's native HTML structure and override its CSS variables[cite: 12].``  
``2. **Pure White Prohibition:** When `neutralPigment > 0`, `#ffffff` is FORBIDDEN on cards, modals, and input fields[cite: 11]. They must inherit Paper Step 2 or Step 3 (`--app-bg-surface` / `--app-bg-sunken`).``  
`3. **Typography Restriction:** The heading font (Serif) MUST NEVER be applied to buttons, navigation tabs, inputs, or badge labels. Controls MUST use the body font (Sans-serif).`  
`4. **Button Contrast Invariant:** A primary action button must be the ONLY saturated accent element in its local container context.`

`---`

`` ## Writing `GUIDELINES.md` and `llms.txt` ``

`Once approved, emit two files at the project root:`  
``1. `GUIDELINES.md` — Human-readable documentation for team alignment.``  
``2. `llms.txt` (or `.cursorrules`) — Machine-readable system prompt for AI code agents[cite: 12].``

``### Structure of `llms.txt` (For AI Agents):``

```` ```markdown ````  
`# GUIDELINES & AGENT RULES — [Product Name]`

`You are the AI front-end developer for this project. You MUST follow these rules when generating markup or styles.`

`## 🛑 ABSOLUTE GUARDRAILS`  
`1. DO NOT create custom CSS classes for components provided by [Library Name] (e.g., buttons, cards, inputs, modals).`  
``2. DO NOT use pure white (`#ffffff` or `bg-white`) on cards or inputs. Use semantic paper tokens (`var(--app-bg-surface)` / `var(--app-bg-sunken)`).``  
`3. DO NOT apply Serif typography to buttons, tabs, inputs, or badges.`  
`4. DO NOT use high-contrast dark fills on tags/badges. Use subtle paper fills.`

`---`

`## 🎨 LIBRARY INTERCEPTION (ADAPTER RULES)`

`When styling [Library Name] components, override their native variables pointing to Layer 2 tokens:`

```` ```css ````  
`/* CoreUI / Bootstrap Interception Example */`  
`.btn-primary,`  
`[data-coreui-theme] .btn-primary {`  
  `--cui-btn-bg: var(--app-bg-action);`  
  `--cui-btn-color: var(--app-fg-on-action);`  
  `--cui-btn-border-color: var(--app-bg-action);`  
  `--cui-btn-hover-bg: var(--app-bg-action-hover);`  
`}`

`.form-control {`  
  `--cui-input-bg: var(--app-bg-sunken); /* NEVER #ffffff */`  
  `--cui-input-color: var(--app-fg-default);`  
  `--cui-input-border-color: var(--app-border-color);`  
`}`

## **📐 COMPOSITION & SURFACE DEPTH**

> * **Canvas:** \--app-bg-page  
> * **Surface 1 (Cards/Panels):** \--app-bg-surface  
> * **Surface 2 (Inputs/Wells):** \--app-bg-sunken  
> * **Depth Limit:** Maximum 2 surface levels per view. No nested cards.

### **Por que essa Skill resolve o seu problema?**

> 1. **Acaba com o visual "Bootstrap genérico":** A trava *Pure White Prohibition* e o controle de *Surface Depth* forçam o agente a usar os neutros de papel reciclado e impedem a poluição visual com cartões brancos brilhantes e bordas pretas pesadas.  
> 2. **Impede que a IA reescreva CSS do zero:** O arquivo llms.txt gerado diz explicitamente ao agente: *"Você está proibido de criar CSS customizado; use o HTML do CoreUI/Bootstrap e mapeie as variáveis nativas (--cui-\* ou \--bs-\*)"*.  
> 3. **Mapeamento de Metadados e Badges:** Garante que tags e badges ("Bolos", "1 h 20") venham suaves (--app-bg-surface-subtle) em vez de botões pretos de alto contraste.

---

