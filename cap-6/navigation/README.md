### 1. O Problema da Navegação em Ambientes Mobile

Diferentemente do desenvolvimento Web tradicional, no qual o roteamento é intrinsecamente atrelado a strings de URLs fornecidas e rastreadas pelo navegador, os aplicativos móveis operam em um ambiente sem barra de endereços nativa.

O material conceitua a navegação mobile como um gerenciamento dinâmico de pilhas e transições visuais, onde o framework precisa emular o histórico de navegação na memória RAM do dispositivo, definindo quais interfaces estão ativas, sobrepostas ou descartadas do ciclo de vida da aplicação.

---

### 2. Infraestrutura e Arquitetura do *React Navigation*

A arquitetura proposta estrutura-se a partir de um contêiner de estado global e provedores específicos de roteamento:

* **`NavigationContainer`**: Definido como o componente raiz obrigatório para qualquer fluxo de navegação. Ele atua como um provedor de contexto (*Context Provider*) que gerencia o estado de navegação do aplicativo e vincula a árvore de telas ao link de ações nativas do sistema operacional (como o botão físico ou por gestos de "Voltar" do Android/iOS).
* **Mecanismos de Navegadores (Navigators)**: O material foca primariamente no **Stack Navigator** (Navegação em Pilha), mas contextualiza o ecossistema que suporta múltiplos padrões visuais de alternância de telas.

---

### 3. Mecânica do Stack Navigator (Navegação em Pilha)

O **Stack Navigator** fornece uma transição de telas onde cada nova interface visitada é empilhada no topo da tela anterior.

* **Operação de Push (Empilhar)**: Quando o usuário avança para uma nova tela, a interface atual permanece renderizada logo abaixo na pilha, congelada, enquanto a nova tela é animada e posicionada no topo.
* **Operação de Pop (Desempilhar)**: Ao acionar o comando de retorno, a tela do topo é destruída (*unmounted*), liberando os recursos da memória, e a tela imediatamente inferior retoma o foco e o estado em que foi deixada.

---

### 4. Instalação de Dependências e Setup do Ambiente

Para habilitar o suporte a rotas, o material orienta a instalação em camadas de pacotes, assegurando a otimização de performance por meio de views nativas do sistema operacional:

1. **Instalação do Core**:
```bash
$ npm install @react-navigation/native

```


2. **Instalação das Dependências de Suporte Nativo** (essenciais para otimização de telas no Android e iOS através do Expo):
```bash
$ npx expo install react-native-screens react-native-safe-area-context

```


3. **Instalação do Módulo de Pilha (Native Stack)**:
```bash
$ npm install @react-navigation/native-stack

```



---

### 5. Sintaxe de Declaração e Estruturação de Telas

A implementação prática documentada nos slides exige a instanciação do objeto de navegação e a montagem declarativa no arquivo de entrada:

* **Instanciação**:
```javascript
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

```


O método `createNativeStackNavigator` retorna um objeto contendo dois componentes de ordem superior: `Stack.Navigator` e `Stack.Screen`.
* **Configuração Estrutural**:
```jsx
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Tela Inicial' }} 
        />
        <Stack.Screen 
          name="Detalhes" 
          component={DetailsScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

```


* `initialRouteName`: Define a string correspondente à tela padrão de carregamento.
* `name`: Identificador único da rota (utilizado programmaticamente para navegação).
* `component`: Referência direta à função ou classe que renderiza a interface daquela tela.
* `options`: Objeto de configuração visual (permite customizar títulos do cabeçalho, cores de fundo e botões de ação).



---

### 6. Execução Programática da Navegação

Quando uma tela é registrada dentro de um `Stack.Screen`, o React Navigation injeta automaticamente propriedades de controle no escopo desse componente. O material demonstra o uso da prop **`navigation`** para disparar transições imperativas:

* **Ação de Avanço**:
```javascript
function HomeScreen({ navigation }) {
  return (
    <Button 
      title="Ir para Detalhes" 
      onPress={() => navigation.navigate('Detalhes')} 
    />
  );
}

```


* **Ação de Retorno manual**: Utiliza-se `navigation.goBack()` para forçar o desempilhamento da rota atual via código.

---

### 7. Passagem e Consumo de Parâmetros entre Telas

O material dedica as páginas finais desta seção para detalhar como transacionar dados (como IDs de objetos ou strings de formulários) de uma interface para outra sem quebrar o fluxo unidirecional:

1. **Envio de Parâmetros**: São transmitidos como um segundo argumento opcional na função `Maps`:
```javascript
navigation.navigate('Detalhes', { itemId: 86, nomeProduto: 'Teclado Mecânico' });

```


2. **Recebimento de Parâmetros**: A tela de destino consome esses dados capturando a prop injetada **`route`**, acessando o subobjeto **`route.params`**:
```javascript
function DetailsScreen({ route, navigation }) {
  const { itemId, nomeProduto } = route.params;
  return (
    <View>
      <Text>ID do Produto: {itemId}</Text>
      <Text>Nome: {nomeProduto}</Text>
    </View>
  );
}

```



O bloco encerra-se consolidando que este mecanismo impede o acoplamento rígido entre telas, delegando à infraestrutura do *React Navigation* a responsabilidade de gerenciar as variáveis de rota de forma isolada durante as transições de visualização.