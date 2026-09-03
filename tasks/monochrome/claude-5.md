## 1. A confusão é real, e a culpa é da palavra "degrau"

Existem duas numerações diferentes na conversa e eu deixei elas se misturarem. Vamos separar de vez.

**A escada (ramp)** tem doze degraus e é _uma lista de valores_. Ela não sabe o que é página, card ou botão. Ela só diz "este é o terceiro tom mais claro do neutro".

**Os níveis de superfície** são _papéis_: página, superfície, elevado, escavado. São no máximo três ou quatro nomes, e cada um **consome** um degrau da escada.

Então "degrau 3" nunca foi um nível de superfície. Ele é o degrau que a escada reserva para **fundo de elemento em repouso**: badge, chip, botão secundário neutro, hover de linha de tabela. E as bordas ficam nos degraus 6, 7 e 8, que são degraus diferentes, mais escuros. Não há colisão. O que houve foi eu usar a mesma palavra para as duas escalas.

Fixe assim: **níveis de superfície são poucos e têm nome. Degraus são doze e têm número.** Nunca numere superfície.## 2. Quantos níveis de superfície, e quanto dá para escavar

**Escavação é quase sempre um nível só, e é local.** Um input dentro de um card. Um well dentro de uma página. Não existe "escavar dentro do escavado" que seja legível: o segundo nível some, e no modo escuro ele bate no piso e vira preto sobre preto. Se você sentir necessidade de escavar duas vezes, o que você quer não é profundidade, é separação, e a resposta é espaço ou divisor.

**Superfícies no total: três, e o terceiro já é apertado.** Página, card, e um nível de exceção (escavado ou elevado, dependendo do modelo). Contando o degrau 3 dos componentes, você tem quatro planos de fundo simultâneos numa tela, e isso já é o limite do que o olho separa.

O importante é que os níveis mapeiam para degraus **diferentes conforme o modelo**:

|                                      | Modelo elevado | Modelo escavado | Modelo plano           |
| ------------------------------------ | -------------- | --------------- | ---------------------- |
| página                               | degrau 2       | degrau 1        | degrau 1               |
| card                                 | degrau 1       | degrau 2        | degrau 1 + divisor (6) |
| escavado local (input)               | degrau 2       | degrau 2        | degrau 2               |
| componente em repouso dentro do card | degrau 3       | degrau 3        | degrau 3               |

Repare no problema que isso cria no modelo elevado: um badge no degrau 3 fica com um degrau de diferença da página, que está no 2. Ele quase some. Esse é exatamente o caso que te preocupou, e a resposta é a próxima seção.

## 3. Trocar borda e fundo automaticamente por contexto

Sim, isso é resolvível, e é a parte mais valiosa de uma fundação de tokens. Existem três mecanismos, em ordem de robustez.

**Mecanismo A: escalas em alpha.** Em vez de `--app-bg-component: <cor absoluta>`, use `rgb(0 0 0 / 0.06)`. O componente se recalcula sozinho sobre qualquer fundo, sem contexto nenhum. É simples, custa um token, e é o que resolve 80% dos casos. O preço: você perde a auditoria em compile time, porque o valor final depende do que estiver embaixo, e sobre fundos cromáticos ou muito escuros fica sujo. **É exatamente por isso que o Radix Colors publica uma escala alpha completa ao lado de cada escala sólida.** É a resposta oficial deles para esse problema.

**Mecanismo B: contexto de superfície explícito.** Um atributo que redeclara um punhado de variáveis para a subárvore:

```scss
[data-surface='sunken'] {
  --app-bg-component: #{rung(4)}; // sobe um degrau
  --app-border-color: #{rung(7)};
  --app-bg-input: #{rung(1)}; // inverte: input claro dentro de área escura
}
```

Auditável, funciona em qualquer fundo, e é o que a sua arquitetura de subtemas já suporta. O preço são mais tokens e a obrigação de manter as combinações válidas. Em Sass você gera esses blocos num loop, um por nível de superfície, e o custo de manutenção some.

**Mecanismo C: um deslocamento de origem.** Declare `--app-surface-rung: 1` no contexto e derive os outros com `color-mix` ou com uma função Sass a partir dele. É elegante mas CSS puro não indexa listas, então na prática você acaba escrevendo os mesmos blocos do mecanismo B.

**O que eu faria:** alpha para o que é decorativo (divisor, sombra, fundo de hover) e contexto explícito para o que tem requisito de contraste (borda interativa, texto, foco, accent). Assim o build audita o que precisa e o resto se adapta de graça.

Sobre a sua ideia de "nesse contexto tem borda e ela não é transparente": funciona bem e é o padrão. `--app-border-color: transparent` como default, e o contexto que precisa dela declara um valor. O componente sempre escreve `border: 1px solid var(--app-border-color)`, então o layout nunca muda, só a visibilidade. Isso evita o pulo de 1px que acontece quando você adiciona borda condicionalmente.

**Como as três bibliotecas fazem:**

**Radix.** Escalas alpha, mais aninhamento de tema. O componente `Theme` do Radix Themes pode ser aninhado, e cada aninhamento redeclara o conjunto de variáveis para a subárvore. É o mecanismo B implementado como componente. É a solução mais completa das três.

**shadcn/ui.** Não resolve. Ele expõe um conjunto plano de variáveis (`--background`, `--card`, `--muted`, `--border`) e um único valor de borda para o app inteiro. A troca de tema é uma classe `.dark` que substitui todas de uma vez, o que não é a mesma coisa que contexto de superfície. Se você quiser que um card dentro de um painel escavado se comporte diferente, você escreve isso à mão. É uma limitação real, e é uma das razões pelas quais projetos shadcn grandes acabam com valores literais espalhados.

**Bootstrap 5.3.** Aqui tem uma saída que quase ninguém usa: `data-bs-theme` **não está limitado a light e dark**. Você pode declarar `[data-bs-theme="sunken"]` com o seu próprio conjunto de `--bs-*`, e ele reescopa tudo para a subárvore. Ou seja, o mecanismo B existe no Bootstrap, só está documentado como "modo de cor". Você não precisa de classe por componente, precisa de um atributo no contêiner. Isso resolve a limitação que você suspeitou. O que continua incômodo é que os componentes Bootstrap têm borda declarada por padrão, então "remover borda" exige que você zere a variável em vez de simplesmente não adicioná-la. É o inverso do modelo que eu recomendei acima, e vale saber disso ao escrever o adapter.

## 4. Quando o secundário é contornado em vez de preenchido

A decisão tem três gatilhos, e qualquer um deles já justifica:

**O secundário precisa aparecer sobre fundos variados.** Sobre uma foto, sobre um card no degrau 2, sobre uma área escavada, o preenchimento neutro no degrau 3 empata com o fundo em pelo menos um desses casos. A borda no degrau 7 sobrevive a todos. Se o seu produto tem hero com imagem, cards com foto, ou superfícies múltiplas, contornado é mais portável.

**O produto usa o modelo escavado.** Nesse modelo o degrau 2 e o 3 já estão ocupados por contêineres, e um botão preenchido no 3 é lido como "mais uma caixinha" em vez de controle. A borda diferencia por mecanismo, não por tom.

**O arquétipo é leve.** Editorial e Tech Minimalist ganham com contorno, porque preenchimentos neutros adicionam massa visual e esses arquétipos vendem leveza. Enterprise e Utilitarian ganham com preenchido, porque em densidade alta a borda vira ruído: vinte botões contornados numa toolbar produzem uma grade de retângulos.

O gatilho contrário, para preenchido: **quando o secundário aparece muitas vezes na mesma tela**, ou quando o produto é denso. E há um caso em que preenchido é obrigatório: se você usa contornado para o secundário _e_ precisa de um terceiro nível, o terciário fantasma fica perto demais do contornado. Aí o conjunto preenchido/fantasma discrimina melhor.

Uma coisa a não fazer: usar os dois na mesma tela como se fossem hierarquias distintas. Preenchido neutro e contornado têm o mesmo peso; usar os dois cria uma hierarquia falsa que o usuário não consegue ler.

## 5. Os alvos de contraste

Os números contra o degrau 1 estão na tabela acima. Mas o teste que realmente pega bug é o **cruzado**, porque o pior caso quase nunca é contra o degrau 1:

| Par                   | Alvo      | Por quê                                                                               |
| --------------------- | --------- | ------------------------------------------------------------------------------------- |
| 11 vs 1, 2 **e 3**    | ≥ 4.5:1   | texto secundário precisa passar também sobre o fundo de componente, que é o pior caso |
| 12 vs 1, 2 e 3        | ≥ 7:1     | títulos, com folga                                                                    |
| 7 vs 1 **e vs 3**     | ≥ 1.8:1   | a borda do input precisa aparecer sobre a página e dentro do card                     |
| 8 vs 1 e vs 2         | ≥ 3:1     | obrigatório, WCAG 1.4.11 (foco)                                                       |
| 9 vs 1 e vs 2         | ≥ 3:1     | o botão sólido é um componente de UI                                                  |
| on-accent vs 9        | ≥ 4.5:1   | o texto branco sobre o accent                                                         |
| accent 11 vs accent 3 | ≥ 4.5:1   | o lavado com tinta accent, o par mais esquecido                                       |
| accent 11 vs neutro 1 | ≥ 4.5:1   | link em texto corrido                                                                 |
| 6 vs 1                | 1.3–2.0:1 | divisor. **Acima de 2.5 a tela fica listrada**                                        |

Dois avisos sobre o método.

**A razão de contraste da WCAG não serve para a parte de baixo da escada.** A fórmula é logarítmica e comprime tudo perto de 1.0; a diferença entre 1.06 e 1.12 é enorme na percepção e quase nada no número. Para superfícies e divisores, meça em **OKLCH, por diferença de lightness**, que é linear na percepção:

| Par                          | ΔL em OKLCH |
| ---------------------------- | ----------- |
| superfícies adjacentes (1↔2) | 0.02 a 0.04 |
| fundo de componente (1↔3)    | 0.05 a 0.07 |
| divisor (1↔6)                | 0.10 a 0.14 |
| borda interativa (1↔7)       | 0.18 a 0.24 |

Use ΔL para os degraus 1 a 7 e razão de contraste para 8 a 12. É a divisão prática, e é o que evita tanto escadas com degraus colados quanto divisores agressivos.

**Verifique nos dois temas com os mesmos alvos, não com os mesmos valores.** Um ΔL de 0.03 no claro não rende a mesma separação percebida no escuro, porque a sensibilidade do olho a diferenças de luminância cai nas faixas escuras. Na prática, no escuro você precisa de ΔL um pouco maior nos degraus baixos, tipicamente 1.3x a 1.5x. Se o seu `derive.dark()` copiar os deltas do claro, o escuro sai chapado, e esse é um bug que passa em todos os checadores automáticos porque nenhum deles mede separação entre superfícies.
