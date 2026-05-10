// Você trabalha para um e-commerce e precisa processar uma lista de pedidos. Seu objetivo é:
//  - Filtrar os pedidos que já foram entregues (status === "delivered").
//  - Transformar a lista para um novo formato, contendo apenas id, totalPrice e customerName.
//  - Calcular o faturamento total do e-commerce a partir desses pedidos.
// Retorne todos os dados em um único JSON.

var orders = [
{ id: 1, customerName: "Alice", totalPrice: 120, status: "delivered" },
{ id: 2, customerName: "Bob", totalPrice: 200, status: "pending" },
{ id: 3, customerName: "Charlie", totalPrice: 450, status: "delivered" },
{ id: 4, customerName: "David", totalPrice: 300, status: "canceled" },
{ id: 5, customerName: "Eve", totalPrice: 150, status: "delivered" }
];

// Filtrar pedidos com status "delivered"
var deliveredOrders = orders.filter(order => order.status === "delivered");

// Transformar para o novo formato (usar map() que gera um array novo de mesmo tamanho)
var formattedOrders = deliveredOrders.map(order => ({
    id: order.id,
    totalPrice: order.totalPrice,
    customerName: order.customerName
}));

// Calcular o faturamento total (usar reduce())
var totalRevenue = deliveredOrders.reduce((acc,order) => acc + order.totalPrice, 0);

// Unificar tudo em um único JSON
var finalReport = {
    orders: formattedOrders,
    totalRevenue: totalRevenue
};

console.log(finalReport);