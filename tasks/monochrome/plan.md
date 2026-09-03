Reli com o `claude.md` no centro. Ele corrige um erro **meu**, e é a raiz dos botões ruins.

## O erro: `accentFill` não devia existir

> **`action` é preenchido, `selected` é lavado. Preenchimento é convite, tom lavado é estado.**

Eu criei `accentFill: saturated | washed` como se fossem dois jeitos de pintar a ação primária. **Não são.** São dois **papéis diferentes**. A ação primária é sempre sólida — é isso que a torna um convite. O lavado pertence ao `selected`, que é outra coisa.

Ao aplicar `washed` no botão primário eu **colapsei dois papéis** — exatamente a colisão que o `check-roles()` procura. E em monocromática a saída não é trocar de matiz, porque não há outro: é trocar de **tratamento**. Foi o que eu quebrei.

A origem do erro é rastreável: o texto do Gemini enquadrou como _"acento de alto contraste (Spotify) vs baixo contraste (Gemini)"_, dois estilos de um botão. O `claude.md` desfaz: são dois papéis.

E some com a sua pergunta original — _por que o botão ficou saturado?_ A resposta certa é **ele deveria estar saturado o tempo todo**, e o defeito era eu ter escrito `washed` no documento.

## Quatro medições contra as afirmações do texto

| afirmação                                                | nosso estado                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------------ |
| "sombra não funciona no escuro; elevação vira lightness" | **já fazemos** — o `derive.dark()` diz isso no cabeçalho           |
| "no escuro o lavado não pode ser alpha sobre o fundo"    | **já fazemos** — `pen(50)` é degrau da rampa, não alpha            |
| "croma útil do neutro: 2% a 8%"                          | **estamos abaixo**: página 0.6%, `neutral-subtle` 1.3%, tinta 1.6% |
| "lavado sozinho nunca é sinal de interatividade"         | **violado**: o botão media 1.01:1 contra a página, sem borda       |

A terceira é achado novo e você decide: nosso sépia é mais fraco do que a faixa que o texto chama de útil. Você disse que gostou das cores, então registro como medição e não mexo.

## Onde o texto contradiz o outro anexo

O `problema do contraste.md` diz que a borda carrega **3:1**. O `claude.md` dá números mais finos e uma justificativa melhor:

|                             | alvo      |
| --------------------------- | --------- |
| divisor decorativo          | 1.2–1.5:1 |
| borda interativa em repouso | 1.6–2:1   |
| foco e seleção              | 3:1+      |

E a razão: **são dois requisitos legais diferentes**, não estética. Levar todo divisor a 3:1 produz interface listrada. Isso justifica `border-divider` e `border-interactive` melhor do que eu justifiquei.

A leitura que reconcilia as duas: **1.4.11 pede 3:1 para o que identifica o controle.** Se o preenchimento é a única pista, ele precisa de 3:1. Se a borda é, ela precisa. O nosso botão não tinha nenhuma das duas.

---

# Plano revisado

## Fase R — aposentar `accentFill` e restaurar a escada de proeminência

Não é consertar o piso; é remover a decisão. A ação primária volta a sólido. O lavado vira o que sempre foi: **estado**.

Os quatro tratamentos, com o trabalho de cada:

| tratamento              | significa    | onde                                       |
| ----------------------- | ------------ | ------------------------------------------ |
| sólido, tinta invertida | **convite**  | CTA primário — no máximo um por viewport   |
| lavado, tinta accent    | **estado**   | aba ativa, chip marcado, item de nav ativo |
| lavado, tinta neutra    | **ambiente** | callout, bloco de nota, linha destacada    |
| contorno / fantasma     | **irmãos**   | quando há muitos, ou terciário             |

E o critério que separa os dois lavados, que eu não tinha: **o comprimento do texto.** Uma a três palavras → tinta accent. Uma frase ou mais → tinta neutra, porque ler um parágrafo em cor cromática cansa.

## Fase S — os alvos de contraste por papel, e a regra de um mecanismo

Os três alvos acima viram derivação e verificador. Mais a regra central: **uma fronteira, um mecanismo** — com a exceção legítima nomeada (interativo leva tom _e_ borda, porque tom carrega identidade e borda carrega estado).

E a escada de recurso: **espaço primeiro, tom quando o espaço falha, linha quando o tom não aparece, sombra só para o que flutua** — com as cinco situações em que o espaço falha, que são reconhecíveis e não subjetivas.

## Fase T — `DECISIONS.md`, gerado _(sua pergunta 1, decidida)_

Na raiz, ao lado de `FORMS.md`, gerado do template mais o `derivations.md`. Toda chave: valores aceitos, perguntada ou derivada, de que resposta vem, o que decide, e qual verificador a cobra.

## Fase U — relatório de token sem consumidor _(sua pergunta 2)_

Não falha o build — **relata**. Todo token da camada 2 emitido e nunca lido por adapter, produto ou derivação, para você olhar e decidir se é lacuna ou legítimo. O degrau 3 é o mais esquecido de todos, segundo o texto, e é exatamente o tipo de coisa que esse relatório encontra.

## Fase V — teste reverso, com o teste de calibração junto

O seu ponto, mais o que o texto propõe: **montar a mesma tela três vezes, uma por escola.** Se a monocromática ficar visivelmente pior, o problema não é falta de cor — é que espaço e tipografia ainda não estão fazendo o trabalho delas.

## Fase W — o conhecimento, arquivado

`skills/design-language/references/monochrome.md`. A tabela de 12 cargos, os quatro tratamentos, os alvos de contraste, os estados por degrau, as armadilhas de Bootstrap/daisyUI/Tailwind, e os dois custos que ninguém escreve: **a escola é mais barata de manter e mais cara de projetar**, e **tratamento substitui matiz como diferenciador**.

Com a contradição entre os dois anexos registrada, não escondida.

---

A fase R é maior do que "consertar o contraste" — é remover uma chave que eu inventei errado. **Começo por ela?**
