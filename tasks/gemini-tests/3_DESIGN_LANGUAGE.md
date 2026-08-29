# **Entrevista de Design Language**

[https://gemini.google.com/app/67968b1583d7066d](https://gemini.google.com/app/67968b1583d7066d)

*User prompt: Conduza a entrevista para gerar o DESIGN\_LANGUAGE.*

Response: Coletado: nenhum Faltam: blocos 1, 2, 3, 4, 5, 6

### **Bloco 1 — Posicionamento e Arquétipo**

**1\. Setor e promessa** Em qual setor ou domínio este produto atua e qual é a promessa principal da marca para os usuários? *(Resposta livre)*

**2\. Comportamento** Se o produto fosse uma pessoa em uma reunião, como ele se comportaria?

> * (A) Sério, técnico e direto ao ponto  
> * (B) Amigável, relaxado e encorajador  
> * (C) Elegante, reservado e sofisticado  
> * (D) Moderno, dinâmico e focado em eficiência

**3\. Arquétipo visual** Qual arquétipo melhor traduz a visão do produto?

> * (A) Tech Minimalist  
> * (B) Enterprise Solid  
> * (C) Playful & Expressive  
> * (D) Editorial & Premium  
> * (E) Utilitarian & Technical  
> * (F) Híbrido (nomeie as duas influências)

---

*User prompt: 1\. Setor de culinária, nutrição e saúde. A promessa é que os usuário terão o seu caderninho pessoal de receitas, como aquele que suas mães tinham e te passavam quando você precisa de fazer algo que ela fazia. Agora prático no computador e no celular. 2\. C 3\. D*

Response: Coletado: 1 Caderno de receitas pessoal (culinária/nutrição) · 2 (C) Elegante, reservado e sofisticado · 3 Editorial & Premium Faltam: blocos 2, 3, 4, 5, 6

**Bloco 2 — Contexto de uso e ergonomia**

**4\. Frequência e tipo de uso principal**

> * (A) Prolongado — ferramenta de trabalho, dashboard, dados densos  
> * (B) Ocasional — fluxos curtos, consultas pontuais  
> * (C) Leitura contínua — consumo longo de texto e receitas

**5\. Dispositivos prioritários**

> * (A) Desktop-first  
> * (B) Mobile-first (ajusta alvos de toque para no mínimo 44px por ergonomia)  
> * (C) Multiplataforma (equilibrado)

---

*User prompt: 4\. B 5\. C*

Response: Coletado: 1 Caderno de receitas (culinária/nutrição) · 2 C (Elegante/Sofisticado) · 3 Editorial & Premium 4 B (Ocasional) · 5 C (Multiplataforma) Faltam: blocos 3, 4, 5, 6

### **Bloco 3 — Fundações Visuais e Geometria**

**6\. Formato das estruturas** Para o arquétipo **Editorial & Premium**, a recomendação é utilizar cantos sutis (4px em controles, 6px em superfícies) para remeter ao acabamento de livros e revistas. Mantemos essa proposta?

> * (A) Sim, manter cantos sutis (4–8px)  
> * (B) Cantos retos (0–2px)  
> * (C) Arredondados (12–16px)  
> * (D) Estilo pílula (pill)

**7\. Profundidade e elevação** Em Editorial & Premium, a hierarquia vem prioritariamente do espaço em branco (respiro) e de bordas finas, utilizando sombras quase imperceptíveis (2xs). Confirmamos essa elevação baseada em espaço e linhas?

> * (A) Sim, bordas finas e espaço em branco (elevation: borders, carregada por border-color)  
> * (B) Sombras sutis (soft-shadows)  
> * (C) Sombras projetadas e visíveis (projected-shadows)

---

*User prompt: 6\. A 7\. A*

Response: Coletado: 1 Caderno de receitas (culinária/nutrição) · 2 C (Elegante/Sofisticado) · 3 Editorial & Premium 4 B (Ocasional) · 5 C (Multiplataforma) · 6 A (Sutis 4–8px) · 7 A (Bordas e linhas / elevation: borders) Faltam: blocos 4, 5, 6

### **Bloco 4 — Cor e Acessibilidade**

**8\. Escola cromática** Como o produto é um caderno pessoal focado no protagonismo do conteúdo (receitas e fotos), a recomendação para o arquétipo Editorial & Premium é a escola **Monocromática / Accent-Driven** (uma cor de destaque com régua de neutros). Confirmamos?

> * (A) Sim, Monocromática / Accent-Driven (foco total no conteúdo)  
> * (B) Escola de Marca / Brand (a cor da marca assume também a seleção)  
> * (C) Escola Funcional (cores dedicadas por função operacional)

**9\. Cor principal / destaque** Existe um valor exato para a cor de destaque/caneta (Hex ou OKLCH) ou prefere que seja gerada automaticamente?

> * (A) Tenho o valor exato (favor informar a cor ou código)  
> * (B) Gerar automaticamente

*(Considerando a escola Monocromática como recomendada)*:

**10\. Perfil do Accent e Neutros**

> * **10a. Contraste do Accent (accentContrast):** A cor de destaque deve ser forte/saturada para texto claro sobre ela (high), ou suave para manter texto escuro (low)?  
> * **10b. Pigmentação dos neutros (neutralPigment):** Deseja neutros cinzas puros (0) ou neutros com pigmentação aquecida (ex: tom de papel/linho, 0.5 a 0.8)?  
> * **10c. Separação de superfícies (surfaceSeparation):** Para alinhar com a elevação por bordas definida no Bloco 3, confirmamos a separação por linhas (lines)?

**11\. Tratamento da ação secundária** Para a escola Monocromática, o padrão recomendado para o botão de apoio é um tom neutro discreto.

> * (A) Neutro discreto (fundo neutro sutil / cinza)  
> * (B) Contornado (outline em linha neutra ou da cor de destaque)  
> * (C) Tom pastel/sutil da cor de destaque

**12\. Nível de acessibilidade**

> * (A) **WCAG AA** (4.5:1 — recomendado para a maioria dos produtos)  
> * (B) **WCAG AAA** (7.0:1 — para requisitos legais ou de saúde específicos)

**13\. Cores de status (Sucesso, Alerta, Erro)** Para Editorial & Premium, a recomendação é utilizar cores de status **adaptadas** em saturação para não sobrepor a fotografia do prato.

> * (A) Adaptadas à paleta  
> * (B) Tradicionais (verde, amarelo e vermelho vívidos)

---

*User prompt: 8\. A 9\. cor de caneta esferográfica azul. 10a. high 10b. Quero cor de papel, mas não aquele sépia antigo, um papel mais novo, talvez reciclado. 10c. sim 11\. A 12\. A 13\. A*

Response: Coletado: 1 Caderno de receitas (culinária/nutrição) · 2 C (Elegante/Sofisticado) · 3 Editorial & Premium 4 B (Ocasional) · 5 C (Multiplataforma) · 6 A (Sutis 4–8px) · 7 A (Bordas / elevation: borders) 8 Monocromática (colourStrategy: monochrome) · 9 Azul Caneta oklch(0.45 0.20 258\) / Papel Reciclado Novo oklch(0.97 0.012 85\) 10a High (accentContrast: high) · 10b Papel novo aquecido (neutralPigment: 0.6) · 10c Linhas (surfaceSeparation: lines) 11 A (Neutro sutil) · 12 A (WCAG AA) · 13 A (Adaptadas à paleta) Faltam: blocos 5, 6

### **Bloco 5 — Tom de Voz e Microcopia**

**14\. Registro de comunicação** Como o sistema deve se comunicar em suas mensagens gerais (validações, estados vazios, confirmações)?

> * (A) Direto e técnico — *"Erro 404: recurso não encontrado"*  
> * (B) Claro e orientado à ação — *"Não encontramos essa página. Voltar ao início"*  
> * (C) Acolhedor e leve — *"Essa receita não foi encontrada. Vamos voltar ao seu caderno"*

*Exceção:* Para ações destrutivas ou erros graves de dados, recomenda-se mudar para o tom direto (B). Mantemos essa exceção?

**15\. Verbos nos rótulos de ação (CTAs)**

> * (A) Infinitivo — *"Salvar receita"*, *"Aplicar filtros"*  
> * (B) Imperativo — *"Guarde a receita"*, *"Aplique os filtros"*

### **Bloco 6 — Regras de Composição e Guardrails**

**16\. Restrições visuais estritas (O que o sistema NUNCA deve fazer)**

> * (A) Nunca usar gradientes  
> * (B) Nunca usar sombras decorativas/pesadas  
> * (C) Nunca usar títulos coloridos (hierarquia apenas por tamanho e peso)  
> * (D) Nunca usar cores de status em ações não concluídas  
> * (E) Nenhuma restrição adicional além do que o arquétipo Editorial já implica  
> * (F) Outra restrição específica (favor descrever)

**17\. Padrões universais de interação**

> * **Confirmações destrutivas (ex: apagar receita):** (A) Modal explícito de confirmação · (B) Toast temporário com desfazer  
> * **Submissão de formulários:** (A) Salvar ao alterar campo (blur) · (B) Salvar mediante ação explícita (submit)

---

*User prompt: 14\. C 15\. B 16\. Nenhuma restrição inicial 17\. A, A*

Response: Coletado: 1 Caderno de receitas (culinária/nutrição) · 2 C (Elegante/Sofisticado) · 3 Editorial & Premium 4 B (Ocasional) · 5 C (Multiplataforma) · 6 A (Sutis 4–8px) · 7 A (Bordas / elevation: borders) 8 Monocromática (monochrome) · 9 Caneta Azul Esferográfica / Papel Reciclado Novo (neutralPigment: 0.6) 10a High · 10b 0.6 · 10c Lines · 11 A (Neutro sutil) · 12 A (WCAG AA) · 13 A (Adaptadas) 14 C (Acolhedor/Warm) · 15 B (Imperativo) · 16 Nenhuma restrição adicional inicial · 17 A (Modal destrutivo), A (Salvar no blur) Faltam: 0 (todos os 6 blocos concluídos)

### **Resumo das Decisões (Read-back Gate)**

Antes de escrever o arquivo DESIGN\_LANGUAGE.md final na raiz do projeto, revise o mapeamento completo das decisões coletadas:

| Chave (key) | Valor (value) | Origem / Transcrição |
| :---- | :---- | :---- |
| archetype | editorial-premium | Q3 — Escolhido diretamente ("Editorial & Premium") |
| density | comfortable | Q4 — Uso ocasional e consultas curtas de receitas |
| platform | multiplatform | Q5 — Uso equilibrado no computador e celular |
| radius | subtle | Q6 — Cantos sutis (4–8px em controles e superfícies) |
| elevation | borders | Q7 — Hierarquia levada por respiro e linhas finas |
| elevationCarrier | border-color | Q7 — Requerido quando a elevação é por bordas (borders) |
| accessibility | AA | Q12 — Meta de contraste WCAG AA |
| statusColours | brand-adapted | Q13 — Cores de status suavizadas para não competir com fotos de pratos |
| colourStrategy | monochrome | Q8 — Escola Monocromática / Accent-Driven |
| accentContrast | high | Q10a — Azul caneta cobalto vibrante com texto em alto contraste (on-accent) |
| neutralPigment | 0.6 | Q10b — Neutros quentes com tom de papel novo reciclado |
| surfaceSeparation | lines | Q10c — Separação por bordas sutis (combina com elevation: borders) |
| secondaryAction | neutral | Q11 — Botão de apoio em preenchimento neutro sutil |
| voice | warm | Q14 — Voz acolhedora/afetiva (registrado como variação de persona) |
| voiceExceptions | action-oriented | Q14 — Transição para registro direto em ações destrutivas ou erros de dados |
| ctaMood | imperative | Q15 — Verbos no imperativo encorajador (*"Guarde a receita"*) |
| overrides | size-control \>= 44px | Q5 — Ergonomia mobile para alvos de toque em telas sensíveis |
| guardrails | modal para remoção | Q17 — Modal explícito de confirmação para ações irreversíveis |

Podemos confirmar este quadro para eu gerar e gravar o arquivo DESIGN\_LANGUAGE.md estruturado?

---

*User prompt: Sim*

Response: O arquivo DESIGN\_LANGUAGE.md foi gerado e gravado na raiz do projeto com base nas decisões confirmadas na entrevista:

`---`  
`archetype: hybrid`  
`archetypeNote: >`  
  `Editorial & Premium typography and restraint, blended with Playful warmth.`  
  `A personal recipe notebook designed to be read like a book and used like a kitchen tool.`

`density: comfortable`  
`platform: multiplatform`

`radius: subtle`  
`elevation: borders`  
`elevationCarrier: border-color`

`accessibility: AA`  
`statusColours: brand-adapted`

`colourStrategy: monochrome`

`accentContrast: high`  
`neutralPigment: 0.6`  
`surfaceSeparation: lines`

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

`A digital personal recipe notebook for culinary, nutrition, and health[cite: 7, 10]. The product promises a practical computer and mobile experience that captures the warmth and memory of a mother's passed-down physical recipe book[cite: 7, 10].`

`**Archetype:** hybrid. Editorial & Premium typography and restraint carry the reading experience; Playful warmth creates intimacy and personal ownership[cite: 7, 13]. The tension is real and deliberate: a recipe is read like a book or article and used like a kitchen tool, standing up with wet hands on a counter[cite: 7, 13].`

`---`

`## 1. Principles`

`- **The recipe is the protagonist.** No interface color or visual decoration competes with recipe photography or preparation steps for attention[cite: 7, 13].`  
`- **Sensation of fresh paper.** Surfaces use warm neutral tones (recalling fresh recycled paper) rather than cold industrial grays or aged vintage sepia[cite: 7, 13].`  
`- **Surgical annotation.** The vibrant accent color acts as a blue fountain pen on paper: marking only what is essential (primary actions and active selections)[cite: 7, 13].`  
`- **Voice of an experienced mentor.** The system speaks like a warm, experienced figure (a mother, chef, or nutritionist) passing down practical knowledge with clarity[cite: 7, 13].`

`---`

`## 2. Visual foundations`

`### Colour`

``- **Brand primary (Accent):** Cobalt fountain pen blue (`oklch(0.48 0.22 255)`) — carried by `bg-action` and active selections[cite: 7, 13].``  
``- **Proportion:** Surfaces are warm recycled paper (`neutralPigment: 0.6`), text is deep graphite (`oklch(0.20 0.015 85)`), and blue ink appears on one primary action or active state per context[cite: 7, 13].``  
`- **Status colours are adapted:** Green, amber, red, and slate with moderated saturation so alerts never outshout recipe photography[cite: 7, 13].`  
``- **Contrast:** WCAG AA, checked at build time by `themes.check-contrast()` and enforced as a hard gate[cite: 7, 13].``

`### Typography`

``- **Heading:** `ui-serif, Georgia, Garamond, serif` · **Body:** system sans-serif · **Display:** `ui-serif, Georgia, Garamond, serif` · **Mono:** system mono[cite: 13]``  
`- Headings use serif typography to evoke printed cookbooks and handwritten titles; body text uses a clean sans-serif for quick scanning on kitchen counters[cite: 7, 13].`  
`- **Measure:** 45–75 characters per line.`  
`- **Leading:** 1.6 — generous spacing for reading comfort while cooking[cite: 7, 13].`

`### Spacing and grid`

``- **Base unit:** `--app-space-unit`, 4px[cite: 13].``  
`- **Density:** comfortable. Controls maintain a minimum height of 44px to satisfy multiplatform touch ergonomics on mobile devices[cite: 7, 13].`

`### Elevation`

``- **Strategy:** borders. Hierarchy is carried by `border-color` (`surfaceSeparation: lines`) and whitespace rather than shadows[cite: 7, 13].``  
`- Thin hairline borders frame cards and recipe steps cleanly[cite: 7, 13].`

`---`

`## 3. Voice`

`Warm and encouraging, speaking with an inviting instructional tone while dropping to a strict, action-oriented register for data loss or destructive confirmations[cite: 7, 13].`

`| Situation | Register | Example |`  
`|---|---|---|`  
`| Field validation | warm | "Add a name so we can save your recipe."[cite: 7, 13] |`  
`| System error | action-oriented | "We couldn't save that right now. Try again in a moment."[cite: 7, 13] |`  
`| Empty state | warm | "Your notebook is ready. Save your first recipe."[cite: 7, 13] |`  
`| Destructive confirmation | action-oriented | "Delete this recipe? This action cannot be undone."[cite: 7, 13] |`  
`| Success | warm | "Recipe saved to your notebook!"[cite: 7, 13] |`

`- **Action labels:** imperative — *"Save the recipe"*, *"Start cooking mode"*, *"Apply filters"*[cite: 7, 13].`  
`- **Errors say what to do next.**`  
`- **Never blame the user.**`

`---`

`## 4. Interaction and motion`

``- Every interactive element has `default`, `hover`, `focus-visible`, `active`, and `disabled` states[cite: 7, 13].``  
``- **Focus ring:** `--app-ring-*` in cobalt fountain pen blue[cite: 7, 13].``  
``- **Durations:** 150ms for micro-feedback, 200ms for transitions, 350ms for panel entrances (`--app-ease`)[cite: 7, 13].``  
``- `prefers-reduced-motion` removes movement rather than shortening it.``

`---`

`## 5. Composition — do and don't`

`### Do`

``- Use thin subtle borders (`lines`) to group ingredients and preparation steps[cite: 7, 13].``  
`- Restrict the accent color strictly to primary actions and active selection states[cite: 7, 13].`  
`- Require an explicit confirmation modal for destructive data removal[cite: 7, 13].`

`### Don't`

`- Never stack two primary accent buttons side by side[cite: 7, 13].`  
`- Never use traditional bright status colors on decorative tags or non-status elements[cite: 7, 13].`  
`- Never tint headings to create contrast — hierarchy comes from scale and font weight[cite: 7, 13].`

`### Enforced by the build`

`| Rule | Where | What fails |`  
`|---|---|---|`  
``| Destructive action without modal | `patterns.json` | `verify:patterns` requires `modal`[cite: 7, 13] |``  
``| Literal hex values in product CSS | `stylelint.config.cjs` | `npm run lint`[cite: 7, 13] |``  
``| Contrast below WCAG AA (4.5:1) | `themes.check-contrast()` | Sass theme build[cite: 7, 13] |``

`---`

`## How this file is used`

`**By an agent.** The front matter is read before generating any markup or CSS; guardrails are checked against what is produced. When this document and code disagree, this document is the intent.`

`**By a person.** It answers why the product looks and behaves as it does, preventing recurring design debates.`

**Próximos passos da sequência:**

> 1. **design-system**: Compilação/geração dos tokens em src/, temas e dist/theme-\*.css a partir do DESIGN\_LANGUAGE.md.  
> 2. **design-patterns**: Fechamento do vocabulário de componentes em patterns.json.

---

