**Objetos** aborda a definição de estruturas de dados complexas, garantindo que elas sigam formatos específicos através de tipagem, contratos e aliases.

Abaixo estão os detalhes de cada sub-tópico apresentado:

### 1. Objetos com Tipos e Atributos Opcionais

A definição de objetos no TypeScript utiliza uma sintaxe semelhante à do JavaScript, mas adiciona anotações de tipo para cada atributo.

* **Anotação de Atributos**: Cada propriedade do objeto deve ter seu tipo especificado (ex: `nome: string; idade: number`).


* **Atributos Opcionais**: É possível definir que um atributo não é obrigatório adicionando o caractere `?` após o nome da variável ou atributo. Por exemplo, em um objeto onde a `idade` é opcional, ela é declarada como `idade?: number`.



### 2. Enum (Enumerações)

Os Enums permitem definir um conjunto de valores nomeados, facilitando a legibilidade do código.

* **Enums Numéricos**: Por padrão, os valores são numéricos e começam em 0 (zero), incrementando automaticamente. É possível definir um valor inicial customizado (ex: `Cima = 1`), e os seguintes seguirão a sequência (2, 3, etc.).


* **Valores Customizados**: Enums também podem mapear códigos específicos, como códigos de status HTTP (ex: `NotFound = 404`, `Success = 200`).


* **Enums de String**: Permitem que cada membro seja inicializado com um valor de string, o que é útil para representar estados de forma textual no console ou logs.



### 3. Alias (Apelidos de Tipo) e Union Types

* **Alias**: É uma forma de criar um rótulo ou nome para um tipo existente, permitindo reutilizar definições complexas. Por exemplo, pode-se definir `type CarYear = number` e depois usar `CarYear` em outras partes do código.


* **Union Types**: Utilizam o símbolo `|` para indicar que uma variável ou tipo pode aceitar mais de uma possibilidade de formato. Um exemplo comum é definir uma `Resposta` que pode ser do tipo `Sucesso` ou do tipo `Erro`.



### 4. Interfaces

Interfaces funcionam como "contratos" para garantir que um objeto possua um formato específico.

* **Diferencial**: Embora similares aos Aliases, as interfaces possuem funcionalidades extras, como a capacidade de **extensão**.


* **Extensão (`extends`)**: Uma interface pode herdar propriedades de outra. Por exemplo, uma interface `ColoredRectangle` pode estender a interface `Rectangle`, herdando os atributos `height` e `width` e adicionando o atributo `color`.



### 5. Casting

O **Casting** é o processo de informar ao compilador que uma variável deve ser tratada como um tipo diferente daquele que foi inicialmente identificado ou desconhecido (`unknown`).

* **Natureza**: O casting orienta o compilador, mas **não altera o tipo do dado em tempo de execução**.


* **Sintaxe**: Existem duas formas principais de realizar o casting no TypeScript:
1. Usando a palavra-chave `as` (ex: `valor as string`).


2. Usando a notação de tags (ex: `<string> valor`).