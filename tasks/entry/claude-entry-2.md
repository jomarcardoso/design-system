Estes dois arquivos mudam bastante a leitura. Três coisas.

## Primeiro, uma correção minha

O `.btn-primary` duplicado **não é bug**. O adapter documenta a razão em detalhe: o laço liga todas as variantes pela camada 2 por papel, e um bloco depois do laço liga `.btn-primary` e `.btn-secondary` à camada 3 (`component.$button-bg`, `component.$button-secondary-bg`), porque uma variável Sass guarda um valor por compilação e um hook dentro do laço pintaria `.btn-danger` com o que fosse do `.btn-primary`. Mesma especificidade, depois na ordem de origem, ganha de propósito.

O que sobra é bem menor do que eu disse: **24 declarações** que o laço emite para `primary` e `secondary` e que nunca são lidas. Um `@if` pulando essas duas chaves só no tratamento sólido (as variantes `outline` e `ghost` continuam vindo do laço) resolve. É higiene, não arquitetura. Peço desculpa pelo alarme.

## Segundo, o agente vendeu como descoberta o que o entry já faz

`coreui-entry.scss` já passa `var()` através do Sass, deliberadamente e com comentário explicando:

```scss
$headings-font-family: var(--app-font-family-heading);
$headings-margin-bottom: var(--app-space-sm);
$hr-margin-y: var(--app-space-lg);
$badge-font-weight: var(--app-font-weight);
```

E o arquivo declara a política em voz alta: _"WHAT THIS FILE DELIBERATELY DOES NOT SET: nothing that changes between themes."_ A proposta do agente não é uma técnica nova, é **mudar essa política**. Isso é legítimo, mas precisa ser argumentado contra a regra escrita, e ele não sabia que ela existia.

## Terceiro, e é o que realmente importa

O agente chamou "cada produto compila o seu próprio CoreUI" de **o preço** da mudança. Não é preço. Olhe a linha 42 do entry:

```scss
@use 'example/demo/themes';
$_choices: themes.$light;
$primary: _c(action);
```

O `dist/coreui.css` compartilhado está compilado contra o tema da **demo**. Todos os literais que o CoreUI deriva de `$primary`, `$secondary`, `$success` e companhia, em cada canto que o adapter não religa, são a cor da demonstração. O próprio comentário do entry reconhece o risco ("unthemed corners are indigo-and-teal") e depois assa o tema da demo no lugar do indigo.

Para a página de demonstração isso está certo. Para qualquer produto real é uma mina. Ou seja: **compilação por produto já é requisito de correção**, não custo de uma refatoração. O único item que o agente listou como bloqueio some, e a fila inteira dele fica mais barata do que ele calculou.

## A bifurcação de verdade, que ninguém nomeou

Rodei um grep no `ds.css` inteiro: **zero** ocorrências de `var()` com fallback. Nenhuma. O que sai é sempre a forma colapsada:

```css
.card {
  --cui-card-bg: var(--app-bg-surface);
}
```

O documento de arquitetura diz que a camada 3 tem "emissão desligada por default; existe como fallback chain", com resolução em três níveis. No adapter do CoreUI ela não existe como cadeia: `#{component.$surface-bg}` resolve em compile time para uma referência única de camada 2. O nome da camada 3 nunca chega ao CSS. É uma deriva entre o doc e a implementação, e é ela que decide o resto:

**Opção A (a do agente).** Camada 3 continua Sass. Move os 64 para o entry via `@forward ... with ()`. Produto reconfigura recompilando. Dado o ponto acima, o custo é zero, porque a compilação por produto já é obrigatória.

**Opção B.** Os defaults da camada 3 passam a ser a cadeia que o doc promete:

```scss
$surface-bg: var(--app-card-bg, var(--app-bg-surface)) !default;
```

A string vira **independente de produto**. Aí o valor pode ir para o entry sem quebrar nada, e o produto sobrescreve definindo `--app-card-bg` em runtime, sem rebuild. Um time cliente ajusta o card com uma linha de CSS em vez de reconfigurar o Sass da fundação. É exatamente o argumento de "contrato de nomes, caminho de menor resistência já é um token" que sustenta a camada 3 no doc.

Custo da B: uma indireção a mais por propriedade no CSS resolvido, e mais bytes por declaração. Ganho: o entry pode carregar quase tudo, o contrato volta a ser o que está documentado, e a promessa de white-label deixa de exigir toolchain do lado do cliente.

Eu iria de B, e faria dela pré-requisito da migração ao entry. A A funciona, mas mantém o cliente refém do build.

## Fila revisada

| #   | Ação                                                                                                            | Depende de                  |
| --- | --------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 1   | Pular `primary`/`secondary` no laço sólido (24 linhas mortas)                                                   | nada                        |
| 2   | Parametrizar o entry para receber o tema do produto, tirando `example/demo/themes` do caminho                   | nada, e corrige um bug real |
| 3   | Decidir A ou B para a camada 3                                                                                  | conversa, não código        |
| 4   | Migrar os 64 para o entry na forma escolhida                                                                    | 2 e 3                       |
| 5   | Import seletivo, guiado pelo `patterns.json`, podando `$theme-colors` **e** o `$_map` do adapter da mesma lista | 4                           |
| 6   | `button-variant()` com argumentos explícitos                                                                    | provavelmente nunca         |

Dois avisos para o item 5. O `@import` legado não impede import seletivo (é o padrão do Bootstrap incluir partials um a um), então não espere a migração para `@use`. E `$theme-colors` e o `$_map` do adapter precisam ser podados juntos: podar só um deixa órfão nos dois sentidos, e é o adapter que gera as 186 linhas de botão, não o `$theme-colors`.

Se concordar, eu começo pelos itens 1 e 2 agora, que são contidos, e escrevo a comparação A/B com o mapeamento das 64 propriedades para você decidir o item 3 com números na frente.
