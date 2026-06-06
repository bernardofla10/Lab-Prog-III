// Crie a classe Ponto para implementar um ponto em um eixo cartesiano
// - A classe deve possuir atributos x e y privados, com um construtor para inicializar o Ponto a partir de coordenadas x e y.
// - Implemente um método para imprimir o Ponto na tela.
// - Implemente um método para calcular o módulo do vetor correspondente ao ponto.
// - Implemente um método para calcular a distância entre 2 objetos do tipo Ponto.

class Ponto {
    private x: number;
    private y: number;

    constructor(x: number, y: number) { // criar o construtor da classe. executado quando usamos new Ponto(...).
        this.x = x;
        this.y = y;
    }

    public imprimir(): void {
        console.log(`Ponto(${this.x}, ${this.y})`);
    }

    public calcularModulo(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2); // calcula o módulo do ponto com √(x² + y²)
    }

    public calcularDistancia(outroPonto: Ponto): number {
        const deltaX = outroPonto.x - this.x;
        const deltaY = outroPonto.y - this.y;
        return Math.sqrt(deltaX ** 2 + deltaY ** 2);
    }
}

// Exemplos de uso em tempo de execução:
const p1 = new Ponto(3, 4);
const p2 = new Ponto(6, 8);

p1.imprimir(); // Saída: Ponto(3, 4)
console.log(p1.calcularModulo()); // Saída: 5
console.log(p1.calcularDistancia(p2)); // Saída: 5