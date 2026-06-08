const produtos = [
  { nome: 'Mouse', preco: 80, categoria: 'periferico', disponivel: true },
  { nome: 'Teclado', preco: 150, categoria: 'periferico', disponivel: true },
  { nome: 'Monitor', preco: 900, categoria: 'video', disponivel: false },
  { nome: 'Notebook', preco: 3500, categoria: 'computador', disponivel: true },
];

function listarProdutosDisponiveis(produtos) {
  return produtos
    .filter((produto) => produto.disponivel)
    .map((produto) => produto.nome);
}

console.log(listarProdutosDisponiveis(produtos));
