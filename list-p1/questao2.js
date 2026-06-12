const movimentos = [
  { produto: 'Mouse', tipo: 'entrada', quantidade: 10 },
  { produto: 'Teclado', tipo: 'entrada', quantidade: 5 },
  { produto: 'Mouse', tipo: 'saida', quantidade: 3 },
  { produto: 'Monitor', tipo: 'saida', quantidade: 2 },
  { produto: 'Mouse', tipo: 'entrada', quantidade: 2 },
];

function consolidarEstoque(movimentos) {
  return movimentos.reduce((estoque, movimento) => {
    const sinal = movimento.tipo === 'entrada' ? 1 : -1;

    estoque[movimento.produto] =
      (estoque[movimento.produto] || 0) + sinal * movimento.quantidade;

    return estoque;
  }, {});
}

console.log(consolidarEstoque(movimentos));
