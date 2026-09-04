## Você está certo, mas a origem não é a escola

O problema não é que `sunken` e `subtle` venham de outra escola de cor. É que eles vêm de **dois sistemas de nomeação diferentes**, e você tem os dois na mesma camada.

Existem quatro eixos possíveis para nomear um token, e cada um responde uma pergunta diferente:

| Eixo             | Pergunta            | Exemplos                        |
| ---------------- | ------------------- | ------------------------------- |
| **Posição**      | qual degrau?        | `1`, `7`, `11`                  |
| **Relação**      | onde no espaço?     | `page`, `raised`, `sunken`      |
| **Proeminência** | quão alto ele fala? | `subtle`, `muted`, `emphasis`   |
| **Papel**        | o que ele faz?      | `action`, `selected`, `divider` |

`sunken` é relação. `subtle` é proeminência. Não são vizinhos na mesma escala, então nenhum dos dois "é o degrau 2", e a pergunta não tem resposta. Foi por isso que travou.

A regra a adotar: **um eixo por família de token, e nunca dois vocabulários na mesma família.**

O que a escola monocromática realmente exige aqui é mais sutil e vale nomear: como tudo deriva de uma escada por deslocamento, **os nomes de superfície precisam ser relativos, não absolutos.** Um `sunken` não tem degrau fixo; ele é "um degrau mais fundo que a superfície onde estou". Você tentou dar um número absoluto a um nome relativo, e é aí que a arquitetura reclamou.

## Proposta de vocabulário

**Superfícies (eixo relação, três nomes, todos relativos ao contexto):**

```
--app-bg-base       o plano onde a página vive
--app-bg-surface    o plano de um objeto sobre o base
--app-bg-inset      um recipiente escavado no plano atual
```

Aposente `raised` e `sunken`. `raised` é a mesma coisa que `surface` num modelo elevado, e `sunken` vira `inset`, que é mais honesto porque descreve um recorte e não uma profundidade absoluta.

**Fundos de componente (eixo papel, não relação):**

```
--app-bg-component          repouso
--app-bg-component-hover
--app-bg-component-active   pressionado
--app-bg-selected           estado selecionado
```

Este é o ponto que provavelmente mais te ajuda: **fundo de chip nunca deveria ter nome de superfície.** Um chip não é um plano, é um objeto. Misturar as duas famílias é o que fez o chip resolver para o mesmo valor do card.

**Texto (eixo proeminência):** `fg-default`, `fg-muted`, `fg-on-*`. Não adicione `fg-secondary` ao lado de `fg-muted`; são duas palavras para a mesma coisa.

**Bordas (eixo papel):** `border-divider`, `border-interactive`, `border-focus`. Nada de `border-subtle` ou `border-strong`, porque isso reintroduz proeminência numa família que já é de papel.

**Proeminência sobrevive em um lugar só:** a família de status, onde `bg-danger` e `bg-danger-subtle` já é convenção consolidada e o par tem significado claro.

E o "neutro de ativo" que você mencionou: ele não ganha nome próprio. Ele é `--app-bg-selected`, que na sua escola resolve para um valor neutro em conjuntos fechados e para accent lavado em conjuntos abertos. O nome descreve o papel; o valor é decisão de tema.

## As abas

Melhorou de verdade: a borda agora é neutra, então a colisão com o anel de foco acabou. Esse era o problema mais grave e está resolvido.

Restam quatro coisas, e uma delas decide se o padrão inteiro é apropriado.

**A pergunta que decide:** o que existe logo abaixo dessas abas? Aba com fundo branco é a metáfora de pasta, e ela só funciona se a aba **se conecta a um painel branco embaixo**. Se o conteúdo abaixo está direto na página creme, a aba branca fica órfã, flutuando sem destino, e é exatamente essa a estranheza que você está sentindo. Nesse caso o padrão certo é o sublinhado.

**Se existe painel branco embaixo,** faltam dois ajustes para a pasta fechar: a linha de base não pode passar por baixo da aba ativa (é a abertura que conecta aba e painel), e os cantos inferiores da aba ativa devem ser retos, só os de cima arredondados.

**Os rótulos inativos continuam no degrau 12.** Deveriam estar no 11, para a aba ativa dominar.

**Mecanismos demais.** A aba ativa tem fundo branco, borda, texto accent e peso. Num tab de pasta a borda é estrutural, então ela é justificada, mas aí o texto accent vira o quarto sinal. Como é um conjunto fechado e contíguo, ele não precisa de accent nenhum: fundo branco mais peso já comunica.Repare que na versão de pasta o accent sumiu por completo e a aba ativa continua inequívoca. Isso é orçamento de accent devolvido para onde importa, que no seu produto provavelmente é o botão de guardar receita.

## O que isso vira na ferramenta

A descoberta de nomenclatura merece virar regra explícita, porque ela é generalizável e nenhum sistema comercial documenta isso bem:

- **Declare o eixo de cada família de token** e recuse nomes de outro eixo dentro dela. É um checador de string, barato de escrever: se uma família declarada como "relação" contém a palavra `subtle`, erro.
- **Nomes de superfície são relativos e nunca recebem número.** Se alguém perguntar "qual degrau é o `inset`", a pergunta está mal formada, e a resposta é "um a mais que o contexto atual".
- **Objeto não usa nome de plano.** Chip, badge e botão têm `bg-component`, não `bg-surface`.
- **Degraus numerados nunca escapam da camada 1.** Você já tem essa regra; o que faltava era a consequência dela, que é obrigar os nomes da camada 2 a serem relativos.

E vale registrar o padrão de diagnóstico, porque ele se repetiu três vezes agora: **quando um agente ou uma pessoa não consegue responder "qual degrau é este token", o problema quase nunca é o valor. É que o nome pertence a um eixo que não tem degraus.**
