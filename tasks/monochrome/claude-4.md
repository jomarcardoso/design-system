Vou renderizar em três blocos e comentar as bordas em cada um, porque a regra de borda muda por família de componente.

Antes: uma nomenclatura de estados, já que você mencionou a dúvida. O conjunto padrão é **rest** (repouso, o estado padrão), **hover**, **active** (pressionado, enquanto o botão está sendo clicado), **focus-visible** (foco por teclado) e **disabled**. Existe também **selected**, mas esse não é estado de botão, é estado de elemento selecionável. É por isso que a confusão acontece: em CSS, `:active` significa "sendo pressionado agora", e em Bootstrap `.active` significa "selecionado". São coisas diferentes com o mesmo nome, e vale você não repetir esse erro na sua fundação.O que as bordas estão fazendo aí, e essa é a parte que te preocupa:

**Botão preenchido não tem borda.** Nem o primário nem o secundário neutro. O preenchimento já delimita o elemento; a borda seria o segundo mecanismo redundante. Se você sentir que o secundário neutro "some", o problema é que o degrau 3 está fraco demais, e a correção é subir o degrau, não adicionar contorno.

**O botão contornado usa a borda como substituto do preenchimento**, então ali ela é estrutural. É o mesmo peso hierárquico do secundário preenchido, resolvido com outro mecanismo. Escolha um dos dois para o produto e siga com ele: ter secundário preenchido _e_ contornado na mesma tela cria um quarto nível de hierarquia que ninguém pediu.

**O foco é `outline`, não `border`.** Isso é importante e é onde muita gente erra: se você expressa foco trocando a cor da borda, o botão contornado ganha foco visível e o preenchido não ganha nada. `outline` com `outline-offset` funciona para os quatro tratamentos igualmente, não altera o layout, e é o que o seu `reset-a11y.css` já preserva.

**Hover e active mudam de degrau, nunca de tratamento.** Um botão fantasma que ganha preenchimento no hover está correto (ele sobe para o degrau 3, que é o repouso do secundário). Um botão contornado que vira preenchido no hover está errado, porque troca de família.

Agora os selecionáveis, que é onde o accent lavado aparece.Três coisas para tirar daí:

**Chips não têm borda no caso padrão.** O tom faz tudo: neutro 3 quando não selecionado, accent lavado quando selecionado. A exceção é quando o chip vive sobre uma superfície que já está no degrau 3 (dentro de um card com fundo, por exemplo). Aí o tom do chip empata com o fundo e você troca de mecanismo: chip contornado com borda no degrau 7. Essa é a decisão de contexto que a seção sobre recalcular valores por superfície resolve.

**A aba tem duas linhas com papéis diferentes.** A linha horizontal que atravessa o conjunto é divisor (degrau 6, decorativa, sem exigência de contraste). O sublinhado da aba ativa é accent sólido e não é borda, é indicador de estado. Se você tratar os dois como o mesmo token, a troca de tema quebra um dos dois. São `--app-border-divider` e um terceiro tipo, que vale nomear separado: indicador.

**O controle segmentado é o exemplo de que nem todo selecionado precisa de accent.** Como só uma opção pode estar ativa e as opções são adjacentes, a posição já comunica. Ali o selecionado é uma superfície elevada dentro de um trilho escavado, em neutro puro. É accent economizado, e é assim que iOS e macOS fazem. Guarde esse padrão: **quando o conjunto é fechado e visualmente contíguo, use elevação neutra; quando os itens são independentes e espalhados, como chips de filtro, use accent lavado.**

Agora superfícies, inputs e badges, que é onde a escavação aparece de verdade.## A tabela de bordas

Resumindo o que está nos três blocos, porque essa é a sua dúvida central:

| Elemento                               | Borda?                  | Qual papel                                        |
| -------------------------------------- | ----------------------- | ------------------------------------------------- |
| Botão primário e secundário preenchido | não                     | o preenchimento já delimita                       |
| Botão contornado                       | sim                     | estrutural, substitui o preenchimento             |
| Botão terciário                        | não                     | nem em hover                                      |
| Chip                                   | não, por padrão         | só quando o tom empata com o fundo                |
| Aba                                    | divisor no trilho       | o indicador ativo não é borda                     |
| Segmentado                             | não                     | trilho escavado + segmento elevado                |
| Card com imagem                        | não                     | a foto é a fronteira                              |
| Card sem imagem                        | tom **ou** borda        | um dos dois, nunca os dois                        |
| **Input, select, textarea**            | **sempre**              | afordância, obrigatório 3:1                       |
| Checkbox, radio, switch                | sim                     | mesma família dos inputs                          |
| Badge lavado                           | não                     | o tom carrega                                     |
| Badge contornado                       | sim                     | quando há muitos juntos e os fundos viram remendo |
| Divisor de lista, header, footer       | linha fina              | decorativo, degrau 6                              |
| Foco (qualquer elemento)               | `outline`, não `border` | nunca substitui a borda de repouso                |

A regra que unifica tudo isso: **borda em elemento interativo é afordância e é obrigatória; borda em contêiner é separação e é o último recurso.** Campos de formulário são o único lugar onde a borda não é negociável, porque sem ela o usuário não sabe onde clicar para digitar, e a WCAG exige 3:1 justamente aí. Em todo o resto, pergunte primeiro se espaço, tom ou o próprio conteúdo já resolveram.

E note o que os campos fazem juntos: fundo escavado (degrau 2, mais escuro que a página) **e** borda. É a exceção legítima aos dois mecanismos que eu mencionei antes: o tom diz "aqui cabe conteúdo", a borda diz "clicável", e ela escala de repouso para hover para foco carregando o estado.
