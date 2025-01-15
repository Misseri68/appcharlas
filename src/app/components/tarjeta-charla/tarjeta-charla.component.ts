import { Component, OnInit } from '@angular/core';
import { ServiceCharla } from '../../services/charla.service';

@Component({
  selector: 'app-tarjeta-charla',
  standalone: true,
  templateUrl: './tarjeta-charla.component.html',
  styleUrls: ['./tarjeta-charla.component.scss'],
})
export class TarjetaCharlaComponent implements OnInit {
  charlas: any[] = [];

  constructor(private serviceCharla: ServiceCharla) {}

  ngOnInit(): void {
    this.serviceCharla.getCharlas().then((data) => {
      if (data) {
        this.charlas = data;
        console.log('Charlas cargadas:', this.charlas);
      } else {
        console.error('No se pudieron cargar las charlas');
      }
    });
  }
}
