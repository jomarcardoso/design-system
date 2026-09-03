Sobre o fundo ser sutil, lavado, percebi que tenho um mínimo de contraste para isso ficar bom.

Alguns casos talvez precisaria da borda para dar o contraste mínimo.

Você acha então que eu posso estar mesclando técnicas na mesma página, usando às vezes baixa saturação, às vezes mais alta, alto contraste, baixo contraste, às vezes o texto continua na cor da página, às vezes na mesma cor, assim. Você acha que dá para fazer composições assim?

---

Sim, mesclar essas técnicas na mesma página não só é perfeitamente viável, como é a forma correta de construir hierarquia visual sem poluir a interface. O segredo para a composição funcionar é atrelar cada variação gráfica (alto contraste, tom lavado, bordas e inversão de texto) à prioridade funcional de cada elemento na tela.

**A Régua de Intensidade por Papel na Tela**

- **Ação Primária (Sólido + Alto Contraste):** Preenchimento na cor vibrante saturada (`accent-solid`) com inversão do texto para tom claro ou branco (`on-accent`). Atrai o olhar imediatamente e deve ser reservado ao botão de ação principal da tela.

- **Estados Ativos e Seleções (Tom Suave + Texto Accent):** Fundo levemente lavado/suave (`accent-subtle`) combinado com texto ou ícone no tom denso de destaque. Funciona perfeitamente para abas ativas, chips de filtro selecionados e badges de contexto.

- **Controles Secundários (Neutro Suave + Texto da Página):** Fundo neutro de apoio (Degrau 3) mantendo o texto na cor padrão de leitura da página (Degrau 12). Se o tom do fundo for sutil demais contra a página, adiciona-se uma borda sutil de 1px (Degrau 6 ou 7) para garantir o contraste mínimo sem escurecer o fundo.

- **Ações Terciárias e Utilitários (Ghost / Texto Solto):** Sem fundo ou borda em repouso. O elemento consome o tom do texto ou a cor de destaque solta sobre a folha, ganhando um fundo sutil apenas ao passar o mouse.

**A Borda como Ferramenta de Precisão**

Quando o fundo sutil de um componente tem baixo contraste contra a superfície (como um chip sobre um card de receita), você tem duas opções: escurecer o preenchimento ou adicionar uma borda.

Em interfaces minimalistas, a melhor opção costuma ser manter o preenchimento bem claro e usar uma borda fina de 1px (Degrau 6/7). Isso entrega o contraste mínimo exigido pelo olho humano sem deixar a superfície com aspecto pesado ou "sujo". Variar essas técnicas em uma mesma tela é o que permite ter elementos fortes, elementos de apoio e elementos quase invisíveis convivendo em total harmonia.

---

Eu tinha pensado que o contraste não era tão importante, que importava era o contraste da cor do texto. E acho que eu tava errado, porque eu achei que o o efeito visual não ficou bom. Então eu acho que tem que seguir aquela regra aquela regra de que os fundos também têm um contraste mínimo, né? Se não me engano, é 3 para 0 no segundo W3C. E eu vejo aplicações que usam sim o fundo sutil, lavado, e ainda assim ele tem o contraste mínimo necessário para que fique harmônico. Mas eu não sei se isso funciona em fundos que são diferentes de ou bem branco ou bem preto. Se ele vai funcionar, se existe um meio termo que vai dar contraste duas vezes, né? Porque tem que dar contraste com o fundo mínimo, e o texto dentro dele tem que dar outra vez o contraste mínimo. Então, eu não sei como é que são os cálculos para isso.

---

A intuição sobre a necessidade do duplo contraste está correta: para um container lavado ou sutil funcionar sobre uma página, existem dois cálculos de contraste independentes rodando ao mesmo tempo. O segredo para fundos sutis não parecerem pesados é que a regra de contraste para a "caixa" e a regra para o "texto" não usam o mesmo valor e nem o mesmo recurso gráfico.

**As Duas Regras Matemáticas do W3C (WCAG 2.1)**

- **Contraste de Texto e Conteúdo (WCAG 1.4.3):** Exige no mínimo **4.5:1** para texto normal sobre sua superfície imediata (ou **3:1** para textos grandes).

- **Contraste de Componentes Visuais e Interface (WCAG 1.4.11):** Exige no mínimo **3:1** para elementos gráficos, ícones e limites de componentes interativos contra o fundo.

**A Fórmula do Contraste de Luminância Relativa**

A norma da WCAG mede o contraste $CR$ (_Contrast Ratio_) comparando a luminância relativa $L_1$ (cor mais clara) e $L_2$ (cor mais escura) em um intervalo de 0.0 (preto puro) a 1.0 (branco puro):

$$CR = \frac{L_1 + 0.05}{L_2 + 0.05}$$

O valor $+0.05$ adicionado a ambas as variáveis representa a compensação da luz ambiente e a dispersão de luz no olho humano.

**O Dilema do Fundo Sutil ("Por que 3:1 no preenchimento estraga o visual?")**

Se você tentar atingir a proporção de **3:1** do W3C escurecendo unicamente a cor de preenchimento do container sobre uma página clara (ou clareando sobre uma página escura), o fundo deixará de ser um "tom sutil" e passará a ser um bloco denso e pesado na tela.

Para manter o visual lavado em fundos neutros intermediários (como cores de papel, cinzas pigmentados ou tons médios), o design de interfaces utiliza duas soluções matemáticas:

- **Distribuição por Borda de 1px (Degrau 6/7):** O preenchimento do container mantém um contraste propositalmente baixo em relação à página (frequentemente entre **1.1:1** e **1.3:1**), entregando o aspecto sutil. O limite funcional de **3:1** exigido para a identificação do componente é carregado por uma borda fina de 1px no Degrau 6 ou 7.

- **Ancoragem Estrutural pelo Texto Interno:** Em containers não interativos (como cards de receitas ou badges informativos), a norma do W3C não exige que o fundo do card tenha **3:1** contra a página, desde que o texto interno mantenha **4.5:1** sobre o preenchimento sutil e a estrutura seja clara por alinhamento e espaçamento.

**Cálculo em Espaços Perceptuais (Régua OKLCH)**

Ao usar uma escala de neutros calibrada em OKLCH, o cálculo do duplo contraste em fundos que não são preto nem branco puro se resolve variando a luminosidade $L$:

- **Canvas da Página (Degrau 1):** Lightness $L = 97\%$ (tom base do papel).

- **Preenchimento Sutil do Card (Degrau 2 ou 3):** Lightness $L = 93\%$ (uma redução suave de $4\%$ na luz cria a superfície lavada sem pesar).

- **Borda de Delimitação (Degrau 6):** Lightness $L = 80\%$ (garante a linha fina para o limite geométrico).

- **Texto Principal (Degrau 12):** Lightness $L = 20\%$ (garante um contraste elevado superior a **10:1** sobre o preenchimento de $93\%$, superando com folga os **4.5:1** exigidos).
