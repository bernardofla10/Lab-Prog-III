// Importação de Módulos usando ESNext

// Crie uma biblioteca sua com dois arquivos:
// ● utils.ts: Deve exportar uma função chamada somar que recebe dois números (tipados)
//   e retorna a soma.
// ● main.ts: Deve importar a função somar de utils.ts, chamá-la com valores numéricos e
//   exibir o resultado no console.
// ● Dica: No seu tsconfig.json, garanta que "module" esteja configurado como "esnext" para
//   habilitar a sintaxe import/export no TypeScript.

import { somar } from "./utils.js"
const resultado: number = somar(10, 5);

console.log(`Resultado: ${resultado}`);
