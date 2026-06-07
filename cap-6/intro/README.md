### 1. Conceito de Desenvolvimento Híbrido e Filosofia do Framework

* **Desenvolvimento Híbrido**: É definido pelo princípio de manter um único código-fonte (*codebase*) capaz de ser compilado para gerar múltiplos pacotes executáveis (*builds*) destinados a diferentes plataformas.
* **Vantagens Técnicas e Econômicas**: Quatro vantagens centrais: redução do custo de desenvolvimento, simplificação e maior frequência de atualizações, fornecimento de uma experiência de interface unificada entre múltiplos sistemas operacionais, e o reaproveitamento direto de tecnologias e do conhecimento prévio oriundo do desenvolvimento Web.
* **Filosofia do React Native**: O framework adota o slogan *"Learn once, write anywhere"* (Aprenda uma vez, escreva em qualquer lugar). Ele difere do React convencional porque, enquanto o React é uma biblioteca JavaScript voltada estritamente para a construção de interfaces de usuário (frequentemente Web), o React Native é uma biblioteca JavaScript expandida para a construção de aplicativos móveis e web. Sua principal característica é que os componentes declarados em JavaScript são convertidos diretamente em componentes nativos de cada plataforma. O projeto é suportado pela Meta (antigo Facebook).

### 2. Arquitetura e Mecanismo de Execução (Engine)

O material diferencia o comportamento do ciclo de vida da aplicação em duas fases de execução distintas:

* **Modo Desenvolvimento**: O desenvolvedor trabalha diretamente com as definições de Views (tags JSX) e código imperativo JavaScript lado a lado no ambiente local.
* **Modo Produção**: Ocorre uma bifurcação na execução. A camada de interface visual (Views) é **compilada**, tornando-se componentes 100% nativos da plataforma de destino. Paralelamente, a lógica de programação escrita em JavaScript não é compilada para código de máquina nativo; em vez disso, ela permanece como código JavaScript puro que é **interpretado** em tempo de execução por uma Máquina Virtual JavaScript (*VM Javascript*) interna. A comunicação entre o código JavaScript interpretado pela VM e os módulos nativos/APIs do sistema operacional é intermediada por uma estrutura lógica denominada **Ponte (Bridge)**.

### 3. Configuração do Ambiente de Desenvolvimento e Instalação

Para estabelecer o ambiente local, o material aponta os caminhos de documentação para Windows, Linux e macOS, listando os seguintes componentes obrigatórios:

* **Editor de Código**: Visual Studio Code (ou similar).
* **Ambiente de Emulação**: Android Studio acompanhado de seu emulador integrado (*built-in emulator*).
* **Runtime e Gerenciador de Pacotes**: Node.js (versão 8 ou superior) e o Node Package Manager (npm).
* **Interfaces de Linha de Comando**: React Native CLI.
* **Ambiente de Compilação Java**: Java e Java Development Kit (JDK).

### 4. Ecossistema Expo e Plataforma Snack

Como alternativa ou facilitador de infraestrutura, o material introduz o **Expo** e o **Expo Snack**:

* **Inicialização via Expo**: O projeto padrão é inicializado no terminal através do comando `$ npx create-expo-app MyFirstExpoApp --template blank`. Para a execução do projeto, utiliza-se a navegação até o diretório (`cd MyFirstExpoApp`) seguida por um dos comandos npm: `npm run android` (para emuladores/dispositivos Android), `npm run ios` (exige ambiente macOS para build local, ou o uso do aplicativo Expo mobile para desenvolvimento sem Mac) ou `npm run web`.
* **Expo Snack**: É apresentado como uma plataforma online (disponível em `https://snack.expo.dev/`) que fornece um editor web completo e emuladores em tempo real para testar o código diretamente no navegador nas plataformas Android, iOS e Web, sem necessidade de configuração local de SDKs.

### 5. Anatomia e Estrutura de Arquivos de um Projeto Expo

O material detalha o propósito técnico de cada arquivo na raiz de uma aplicação Expo inicializada:

* **`App.js`**: Consiste no arquivo da aplicação principal. É o ponto de entrada a partir do qual todos os demais componentes e comandos do sistema são disparados e orquestrados.
* **`app.json`**: Funciona como o manifesto oficial do projeto. Armazena metadados de configuração global da aplicação, tais como o nome do app (`name`), identificador de rota (`slug`), versão (`version`), orientação da tela (`orientation`), caminho do ícone padrão (`icon`), estilo da interface (`userInterfaceStyle`), além de configurações para a tela de carregamento (`splash`) e ícones adaptativos específicos do Android/iOS.
* **`babel.config.js`**: Arquivo de configuração do Babel, ferramenta encarregada de transpilar código JavaScript moderno (com recursos recentes do ES) para uma versão legada e universalmente compatível, assegurando que o app execute estavelmente em sistemas operacionais e runtimes mais antigos.
* **`package.json`**: Arquivo central do ecossistema Node.js que delimita as informações do projeto, centraliza os scripts automatizados de execução (como `start`, `android`, `ios`, `web`) e mapeia formalmente a lista de dependências e bibliotecas externas consumidas.
* **`package-lock.json`**: Arquivo gerado automaticamente pelo npm a cada modificação na árvore de módulos. Ele descreve com precisão matemática a versão exata de cada subdependência instalada em `node_modules`, blindando o projeto para que instalações futuras gerem árvores absolutamente idênticas e imunes a atualizações intermediárias de terceiros.
* **`assets`**: Diretório reservado para o armazenamento de ativos estáticos do projeto, englobando imagens locais, logotipos, fontes personalizadas e mídias em geral.
* **`node_modules`**: Pasta automática onde são descompactados os códigos brutos de todos os pacotes, submódulos e dependências Node.js necessários para a execução do framework.

### 6. Mapeamento Abstrato de Componentes de Interface (UI)

Os slides trazem uma matriz de equivalência técnica rigorosa, demonstrando como os componentes universais do React Native se traduzem nas APIs nativas e na Web:

| Componente React Native | Equivalente Android | Equivalente iOS | Análogo Web | Descrição Técnica do Comportamento |
| --- | --- | --- | --- | --- |
| **`<View>`** | `<ViewGroup>` | `<UIView>` | `<div>` (sem rolagem) | Bloco de container genérico que suporta estilização, posicionamento via Flexbox, acessibilidade e interceptação básica de eventos de toque. |
| **`<Text>`** | `<TextView>` | `<UITextView>` | `<p>` | Componente obrigatório para exibição e estilização de strings de texto textuais, suportando aninhamento e detecção de toques. |
| **`<Image>`** | `<ImageView>` | `<UIImageView>` | `<img>` | Componente dedicado à renderização e tratamento de diferentes formatos e origens de imagens. |
| **`<ScrollView>`** | `<ScrollView>` | `<UIScrollView>` | `<div>` (com rolagem) | Container genérico de rolagem capaz de abrigar múltiplos componentes visuais que extrapolam os limites físicos da tela. |
| **`<TextInput>`** | `<EditText>` | `<UITextField>` | `<input type="text">` | Componente de entrada de dados que permite ao usuário interagir digitando textos via teclado. |

### 7. Sintaxe ES6 e Padrões de Declaração de Componentes

O material documenta a transição e a coexistência de abordagens sintáticas na criação de componentes:

* **Componentes Funcionais modernos**: Podem ser declarados como funções padrão exportadas de forma inline (`export default function App() {}`), declaradas separadamente com exportação no rodapé, ou através de Arrow Functions vinculadas a constantes (`const App = () => {}`).
* **Componentes de Classe (Legados)**: O material exemplifica a sintaxe baseada em classes da especificação ES6 (`class App extends Component {}`). Essa estrutura exige explicitamente a chamada do método `super()` dentro do método `constructor()` para herdar as propriedades do React, e obriga o uso do método explícito `render() { return (...) }` para expor a árvore de componentes JSX à tela.

### 8. Estudo de Caso Prático: O Aplicativo `DadosApp`

Para amarrar os conceitos da introdução, as páginas finais desta seção apresentam a arquitetura de um código real voltado ao sorteio de dados (disponível em `https://snack.expo.dev/@vanzan.ime/dadosapp`). Este caso demonstra na prática:

* **Manipulação de Estado de Classe**: Inicialização do estado local no construtor através do objeto `this.state = { FacePadrao: 1 }`.
* **Lógica Algorítmica**: Implementação da função executiva `jogarDado = () => { ... }` que gera números pseudoaleatórios inteiros entre 1 e 5 limitados por `Math.floor(Math.random() * 5) + 1`.
* **Mutação de Estado e Renderização Dinâmica**: Uso obrigatório do método `this.setState` para atualizar o valor de `FacePadrao`, forçando o ciclo de vida do componente a reexecutar o método `render()`. Dentro do `render()`, avalia-se o estado corrente por meio de condicionais estritas (`if (cond == 1)`) para reatribuir dinamicamente a URI da imagem (`imgSource = images.d1.uri`) exibida dentro do componente visual, capturando a interação física do usuário por meio do wrapper `<TouchableHighlight onPress={() => this.jogarDado()}>`.