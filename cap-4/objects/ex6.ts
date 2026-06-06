// - Defina uma interface Produto que contenha nome (string), preco (number) e uma
// propriedade opcional desconto (number).
// - Crie uma função calcularPrecoFinal que retorne o preço após aplicar o desconto (caso
// exista).

interface Produto {
    nome: string;
    preco: number;
    desconto?: number;
}

const calcularPrecoFinal = (produto: Produto): number => {
    if (produto.desconto !== undefined) {
        return produto.preco - produto.desconto;
    }
    return produto.preco;
};

// Exemplos de uso:
const produtoSemDesconto: Produto = { nome: "Teclado", preco: 150 };
const produtoComDesconto: Produto = { nome: "Monitor", preco: 1000, desconto: 150 };

console.log(calcularPrecoFinal(produtoSemDesconto)); // 150
console.log(calcularPrecoFinal(produtoComDesconto)); // 850