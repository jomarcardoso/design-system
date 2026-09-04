Li o `ds.css` inteiro antes de opinar. O diagnóstico do agente está certo no essencial, mas ele foi otimista em um ponto, pessimista em outro, e deixou passar um bug que já está no arquivo.

## O argumento mais forte não é o que ele usou

Ele diz "nada garante que concordem". Não é hipotético, já não concordam. `.btn-primary` e `.btn-secondary` aparecem **duas vezes** dentro de `vendor-config`, com valores diferentes:

|                                 | primeira ocorrência (laço) | segunda (bloco manual)         |
| ------------------------------- | -------------------------- | ------------------------------ |
| `.btn-primary` → `border-color` | `var(--app-bg-accent)`     | `var(--app-border-accent)`     |
| `.btn-secondary` → `bg`         | `var(--app-bg-neutral)`    | `var(--app-bg-neutral-subtle)` |
| `.btn-secondary` → `color`      | `var(--app-fg-on-neutral)` | `var(--app-fg-default)`        |

A segunda ganha por ordem de origem. Ou seja: 24 declarações do laço de variantes já são código morto, e nada no build percebeu. É exatamente o sintoma de uma configuração que existe em dois lugares. Isso sozinho justifica a consolidação, independente de quantos bytes ela economiza.

## O que ele acertou

O mecanismo funciona e a preocupação óbvia não se confirma: `var()` atravessa o Sass verbatim, então `$card-bg: var(--app-bg-surface)` sai como `--cui-card-bg: var(--app-bg-surface)` e continua reagindo à troca de tema e aos contexts de `[data-surface]`. Você não perde nada de runtime movendo isso para compile time, porque o que viaja é a _referência_, não o valor.

E a cadeia de fallback da camada 3 sobrevive igual: `$card-bg: var(--app-card-bg, var(--app-bg-surface))` compila intacto. A propriedade de "contrato de nomes vazio por default" continua valendo.

## Onde ele foi pessimista: `.btn-*` não é intransponível

Ele trata as funções de cor como fatalidade. Não são. Em `button-variant()`, `shade-color()` e `color-contrast()` aparecem como **valores default de argumento**, e o Sass só avalia um default quando o argumento não é passado. O que quebra é o laço nativo da biblioteca, que chama o mixin com dois argumentos e deixa o resto derivar.

Se você escreve o seu próprio `@each` passando os oito argumentos explicitamente, nenhuma função de cor roda e a família inteira migra.

O preço, e por isso eu **não** faria isso agora: você se acopla à assinatura do mixin, que mudou entre 5.2 e 5.3 (entraram os `*-shade-amount`). É o único item da lista que cria dívida de upgrade. Deixe por último, ou nunca.

O `body-bg` / `to-rgb()` é diferente e não tem saída, mas são 2 ou 3 declarações. Deixe no runtime e siga.

## Onde ele foi otimista: o item 1 não rende o que ele diz

"Podar `$theme-colors` remove ~120 das 345 linhas" mistura duas listas. `$theme-colors` controla o que o **CoreUI** gera. As 186 linhas de botão estão no **adapter**, escritas por um laço próprio. Podar uma não poda a outra, e podar só uma produz órfão nos dois sentidos:

- podar `$theme-colors` sozinho: o adapter escreve `.btn-warning` para uma classe que não existe mais (inofensivo, mas suja o arquivo)
- podar o adapter sozinho: `.btn-warning` continua existindo com os defaults da biblioteca, vazando cor de fora do sistema para dentro dele

As duas listas precisam vir da **mesma fonte**, e essa fonte é o `patterns.json`, não "o que o recepta usa hoje". Remover `warning` é uma decisão de `forbidden` no ledger, com `reason` e `instead`, não uma otimização de build. Sua própria regra diz que a família de status é comum às três escolas.

## Uma afirmação para verificar antes de planejar em cima

Ele diz que o CoreUI 5 migrou para `@use`/`@forward`. O CoreUI 5 acompanha o Bootstrap 5.3, que internamente ainda é `@import` (a reescrita em módulos é assunto do 6). Pode ser que o CoreUI tenha ido na frente, mas eu não assumiria: se for falso, o "import seletivo confortável" fica bem mais caro e o item 3 muda de posição na fila. Abra o `scss/coreui.scss` do pacote instalado antes de orçar.

## O que ele não considerou, e que importa no seu caso

Um arquivo que lista **todos** os pontos onde a biblioteca toca seus tokens tem valor como entregável, não só como débito. Um time cliente que abre `ds.css` hoje enxerga o contrato inteiro. Depois da migração, ele fica espalhado entre a chamada `@use ... with ()` e o `dist/coreui.css`.

Isso não é motivo para não migrar, é motivo para o `_layer3.scss` compartilhado ser escrito como documento legível, e para o build emitir um **report** do mapeamento (o pipeline já tem arquivos de report). O contrato passa a ser autoral em vez de emitido, o que é melhor.

Um detalhe de cascata: hoje `vendor-config` vem depois da biblioteca e é um ponto de override previsível. Movendo os valores para dentro das regras do CoreUI, o ponto de override muda. Garanta que o dist da biblioteca entre numa `@layer` nomeada explicitamente.

## Ordem que eu proporia

Ele começaria pela poda. Eu inverteria, porque podar antes de unificar significa podar duas listas dessincronizadas e depois repodar.

1. **Deletar os blocos duplicados de botão.** Puro bugfix, zero arquitetura, e revela quais valores são de fato os autoritativos antes de você migrá-los.
2. **`_layer3.scss` compartilhado + CoreUI por produto.** É o que fecha a causa raiz do item 1. O custo real (cada app compila o seu) é o que já acontece em produção.
3. **Poda guiada pelo `patterns.json`**, nas duas listas ao mesmo tempo.
4. **Import seletivo**, se o item de `@use` se confirmar.
5. **`button-variant()` com argumentos explícitos**, só se depois disso o runtime ainda incomodar.

Se quiser, eu escrevo o passo 1 agora (é mecânico e mensurável) ou monto o `_layer3.scss` do passo 2 com o mapeamento completo das 64 propriedades.
