Olhei os oito. A boa notícia primeiro: a imagem 2 (sidebar) e a imagem 7 (barra de ações) estão certas, e a 7 é o melhor componente do conjunto. O resto tem problemas reais, e quase todos vêm da mesma raiz.

## A raiz

O seu accent parece ser um índigo/azul-violeta, matiz por volta de 270-280. O neutro é creme, matiz por volta de 85. São cerca de 170° de distância, ou seja, o pior caso do gamut que discutimos, e agora dá para ver a consequência concretamente: **todos os lugares onde você tentou usar accent lavado saíram quase brancos.** Nas abas da imagem 1 e no chip selecionado da imagem 4, o preenchimento é praticamente branco com um sopro de azul, e ele só está legível porque você adicionou uma borda. A borda está compensando um lavado que não funcionou.

## Problemas por ordem de gravidade

**1. A borda accent está sendo usada como estado selecionado, e isso colide com o foco.** Imagem 1 e imagem 4 usam o mesmo desenho: contorno azul fino em volta de um preenchimento quase branco. Esse é visualmente o vocabulário de anel de foco. Um usuário de teclado não vai conseguir distinguir "esta aba está selecionada" de "esta aba está focada". É o problema mais sério do conjunto, porque é acessibilidade, não gosto.

**2. Existem quatro padrões diferentes de "selecionado" no mesmo produto.** Aba com caixa contornada (img 1), aba com sublinhado (img 3), nav com preenchimento neutro mais indicador (img 2), chip com preenchimento claro mais borda (img 4). Um design system tolera dois, com uma regra dizendo quando cada um se aplica. Quatro é ausência de decisão. E as duas abas são especialmente ruins: são o mesmo componente com dois desenhos.

**3. O chip selecionado está mais claro que os não selecionados.** Na imagem 4, "Bolos" é quase branco e os outros são tan. A direção do tom está invertida: o selecionado recuou e os não selecionados avançaram. Some a isso que os não selecionados não têm borda e o selecionado tem, e você tem dois mecanismos diferentes para dois estados do mesmo componente. O correto é os dois usarem preenchimento, mudando só a família: não selecionado no neutro 3, selecionado no accent com croma suficiente, nenhum dos dois com borda.

**4. O vermelho não está calibrado com o accent.** Nas imagens 6, 7 e 8, o "Apagar" é um vermelho puro de croma muito alto, claramente mais vivo que o índigo do "Guarde a receita". O resultado é que a ação destrutiva grita mais que a ação primária em toda tela onde as duas aparecem. Status permanece cromático, isso está certo, mas ele precisa ser harmonizado: mesmo L e croma comparável ao accent em OKLCH. Hoje parece vermelho de sistema, não vermelho do seu sistema.

**5. O modal tem duas linhas divisórias desnecessárias.** Imagem 8. O painel já é branco sobre creme, ou seja, o tom já fez a separação. As duas linhas são o segundo mecanismo, e são a assinatura visual de modal de Bootstrap. Espaço resolveria melhor. E o modal é o único lugar do produto onde a sombra é justificada, porque ele flutua de verdade, e ele não parece ter uma.

**6. As abas inativas estão escuras demais.** Nas imagens 1 e 3, os rótulos inativos parecem estar no degrau 12, mesmo peso do texto principal. Isso faz a aba ativa competir em vez de dominar. Inativo deveria estar no 11.

**7. O campo de texto está mais claro que a página.** Imagem 5. Você adotou modelo elevado (cards claros sobre página creme), e nesse modelo o input deveria escavar, não elevar. Hoje ele parece estar no mesmo plano dos cards, o que faz um campo editável parecer um card de conteúdo. A borda salva, mas o sinal de "aqui cabe coisa" se perde.

**8. Microcopy inconsistente.** Imagem 7: "Guarde a receita" é uma frase imperativa completa, ao lado de "Cancelar", "Imprimir", "Apagar", que são verbos secos. Escolha um registro. "Salvar receita" resolve.

**9. Decisão a confirmar, não erro:** na imagem 8, a ação destrutiva é o botão mais atraente da caixa e a ação segura é a discreta. Isso é comum, mas inverte o padrão de segurança. Vale ser uma decisão registrada, não um default.

## O que a imagem 2 acertou, e vale generalizar

A sidebar usa preenchimento neutro para o estado, indicador accent sólido para a cor, e peso tipográfico para reforçar. É exatamente a solução para o seu par de matizes difícil: o accent aparece em croma cheio numa área minúscula, e nenhuma lavagem é necessária. A única ressalva é que ela usa três mecanismos ao mesmo tempo (fundo, indicador, peso), e dois bastariam. Eu tiraria o indicador ou o fundo, provavelmente o fundo.

Repare que essa é a única imagem onde o accent parece intencional em vez de desbotado.## Regras a levar para a ferramenta

[exemplo](./correcao_chips_e_abas_indigo_sobre_creme.html)

Cada um desses problemas vira um checador ou uma pergunta, e é isso que torna o exercício útil além da sua página:

- **Contorno accent é reservado ao foco.** Se um componente usa borda accent em repouso ou selecionado, aviso de colisão. Vale registrar como quinto papel além de `action`, `selected`, `link`, `neutral`: o indicador de foco tem token próprio e uso exclusivo.
- **Um padrão de selecionado por família de componente**, e no máximo dois no produto inteiro, com a regra de aplicação escrita. Conjunto fechado e contíguo usa um; conjunto aberto e espalhado usa outro.
- **Direção do tom entre estados.** O selecionado nunca fica mais claro que o repouso num modelo elevado, nem mais escuro num modelo escavado. É verificável comparando o L dos dois.
- **Harmonização de status.** Cada cor de status precisa de L e croma comparáveis ao accent. Um checador simples: se o croma de `danger` for mais de 1.3x o croma de `action`, avisar.
- **Redundância de mecanismo em contêiner.** Painel com fundo próprio mais linha divisória interna é aviso.
- **Direção do input coerente com o modelo de superfície.** Se `surfaceModel = elevated`, o input escava; se `recessed`, o input pode elevar.
- **Registro tipográfico do microcopy.** Verbo seco ou frase, e a mesma escolha em todos os rótulos de ação. Isso cai no bloco 5 da sua entrevista, que hoje pergunta sobre voz mas provavelmente não deriva uma regra verificável de rótulo.

Vale notar uma coisa sobre o processo: sete dos nove achados não têm nada a ver com escolha de cor, e sim com consistência de mecanismo. Isso reforça o argumento central da escola. Com um accent só, o que sobra para errar é justamente mecanismo, e é aí que a ferramenta precisa ser rigorosa.
