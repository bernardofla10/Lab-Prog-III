// - Crie um enum chamado EstadoPedido com três valores: Pendente, EmTransito, Entregue.
// - Em seguida, crie uma função atualizarPedido que receba um objeto pedido com uma
// propriedade estado (do tipo EstadoPedido) e atualize esse estado para o próximo passo.
// - Se o pedido estiver em Entregue, mostre uma mensagem "Pedido já entregue".

enum EstadoPedido {
    Pendente,
    EmTransito,
    Entregue
}

const atualizarPedido = (pedido: { estado: EstadoPedido }): void => {
    if (pedido.estado === EstadoPedido.Pendente) {
        pedido.estado = EstadoPedido.EmTransito;
    } else if (pedido.estado === EstadoPedido.EmTransito) {
        pedido.estado = EstadoPedido.Entregue;
    } else {
        console.log("Pedido já entregue");
    }
};

// Exemplo de uso:
let meuPedido = { estado: EstadoPedido.Pendente };
atualizarPedido(meuPedido); // Passa para EmTransito
atualizarPedido(meuPedido); // Passa para Entregue
atualizarPedido(meuPedido); // Exibe: "Pedido já entregue"
