## 1. Radix são três produtos, e só um deles é o que interessa

Essa é a origem da confusão. "Radix" na verdade são três pacotes com propósitos diferentes:

**Radix Colors** é uma paleta em CSS puro. Doze degraus por escala, cada degrau com um cargo definido (a tabela que eu te passei na primeira resposta é literalmente essa), com versões claras, escuras e em alpha. Não tem componente nenhum, não tem React, não tem build step. É um arquivo de custom properties.

**Radix Primitives** são componentes headless em React: comportamento, acessibilidade e gerenciamento de foco, com zero estilo. É a base do shadcn/ui.

**Radix Themes** é a biblioteca de componentes estilizada em cima dos Primitives. É mantida pela WorkOS, está na versão 3.3.0 com cerca de 700 mil downloads semanais. É React.

Quando alguém cita Radix como referência de escola monocromática, está falando do **Radix Colors** e da forma como o **Radix Themes** consome ele. O Themes tem um provider com `accentColor`, `grayColor`, `radius`, `scaling` e `appearance`, e uma prop `variant` nos componentes com os valores `solid | soft | surface | outline | ghost`. Isso é a escada de proeminência da resposta anterior, implementada como API. Trocar `accentColor="jade"` para `accentColor="crimson"` troca o produto inteiro sem tocar num componente. É a demonstração mais limpa que existe de que a escola monocromática é uma máquina de um parâmetro.

## 2. Sofreria menos que adaptando o Bootstrap?

Depende de qual dos três você usar, e a resposta muda bastante.

**Radix Colors: sim, sem discussão, e eu usaria.** É CSS puro, framework-independent, não impõe nada ao cliente, e resolve o problema mais caro do seu sistema, que é derivar uma escada de doze degraus com cargos válidos e contraste auditado em claro e escuro. Você pode consumir os arquivos direto ou usar a escala como especificação e gerar a sua própria com `ramp.neutral()`. Isso não conflita com nada da sua arquitetura, cabe inteiro na camada 1, e é a peça do Radix que eu recomendaria mesmo se você fosse usar Bootstrap nos componentes.

**Radix Themes: sofreria menos para construir a aplicação, e mais para manter a sua promessa.** A biblioteca já é monocromática por construção, então você basicamente não adapta nada. O preço é que ela é React-only, tem opinião forte sobre layout (componentes `Box`, `Flex`, `Grid` próprios) e traz o próprio sistema de theming, que compete diretamente com a sua camada 2. Você acabaria com dois sistemas de tokens na mesma aplicação, e a sua fundação viraria um wrapper de um theming que não é seu. Para o seu objetivo declarado, que é uma fundação que sobrevive à troca de biblioteca, o Themes é o pior caso: é a biblioteca mais difícil de trocar depois.

**Bootstrap: a adaptação é mais trabalhosa, mas de um tipo previsível.** O problema do Bootstrap não é que ele resiste ao monocromático; é que ele é `functional` por design, com seis cores semânticas espalhadas por umas quarenta variantes de componente. Na prática você redefine seis variáveis Sass `!default` (`$primary`, `$secondary`, `$success`, `$info`, `$warning`, `$danger`) e umas quinze de superfície e borda, antes de compilar. É meio dia de trabalho, uma vez, e depois acabou. O que sobra são dois incômodos permanentes: as variantes que não existem no monocromático continuam disponíveis no markup (nada impede alguém de escrever `btn-info`), e isso é exatamente o problema que o seu `patterns.json` foi feito para resolver. E o botão `secondary` cinza do Bootstrap colide com `selected`, que você já mapeou.

**O que eu faria no seu lugar:** Radix Colors na camada 1, Radix Themes como implementação de referência para calibrar os seus tokens (abrir o site, inspecionar como eles resolvem `soft` vs `surface` vs `outline`), e a biblioteca de componentes escolhida por projeto, adaptada. Você fica com a peça que é pura informação e não pega a peça que é acoplamento.

Uma nota de cautela: se você for gerar a sua própria escada, gere. Radix Colors tem licença MIT, mas copiar os valores exatos e chamar de sistema próprio é uma dependência escondida. Copiar a _estrutura_ de doze cargos, que é conhecimento público e replicado em vários sistemas, é diferente de copiar os hexadecimais.

## 3. Como desenhar o DS pensando em monocromática

A ordem importa mais do que as decisões individuais, porque cada uma restringe a seguinte.

**Primeiro, a escada neutra. Antes do accent.** Isso é contraintuitivo e é o erro que quase todo mundo comete. Se você escolhe o accent primeiro, você desenha em volta dele e a escada neutra vira sobra. Escolha o pigmento neutro e a quantidade de croma dele primeiro, monte os doze degraus, e construa uma tela inteira em cinza puro. Só depois introduza o accent.

**Segundo, prove que a tela funciona sem accent.** Uma tela monocromática bem desenhada continua legível e hierarquizada com zero cor. Se você precisa do accent para saber onde clicar, a hierarquia está sendo feita por cor, e você acabou de construir uma escola `brand` disfarçada. Esse é o teste central da escola inteira.

**Terceiro, declare o modelo de superfície antes de desenhar qualquer componente.** Elevação ou escavação, e quantos níveis. Dois é o teto saudável. Escrever isso como decisão registrada evita que cada tela nova invente o seu próprio.

**Quarto, defina o orçamento de accent como número, não como princípio.** "Um preenchimento sólido por viewport" é verificável. "Use o accent com moderação" não é. Escreva o número.

**Quinto, escolha a escala tipográfica com mais degraus do que parece necessário**, porque ela vai carregar o trabalho que a cor não carrega mais.

Para as telas, o processo prático que funciona:

1. Desenhe em **cinza puro, sem accent, sem sombra, sem borda**. Só espaço e tipografia. Force isso, mesmo que doa.
2. Adicione **um** recurso de separação onde o espaço claramente falhou, e justifique cada um por escrito. Se você não consegue escrever a justificativa, remova.
3. Adicione o accent **por último**, em um lugar só, e depois pergunte se algum segundo lugar realmente precisa.
4. Reduza. A primeira versão de uma tela monocromática sempre tem um recurso a mais do que precisa.

## 4. Regras para saber que está bom

Regras que dão para aplicar olhando, sem ferramenta:

**A regra do um.** Uma fronteira, um mecanismo. Um preenchimento sólido de accent por viewport. Um modelo de superfície por produto. Um nível de elevação permanente e um temporário.

**A regra da proporção de proximidade.** O espaço entre grupos é pelo menos 1.5x o espaço dentro do grupo. Se não é, nenhuma borda vai consertar.

**A regra dos dois degraus.** Dois níveis hierárquicos vizinhos ficam a dois degraus de distância na escala tipográfica, nunca a um.

**A regra das duas alavancas.** Cada nível de hierarquia usa no máximo duas das quatro alavancas (tamanho, peso, degrau de cor, espaço). Três ou quatro é redundância.

**A regra do conteúdo primeiro.** Antes de gastar um recurso, verifique se o conteúdo já resolveu. Fotos, gráficos e blocos de código trazem superfície embutida.

**A regra do preenchido versus lavado.** Preenchimento cromático é convite (`action`), lavado cromático é estado (`selected`), preenchimento neutro é ação secundária (`neutral`). Se dois papéis saem iguais, um deles está errado.

**A regra do status intocado.** `danger` é vermelho em qualquer escola. Se você monocromatizou o status, voltou atrás.

**A regra do texto longo.** Rótulo curto pode ter tinta accent sobre lavado. Frase ou parágrafo usa tinta neutra.

**A regra da profundidade.** No máximo dois degraus de tom empilhados. O terceiro nível troca de mecanismo, não de tom.

**A regra do sticky.** Header em repouso não tem fronteira. A fronteira aparece como estado de scroll.

## 5. Verificações

Separe em três grupos, porque eles têm custos muito diferentes.

**Automatizáveis no build (o mais valioso, faça esses primeiro):**

- Todo par `bg-X` / `fg-on-X` passa AA em todos os temas. Você já tem.
- Nenhum par de papéis interativos (`action`, `selected`, `link`, `neutral`) resolve no mesmo valor. Seu `check-roles()`. Em monocromático, ajuste o checador: os valores _podem_ compartilhar pigmento, o que não pode repetir é o par completo de fundo e tinta.
- Nenhuma cor literal em CSS de produto, nenhum acesso a `--app-base-*` ou ao namespace da biblioteca.
- Todo degrau da escada tem consumidor. Um degrau declarado e nunca usado (tipicamente o 3 ou o 6) indica um cargo que ninguém implementou.
- Distância mínima entre degraus adjacentes da escada, para pegar escadas com degraus colados.
- Bordas interativas em foco atingem 3:1; divisores decorativos ficam abaixo de 1.6:1 para não virarem listras.
- A escala tipográfica tem razão constante, sem degraus improvisados.

**Verificáveis por script em cima do markup renderizado:**

- **Contagem de accent por página.** Conte elementos com preenchimento sólido de accent no DOM renderizado. Mais de um por viewport é aviso. Isso é o `audit:contrast` que você já tem, com uma métrica nova.
- **Profundidade de superfícies.** Percorra a árvore e encontre a maior cadeia de mudanças de fundo. Mais de dois é erro.
- **Redundância de mecanismo.** Elementos que têm simultaneamente fundo diferente do pai, borda visível e sombra. Esse é o checador que mais valor entrega, e é barato de escrever.
- **Sombras em repouso.** Elementos não flutuantes com `box-shadow`. Deve ser zero.
- **Proporção de espaço.** Mais difícil, mas dá para aproximar: dentro de um container, compare o menor gap interno com o gap entre irmãos.
- **Uso de `opacity` em texto.** Deve ser zero, porque quebra a auditoria de contraste.

**Verificações manuais, no review:**

- **Teste do cinza.** Force a escada do accent para neutro e olhe a tela. A hierarquia sobreviveu? Ainda dá para saber onde clicar?
- **Teste do desfoque.** Desfoque a tela até não ler texto. Os blocos de conteúdo ainda são identificáveis? Se tudo vira uma mancha uniforme, falta hierarquia de espaço.
- **Teste da inversão.** A mesma tela no modo escuro. As relações se preservaram, ou só os números inverteram?
- **Teste do anúncio hostil.** Coloque um banner saturado de terceiro na tela. O seu accent ainda ganha a atenção? Se não, você está gastando accent demais em lugares errados, ou o slot do anúncio está elevado quando deveria estar escavado.
- **Teste da tela vazia.** Uma tela sem dados. Numa escola monocromática, empty states são onde a falta de espaço e tipografia fica mais visível, porque não tem conteúdo para disfarçar.
- **Teste da tela cheia.** A mesma tela com o dobro de conteúdo do previsto. É onde a separação por espaço falha primeiro.

Os dois testes que eu rodaria em toda tela, se tivesse que escolher só dois: o do cinza e o da redundância de mecanismo. O primeiro pega hierarquia falsa, o segundo pega excesso. Juntos eles cobrem os dois modos de falha da escola.
