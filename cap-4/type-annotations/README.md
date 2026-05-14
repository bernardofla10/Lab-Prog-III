**Tipos e Anotações de Tipo** detalha como o TypeScript permite definir explicitamente a natureza dos dados para garantir a integridade do código. Abaixo estão os detalhes fundamentais extraídos do documento:

---

## 1. Tipos Primitivos

Estes são os tipos básicos de dados utilizados para variáveis simples:

* **string**: Utilizado para armazenar cadeias de caracteres (texto). Exemplo: `let nome: string = "Alice"`.


* **number**: Representa qualquer tipo de número, incluindo valores inteiros e de ponto flutuante (decimais). Exemplo: `let idade: number = 30`.


* **boolean**: Armazena apenas os valores lógicos `true` (verdadeiro) ou `false` (falso).


* **bigint**: Destinado a armazenar números inteiros excessivamente grandes que ultrapassam o limite do tipo `number`. A sintaxe exige a adição de um caractere `n` ao final do número (ex: `9007...91n`) e está disponível apenas para versões ES2020+.



---

## 2. Tipos de Ausência de Valor

O TypeScript distingue diferentes formas de representar "nada":

* **null**: Indica a ausência intencional de um valor. É comumente utilizado em funções de busca onde, caso um registro não seja encontrado, o retorno é explicitamente nulo.


* **undefined**: Refere-se a variáveis que foram declaradas mas ainda não possuem um valor atribuído. Por padrão, funções que não possuem uma instrução de retorno devolvem `undefined`.



---

## 3. Tipos Especiais de Controle e Segurança

Existem tipos que oferecem flexibilidade ou restrições específicas para o compilador:

* **any**: Desabilita todas as verificações de tipo na variável, permitindo que ela assuma qualquer valor. O material enfatiza que **não é recomendado** utilizar este tipo, pois anula as vantagens de segurança do TypeScript.


* **unknown**: Similar ao `any`, permite qualquer valor, mas é considerado **mais seguro**. O compilador impede o uso direto de propriedades da variável até que uma checagem de tipo (**Type Guard**) seja realizada (ex: usando `typeof`).


* **void**: Utilizado quase exclusivamente no retorno de funções para indicar que elas executam uma ação, mas não devolvem nenhum dado.



---

## 4. Coleções e Estruturas de Dados

O material recomenda especificar sempre o tipo de dado contido em coleções:

* **Arrays**: É preferível explicitar o tipo dos itens da lista. Pode ser declarado como `tipo[]` ou `Array<tipo>`. Tentar inserir um dado de tipo diferente (como um número em uma lista de strings) resultará em erro.


* **Tuplas**: São arrays com um **número fixo de elementos** e tipos pré-definidos para cada posição. Exemplo: `let pessoa: [string, number] = ["João", 25]`.



---

## 5. Inferência de Tipos

O TypeScript possui um mecanismo de **Inferência de Tipos**, o que significa que ele consegue identificar automaticamente o tipo de uma variável com base no valor atribuído no momento da criação, mesmo que o programador não escreva a anotação explicitamente.