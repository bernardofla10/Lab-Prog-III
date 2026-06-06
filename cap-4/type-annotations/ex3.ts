// - Implemente uma função formatarValor que receba um parâmetro que pode ser string ou number.
// - Se for string, retorne a mesma string entre chaves (por exemplo, "texto" → “{texto}”).
// - Se for number, retorne o valor formatado com duas casas decimais.

const formatarValor = (valor: string | number): string => {
    if (typeof valor === "string") {
        return `{${valor}}`;
    } else {
        return valor.toFixed(2);
    }
};

// Exemplos de uso:
console.log(formatarValor("texto")); // Saída: "{texto}"
console.log(formatarValor(12.3456)); // Saída: "12.35"