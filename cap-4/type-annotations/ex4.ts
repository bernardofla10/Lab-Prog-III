// - Declare uma tupla que representa um produto no formato [string, number]
// - O primeiro elemento é o nome do produto e o segundo é o preço
// - Crie uma função que receba essa tupla, formate e retorne uma frase como 
// "O produto X custa R$ Y" (onde X é o nome e Y é o preço).

const meuProduto: [string, number] = ["Monitor", 700];

const exibirPrecoProduto = (produto: [string, number]): string => {
    return `O produto ${produto[0]} custa R$ ${produto[1]}`;
};

console.log(exibirPrecoProduto(meuProduto));