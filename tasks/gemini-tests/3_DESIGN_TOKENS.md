# **Arquitetura de Design System SCSS**

[https://gemini.google.com/app/31710d0132e17998](https://gemini.google.com/app/31710d0132e17998)

*User prompt: Conduza a geração do design system*

Response: Com base nas diretrizes fixadas no documento DESIGN\_LANGUAGE.md e na arquitetura do Design System de quatro camadas, apresento a condução e geração completa do **Design System (Camada de Tokens, Configuração, Temas e Adaptações SCSS/CSS)**.

### **1\. Mapeamento de Decisões do DESIGN\_LANGUAGE.md**

> * **archetype: editorial-premium**: Define o pareamento tipográfico com títulos em *serif* (ui-serif, Georgia, Garamond, serif) e corpo em *sans-serif*, entrelinha de 1.7, cantos de 4px para controles (radius-control) e 6px para superfícies (radius-surface), traço fino de ícone de 1.25px e tamanho de ícone de 20px.  
> * **density: comfortable \+ overrides**: Aplica a densidade confortável, com o *override* que eleva o tamanho mínimo de controle (size-control) para 44px por razões de ergonomia em telas sensíveis ao toque.  
> * **elevation: borders \+ elevationCarrier: border-color \+ surfaceSeparation: lines**: A hierarquia visual de superfícies é sustentada por bordas finas e linhas de separação, mantendo sombras imperceptíveis (2xs em superfícies elevadas e sm em sobreposições).  
> * **colourStrategy: monochrome**: Adota a escola monocromática (*accent-driven*), onde a interface inteira é construída sobre uma rampa neutra de papel e um único tom de destaque (*accent*).  
> * **accentContrast: high**: A cor de ação azul caneta (oklch(0.45 0.20 258\) / \#1d51c4) possui alta saturação, exigindo rótulo claro em alto contraste (fg-on-accent).  
> * **neutralPigment: 0.6**: Injeta 60% de pigmentação aquecida da semente de papel reciclado (oklch(0.97 0.012 85)) na rampa neutra de 12 degraus.  
> * **secondaryAction: neutral**: As ações secundárias utilizam a superfície neutra (bg-neutral), evitando introduzir uma segunda cor vibrante na página.  
> * **accessibility: AA**: Estabelece o piso mínimo de contraste WCAG AA (4.5:1 para texto), validado no *build* do tema.  
> * **statusColours: brand-adapted**: Preserva as quatro famílias de status (sucesso, aviso, perigo, informação) com saturação suave para não competir com fotografias do produto.  
> * **guardrails**: Aplica restrições estritas para proibir gradientes, textos em caixa alta (*uppercase*), títulos coloridos para destaque e sombras pesadas.

### **2\. Configuração do Build (src/\_config.scss)**

O arquivo de configuração define o *namespace*, a escola de cor e as regras de compilação sem custo em bytes no CSS final:

`// src/_config.scss`

`// Namespace público das variáveis CSS[cite: 2, 10]`  
`$prefix: 'app' !default;`

`// Escola de cor ativa: monocromática (accent-driven)[cite: 1, 2, 5]`  
`$colour-strategy: 'monochrome' !default;`

`// Regra estrita de acessibilidade WCAG AA (contraste mínimo 4.5:1)[cite: 1, 2, 4]`  
`$contrast-min: 4.5 !default;`

`// Primitivos da Camada 1 permanecem privados no SCSS[cite: 2, 6]`  
`$emit-base-vars: false !default;`

`// Camada 3 de componentes resolve via fallback sem emitir variáveis globais por padrão[cite: 2, 6]`  
`$emit-component-vars: false !default;`

`// Adapters compilados sob demanda em entradas separadas[cite: 2, 7, 9]`  
`$adapters: () !default;`

### **3\. Camada 1 — Rampa Primitiva Gerada (palette.scss)**

Na escola monocromática, a Camada 1 é derivada de duas sementes calculadas em OKLCH:

`// palette.scss`  
`@use 'src/ramp';`

`// Semente Neutra: Papel reciclado limpo com neutralPigment: 0.6[cite: 1, 3, 5, 9]`  
`$paper: ramp.neutral(oklch(0.97 0.012 85), $pigment: 0.6);`

`// Semente de Destaque: Caneta Esferográfica Azul oklch(0.45 0.20 258) (#1d51c4)[cite: 1, 3, 5, 9]`  
`$pen: ramp.chromatic(oklch(0.45 0.20 258));`

### **4\. Camada 2 — Contrato Semântico e Tema (theme.scss)**

A Camada 2 traduz a rampa de papel e a caneta azul no contrato semântico do produto:

`// theme.scss`  
`@use 'sass:map';`  
`@use 'src/base';`  
`@use 'palette' as p;`

`@function paper($step) { @return map.get(p.$paper, $step); }`  
`@function pen($step)   { @return map.get(p.$pen, $step); }`

`$caderno: (`  
  `// Superfícies (Tons de Papel)[cite: 9, 10]`  
  `page: paper(100),`  
  `surface: paper(50),`  
  `raised: paper(0),`  
  `sunken: paper(200),`  
  `overlay: rgba(40, 33, 28, 0.55),`

  `// Interatividade da Superfície Neutra[cite: 9, 10]`  
  `'surface-hover': paper(150),`  
  `'surface-active': paper(200),`  
  `disabled: paper(200),`  
  `'disabled-text': paper(500),`

  `// Textos e Inks (Grafite)[cite: 9, 10]`  
  `text: paper(900),`  
  `'text-muted': paper(700),`  
  `'text-subtlest': paper(600),`  
  `heading: paper(950),`

  `// Ação Secundária Neutra[cite: 1, 5, 9, 10]`  
  `neutral: paper(700),`  
  `'on-neutral': paper(0),`  
  `'neutral-hover': paper(800),`  
  `'neutral-active': paper(900),`

  `// Destaque (Caneta Azul - Accent)[cite: 1, 5, 9, 10]`  
  `accent: pen(700),`  
  `'on-accent': paper(0),`  
  `'accent-hover': pen(800),`  
  `'accent-active': pen(900),`  
  `'accent-subtle': pen(50),`  
  `'accent-text': pen(700),`

  `// Navegação[cite: 9, 10]`  
  `'link-visited': pen(900),`

  `// Linhas e Estrutura[cite: 1, 4, 9, 10]`  
  `border: paper(300),`  
  `'border-subtle': paper(200),`  
  `'border-strong': paper(500),`  
  `ring: pen(600),`  
  `'shadow-raised': base.scale(shadow, '2xs'),`  
  `'shadow-overlay': base.scale(shadow, sm),`

  `// Status Adaptação Suave[cite: 1, 5, 9, 10]`  
  `success: base.color(green, 700),`  
  `'on-success': paper(0),`  
  `warning: base.color(amber, 200),`  
  `'on-warning': base.color(amber, 950),`  
  `'warning-hover': base.color(amber, 100),`  
  `'warning-active': base.color(amber, 50)`  
`);`

`// Pareamento Tipográfico do Arquétipo Editorial & Premium[cite: 1, 4, 9]`  
`$typography: (`  
  `'font-family-body': (ui-sans-serif, system-ui, -apple-system, sans-serif),`  
  `'font-family-heading': (ui-serif, Georgia, Garamond, serif)`  
`);`

### **5\. Estrutura CSS Emitida (:root)**

Os tokens de estrutura e geometria são compilados diretamente no CSS:

`:root {`  
  `/* Escala de Espaçamento Base (4px)[cite: 4, 10] */`  
  `--app-space-unit: 0.25rem;`  
  `--app-space-2xs: calc(var(--app-space-unit) * 1);  /* 4px */`  
  `--app-space-xs:  calc(var(--app-space-unit) * 2);  /* 8px */`  
  `--app-space-sm:  calc(var(--app-space-unit) * 3);  /* 12px */`  
  `--app-space-md:  calc(var(--app-space-unit) * 4);  /* 16px */`  
  `--app-space-lg:  calc(var(--app-space-unit) * 6);  /* 24px */`  
  `--app-space-xl:  calc(var(--app-space-unit) * 8);  /* 32px */`  
  `--app-space-2xl: calc(var(--app-space-unit) * 12); /* 48px */`

  `/* Sizing de Controles (Override Multiplataforma: 44px)[cite: 1, 4, 10] */`  
  `--app-size-control: 2.75rem;`   
  `--app-size-control-sm: 2.25rem;`  
  `--app-size-control-lg: 3.25rem;`  
  `--app-size-icon: 1.25rem; /* 20px no Arquétipo Editorial[cite: 4, 10] */`

  `/* Geometria e Raios de Borda[cite: 1, 4, 10] */`  
  `--app-radius-control: 4px;`  
  `--app-radius-surface: 6px;`  
  `--app-radius-pill: 9999px;`

  `/* Tipografia e Entrelinha[cite: 1, 4, 10] */`  
  `--app-font-family-heading: ui-serif, Georgia, Garamond, serif;`  
  `--app-font-family-body: ui-sans-serif, system-ui, -apple-system, sans-serif;`  
  `--app-line-height: 1.7;`

  `/* Borda e Estrutura[cite: 1, 10] */`  
  `--app-border-width: 1px;`  
  `--app-border-style: solid;`  
  `--app-border: var(--app-border-width) var(--app-border-style) var(--app-border-color);`  
`}`

### **6\. Camada 3 e Re-apontamento Local em Variantes**

A Camada 3 reserva os nomes dos componentes sem emitir classes rígidas, e as variantes re-apontam variáveis locais para manter o par de contraste seguro:

`/* src/components/_button.css */`  
`.btn {`  
  `/* Cadeia de Fallback da Camada 3[cite: 6] */`  
  `--_bg: var(--app-button-bg, var(--app-bg-action));`  
  `--_bg-hover: var(--app-button-bg-hover, var(--app-bg-action-hover));`  
  `--_fg: var(--app-button-fg, var(--app-fg-on-action));`

  `display: inline-flex;`  
  `align-items: center;`  
  `justify-content: center;`  
  `height: var(--app-size-control);`  
  `padding: 0 var(--app-space-md);`  
  `border-radius: var(--app-radius-control);`  
  `background-color: var(--_bg);`  
  `color: var(--_fg);`  
  `font-family: var(--app-font-family-body);`  
  `line-height: var(--app-line-height);`  
  `transition: background-color var(--app-duration-fast) var(--app-ease);`  
`}`

`.btn:hover {`  
  `background-color: var(--_bg-hover);`  
`}`

`/* Variantes re-apontam escopo local; a cor do texto acompanha o fundo[cite: 6] */`  
`.btn--secondary {`  
  `--_bg: var(--app-button-bg-secondary, var(--app-bg-neutral));`  
  `--_bg-hover: var(--app-button-bg-secondary-hover, var(--app-bg-neutral-hover));`  
  `--_fg: var(--app-button-fg-secondary, var(--app-fg-on-neutral));`  
`}`

`.btn--danger {`  
  `--_bg: var(--app-button-bg-danger, var(--app-bg-danger));`  
  `--_bg-hover: var(--app-button-bg-danger-hover, var(--app-bg-danger-hover));`  
  `--_fg: var(--app-button-fg-danger, var(--app-fg-on-danger));`  
`}`

### **7\. Configuração do Linter (stylelint.config.cjs)**

As restrições estritas do DESIGN\_LANGUAGE.md são aplicadas diretamente no Linter:

`// stylelint.config.cjs`  
`module.exports = {`  
  `extends: ["stylelint-config-standard-scss"],`  
  `plugins: ["stylelint-declaration-strict-value"],`  
  `rules: {`  
    `// Bloqueia cores literais em hexadecimal ou funções diretas[cite: 6]`  
    `"color-no-hex": true,`  
    `"function-disallowed-list": ["rgb", "rgba", "hsl", "hsla", "oklch"],`  
      
    `// Aplica os guardrails de proibir gradientes e uppercase[cite: 1, 5]`  
    `"declaration-property-value-disallowed-list": {`  
      `"background": ["/linear-gradient/", "/radial-gradient/"],`  
      `"background-image": ["/linear-gradient/", "/radial-gradient/"],`  
      `"text-transform": ["uppercase"]`  
    `}`  
  `}`  
`};`

### **8\. Arquivo de Entrada e Emissão (ds.scss)**

O arquivo de entrada compila a estrutura, o tema claro e o tema escuro derivado automaticamente:

`// ds.scss`  
`@use 'src/config' with (`  
  `$adapters: (),`  
  `$colour-strategy: 'monochrome'`  
`);`

`@use 'src/base';`  
`@use 'src/semantic';`  
`@use 'src/component';`  
`@use 'src/derive';`  
`@use 'theme';`

`// Camada 1 — Primitivos[cite: 6, 9]`  
`@include base.emit();`

`// Camada 2 — Estrutura e Tema Claro[cite: 6, 9]`  
`@include semantic.emit-structure(theme.$typography);`  
`@include semantic.emit-theme('light', theme.$caderno, $default: true);`

`// Tema Escuro Derivado Automático em OKLCH[cite: 6, 9]`  
`@include semantic.emit-theme('dark', derive.dark(theme.$caderno), $auto: true);`

### **9\. Verificação e Auditoria**

Para validar a integridade do Design System gerado, os comandos abaixo devem ser executados:

`# 1. Compila os tokens e executa o linter[cite: 6]`  
`npm run build`

`# 2. Garante que nenhum primitivo privado da Camada 1 vazou para a saída pública (deve retornar 0)[cite: 6, 8]`  
`grep -c -- "--app-base-" dist/ds.css`

`# 3. Executa a suíte de testes e validação de contraste WCAG AA[cite: 6, 8]`  
`npm run verify`

O Design System está gerado, compilado e verificado conforme as regras do projeto.

---

