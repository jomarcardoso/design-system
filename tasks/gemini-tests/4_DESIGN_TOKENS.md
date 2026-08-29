# **Preparação para Geração de Design System**

[https://gemini.google.com/app/8e40238fcf380666](https://gemini.google.com/app/8e40238fcf380666)

*User prompt: Conduza a geração do Design system. Assim que ler os arquivos eu te mando o DESIGN\_LAGUAGE.*

Response: Before I build anything I need these. Paths are from the repository root:

**From the project**

> 1. DESIGN\_LANGUAGE.md

**From this plugin** 2\. skills/design-system/references/tokens.md

3\. skills/design-system/references/worked-example.md

4\. skills/design-system/references/install.md

5\. skills/design-system/references/adapters.md

6\. skills/design-system/references/review.md

7\. skills/design-language/references/archetypes.md

8\. skills/design-language/references/colour-strategies.md

9\. src/\_config.scss

10\. src/\_ramp.scss — only if the product is monochrome

Send what you have. I will tell you what is still blocking before I start.

---

*User prompt: Os demais arquivos eu já te mandei. Confira se estiver tudo certo, pode gerar o DS.*

Response: Todos os 10 arquivos de entrada necessários foram recebidos e verificados em relação às decisões do DESIGN\_LANGUAGE.md. Não resta nenhum bloqueio estrutural, por isso os arquivos do Design System (Camadas 1, 2, entrada e regras de lint) foram gerados a seguir.

### **Decisões Mapeadas do DESIGN\_LANGUAGE.md**

> * **Arquétipo:** editorial-premium — tipografia serifada no cabeçalho e sans no corpo, entrelinha 1.7, cantos de 4px em controles e 6px em superfícies, e ícones em estilo contornado (1.25px).  
> * **Densidade e Ergonomia:** comfortable com tamanho de controle elevado para o piso de 44px (size-control) por suporte multiplataforma para alvos de toque.  
> * **Estratégia de Elevação:** borders — a hierarquia de superfícies é sustentada por bordas e linhas finas (surfaceSeparation: lines), mantendo sombras no nível mínimo (2xs em elevadas e sm em sobreposições).  
> * **Estratégia de Cor:** monochrome (Accent-Driven) em \_config.scss. Toda a interface é gerada a partir da rampa neutra de papel reciclado (neutralPigment: 0.6) e um único destaque de caneta azul azul-cobalto (\#1d51c4 / oklch(0.45 0.20 258)).  
> * **Ação Secundária:** neutral — consome a superfície neutra sutil (--app-bg-neutral) sem introduzir uma segunda cor vibrante na página.  
> * **Acessibilidade:** accessibility: AA — exige piso de contraste mínimo de 4.5:1 verificado no build de temas.  
> * **Cores de Status:** brand-adapted — mantêm as famílias cromáticas tradicionais com saturação suavizada para não competir com fotos de receitas.

### **1\. palette.scss (Camada 1 — Primitivos Gerados)**

`// styles/ds/palette.scss`

`@use '../../src/ramp';`

`// PAPER — rampa neutra derivada da semente de papel reciclado limpo com neutralPigment: 0.6`  
`$paper: ramp.neutral(oklch(0.97 0.012 85), $pigment: 0.6);`

`// PEN — rampa de destaque derivada da cor azul caneta (#1d51c4)`  
`$pen: ramp.chromatic(#1d51c4);`

### **2\. theme.scss (Camada 2 — Atribuição Semântica)**

`// styles/ds/theme.scss`

`@use 'sass:map';`  
`@use '../../src/base';`  
`@use 'palette' as p;`

`@function paper($step) { @return map.get(p.$paper, $step); }`  
`@function pen($step)   { @return map.get(p.$pen, $step); }`

`$caderno: (`  
  `// --- Papel: Escala de Superfícies ------------------------------------------`  
  `page: paper(100),`  
  `surface: paper(50),`  
  `raised: paper(0),`  
  `sunken: paper(200),`  
  `'surface-hover': paper(150),`  
  `'surface-active': paper(200),`  
  `overlay: rgba(40, 33, 28, 0.55),`

  `// --- Tinta / Grafite ------------------------------------------------------`  
  `text: paper(900),`  
  `'text-muted': paper(700),`  
  `'text-subtlest': paper(600),`  
  `heading: paper(950),`

  `// --- Ações Neutras (Botões Secundários) -----------------------------------`  
  `neutral: paper(700),`  
  `'on-neutral': paper(0),`  
  `'neutral-hover': paper(800),`  
  `'neutral-active': paper(900),`

  `disabled: paper(200),`  
  `'disabled-text': paper(500),`

  `// --- Accent (Vocabulário da Escola Monocromática) --------------------------`  
  `accent: pen(700),`  
  `'on-accent': paper(0),`  
  `'accent-hover': pen(800),`  
  `'accent-active': pen(900),`  
  `'accent-subtle': pen(50),`  
  `'accent-text': pen(700),`  
  `'link-visited': pen(900),`

  `// --- Linhas e Estrutura ----------------------------------------------------`  
  `border: paper(300),`  
  `'border-subtle': paper(200),`  
  `'border-strong': paper(500),`  
  `ring: pen(600),`  
  `'shadow-raised': base.scale(shadow, '2xs'),`  
  `'shadow-overlay': base.scale(shadow, sm),`

  `// --- Status: Cores de Marca Adaptadas -------------------------------------`  
  `success: base.color(green, 700),`  
  `'on-success': paper(0),`  
  `'success-hover': base.color(green, 800),`  
  `'success-active': base.color(green, 900),`  
  `'success-subtle': base.color(green, 50),`  
  `'success-text': base.color(green, 700),`  
  `'success-border': base.color(green, 300),`

  `warning: base.color(amber, 200),`  
  `'on-warning': base.color(amber, 950),`  
  `'warning-hover': base.color(amber, 100),`  
  `'warning-active': base.color(amber, 50),`  
  `'warning-subtle': base.color(amber, 50),`  
  `'warning-text': base.color(amber, 900),`  
  `'warning-border': base.color(amber, 400),`

  `danger: base.color(red, 700),`  
  `'on-danger': paper(0),`  
  `'danger-hover': base.color(red, 800),`  
  `'danger-active': base.color(red, 900),`  
  `'danger-subtle': base.color(red, 50),`  
  `'danger-text': base.color(red, 700),`  
  `'danger-border': base.color(red, 300),`

  `info: base.color(slate, 700),`  
  `'on-info': paper(0),`  
  `'info-hover': base.color(slate, 800),`  
  `'info-active': base.color(slate, 900),`  
  `'info-subtle': base.color(slate, 50),`  
  `'info-text': base.color(slate, 700),`  
  `'info-border': base.color(slate, 300)`  
`);`

`$typography: (`  
  `'font-family-body': (ui-sans-serif, system-ui, -apple-system, sans-serif),`  
  `'font-family-heading': (ui-serif, Georgia, Garamond, serif)`  
`);`

### **3\. ds.scss (Entrada do Build e Emissão de Temas)**

`// styles/ds/ds.scss`

`@use '../../src/config' with (`  
  `$adapters: (),`  
  `$colour-strategy: 'monochrome',`  
  `$contrast-min: 4.5`  
`);`

`@use '../../src/base';`  
`@use '../../src/semantic';`  
`@use '../../src/component';`  
`@use '../../src/derive';`  
`@use 'theme';`

`// Layer 1 — Primitivos (SCSS apenas)`  
`@include base.emit();`

`// Layer 2 — Estrutura com tipografia do arquétipo e tema claro`  
`@include semantic.emit-structure(theme.$typography);`  
`@include semantic.emit-theme('light', theme.$caderno, $default: true);`

`// Tema escuro derivado automaticamente em OKLCH`  
`@include semantic.emit-theme('dark', derive.dark(theme.$caderno), $auto: true);`

### **4\. stylelint.config.cjs (Guardrails e Regras do Linter)**

`// stylelint.config.cjs`

`module.exports = {`  
  `extends: ['stylelint-config-standard-scss'],`  
  `rules: {`  
    `'color-no-hex': true,`  
    `'declaration-property-value-disallowed-list': {`  
      `'background': ['/linear-gradient/', '/radial-gradient/'],`  
      `'background-image': ['/linear-gradient/', '/radial-gradient/'],`  
      `'text-transform': ['uppercase']`  
    `}`  
  `}`  
`};`

### **Instruções para Verificação do Build**

Execute os comandos a seguir no terminal do projeto para validar a integridade dos tokens gerados:

`# 1. Compilação dos tokens e validação do Linter`  
`npm run build`

`# 2. Verificação de vazamento da Camada 1 para o CSS público (deve retornar 0)`  
`grep -c -- "--app-base-" dist/ds.css`

`# 3. Suíte completa de verificação (Contraste WCAG AA e integridade do tema)`  
`npm run verify`

---

