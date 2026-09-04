## 1. Alpha: onde sim, onde nunca

Alpha não é só para o accent. A regra é por **cargo**, não por cor:

| Degraus                          | Alpha?                        | Por quê                                                                  |
| -------------------------------- | ----------------------------- | ------------------------------------------------------------------------ |
| 3, 4, 5 (fundo de componente)    | **sim**, e é o principal caso | são exatamente os que precisam se adaptar à superfície                   |
| 6, 7 (divisor, borda em repouso) | sim                           | idem, e não têm exigência de contraste                                   |
| 8 (foco)                         | não, ou com piso auditado     | precisa garantir 3:1                                                     |
| 9, 10 (sólido)                   | **nunca**                     | carregam texto em cima; alpha faz o contraste do texto depender do fundo |
| 11, 12 (texto)                   | nunca                         | mesma razão                                                              |

Isso vale para o neutro também, não só para o accent. Radix publica escala alpha para cinza e para cores justamente por isso.

Sobre a sua pergunta de qual é o mais opaco: você está juntando duas escadas que são famílias diferentes. Dentro da família **lavada**, a progressão é mais ou menos 8% / 12% / 16% de alpha para repouso / hover / pressionado. O selecionado fica por volta de 14% a 18%. Isso é o topo do lavado, e ainda é um lavado.

O sólido (degrau 9) não é a continuação dessa escada. Ele é 100%, sempre, e pertence a outra família. Não existe um caminho contínuo de 8% até 100%; existe um salto, porque preenchido e lavado são tratamentos distintos. Se você tentar preencher o meio, cria degraus que não significam nada.

Um aviso importante: **as porcentagens de alpha são por tema, não universais.** Um lavado de 12% sobre branco lê forte; os mesmos 12% sobre um fundo escuro quase somem, porque o delta entre o accent e o fundo é menor. No escuro você tipicamente precisa de 1.5x a 2x o alpha do claro.

E a correção mais importante: **alpha resolve o erro 2 da conversa anterior, não o erro 3.** Ele faz o lavado herdar a temperatura do fundo, o que elimina a mancha fria sobre creme. Mas a matemática do colapso de croma é idêntica: misturar 12% de azul com creme dá o mesmo croma baixo, com ou sem alpha. Alpha conserta o pertencimento, não a saturação.

## 2. Superfícies e degraus: é uma escada só

Aqui está a resposta direta: **não existem duas numerações.** A superfície 2 _é_ o degrau 2. Uma superfície é simplesmente um degrau da escada que foi eleito para ser fundo.

O que muda por superfície não é a escada, é o **ponto de partida da contagem dos componentes**. A regra é uma soma:

```
repouso do componente = degrau da superfície + 2
hover                 = superfície + 3
selecionado           = superfície + 4
divisor               = superfície + 4
borda interativa      = superfície + 5
```

Sobre o degrau 1, isso dá 3 / 4 / 5 / 5 / 6. Sobre o degrau 2, dá 4 / 5 / 6 / 6 / 7. É um deslocamento, não uma segunda escala.

E aqui aparece o motivo **matemático** de por que só existem duas ou três superfícies: a escada tem doze degraus e os degraus 9 a 12 estão reservados para sólido e texto. Se você colocar uma superfície no degrau 4, o selecionado dela cai no 8, que é anel de foco, e o próximo já é sólido. Você fica sem escada. O limite de profundidade não é uma convenção estética, é aritmética.

## 3. O que não se desloca: o texto

Sua pergunta sobre os degraus escuros tem uma resposta assimétrica, e é importante: **o deslocamento vale para os degraus 3 a 8, e não vale para 9 a 12.**

Texto não se desloca por superfície porque as suas superfícies estão a ΔL 0.03 uma da outra, e o degrau 11 passa em ambas com folga. Deslocar o texto junto seria trabalho inútil e uma fonte de bug.

Agora, o que você descreveu (querer que uma região tenha texto mais claro para dar menos destaque) existe e é legítimo, mas **não é redeclarar o mesmo token, é escolher outro papel**. O aside com propaganda não usa um `fg-default` mais fraco; ele usa `fg-muted`, que é o degrau 11 em vez do 12. A distinção importa muito na sua ferramenta:

- **Contexto de superfície** redeclara fundos e bordas. Automático, derivado do offset.
- **Escolha de papel** é decisão de composição. Manual, registrada.

A única exceção em que o texto se desloca de verdade é a superfície invertida, onde tudo vira de uma vez e o par `bg-X` / `fg-on-X` assume.

## 4. Quando o lavado deixa de ser opção

Esta é a parte que interessa para a ferramenta, e a raiz é física, não estética.

**O gamut sRGB não deixa você ter cores claras e saturadas ao mesmo tempo, e o quanto ele não deixa depende do matiz.** O primário azul do sRGB é intrinsecamente escuro (L≈0.45 em OKLCH). Isso significa que qualquer azul claro é obrigatoriamente pouco croma. Amarelos e laranjas são o oposto: o primário é claro, então eles seguram croma alto em lightness alta.

Croma máximo aproximado em sRGB:

| L    | matiz 85 (âmbar) | matiz 145 (verde) | matiz 250 (azul) |
| ---- | ---------------- | ----------------- | ---------------- |
| 0.95 | ~0.13            | ~0.09             | ~0.035           |
| 0.90 | ~0.15            | ~0.11             | ~0.07            |
| 0.85 | ~0.17            | ~0.13             | ~0.10            |

São valores aproximados, mas a proporção é o que importa: **no mesmo nível de clareza, um azul tem cerca de um quarto do croma disponível de um âmbar.** É por isso que o seu lavado virou água e o de outra pessoa com um accent quente teria funcionado sem esforço.

A saída, quando o accent é frio, é **baixar a lightness do lavado**. Cada 0.04 de L que você desce compra croma.As condições que tiram o lavado da mesa, enumeráveis para a ferramenta:

1. **Teto de gamut.** O croma máximo do matiz do accent na lightness alvo é menor que 3x o croma do neutro. Calculável antes de qualquer pergunta.
2. **Distância de matiz acima de 150°.** Mesmo com croma suficiente, o lavado lê como sujeira sobre o neutro oposto.
3. **A superfície já está funda.** Lavado sobre o degrau 3 ou mais não tem espaço de escada.
4. **Texto longo.** Frase ou mais, a tinta vira neutra e o lavado deixa de comunicar accent.
5. **Conjunto fechado e contíguo.** Nav, tabs, segmentado. A posição já comunica; o accent é gasto sem retorno.

E uma correção no seu raciocínio de orçamento, porque ele te levou ao lugar errado: **o orçamento de accent se mede em área multiplicada por croma, não em "é saturado ou não".** Uma linha de menu inteira lavada pinta muito mais superfície do que uma barra indicadora de 3px em croma cheio. Você estava tentando economizar e gastando mais. Indicadores pequenos em sólido são a forma mais barata de accent que existe.

## 5. Neutro como estado ativo

Existe, é comum, e é subutilizado. Duas direções:

**Elevar** (o ativo fica mais claro que o trilho). Exige um trilho escavado. O ativo vai para o degrau da superfície pai, tipicamente o 1. É o segmentado do iOS.

**Afundar** (o ativo fica mais escuro que a volta). Funciona quando os itens ficam direto sobre a página, sem trilho. Sidebars do GitHub e do Linear fazem assim. O ativo vai para **superfície + 3**, o hover para superfície + 2, o repouso transparente. Na sua página, com fundo no degrau 2, isso dá ativo no 5 e hover no 4.

A regra de escolha: **se o contêiner tem superfície própria, eleve; se os itens estão soltos na página, afunde.**

Nos dois casos, adicione uma pista não-cromática, peso 500 ou ícone preenchido. Com ΔL de 0.03 a 0.05, o tom sozinho é fraco demais para carregar um estado, e essa é a pista que também resolve daltonismo.

## 6. O portão de viabilidade na entrevista

Esta é a peça que falta na sua ferramenta, e ela cabe entre o bloco 4 (cor) e as derivações. Depois que o cliente dá a cor da marca e o pigmento neutro, você calcula, antes de qualquer outra pergunta:

```
Δh            = distância de matiz entre accent e neutro
C_neutro      = croma do neutro
C_max(L, h)   = croma máximo do accent no gamut, na lightness do lavado
C_lavado      = min(C_max, croma da mistura com piso aplicado)

lavado_viável = C_lavado >= 3 * C_neutro  E  Δh <= 150
sólido_viável = contraste(accent9, superfície) >= 3.0
tinta_viável  = contraste(accent11, lavado) >= 4.5
```

O resultado é um **relatório de capacidade**, não um erro. Algo como: sólido disponível, tinta disponível, lavado indisponível no matiz atual, contornado disponível.

E aí a entrevista **ramifica**. Se o lavado não está disponível, a pergunta 14 (tratamento de ação secundária) não oferece "tom suave da cor principal", e a derivação do estado selecionado não oferece accent lavado. Em vez de deixar o cliente escolher uma coisa que vai sair feia, você oferece as que funcionam: elevação neutra, indicador sólido, contornado.

E ofereça as três remediações explicitamente, com o número na mão:

- aproximar o matiz do accent em direção ao neutro, com o valor mínimo calculado
- aproximar o matiz do neutro em direção ao accent
- baixar a lightness do lavado, com o L que recupera o croma necessário

Registre a escolha como `deviation` se o cliente mantiver a combinação difícil. Ele tem o direito de manter, mas passa a ser uma decisão consciente com motivo e data, que é exatamente o espírito do resto da ferramenta.

Vale generalizar isso além da cor, aliás. **Todo par de respostas que produz uma capacidade impossível merece o mesmo tratamento: calcular cedo, avisar antes de perguntar, e restringir as opções em vez de deixar o cliente escolher uma coisa que o build depois vai reprovar.** É a diferença entre uma entrevista que coleta e uma que orienta.
