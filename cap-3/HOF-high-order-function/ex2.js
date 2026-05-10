// Em um sistema de vendas, você tem uma lista de pedidos com a quantidade comprada e o preço
// unitário.
// Escreva uma função, sem utilizar loops for, que calcule o valor total da venda somando o preço de todos
// os produtos comprados.

// Lista de produtos fornecida pelo exercício
var orders = [
{ product: "Laptop", price: 3000, quantity: 1 },
{ product: "Mouse", price: 50, quantity: 3 },
{ product: "Keyboard", price: 100, quantity: 2 }
];

var totalSales = orders.reduce((acc,order) => {
    return acc + (order.price * order.quantity);
}, 0);

console.log(totalSales);