Boa pergunta de gate, e ela derruba um item do plano. Respondendo direto: **1 e 2 não são afetados negativamente, exceto por um item, que eu vou cortar.**

## O invariante que responde ao seu medo

Existem duas coisas diferentes que se pode pôr numa variável Sass do Bootstrap:

|                                                 | o que acontece                                           | controle        |
| ----------------------------------------------- | -------------------------------------------------------- | --------------- |
| **literal** (`$primary: #005bac`)               | as funções da lib rodam. `shade-color()` inventa o hover | **você perde**  |
| **`var()`** (`$card-bg: var(--app-bg-surface)`) | nenhuma função roda, a string atravessa intacta          | **você mantém** |

O plano só move coisas do segundo tipo. Nada que a lib derive por função sai do runtime, nunca. `.btn-primary { --bs-btn-hover-bg: var(--app-bg-accent-hover) }` continua sendo escrito pelo adapter e continua ganhando do que o `shade-color()` compilou.

O `$primary` literal no entry existe só para que os cantos que o adapter não religa não saiam no azul de fábrica. Ele nunca é o valor que chega ao olho do usuário em nada que o ledger permita.

Isso deixa de ser promessa e vira check: **para toda classe que o ledger permite, nenhuma propriedade de cor pode resolver num literal derivado pela biblioteca.** Grep no CSS compilado, falha o build.

## O item que eu corto

**C5 (`core.ref()` por variância)** troca precisão por bytes na direção errada. Se um valor compila como literal porque nenhum tema o move hoje, e amanhã alguém adiciona `[data-density="compact"]` como CSS escrito à mão, o literal não segue. É um buraco silencioso.

Valia **10 declarações**. Pela sua ordem de prioridade, não se paga. Fora.

## Os dois itens que precisam de trava

C2 e C4 são seguros no output e perigosos na omissão. Se o ledger permite `.btn-warning` e a poda de `$theme-colors` não emitiu a classe, o Bootstrap não dá erro: renderiza um `.btn` base, cinza, e ninguém percebe. Mesma coisa para um componente que o import seletivo deixou de fora.

O `verify:examples` de hoje checa uma direção só (marcação usa algo que o ledger não permite). Falta a inversa. Com ela, C2 e C4 ficam seguros; sem ela, eu não mexeria em nenhum dos dois.

Vou aplicar as duas correções no documento.Plano atualizado. O que mudou:

**Cortei o item de menor retorno** (`ref()` por variância), que era o único ponto onde bundle e precisão brigavam de verdade. Dez linhas não pagam um modo de falha silencioso.

**Promovi verificação a pré-requisito.** `check-coverage` e `check-derived` não movem um byte e passam a ser C5, executado **antes** de C2 e C4. A ordem virou C1 → C5 → C2 → C3 → C4: as duas primeiras existem só para que as três seguintes possam mover peso sem risco.

**Escrevi o invariante de controle como seção própria**, com o gate que o torna verificável em vez de prometido.

Resultado por prioridade:

|                       | efeito                                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1. precisão do DS     | melhora. Dois modos de falha silenciosa fechados, ordem de `@layer` declarada, fim do mesmo valor escrito em dois arquivos |
| 2. bundle             | 345 → ~170 no adapter, e o import seletivo derruba a maior parte dos 406 KB                                                |
| 3. Sass vs CSS pronto | é o que destranca os outros dois                                                                                           |

Nenhum item do plano entrega ao Bootstrap uma decisão que hoje é sua. O hover do botão continua vindo de `bg-accent-hover`, escrito pelo adapter na classe da variante, e agora com um check que falha o build se algum dia deixar de vir.

C1 é a decisão que destranca o resto. Posso montar o template de entry unificado, ou escrever os dois checks do C5 primeiro, já que eles são independentes e valem por si.
