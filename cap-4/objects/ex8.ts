// - Crie um tipo ou interface Endereco com rua e numero.
// - Depois crie uma interface Cliente que inclua nome (string), saldo (number) e uma propriedade endereco do tipo Endereco.
// - Em seguida, faça uma função exibirCliente que receba um objeto Cliente e exiba os dados formatados.

interface Endereco {
    rua: string;
    numero: number;
}

interface Cliente {
    nome: string;
    saldo: number;
    endereco: Endereco;
}

const exibirCliente = (cliente: Cliente): void => {
    console.log(`Cliente: ${cliente.nome}`);
    console.log(`Saldo: R$ ${cliente.saldo.toFixed(2)}`);
    console.log(`Endereço: ${cliente.endereco.rua}, ${cliente.endereco.numero}`);
};

// Exemplo de uso:
const meuCliente: Cliente = {
    nome: "João Silva",
    saldo: 1500.5,
    endereco: {
        rua: "Rua das Flores",
        numero: 123
    }
};

exibirCliente(meuCliente);