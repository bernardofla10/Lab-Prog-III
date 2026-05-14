**Classes** descreve a estrutura fundamental para programação orientada a objetos, destacando as funcionalidades que o TypeScript adiciona ao padrão do JavaScript.

### 1. Estrutura Básica e Instanciação

* As classes já existem no JavaScript desde o padrão ES6 (2015).


* O TypeScript aprimora essa estrutura ao permitir modificadores de visibilidade e tipagem explícita para os atributos.


* Para criar uma nova instância de uma classe, utiliza-se a palavra-chave `new`.


* Dentro da classe, a palavra-chave `this` é utilizada para fazer referência ao próprio objeto em execução.



### 2. O Construtor

* O construtor é o método responsável por inicializar o objeto e deve ser declarado obrigatoriamente com a palavra-chave `constructor`.


* Caso um construtor não seja definido manualmente, o JavaScript adiciona automaticamente um construtor vazio sem argumentos.



### 3. Modificadores de Acesso e Visibilidade

O TypeScript introduz modificadores que controlam como os atributos e métodos podem ser acessados:

* **`public` (Padrão)**: Membros são acessíveis de qualquer lugar, inclusive fora da classe.


* **`private`**: Membros são acessíveis apenas dentro da classe onde foram definidos.


* **`protected`**: Membros são acessíveis dentro da própria classe e em suas classes derivadas (filhas).


* **`readonly`**: Impede que um atributo seja reatribuído após sua inicialização no construtor.



### 4. Herança

* Para definir que uma classe herda características de outra, utiliza-se a palavra-chave `extends`.


* O método `super()` deve ser chamado dentro do construtor da classe filha para executar o construtor da classe pai e passar parâmetros necessários.



### 5. Implementação de Interfaces

* A palavra-chave `implements` é utilizada para garantir que uma classe siga rigorosamente o formato (contrato) definido por uma interface.


* Isso obriga a classe a fornecer implementações concretas para todos os métodos e propriedades descritos na interface.



### 6. Membros Estáticos

* Membros marcados com `static` pertencem à classe em si, e não às suas instâncias individuais.


* Isso significa que podem ser acessados diretamente através do nome da classe, sem a necessidade de criar um objeto com `new`.