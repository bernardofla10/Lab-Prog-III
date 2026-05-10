// Você trabalha em um e-commerce e precisa filtrar os produtos que estão disponíveis no estoque.
// Escreva uma função, sem utilizar loops for, que receba uma lista de produtos e retorne apenas aqueles
// que têm quantidade maior que zero.

// Lista de produtos dada pelo exercício
var products = [
{ name: "Laptop", price: 3000, quantity: 5 },
{ name: "Mouse", price: 50, quantity: 0 },
{ name: "Keyboard", price: 100, quantity: 2 },
{ name: "Monitor", price: 700, quantity: 0 },
{ name: "Headset", price: 150, quantity: 3 }
];

// Resolução utilizando Programação Declarativa (função filter())
var availableProducts = products.filter(product => product.quantity > 0);

console.log(availableProducts);