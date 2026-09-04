Resposta curta: **a nomenclatura importa muito menos do que você teme, porque shadcn não é uma dependência.** É código que você copia e passa a ser seu. A adaptação não é sobrescrever CSS de terceiro, é um arquivo de umas 25 atribuições de variável.

## O que shadcn expõe

O tema padrão declara `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--border`, `--input`, `--ring`, mais `--chart-1..5`, a família `--sidebar-*` e um `--radius`. Elas são expostas ao Tailwind por um bloco `@theme inline` que mapeia cada uma para um `--color-*`, e a escala de raio é derivada de um valor único por multiplicadores: `--radius-sm` a 0.6, `--radius-md` a 0.8, `--radius-lg` igual, `--radius-xl` a 1.4.

## Três armadilhas de nome

Estas importam mais do que a compatibilidade geral, porque são colisões diretas com o vocabulário que você acabou de fixar:

**`--accent` no shadcn não é o seu accent.** No tema padrão ele é um cinza muito claro, usado como fundo de hover em menus e itens de lista. O seu accent de marca é o `--primary`. Se você nomear qualquer token da sua camada 2 como `--app-accent`, vai criar uma confusão permanente. Manter `--app-bg-action` foi a decisão certa e vale registrar o motivo.

**`--input` não é o fundo do input.** É a cor da borda dele. Ele mapeia para o seu `border-interactive`, não para um fundo escavado.

**`--secondary`, `--muted` e `--accent` são praticamente a mesma cor** no tema padrão. Três nomes de eixos diferentes (hierarquia, proeminência, cor) apontando para o mesmo cinza. É exatamente o problema de eixos misturados que você identificou, agora numa biblioteca real. Não copie esse vocabulário para dentro da sua fundação.

## O mapeamento

| Seu token                  | shadcn                               |
| -------------------------- | ------------------------------------ |
| `--app-bg-base`            | `--background`                       |
| `--app-fg-default`         | `--foreground`                       |
| `--app-bg-surface`         | `--card`, `--popover`                |
| `--app-bg-action`          | `--primary`                          |
| `--app-fg-on-action`       | `--primary-foreground`               |
| `--app-bg-component`       | `--secondary`, `--muted`, `--accent` |
| `--app-fg-muted`           | `--muted-foreground`                 |
| `--app-bg-danger`          | `--destructive`                      |
| `--app-border-divider`     | `--border`                           |
| `--app-border-interactive` | `--input`                            |
| `--app-border-focus`       | `--ring`                             |
| `--app-radius-control`     | `--radius`                           |

Doze linhas cobrem quase tudo. Isso é menos trabalho do que o adapter do CoreUI, não mais.

## O que você perde, e por que a sua granularidade tem que ser maior

O vocabulário do shadcn é **mais grosso** que o seu, e é aí que está o cuidado real:

- **Um único `--border`.** Não existe divisor separado de borda interativa. Você tem que introduzir, e como você é dono do código, dá para trocar `border-border` por uma classe sua nos componentes.
- **Sem status além de `destructive`.** Não há `success`, `warning`, `info`. Você adiciona.
- **Sem escada de componente.** Não existe repouso/hover/pressionado como tokens; os componentes usam `hover:bg-accent` e pronto.
- **Sem contexto de superfície.** É o mesmo buraco que já discutimos: `--card` e `--popover` são valores fixos, não offsets. O seu `data-surface` continua sendo camada sua.

A conclusão prática: **mantenha a sua camada 2 mais granular que a de qualquer biblioteca.** Mapear do granular para o grosso é trivial; o contrário é impossível. Se você adotar os nomes do shadcn agora, trava a fundação no vocabulário mais pobre dos três e quebra o CoreUI de volta.

## Duas correções ao enquadramento

**shadcn não é uma biblioteca, é um gerador.** A aposta real que você está fazendo é em **Tailwind 4 + Radix Primitives + React**. Vale ter isso explícito, principalmente porque você tem reservas com Tailwind. E o CoreUI não é "ultrapassado" por ser antigo; ele é Bootstrap com componentes React por cima. A diferença que importa é outra: **com shadcn você passa a ser dono do código dos componentes.** Isso é uma mudança de responsabilidade, não de modernidade. Você ganha controle total e perde atualizações automáticas.

**A migração gradual tem um risco concreto que não é de tokens.** CoreUI carrega o reset do Bootstrap e o Tailwind carrega o preflight. Rodando os dois na mesma página, eles brigam em elementos base (botão, input, heading, `box-sizing`). Isso é o que costuma quebrar coexistências, muito mais do que cor. Vale resolver antes de migrar o primeiro componente: ou o preflight fica escopado a um contêiner, ou você usa prefixo no Tailwind, ou desliga o preflight e assume o reset do CoreUI enquanto os dois convivem.

## O que eu faria agora

Escreva o adapter do shadcn **hoje**, antes de migrar qualquer coisa. São doze linhas e ele prova a nomenclatura contra uma segunda biblioteca imediatamente. Se algum nome seu não tiver destino óbvio, ou se precisar de dois nomes shadcn para um seu, é sinal de que a camada 2 tem um problema de eixo, e é muito mais barato descobrir isso num arquivo de mapeamento do que depois de migrar quinze telas.
