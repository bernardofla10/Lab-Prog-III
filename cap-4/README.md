### 1. Relação entre JavaScript e TypeScript

O TypeScript é definido como um **Superset (Superset)** do JavaScript. Isso significa que:

* Todo código JavaScript válido também é um código TypeScript válido.


* O JavaScript é uma linguagem **fracamente tipada**, onde não é necessário explicitar tipos e uma mesma variável pode assumir diferentes tipos ao longo da execução.


* O TypeScript adiciona recursos de **tipagem estática**, interfaces e outros conceitos de programação orientada a objetos ao ecossistema dinâmico do JS.


* **Princípio de Runtime:** O TypeScript nunca altera o comportamento de execução do código JavaScript. Se um código for movido de JS para TS, ele funcionará da mesma maneira, mesmo que o compilador aponte erros de tipo.



### 2. Tipagem Estática vs. Dinâmica

Exemplo de uma função `soma(a, b)` para ilustrar a segurança da tipagem:

* **Em JavaScript:** Se você passar `"2"` (string) e `3` (número), o resultado será `"23"` devido à concatenação, o que pode ser um comportamento inesperado.


* **Em TypeScript:** Ao anotar os parâmetros como `number`, o código `soma("2", 3)` gera um **erro em tempo de compilação**, impedindo que o erro chegue à execução.



### 3. Transpilação vs. Compilação

Uma distinção técnica importante feita é a diferença entre esses dois processos:

* **Compilação:** É a conversão de código-fonte para linguagem de máquina (baixo nível), gerando binários. Exemplos incluem C e C++.


* **Transpilação:** É a conversão de código de uma linguagem para outra, mantendo um nível de abstração semelhante e gerando outro código-fonte.


* O TypeScript é **transpilado** para JavaScript para que possa ser executado pelos navegadores ou pelo Node.js.





### 4. Configuração e O `tsconfig.json`

Para iniciar um projeto, utiliza-se o comando `npm install typescript` e `npx tsc --init` para gerar o arquivo de configuração `tsconfig.json`. As principais opções de compilador explicadas são:

* **`target`**: Define a versão do JavaScript de saída (ex: "es2016").


* **`module`**: Define o sistema de módulos (ex: "esnext" para import/export).


* **`strict`**: Habilita todas as checagens rigorosas de tipo.


* **`rootDir`**: Indica onde estão os arquivos TypeScript de entrada (ex: pasta `src`).


* **`outDir`**: Define para onde os arquivos JavaScript convertidos serão enviados (ex: pasta `dist`).



### 5. Processo Prático de Conversão

Ao executar o comando `npx tsc`, o compilador lê os arquivos `.ts` e gera arquivos `.js` equivalentes.

* **Exemplo de saída:** Um código TS que define `let a: number = 21` será convertido para `let a = 21` em JS, removendo as anotações de tipo que não existem nativamente no JavaScript.