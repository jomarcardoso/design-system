<!-- tasks/melhorar entrevista/PLANO.md -->

# Plano 0.8.0 — da linguagem ao componente sem salto interpretativo

Escrito em 2026-08-30, a partir das notas em `Melhorar entrevista.md`,
`componentes.md`, `Todas skills.md` e `Guidelines.md`.

> **Este arquivo é o plano, não o conhecimento.** À medida que cada fase for
> executada, o embasamento vai para dentro da ferramenta — `skills/`, `src/`,
> `AGENTS.md`. As `tasks/` serão apagadas um dia; nada que importe pode ficar
> só aqui.

---

## O diagnóstico

A cadeia hoje é:

```
~20 respostas globais  →  (salto interpretativo)  →  centenas de decisões de componente
```

O salto é feito por julgamento, no momento da geração, sem nada escrito. Quando
o julgamento não tem apoio, cai no default da biblioteca — não por preguiça, mas
porque o default é a única coisa concreta disponível. Foi por isso que
`accentContrast` funcionou (decidia UM token, explicitamente) e o resto veio
genérico.

**Um read-back gate verifica coerência, não especificidade.** Ele confirma que o
que foi decidido foi respeitado; não tem opinião sobre o que ficou sem ser
decidido. Por isso mais portões não resolvem — já temos três.

A formulação do cliente, que é a correta:

> *"Seria bom que nem tudo dependa de inteligência. Seria bom ter também regras:
> se essas decisões anteriores, provavelmente esta daqui agora."*

---

## O que foi RECUSADO do plano proposto pelo Gemini, e por quê

Registrado porque a proposta vai voltar — ela é plausível e circula.

**`FOUNDATIONS.md` escrito à mão: não.** É uma segunda cópia de valores que já
existem no `theme.scss` compilado, e duas cópias divergem. Se existir, tem de ser
**gerado por script** a partir do tema, como o `export:tokens` já faz.

**`GUIDELINES.md` como proposto: não.** O conteúdo principal que ele propõe são
as *"System Adapter Directives"* — instruir o agente a escrever
`.btn-primary { --cui-btn-bg: var(--app-bg-action) }` no produto. Isso é
exatamente a violação de camada que o `AGENTS.md` proíbe: o adaptador já faz
isso, para os onze. Um documento por produto mandando reescrever variáveis de
biblioteca é a doença vestida de cura — se o produto está fazendo isso, o
adaptador está incompleto, e a correção é no adaptador, uma vez, para todos.

**Mais read-back gates: não.** Já existem em todas as três skills, e a saída
continuou genérica. Ver o diagnóstico acima.

O que se aproveita da proposta dele: o `componentes.md` como catálogo de formas,
e a observação de que falta algo entre a linguagem e o componente. O erro foi
achar que a coisa que falta é um documento.

---

## Fase 1 — a camada de derivação

**O núcleo, e o que mais muda a saída por unidade de esforço.**

Uma tabela que transforma as respostas globais em defaults de componente,
**deterministicamente**, cada linha rastreável à resposta que a produziu. Os
defaults são **apresentados para o cliente discordar**, não perguntados.

Isso atende de uma vez três pedidos das notas: o valor recomendado diz por quais
respostas anteriores é recomendado; a cadeia fica auditável por um agente; e
"nem tudo depende de inteligência".

- `skills/design-language/references/derivations.md` — a tabela.
- **Pergunta de postura** substituindo `accentContrast` como pergunta.
  `accentContrast` passa a ser derivado. A pergunta atual é sobre um token e um
  leigo não a responde; a que a substitui é *"quando algo precisa de destaque,
  ele grita ou sussurra?"*, e dela derivam oito decisões em vez de uma.
- **Pergunta de ruptura vs. legado**, condicional a existir produto anterior.
  Sem ela o agente mistura o visual novo com o antigo, que é a origem do
  contraste alto e dos fundos genéricos relatados.

## Fase 2 — catálogo de formas de componente

O `componentes.md` curado: cada forma com as condições em que é **recomendada,
desencorajada ou proibida**, e a razão. Alimenta a derivação e o `patterns.json`.

Duas ressalvas registradas: os nomes em inglês são cunhagem do Gemini
(*"Neobrutalismo Gráfico"*, *"Moldura Offset"*) — aproveita-se a forma, descarta-se
o nome ou marca-se como provisório. E várias propostas contradizem guardrails
que já existem (glassmorphism e gradiente ferem o Editorial) — o que não é
defeito: é a prova de que a derivação é necessária, porque a mesma lista filtrada
por arquétipo produz recomendações diferentes.

Aqui entra também o **`FOUNDATIONS.md` gerado por script**.

## Fase 3 — esqueleto de layout e política de ícones

- Container principal, header, aside, navegação — as perguntas de composição
  ad-hoc que hoje não existem.
- **Política** de ícone, não só estilo: só ícone, ícone + rótulo, ícone com
  fundo. Hoje temos `iconStyle` e nada sobre uso.
- O eixo **densidade vs. revelação progressiva**. Derivado da Q4 e do arquétipo
  em vez de perguntado.

## Fase 4 — contradições e plano de suavização

O caso "pediu monocromático e trouxe cinco cores": avisar, mostrar o conflito, e
propor o caminho de acomodação em vez de recusar. Vale para contraste
impossível, paleta que não combina, e escolhas que ferem decisão anterior.

Mostrar a opção que não se deve seguir, dizer qual decisão ela fere, e ainda
assim deixá-la aberta.

## Fase 5 — SUPERSEDIDA

> Ver [`PLANO-2-alargamento.md`](PLANO-2-alargamento.md). A reexecução passou
> para o fim: testar antes de alargar mede a ferramenta antiga. O plano 2
> também corrige um erro deste — a ideia de forçar promoção na primeira versão,
> que confundia dois eixos distintos.

## Fase 5 (original) — reexecutar a entrevista no recepta

Refazer as perguntas novas, regenerar as camadas posteriores, e perguntar de
novo o que mudou de resposta. É o teste real, e o `recepta-monochrome-coreui`
vai evoluindo junto — inclusive as proibições.

---

## Princípios que valem para todas as fases

- **Uma pergunta que decide um token é uma pergunta mal feita.** Ela deve
  decidir uma postura, e a postura deriva os tokens.
- **Padrão é da escola e do arquétipo, nunca da biblioteca.**
- **Recomendação vem com procedência**: por quais respostas anteriores ela é
  recomendada. Só se desencoraja o que leva a confusão visual — o resto fica
  aberto.
- **Pendência é aceitável, omissão não.** Se a biblioteca não alcança a
  personalização, o `patterns.json` registra a pendência.
- **Conhecimento vai para a ferramenta.** Todo embasamento aproveitado das notas
  vira comentário, referência ou regra dentro de `skills/`, `src/` ou
  `AGENTS.md`.
