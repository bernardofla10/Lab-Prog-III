class Produto {
  // 1. Atributos explicitamente declarados e tipados
  nome: string;
  preco: number;
  quantidade: number;

  // 2. Construtor para inicialização dos atributos em tempo de execução
  constructor(nome: string, preco: number, quantidade: number) {
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }

  // 3. Método para cálculo do valor total do estoque do produto
  calcularTotal(): number {
    return this.preco * this.quantidade;
  }

  // 4. Método que gera o resumo utilizando interpolação de strings
  exibirResumo(): string {
    return `O produto ${this.nome} possui ${this.quantidade} unidades e totaliza R$ ${this.calcularTotal()}`;
  }
}