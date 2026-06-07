import { Component } from '@angular/core';
import { Somador } from './somador/somador';

@Component({
  selector: 'app-root',
  imports: [Somador],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
