Vamos separar isso, porque não é um erro. São quatro somados, e cada um sozinho já produziria o resultado que você viu.

## Erro 1: degraus são relativos à superfície, não absolutos

Este é o mais importante e é culpa da minha explicação anterior. Quando eu disse "elemento em repouso é o degrau 3", isso vale **para um elemento que está sobre o degrau 1**. O número não é uma propriedade do componente, é uma distância a partir da superfície onde ele está.

Sobre a página no degrau 2, a escada inteira do componente sobe junto:

|                  | Sobre o degrau 1 (dentro do card) | Sobre o degrau 2 (a página) |
| ---------------- | --------------------------------- | --------------------------- |
| repouso          | 3                                 | 4                           |
| hover            | 4                                 | 5                           |
| selecionado      | 5                                 | 6                           |
| divisor          | 6                                 | 7                           |
| borda interativa | 7                                 | 8                           |

Então sim, a sua intuição está certa: o item ativo do menu não deveria estar no 3. Ele está a um degrau da própria página, o que é praticamente nada. É exatamente por isso que os elementos dentro dos cards estão funcionando e os de fora não. E é exatamente isso que o contexto de superfície (`data-surface`) existe para automatizar: você não corrige isso componente por componente, você redeclara o offset uma vez por superfície.

## Erro 2: o accent foi gerado contra o branco, e está sendo usado sobre creme

Um "accent lavado" não é uma cor, é uma **mistura**. Se você gerou o degrau 3 do accent misturando azul com branco, ele carrega branco. Colocado sobre um creme, você tem uma mancha fria e neutra sobre um fundo quente, e o olho lê isso como sujeira, não como cor.

A regra: **o lavado tem que ser misturado com a superfície onde ele vai ficar**, não com o branco. Se a página é `oklch(0.955 0.014 85)`, o lavado do accent sobre a página é o accent misturado com _esse_ valor. Aí ele herda a temperatura do fundo e parece pertencer.

Na prática isso significa duas escadas de accent (uma por superfície) ou uma escada em alpha. É exatamente o problema que o Radix resolve publicando escalas alpha ao lado das sólidas: uma cor em alpha se mistura com o que estiver embaixo, automaticamente. Para o seu caso, essa é a solução mais barata.

## Erro 3: "parecendo água" é colapso de croma

Isso tem número. Quando você mistura uma cor com um fundo claro, o croma cai muito mais rápido do que a lightness. Um azul com C=0.15 misturado a 15% num fundo claro chega em C≈0.022. E o seu creme já tem C≈0.014. A diferença de croma entre o "azul lavado" e o fundo é 0.008, que está abaixo do limiar em que o olho reconhece aquilo como sendo colorido. O resultado é literalmente água: uma coisa que não é nem cinza nem azul.

A regra verificável: **o croma do lavado precisa ser pelo menos 3x o croma do neutro em que ele está.** Neutro em 0.014 exige lavado em 0.045 no mínimo. Isso quase nunca acontece por mistura simples, então você tem que **injetar croma de volta**: na hora de gerar o degrau lavado, preserve a lightness da mistura mas force o croma para um piso. Em OKLCH isso é uma linha.

Esse é um bom checador automático para o seu build, aliás, e nenhum sistema comercial verifica isso.

## Erro 4: o item ativo do menu provavelmente não deveria ser accent lavado

Este é o erro de design, não de token, e é o que eu deixaria por último se você só pudesse corrigir um.

A navegação é um conjunto fechado e contíguo, com exatamente um item ativo. Vale o mesmo raciocínio do controle segmentado: **quando o conjunto é fechado, a posição já comunica, e o accent lavado é desperdício.** Some a isso que a sua página tem um modelo de elevação claro (cards no degrau 1 sobre página no degrau 2), e aparece uma solução muito mais coerente: o item ativo **sobe para o plano dos cards**. Ele vira degrau 1. É a física da sua própria página respondendo a pergunta.

E o accent entra como **indicador sólido**, uma barra de 3px no degrau 9, que dá presença real de cor sem nenhuma lavagem.## A "roda" que você pediu: relação de matiz

O que aconteceu é que você escolheu um neutro quente (creme, matiz ≈85) e um accent frio (azul, matiz ≈250). São cerca de 165° de distância, ou seja, quase complementares. Isso não é errado, mas é a combinação que exige mais disciplina de todas, e ninguém te avisou.

A regra geral: **quanto mais distante o matiz do accent está do matiz do neutro, mais croma e menos lightness ele precisa ter para funcionar.** Ou dito ao contrário: accents distantes não podem ser lavados.

| Relação                | Distância | Como o accent funciona                                                    | Exemplos                                               |
| ---------------------- | --------- | ------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Mesma família**      | 0–30°     | lavado funciona lindamente, sistema muito coeso, risco de ficar sem graça | creme + terracota, creme + âmbar, cinza azulado + azul |
| **Adjacente**          | 30–90°    | o mais seguro. lavado funciona, sólido funciona, sobra tensão suficiente  | creme + oliva, creme + ferrugem                        |
| **Distante**           | 90–150°   | precisa de croma alto. lavado só com piso de croma forçado                | creme + teal, creme + verde-escuro                     |
| **Quase complementar** | 150–180°  | **só sólido e tinta escura.** lavado vira lama                            | creme + azul (o seu caso)                              |

O seu creme com azul é um par clássico e bonito, mas na forma de **azul escuro sobre creme**, como em livro, não de azul lavado sobre creme. Pense em navy sobre papel. O accent ali vive nos degraus 9 e 11 (preenchimento sólido e tinta), quase nunca no 3.

Três saídas, em ordem de esforço:

1. **Mantenha o azul e proíba o lavado.** O accent só aparece sólido ou como tinta escura. É a mudança mais barata e provavelmente a certa.
2. **Aproxime o matiz.** Um teal (matiz ≈200) ou um azul-petróleo mantém a sensação fria e reduz a briga com o creme. Aí o lavado volta a funcionar.
3. **Troque o neutro.** Se o azul é a marca, o neutro deveria ser levemente azulado, não creme. Neutro e accent na mesma família é a escolha padrão da escola justamente porque elimina esse problema inteiro.

Uma correção do que eu te disse antes: eu falei "escolha o neutro primeiro", e isso vale para _estrutura_ (montar a escada, provar a tela em cinza). Mas o **matiz** do neutro deveria vir depois de você conhecer o accent, ou pelo menos ser escolhido junto. Foi uma imprecisão minha.

## Quando precisa de borda: a regra do ΔL

Resposta direta à sua pergunta: **não é "sempre com borda quando não é degrau 1".** O critério é a distância real:

- **ΔL ≥ 0.04** entre o elemento e a superfície: nenhuma borda. O tom resolve sozinho.
- **ΔL entre 0.02 e 0.04**: precisa de borda, ou de mais um degrau.
- **ΔL < 0.02**: o tom não está fazendo nada. Ou aumente, ou remova e use outro mecanismo.
- **Elemento interativo**: borda sempre, independente do ΔL, porque ali ela é afordância.

No seu caso, o item ativo no degrau 3 sobre a página no degrau 2 tinha ΔL de cerca de 0.03. Ficou na faixa do meio: nem o tom resolvia, nem havia borda. Por isso pareceu que faltava algo, e faltava mesmo.

## Valores concretos para o seu sistema

Se você quiser um ponto de partida numérico para o creme:

```
n1  oklch(0.988 0.006 85)   card
n2  oklch(0.955 0.014 85)   página
n3  oklch(0.925 0.018 85)   componente sobre card
n4  oklch(0.895 0.020 85)   componente sobre página
n5  oklch(0.865 0.022 85)   pressionado
n6  oklch(0.855 0.020 85)   divisor
n7  oklch(0.780 0.020 85)   borda interativa
n8  oklch(0.680 0.020 85)   hover / foco
n11 oklch(0.500 0.015 85)   texto secundário
n12 oklch(0.250 0.020 85)   texto principal
```

E para o accent, o ponto importante: gere o lavado **misturando com n2, não com branco**, e force o piso de croma:

```
a3  L da mistura, C mínimo 0.045   (sobre o card)
a4  L da mistura, C mínimo 0.055   (sobre a página)
a9  oklch(0.52 0.15 250)           sólido
a11 oklch(0.42 0.12 250)           tinta sobre lavado e sobre creme
```

Os dois testes que eu rodaria agora na sua página: mede o ΔL de cada elemento contra a superfície onde ele está (qualquer coisa entre 0.02 e 0.04 sem borda é bug), e mede o croma de cada lavado contra o croma do neutro embaixo (menos de 3x é o efeito água). Esses dois checadores sozinhos teriam pego os quatro erros.
