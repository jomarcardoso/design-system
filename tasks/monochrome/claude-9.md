Os três confirmam uma coisa só, e é uma boa notícia: **quase tudo aqui é sintoma de um bug de arquitetura, não de gosto.** O offset de superfície não está implementado, e todos os desvios visuais são contornos que você foi obrigado a inventar por causa disso.

## O input está escavado demais, e o motivo é revelador

Duas coisas erradas ao mesmo tempo:

**Excesso de profundidade.** Sobre um card branco (degrau 1), o input deveria estar no degrau 2, ΔL de cerca de 0.03. O da imagem 1 está uns 0.08 a 0.10 abaixo do card, o que é território de degrau 4 ou 5. Um input não é um contêiner de conteúdo, é um controle; nessa profundidade ele passa a competir com o card.

**Redundância.** Ele tem preenchimento forte **e** borda forte. Escolha: ou fundo no degrau 2 com borda no 7 (o padrão, e o que eu recomendo), ou fundo no degrau 3 sem borda nenhuma. Hoje os dois estão em volume máximo.

E repare no efeito colateral que denuncia o problema: **o input está mais escuro que a própria página**, que está atrás do card. Um elemento aninhado dois níveis para dentro ficou mais fundo que o plano de baixo. A profundidade da tela deixou de fazer sentido físico.

Tem ainda uma inversão de hierarquia: o input, que é passivo, tem mais peso visual que o botão "Cancelar", que é um controle acionável. Elementos passivos nunca deveriam pesar mais que os ativos.

## Os chips: a raiz é o offset ausente

A sua própria legenda na imagem 1 entrega o diagnóstico. "Contornados porque o fundo do card empata com o tom de repouso do chip." Isso não deveria acontecer nunca.

Sobre um card no degrau 1, o chip em repouso vai para o degrau 3. ΔL de cerca de 0.06, perfeitamente visível, é o mesmo caso que funciona na imagem 2 sobre a página. **Ele empatou porque o token do chip não foi reescopado ao entrar no card.** Ele resolveu para o mesmo valor da superfície pai, você viu que sumia, e adicionou borda para compensar. A borda não foi uma decisão, foi um curativo.

Consequência: dois desenhos de chip no mesmo produto, e uma paleta inteira dentro de um componente que deveria ter dois valores. Contando o que aparece nas duas imagens: borda azul, borda tan, preenchimento branco, preenchimento tan, preenchimento lavanda quase branco, texto preto, texto azul. Sete valores para um chip que precisa de quatro.

A correção não é escolher entre os dois desenhos. É implementar o offset e apagar o contornado. Com o offset funcionando, o mesmo chip preenchido funciona nos dois contextos, com valores diferentes resolvidos automaticamente.

E o chip selecionado continua com o colapso de croma da conversa anterior: aquele lavanda quase branco só é perceptível por causa da borda.

## Arredondamento: não, e sim

Não devem ser todos iguais, mas devem sair de uma escala pequena com relação declarada. O padrão são três tokens:

| Token            | Uso                                   | Valor típico |
| ---------------- | ------------------------------------- | ------------ |
| `radius-sm`      | checkbox, badge, indicadores pequenos | 3–4px        |
| `radius-control` | botão, input, select                  | 6–8px        |
| `radius-surface` | card, modal, painel                   | 10–14px      |
| `radius-pill`    | chip, tag, avatar                     | 999px        |

E existe uma regra geométrica que quase ninguém aplica e que resolve o "por que isso parece errado" em cantos aninhados: **o raio externo deveria ser o raio interno mais o padding.** Um card com padding 16 contendo um botão de raio 6 fica visualmente correto com raio 22, ou próximo disso. Se o raio externo for menor que o interno mais o padding, os cantos ficam desalinhados e a tela parece amadora sem que ninguém saiba dizer por quê.

Nas suas imagens o conjunto está razoável. O que eu ajustaria: input e botão precisam compartilhar `radius-control` exatamente, e hoje o input parece um pouco mais arredondado.

## Checkbox e input: não, não está certo

Eles pertencem à mesma família de controles de formulário e devem compartilhar os mesmos tokens de borda e de preenchimento. Hoje o input tem borda forte com fundo escuro e o checkbox tem borda muito clara com fundo quase branco. São dois vocabulários para a mesma coisa.

E há um problema de acessibilidade concreto: **a borda do checkbox desmarcado parece estar abaixo de 3:1** contra o card branco. A WCAG 1.4.11 exige 3:1 para a fronteira de um controle, e o checkbox é o caso mais literal disso, porque a borda é a única coisa que informa que ali existe um alvo. Meça, mas a olho ela está na faixa de 1.5:1 a 2:1.

O correto: os dois usam `--app-border-interactive` (degrau 7) e o mesmo fundo escavado leve (degrau 2). O checkbox marcado vai para accent sólido, que é o que já está e está certo.

Também vale: o "rascunho" na imagem 1 tem contraste baixo demais para texto e está solto no canto sem relação com nada. Badge é texto pequeno, então ele precisa de 4.5:1, e o pequeno é justamente onde mais se erra.

[example](./correcao_formulario_dentro_do_card_indigo_creme.html)

## O que fazer, em ordem

1. **Implementar o offset de superfície.** É a correção que apaga sozinha metade dos achados destas três imagens e das oito anteriores. Enquanto ele não existir, você vai continuar inventando variantes para compensar tokens que resolvem errado.
2. **Unificar a família de controles de formulário.** Input, textarea, select e checkbox compartilham fundo (degrau da superfície + 1) e borda (superfície + 5).
3. **Apagar o chip contornado.** Um desenho só.
4. **Recuperar croma no lavado do accent**, baixando a lightness, como já discutido.
5. **Auditar contraste de todo texto pequeno**, badges em primeiro lugar.
6. **Fixar três tokens de raio mais o pill**, e aplicar a regra concêntrica nos aninhamentos.

Uma observação sobre o processo, já que a ferramenta é o produto: você acabou de descobrir sozinho um bug de arquitetura olhando para pixels, e o caminho foi "isso ficou estranho" → "por que precisei de borda aqui" → "o token resolveu errado". Vale transformar isso num checador explícito, porque ele é barato: **qualquer componente cujo fundo em repouso resolva para um ΔL menor que 0.02 contra a superfície onde está é um erro de escopo, não um caso para borda.** Esse único teste teria pego os chips antes de você desenhar a segunda variante.
