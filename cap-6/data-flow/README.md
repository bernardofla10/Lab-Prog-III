### 1. O Paradigma do Fluxo de Dados Unidirecional

O framework adota um modelo de **fluxo de dados unidirecional** (*unidirectional data flow*), o que significa que os dados possuem um único caminho de propagação na árvore de componentes: de cima para baixo (dos componentes pais para os filhos).

* **Dados (Props)** fluem estritamente de cima para baixo.
* **Eventos (Callbacks)** fluem de baixo para cima, permitindo que componentes filhos notifiquem os pais sobre interações do usuário.

---

### 2. Mecanismo de Props (Propriedades)

As *Props* (abreviação de *properties*) são os blocos de construção que permitem a customização e a passagem de parâmetros para os componentes.

* **Imutabilidade Absoluta**: Do ponto de vista do componente que as recebe, as *props* são estritamente de **apenas leitura** (*read-only*). Um componente filho jamais deve tentar alterar ou mutar o objeto `props` internamente.
* **Passagem Declarativa**: São especificadas na sintaxe JSX como atributos de tags. Por exemplo:
```jsx
<ExibirMensagem texto="Engenharia de Computação" numero={4} />

```


* **Consumo no Componente Funcional**: O componente filho recebe as propriedades centralizadas em um único objeto como argumento de sua função:
```javascript
function ExibirMensagem(props) {
  return <Text>{props.texto} - Ano: {props.numero}</Text>;
}

```



---

### 3. Mecanismo de State (Estado Local)

Enquanto as *props* configuram o componente externamente, o *State* representa a memória interna, viva e mutável de um componente.

* **Reatividade e Ciclo de Renderização**: O estado é o motor da interface gráfica. Toda vez que o valor de um estado é alterado, o React Native intercepta a modificação e força uma **re-renderização** (*re-render*) automática do componente e de toda a sua árvore de descendentes.
* **Componentes de Classe vs. Componentes Funcionais**: O material estabelece o paralelo didático de como o estado evoluiu:
  * *Classes (Legado)*: Manipulado via objeto global `this.state` no construtor e atualizado imperativamente pelo método `this.setState()`.
  * *Funcionais (Moderno/Hooks)*: Gerenciado por meio do Hook `useState`.



---

### 4. Gerenciamento Prático com o Hook `useState`

O material foca na sintaxe padrão da biblioteca do React para a criação e modificação de estados em componentes funcionais.

* **Sintaxe Canônica**:
```javascript
const [contador, setContador] = useState(0);

```


* **Decomposição Técnica**:
1. `useState(0)`: Inicializa o estado com o valor padrão (neste caso, o inteiro `0`).
2. `contador`: A variável que armazena o valor atual do estado para leitura dentro do JSX.
3. `setContador`: A **função despachante/modificadora** única e exclusiva.


* **Regra de Mutação**: É um erro conceitual grave tentar alterar a variável diretamente (ex: `contador = contador + 1`). A alteração deve obrigatoriamente ocorrer via função modificadora (`setContador(contador + 1)`), pois apenas ela possui a assinatura interna capaz de notificar a engine do framework para redesenhar a tela.

---

### 5. Fluxo de Dados Reverso e Elevação de Estado (*Lifting State Up*)

Quando dois ou mais componentes irmãos precisam compartilhar o mesmo dado, ou quando um componente filho precisa alterar uma informação no componente pai, aplica-se o padrão de **Elevação de Estado**.

* **Passagem de Callbacks via Props**: Como o fluxo é estritamente descendente, o pai passa uma função (geralmente uma *arrow function* que encapsula o seu próprio modificador de estado) para o filho através de uma *prop*.
* **Execução**: O componente filho intercepta um evento físico de toque (ex: o atributo `onPress` de um `<Button>` ou `<TouchableOpacity>`) e executa a função recebida. Isso transfere o controle de volta ao escopo do pai, alterando o estado centralizado e redistribuindo os novos dados atualizados para os demais filhos via *props*.

---

### 6. Anatomia de um Exemplo Prático nos Slides (Páginas 45-50)

Para consolidar o fluxo de dados, as páginas finais desta seção estruturam um exemplo prático baseado em componentes modulares. O padrão arquitetural demonstrado segue esta lógica estrutural:

1. **Componente Principal (`App.js`)**: Atua como o detentor do estado legítimo da aplicação.
2. **Definição do Estado**: Instancia o `useState` para monitorar uma variável dinâmica (como um contador ou um alternador de telas).
3. **Distribuição**:
* Passa o valor do estado para um subcomponente visual (`<PainelDisplay valor={contador} />`) encarregado apenas de renderizar o texto.
* Passa a lógica de modificação para um subcomponente de ação (`<BotaoAcao acionar={() => setContador(contador + 1)} />`).


4. **Isolamento de Escopo**: Demonstra que cada componente possui responsabilidade única (SRP), onde o componente de exibição não sabe de onde o dado vem, e o componente de clique não sabe qual dado está alterando, blindando a arquitetura do aplicativo móvel contra acoplamento excessivo.