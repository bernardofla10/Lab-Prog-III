O tópico "Angular" detalha a arquitetura, as ferramentas e os paradigmas reativos deste framework específico.

### 1. Definição e Diferenciais do Angular

O Angular é um framework JavaScript de frontend mantido pelo Google.

* **Rigor e Padronização:** Apresenta uma estrutura robusta desde o início e promove a padronização entre múltiplos projetos, embora essa arquitetura seja considerada mais rígida.


* **Ecossistema Completo:** É nativamente mais completo do que outras opções de mercado, incluindo roteamento, formulários e o Angular CLI por padrão.


* **Ferramental:** Possui excelente integração nativa com a linguagem TypeScript e oferece suporte a testes (unitários com Jasmine/Karma) por padrão na sua configuração inicial.



### 2. Angular CLI e Estrutura do Projeto

A interface de linha de comando (CLI) automatiza a criação e gerência do projeto. Os principais comandos são:

* `ng new <project-name>`: Cria um novo projeto Angular.


* `ng serve` ou `npm start`: Inicia o servidor de desenvolvimento.


* `ng generate component <nome>` / `ng generate service <nome>`: Gera novos arquivos de componentes ou serviços automaticamente.


* `ng build`: Compila a aplicação para ambiente de produção.



A árvore de arquivos gerada inclui estruturas fundamentais como:

* `index.html`: Ponto de entrada da SPA, onde a tag raiz `<app-root>` é inserida para a renderização da interface.


* `main.ts`: O arquivo principal responsável por inicializar a aplicação.


* `angular.json`: Centraliza configurações de build, serve, mapeamento de assets e caminhos do projeto.


* Arquivos `tsconfig` (`.json`, `.app.json`, `.spec.json`): Controlam o comportamento e o escopo do compilador TypeScript.



### 3. Componentes e Templates

Os componentes são a unidade básica de construção da interface. Eles operam de forma modular, sendo reutilizáveis e combináveis.
Um componente Angular é obrigatoriamente composto por quatro elementos:

1. Um *Decorator* `@Component` que define os metadados.


2. Uma classe TypeScript contendo a lógica e o estado (dados).


3. Um template HTML (interface), que pode ser escrito no mesmo arquivo (inline) ou em um arquivo `.html` externo.


4. Um arquivo de estilização (CSS ou SCSS) isolado.



**Mecanismos de Data Binding**
O framework mapeia a comunicação entre a classe TypeScript e o template HTML usando quatro sintaxes declarativas:

* **Interpolação (`{{ valor }}`):** Exibe o valor de variáveis diretamente no HTML.


* **Property Binding (`[property]="valor"`):** Transfere dados unidirecionalmente do componente para o atributo de um elemento HTML.


* **Event Binding (`(evento)="função()"`):** Intercepta e responde a ações (como cliques) disparadas pelo usuário.


* **Two-way Binding (`[(ngModel)]="valor"`):** Garante sincronização bidirecional do estado entre um input do usuário e a variável na classe.



### 4. Roteamento (Router)

O roteamento mapeia caminhos de URL para a renderização de componentes específicos, viabilizando a navegação de uma Single Page Application sem o recarregamento total do navegador.

* **Configuração:** As rotas são exportadas como um array de objetos `Routes` (ex: `{ path: 'home', component: HomeComponent }`).


* **Parâmetros e Aninhamento:** O Router suporta a criação de rotas aninhadas e a extração de parâmetros dinâmicos via URL.


* **Renderização:** Na estrutura HTML, os links de navegação utilizam a diretiva `routerLink` no lugar do atributo estático `href`, e os componentes requisitados pela rota ativa são injetados diretamente na tag especial `<router-outlet />`.



### 5. Atualização da UI: Detecção de Mudanças e Signals

O framework moderno introduziu uma reformulação arquitetural para lidar com reatividade.

**Modelo Tradicional:**

* O Angular intercepta assincronamente os eventos de interação.


* Isso dispara a rotina de *Change Detection*, que percorre toda a árvore de componentes do DOM.


* Ele reavalia integralmente os bindings do template para verificar mutações de estado, resultando em sobrecarga e ineficiência de processamento em aplicações complexas.



**Novo Paradigma: Signals**
Para resolver o problema de performance em escala, o Angular adotou os Signals.

* Um signal é uma estrutura de dado estrita e reativa. Ao sofrer mutação, notifica o framework automaticamente sobre o local exato da alteração.


* Isso aciona atualizações localizadas exclusivamente na porção do DOM afetada, eliminando a varredura completa da árvore.


* **Sintaxe e Regras de Operação:**
* A declaração inicial é feita como `count = signal(0)`. Valores computados dependentes usam a função `computed()`.


* O valor encapsulado deve ser lido invocando a variável como função: `this.count()`.


* Atribuições imperativas da linguagem (`count = 10`) geram erro ou ignoram a reatividade.


* A mutação do estado de um signal exige os métodos do framework: `count.set(5)` para substituição direta, ou `count.update(value => value + 1)` para cálculos derivados do estado prévio.