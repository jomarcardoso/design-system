<!-- tasks/melhorar entrevista/PLANO-2-alargamento.md -->

# Plano 2 — alargamento, antes da entrevista

Escrito em 2026-08-30, depois de reler `Melhorar entrevista.md` e reavaliar o
que as fases 1–4 entregaram. Substitui a fase 5 do
[`PLANO.md`](PLANO.md), que passa a ser a **última** coisa a acontecer.

> As `tasks/` serão apagadas. Nada que importe pode ficar só aqui — cada fase
> leva seu embasamento para `skills/`, `src/` ou `AGENTS.md`.

---

## O que as fases 1–4 não resolveram

Quatro fases melhoraram a **tinta** com rigor e a **forma** só no papel. A
medida objetiva disso está no próprio relatório do ledger:

```
button  4 allowed  raw 4 (100%)
card    2 allowed  raw 2 (100%)
```

`raw` significa "emita as classes da biblioteca". Enquanto tudo estiver em
`raw`, a forma é da lib e só a cor é do produto.

**O que faz uma interface parecer autoral, em ordem de peso:** composição e
proporção, tipografia, forma dos componentes, e só então cor. Cobrimos cor
exaustivamente, tipografia pela metade, forma apenas como referência que nada
obriga a usar, e composição mal começou.

### A correção sobre "promoção"

Uma versão anterior deste raciocínio propunha **forçar** promoção na primeira
versão. Está errado, e a formulação do cliente é melhor: o ledger é *o presente
adequado mais um futuro traçado*. Um padrão pode ser `raw` hoje com uma
trajetória registrada, e é isso que impede uma implementação futura de acontecer
sem plano.

São **dois eixos distintos**, e confundi-los foi o erro:

| eixo | o que mede | como melhora |
|---|---|---|
| vocabulário | quantas variantes são permitidas | a lista **encurta** |
| forma | quanto de cada padrão é da lib | os estados **sobem**: raw → styled → own → wrapped |

O que falta é um campo de **trajetória** por padrão: o estado de hoje, o estado
pretendido, e o gatilho que promove. Sem isso, `raw` parece uma escolha
permanente em vez de um ponto de partida.

---

## Fase A — alargar o catálogo de formas

Hoje são 18 famílias e elas cobrem os *controles*. Falta o que mais carrega
identidade. Acrescentar, com as mesmas colunas (o que é / cabe quando / evitar
quando) e a mesma regra de que nada é banido:

**As três que mais separam produto de template**

- **Cabeçalho de página** — eyebrow, título, subtítulo, régua, ações. É a
  primeira coisa que se vê e a mais copiada da lib.
- **Abertura / hero** — existe? é imagem, tipografia ou nada?
- **Tabela** — hoje tem 5 linhas e o Bootstrap sozinho permite muito mais:
  bordas, zebra, densidade, coluna fixa, ações por linha, ordenação, seleção,
  totalizador, estado vazio dentro da tabela.

**Estados e vazios**

- **Estado vazio** — ilustração, ícone, só texto, ou uma ação.
- **Carregamento** — skeleton, spinner, barra de progresso, ou nada. **Decisão
  de postura**: skeleton é `quiet`, spinner é neutro, barra é `exposed`.
- **Erro de página** e **erro de campo**.
- **Estado de sucesso** — toast, inline, ou silêncio.

**Formulário, que é meia aplicação**

- **Posição do rótulo** — acima, ao lado, flutuante, embutido.
- **Agrupamento** — fieldset, card, seção com régua, acordeão.
- **Ajuda e erro** — abaixo, ao lado, tooltip, inline permanente.
- **Ações do formulário** — rodapé fixo, no fluxo, barra flutuante.

**Navegação e orientação**

- **Paginação** — numérica, anterior/próximo, "carregar mais", scroll infinito.
  Cada uma é uma decisão de `disclosure`.
- **Breadcrumb** — barra, integrado ao cabeçalho, truncado, ou ausente.
- **Stepper / passo a passo** — numerado, barra, pontos, vertical.
- **Timeline** — conector, marcadores, densidade.

**Identidade e dado**

- **Avatar e identidade** — foto, iniciais, forma, presença.
- **Gráfico** — o accent como única cor, escala neutra, ou paleta categórica.
  Em `monochrome` isto é uma tensão real e merece texto próprio.
- **Carrossel** — setas, pontos, progresso, ou substituído por scroll.
- **Rodapé** — completo, mínimo, ou ausente.

**Escolha de apresentação para o mesmo dado**

- **Grade vs. lista vs. tabela** — a mesma coleção em três formas, e o que
  decide qual.

**Sobreposição**

- **Tooltip e popover** — já esboçados, precisam das condições.
- **Sheet / bottom sheet** vs. modal vs. painel lateral.

## Fase B — as marcas registradas das outras escolas

`derivations.md` e `component-forms.md` são fortemente monocromáticos.
`functional` e `brand` aparecem como colunas, não como sistemas com assinatura
própria. Cada escola precisa de um bloco dizendo **o que a torna reconhecível**,
como a régua de 12 degraus faz pela accent-driven:

- `functional` — a cor por papel, os alertas como cidadãos de primeira classe,
  a densidade operacional, o que Atlassian e Polaris fazem que os outros não.
- `brand` — o container, a hierarquia por elevação tonal, o que Material 3 faz
  com `surface-container` e por que a marca aparece em lugares que nas outras
  escolas seriam neutros.

## Fase C — escala tipográfica e ritmo como decisões

A razão da escala (1.2 · 1.25 · 1.333) muda mais a cara de uma página que
qualquer cor, e hoje ninguém escolhe. Idem o ritmo vertical, que é relação e não
proporção. Derivar do arquétipo e da densidade, apresentar, permitir discordar.

## Fase D — o documento de consulta

No fim das entrevistas, **um documento legível dizendo o que as respostas
produziram**: o que mudou visualmente, a lista de componentes e formas
inferidas, e as regras que passaram a valer.

Decisão: **arquivo próprio, regenerável**, e não uma seção do
`DESIGN_LANGUAGE.md`. São ~100 linhas de consequência e inchariam o documento
que precisa continuar legível de ponta a ponta. O `DESIGN_LANGUAGE.md` guarda um
ponteiro.

Não é o `FOUNDATIONS.md` (valores compilados, gerado do CSS) nem o
`DESIGN_LANGUAGE.md` (as decisões e o porquê). É a **camada do meio**: o que foi
derivado das decisões, e de qual resposta cada coisa veio.

## Fase E — a biblioteca de ícones

**O icon set segue o `DESIGN_LANGUAGE.md`, não a biblioteca de componentes.**
Mesma regra que já vale para as fontes: a lib decide o componente, o documento
decide a forma.

O `@coreui/icons` é majoritariamente preenchido e de traço grosso — casaria com
a biblioteca e brigaria com um documento que pediu `outline` a `1.25px`. Instalar
o que atende ao documento, usar na página do exemplo, e registrar a regra na
skill.

## Fase F — trajetória no ledger

O campo que falta: por padrão, o estado de hoje, o estado pretendido e o
gatilho. Um `raw` com trajetória é um ponto de partida; um `raw` sem trajetória
parece permanente.

## Fase G — a visão da cadeia

Nada hoje renderiza *resposta → derivação → token → padrão → markup* de ponta a
ponta. Um agente novo não consegue auditar a continuidade, que era o pedido
original: *"que um agente veja a cadeia toda, entenda que é contínua e
identifique desvios"*.

## Fase I — os quatro assuntos que faltavam

Levantados pelo usuário depois da fase G, e auditados no código antes de
responder: interações, espaçamento e grid, divisão de conteúdo, imagens.

O resultado da auditoria, honesto:

| assunto | estado antes |
|---|---|
| bordas, sombras, superfícies, direção da superfície, raio | **coberto** — pergunta, token e derivação |
| gaps, ritmo vertical, medida do container | **coberto** |
| foco, hover, padding de controle | **token existe, decisão não** |
| movimento | **token existe, zero derivação** — o próprio DERIVED.md do exemplo listava como não decidido |
| densidade responsiva, grid, colunas, calhas, breakpoints | **nada** |
| imagens | **nada** — nem token, nem regra, nem derivação |

O buraco mais grave era imagem. Num app de receitas a foto é o conteúdo, e o
sistema não tinha opinião nenhuma sobre ela.

**Em quatro blocos, nesta ordem:**

1. **Imagens.** Pergunta 20 (papel da imagem) e 20a (proporção) — o segundo
   fato sobre o produto, ao lado do frame. Tokens novos:
   `radius-image`, `ratio-media`, `ratio-thumb`. Derivação §K: borda, raio,
   sombra, imagem decorativa por arquétipo, e o que aparece antes de carregar.
2. **Grid.** Derivação §L a partir de `frame`, `density` e `platform`.
   Tokens `gap-grid` e `size-measure`. Os breakpoints continuam da
   biblioteca, no `<library>-entry.scss`, porque são compilados.
3. **Movimento.** Derivação §M a partir de `posture` e `disclosure`. **Sem
   pergunta nova** — um cliente perguntado sobre a velocidade de um dropdown
   responde, e a resposta não é sobre o produto dele.
4. **Foco e hover como política.** Derivação §N, mais a densidade responsiva.

O achado da §N vale registrar: a forma do foco quase não varia com a postura, e
isso É a conclusão — **anel de foco não é lugar de ter personalidade**. A única
coisa que vale derivar é a cor.

## Fase H — a entrevista

**Por último.** Reexecutar com tudo acima disponível, regenerar as camadas, e
comparar. É o teste, e testar antes de alargar mede a ferramenta antiga.

---

## O que NÃO muda

- Nada é banido; as condições descrevem encaixe, não permissão.
- Recomendação vem com procedência.
- Padrão é da escola e do arquétipo, nunca da biblioteca.
- Pendência é aceitável, omissão não.
- Nunca suavizar em silêncio.
