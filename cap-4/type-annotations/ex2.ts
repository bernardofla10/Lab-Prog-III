// - Crie uma função contarCaracteres que receba um array de strings (por exemplo, nomes
// de cidades ou produtos) e retorne um array de números representando o tamanho de cada string.
// - Caso o array esteja vazio, retorne um array vazio.
// - Lembre-se de tipar corretamente parâmetros e retorno.

// Declara a funcao contarCaracteres, que recebe um array de strings e retorna um array de numeros.
function contarCaracteres(textos: string[]): number[] {
  // Percorre cada string do array e retorna um novo array com o tamanho de cada texto.
  return textos.map((texto: string): number => texto.length);
}

// Cria um array de strings com nomes de cidades.
const cidades: string[] = ["Sao Paulo", "Recife", "Curitiba"];

// Chama a funcao contarCaracteres e guarda o array de tamanhos retornado.
const tamanhos: number[] = contarCaracteres(cidades);

// Exibe no console o tamanho de cada nome de cidade.
console.log(tamanhos);

// Cria um array vazio de strings.
const listaVazia: string[] = [];

// Chama a funcao com um array vazio e exibe o resultado, que tambem sera um array vazio.
console.log(contarCaracteres(listaVazia));
