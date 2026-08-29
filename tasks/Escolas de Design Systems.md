# **Escolas de Design Systems**

[https://gemini.google.com/app/b98983721695b1db](https://gemini.google.com/app/b98983721695b1db)

*User prompt: Preciso entender sobre a parte onde você falou sobre tons de azul, água e sépia. Isso foram exemplos ou esses ah a terceira escola e depois me me reforce qual que é o nome da terceira escola que eu já me esqueci. Ah, se a terceira escola ela usa é só essas esses três tons aqui ou foram só exemplos? Ah, você falou de 10 a 12 degraus. É, eu não entendi muito bem como vai se fazer nesses degraus. Seria como se fosse um um fundo com transparência e daí dentro do outro ele vai botando mais cor, mais cor, mais cor, ou não, na verdade eu já crio 10 ou 12 degraus já prontos, quando tiver que usar eu só uso ali, por exemplo, o badminton, ele falou, é um um degrau apenas. Mas eu não entendi quando é que eu uso dois, uso o segundo degrau. E quando eu uso o terceiro, sei lá, o décimo, isso não não entendi. Não entendi sobre os degraus ainda. Ah, e talvez ainda também não tá tão claro sobre as cores de texto. Você falou ali os nomes, mas acho que é bom dar uma pincelada. Por isso que eu vou precisar de uma resposta bem mais longa agora, porque eu vou adotar essa escola ah, no meu produto, porque assim, como você disse, dá mais destaque ao conteúdo. Eu tô fazendo um aplicativo de receitas receitas onde o conteúdo é a coisa mais importante. A receita é a coisa mais importante. O que o usuário escreveu é a coisa mais importante. Então, vai ser isso, vai vai ser muito mais destaque para a receita o conteúdo. Então, me parece que a terceira escola, que eu não lembro o nome, é para para isso. A primeira escola que eu também esqueci um pouco o nome, eh, me parece muito sobre o produto, né? Ah, vou estar usando um aplicativo de um banco. Me parece muito sobre ele, né? Ah, carrega as características do banco. Mas o o segundo, a segunda escola também não ficou tão clara. caminho terceiro, terceira escola, é onde ela é usada, onde está o que manda o conteúdo. A primeira e a segunda, por enquanto na minha cabeça são intercambiáveis, mas eu precisava ter uma pergunta para eu definir. Eu preciso perguntar para o meu cliente, ele vai me dizer, ah, eu quero isso, daí eu sei qual escola eu vou ir, por qual caminho eu vou ir. Ah, e é isso. Eu quero uma resposta bem longa porque eu não entendi muito bem ainda, eu preciso ter bem esclarecido aí sobre a terceira escola.*

Response: A **Escola Monocromática / Accent-Driven** (também chamada de Minimalista ou Driven by Accent) utiliza escalas neutras pigmentadas e atribuições cirúrgicas para destacar o conteúdo sobre a marca.

**Os Tons de Azul, Água e Sépia: Exemplos de Neutros Pigmentados**

Aqueles tons (água, sépia, azul frio) não são regras fixas, mas sim exemplos de **neutros pigmentados**.

A Terceira Escola não obriga o uso de cinza puro (preto e branco). Uma marca pode definir que toda a sua escala neutra tenha 2% de pigmentação azulada (cinza-azulado), amadeirada (sépia) ou esverdeada (cinza-água). Essas variações continuam sendo **superfícies neutras de baixo contraste** (fundo de tela, cards, barras), e não cores vibrantes de marca. A cor viva (o tom saturado) fica exclusivamente reservada para a variável de **Accent**.

**A Régua dos 12 Degraus Neutros**

Na Terceira Escola, a camada de neutros não usa transparências dinâmicas no runtime para criar variações, mas sim uma **escala estrita de 10 a 12 degraus pré-calculados** (baseada na escala de cinzas/neutros da Radix UI e da Apple).

Cada degrau tem um papel semântico fixo na interface para evitar adivinhações:

| Degrau da Escala | Papel Semântico no Sistema | Exemplo de Aplicação Real |
| :---- | :---- | :---- |
| **Degrau 1** | Fundo Base (Canvas) | A tela de fundo principal da aplicação. |
| **Degrau 2** | Fundo Secundário / Painel | Barra lateral, fundo de cartões sutis. |
| **Degrau 3** | Superfície de Componente em Repouso | Fundo de um Badge, fundo do Botão Secundário. |
| **Degrau 4** | Superfície de Componente em Hover | Estado ao passar o mouse em um card ou botão sutil. |
| **Degrau 5** | Superfície de Componente Ativo / Pressionado | Estado de clique em elementos neutros. |
| **Degrau 6** | Bordas Subtis e Divisores | Linhas de divisão entre receitas ou listas. |
| **Degrau 7** | Bordas Interativas em Repouso | Borda de um input de busca ou card selecionável. |
| **Degrau 8** | Bordas Interativas em Hover / Foco | Borda de um campo de texto em foco. |
| **Degrau 9** | Elemento Sólido Neutro de Alto Impacto | Fundo de botão escuro ou etiqueta de destaque neutro. |
| **Degrau 10** | Elemento Sólido em Hover | Hover de botões neutros de alto contraste. |
| **Degrau 11** | Texto Secundário / Subtil | Descrição da receita, tempo de preparo, badges. |
| **Degrau 12** | Texto Principal / Emfático | Título da receita, nomes de ingredientes, cabeçalhos. |

**Nomenclatura de Textos na Terceira Escola**

Em vez de criar termos como on-primary ou text-brand, a Terceira Escola mapeia os textos diretamente para os últimos degraus da escala neutra:

> * **Texto Principal (text-bold ou text-primary):** Aponta para o Degrau 12\. Garante o máximo de contraste e leitura para títulos e conteúdos principais.  
> * **Texto Secundário (text-subtle ou text-secondary):** Aponta para o Degrau 11\. Reduz levemente o peso visual para informações de apoio (como o badge "Arquivo \+1" ou tempo de preparo).  
> * **Texto Desabilitado (text-muted):** Aponta para o Degrau 8\. Reservado para textos inativos ou *placeholders* de campos de busca.

**Aplicação em um Aplicativo de Receitas**

Para um aplicativo de receitas, onde a foto do prato e o texto do modo de preparo são os protagonistas:

> * **O Fundo:** Usa o Degrau 1 (Branco ou Cinza-Sépia muito claro).  
> * **Os Cards de Ingredientes:** Usam o Degrau 2 ou 3 para criar uma leve separação visual.  
> * **As Tags de Categoria (ex: "Sem Glúten"):** Usam fundo no Degrau 3 com texto no Degrau 11 (exatamente o comportamento do badge citado).  
> * **O Botão Secundário ("Imprimir Receita"):** Usa fundo no Degrau 3 e texto no Degrau 12\.  
> * **O Botão Terciário ("Compartilhar"):** Fica transparente em repouso e ganha o Degrau 3 apenas no hover.  
> * **O Botão Primário ("Iniciar Modo Cozinha"):** Usa a única cor vibrante da tela, o token de **Accent** (ex: um laranja ou verde vibrante).

**Critérios para Decidir a Escola do Cliente**

Para decidir qual escola aplicar no gerador de Design System sem hesitação, a escolha é baseada na prioridade do produto:

> * **Escola 1 — Hierárquica / Marca (Material Design / Salesforce):**  
  * *Foco do produto:* Identidade visual e presença de marca em primeiro lugar.  
  * *Quando escolher:* Aplicativos bancários, e-commerce de grande varejo ou produtos institucionais onde a marca precisa ser lembrada em cada tela.  
> * **Escola 2 — Funcional / Intenção (Atlassian / Shopify):**  
  * *Foco do produto:* Operações complexas, dashboards e fluxos de trabalho densos.  
  * *Quando escolher:* Painéis B2B, SaaS financeiros, ferramentas de gestão ou sistemas de saúde com múltiplos alertas (danger, warning, info).  
> * **Escola 3 — Monocromática / Accent-Driven (Apple / Vercel / Radix / Gemini):**  
  * *Foco do produto:* Conteúdo, leitura, elegância e facilidade para *White-Label*.  
  * *Quando escolher:* Aplicativos de receitas, leitores de conteúdo, editores de texto, ferramentas de produtividade minimalistas ou quando o cliente deseja alterar a marca inteira mudando apenas uma cor de destaque.

**A Pergunta de Ouro para o Cliente:**

*"O seu produto precisa fixar a marca com cores em todos os cantos da tela, precisa gerenciar processos operacionais complexos cheios de estados visuais diferentes, ou deve agir como uma tela limpa e minimalista onde o conteúdo do usuário é o único destaque?"*

---

*User prompt: Agora algumas perguntas sobre o que você disse aí do da escola de accent, ou a escola minimalista. Você falou vários nomes ali. É sempre bom ficar repetindo eles porque aí eu vou gravar. Você falou aí sobre vários tons de cinza, tons neutros no caso, não são cinzas neutros. Mas tem também tons de accent, ou ele é único? Ah, então o accent, ele tem degraus? Isso eu fiquei na dúvida. E o accent, por exemplo, ele tem accent para bem saturado, onde ele tem contraste com branco, por exemplo, lá, né? Eu tô numa página branca, boto uma cor de água, de accent bem forte e e agora o texto muda para branco. Ou ele tem que se continuar sendo preto, eu não sei, ele, o tom dele, ele pode chegar a bem mais contraste ou não? Ah, é inerente, está atrelado ser minimalista com esse, essa escola ou não? Eu posso tentar não ser minimalista e seguir essa escola. Porque eu queria um aplicativo com bastante personalidade, mas eu vejo que essa escola é a certa para mim, porque eu preciso destacar as receitas, eu não posso competir. Então, mas eu não gosto muito de tão simples, tão simples, as coisas, não gosto de ser tão minimalista. Mas não tem problema, eu vou seguir essa escola, se ela, se ela obriga a ser minimalista, tudo bem. Eu só estou perguntando como é que funciona. Outra coisa, o tom dos neutros, eles, ele é diferente do tom do accent? Quando eu te pergunto, por exemplo, eu posso ter os neutros em tons de papel, né, porque é um caderno. E o accent em tons de caneta, caneta azul. E agora a última pergunta, ali fala que o a camada dois, a semântica, ela tem ali, ah, vai ter texto para, para, para cabeçalho, vai ter texto de botão, vai ter fundo para botão, um fundo para badge, essas coisas, né? A gente já tá falando em componente aqui, que é uma parte errada, mas assim, eu não sei como é que se chama, mas eu preciso entender, ela referencia a primeira ou a segunda camada, quando diz, ah, vai ter o neutro 1, 2, 3 até 12\. É, a camada semântica, ela tá referenciando os neutros da primeira, com quais nomes? Como é que eu, como é que eu faço a semântica dessa segunda? Quais são os nomes dela? Ou eu mantenho já na segunda com esses nomes neutros e uso na terceira direto no componente? Parece que aumenta muito a camada de componente, né? Então, preciso entender como é que organiza agora as camadas usando essa escola.*

Response: A **Escola Monocromática / Accent-Driven** (também chamada de **Escola Minimalista** ou **Driven by Accent**) não impõe uma interface sem graça: ela apenas organiza a arquitetura para que o conteúdo principal seja o grande protagonista visual.

**Os Nomes da Terceira Escola** Para gravar e fixar o vocabulário, essa abordagem é conhecida no mercado por três nomes principais: **Escola Monocromática**, **Escola Accent-Driven** (ou Driven by Accent) e **Escola Minimalista (ou Baseada em Destaque)**.

**Variações de Accent e Contraste**

> * **Micro-escala do Accent:** O Accent não precisa ser uma cor única e engessada. Ele costuma ter de 3 a 4 degraus funcionais: o tom sutil (usado em fundos leves de seleção ou badges), o tom sólido (para o preenchimento de botões primários) e o tom de interação (usado nos estados de hover ou clique).  
> * **Regra de Contraste:** Se você aplicar um Accent forte e saturado (como um azul caneta vibrante), o texto por cima muda para branco para garantir acessibilidade. Se o Accent for um tom clarinho ou pastel, o texto sobre ele permanece escuro.

**Minimalismo Estrutural vs. Personalidade da Interface** Essa escola **não obriga a interface a ser fria ou genérica**. O termo "minimalista" refere-se à *arquitetura de tokens* (evitar pintar a tela com cinco cores vibrantes ao mesmo tempo), e não à falta de identidade. O seu aplicativo de receitas pode ter enorme personalidade: os neutros podem ter um tom acolhedor de papel artesanal, a tipografia pode ser elegante e as fotos dos pratos trarão a cor viva. A estrutura apenas garante que o aplicativo não brigue visualmente com as receitas.

**Tom dos Neutros vs. Tom do Accent** Sua metáfora de "fundo tom de papel" com "accent tom de caneta azul" está irretocável. Os neutros podem ter uma pigmentação quente (sépia, creme, palha), enquanto o Accent é uma cor fria e contrastante. Eles não precisam ter a mesma base de cor.

**Organização das Camadas sem Inflar os Componentes** Para conectar a régua dos 12 degraus à camada semântica sem virar uma bagunça, o fluxo entre as camadas funciona da seguinte forma:

> * **Camada 1 (Primitivos):** Contém a escala pura numerada (por exemplo, de neutro-1 até neutro-12).  
> * **Camada 2 (Semântica):** É onde nasce a tradução funcional. Em vez de usar números soltos no sistema, a camada 2 faz os apontamentos por intenção: superfície-base aponta para neutro-1, superfície-card aponta para neutro-2, borda-sutil aponta para neutro-6, texto-secundário aponta para neutro-11 e texto-principal aponta para neutro-12.  
> * **Camada 3 (Componentes / Provedores):** O componente não precisa saber qual é o número da cor. O botão secundário simplesmente consome a variável de superfície-card ou texto-principal definida na camada 2\.

Com essa estrutura, a Camada 2 absorve toda a inteligência da régua dos 12 degraus, mantendo a camada de componentes leve, previsível e totalmente pronta para customização.

---

*User prompt: Como eu vou revisar algumas coisas, outras eu ainda tenho dúvida, tá para confirmar. Então eu posso ter duas cores que vão ser as cores neutras, que pode ser um cinza ou uma leve pigmentação de alguma cor, com 12 tons, e uma cor de accent que vai ter, acho que você falou uns três ou quatro tons, não lembro bem. E para entender quanto ao, aos textos, eles seguem neutro? Então, pelo que você falou, ali sim, né? É, tem exceção assim de texto com outra cor, com a cor de accent? Por exemplo, botão secundário em cor de accent, pelo que eu olho aqui no aplicativo da Google, não. Parece que, ao que tudo indica, a única cor, a única cor accent da tela é só o botão de enviar. Então, acho que talvez o Spotify seja só o botão de play, não sei. É, são as dúvidas. É, é nesse caminho que eu me torno minimalista em deixar só um botão com cor. Outra coisa, o Gemini, ele usa os, a cor de accent em baixo contraste, uma cor sutil, só que ela muda, obviamente, ela tem mais saturação do que o resto, né? Não é a cor neutra. Mas o Spotify já não. O Spotify já usa a cor semântica, a cor semântica, desculpa, a cor de accent já com muito mais saturação e daí ele já tem que inverter a cor, né? Ele já, o texto dele já se torna branco. E eu não sei, não sei essa parte, me parece muito mais minimalista o Gemini. O Spotify não me dá essa impressão de ser minimalista desse jeito, por mais que me pareça usar a mesma escola, mas posso estar enganado. Então, são essas as dúvidas aí. Eu quero entender como eu consigo criar algo assim, que eu dou destaque ao conteúdo, não seja tão minimalista, como eu consigo ser mais minimalista, caso alguém peça também. E sobre essas duas abordagens assim de tá fazendo um pouco mais baixo contraste, mais alto contraste, se faz parte da, da escola a, a cor accent com alto contraste também. Então, me fala aí.*

Response: Na Escola Accent-Driven (Monocromática / Driven by Accent), a cor de destaque (**Accent**) e a régua de neutros possuem regras bem delimitadas para equilibrar contraste, hierarquia e legibilidade.

**Tons de Accent, Neutros e Hierarquia de Texto**

A cor de **Accent** não precisa ser um valor único e engessado. Ela é organizada em uma micro-escala funcional de 3 a 4 degraus:

> * **accent-subtle:** Tom pastel ou de baixa saturação, usado para fundos leves de seleção ou badges.  
> * **accent-solid:** Tom principal e saturado, usado no preenchimento do botão primário ou elementos de ação máxima.  
> * **accent-hover / accent-active:** Variações do tom sólido para feedback visual de interação.

A vasta maioria dos textos (títulos, parágrafos, rótulos de botões secundários e badges) consome exclusivamente a escala de **neutros**. O texto principal consome o topo da régua neutra (neutral-12 / preto ou cinza denso), enquanto descrições e metadados usam o degrau anterior (neutral-11 / cinza sutil). Textos com a cor de Accent são exceções pontuais, como links soltos no corpo de um texto ou indicadores de estado ativo.

**Accent de Alto Contraste vs. Baixo Contraste (Spotify vs. Gemini)**

Tanto o Gemini quanto o Spotify pertencem à **Escola Accent-Driven**. A diferença está no nível de saturação da cor e na regra de inversão de texto:

> * **Baixo Contraste (Estilo Gemini):** O destaque usa um tom sutil ou claro (como um azul pastel). Como o fundo da ação não é escuro, o texto por cima permanece escuro (neutral-12).  
> * **Alto Contraste (Estilo Spotify / Apple):** O destaque usa uma cor fortemente saturada (como o verde do Spotify ou o azul do iOS). Nesses casos, a regra de acessibilidade exige a inversão: o texto sobre o Accent passa a ser branco ou neutro de alto contraste (on-accent).

**Personalidade sem Disputar com o Conteúdo**

Esta escola não obriga o aplicativo a ser "sem graça" ou frio. Em um aplicativo de receitas, a identidade vem da **pigmentação dos neutros** e da **tipografia**:

> * **Neutros Temáticos:** Em vez de cinza industrial frio, a régua de 12 degraus pode ser calibrada com tons quentes de papel, sépia ou creme.  
> * **Protagonismo Visual:** As fotos dos pratos e os títulos das receitas trazem a cor e o dinamismo da tela. A estrutura neutra garante que a interface não dispute atenção com o conteúdo do usuário.

**Mapeamento da Camada Semântica (Camada 2\)**

A Camada 2 mapeia a intenção, evitando expor os degraus numerados da Camada 1 diretamente aos componentes:

> * surface-base ➔ neutral-1 (canvas de fundo da aplicação)  
> * surface-subtle ➔ neutral-2 ou neutral-3 (cards, badges e botões secundários)  
> * border-subtle ➔ neutral-6 (divisores de lista de ingredientes)  
> * text-primary ➔ neutral-12 (título da receita)  
> * text-secondary ➔ neutral-11 (tempo de preparo e rendimento)  
> * action-primary-bg ➔ accent-solid

**Pergunta de Decisão para o Cliente**

Para definir qual escola aplicar em um projeto novo, apresente ao cliente a escolha de prioridade visual:

**"O seu produto precisa destacar a Marca em todos os cantos (Hierárquica), gerenciar Processos Operacionais complexos com múltiplos alertas visuais (Funcional), ou atuar como uma Tela Limpa e elegante onde o conteúdo do usuário é o único protagonista (Accent-Driven)?"**

---

Response: A **Escola Monocromática / Accent-Driven** (também conhecida como **Minimalista** ou **Driven by Accent**) não limita a interface a uma única cor estática nem exige um visual sem personalidade. Ela organiza os tokens para que a estrutura neutra dê destaque total ao conteúdo (como imagens e receitas).

**A Micro-escala do Accent e o Nível de Contraste**

O token de Accent não é uma cor única: ele opera em uma micro-escala de 3 a 4 degraus funcionais:

> * **accent-subtle:** Tom pastel ou de baixo contraste, usado para fundos leves de seleção ou badges.  
> * **accent-solid:** Tom vibrante e saturado, usado no preenchimento do botão primário ou ações principais.  
> * **accent-hover / accent-active:** Variações de interatividade para estados de foco e clique.

A diferença entre a abordagem do Gemini (baixo contraste) e do Spotify (alto contraste) está na saturação do tom sólido e na regra de inversão:

> * **Estilo Gemini (Baixo Contraste):** O destaque usa um tom pastel suave. Como a cor de fundo não é escura, o texto que vai sobre ela continua usando o neutro escuro padrão (text-primary / neutral-12).  
> * **Estilo Spotify (Alto Contraste):** O destaque usa um tom fortemente saturado (como o verde elétrico). Nesses casos, o texto que vai sobre o Accent exige a inversão para garantir acessibilidade, usando um token específico de contraste como on-accent (que aponta para o branco ou neutro de alto contraste).

**Personalidade da Marca vs. Minimalismo (App de Receitas)**

Ser minimalista nesta escola refere-se à **arquitetura de tokens** (não poluir a tela com 5 cores vibrantes de marca ao mesmo tempo), e não à ausência de identidade visual.

> * **Neutros Pigmentados:** Os neutros podem ser calibrados com tons quentes de papel artesanal, sépia ou linho (nos degraus 1 a 3 da régua de neutros).  
> * **Accent Contrastante:** O Accent pode ser um tom forte de caneta azul ou terracota.  
> * **Protagonismo Visual:** Em um aplicativo de receitas, as fotos dos pratos e a tipografia trazem a alma do produto. A estrutura neutra apenas garante que a interface não dispute atenção com o conteúdo da receita.

**Organização sem Inchar a Camada de Componentes**

Para evitar duplicar variáveis ou expor os 12 degraus primitivos aos componentes, a **Camada 2 (Semântica)** faz a ponte de abstração:

> * **Camada 1 (Primitivos):** neutral-1 até neutral-12, e accent-1 até accent-4.  
> * **Camada 2 (Semântica):** Mapeia a intenção da interface:  
  * surface-base ➔ aponta para neutral-1  
  * surface-subtle ➔ aponta para neutral-3 (usado em badges e botões secundários)  
  * text-primary ➔ aponta para neutral-12 (títulos e textos de alto contraste)  
  * text-secondary ➔ aponta para neutral-11 (metadados e badges)  
  * action-primary-bg ➔ aponta para accent-solid  
> * **Camada 3 (Componentes):** O botão consome apenas \--button-bg: var(--action-primary-bg). O componente não precisa saber qual é a cor hexadecimal nem o número do degrau.

**Nomes das Três Escolas e Pergunta de Decisão para o Cliente**

Para consolidar as opções no seu gerador de Design System:

> 1. **Escola Hierárquica / Baseada em Marca (Material Design & Salesforce):** Focada em presença de marca e relevância visual (primary, secondary, container).  
> 2. **Escola Funcional / Baseada em Intenção (Atlassian & Shopify Polaris):** Focada em papéis operacionais explícitos (action, interaction, selected, danger).  
> 3. **Escola Monocromática / Accent-Driven (Apple HIG, Vercel & Radix UI):** Focada no conteúdo, minimalismo e facilidade para *white-label* (accent, neutral-subtle, neutral-bold).

Para definir qual arquitetura gerar, apresente a seguinte pergunta ao cliente:

*"Qual é a prioridade visual do seu produto: reafirmar a identidade da Marca em todos os cantos da tela (Hierárquica), gerenciar Processos Operacionais densos com múltiplos alertas funcionais (Funcional), ou atuar como uma Tela Limpa e elegante onde o conteúdo do usuário é o único protagonista (Accent-Driven)?"*

---

*User prompt: Releia a minha mensagem anterior, porque você tá voltando a falar de coisas antigas, ah, repetindo coisas. Eu quero que tu foque naquela pergunta anterior. Porque você tá sempre acabando, já, acho que você já falou pela segunda, terceira vez, que no final você pergunta, ah, o que que você quer perguntar pro cliente. Mas eu não falei sobre isso na última vez. Eu quero que você ah, responda aquele assunto e não responda de novo falando muito sobre os nomes, sobre quando usar as coisas. Não, leia ali a mensagem e responda.*

Response: A Escola Accent-Driven (Monocromática) flexibiliza a criação de contrastes e identidades visuais marcantes sem sobrecarregar a interface nem rivalizar com o conteúdo principal.

**Degraus de Accent e Regras de Contraste**

> * **Micro-escala do Accent:** O Accent não é uma cor única, mas uma escala funcional de 3 a 4 degraus: um tom sutil (accent-subtle) para fundos leves e badges, um tom sólido (accent-solid) para ações primárias, e variações de estado (accent-hover/accent-active).  
> * **Regra de Contraste do Texto:** Se o accent-solid for escuro ou muito saturado (como azul caneta), o texto sobre ele torna-se claro/branco (on-accent). Se o Accent for um tom de baixo contraste (como um pastel sutil), o texto por cima permanece escuro (text-primary).

**Personalidade da Marca vs. Arquitetura Minimalista**

> * **Estilo vs. Arquitetura:** O termo "minimalista" nesta escola refere-se à contenção de cores da estrutura para não disputar atenção com o conteúdo, e não à falta de identidade.  
> * **Neutros Pigmentados e Accent:** Sua combinação de fundo tom de papel (sépia/palha) com Accent tom de caneta é perfeita. Os neutros podem ter pigmentação quente enquanto o Accent traz o contraste. Em um aplicativo de receitas, a personalidade vem do tom das superfícies, da tipografia e da fotografia dos pratos.

**Mapeamento da Camada 2 (Semântica) sem Inchar a Camada 3** A Camada 2 faz a tradução funcional da régua de 12 degraus neutros e dos degraus de Accent. Ela atribui nomes de intenção para que a Camada 3 (componentes) consuma apenas papéis genéricos, mantendo-se leve e sem duplicidades:

> * **surface-base**: Aponta para o neutro-1 (fundo de tela).  
> * **surface-subtle**: Aponta para o neutro-3 (fundo de cards, badges e botões secundários).  
> * **border-subtle**: Aponta para o neutro-6 (divisores de lista de ingredientes).  
> * **text-primary**: Aponta para o neutro-12 (títulos das receitas e textos de maior leitura).  
> * **text-secondary**: Aponta para o neutro-11 (tempo de preparo, porções e metadados).  
> * **action-primary-bg**: Aponta para o accent-solid (fundo do botão de ação principal).

Com este modelo, o componente consome diretamente a variável da Camada 2 (como surface-subtle ou text-primary). A Camada 3 permanece enxuta, agnóstica de biblioteca e totalmente configurável na Camada 2\.

---

*User prompt: sobre a cor accent, a cor que vai estar em destaque. Eu fiquei na dúvida agora sobre os botões, se existe então um botão secundário que não tem a cor accent, ou sei lá, se o botão secundário pode ser, mas ele não é preenchido. É, eu não entendi muito bem ainda como funciona nessa abordagem, nessa escola. Porque pelo que eu vi ali, parece ser um elemento ou três elementos assim em tela, que vai ser o menu ativo, vai ter a cor, ah, a cor accent, o botão principal e não lembro, pode ser que tenha um checkbox em tela ali, que também vai, vai ter essa cor primária ali, accent, e o resto não tem. Ah, então, é, deve ter essa abordagem de botão primário, secundário, essas coisas, ou não deveria, deveria ter só dizer assim, ó, agora este elemento, em toda essa tela, este elemento é o que está em destaque.*

Response: A hierarquia de botões (Primário, Secundário e Terciário) continua existindo na Escola Accent-Driven, mas com uma regra estrita de aplicação visual para não poluir a interface. A cor de Accent viva é reservada para a ação principal, enquanto as ações secundárias dependem da escala de neutros ou de variações sutis.

**Anatomia dos Botões na Escola Accent-Driven**

> * **Botão Primário:** Consome o token accent-solid (a cor viva e saturada) no seu preenchimento para atrair o olhar diretamente para a ação principal da tela.  
> * **Botão Secundário:** Não utiliza o preenchimento vivo da cor de Accent. Ele é construído com um fundo neutro sutil (Degrau 3 da régua de neutros) e texto denso (Degrau 12), ou através de um formato contornado (*outline*) em tom neutro com fundo transparente. Caso seja necessário dar um leve toque visual da marca, pode-se aplicar o token accent-subtle (um tom de Accent extremamente suave e claro).  
> * **Botão Terciário (Ghost):** É totalmente transparente no seu estado de descanso, ativando apenas uma leve superfície neutra ao passar o mouse ou receber foco.

**A Regra da Presença Cirúrgica do Accent**

A cor de Accent não fica travada a um único ponto isolado na tela inteira, mas sua presença é aplicada de forma cirúrgica para que o foco visual não seja pulverizado:

> * **Botão Primário de Ação:** Reservado para a ação principal do formulário ou da página.  
> * **Indicadores de Seleção:** A aba (*tab*) ativa ou o item marcado no menu.  
> * **Estados de Componentes:** O estado marcado (*checked*) em um *checkbox* ou a borda de foco (*focus ring*) em um campo de entrada.

Manter as variantes semânticas de botão primário, secundário e terciário evita ter que definir de forma improvisada em qual tela o destaque entra. A camada de componentes continua utilizando a nomenclatura tradicional de hierarquia, enquanto a Camada 2 mapeia os tokens para que apenas o botão primário receba o preenchimento forte de Accent, deixando todo o restante gravitando suavemente pela régua neutra.

---

*User prompt: que eu devo estar usando cores tons neutros além do base para diferenciar elementos de layout como menu, menus, barra de navegação, header, ah, cabeçalhos, ah, ali de modais ou rodapés de modais, ou isso não é relevante o suficiente para ter uma cor diferente da cor base. Eu deveria estar guardando, sei lá, umas cores uns outros degraus já para começar a destacar elementos mais, como badges que a gente falou, já botou um, ou algum elemento clicável, não sei. Então, eu fiquei nessa dúvida porque o aplicativo hoje que eu tenho, ele usa muito, muito tom. Só que eu não tô usando essa abordagem, então eu tô pensando em, se eu for para essa abordagem, eu acho que eu vou usar uma cor só. Mas eu não tenho, eu não sei qual que é o certo, então, misturou.*

Response: Na Escola Accent-Driven, a diferenciação de elementos de layout como menus, headers e modais não exige pintar fundos com cores contrastantes ou chamativas. A estrutura da página é separada por trocas sutis nos dois primeiros degraus neutros, sombras ou bordas finas, reservando os degraus seguintes para componentes e elementos clicáveis.

**Diferenciação de Layout (Menus, Headers e Modais)**

> * **Fundo da Tela (Canvas):** Utiliza o Degrau 1 como a cor base principal e limpa da aplicação.  
> * **Barra de Navegação e Headers:** Podem manter a cor base (Degrau 1\) acompanhada de uma borda sutil na divisória inferior (Degrau 6), ou usar o Degrau 2 para criar uma leve percepção de plano separado sem carregar a tela.  
> * **Modais e Rodapés de Modais:** O modal utiliza o Degrau 1 ou Degrau 2 em sua superfície inteira, contando com a elevação por sombra para se destacar do fundo. Não é necessário pintar o cabeçalho ou o rodapé do modal com um tom escuro diferente da área central.  
> * **Cards e Divisores:** Para separar blocos de conteúdo, utiliza-se o fundo no Degrau 1 com borda sutil (Degrau 6\) ou aplica-se o fundo no Degrau 2 sem a necessidade de bordas.

**Reserva de Degraus para Componentes e Elementos Clicáveis**

> * **Badges e Tags:** Consomem o Degrau 3 para a superfície do fundo e o Degrau 11 para o texto, criando uma etiqueta neutra sem competir com o resto da interface.  
> * **Botões Secundários:** Utilizam o preenchimento no Degrau 3 neutro com texto no Degrau 12, ou uma borda no Degrau 7 com fundo transparente. Para dar um toque suave de marca, podem usar o token accent-subtle.  
> * **Botão Primário e Destaques:** O token accent-solid e a cor vibrante ficam estritamente reservados para o botão de ação principal, a aba ativa no menu e estados marcados de seleções.

Dessa forma, você simplifica o excesso de tons do seu aplicativo atual: o layout permanece limpo utilizando apenas os dois primeiros degraus neutros para fundos e divisórias. Isso economiza os degraus intermediários para bordas, botões e badges, garantindo que o conteúdo e as ações principais tenham total destaque visual.

---

*User prompt: Ah, questão de cores, ah, se eu for aplicar ali no meu gerador de design system, ela fica muito simplificada a colocar duas pigmentações, ah, onde eu coloco ali a pigmentação neutra e a pigmentação accent. E com isso ele consegue gerar todos os tons neutros, né, que são 12, todos os tons accent, que eu acho que são três. E e ser usado em todas as camadas, em todos os componentes, né, para que todos os os elementos semânticos para ser usados nos componentes, se eu entendi bem.*

Response: Sim, a sua lógica está totalmente correta: fornecer apenas duas pigmentações de entrada (a **pigmentação neutra** e a **pigmentação de accent**) é o ápice da simplificação para um gerador baseado na **Escola Accent-Driven**.

A beleza desse modelo é que você reduz a complexidade de configuração para o usuário sem perder a solidez da arquitetura de tokens.

**O Fluxo de Geração Automática**

> * **1\. Entrada de Dados (2 Pigmentações):** O usuário escolhe a matriz da cor neutra (ex: um cinza-azulado ou um sépia/papel quente) e a cor de destaque/accent (ex: um azul forte ou terracota).  
> * **2\. Camada 1 (Primitivos Calculados):** A partir dessas duas matrizes, o motor do gerador (usando um algoritmo de cor perceptual como OKLCH) calcula automaticamente:  
  * A régua de **12 degraus neutros pigmentados** (do degrau 1 para superfícies claras até o degrau 12 para textos de alto contraste).  
  * A micro-escala de **3 a 4 degraus de Accent** (accent-subtle para seleções e badges leves, accent-solid para ações primárias e variações de *hover/active*).  
> * **3\. Camada 2 (Contrato Semântico Fixo):** Os valores calculados preenchem automaticamente o contrato fixo de tokens semânticos sem exigir intervenção manual:  
  * surface-base ➔ recebe o neutro 1  
  * surface-subtle ➔ recebe o neutro 3  
  * text-primary ➔ recebe o neutro 12  
  * text-secondary ➔ recebe o neutro 11  
  * action-primary-bg ➔ recebe o accent-solid  
> * **4\. Camada 3 (Componentes e Adaptadores):** Os componentes locais e adaptadores das bibliotecas (como Bootstrap ou CoreUI) consomem os tokens semânticos já alimentados, garantindo que tudo funcione em harmonia visual e passe nos testes de contraste.

**Por que essa abordagem é ideal para o seu Gerador?**

> * **White-Label Instantâneo:** Trocar a identidade inteira de um projeto exige alterar apenas 2 parâmetros.  
> * **Contrato Rígido e Previsível:** A Camada 2 mantém a sua estrutura fixa (os seus 111 tokens semânticos ou a escala padrão), o que evita a necessidade de declarar *fallbacks* na camada de componentes ou adaptadores.  
> * **Garantia de Acessibilidade:** Se o algoritmo da Camada 1 for calibrado corretamente em OKLCH, a régua de 12 degraus neutros e os degraus de accent sempre terão os contrastes corretos entre si, independentemente da cor que o usuário escolher.

---

*User prompt: dia simplificação de dois pigmentos, mas ainda vai faltar um pouco de personalidade para como tomar as decisões do que fazer com esses pigmentos e pigmentos, quais tons eu vou estar usando daqueles dos neutros e dos accent. Por exemplo, como a gente falou, o Spotify prefere uma cor mais saturada, ou melhor, uma cor mais contrastante. Então, outros outros já preferem uma cor mais lavada e não tem com pouco destaque, mesmo sendo uma cor mais saturada, ela tem um contraste menor. Ah, então ficou essa dúvida, o que que mais eu talvez deveria estar parametrizando para criação do design system, além dos dois pigmentos. O que que mais é relevante para uma configuração rápida de desenhar um design system que não seja tão genérico, mesmo estando usando uma abordagem monocromática, uma abordagem monocromática mais minimalista.*

Response: Para transformar uma arquitetura monocromática em algo único sem poluir a interface, o seu gerador precisa parametrizar as decisões de estilo que dão personalidade à marca através de cinco configurações fundamentais além das duas pigmentações base.

**1\. Modo de Destaque e Saturação do Accent (Perfil Spotify vs. Gemini)**

> * **Accent de Alto Contraste (Estilo Spotify):** Utiliza a cor de destaque saturada e viva no preenchimento de ações primárias, exigindo um token de inversão de contraste (on-accent) com texto claro ou branco.  
> * **Accent de Baixo Contraste (Estilo Gemini):** Utiliza um tom sutil ou pastel na cor de destaque, mantendo o texto por cima em tom escuro.  
> * Oferecer a escolha entre o perfil "Vibrante/Imersivo" e "Sutil/Suave" dita como a ação principal salta aos olhos do usuário na tela.

**2\. Intensidade da Pigmentação dos Neutros (Temperatura Visual)**

> * Definir a porcentagem de saturação injetada na régua dos 12 degraus neutros (como 0% para cinza puro, 2% para um tom suave de papel/sépia ou 5% para um tom frio/slate). Essa variação transforma o visual do produto de um aplicativo frio de tecnologia em um caderno de receitas acolhedor sem alterar os contratos semânticos.

**3\. Pareamento Tipográfico (A Alma do Minimalismo)**

> * Em sistemas baseados na terceira escola, a tipografia responde por grande parte da identidade visual. Parametrizar a escolha do par de fontes (por exemplo, uma fonte *Serif* acolhedora para títulos de receitas combinada com uma *Sans-serif* funcional para o corpo do texto) elimina a sensação de interface genérica.

**4\. Geometria de Cantos (Border Radius)**

> * **Orgânico / Amigável (Radius Alto ou Pill):** Transmite acolhimento, leveza e proximidade, combinação ideal para alimentos, receitas e estilo de vida.  
> * **Rígido / Técnico (Radius Baixo ou Reto):** Transmite precisão, foco em dados e utilidade corporativa.

**5\. Estratégia de Separação de Superfícies**

> * **Linhas Subtis:** Mantém o fundo no Degrau 1 e separa seções e cards usando bordas finas no Degrau 6\.  
> * **Alternância de Tons:** Separa blocos variando entre o Degrau 1 e o Degrau 2 de fundo sem utilizar linhas.  
> * **Sombras e Elevação:** Mantém as superfícies limpas e usa profundidade sutil para destacar modais e cartões.

Incluir essas escolhas no seu questionário inicial permite entregar um Design System altamente personalizado e com forte assinatura visual, mantendo a simplicidade de gerar todos os tokens a partir de poucas entradas.

---

*User prompt: que nem que eu ainda estou em 111 tokens, porque eu acabei fazendo para todas as escolas ao mesmo tempo, então eu acabei gerando mais do que 111 tokens semânticos. Ah, agora eu vou querer editar focado apenas na na na escola na escola na escola accent driven. Como fica essa essa camada semântica? Porque me fale o nome de tokens semânticos de cores, no caso, que referenciam pelo menos um de cada ah, cor da da camada core, da camada global, da primeira camada. Então, que referencie todos os degraus neutros e todas as os degraus ah, accent. Então, que eu que eu veja que todos eles vão estar em uso na segunda camada de de camada semântica. E eu quero que você faça então isso baseado em conhecimento, baseado em pesquisas da web também. Ah, é preciso entender como está sendo feito, quais são os padrões de mercado para para fazer essa camada semântica usando o accent driven.*

Response: Na arquitetura da **Escola Monocromática / Accent-Driven**, a camada semântica elimina termos vinculados a marcas (primary-container, secondary-brand) e traduz a régua dos 12 degraus neutros e os 4 degraus de accent em papéis funcionais diretos de interface.

**Mapeamento Semântico dos Neutros (Degraus 1 ao 12\)**

| Token Semântico | Apontamento Primitivo | Papel Funcional na Interface |
| :---- | :---- | :---- |
| surface-base | neutral-1 | Fundo principal da aplicação (Canvas). |
| surface-panel | neutral-2 | Fundo secundário, barras laterais, headers e modais. |
| surface-element | neutral-3 | Fundo em repouso de botões secundários, badges e cards. |
| surface-element-hover | neutral-4 | Estado hover de componentes neutros em repouso. |
| surface-element-active | neutral-5 | Estado pressionado/clicado de elementos neutros em descanso. |
| border-subtle | neutral-6 | Linhas divisórias de listas e separadores de seções. |
| border-element | neutral-7 | Bordas de inputs, cards e botões secundários em repouso. |
| border-element-hover | neutral-8 | Bordas de campos interativos em foco ou hover. |
| surface-neutral-bold | neutral-9 | Preenchimento sólido neutro de alto contraste (ex: botão neutro primário). |
| surface-neutral-bold-hover | neutral-10 | Hover de preenchimentos sólidos neutros. |
| text-secondary | neutral-11 | Textos secundários, descrições, metadados e ícones de apoio. |
| text-primary | neutral-12 | Títulos, textos principais e conteúdos de alto contraste. |

**Mapeamento Semântico do Accent (Degraus 1 ao 4\)**

| Token Semântico | Apontamento Primitivo | Papel Funcional na Interface |
| :---- | :---- | :---- |
| surface-accent-subtle | accent-1 | Fundo sutil para itens selecionados em menus, tabs e badges leves. |
| border-accent | accent-2 | Borda de destaque, anel de foco (*focus ring*) e marcadores ativos. |
| action-primary-bg | accent-3 | Preenchimento sólido do botão principal e elementos de ação primários. |
| action-primary-bg-hover | accent-4 | Estado hover/ativo do botão principal. |
| text-on-accent | neutral-1 ou white | Texto ou ícone de contraste exibido sobre o preenchimento sólido de Accent. |

**Estrutura e Enxugamento da Camada Semântica**

> * **Contrato Reduzido:** Ao focar exclusivamente nesta escola, a quantidade de tokens semânticos de cores cai de 111 para um conjunto enxuto de cerca de 17 variáveis essenciais.  
> * **Independência de Componentes:** Variáveis como text-primary e surface-element são consumidas pela Camada 3 ou pelos adaptadores sem que o componente precise saber qual degrau numérico está por trás.  
> * **Reatividade de Tema (Dark Mode):** O suporte a temas em tempo de execução ocorre na redefinição dos apontamentos primitivos na Camada 2 via :root e \[data-theme="dark"\], mantendo o contrato de nomenclatura consumido pelos componentes 100% estável.

---

