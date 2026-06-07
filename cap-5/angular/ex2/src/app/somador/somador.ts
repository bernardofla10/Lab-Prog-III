import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-somador',
  imports: [FormsModule],
  templateUrl: './somador.html',
  styleUrl: './somador.css'
})
export class Somador { // no JS Puro, o estado é um objeto manual (const estado = {a: 0, b:0};)
  valorA = '0'; // no Angular, o estado fica como propriedade da classe.
  valorB = '0';


  // No JS Puro, precisamos de addEventListener para escutar os eventos manualmente e atualizar o valor de A e B.
  // No Angular, [(ngModel)] no HTML atualiza valorA e valorB automaticamente quando o usuário digita.

  get resultado(): number {
    return this.converterParaNumero(this.valorA) + this.converterParaNumero(this.valorB);
  }
  // O {{ resultado }} no HTML é interpolação. O Angular lê esse valor e atualiza a tela quando o estado muda. Não precisa de render().

  private converterParaNumero(valor: string): number {
    const numero = Number(valor.replace(',', '.'));
    return Number.isNaN(numero) ? 0 : numero;
  }
}


