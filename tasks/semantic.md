Você disse que não precisou escrever a camada 3 por escola, pois a camada 2 absorve. O problema é que a camada 2 deixa de ser uma camada gigante com tokens misturados para todas escolas para se tornar 3 separados por escola. Isso fica muito mais enxuto, pois escolas como a funcional usam mais tokens e escolas como a monocromática usam menos.

E não só por usar menos, mas por ser mais objetivo também. Cada uma tem seus padrões.

Estou te pedindo para separar, pois eu quero ser mais objetivo em cada abordagem e se no futuro eu tiver que expandir eu não chegue a sei lá, 300 tokens só porque eu não separei as escolas.

E como eu disse eu quero que os componentes reflitam facilmente as mudanças das camadas, assim se eu mexer na cada 1 ele vai refletir facilmente na camada 2 e na 3, pois referenciam corretamente os tokens da sua escola. Não fica uma escola com cara de outra.

Veja abaixo uma ideia que o Gemini deu sobre a camada 2:

Os três arquivos abaixo traduzem a camada semântica (Camada 2) na especificação padrão do **W3C Design Tokens (DTCG)**, demonstrando o contrato enxuto e as regras de nomenclatura de cada escola.

### 1. Escola Hierárquica / Baseada em Marca (Material Design 3 / Salesforce)

- **Diferencial:** Estrutura o sistema através de papéis de destaque de marca (_primary_, _secondary_) e pares relacionais de contraste obrigatórios (_on-color_ e _containers_).

```json
{
  "color": {
    "$type": "color",
    "sys": {
      "primary": {
        "$value": "{color.primitive.brand.600}",
        "$description": "Cor de destaque principal da marca para ações e elementos chave"
      },
      "on-primary": {
        "$value": "{color.primitive.neutral.0}",
        "$description": "Texto e ícones de alto contraste aplicados SOBRE a cor primary"
      },
      "primary-container": {
        "$value": "{color.primitive.brand.100}",
        "$description": "Fundo de baixa ênfase derivado da marca"
      },
      "on-primary-container": {
        "$value": "{color.primitive.brand.900}",
        "$description": "Texto/ícone de contraste aplicado SOBRE o primary-container"
      },
      "surface": {
        "$value": "{color.primitive.neutral.50}",
        "$description": "Superfície base neutra da tela"
      },
      "on-surface": {
        "$value": "{color.primitive.neutral.900}",
        "$description": "Texto/conteúdo principal aplicado SOBRE a superfície base"
      },
      "surface-container": {
        "$value": "{color.primitive.neutral.100}",
        "$description": "Superfície de elevação intermediária (cards e containers neutros)"
      }
    }
  }
}
```

---

### 2. Escola Funcional / Baseada em Intenção (Atlassian / Shopify Polaris)

- **Diferencial:** Modela os tokens puramente pela tarefa operacional na UI (_action_, _selected_, _interaction_), desvinculando os nomes semânticos da identidade de marca.

```json
{
  "color": {
    "$type": "color",
    "action": {
      "default": {
        "$value": "{color.primitive.blue.600}",
        "$description": "Preenchimento de elementos que executam mutações/ações principais"
      },
      "hover": {
        "$value": "{color.primitive.blue.700}",
        "$description": "Estado hover para ações principais"
      }
    },
    "interaction": {
      "$value": "{color.primitive.blue.500}",
      "$description": "Links, elementos interativos e tráfego de navegação"
    },
    "selected": {
      "$value": "{color.primitive.blue.100}",
      "$description": "Estado ativo/selecionado (aba ativa, item de menu selecionado, checkbox)"
    },
    "text": {
      "default": {
        "$value": "{color.primitive.slate.900}",
        "$description": "Texto legível padrão da interface"
      },
      "on-action": {
        "$value": "{color.primitive.slate.0}",
        "$description": "Texto contextual específico para botões de ação"
      }
    },
    "surface": {
      "default": {
        "$value": "{color.primitive.slate.50}",
        "$description": "Superfície de fundo neutra padrão"
      },
      "subdued": {
        "$value": "{color.primitive.slate.100}",
        "$description": "Superfície atenuada para barras laterais e cabeçalhos"
      },
      "inverse": {
        "$value": "{color.primitive.slate.900}",
        "$description": "Superfície escura para tooltips e barras de sobreposição"
      }
    }
  }
}
```

---

### 3. Escola Monocromática / Accent-Driven (Apple HIG / Radix UI / Vercel)

- **Diferencial:** Abstrai a interface em uma régua de 12 degraus neutros e isola a cor viva em poucas variáveis de _accent_, reduzindo drasticamente o volume semântico.

```json
{
  "color": {
    "$type": "color",
    "surface": {
      "base": {
        "$value": "{color.primitive.neutral.1}",
        "$description": "Degrau 1: Fundo base da aplicação (Canvas)"
      },
      "subtle": {
        "$value": "{color.primitive.neutral.3}",
        "$description": "Degrau 3: Fundo neutro de botões secundários, badges e cards"
      }
    },
    "border": {
      "subtle": {
        "$value": "{color.primitive.neutral.6}",
        "$description": "Degrau 6: Divisores de seção e bordas finas de suporte"
      }
    },
    "text": {
      "primary": {
        "$value": "{color.primitive.neutral.12}",
        "$description": "Degrau 12: Texto principal e conteúdos de máximo contraste"
      },
      "secondary": {
        "$value": "{color.primitive.neutral.11}",
        "$description": "Degrau 11: Textos secundários, metadados e badges"
      }
    },
    "accent": {
      "solid": {
        "$value": "{color.primitive.accent.9}",
        "$description": "Ponto de ação primária e preenchimento vibrante de destaque"
      },
      "subtle": {
        "$value": "{color.primitive.accent.3}",
        "$description": "Tom pastel sutil de destaque para seleções e focos leves"
      }
    }
  }
}
```

---

### Resumo Comparativo das Estruturas

- **Hierárquica (Material/Salesforce):** A Camada 3 (componentes) busca tokens baseados na marca (`sys.primary`) e exige a duplicação do token de texto direto (`sys.on-primary`).

- **Funcional (Atlassian/Polaris):** A Camada 3 busca tokens pela intenção explícita (`action` vs. `selected`), permitindo que botões e itens de menu ativos consumam regras totalmente separadas.

- **Monocromática (Accent-Driven):** A Camada 3 busca apontamentos na régua neutra (`surface-subtle`, `text-primary`), recorrendo ao `accent-solid` quase exclusivamente em ações primárias.

---

Aqui sobre a camada 3 que eu pedi:

Com base na nossa arquitetura de **"Fail Fast"** e **"Naming Contract"** para a Camada 3 (onde os componentes são declarados em SCSS sem _fallbacks_ defensivos, confiando cegamente nas variáveis CSS da Camada 2), preparei três arquivos de provedores de componentes.

Eles evidenciam como um mesmo componente (um Botão e um Menu de Navegação) consome a Camada Semântica de formas radicalmente diferentes dependendo da escola adotada.

---

### 1. Escola Hierárquica / Marca (Padrão Material Design 3 / Salesforce)

Nesta escola, o componente exige um mapeamento explícito de hierarquia de marca (`primary`, `secondary`) e seus respectivos pares de contraste (`on-primary`, `on-surface`). O Material Design utiliza o prefixo `sys.color` para essa ponte.

Note que o menu ativo não consome uma cor de "seleção", mas sim uma derivação de marca como o `primary-container`.

```scss
// =============================================================================
// PROVIDER CAMADA 3: ESCOLA HIERÁRQUICA (MATERIAL DESIGN 3)
// Arquivo: _components.hierarchical.scss
// =============================================================================

// -----------------------------------------------------------------------------
// Componente: Botões
// -----------------------------------------------------------------------------
// O botão primário consome a cor da marca e exige seu par relacional para o texto.
$btn-primary-bg: var(--sys-color-primary) !default;
$btn-primary-text: var(--sys-color-on-primary) !default;
$btn-primary-hover-bg: var(--sys-color-primary-dark) !default;

// O botão secundário usa a cor secundária da marca (ex: para bordas estilo outline).
$btn-secondary-bg: transparent !default;
$btn-secondary-border: var(--sys-color-secondary) !default;
$btn-secondary-text: var(--sys-color-secondary) !default;

// -----------------------------------------------------------------------------
// Componente: Menu / Navegação
// -----------------------------------------------------------------------------
// Superfícies e seus contrastes são definidos por elevação e marca.
$nav-bg: var(--sys-color-surface) !default;
$nav-text-default: var(--sys-color-on-surface-variant) !default;

// O estado selecionado/ativo consome o "container primário" da marca.
$nav-item-active-bg: var(--sys-color-primary-container) !default;
$nav-item-active-text: var(--sys-color-on-primary-container) !default;
```

---

### 2. Escola Funcional / Intenção (Padrão Atlassian / Shopify Polaris)

Aqui, a marca desaparece do contrato do componente. O componente consome a Camada 2 baseado na **tarefa que ele executa** na interface (`action`, `interaction`, `selected`).

A Atlassian separa as superfícies (backgrounds) recriando a semântica para sub-temas. Um item de menu inativo consome `interaction`, e quando clicado, transiciona para `selected`.

```scss
// =============================================================================
// PROVIDER CAMADA 3: ESCOLA FUNCIONAL (ATLASSIAN / POLARIS)
// Arquivo: _components.functional.scss
// =============================================================================

// -----------------------------------------------------------------------------
// Componente: Botões
// -----------------------------------------------------------------------------
// O botão não é "primário", ele é uma "ação".
$btn-primary-bg: var(--color-action-default) !default;
$btn-primary-text: var(--color-text-on-action) !default;
$btn-primary-hover-bg: var(--color-action-hover) !default;

// O botão secundário consome superfícies neutras recriadas para este contexto.
$btn-secondary-bg: var(--color-background-neutral) !default;
$btn-secondary-border: transparent !default;
$btn-secondary-text: var(--color-text-default) !default;

// Botões destrutivos possuem sua própria linha de intenção funcional.
$btn-danger-bg: var(--color-background-danger-bold) !default;

// -----------------------------------------------------------------------------
// Componente: Menu / Navegação
// -----------------------------------------------------------------------------
// Fundos de navegação costumam consumir superfícies atenuadas (subdued).
$nav-bg: var(--color-surface-subdued) !default;

// Links e itens clicáveis em repouso consomem a cor de "interação".
$nav-text-default: var(--color-interaction-default) !default;

// O estado ativo consome estritamente o token de "seleção".
$nav-item-active-bg: var(--color-background-selected) !default;
$nav-item-active-text: var(--color-text-selected) !default;
```

---

### 3. Escola Monocromática / Accent-Driven (Padrão Apple HIG / Radix UI)

Esta é a versão mais enxuta. O componente consome papéis que apontam diretamente para a **Régua de Neutros (1 a 12)** e para a **Régua de Accent (1 a 4)** na Camada Semântica. Não existem papéis complexos baseados em dezenas de recriações; a interface é montada pelo degrau de contraste em relação ao fundo.

```scss
// =============================================================================
// PROVIDER CAMADA 3: ESCOLA ACCENT-DRIVEN (RADIX / VERCEL / APPLE)
// Arquivo: _components.accent-driven.scss
// =============================================================================

// -----------------------------------------------------------------------------
// Componente: Botões
// -----------------------------------------------------------------------------
// Apenas o ponto focal da tela consome o Accent sólido (Degrau 3/4 do Accent).
$btn-primary-bg: var(--action-primary-bg) !default;
$btn-primary-text: var(--text-on-accent) !default;

// Botões secundários consomem os Neutros (Fundo Degrau 3, Texto Degrau 12).
$btn-secondary-bg: var(--surface-element) !default;
$btn-secondary-border: var(--border-element) !default;
$btn-secondary-text: var(--text-primary) !default;

// -----------------------------------------------------------------------------
// Componente: Menu / Navegação
// -----------------------------------------------------------------------------
// Menus e painéis criam contraste usando o Degrau 2 da escala neutra.
$nav-bg: var(--surface-panel) !default;
$nav-border: var(--border-subtle) !default; // Neutro 6

// Textos secundários (Neutro 11).
$nav-text-default: var(--text-secondary) !default;

// A seleção pode usar um Neutro mais forte (Degrau 5) ou o Accent sutil (Degrau 1).
$nav-item-active-bg: var(--surface-accent-subtle) !default;
$nav-item-active-text: var(--text-primary) !default; // Neutro 12 para contraste
```

---

### Conclusão Técnica sobre as Abordagens

Ao utilizar a declaração `$var: var(--semantic) !default;` na Camada 3, você garante que:

1. **Zero código ocioso no navegador:** O SCSS compila isso de forma nativa e entrega apenas a variável final ao adaptador (como o Bootstrap).

2. **Nenhuma quebra do Runtime:** Como o valor injetado é um `var(--...)`, a reatividade para o Modo Escuro (Dark Mode) continua sob total controle da Camada 2 (`:root` e `[data-theme="dark"]`), garantindo que o adaptador do CoreUI ou Bootstrap responda instantaneamente.

3. **Fail Fast mantido:** Não há _fallbacks_ triplos (ex: `var(--btn, var(--action, red))`). Se o token semântico não for emitido, a compilação quebra ou a interface fica sem estilo, alertando o erro imediatamente.
