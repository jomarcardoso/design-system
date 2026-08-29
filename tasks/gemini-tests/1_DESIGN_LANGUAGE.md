# **Recepta DESIGN\_LANGUAGE**

[https://gemini.google.com/app/f2a5a02a55b3e79c](https://gemini.google.com/app/f2a5a02a55b3e79c)

*User prompt: Vamos testar se será capaz de gerar um Tema baseado na escola "Accent Driven". Me faça as perguntas para gerarmos o design language primeiro.*

Response: Como o objetivo é definir a **Design Language** sob a escola **Accent-Driven (Monocromática)**, a estratégia de atribuição de cor já está fixada: um único tom de destaque (*accent*) cirúrgico e uma régua de neutros pigmentados.

Para calibrar o arquétipo visual, a geometria e os parâmetros que alimentarão o arquivo DESIGN-LANGUAGE.md, responda aos blocos iniciais da entrevista:

**Bloco 1 — Posicionamento e Arquétipo**

> * **1\. Setor e Promessa:** Qual é o produto/domínio e qual a promessa principal da marca aos usuários?  
> * **2\. Comportamento em Reunião:** Se a interface fosse uma pessoa em uma reunião, como se comportaria?  
  * *(A)* Séria, técnica e direta ao ponto  
  * *(B)* Amigável, relaxada e encorajadora  
  * *(C)* Elegante, reservada e sofisticada  
  * *(D)* Moderna, dinâmica e focada em eficiência  
> * **3\. Arquétipo:** Qual arquétipo visual se aproxima da sua visão (*Tech Minimalist*, *Editorial & Premium*, *Utilitarian & Technical*, *Playful & Expressive*, *Enterprise Solid* ou um Híbrido)?

**Bloco 2 — Contexto de Uso e Ergonomia**

> * **4\. Frequência de Uso:** O uso principal é prolongado (ferramenta de trabalho/painel denso), ocasional (fluxos curtos/checkout) ou focado em leitura contínua?  
> * **5\. Plataforma Prioritária:** O foco inicial é *Desktop-first*, *Mobile-first* (que eleva os alvos de toque para no mínimo 44px) ou *Multiplataforma*?

Assim que definir esses pontos, passaremos para a geometria dos componentes (raio de borda e profundidade) e para os 3 parâmetros específicos da escala Accent-Driven (*accentContrast*, *neutralPigment* e *surfaceSeparation*).

---

*User prompt: Bloco 1 1\. Aplicação de receitas, como um caderno pessoal de receitas. 2\. C 3\. Editorial & Premium Bloco 2 4\. Baixa frequência de uso 5\. Multiplataforma*

Response: Excelente. Com o arquétipo **Editorial & Premium** definido para um **caderno pessoal de receitas** (multiplataforma e focado em leitura/uso ocasional) sob a escola **Accent-Driven (Monocromática)**, já temos a direção visual traçada.

Para concluir a coleta de parâmetros e gerarmos o arquivo DESIGN-LANGUAGE.md completo, responda aos blocos restantes (com sugestões pré-alinhadas ao seu arquétipo para facilitar):

### **Bloco 3 — Fundações Visuais e Geometria**

> * **6\. Formato de Estruturas (Botões, Cards, Inputs):**  
  * *Recomendado para Editorial:* Cantos sutis de **4px a 8px**. Mantemos este padrão ou prefere cantos retos (0–2px)?  
> * **7\. Profundidade e Elevação:**  
  * *Recomendado para Editorial:* Visual limpo, onde a hierarquia é carregada por respiro (espaço em branco) e bordas finas sutis, com sombras imperceptíveis (2xs). Confirmamos o uso de bordas/espaço para separação de superfícies?

### **Bloco 4 — Calibração Accent-Driven & Acessibilidade**

> * **8d. Contraste do Accent (accentContrast):** A cor de destaque (ex: a "tinta de caneta azul") é viva/saturada o bastante para exigir texto branco sobre ela (high), ou é um tom sutil com texto escuro (low)?  
> * **8e. Pigmentação dos Neutros (neutralPigment):** Os neutros devem ter uma pigmentação aquecida (tom de papel/sépia/palha) em vez de um cinza frio industrial?  
> * **8f. Separação de Superfícies (surfaceSeparation):** Linhas/bordas sutis (lines), alternância de tons (tones) ou sombras suaves (shadows)?  
> * **8g. Trata da Ação Secundária (secondaryAction):** Contornada (outline), preenchimento neutro sutil ou tom sutil de accent?  
> * **9\. Nível de Acessibilidade:** **WCAG AA** (padrão de mercado) ou **WCAG AAA**?  
> * **10\. Cores de Status (Sucesso/Erro):** Tradicionais (verde/vermelho padrão) ou adaptadas à paleta aquecida do caderno para não outshoutar a foto da receita?

### **Bloco 5 — Tom de Voz e Microcopia**

> * **11\. Registro de Comunicação:** Voz acolhedora e instrutiva (ex: *"Guardado no seu caderno"*), alternando para direta em caso de erros ou ações destrutivas?  
> * **12\. Modo dos CTAs:** Verbos no infinitivo (ex: *"Salvar receita"*) ou imperativo (ex: *"Salve sua receita"*)?

### **Bloco 6 — Regras de Composição & Guardrails**

> * **13\. Restrições Rígidas (Never):** Alguma regra que o sistema **nunca** deve aplicar (ex: *nunca usar gradientes*, *nunca usar cores de status em ações não concluídas*, *nunca usar títulos coloridos*)?  
> * **14\. Padrão de Confirmação:** Ações destrutivas (ex: apagar receita) utilizam **Modal** ou **Toast**?

Assim que responder, montarei o resumo dos princípios e o arquivo DESIGN-LANGUAGE.md final estruturado.

---

*User prompt: Bloco 3 6\. Mantemos o recomendado. 7\. Sim Bloco 4 8d. high 8e. Sim, tom de papel, mas não aquele sépia antigo, um papel mais novo, talvez reciclado 8f. alternância de tons 8g. neutro sutil 9\. AA 10\. adaptada bloco 5 11\. sim 12\. imperativo bloco 6 13\. nada por enquanto 14\. modal*

Response: Com base em todas as respostas da entrevista e alinhado ao arquétipo **Editorial & Premium** com toques acolhedores (*hybrid*) sob a escola **Accent-Driven / Monocromática**, aqui está o documento final **DESIGN-LANGUAGE.md** gerado para o **Meu Caderninho**:

`---`  
`archetype: hybrid`  
`archetypeNote: >`  
  `Editorial & Premium typography and restraint, blended with Playful warmth.`  
  `A personal recipe notebook designed to be read like a book and used like a kitchen tool.`

`density: comfortable`  
`platform: multiplatform`

`radius: subtle`  
`elevation: soft-shadows`  
`elevationCarrier: background-tone`

`accessibility: AA`  
`statusColours: brand-adapted`

`colourStrategy: monochrome`

`accentContrast: high`  
`neutralPigment: 0.6`  
`surfaceSeparation: tones`

`secondaryAction: neutral`

`voice: warm`  
`voiceExceptions:`  
  `- action-oriented for destructive actions and data loss`  
`ctaMood: imperative`

`deviations: []`

`overrides:`  
  `- decision: size-control minimum set to 44px`  
    `because: multiplatform support requiring phone-friendly touch targets`

`guardrails:`  
  `- rule: Destructive actions must require a confirmed modal`  
    `enforcement: ledger`  
    `instead: modal`  
  `- rule: Status colours must never compete visually with recipe photography`  
    `enforcement: document`  
`---`

`# Design language — Meu Caderninho`

`Um caderno pessoal de receitas em formato digital. O produto permite guardar, organizar e consultar receitas com foco total na legibilidade e na experiência tátil de manusear um caderno de cozinha real.`

`**Arquétipo:** Híbrido (*Editorial & Premium* com calidez de *Playful*)[cite: 3, 5]. A tipografia *serif* e a contenção visual trazem a sofisticação de um livro culinário impresso, enquanto os neutros aquecidos e a voz encorajadora criam proximidade e sentimento de posse[cite: 3, 5, 12].`

`---`

`## 1. Princípios`

`- **A receita é a protagonista.** Nenhuma cor de interface ou adereço visual deve disputar atenção com a fotografia do prato ou com os passos do modo de preparo[cite: 5, 8].`  
`- **Sensação de papel novo.** As superfícies usam tons neutros levemente aquecidos (como um papel levemente reciclado/palha claro), evitando o cinza frio industrial e a estética antiga de sépia envelhecido[cite: 2, 8, 11, 12].`  
`- **Anotação cirúrgica.** A cor vibrante de destaque (*Accent*) é usada como uma "caneta azul" sobre o papel: marca apenas o que é essencial (ação principal e seleção ativa)[cite: 2, 8, 12].`  
`- **Voz de instrução experiente.** O sistema fala como uma figura acolhedora e experiente (uma mãe, chefe ou nutricionista) repassando um conhecimento prático com clareza[cite: 7, 12].`

`---`

`## 2. Fundações Visuais`

`### Cor (Accent-Driven / Monocromática)`

``- **Matriz Neutra (Papel):** Régua de 12 degraus com pigmentação aquecida sutil (`neutralPigment: 0.6`)[cite: 2, 11]. O Degrau 1 atua como canvas (fundo de papel claro) e o Degrau 12 atua como grafite profundo para leitura em alto contraste[cite: 8, 11].``  
``- **Accent (Caneta Azul):** Tom de tinta azul saturado com alto contraste (`accentContrast: high`)[cite: 2, 3]. Aplicado no botão de ação primária, nas abas ativas e no anel de foco[cite: 2, 8].``  
`- **Ação Secundária:** Preenchimento neutro sutil (Degrau 3) com texto denso em grafite, sem carregar a tela de cor[cite: 2, 8].`  
`- **Status Adaptado:** Cores de erro, sucesso e aviso com saturação moderada para não outshoutar a foto da receita[cite: 3, 5].`  
`- **Acessibilidade:** WCAG AA (mínimo de 4.5:1 para texto e 3:1 para componentes interativos)[cite: 3, 6].`

`### Tipografia`

``- **Cabeçalhos & Títulos:** `ui-serif, Georgia, Garamond` — transmite a nobreza de livros de receitas impressos[cite: 4, 5, 12].``  
`- **Corpo & Modo de Preparo:** System Sans-serif — garante leitura limpa e rápida enquanto se cozinha com o dispositivo sobre a bancada[cite: 5, 12].`  
`- **Entrelinha (Line-height):** 1.6 — respiro generoso para leitura confortável sem perda de linha[cite: 4, 5].`

`### Geometria & Elevação`

``- **Arredondamento (`radius-control` / `radius-surface`):** Sutis (4px a 8px), conferindo toque artesanal sem parecer infantil[cite: 3, 4, 12].``  
``- **Separação de Superfícies:** Alternância de tons (`surfaceSeparation: tones`)[cite: 2, 3]. Blocos e cartões destacam-se variando suavemente entre o Degrau 1 (fundo) e o Degrau 2/3 (painel), com iluminação natural mínima[cite: 2, 8, 12].``

`---`

`## 3. Tom de Voz e UX Writing`

`Voz acolhedora e instrutiva, usando verbos no **imperativo amigável** para orientar o uso do caderno[cite: 3, 5, 7, 12].`

`| Situação | Registro | Exemplo |`  
`|---|---|---|`  
`| Validação de campo | Acolhedor | *"Adicione um nome para podermos guardar sua receita."* |`  
`| Erro do sistema | Orientado à ação | *"Não foi possível salvar agora. Tente novamente em instantes."* |`  
`| Estado vazio | Acolhedor | *"Seu caderno está pronto. Guarde sua primeira receita."* |`  
`| Confirmação destrutiva | Direto / Objetivo | *"Apagar esta receita? Esta ação não poderá ser desfeita."* |`  
`| Sucesso | Acolhedor | *"Receita guardada no seu caderno!"* |`

`- **CTAs:** Imperativo encorajador (*"Guarde a receita"*, *"Inicie o modo cozinha"*, *"Aplique os filtros"*)[cite: 3, 7, 12].`

`---`

`## 4. Interação e Motion`

``- **Estados Obrigatórios:** Todos os elementos interativos possuem `default`, `hover`, `focus-visible`, `active` e `disabled`[cite: 6].``  
``- **Foco:** Anel de foco claro em tom de Accent azul (`--app-ring-*`)[cite: 5, 8].``  
``- **Transições:** Micro-feedbacks rápidos (150ms) e suaves para abertura de painéis (250ms em `--app-ease-out`)[cite: 6, 7].``  
`- **Confirmações Destrutivas:** Ações irreversíveis (como apagar receitas) utilizam **Modal** de confirmação explícita[cite: 3, 6].`

`---`

`## 5. Composição — Do e Don't`

`### Do (Faça)`

`- Use alternância de tons de fundo para agrupar ingredientes e blocos de instruções[cite: 2, 8].`  
`- Mantenha a cor de Accent restrita a uma única ação primária evidente na tela[cite: 2, 8].`  
`- Exiba modais de confirmação apenas para remoção ou perda de dados[cite: 6].`

`### Don't (Não faça)`

`- Nunca empilhe dois botões primários saturados lado a lado[cite: 5, 6].`  
`- Nunca use cores tradicionais de status vibrantes em tags decorativas[cite: 5, 6].`  
`- Nunca altere a cor dos títulos para dar destaque — hierarquia é tamanho e peso fontal[cite: 5, 6].`

`### Encontrado na Verificação do Build`

`| Regra | Onde | O que falha |`  
`|---|---|---|`  
``| Ação destrutiva sem confirmação | `patterns.json` | `verify:patterns` exige o padrão `modal`[cite: 1, 6] |``  
``| Cores hexadecimais explícitas no SCSS | `stylelint.config.cjs` | `npm run lint` bloqueia a compilação[cite: 5, 6] |``  
``| Contraste abaixo de 4.5:1 | `themes.check-contrast()` | O build de temas falha em runtime/compile[cite: 1, 5, 6] |``

### **Próximos Passos recomendados do fluxo**

:

> 1. Salvar este arquivo na raiz como **DESIGN-LANGUAGE.md**.  
> 2. Executar a skill design-system para compilar os tokens primitivos e semânticos (OKLCH, escala de 12 degraus neutros aquecidos e micro-escala de accent azul).  
> 3. Executar a skill design-patterns para definir o catálogo de componentes permitidos (patterns.json).

---

