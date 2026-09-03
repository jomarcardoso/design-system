A arquitetura de **Design System Accent-Driven** (orientada a acento de cor) é uma filosofia de tokens e estilização focada na separação estrita entre a estrutura neutra da interface e uma matriz de acento dinâmica responsável por interações, destaques e identidade visual. Diferente das abordagens legadas que mantêm paletas extensas de cores primárias, secundárias e terciárias fixas por componente, a escola _accent-driven_ simplifica a hierarquia ao parametrizar toda a interatividade ao redor de uma escala de acento intercambiável.

**Pilares Fundamentais**

- **Divisão Bipolar de Superfícies**: Toda a interface é categorizada em dois grandes grupos: a estrutura neutra (fundos, bordas, cartões, divisores e textos corporativos) e a camada de acento (botões de ação principal, seleções, estados de foco, indicadores e destaques).
- **Mapeamento Por Papéis Funcionais**: Os tokens semânticos não fazem referência a nomes de cores literais, mas a intenções funcionais baseadas em posições na escala de acento.
- **Acessibilidade Algorítmica**: A relação entre o fundo do acento e o texto sobreposto é regulada por regras fixas de contraste calculadas a partir de passos específicos da escala (por exemplo, aplicando automaticamente texto escuro ou claro conforme o brilho do acento).
- **Intercambiabilidade Temática**: A marca ou o tema do usuário pode ser alterado globalmente pela substituição da matriz de acento, mantendo intacta toda a lógica neutra e a estrutura dos componentes.

**Arquitetura de Tokens**

| Camada de Token         | Função na Escola Accent-Driven                                    | Exemplo Prático                                       |
| ----------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| **Global (Primitivo)**  | Define os valores brutos de cor e escalas cromáticas numéricas.   | `blue-600`, `zinc-900`, `emerald-500`                 |
| **Semântico Neutro**    | Mapeia a estrutura espacial e a hierarquia de leitura da tela.    | `surface-background`, `text-primary`, `border-subtle` |
| **Semântico de Acento** | Define papéis de ação, foco e destaque baseados no acento ativo.  | `accent-solid`, `accent-hover`, `accent-focus-ring`   |
| **Componente**          | Consome diretamente os tokens semânticos sem definir novas cores. | `button-primary-bg: var(--accent-solid)`              |

**Benefícios e Desafios de Implementação**

- **Redução Drástica do Volume de Tokens**: Elimina centenas de tokens redundantes criados exclusivamente para variações de cores de componentes.
- **Manutenibilidade Simplificada**: Atualizar o tom visual de um produto exige a alteração de poucas variáveis globais no topo do gráfico de dependência de tokens.
- **Homogeneização Visual**: Um possível desafio dessa abordagem é a perda de distinção entre produtos de marcas diferentes caso ambas utilizem a mesma estrutura neutra e variem apenas a cor de acento.
- **Restrição para Marcas Multicoloridas**: Marcas com identidades compostas por múltiplos tons concorrentes exigem adaptações na arquitetura para evitar conflitos com a regra de acento dominante.

Essa metodologia é amplamente adotada em bibliotecas modernas e sistemas de design de grande escala por garantir escalabilidade técnica rápida e consistência em modos claros e escuros.
