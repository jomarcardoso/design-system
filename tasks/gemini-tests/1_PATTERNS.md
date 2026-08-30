# **Configuração dos Patterns do Projeto**

[https://gemini.google.com/app/002e07f0d0f28319](https://gemini.google.com/app/002e07f0d0f28319)

*User prompt: Agora você vai gerar os patterns.*

Response: Before I write any markup or generate the pattern ledger, I need these files and definitions (paths from repository root):

**From the project**

> 1. patterns/patterns.json — the ledger. If the project has none, say so and I will start one from the template instead.  
> 2. DESIGN\_LANGUAGE.md — **Already provided in the context** (its guardrails define several forbidden pattern entries).

**From this plugin / environment** 3\. skills/design-patterns/references/worked-example.md — a real ledger reference. 4\. patterns/patterns.schema.json — the schema validator. 5\. patterns/patterns.template.json — needed if we are starting a ledger from scratch. 6\. skills/design-patterns/references/review.md — to review the ledger at the end.

Also, tell me **which component library the project uses** (e.g., Bootstrap, Tailwind, Radix, Svelte, or custom SCSS), as DESIGN\_LANGUAGE.md does not specify it.

Send what you have or confirm if we should start patterns/patterns.json from scratch for **Meu Caderninho**, and I will proceed with the setup.

---

*User prompt: Não tem patterns.json ainda. A lib será CoreUI.*

Response: Aqui está a geração do arquivo **patterns/patterns.json** para o **Meu Caderninho**, configurado para a biblioteca **CoreUI** e derivado diretamente do DESIGN\_LANGUAGE.md.

### **patterns/patterns.json**

`{`  
  `"$schema": "./patterns.schema.json",`  
  `"version": 1,`  
  `"libraries": ["coreui"],`  
  `"components": {`  
    `"button": {`  
      `"intent": "Um controle interativo que executa uma ação ou submete dados. Se navega para uma nova URL, é um link/âncora e a autoridade deste componente não se aplica.",`  
      `"namespace": {`  
        `"coreui": "^btn$|^btn-(?!group|toolbar|close)"`  
      `},`  
      ``"namespaceNote": "O CoreUI utiliza o prefixo `btn-`. Os utilitários e contêineres `btn-group`, `btn-toolbar` e `btn-close` são excluídos por lookahead negativo. O restante pertencente à árvore `btn-` é reivindicado por este componente.",``  
      `"patterns": {`  
        `"primary": {`  
          `"intent": "A ação principal e única de uma tela (ex: 'Guarde a receita', 'Inicie o modo cozinha'). Aplica a tinta azul caneta da marca.",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["btn", "btn-primary"]`  
          `},`  
          `"dos": [`  
            `"Usar apenas uma ação primária por contexto/tela para manter a promessa de destaque cirúrgico."`  
          `],`  
          `"donts": [`  
            `"Nunca empilhar dois botões primários lado a lado."`  
          `]`  
        `},`  
        `"secondary": {`  
          `"intent": "Uma ação de suporte ao lado da ação principal (ex: 'Cancelar', 'Voltar'). Utiliza preenchimento neutro aquecido em tom de papel sem carregar a tela com cor.",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["btn", "btn-secondary"]`  
          `}`  
        `},`  
        `"danger": {`  
          `"intent": "Uma proposta de ação destrutiva ou irreversível (ex: 'Apagar receita'). Deve disparar obrigatoriamente um modal de confirmação antes da execução.",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["btn", "btn-danger"]`  
          `}`  
        `},`  
        `"primary-outline": {`  
          `"intent": "Ênfase principal sem preenchimento sólido, para contextos onde várias ações coexistem e um botão totalmente preenchido pesaria visualmente no papel.",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["btn", "btn-outline-primary"]`  
          `}`  
        `},`  
        `"success": {`  
          `"intent": "Tentativa de usar um botão verde de sucesso para indicar salvamento ou ação positiva.",`  
          `"state": "forbidden",`  
          ``"reason": "Cores de status relatam um resultado que já aconteceu. Um botão propõe uma ação que ainda não ocorreu, portanto um botão verde 'Salvar' lê-se como já salvo. Use o padrão `primary`.",``  
          `"instead": "primary",`  
          `"matches": {`  
            `"coreui": ["btn-success", "btn-outline-success"]`  
          `}`  
        `},`  
        `"fixed-theme": {`  
          ``"intent": "Uso de botões com cores de paleta fixa (`btn-light`, `btn-dark`).",``  
          `"state": "forbidden",`  
          ``"reason": "`btn-light` e `btn-dark` são entradas fixas de paleta e não papéis semânticos de tema, quebrando a inversão automática quando o modo noturno (tema night) está ativo.",``  
          `"instead": "secondary",`  
          `"matches": {`  
            `"coreui": ["btn-light", "btn-dark", "btn-outline-light", "btn-outline-dark"]`  
          `}`  
        `}`  
      `},`  
      `"modifiers": {`  
        `"size": {`  
          `"intent": "Escala e área de toque do botão.",`  
          `"options": {`  
            `"medium": {`  
              `"intent": "Padrão do produto (mínimo de 44px de altura garantido pelo override de ergonomia para telas sensíveis ao toque). Não adiciona classe modificadora.",`  
              `"libraries": {`  
                `"coreui": []`  
              `}`  
            `},`  
            `"large": {`  
              `"intent": "Ação de grande destaque ou chamadas de tela cheia.",`  
              `"libraries": {`  
                `"coreui": ["btn-lg"]`  
              `}`  
            `},`  
            `"small": {`  
              `"intent": "Ações densas em tabelas ou listas inline de ingredientes.",`  
              `"libraries": {`  
                `"coreui": ["btn-sm"]`  
              `}`  
            `}`  
          `}`  
        `}`  
      `}`  
    `},`  
    `"card": {`  
      `"intent": "Superfície de enclausuramento para agrupar conteúdos de receita, blocos de ingredientes ou passos de preparo.",`  
      `"namespace": {`  
        `"coreui": "^card$|^card-(?!group|deck|columns)"`  
      `},`  
      ``"namespaceNote": "Reivindica a classe base `card` e sub-elementos estruturais do CoreUI.",``  
      `"patterns": {`  
        `"surface": {`  
          `"intent": "O painel padrão de receita elevado sobre o fundo da página (tom de papel reciclado).",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["card"]`  
          `},`  
          `"dos": [`  
            `"Deixar a fotografia da receita ir até a borda do próprio cartão."`  
          `],`  
          `"donts": [`  
            `"Nunca separar cartões usando sombras pesadas — a hierarquia é sustentada por bordas finas e espaço em branco."`  
          `]`  
        `},`  
        `"sunken": {`  
          `"intent": "Um bloco de cartão rebaixado ou cabeçalho destacado dentro de uma receita (ex: lista de utensílios ou notas da cozinheira).",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["card", "bg-body-tertiary"]`  
          `}`  
        `}`  
      `}`  
    `},`  
    `"modal": {`  
      `"intent": "Camada de diálogo focado que exige confirmação explícita do usuário antes de prosseguir.",`  
      `"namespace": {`  
        `"coreui": "^modal$|^modal-(?!backdrop)"`  
      `},`  
      `"namespaceNote": "Reivindica o componente modal do CoreUI excluindo o backdrop.",`  
      `"patterns": {`  
        `"confirmation": {`  
          `"intent": "Modal obrigatório de confirmação para ações destrutivas ou remoção de dados que não podem ser desfeitas (ex: apagar uma receita do caderno).",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["modal"]`  
          `},`  
          `"dos": [`  
            `"Exibir mensagem clara e direta no registro orientado à ação."`  
          `]`  
        `}`  
      `}`  
    `},`  
    `"field": {`  
      `"intent": "Controle de entrada de dados para formulários de edição de receitas, ingredientes ou busca.",`  
      `"namespace": {`  
        `"coreui": "^form-control$|^form-select$|^form-label"`  
      `},`  
      `"patterns": {`  
        `"text": {`  
          `"intent": "Campo de entrada de texto padrão de linha única ou área de texto.",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["form-control"]`  
          `}`  
        `},`  
        `"select": {`  
          `"intent": "Controle de seleção para escolha de categorias ou unidades de medida.",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["form-select"]`  
          `}`  
        `}`  
      `}`  
    `},`  
    `"nav": {`  
      `"intent": "Navegação por abas ou seções dentro de uma visualização do caderno.",`  
      `"namespace": {`  
        `"coreui": "^nav$|^nav-(?!bar)"`  
      `},`  
      `"patterns": {`  
        `"tabs": {`  
          `"intent": "Navegação por abas entre categorias ou sub-visões no desktop.",`  
          `"state": "raw",`  
          `"raw": {`  
            `"coreui": ["nav", "nav-tabs"]`  
          `},`  
          `"dos": [`  
            `"Uso para troca de seções dentro de uma mesma página em desktop."`  
          `],`  
          `"donts": [`  
            `"Não usar abas em telas mobile onde o topo da tela compete com o cabeçalho do aplicativo."`  
          `],`  
          ``"responsive": "Em telas mobile abaixo do breakpoint de tablet, transformar as abas em um controle de seleção (`select`) ou sanfona (`accordion`)."``  
        `}`  
      `}`  
    `}`  
  `},`  
  `"composition": {`  
    `"intent": "Regras de composição para telas onde não existe um componente específico no catálogo. Define bindings concretos para o tema.",`  
    `"typeRoles": {`  
      `"pageTitle": "font-family-heading text-heading-xl",`  
      `"sectionTitle": "font-family-heading text-heading",`  
      `"body": "font-family-body text-base",`  
      `"caption": "font-family-body text-sm"`  
    `},`  
    `"rhythm": {`  
      `"related": "space-xs",`  
      `"unrelated": "space-md",`  
      `"section": "space-2xl"`  
    `},`  
    `"surfaces": ["bg-page", "bg-surface"],`  
    `"accentBudget": "Uma única ação primária (caneta azul) por contexto de tela, além do estado ativo/selecionado no momento.",`  
    `"donts": [`  
      `"Nunca empilhar dois botões primários saturados lado a lado.",`  
      `"Nunca alterar a cor de um título para dar destaque — hierarquia é expressa por tamanho e peso.",`  
      `"Nunca usar um terceiro nível de superfície — duas superfícies (página e cartão) é o limite que o produto permite."`  
    `]`  
  `}`  
`}`

### **Resumo de Validação e Destaques**

> 1. **Ações Destrutivas e Guardrails**: O guardrail de remoção de receitas do DESIGN\_LANGUAGE.md foi codificado na regra do componente modal/confirmation e na intenção do button/danger.  
> 2. **Recusas Justificadas (forbidden)**:  
   * **button/success**: Recusa o uso de botões verdes propondo ações (com argumento pedagógico de semântica de status vs. ação).  
   * **button/fixed-theme**: Bloqueia btn-light e btn-dark por quebrarem a reatividade em Dark Mode (night).  
> 3. **Ergonomia e Modificadores**: O modificador size: medium documenta o piso de **44px** estipulado na linguagem para apoio multiplataforma sem inventar classes extras desnecessárias.  
> 4. **Composição (composition)**: Mapeia as bindings de ritmo e limite de accent (*accent budget*) diretamente para uso em layouts ad-hoc.

---

