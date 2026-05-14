# Exercicio 1 - Modulos ESNext com TypeScript

Este exercicio demonstra como exportar uma funcao em um arquivo TypeScript e importa-la em outro usando a sintaxe ESNext (`import`/`export`).

## Estrutura

```text
ex1/
├── package.json
├── README.md
└── src/
    ├── main.ts
    ├── utils.ts
    └── tsconfig.json
```

## Arquivos principais

`src/utils.ts` exporta a funcao `somar`:

```ts
export function somar(a: number, b: number): number {
  return a + b;
}
```

`src/main.ts` importa e usa essa funcao:

```ts
import { somar } from "./utils.js";

const resultado: number = somar(10, 5);

console.log(`Resultado: ${resultado}`);
```

## Como rodar

Entre na pasta do exercicio:

```bash
cd cap-4/type-annotations/ex1
```

Compile o TypeScript:

```bash
npm run build
```

Execute o JavaScript gerado:

```bash
npm start
```

A saida esperada e:

```bash
Resultado: 15
```

## Observacao importante

Nao rode o arquivo TypeScript diretamente com Node:

```bash
node src/main.ts
```

O correto e compilar primeiro e depois executar o arquivo `.js` gerado pelo TypeScript.

Neste projeto, o arquivo final fica em:

```text
src/dist/main.js
```
