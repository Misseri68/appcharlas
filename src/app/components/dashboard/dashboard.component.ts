import { Component, OnInit } from '@angular/core';
import { TarjetaCharlaComponent } from "../tarjeta-charla/tarjeta-charla.component";
import { ServiceCharla } from '../../services/charla.service';
import { Charla } from '../../models/Charla';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [TarjetaCharlaComponent, CommonModule],
  standalone: true,
  providers: [ServiceCharla]

})
export class DashboardComponent implements OnInit {

  public charlas: Charla[] = [];

  constructor(private serviceCharla: ServiceCharla) { }

  ngOnInit(): void {
      this.loadCharlas();
  }

  private loadCharlas(){
    this.serviceCharla.getCharlas().then((data) => {
      if (data) {
        this.charlas = data;
        console.log('✅Charlas cargadas:', this.charlas);
      } else {
        console.error('No se pudieron cargar las charlas');
      }
    });
  }


}
