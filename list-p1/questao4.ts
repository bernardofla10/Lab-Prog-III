// 1. Definição da Interface conforme especificado
interface Produto {
  id: number;
  nome: string;
  preco: number;
  disponivel: boolean;
}

// 2. Implementação da função corretamente tipada
function calcularTotalDisponivel(produtos: Produto[]): number {
  return produtos
    .filter((produto) => produto.disponivel)
    .reduce((total, produto) => total + produto.preco, 0);
}