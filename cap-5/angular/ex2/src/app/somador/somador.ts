import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-somador',
  imports: [FormsModule],
  templateUrl: './somador.html',
  styleUrl: './somador.css'
})
export class Somador {
  valorA = '0';
  valorB = '0';

  get resultado(): number {
    return this.converterParaNumero(this.valorA) + this.converterParaNumero(this.valorB);
  }

  private converterParaNumero(valor: string): number {
    const numero = Number(valor.replace(',', '.'));
    return Number.isNaN(numero) ? 0 : numero;
  }
}
