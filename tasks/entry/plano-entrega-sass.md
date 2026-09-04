<!-- claude/plano-entrega-sass.md -->

# Plano de correção: entrega em Sass, build do lado do cliente

Este documento fixa uma premissa que estava implícita e nunca declarada, e
reescreve o plano da camada de adaptação a partir dela. Ele substitui a análise
anterior sobre `ds.css`, que raciocinava dentro de uma restrição que não existe.

---

## 1. A premissa

**O cliente compila Sass.** As camadas 1, 2 e 3, mais os adapters, são
entregues como *source* Sass dentro da aplicação dele. O entry é escrito no
lado dele e roda no build dele. Nenhum CSS pré-compilado é entregue.

O produto não é uma camada de tokens que se soma ao CSS da biblioteca. É uma
**ferramenta que configura a biblioteca antes de ela compilar**, e o que sobra
em runtime é só o que um tema move.

Seis consequências caem direto dessa frase:

| | antes | depois |
|---|---|---|
| `dist/coreui.css` compartilhado | existe, compilado contra `example/demo/themes` | não existe |
| compilações | duas (`ds.scss`, `coreui-entry.scss`) que precisam concordar | uma |
| ordem de `@layer` | depende da ordem dos `<link>` no HTML | declarada uma vez no topo do entry |
| `$theme-colors` e `$_map` do adapter | duas listas, sincronizadas por disciplina | podem ser a mesma lista |
| camada 3 | Sass, mas o produto não tem como reconfigurar | Sass, reconfigurada pelo produto no `@use with ()` |
| import da biblioteca | a pilha inteira, 13.250 linhas | o que o `patterns.json` lista |

A pergunta que ficou aberta na conversa anterior (camada 3 como configuração
Sass ou como cadeia de fallback em runtime) está respondida por esta premissa:
**Sass**. A cadeia de fallback existia para dar ao cliente um caminho de
override sem rebuild. O cliente tem rebuild. A indireção extra não se paga.

E o bug do `example/demo/themes` no entry deixa de ser bug: o entry passa a ser
do cliente e lê o tema do cliente.

---

## 2. Medições

`ds.css`, 817 linhas. A metade `vendor-config` tem **345 declarações `--cui-*`**:

| bloco | decls | % |
|---|---:|---:|
| família de botões (laço 6×3, mais os dois blocos de camada 3) | 186 | 54% |
| `_refs()` + triplets (`:root`, 3 blocos de tema) | 81 | 23% |
| todo o resto (chip, nav, pagination, card, table, badge, ...) | 78 | 23% |

Por família de token apontada:

| família | decls |
|---|---:|
| `fg-*` | 123 |
| `bg-*` | 122 |
| `border-*` | 23 |
| `ring-*` | 5 |
| **não-cor** (`radius`, `size`, `pad`, `border-width`) | **10** |

Detalhe do laço de botões, que é onde está o volume:

```
6 cores × sólido   × 12 decls = 72
6 cores × outline  ×  9 decls = 54
6 cores × ghost    ×  6 decls = 36
                              = 162  (laço)
+ .btn-primary / .btn-secondary da camada 3 = 24
                              = 186
```

Das 162 do laço, **24 são código morto**: os blocos de camada 3 para `primary`
e `secondary` vêm depois com a mesma especificidade e sempre ganham. Isso é
deliberado e documentado no adapter (uma variável Sass guarda um valor por
compilação, então o hook de camada 3 não pode ficar dentro do laço), mas o laço
não precisa emitir o que ele sabe que será sobrescrito.

---

## 3. O invariante de controle

Empurrar configuração para o Sass tem um risco óbvio: entregar à biblioteca
decisões que são do sistema. Um `$primary` literal faz `button-variant()`
derivar o hover com `shade-color($primary, 20%)`, e aí o hover do botão passa a
ser a opinião do Bootstrap, não `bg-accent-hover`.

Existem duas coisas diferentes que cabem numa variável Sass da biblioteca:

| | o que acontece no compilador | controle |
|---|---|---|
| **literal** (`$primary: #005bac`) | as funções da lib rodam sobre ela | **perdido** |
| **`var()`** (`$card-bg: var(--app-bg-surface)`) | nenhuma função roda, a string atravessa intacta | **mantido** |

> **O plano só move valores do segundo tipo.** Tudo que a biblioteca deriva por
> função permanece no runtime, religado pelo adapter na classe da variante.

Os literais que o entry precisa ter (`$primary` e a família de tema, `$body-bg`,
`$body-color`, `$link-color`) existem por um motivo só: sem eles os cantos que o
adapter não religa saem no azul de fábrica da biblioteca. Eles nunca são o valor
que chega ao olho em nada que o ledger permita, porque `_refs()` e o laço de
botões escrevem por cima em runtime.

E isso deixa de ser promessa e vira gate de build:

> **`check-derived`** — para toda classe que o ledger permite, nenhuma
> propriedade portadora de cor pode resolver num literal derivado pela
> biblioteca. Toda uma delas resolve numa referência `--app-*`.

Mecanicamente: percorrer as classes de `patterns.json`, ler o valor computado de
cada `--{prefix}-*` de cor, falhar se algum não começa em `var(--app-`. O
`audit:contrast` já abre a página num navegador, então a infraestrutura existe.

---

## 4. As correções, em ordem de dependência

### C1 — Uma compilação só

O entry do cliente vira o único ponto de saída:

```scss
// app/styles/main.scss
@layer ds.base, ds.semantic, ds.component, vendor, vendor-config;

@use 'ds/src/base'      with ($palette: ...);
@use 'ds/src/component' with ($surface-border-color: transparent);
@use 'ds/src/semantic';
@use 'ds/src/adapters/coreui' as coreui-adapter;
@use './theme';

// configuração Sass da biblioteca (o que hoje está em coreui-entry.scss)
// ...
@layer vendor { @import '@coreui/coreui/scss/...'; }

@include semantic.emit-theme('light', theme.$light);
@include semantic.emit-theme('dark',  theme.$dark);
@include coreui-adapter.emit(('light': theme.$light, 'dark': theme.$dark));
```

Ganhos, nenhum deles em bytes:

- a configuração da biblioteca e o adapter passam a ver as **mesmas variáveis
  Sass**. Hoje o mesmo valor é escrito duas vezes em dois arquivos e nada checa
  se concordam.
- a ordem de `@layer` é declarada, não emergente. O truque do
  `_important-overrides()` (que precisa de `ds.component` *antes* de `vendor`,
  porque para declarações `!important` a ordem de layer se inverte) hoje depende
  da ordem dos `<link>`. Passa a ser garantido.
- `example/demo/themes` sai do caminho.

**Este é o pré-requisito de todos os outros.** É também o item que muda o grafo
de build, então é o único que precisa de uma decisão antes de começar.

### C2 — Uma lista só de papéis de tema

Hoje há duas listas de seis nomes: `$theme-colors` (que a biblioteca consome
para gerar variantes) e `$_map` (que o adapter consome para religá-las). Podar
uma sem a outra deixa órfão nos dois sentidos: ou o adapter escreve para uma
classe que não existe mais, ou a classe existe com o azul de fábrica da
biblioteca vazando para dentro do sistema.

Uma lista autoral, dois consumidores:

```scss
// no entry do cliente
$theme-roles: (
  primary:   'action',
  secondary: 'neutral',
  danger:    'danger',
);
```

`$theme-colors` é derivado dela resolvendo cada papel para um literal sRGB;
`$_map` do adapter **é** ela. O adapter deixa de carregar sua própria cópia
hardcoded e passa a receber a lista via `@use with ()`.

Retorno medido, para um produto que usa três cores em vez de seis:

| onde | antes | depois |
|---|---:|---:|
| laço de botões | 162 | 81 |
| família de tema em `_refs()` (4 decls × cor) | 24 | 12 |
| triplets (1 decl × cor × 3 blocos) | 18 | 9 |
| **total** | **204** | **102** |

102 declarações a menos, 30% do adapter, sem mexer em arquitetura nenhuma.

### C3 — O laço de botões pula o que a camada 3 sobrescreve

Um `@if` no tratamento sólido, saltando as chaves que têm bloco de camada 3
(`primary` e `secondary`). As variantes `outline` e `ghost` continuam vindo do
laço, porque nada as sobrescreve.

24 declarações mortas a menos. Trivial, isolado, mensurável.

### C4 — Import seletivo da biblioteca

**Aqui estão os bytes.** O entry importa hoje a pilha inteira do CoreUI para
páginas que usam botão, card, form, nav, modal, badge e chip. 406 KB.

Duas notas técnicas:

- O `@import` legado **não impede** import seletivo. Incluir partials um a um
  (`functions`, `variables`, `maps`, `mixins`, `root`, `reboot`, depois os
  componentes) é o padrão documentado do Bootstrap e funciona igual no fork.
  Não espere a migração para `@use`. Verifique se o CoreUI 5 já migrou antes
  de planejar em cima disso, porque o Bootstrap 5.3 ainda não migrou e o
  CoreUI o acompanha.
- A lista de componentes é o `patterns.json`, que já é exatamente essa lista.

E a contrapartida no adapter: **os blocos do adapter precisam sair da mesma
lista.** Um adapter que emite `.chip`, `.pagination` e `.nav-enclosed` para um
produto que não importou nenhum dos três escreve CSS inofensivo mas morto.
Envolver cada bloco em um teste contra a lista de componentes resolve, e usa a
mesma fonte que C2 usa para as cores.

Retorno estimado: no adapter, dos 78 declarações do bloco "resto", algo entre
30 e 50 para um produto típico. Na biblioteca, a maior parte dos 406 KB.

### C5 — `check-coverage`, e ele vem ANTES de C2 e C4

C2 e C4 são seguros no que emitem e perigosos no que omitem. Se o ledger permite
`.btn-warning` e a poda tirou `warning` de `$theme-colors`, a biblioteca **não
dá erro**: a classe simplesmente não existe, e a marcação renderiza um `.btn`
base, cinza, sem aviso nenhum. Mesma falha para um componente que o import
seletivo deixou de fora.

O `verify:examples` de hoje checa uma direção só: marcação usando o que o ledger
não permite. Falta a inversa:

> **`check-coverage`** — toda classe que o ledger lista como `raw`, `styled` ou
> `wrapped` tem que existir no CSS compilado.

Sem isso, C2 e C4 trocam bytes por um modo de falha silencioso, o que inverte a
ordem de prioridade. Com isso, os dois ficam seguros.

### O que foi cortado, e por quê

Uma versão anterior deste plano tinha um item a mais: fazer `core.ref()`
consultar quais tokens algum tema ou context de fato redefine, emitindo `var()`
só para esses e literal para o resto.

**Cortado.** Ele vale 10 das 345 declarações, porque quase tudo no adapter é cor
e cor varia entre claro e escuro. E abre um buraco: um valor compilado como
literal hoje deixa de responder a um context que alguém acrescente amanhã como
CSS escrito à mão, sem recompilar. Dez linhas não pagam uma classe de bug
silencioso quando a precisão do DS vem antes do bundle.

### Resumo

| # | correção | decls no adapter | bytes na biblioteca | efeito na precisão |
|---|---|---:|---|---|
| C1 | uma compilação | 0 | 0 | **melhora** (ordem de layer declarada, fim da duplicação) |
| C5 | `check-coverage` + `check-derived` | 0 | 0 | **melhora** (dois modos de falha silenciosa fechados) |
| C2 | uma lista de papéis | −102 | −(variantes não usadas) | neutra, dado C5 |
| C3 | laço pula camada 3 | −24 | 0 | neutra (o que sai já era sobrescrito) |
| C4 | import seletivo | −30 a −50 | **a maior parte** | neutra, dado C5 |

Ordem de execução: **C1 → C5 → C2 → C3 → C4**. As duas primeiras não movem um
byte e existem para que as três seguintes possam mover sem risco.

345 → em torno de 170 para um produto típico, e a biblioteca caindo de 406 KB
para o que o produto realmente usa.

---

## 5. O que o cliente recebe

Um pacote, não um arquivo:

```
ds/
  src/                    vendorizado, copiado sem alteração
    _base _core _semantic _component _roles _ramp _config
    adapters/_coreui.scss _bootstrap.scss ...
  templates/
    entry-coreui.scss     ponto de partida que o cliente edita e passa a possuir
    stylelint.config.cjs
  bin/                    os checks, como CLI
```

Autorado pelo cliente (gerado pelas skills, depois dele): `palette.scss`,
`theme.scss`, o entry, `patterns/patterns.json`.

A biblioteca (`@coreui/coreui`, `bootstrap`) vira **peer dependency**. O cliente
já a tem; nós nunca a redistribuímos compilada.

**E os checks precisam mudar de lado junto.** Hoje `build:tokens`,
`audit:contrast` e `stylelint` rodam no nosso repositório, contra o nosso
output. Se o cliente compila, o gate de AA tem que rodar contra o CSS que ele
de fato embarca, ou a garantia não cobre nada do que é enviado. Empacotar como
CLI é parte da entrega, não um extra:

```bash
npx ds verify --entry app/styles/main.scss --ledger patterns/patterns.json
```

O `audit:contrast` em particular fica mais forte com C4, não mais fraco: ele
passa a saber quais componentes existem, porque a mesma lista gerou o import.

---

## 6. Riscos

**Sass vira requisito duro.** Um cliente em Vite, Next, Astro ou Rails tem Sass
em uma linha de configuração; um cliente sem pipeline de build não é mais
atendível. Isso é uma escolha de posicionamento, não um detalhe técnico, e vale
estar declarado no README em vez de descoberto na primeira integração.

**`@import` está deprecado.** O plano funciona hoje e continuará funcionando
por um bom tempo, mas o dia em que o Dart Sass remover `@import` é o dia em que
o entry de cada cliente quebra. Mitigação: o entry é um template nosso, então a
correção é uma versão nova do template mais uma nota de migração, não uma
reescrita de cada aplicação.

**Compilar do lado do cliente move os erros para lá.** Um `@use with ()` com uma
chave errada hoje falha no nosso build e ninguém vê; depois falha no build
dele. As mensagens de erro dos módulos precisam ser escritas para serem lidas
por quem não conhece o interior do sistema, o que hoje `core.require-themes()`
já faz e o resto ainda não.

**O ledger vira caminho crítico.** C4 faz `patterns.json` decidir o que compila.
Um ledger errado deixa de ser documentação desatualizada e passa a ser um
componente faltando em produção. É exatamente o que C5 fecha, e é por isso que
C5 é pré-requisito e não melhoria.

---

## 7. Estado, depois da primeira execução

Executados: **C5** (os dois checks) e **C3**. Não executados: C1, C2, C4.

### O que os checks encontraram assim que existiram

`check-derived` acusou **seis vazamentos reais** na primeira rodada, todos em
classes que o ledger permite e a página renderiza:

| classe | propriedade | valor que a biblioteca escolheu |
|---|---|---|
| `.btn-ghost-danger` | `active-bg`, `active-border-color` | o vermelho SÓLIDO da lib |
| `.btn-ghost-danger` | `active-color` | `#fff` |
| `.btn-ghost-danger` | `disabled-color` | o mesmo vermelho sólido |
| `.btn-link` | `disabled-color` | `#6d7d9c`, um literal de nenhum tema |
| `.navbar` | `toggler-icon-bg` | tinta dentro de um data URI |

O primeiro é o pior e é o mais recente: o botão "Apagar", que acabou de ser
promovido a terciário fantasma, **virava um botão vermelho sólido enquanto o
dedo estava nele**. Trocava de família no meio do gesto, que é exatamente o que
`claude-4.md` proíbe. O bloco `.btn-ghost-*` do adapter ligava repouso e hover e
parava ali.

Nenhum dos sete checks anteriores via isso, porque nenhum deles pergunta de onde
o valor veio — perguntam se ele contrasta, se o token existe, se a classe está no
ledger. A pergunta que faltava era de PROCEDÊNCIA.

Corrigidos os cinco primeiros no adapter. O sexto ganhou isenção documentada: um
`var()` dentro de um data URI nunca é substituído, então o adapter passou a usar
o URI como MÁSCARA e pintar com `background-color`, o que torna a cor de dentro
inerte.

### Duas correções ao próprio método

O primeiro `check-derived` foi escrito no navegador, lendo `--cui-*` de um
elemento renderizado. **Não funciona**: `getComputedStyle().getPropertyValue()`
devolve o valor SUBSTITUÍDO, então uma propriedade corretamente apontada para
`var(--app-fg-default)` volta como `#2b261e` e fica indistinguível de um literal.
Todas as 693 propriedades pareciam vazamento. A pergunta é sobre a DECLARAÇÃO, e
só o texto da folha de estilo responde.

O segundo estava certo na direção errada: exigia que toda cadeia terminasse numa
referência `--app-*`, e acusou onze propriedades que são nossas. A navbar lê
`rgba(var(--cui-emphasis-color-rgb), .65)`, e um triplete não PODE ser uma
referência de token — o adapter o calcula do mapa de tema e o redeclara dentro de
cada bloco de tema. É literal e é inteiramente nosso: ele se move quando o tema
se move, que é a única propriedade que importa. O teste é **procedência**, não
forma.

### C3, e o que ele revelou sobre o risco de podar

24 declarações mortas removidas. Mas a checagem antes de remover é o que vale
registrar: o valor sobrevivente do `.btn-primary` passou a ser o da camada 3, que
usava `border-accent` onde o laço usava `bg-accent`. Se os dois divergissem, isso
seria uma mudança visual paga com bytes — a troca que a lista de prioridades
proíbe. São idênticos nos dois temas (`#4a5eab` e `#a1b5f1`), então não houve
mudança. Verificado, não presumido.

### Saldo de bytes, e por que ele é negativo

345 → 360 declarações. **A correção custou mais do que a limpeza economizou**, e
está certo assim: −24 do código morto, +36 dos estados que faltavam no fantasma,
+3 do `.btn-link` e da máscara. Precisão vem antes de tamanho, e este é o
primeiro caso em que as duas de fato se opuseram.

### Por que C2 não foi executado

O plano trata `check-coverage` como a trava que torna a poda segura, e ela é —
para o que o ledger lista. O ledger da recepta não lista alert, toast, nem
variantes de tabela. Podar `$_map` tiraria `--cui-success` e companhia do `:root`,
e qualquer componente ainda não catalogado passaria a usar o verde de fábrica do
CoreUI em vez do token. `check-coverage` não veria, porque não há nada no ledger
para ver.

Ou seja: **o pré-requisito de C2 não é `check-coverage`, é o ledger cobrir o que o
produto pode vir a renderizar.** O plano nomeia esse risco na seção 6 ("o ledger
vira caminho crítico") e depois trata C5 como se o fechasse. Não fecha. C2 fica
esperando o ledger, não o check.

### O achado que muda a ordem: `dist/coreui.css` está compilado contra a demo

Confirmado no arquivo. `.btn-primary` em `dist/coreui.css` é
`rgb(31.08%, 22.44%, 96.63%)` — o `indigo 600` de `example/demo/themes`, com
hover, active e o triplete de foco todos derivados dele por `shade-color()`.

Isso valida a leitura do `claude-entry-2`: compilação por produto não é o preço
de C1, é **requisito de correção**. Hoje o que salva a recepta é o adapter
reescrever cada uma dessas propriedades em runtime — e agora existe um check que
falha o build se alguma deixar de ser reescrita. Antes dele, a única coisa entre
o produto e o azul da demonstração era a disciplina de quem escreveu o adapter.

---

## 8. C1, executado

Feito, e não exatamente como o plano descreve. A diferença está registrada
abaixo porque ela troca pureza por área de risco, e a troca é deliberada.

### O que existe agora

| arquivo | papel |
|---|---|
| `templates/entry-coreui.scss` | o entregável da ferramenta: o entry que um produto copia, com três linhas marcadas para trocar |
| `example/recepta-monochrome-coreui/_setup.scss` | a configuração do produto, lida pelas DUAS compilações |
| `example/recepta-monochrome-coreui/coreui.scss` | a instância do template |
| `example/recepta-monochrome-coreui/coreui.css` | CoreUI compilado com as cores da recepta |

`.btn-primary` no build da recepta passou de `rgb(31%, 22%, 96%)` — o indigo da
demo — para `rgb(28.9%, 37.1%, 66.9%)`, que é `#4a5eab`, a caneta da recepta.

`coreui-entry.scss` continua existindo e ganhou um aviso no topo: ele é o build
da PÁGINA DE DEMONSTRAÇÃO e ninguém deve copiá-lo para um produto.

### Duas compilações, não uma

O plano diz "uma compilação só". Ficaram duas — `coreui.css` e `ds.css` — e a
razão é área de risco: **treze scripts leem `ds.css` pelo nome**. Unificar
significaria ou renomear a saída em treze lugares, ou fazer `ds.css` conter
também as 13 mil linhas da biblioteca, o que quebraria `check-derived`
(que distingue o que é nosso do que é da lib POR ARQUIVO) e `check-mechanism`,
e destruiria a propriedade que o `claude-entry-1` apontou como valiosa: um
arquivo onde o contrato inteiro é legível de uma vez.

Os três ganhos que o plano atribui ao C1 chegam mesmo assim:

- **as duas compilações veem as mesmas variáveis Sass** — via `_setup.scss`, e o
  Sass ENFORCE isso: um módulo só pode ser configurado por quem o carrega
  primeiro, então o segundo entry que tentasse configurar de novo falha com
  "this module was already loaded". A duplicação não é desencorajada, é
  impossível.
- **ordem de `@layer` declarada** — já estava, no topo do `app.css`.
- **`example/demo/themes` fora do caminho de qualquer produto** — feito.

O que NÃO chega é a saída única. Pela lista de prioridades isso é o item 3, e o
item 3 é o que menos importa.

### Duas coisas que o plano não previu

**A ordem dentro do `_setup.scss` é obrigatória.** `src/_base.scss` abre com
`@use 'config'`, então configurar `base` antes de `config` carrega `config` com
os defaults e o Sass recusa. A primeira versão do arquivo estava na ordem
errada e não compilou. É a linguagem protegendo um invariante que antes não
tinha guarda nenhuma.

**`$body-tertiary-bg` não pode ser setado.** O CoreUI passa esse valor pelo seu
próprio `color-translucent()`, que tenta exprimir a cor como 10% de alpha sobre
branco e dá erro quando não existe tal alpha:

    Cannot reproduce rgb(92.3%, 89.9%, 86.5%) on #fff with alpha 0.1.

Qualquer tom escavado quente e claro o bastante bate nisso. O `zinc-100` frio da
demo passava por acaso, e foi por isso que a falha só apareceu quando uma escada
de papel real entrou. Não é corrigível de fora: o alpha está no default do
argumento da função. Deixar sem setar não custa nada — `--cui-tertiary-bg` tem
caminho de runtime e o adapter o liga.

A forma geral disso vale reconhecer de novo: **uma função da biblioteca que
DERIVA um valor de outro é um lugar onde o design system não alcança, e a
resposta é parar de alimentá-la, não brigar com ela.**

### Um efeito colateral do C1, e o que ele ensina

`check-theme-proof` passou a acusar dois `filter:` dentro do `coreui.css` da
recepta — código da biblioteca, não nosso. O check pulava `dist/` como
DIRETÓRIO, e um build de biblioteca por produto não tem diretório para pular, só
um nome. Agora arquivos também são puláveis, e `coreui.css` está na lista.

Registrado porque é o primeiro custo real da mudança: **mover a biblioteca para
dentro de `example/` põe código de terceiros no raio de todo check que varre a
pasta.** Cada guard que varre por diretório precisa ser reexaminado com essa
lente, não só este.

### C2 e C4 continuam parados, pelo mesmo motivo de antes

C4 (import seletivo) agora é trivial de executar — é uma linha no template — e
continua esperando o `check-coverage` cobrir componentes que o ledger ainda não
lista. C2 espera o ledger, não o check. Nada mudou nesse diagnóstico.
